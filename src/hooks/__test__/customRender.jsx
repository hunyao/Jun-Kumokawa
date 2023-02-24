import React from 'react';
import { Provider as RepositoryProvider } from '../../contexts/repository'
import { Provider as PersonalProvider } from '../../contexts/personalData'
import MockData from './__mockData__'
import {initial as personalData} from '../../contexts/personalData'

export const dispatchMockFn = jest.fn()
  .mockName('dispatchMockFn')
export const changeBranchFn = jest.fn()
  .mockName('changeBranchFn')
export const emptyContextData = {
  state: {
    repository: null,
    branches: [],
    tags: [],
    commits: []
  },
  dispatch: jest.fn(),
  selectedBranch: null,
  changeBranch: jest.fn(),
  allTrees: null
}
export const nonEmptyContextData = {
  state: {
    repository: MockData.repository,
    branches: MockData.branches,
    tags: MockData.tags,
    commits: MockData.commits
  },
  dispatch: dispatchMockFn,
  selectedBranch: MockData.branches[0],
  changeBranch: jest.fn(),
  allTrees: MockData.trees
}
export const CustomWrapper = (contextData) => ({children}) => {
  return (
    <RepositoryProvider
      value={contextData}
    >
      {children}
    </RepositoryProvider>
  )
}
export const CustomPersonalWrapper = (contextData) => ({children}) => {
  return (
    <PersonalProvider
      value={contextData}
    >
      {children}
    </PersonalProvider>
  )
}
export const wrapper = CustomWrapper(nonEmptyContextData);
export const wrapperForPersonal = (override = {}) => {
  Object.assign(personalData.profile, override)
  return CustomPersonalWrapper(personalData);
}
export const wrapperWithoutData = CustomWrapper(emptyContextData);
