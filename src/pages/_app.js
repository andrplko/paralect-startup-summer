import React from 'react'
import Layout from '@/components/layout'
import PropTypes from 'prop-types';
import '@/styles/globals.scss'
import '@/styles/Normalize.scss'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
