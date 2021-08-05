import styles from '../../../styles/Layout.module.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


const animes = (props) => {
    const anime = props.anime.Media;
    console.log(anime)
    return (
        <div>
            <div className={ styles.page }>
                <h1>{anime.title.native}</h1>
                <h3>{anime.title.english}</h3>
                <img src={anime.coverImage.large}></img>
            <p>{anime.description}</p>
            
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const client = new ApolloClient({
        uri: 'https://graphql.anilist.co',
        cache: new InMemoryCache()
      })
    const { data } = await client.query({
        query: gql`
        query ($id: Int) {
            Media (id: $id) {
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
        }`,
        variables: {
            id: context.params.id
        }
    })
    console.log(data)
    
    return {
        props: {
          anime: data
        }
    }
  }

export default animes


