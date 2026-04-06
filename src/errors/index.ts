import dayjs from 'dayjs';

export class GithubApiRateLimitError extends Error {
  status: number;
  statusText: string;
  constructor(_status: number, _resetDateTime: number) {
    super();
    this.status = _status;
    this.statusText = `We apologize for the inconvenience. Currently, Github's API limit is applied. It will be recovered ${dayjs(_resetDateTime * 1000).fromNow()}`;
  }
}
