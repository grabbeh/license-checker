import React, { useState, useEffect } from 'react'
import { MDXRenderer } from 'gatsby-mdx'
import qs from 'query-string'
import axios from 'axios'
import { graphql } from 'gatsby'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Header from '../components/Header'
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
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Text,
  fonts
} from '@zopauk/react-components'
import { MdHome } from 'react-icons/md'
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
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(null)

  useEffect(() => {
    let { url } = qs.parse(location.search)
    if (url) {
      setLoading(true)
      axios
        .post('/.netlify/functions/process-package-json', { url })
        .then(r => {
          console.log(r.data)
          setResponse(r.data)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setError(err)
          setLoading(false)
        })
    }
  }, [])

  return (
    <Layout>
      <Flex justifyContent='flex-end'>
        <Box pr={3} pt={2}>
          <MdHome
            style={{ cursor: 'pointer' }}
            size={30}
            onClick={() => {
              setResponse(null)
            }}
          />
        </Box>
      </Flex>
      <Box maxWidth={1200}>
        <Flex flexWrap='wrap'>
          <Box width={[1, 0.4, 0.3]} p={[2, 3]} minHeight={[1, '100vh']}>
            <Header clearResults={setResponse} />
            <InputSideBar setLoading={setLoading} setResponse={setResponse} />
            {response && <ResultsSideBar response={response} />}
          </Box>
          <Box width={[1, 0.6, 0.7]} minHeight='100vh'>
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
                    <Text fontFamily={fonts.alverata} size='xl' fw='bold'>
                      Tree
                      </Text>
                  </Tab>
                  <Tab>
                    <Text fontFamily={fonts.alverata} size='xl' fw='bold'>
                      Table
                      </Text>
                  </Tab>
                  <Tab>
                    <Text fontFamily={fonts.alverata} size='xl' fw='bold'>
                      Attribution
                      </Text>
                  </Tab>
                  <Tab>
                    <Text fontFamily={fonts.alverata} size='xl' fw='bold'>
                      Visualisation
                      </Text>
                  </Tab>
                </TabList>
                <TabPanels>
                  <Tree tree={response.tree} />
                  <Table dataRows={response.flattened} />
                  <AttributionList dependencies={response.flattened} />
                  <TreeVis tree={response.fullTree} />
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Flex>
      </Box>

    </Layout>
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
