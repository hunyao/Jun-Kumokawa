var express = require('express');
var router = express.Router();
var path = require("path");
const { spawn } = require('child_process');

function execute(command, args = [], options = {}) {
  const cmd = spawn(command, args, options)
  let std = Buffer.from('', 'utf-8');
  return new Promise((resolve, reject) => {
    cmd.stdout.on('data', (data) => {
        std = Buffer.concat([
            std,
            data
        ]);
    });

    cmd.stderr.on('data', (data) => {
      console.log('---STDERR--ERROR------')
      console.log(data.toString())
      reject(data)
    });

    cmd.on('error', (error) => {
      console.log('-----ERROR------')
      console.log(error)
      reject(error)
    });

    cmd.on('close', (code) => {
      resolve(std);
    });
  })
}
async function checkPath(path) {
  const listFiles = await execute('git', [
    'ls-tree',
    '-r',
    '-d',
    '--name-only',
    'HEAD'
  ], {
    cwd: process.env.APP_REPO_PATH
  });
  return listFiles.toString('utf8')
    .split('\n')
    .some(file => ('/' + file) === path);
}
/* GET users listing. */
router.get('*', async function(req, res, next) {
  const {
    0: path
  } = req.params;
  console.log(path)
  if (await checkPath(path) === false) {
    res.status(404);
    res.send();
    return;
  }
  try {
    const result = await execute('git', [
      'ls-tree',
      'HEAD',
    ], {
      cwd: process.env.APP_REPO_PATH + path,
    })
    const name_sha_list = result.toString('utf8')
      .split("\n")
      .filter(line => line !== "")
      .map(line => {
        const [
          , type, name__sha
        ] = line.split(' ');
        const [
          sha, filename
        ] = name__sha.split("\t");
        return {
          sha, filename, type
        }
      })
    const commitRaws = await Promise.all(name_sha_list.map(item => {
      return execute('git', [
        'log',
        '-1',
        '--pretty=format:' + [
          '%H',
          '%h',
          '%T',
          '%t',
          '%P',
          '%p',
          '%an',
          '%ae',
          '%aI',
          '%ar',
          '%cn',
          '%ce',
          '%cI',
          '%cr',
          '%s '
        ].join("%n"),
        item.filename
      ], {
        cwd: process.env.APP_REPO_PATH + path,
      })
    }))
    const commits = commitRaws.map(rawData => {
      const [
        hash,
        hashShort,
        treeHash,
        treeHashShort,
        parentHash,
        parentHashShort,
        authorName,
        authorEmail,
        authorDate,
        authorDateRelative,
        committerName,
        committerEmail,
        committerDate,
        committerDateRelative,
        subject
      ] = rawData.toString('utf8').split("\n");
      return {
        hash,
        hashShort,
        treeHash,
        treeHashShort,
        parentHash,
        parentHashShort,
        authorName,
        authorEmail,
        authorDate,
        authorDateRelative,
        committerName,
        committerEmail,
        committerDate,
        committerDateRelative,
        subject
      }
    })
    const responseArr = name_sha_list.map((item, index) => {
      return {
        ...item,
        commit: commits[index]
      }
    })

    res.json(responseArr)
  } catch(e) {
    res.status(500);
    res.send(e.toString());
  }
});

module.exports = router;
