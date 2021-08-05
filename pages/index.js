import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ titles }) {
  console.log('titles', titles )
  return (
    <div>
      <Head>
        <title>Anime List</title>
      </Head>
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
      titles: data.Page.media
    }
  }
}