import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import Image from 'react-graceful-image'

import Layout from './Layout'
import Card from './Card'
import Container from './Container'
import InputSelect from './InputSelect'

const GET_FEEDS = gql`
  query {
    feed {
      id
      title
      pubDate
      author
      description
      thumbnail
      categories
    }
    allCategories {
      name
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
            <Image src={post.thumbnail} width={200} alt={post.title} />
            <p dangerouslySetInnerHTML={{__html: post.description}} />
          </Card.Body>
          <Card.Footer>{post.author}</Card.Footer>
        </Card>
      </div>
    </div>
  )
}

function mapCategoriesIntoOptions(categories) {
  return categories.map(c => ({
    value: c.name,
    label: c.name
  }))
}

class Home extends Component {
  state = {
    selectedCategory: ''
  }

  handleCategoryChange = e => {
    this.setState({selectedCategory: e.target.value})
  }

  render() {
    const {selectedCategory} = this.state
    return (
      <Layout>
        <section>
          <Query query={GET_FEEDS}>
            {({loading, error, data}) => {
              if (loading) return 'Loading...'
              if (error) return 'Something wrong :('

              return (
                <React.Fragment>
                  <Container>
                    <section>
                      <div className="row">
                        <div className="col" style={{margin: '20px 20px'}}>
                          <InputSelect
                            name="category"
                            defaultOption="Pilih Kategori"
                            onChange={this.handleCategoryChange}
                            options={mapCategoriesIntoOptions(
                              data.allCategories
                            )}
                          />
                        </div>
                      </div>
                    </section>
                  </Container>
                  <Container>
                    {data.feed
                      .filter(post => {
                        if (selectedCategory.length === 0) {
                          return true
                        }

                        return post.categories.includes(selectedCategory)
                      })
                      .map(post => <Post post={post} key={post.id} />)}
                  </Container>
                </React.Fragment>
              )
            }}
          </Query>
        </section>
      </Layout>
    )
  }
}

export default Home
