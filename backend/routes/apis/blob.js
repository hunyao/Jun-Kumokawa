var express = require('express');
var router = express.Router();
const { spawn, exec } = require('child_process');
var crypto = require("crypto");

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
  if (await checkPath(path) === false) {
    res.status(404);
    res.send();
    return;
  }
  try {
    const blobData = await execute('git', [
      'cat-file',
      '-p',
      'HEAD:' + path.replace(/^\//, ''),
    ], {
      cwd: process.env.APP_REPO_PATH,
    })

    const [
        mimeType,
        contentType
    ] = await execute('file', [
      '--mime',
      path.replace(/^\//, ''),
    ], {
      cwd: process.env.APP_REPO_PATH,
    })
    .then(result => {
      const splited = result.toString('utf8').split(' ');
      splited.shift();
        return [
            splited.join(" "),
            splited[0].replace(/;$/, '')
        ]
    })
    res.set({
      'Content-Type': contentType.trim(),
      'X-MIME-Type': contentType.trim(),
      'X-File-Type': mimeType.trim(),
    })
    res.send(blobData);
  } catch(e) {
      console.log(e)
    res.status(500);
    res.send(e.toString());
  }

});

module.exports = router;
