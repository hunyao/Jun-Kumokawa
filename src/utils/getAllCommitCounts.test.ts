import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAllCommitCounts } from './getAllCommitCounts';

const mockListCommits = vi.hoisted(() => vi.fn());
const mockExtractPageInfo = vi.hoisted(() => vi.fn());

vi.mock('@lib/index', () => ({
  octokit: {
    rest: {
      repos: {
        listCommits: mockListCommits,
      },
    },
  },
}));

vi.mock('./extractPageInfo', () => ({
  extractPageInfo: mockExtractPageInfo,
}));

const baseOptions = { owner: 'test-owner', repo: 'test-repo' };

describe('getAllCommitCounts', () => {
  beforeEach(() => {
    mockListCommits.mockReset();
    mockExtractPageInfo.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('コミット数の取得', () => {
    it('Link ヘッダーの last ページ数を返す', async () => {
      mockListCommits.mockResolvedValue({
        data: [{}],
        headers: { link: '<...>; rel="last"' },
      });
      mockExtractPageInfo.mockReturnValue({ last: '42' });

      const count = await getAllCommitCounts({ ...baseOptions, sha: 'case-last' });

      expect(count).toBe(42);
    });

    it('linkInfo が undefined のとき data.length を返す', async () => {
      mockListCommits.mockResolvedValue({ data: [{}], headers: {} });
      mockExtractPageInfo.mockReturnValue(undefined);

      const count = await getAllCommitCounts({ ...baseOptions, sha: 'case-no-link' });

      expect(count).toBe(1);
    });

    it('linkInfo.last が null のとき data.length を返す', async () => {
      mockListCommits.mockResolvedValue({
        data: [{}, {}],
        headers: { link: '<...>; rel="next"' },
      });
      mockExtractPageInfo.mockReturnValue({ last: null });

      const count = await getAllCommitCounts({ ...baseOptions, sha: 'case-null-last' });

      expect(count).toBe(2);
    });
  });

  describe('エラーハンドリング', () => {
    it('409 エラーのとき 0 を返す', async () => {
      mockListCommits.mockRejectedValue({ status: 409 });

      const count = await getAllCommitCounts({ ...baseOptions, sha: 'case-409' });

      expect(count).toBe(0);
    });

    it('409 以外のエラーは再スローする', async () => {
      const error = new Error('Network error');
      mockListCommits.mockRejectedValue(error);

      await expect(
        getAllCommitCounts({ ...baseOptions, sha: 'case-other-error' }),
      ).rejects.toThrow(error);
    });
  });

  describe('キャッシュ', () => {
    it('TTL 内に同じ options で呼ばれた場合 API は1回だけ呼ばれる', async () => {
      mockListCommits.mockResolvedValue({ data: [{}], headers: {} });
      mockExtractPageInfo.mockReturnValue(undefined);

      const options = { ...baseOptions, sha: 'case-cache-hit' };
      await getAllCommitCounts(options);
      await getAllCommitCounts(options);

      expect(mockListCommits).toHaveBeenCalledOnce();
    });

    it('TTL 切れ後は API を再度呼ぶ', async () => {
      vi.useFakeTimers();
      mockListCommits.mockResolvedValue({ data: [{}], headers: {} });
      mockExtractPageInfo.mockReturnValue(undefined);

      const options = { ...baseOptions, sha: 'case-cache-expired' };
      await getAllCommitCounts(options);

      vi.advanceTimersByTime(6 * 60 * 1000); // デフォルト TTL (5分) を超過

      await getAllCommitCounts(options);

      expect(mockListCommits).toHaveBeenCalledTimes(2);
    });
  });
});
