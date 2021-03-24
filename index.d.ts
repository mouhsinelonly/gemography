
declare interface IRepo {
    id: number
    name: string
    description: string
    owner: IRepoOwner
    stargazers_count: number
    open_issues_count: number
    created_at: string
}

declare interface IRepoOwner {
    avatar_url: string
    login: string
}