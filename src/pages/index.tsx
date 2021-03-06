import React, { useState, useEffect } from 'react'
import { MDXRenderer } from 'gatsby-mdx'
import qs from 'query-string'
import axios from 'axios'
import { graphql } from 'gatsby'
import Box from '../components/Box'
import Text from '../components/Text'
import Layout from '../components/Layout'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import TabPanels from '../components/TabPanels'
import Table from '../components/Table'
import Tree from '../components/TreeStructure'
import InputSideBar from '../components/InputSideBar'
import ResultsSideBar from '../components/ResultsSideBar'
import Loading from '../components/Loading'
import AttributionList from '../components/AttributionList'
import TreeVis from '../components/TreeVis'
import Flex from '../components/Flex'

const Example = ({
  location,
  data: {
    mdx: {
      code: { body }
    }
  }
}) => {
  let [response, setResponse] = useState(null)
  let [flat, setFlat] = useState(null)
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(null)

  useEffect(() => {
    let { url } = qs.parse(location.search)
    if (url) {
      setLoading(true)
      axios
        .post('/.netlify/functions/process-package-json', { url })
        .then(r => {
          setResponse(r.data)
          setFlat(r.data.flat)
          setLoading(false)
        })
        .catch(err => {
          let error = 'Server error'
          if (typeof err.response.data === 'string') error = err.response.data
          setError(error)
          setLoading(false)
        })
    }
  }, [])

  return (
    <Layout>
      <Box>
        <Flex flexWrap='wrap'>
          <Box p={[2, 3]} width={[1, 0.4, 1 / 4]} minHeight={[1, '100vh']}>
            <Box mb={2}>
              <Text fontSize={4} fontWeight='bold'>
                Licence checker
              </Text>
            </Box>
            <InputSideBar setLoading={setLoading} setResponse={setResponse} />
            {response && <ResultsSideBar dependencies={response.flat} name={response.tree.data.name} />}
          </Box>
          <Box py={[2, 3]} px={[2, 4]} width={[1, 0.6, 3 / 4]} minHeight='100vh'>
            {!loading && !response && (
              <Box>
                <MDXRenderer>{body}</MDXRenderer>
              </Box>
            )}
            {loading && <Loading />}
            {error && error}
            {response && (
              <Tabs>
                <TabList>
                  <Tab>
                    <Text fontSize={2}>
                      Tree
                      </Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>
                      Table
                      </Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>
                      Attribution
                      </Text>
                  </Tab>
                  <Tab>
                    <Text fontSize={2}>
                      Visualisation
                      </Text>
                  </Tab>
                </TabList>
                <TabPanels>
                  <Tree tree={response.tree.children} />
                  <Table dataRows={flat} />
                  <AttributionList setDependencies={setFlat} deps={flat} />
                  <TreeVis tree={response.tree} />
                </TabPanels>
              </Tabs>

            )}
          </Box>
        </Flex>
      </Box>

    </Layout >
  )
}

export default Example

export const query = graphql`
  query MDXQuery {
    mdx {
      id
      code {
        body
      }
    }
  }
`
