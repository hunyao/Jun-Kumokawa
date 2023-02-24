import LICENSE from './root-LICENSE.json'
import circleci from './root-.circleci.json'
import yarnLock from './root-yarn.lock.json'
import editorconfig from './root-.editorconfig.json'
import README from './root-README.md.json'
import packageJson from './root-package.json.json'
import gitattributes from './root-.gitattributes.json'
import fixtures from './root-fixtures.json'
import nvmrc from './root-.nvmrc.json'
import watchmanconfig from './root-.watchmanconfig.json'
import packages from './root-packages.json'
import codesandbox from './root-.codesandbox.json'
import CHANGELOG from './root-CHANGELOG.md.json'
import gitignore from './root-.gitignore.json'
import mailmap from './root-.mailmap.json'
import dangerfileJs from './root-dangerfile.js.json'
import scripts from './root-scripts.json'
import prettierignore from './root-.prettierignore.json'
import github from './root-.github.json'
import CODE_OF_CONDUCT from './root-CODE_OF_CONDUCT.md.json'
import CONTRIBUTING from './root-CONTRIBUTING.md.json'
import SECURITY from './root-SECURITY.md.json'
import babelConfigJs from './root-babel.config.js.json'
import prettierrcJs from './root-.prettierrc.js.json'
import netlifyToml from './root-netlify.toml.json'
import eslintignore from './root-.eslintignore.json'
import eslintrcJs from './root-.eslintrc.js.json'
import AUTHORS from './root-AUTHORS.json'
import ReactVersionsJs from './root-ReactVersions.js.json'

import fixPUBLIC from './fixtures_concurrent_time-slicing_public.json'
import fixSrc from './fixtures_concurrent_time-slicing_src.json'
import fixREADME from './fixtures_concurrent_time-slicing_README.json'
import fixPackageJson from './fixtures_concurrent_time-slicing_package.json'
import fixGitignore from './fixtures_concurrent_time-slicing_gitignore.json'
import fixYarnLock from './fixtures_concurrent_time-slicing_yarn-lock.json'

export const MAP = {
  "/.circleci": circleci,
  "/.codesandbox": codesandbox,
  "/.editorconfig": editorconfig,
  "/.eslintignore": eslintignore,
  "/.eslintrc.js": eslintrcJs,
  "/.gitattributes": gitattributes,
  "/.github": github,
  "/.gitignore": gitignore,
  "/.mailmap": mailmap,
  "/.nvmrc": nvmrc,
  "/.prettierignore": prettierignore,
  "/.prettierrc.js": prettierrcJs,
  "/.watchmanconfig": watchmanconfig,
  "/AUTHORS": AUTHORS,
  "/CHANGELOG.md": CHANGELOG,
  "/CODE_OF_CONDUCT.md": CODE_OF_CONDUCT,
  "/CONTRIBUTING.md": CONTRIBUTING,
  "/LICENSE": LICENSE,
  "/README.md": README,
  "/ReactVersions.js": ReactVersionsJs,
  "/SECURITY.md": SECURITY,
  "/babel.config.js": babelConfigJs,
  "/dangerfile.js": dangerfileJs,
  "/fixtures": fixtures,
  "/netlify.toml": netlifyToml,
  "/package.json": packageJson,
  "/packages": packages,
  "/scripts": scripts,
  "/yarn.lock": yarnLock,
  "/fixtures/concurrent/time-slicing/.gitignore": fixGitignore,
  "/fixtures/concurrent/time-slicing/README.md": fixREADME,
  "/fixtures/concurrent/time-slicing/package.json": fixPackageJson,
  "/fixtures/concurrent/time-slicing/public": fixPUBLIC,
  "/fixtures/concurrent/time-slicing/src": fixSrc,
  "/fixtures/concurrent/time-slicing/yarn.lock": fixYarnLock
}
