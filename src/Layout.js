import React from 'react'
import {Link} from 'react-router-dom'

import Container from './Container'

function Header() {
  return (
    <header className="section" style={{background: '#101719'}}>
      <Container>
        <div
          className="header-top"
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'white',
            padding: '15px'
          }}
        >
          <Link to="/" style={{margin: 0, fontSize: '1.6em'}}>
            RSS WWWID
          </Link>
        </div>
      </Container>
    </header>
  )
}

function Layout({children}) {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}

export default Layout
