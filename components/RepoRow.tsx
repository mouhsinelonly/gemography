export const RepoRow = (repo: IRepo) => <div className='my-4 flex p-4 bg-white rounded overflow-ellipsis overflow-hidden'>
    <img
        src={repo.owner.avatar_url}
        alt={repo.owner.login} className='w-20 h-20 bg-gray-200 rounded border border-gray-100' />
    <div className='px-4'>
        <h1 className='sm:text-2xl font-bold'>{repo.name}</h1>
        <p className='break-all text-gray-800'>{repo.description}</p>
        <div className='mt-2 flex flex-wrap text-gray-800'>
            <div className='bg-yellow-100 px-2 text-sm text-yellow-800 rounded border border-yellow-300'>
                Stars : {repo.stargazers_count}
            </div>
            <div className='bg-red-100 px-2 text-sm text-red-800 rounded mx-2 border border-red-300'>
                Issues: {repo.open_issues_count}
            </div>
            <div className='w-full text-gray-500 sm:w-auto mt-2 sm:mt-0 text-sm'>Submitted {repo.created_at} by {repo.owner.login}</div>
        </div>
    </div>
</div>