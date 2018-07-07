import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'

import Layout from './Layout'

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
        <div className="card">
          <div className="card-header">
            <h3>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <span>
              <small>{post.pubDate}</small>
            </span>
          </div>
          <div className="card-body">
            <img src={post.thumbnail} alt={post.title} />
            <p dangerouslySetInnerHTML={{__html: post.description}} />
          </div>
          <div className="card-footer">{post.author}</div>
        </div>
      </div>
    </div>
  )
}

class Home extends Component {
  render() {
    return (
      <Layout>
        <section>
          <div className="container">
            <Query query={GET_FEEDS}>
              {({loading, error, data}) => {
                if (loading) return 'Loading...'
                if (error) return 'Something wrong :('

                return data.feed.map(post => <Post post={post} key={post.id} />)
              }}
            </Query>
          </div>
        </section>
      </Layout>
    )
  }
}

export default Home
