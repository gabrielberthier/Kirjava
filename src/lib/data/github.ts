import { Convert } from '$domain/adapters'
import { AllGitHubRepositories } from '$domain/models/github/user-repositories'
import { github } from '$lib/info'
import { readerServiceFactory } from '$services/http/factory/make-service'

const url = 'https://api.github.com/users'

class RepositoriesAdapter extends Convert<AllGitHubRepositories> {
  constructor() {
    super(AllGitHubRepositories)
  }
}

export const GitHubApiService = readerServiceFactory<AllGitHubRepositories>({
  baseUrl: `${url}/${github}`,
  resource: 'repos',
  converter: new RepositoriesAdapter()
})
