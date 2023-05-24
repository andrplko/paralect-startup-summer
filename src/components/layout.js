import React from "react"
import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      {children}
    </div>
  )
}

export default Layout;