import React from 'react'
import { Navbar } from './'

const Layout = ({ children }) => {
  return (
    <>
    <Navbar />
    <div style={{marginBottom: "3rem"}} />
    { children}
    </>
  )
}

export default Layout;