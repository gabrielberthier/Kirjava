import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { github } from '$lib/info'
import { env as private_env } from '$env/dynamic/private'
import { env as public_env } from '$env/dynamic/public'
import { fiexedRepos } from './fixed-values-github-repos'

export const GET: RequestHandler = async ({ setHeaders, fetch }) => {
  const ghUrl = public_env.PUBLIC_GITHUB_URL ?? ''
  const key = private_env.GITHUB_KEY ?? ''
  const profile = github
  const wholeDay = 86400

  console.log('Called again')

  if (ghUrl === '' || key === '') {
    setHeaders({
      'cache-control': `max-age=${wholeDay}`
    })

    return json(fiexedRepos)
  }

  const response = await fetch(`${ghUrl}/${profile}/repos?sort=updated&per_page=5`, {
    headers: {
      Authorization: `Token ${key}`
    }
  })

  if (response.status >= 200 && response.status < 300) {
    setHeaders({
      'cache-control': `max-age=${wholeDay}`
    })

    return json(await response.json())
  }

  return json({ status: response.status, data: String(response.body) })
}
