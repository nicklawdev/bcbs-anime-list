import Head from 'next/head';
import Link from 'next/link';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Layout.module.css';

export const ALL_POSTS_QUERY = gql`
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        english
        romaji
        native
      }
      description
      coverImage {
        large
        color
      }
    }
  }
}`

export const allPostsQueryVars = {
    page: 3,
    perPage: 10
}

export default function Home({ animes }) {
  return (
    <div>
      <Head>
        <title>Anime List</title>
      </Head>
      <main className={ styles.main }>
        <h1 className={ styles.title }>
          Check out some of my favorite anime
        </h1>

        <h3>Click cards for more details</h3>

        <div className={ styles.grid }>
          {animes.map(anime => {
            return (
              <Link href="/anime/[id]" as={`/anime/${anime.id}`}>
              <div key = { anime.id } className={ styles.card }>
                <h2>{ anime.title.native }</h2>
                <p>{ anime.title.english }</p>
                <img src={anime.coverImage.large}></img>
              </div>
              </Link>
            )
          })}
        </div>

      </main>
    </div>
  )
}


export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache()
  })

const { data } = await client.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars
  })
  console.log(data)

  return {
    props: {
      animes: data.Page.media
    }
  }
}