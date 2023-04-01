import { GitHubRepository } from '$domain/models/github/user-repositories'
import type { IGitHubRepo } from '$domain/models/github/user-repositories'
import type { ReaderApiService } from '$services/http'
import { multiReaderServiceFactory } from '$services/http/factory/make-service'

export class GitHubApi {
  private githubReaderService: ReaderApiService<GitHubRepository[]>

  constructor(private apiToken: string, private url: string, private githubProfile: string) {
    this.githubReaderService = multiReaderServiceFactory<GitHubRepository>({
      baseUrl: `${this.url}/${this.githubProfile}`,
      resource: 'repos',
      entity: GitHubRepository,
      headers: {
        Authorization: `Token ${this.apiToken}`
      }
    })
  }

  async getRepositories(): Promise<IGitHubRepo[]> {
    const repositories = await this.githubReaderService.get('', { sort: 'updated', per_page: 5 })

    return repositories.map((el) => {
      return {
        url: el.htmlUrl ?? `${this.url}/${this.githubProfile}`,
        language: el.language ?? 'Language unavailable',
        name: el.name,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt
      }
    })
  }
}
