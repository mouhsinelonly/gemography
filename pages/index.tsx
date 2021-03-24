import Head from 'next/head'
import { useSWRInfinite } from "swr";
import { useCallback } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { fetcher } from '@lib/fetcher'


export default function Home() {
  const { data, error, size, setSize } = useSWRInfinite<IRepo[]>(
    index =>
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${index + 1}`,
    fetcher
  );
  const hasError = typeof error !== 'undefined'
  const repositories: IRepo[] = data ? ([] as IRepo[]).concat(...data) : [];
  const isLoadingInitialData: boolean = !data && !hasError;
  const dataLoading: boolean = isLoadingInitialData === true || (size > 0 && typeof data !== 'undefined' && typeof data[size - 1] === "undefined")

  const handleLoadMore = useCallback(() => {
    if (!dataLoading) {
      setSize(size + 1)
    }
  }, [size, setSize, dataLoading])
  const infiniteRef = useInfiniteScroll({
    loading: dataLoading,
    hasNextPage: !hasError,
    onLoadMore: handleLoadMore
  }) as React.RefObject<HTMLDivElement>;

  return (
    <div className='bg-white min-h-screen p-4 bg-gray-100' ref={infiniteRef}>
      <Head>
        <title>Gemography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {repositories.reduce((all: IRepo[], next: IRepo) => {
        return all.findIndex((repo: IRepo) => repo.id === next.id) >= 0 ? all : [...all, next]
      }, []).map(repo => {
        return (
          <div key={repo.id} className='my-4 flex p-4 bg-white rounded overflow-ellipsis overflow-hidden'>
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
        );
      })}
      {(dataLoading && !hasError) ? <div className='fixed bottom-0 animate-pulse mb-4 w-full  text-center justify-center items-center left-0 flex items-center'>
        <div className='rounded-full bg-white py-2 px-8 bg-green-500 text-white'>Loading...</div>
      </div> : null}
      {(hasError) ? <div className='fixed bottom-0 px-4 mb-4 w-full  text-center justify-center items-center left-0 flex items-center'>
        <div className='rounded-full bg-white py-2 px-8 bg-red-500 text-white'>{error.message}</div>
      </div> : null}
    </div>
  )
}
