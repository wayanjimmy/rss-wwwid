import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

import Layout from './Layout'
import Card from './Card'

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
                    <Card>
                      <Card.Header title={<h3>{data.post.title}</h3>}>
                        <span>
                          <small>{data.post.pubDate}</small>
                        </span>
                      </Card.Header>
                      <Card.Body>
                        <div
                          dangerouslySetInnerHTML={{__html: data.post.content}}
                        />
                      </Card.Body>
                      <Card.Footer>{data.post.author}</Card.Footer>
                    </Card>
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
