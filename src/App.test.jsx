import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import { OctokitInstance } from './plugins/Octokit';
import MockData from './hooks/__test__/__mockData__';
import MockTreeDataRoot from './hooks/__test__/__mockData__/__jsons__/tree/root.json'
import MockTreeDataA from './hooks/__test__/__mockData__/__jsons__/tree/fixtures_concurrent_time-slicing.json'
import * as MockRootTreeCommitsJson from './hooks/__test__/__mockData__/__jsons__/tree-commits/root'
import CowJson from './pages/cow/cow.json'

jest.mock('./plugins/Octokit')
jest.mock('./components/ChartComponent', () => {
  return () => <div>This is ChartComponent</div>
})
const mockFunction = async (uri, params) => {
  if (uri.includes('GET /repos/{owner}/{repo}/commits?path={path}')) {
    return { data: MockRootTreeCommitsJson.MAP[params.path] }
  }
  if (uri.includes('GET /repos/{owner}/{repo}/commits')) {
    return { data: params.page === 1 ? MockData.commits: [] }
  }
  if (uri.includes('GET /repos/{owner}/{repo}/branches')) {
    return { data: params.page === 1 ? MockData.branches: [] }
  }
  if (uri.includes('GET /repos/{owner}/{repo}/tags')) {
    return{ data: params.page === 1 ? MockData.tags: [] }
  }
  if (uri.includes('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1')) {
    return { data: MockData.treeCommits }
  }
  if (uri.includes('GET /repos/{owner}/{repo}/git/trees/{tree_sha}')) {
    if (params.tree_sha === '6b6d0617eff48860c5b4e3e79c74cbd3312cf45a') {
      return { data: MockTreeDataRoot }
    } else {
      return { data: MockTreeDataA }
    }
  }
  if (uri.includes('GET /repos/{owner}/{repo}/readme')) {
    return { data: { content: 'VGhpcyBpcyB0aGUgUkVBRE1F' } }
  }
  if (uri.includes('GET /repos/{owner}/{repo}/git/blobs')) {
    return { data: { content: 'VGhpcyBpcyB0aGUgQmxvYiBDb250ZW50Cg==' } }
  }
  if (uri.includes('GET /repos/{owner}/{repo}')) {
    return { data: MockData.repository }
  }
  return { data: [] };
}
describe('Testing App', () => {

  beforeEach(() => {
    OctokitInstance.request
      .mockImplementation(mockFunction)
  })
  afterEach(() => {
    jest.clearAllMocks();
  })

  test.each([
    [ '/', 'page-overview' ],
    [ '/find', 'page-find' ],
    [ '/moo', 'page-moo' ],
    [ '/overview', 'page-overview' ],
    [ '/experience', 'page-experience' ],
    [ '/skill', 'page-skill' ],
    [ '/blob/5a5b376c8b1a246ecc4bdd5af2c3e77156879226', 'page-blob' ],
    [ '/tree', 'page-tree' ],
    [ '/tree/564a0acf5d790c6cf937a84aa7934ec88b5ab6e0', 'page-tree' ],
  ])('Testing routing %s which does exist', async (path, testId) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    )

    await waitFor(async () => expect(await screen.findByTestId('common-header')).toBeInTheDocument())
    await waitFor(async () => expect(await screen.findByTestId('common-footer')).toBeInTheDocument())
    await waitFor(async () => expect(await screen.findByTestId(testId)).toBeInTheDocument())
  })
  test.each([
    [ '/blob/6b5b376c8b1a246ecc4bdd5af2c3e77156879226', 'moo' ],
    [ '/tree/674a0acf5d790c6cf937a84aa7934ec88b5ab6e0', 'moo' ],
    [ '/dummy-page', 'page-404' ],
  ])('Testing routing %s which does not exist', async (path, testId) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    )

    await waitFor(async () => expect(await screen.findByTestId('common-header')).toBeInTheDocument())
    await waitFor(async () => expect(await screen.findByTestId('common-footer')).toBeInTheDocument())
    await waitFor(async () => expect(await screen.findByTestId(testId)).toBeInTheDocument())
  })
  test.each([
    [ '/moo', 'page-moo', 0 ],
    [ '/moo?v', 'page-moo', 1 ],
    [ '/moo?vv', 'page-moo', 2 ],
    [ '/moo?vvv', 'page-moo', 3 ],
    [ '/moo?vvvv', 'page-moo', 4 ],
    [ '/moo?vvvvv', 'page-moo', 5 ],
    [ '/moo?vvvvvv', 'page-moo', 6 ],
    [ '/moo?vvvvvvv', 'page-moo', 7 ],
    [ '/moo?vvvvvvvv', 'page-moo', 8 ],
    [ '/moo?vvvvvvvvv', 'page-moo', 9 ],
    [ '/moo?vvvvvvvvvv', 'page-moo', 10 ],
    [ '/moo?vvvvvvvvvvv', 'page-moo', 11 ],
    [ '/moo?vvvvvvvvvvvv', 'page-moo', 12 ],
    [ '/moo?vvvvvvvvvvvvv', 'page-moo', 13 ],
  ])('Testing routing %s', async (path, testId, index) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    )

    await waitFor(async () => expect(await screen.findByTestId('common-header')).toBeInTheDocument())
    await waitFor(async () => expect(await screen.findByTestId('common-footer')).toBeInTheDocument())
    await waitFor(async () => expect(await screen.findByTestId(testId)).toBeInTheDocument())
    const pageMoo = screen.getByTestId('page-moo');
    const content = index >= CowJson.length ? CowJson[CowJson.length-1] : CowJson[index];
    expect(pageMoo.textContent.replace(/\n/g, '')).toEqual(content.replace(/\n/g, ''))
  })
})
