import React from 'react'
import Helmet from 'react-helmet'
import Box from '../components/Box'
import '../index.css'
import { GlobalStyles, Fonts, Header1, Link } from '@zopauk/react-components'
import { MDXProvider } from '@mdx-js/react'

const Para = props => (
  <p {...props} style={{ fontSize: '18px', lineHeight: 1.6 }} />
)

const UnorderedList = props => (
  <ul style={{ fontSize: '18px' }}>{props.children} </ul>
)

const ListItem = props => <li style={{ padding: '5px' }}>{props.children}</li>

const components = {
  p: Para,
  ul: UnorderedList,
  H3: Header1,
  a: Link,
  li: ListItem
}

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
      <MDXProvider components={components}>
        <Box>{props.children}</Box>
      </MDXProvider>
    </div>
  )
}

export default Layout
