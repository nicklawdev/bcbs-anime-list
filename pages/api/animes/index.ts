import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";

const ALL_POSTS_QUERY = gql`
query ($id: Int, $page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id) {
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
    page: 1,
    perPage: 10
}

export default async function (req: NextApiRequest, res: NextApiResponse){
    const client = new ApolloClient({
        uri: 'https://graphql.anilist.co',
        cache: new InMemoryCache()
      })
    
    const { data } = await client.query({
        query: ALL_POSTS_QUERY,
        variables: allPostsQueryVars
      })
      console.log(data)
    res.json(data)
}

//route
//http://localhost:3000/api/animes