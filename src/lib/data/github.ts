import { AbstractConverter } from '$domain/adapters'
import { AllGitHubRepositories, GitHubRepository } from '$domain/models/github/user-repositories'
import { github } from '$lib/info'
import { readerServiceFactory } from '$services/http/factory/make-service'

const url = 'https://api.github.com/users'

class RepositoriesAdapter extends AbstractConverter<GitHubRepository[]> {
  constructor() {
    super(GitHubRepository)
  }
}

export const GitHubApiService = readerServiceFactory<GitHubRepository>({
  baseUrl: `${url}/${github}`,
  resource: 'repos',
  converter: new RepositoriesAdapter()
})
