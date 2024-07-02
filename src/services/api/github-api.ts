import type { GitHubRepository, IGitHubRepo } from '$domain/models/github/user-repositories'
import { githubRepositorySchema } from '../../schemas/githubRepositorySchema'
import { readerServiceFactory } from '$services/http/factory/make-service'
import { FetchDecorator } from '$services/http/client-implementation/fetch/fetch-decorator'

export class GitHubApi {
  async getRepositories(): Promise<IGitHubRepo[]> {
    const githubReaderService = readerServiceFactory<GitHubRepository[]>({
      schema: githubRepositorySchema,
      client: new FetchDecorator()
    })
    const repositories = await githubReaderService.get('/api/github/', {
      sort: 'updated',
      per_page: 5
    })

    if (repositories.success) {
      return repositories.data.map((el) => {
        return {
          url: el.htmlUrl ?? el.url ?? '',
          language: el.language ?? 'Language unavailable',
          name: el.name,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt
        }
      })
    }

    return []
  }
}
