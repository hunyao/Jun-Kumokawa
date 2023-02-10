#!/usr/local/bin/node
const yargs = require('yargs/yargs')
const fs = require('fs');
const fsPromise = require('node:fs/promises');
const { spawn } = require('node:child_process');
const pathModule = require('path')

const argv =
  yargs(process.argv.slice(2))
  .usage('$0 --path string')
  .option(
    'path',
    {
      alias: 'p',
      describe: 'The path you are trying to spell-check',
      demandOption: true,
      type: 'string',
    }
  )
  .option(
    'recursive',
    {
      alias: 'r',
      type: 'boolean'
    }
  )
  .option(
    'extensions',
    {
      alias: 'ext',
      type: 'array',
      default: ['ts', 'tsx', 'js', 'css', 'html']
    }
  )
  .option(
    'ignoreFile',
    {
      alias: 'n',
      type: 'string',
      default: '.spellCheckIgnore'
    }
  )
  .option(
    'excludes',
    {
      type: 'array',
    }
  )
  .option(
    'only-show-misspelled-words',
    {
      type: 'boolean',
      default: false
    }
  )
  .help('help')
  .argv;

const execCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const exec = spawn(command, args);
    let stdout = '';
    let stderr = '';
    exec.stdout.on('data', (data) => {
      stdout += data;
    });
    exec.stderr.on('data', (data) => {
      stderr += data;
    });
    exec.on('close', (code) => {
      resolve({
        stdout, stderr, code
      });
    });
  });
}
const execSpellCheckWord = (word) => {
  return execCommand('sh', [
    '-c',
    "echo " + word + " | spell",
  ]).then(({ stdout, stderr, code }) => {
    return stdout;
  })
}
const getIgnoreWords = (path) => {
  if (fs.existsSync(path) === false) {
    throw Error('The ignoreFile path ' + path + ' does not exists')
  }
  const content = fs.readFileSync(path).toString();
  return content.split("\n")
}
const getFileList = async (directoryPath, recursive = false) => {
  const items = await fsPromise.readdir(directoryPath, { withFileTypes: true });
  if (recursive === false) {
    return items
      .filter(item => item.isFile())
      .map(item => {
        return {
          item,
          path: directoryPath + '/' + item.name
        }
      })
  }
  const res = await Promise.all(items.map(async item => {
    if (item.isFile()) {
      return [
        {
          item,
          path: directoryPath + '/' + item.name
        }
      ]
    }
    if (item.isDirectory()) {
      return await getFileList(directoryPath + '/' + item.name, recursive)
    }
  }))
  return res.flat();
}
const spellCheckAFile = (filePath, ignoreWords, onlyShowMisSpelledWords = false) => {
  const content = fs.readFileSync(filePath).toString();
  const contentLineByLine = content.split("\n");
  return Promise.all(
    contentLineByLine.map((line, index) => {
      const lineNum = index + 1;
      const matched = line.matchAll(/(([a-z]|[A-Z])[a-z]+|[A-Z]+)/g);
      const targetWords = Array(...matched).map(([matchedWord]) => matchedWord)
      return execSpellCheckWord(targetWords.join(" "))
        .then(stdout => {
          const misSpelledList = stdout.split("\n").filter(s => s !== '');
          return targetWords.map(targetWord => {
            return {
              result: ignoreWords.includes(targetWord) === true || misSpelledList.includes(targetWord) === false,
              lineNum,
              targetWord,
              sentence: line,
              filePath,
            }
          })
        })
    })
  ).then((resolvedAll) => {
    const resolvedAndFilterdAll = resolvedAll
      .flat()
      .filter(line => line.result === false)
    if (resolvedAndFilterdAll.length > 0) {
      if (onlyShowMisSpelledWords === false) {
        console.log('--------------')
        console.log(filePath)
        console.log('--------------')
      }
      resolvedAndFilterdAll.forEach(line => {
        const {
          lineNum,
          targetWord,
          sentence
        } = line;
        if (onlyShowMisSpelledWords) {
          console.log(targetWord)
        } else {
          console.log('Detective a worng spelling word!!')
          console.log(lineNum + ':', '[' + targetWord + ']', 'in the sentence ' + sentence)
        }
      })
    }
    return resolvedAll;
  })
}

(async () => {
  const {
    path,
    recursive,
    extensions,
    ignoreFile
  } = argv;
  const onlyShowMisSpelledWords = argv['only-show-misspelled-words']

  const stat = await fsPromise.lstat(path);
  const isFile = stat.isFile();
  const isDirectory = stat.isDirectory();
  const ignoreWords = getIgnoreWords(ignoreFile);
  let resultArr = [];
  const congratulation = () => {
    console.log('========================================')
    console.log('Congratulations!! No misspelled at all')
    console.log('========================================')
  }

  if (isFile && extensions.includes(pathModule.extname(path).slice(1))) {
    resultArr = await spellCheckAFile(path, ignoreWords, onlyShowMisSpelledWords);
  } else if (isDirectory) {
    const files = await getFileList(path, recursive)

    resultArr = await files.filter(file => {
      return extensions.includes(pathModule.extname(file.path).slice(1))
    }).reduce(async (prev, current) => {
      return [
        ...(await prev),
        ...(await spellCheckAFile(current.path, ignoreWords, onlyShowMisSpelledWords))
      ]
    }, Promise.resolve([]))
  } else {}

  if (resultArr.every(r => r.result)) {
    congratulation();
  }
})()

