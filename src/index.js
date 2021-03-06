import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {persistCache} from 'apollo-cache-persist'
import Loadable from 'react-loadable'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage
})

const Loading = () => <div>Loading..</div>

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://wwwid-graphql--wayanjimmy.repl.co'
  }),
  cache,
  connectToDevTools: process.env.NODE_ENV !== 'production'
})

const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: Loading
})
const AsyncPost = Loadable({
  loader: () => import('./Post'),
  loading: Loading
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/posts/:id" component={AsyncPost} />
        <Route path="/" component={AsyncHome} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
