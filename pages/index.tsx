import Head from 'next/head'
import { useSWRInfinite } from "swr"
import { useCallback, useMemo } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { RepoRow } from '@components/RepoRow'
import { ErrorMessage } from '@components/ErrorMessage'
import { Loading } from '@components/Loading'
import { fetcher } from '@lib/fetcher'


export default function Home() {
  // fetch repositories from rest api
  const { data, error, size, setSize } = useSWRInfinite<IRepo[]>(
    index =>
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${index + 1}`,
    fetcher
  )

  // check if request returned any errors
  const hasError = typeof error !== 'undefined'

  // flatten returned 2 dimension array to 1 dimension
  const repositories: IRepo[] = data ? ([] as IRepo[]).concat(...data) : []
  // check if request is still loading
  const isLoading: boolean = (!data && !hasError) || (size > 0 && typeof data !== 'undefined' && typeof data[size - 1] === "undefined")

  // handle loading more repositories
  const handleLoadMore = useCallback(() => {
    if (!isLoading) {
      setSize(size + 1)
    }
  }, [size, setSize, isLoading])

  // create infinite scroll ref
  const infiniteRef = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !hasError,
    onLoadMore: handleLoadMore
  }) as React.RefObject<HTMLDivElement>;

  // remove duplicate repositories entries, github api return same element event on different pages
  const uniqueRepositories: IRepo[] = useMemo(() => {
    return repositories.reduce((all: IRepo[], next: IRepo) => {
      return all.some((repo: IRepo) => repo.id === next.id) ? all : [...all, next]
    }, [])
  }, [repositories.length])

  return (
    <div
      className='bg-white min-h-screen p-4 bg-gray-100'
      ref={infiniteRef}>
      <Head>
        <title>Gemography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {uniqueRepositories.map(repo => {
        return (<RepoRow key={repo.id} repo={repo} />);
      })}
      {(isLoading && !hasError) && <Loading />}
      {hasError && <ErrorMessage message={error.message} />}
    </div>
  )
}
