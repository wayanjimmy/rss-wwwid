import React from 'react'

function Container({children}) {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {children}
    </div>
  )
}

export default Container
