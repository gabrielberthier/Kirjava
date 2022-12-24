import { MultiItemConverter } from '$domain/adapters'
import { GitHubRepository } from '$domain/models/github/user-repositories'
import type { IGitHubRepo } from '$domain/models/github/user-repositories'
import { github } from '$lib/info'
import { readerServiceFactory } from '$services/http/factory/make-service'

const url = 'https://api.github.com/users'

class RepositoriesAdapter extends MultiItemConverter<GitHubRepository[]> {
  constructor() {
    super(GitHubRepository)
  }
}

export const gatherRepositories = async (): Promise<IGitHubRepo[]> => {
  const repositories = await readerServiceFactory<GitHubRepository[]>({
    baseUrl: `${url}/${github}`,
    resource: 'repos',
    converter: new RepositoriesAdapter()
  }).get('', { sort: 'updated', per_page: 5 })

  return repositories.map((el) => {
    return {
      url: el.htmlUrl ?? `${url}/${github}`,
      language: el.language,
      name: el.name,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt
    }
  })
}
