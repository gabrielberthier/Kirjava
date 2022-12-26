import { GitHubRepository } from '$domain/models/github/user-repositories'
import type { IGitHubRepo } from '$domain/models/github/user-repositories'
import { github } from '$lib/info'
import { multiReaderServiceFactory } from '$services/http/factory/make-service'

const url = 'https://api.github.com/users'

export const gatherRepositories = async (): Promise<IGitHubRepo[]> => {
  const repositories = await multiReaderServiceFactory<GitHubRepository>({
    baseUrl: `${url}/${github}`,
    resource: 'repos',
    entity: GitHubRepository
  }).get('', { sort: 'updated', per_page: 5 })

  return repositories.map((el) => {
    return {
      url: el.htmlUrl ?? `${url}/${github}`,
      language: el.language ?? "Language unavailable",
      name: el.name,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt
    }
  })
}
