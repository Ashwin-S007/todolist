import React from 'react'

const Footer = ({lengthh}) => {
  return (
    <footer>{lengthh} List {lengthh === 1 ? "item" : "items"} </footer>
  )
}

export default Footer
