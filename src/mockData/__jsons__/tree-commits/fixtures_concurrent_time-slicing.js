import PUBLIC from './fixtures_concurrent_time-slicing_public.json'
import src from './fixtures_concurrent_time-slicing_src.json'
import README from './fixtures_concurrent_time-slicing_README.json'
import packageJson from './fixtures_concurrent_time-slicing_package.json'
import gitignore from './fixtures_concurrent_time-slicing_gitignore.json'
import yarnLock from './fixtures_concurrent_time-slicing_yarn-lock.json'
export { default as public } from './fixtures_concurrent_time-slicing_public.json'
export { default as src } from './fixtures_concurrent_time-slicing_src.json'
export { default as README } from './fixtures_concurrent_time-slicing_README.json'
export { default as packageJson } from './fixtures_concurrent_time-slicing_package.json'
export { default as gitignore } from './fixtures_concurrent_time-slicing_gitignore.json'
export { default as yarnLock } from './fixtures_concurrent_time-slicing_yarn-lock.json'
export const MAP = {
  '.gitignore': gitignore,
  'README.md': README,
  'package.json': packageJson,
  'public': PUBLIC,
  'src': src,
  'yarn.lock': yarnLock,
  "/fixtures/concurrent/time-slicing/.gitignore": gitignore,
  "/fixtures/concurrent/time-slicing/README.md": README,
  "/fixtures/concurrent/time-slicing/package.json": packageJson,
  "/fixtures/concurrent/time-slicing/public": PUBLIC,
  "/fixtures/concurrent/time-slicing/src": src,
  "/fixtures/concurrent/time-slicing/yarn.lock": yarnLock
}
