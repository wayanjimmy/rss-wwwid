import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'

import Layout from './Layout'
import Card from './Card'
import Container from './Container'

const GET_FEEDS = gql`
  query {
    feed {
      id
      title
      pubDate
      author
      description
      thumbnail
    }
  }
`

function Post({post}) {
  return (
    <div className="row">
      <div className="col">
        <Card>
          <Card.Header
            title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}
          >
            <span>
              <small>{post.pubDate}</small>
            </span>
          </Card.Header>
          <Card.Body>
            <img
              src={post.thumbnail}
              alt={post.title}
              style={{height: '200px'}}
            />
            <p dangerouslySetInnerHTML={{__html: post.description}} />
          </Card.Body>
          <Card.Footer>{post.author}</Card.Footer>
        </Card>
      </div>
    </div>
  )
}

class Home extends Component {
  render() {
    return (
      <Layout>
        <section>
          <Container>
            <Query query={GET_FEEDS}>
              {({loading, error, data}) => {
                if (loading) return 'Loading...'
                if (error) return 'Something wrong :('

                return data.feed.map(post => <Post post={post} key={post.id} />)
              }}
            </Query>
          </Container>
        </section>
      </Layout>
    )
  }
}

export default Home
