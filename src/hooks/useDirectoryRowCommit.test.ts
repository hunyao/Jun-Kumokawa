import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDirectoryRowCommit } from './useDirectoryRowCommit';

const mockListCommits = vi.hoisted(() => vi.fn());

vi.mock('@lib/index', () => ({
  octokit: {
    rest: {
      repos: {
        listCommits: mockListCommits,
      },
    },
  },
}));

const baseProps = {
  owner: 'test-owner',
  repo: 'test-repo',
  path: 'src',
  branchRef: 'main',
};

const mockCommit = {
  sha: 'abc123',
  commit: { message: 'Initial commit' },
};

describe('useDirectoryRowCommit', () => {
  beforeEach(() => {
    mockListCommits.mockReset();
  });

  describe('enableCommitFetch: false', () => {
    it('API を呼ばずに commit が null で isResolved になる', async () => {
      const { result } = renderHook(() =>
        useDirectoryRowCommit({
          ...baseProps,
          fileName: 'skip.ts',
          enableCommitFetch: false,
        }),
      );

      await waitFor(() => expect(result.current.isResolved).toBe(true));

      expect(result.current.commit).toBeNull();
      expect(result.current.hasError).toBe(false);
      expect(mockListCommits).not.toHaveBeenCalled();
    });
  });

  describe('API 成功', () => {
    it('commit に最新コミットが入り isResolved になる', async () => {
      mockListCommits.mockResolvedValue({ data: [mockCommit] });

      const { result } = renderHook(() =>
        useDirectoryRowCommit({ ...baseProps, fileName: 'success.ts' }),
      );

      await waitFor(() => expect(result.current.isResolved).toBe(true));

      expect(result.current.commit).toEqual(mockCommit);
      expect(result.current.hasError).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(mockListCommits).toHaveBeenCalledOnce();
      expect(mockListCommits).toHaveBeenCalledWith({
        owner: 'test-owner',
        repo: 'test-repo',
        sha: 'main',
        path: 'src/success.ts',
        per_page: 1,
        page: 1,
      });
    });

    it('path が空文字のときは fileName のみでパスを構築する', async () => {
      mockListCommits.mockResolvedValue({ data: [mockCommit] });

      const { result } = renderHook(() =>
        useDirectoryRowCommit({
          ...baseProps,
          path: '',
          fileName: 'root-file.ts',
        }),
      );

      await waitFor(() => expect(result.current.isResolved).toBe(true));

      expect(mockListCommits).toHaveBeenCalledWith(
        expect.objectContaining({ path: 'root-file.ts' }),
      );
    });

    it('API が空配列を返したとき commit は null になる', async () => {
      mockListCommits.mockResolvedValue({ data: [] });

      const { result } = renderHook(() =>
        useDirectoryRowCommit({ ...baseProps, fileName: 'empty.ts' }),
      );

      await waitFor(() => expect(result.current.isResolved).toBe(true));

      expect(result.current.commit).toBeNull();
      expect(result.current.hasError).toBe(false);
    });
  });

  describe('API エラー', () => {
    it('hasError が true になり commit は null のまま', async () => {
      mockListCommits.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() =>
        useDirectoryRowCommit({ ...baseProps, fileName: 'error.ts' }),
      );

      await waitFor(() => expect(result.current.isResolved).toBe(true));

      expect(result.current.commit).toBeNull();
      expect(result.current.hasError).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('キャッシュ', () => {
    it('同じキーで2回レンダリングしても API は1回だけ呼ばれる', async () => {
      mockListCommits.mockResolvedValue({ data: [mockCommit] });

      const props = { ...baseProps, fileName: 'cached.ts' };

      const first = renderHook(() => useDirectoryRowCommit(props));
      await waitFor(() => expect(first.result.current.isResolved).toBe(true));

      const second = renderHook(() => useDirectoryRowCommit(props));
      await waitFor(() => expect(second.result.current.isResolved).toBe(true));

      expect(mockListCommits).toHaveBeenCalledOnce();
      expect(second.result.current.commit).toEqual(mockCommit);
    });
  });
});
