import type { RepositoryOwner } from './github-user'

export interface IGitHubRepo {
  language: string
  name: string
  createdAt: string
  updatedAt?: string
  url: string
}

export class GitHubRepository {
  id?: number
  nodeId?: string
  name: string = ''
  fullName?: string
  private?: boolean
  owner?: RepositoryOwner
  htmlUrl?: string
  description?: string
  fork?: boolean
  url?: string
  forksUrl?: string
  keysUrl?: string
  collaboratorsUrl?: string
  teamsUrl?: string
  hooksUrl?: string
  issueEventsUrl?: string
  eventsUrl?: string
  assigneesUrl?: string
  branchesUrl?: string
  tagsUrl?: string
  blobsUrl?: string
  gitTagsUrl?: string
  gitRefsUrl?: string
  treesUrl?: string
  statusesUrl?: string
  languagesUrl?: string
  stargazersUrl?: string
  contributorsUrl?: string
  subscribersUrl?: string
  subscriptionUrl?: string
  commitsUrl?: string
  gitCommitsUrl?: string
  commentsUrl?: string
  issueCommentUrl?: string
  contentsUrl?: string
  compareUrl?: string
  mergesUrl?: string
  archiveUrl?: string
  downloadsUrl?: string
  issuesUrl?: string
  pullsUrl?: string
  milestonesUrl?: string
  notificationsUrl?: string
  labelsUrl?: string
  releasesUrl?: string
  deploymentsUrl?: string
  createdAt: string = new Date().toISOString()
  updatedAt?: string
  pushedAt?: string
  gitUrl?: string
  sshUrl?: string
  cloneUrl?: string
  svnUrl?: string
  homepage?: null
  size?: number
  stargazersCount?: number
  watchersCount?: number
  language: string = ''
  hasIssues?: boolean
  hasProjects?: boolean
  hasDownloads?: boolean
  hasWiki?: boolean
  hasPages?: boolean
  hasDiscussions?: boolean
  forksCount?: number
  mirrorUrl?: null
  archived?: boolean
  disabled?: boolean
  openIssuesCount?: number
  license?: null
  allowForking?: boolean
  isTemplate?: boolean
  webCommitSignoffRequired?: boolean
  topics?: string[]
  visibility?: string
  forks?: number
  openIssues?: number
  watchers?: number
  defaultBranch?: string
}
