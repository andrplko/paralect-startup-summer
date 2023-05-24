import React from "react"
import PropTypes from 'prop-types';
import Header from "@/components/header"

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;