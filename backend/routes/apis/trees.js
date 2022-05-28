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
  const listFiles = await execute('git', [
    'ls-files',
  ], {
    cwd: process.env.APP_REPO_PATH,
  })

  const response = [
    ...listFiles.replace(/\n$/, '').split('\n')
  ]

  res.json(response)
});

module.exports = router;
