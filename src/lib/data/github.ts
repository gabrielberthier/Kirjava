import type { IGitHubRepo } from '$domain/models/github/user-repositories'
import type { GitHubApi } from '$services/api/github-api'

export class GithubDataProvider {
  constructor(private api: GitHubApi) {}

  async gatherRepositories(): Promise<IGitHubRepo[]> {
    try {
      return this.api.getRepositories()
    } catch (error) {
      return []
    }
  }
}
