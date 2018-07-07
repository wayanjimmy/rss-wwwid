import React from 'react'

function Header({title, children}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function Body({children}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {children}
    </div>
  )
}

function Footer({children}) {
  return <div className="card-footer">{children}</div>
}

class Card extends React.Component {
  static Header = Header
  static Body = Body
  static Footer = Footer

  render() {
    return (
      <div
        style={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
          padding: '20px',
          margin: '20px 20px',
          borderRadius: '10px'
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Card
