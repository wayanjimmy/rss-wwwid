import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

import './index.css'
import Home from './Home'
import Post from './Post'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://wwwid-graphql.glitch.me'
  }),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/posts/:id" component={Post} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
