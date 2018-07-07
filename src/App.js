import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://wwwid-graphql.glitch.me"
  }),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production"
});

function Header() {
  return (
    <header className="section">
      <div className="container">
        <div className="header-top">
          <h1>RSS WWWID</h1>
        </div>
      </div>
    </header>
  );
}

function Post({ post }) {
  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-header">
            <h3>{post.title}</h3>
            <span>
              <small>{post.pubDate}</small>
            </span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.description }}
            className="card-body"
          />
          <div className="card-footer">{post.author}</div>
        </div>
      </div>
    </div>
  );
}

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const res = await client.query({
      query: gql`
        query {
          feed {
            id
            title
            pubDate
            author
            description
          }
        }
      `
    });
    this.setState({ posts: res.data.feed });
  }

  render() {
    const { posts } = this.state;
    return (
      <React.Fragment>
        <Header />
        <section>
          <div className="container">
            {posts.map(post => <Post post={post} key={post.id} />)}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default App;
