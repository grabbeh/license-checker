var proxy = require('http-proxy-middleware')

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    )
  },
  siteMetadata: {
    title: `License checker for package.json files`,
    description: `Check yo' licences, fool`,
    author: `@grabbeh`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/markdown/`
      }
    },
    `gatsby-transformer-remark`
  ]
}
