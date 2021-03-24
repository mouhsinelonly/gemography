import Head from 'next/head'
import { useSWRInfinite } from "swr"
import { useCallback } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { RepoRow } from '@components/RepoRow'
import { ErrorMessage } from '@components/ErrorMessage'
import { Loading } from '@components/Loading'
import { fetcher } from '@lib/fetcher'


export default function Home() {
  const { data, error, size, setSize } = useSWRInfinite<IRepo[]>(
    index =>
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${index + 1}`,
    fetcher
  )
  const hasError = typeof error !== 'undefined'
  const repositories: IRepo[] = data ? ([] as IRepo[]).concat(...data) : []
  const dataLoading: boolean = (!data && !hasError) || (size > 0 && typeof data !== 'undefined' && typeof data[size - 1] === "undefined")

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
        return (<RepoRow key={repo.id} repo={repo} />);
      })}
      {(dataLoading && !hasError) && <Loading />}
      {hasError && <ErrorMessage message={error.message} />}
    </div>
  )
}
