import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className="section">
      <div className="container">
        <div className="header-top">
          <Link to="/">RSS WWWID</Link>
        </div>
      </div>
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
