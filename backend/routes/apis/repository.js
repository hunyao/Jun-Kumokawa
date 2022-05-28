var express = require('express');
var router = express.Router();
var path = require("path");
const { spawn, exec } = require('child_process');

function execute(command, args = [], options = {}) {
  const cmd = spawn(command, args, options)
  let std = ''
  return new Promise((resolve, reject) => {
    cmd.stdout.on('data', (data) => {
      std += data;
    });

    cmd.stderr.on('data', (data) => {
      reject(data)
    });

    cmd.on('close', (code) => {
      resolve(std);
    });
  })
}
router.get('/', async function(req, res, next) {
  const [
    branches,
    tags,
    commits,
    currentBranch
  ] = await Promise.all([
    execute('git', [
      'branch',
      '--remotes',
      '|',
      'wc',
      '-l',
    ], {
      cwd: process.env.APP_REPO_PATH,
      shell: true
    }),
    execute('git', [
      'tag',
      '--list',
      '|',
      'wc',
      '-l'
    ], {
      cwd: process.env.APP_REPO_PATH,
      shell: true
    }),
    execute('git', [
      'rev-list',
      '--count',
      'HEAD'
    ], {
      cwd: process.env.APP_REPO_PATH,
      shell: true
    }),
    execute('git', [
      'rev-parse',
      '--abbrev-ref',
      'HEAD'
    ], {
      cwd: process.env.APP_REPO_PATH,
      shell: true
    }),
  ])

  const response = {
    branches: Number(branches.trim()),
    tags: Number(tags.trim()),
    commits: Number(commits.trim()),
    currentBranch: currentBranch.trim()
  }

  res.json(response)
});

module.exports = router;
