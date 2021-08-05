import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Layout.module.css'


export default function Home({ animes }) {
  console.log('animes', animes )
  return (
    <div>
      <Head>
        <title>Anime List</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Check out some of my favorite anime
        </h1>

        <div className={styles.grid}>
          {animes.map(anime => {
            return (
              <a className={styles.card}>
                <h2>{ anime.title.native }</h2>
                <p>{ anime.title.english }</p>
              </a>
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
    query: gql`
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
        }
      }
    }`,
    variables: {
      perPage: 10
    }
  })

  console.log('data', data)

  return {
    props: {
      animes: data.Page.media
    }
  }
}