import React from 'react'
import Helmet from 'react-helmet'
import Box from '../components/Box'
import '../index.css'
import { GlobalStyles, Fonts, ZopaFooter } from '@zopauk/react-components'

const Layout = props => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width' />
        <title>License checker</title>
      </Helmet>
      <GlobalStyles />
      <Fonts />
      <Box>{props.children}</Box>
      <ZopaFooter legalOnly />
    </div>
  )
}

export default Layout
