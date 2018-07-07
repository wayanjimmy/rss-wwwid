import React from 'react'
import gql from 'graphql-tag'

import Layout from './Layout'
import {Query} from 'react-apollo'

const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      content
      title
      pubDate
      author
    }
  }
`

class Post extends React.Component {
  render() {
    return (
      <Layout>
        <section>
          <div className="row">
            <div className="col">
              <Query
                query={GET_POST}
                variables={{id: this.props.match.params.id}}
              >
                {({loading, error, data}) => {
                  if (loading) return 'Loading...'
                  if (error) return 'Something wrong :('

                  return (
                    <div className="card">
                      <div className="card-title">
                        <h3>{data.post.title}</h3>
                        <span>
                          <small>{data.post.pubDate}</small>
                        </span>
                      </div>
                      <div className="card-body">
                        <div
                          dangerouslySetInnerHTML={{__html: data.post.content}}
                        />
                      </div>
                      <div className="card-footer">{data.post.author}</div>
                    </div>
                  )
                }}
              </Query>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default Post
