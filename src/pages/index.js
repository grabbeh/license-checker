import React, { useState, useEffect } from 'react'
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
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Text,
  fonts
} from '@zopauk/react-components'

const Example = ({ location, data: { markdownRemark } }) => {
  let { html } = markdownRemark
  let [response, setResponse] = useState(null)
  let [loading, setLoading] = useState(null)

  useEffect(() => {
    let { url } = qs.parse(location.search)
    if (url) {
      setLoading(true)
      axios
        .post('/.netlify/functions/process-package-json', { url })
        .then(r => {
          setResponse(r.data)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <Layout>
      <FlexContainer>
        <FlexRow gutter='200px'>
          <FlexCol xs={12} m={4}>
            <Box p={[2, 3]} minHeight={[1, '100vh']}>
              <Header />
              <InputSideBar setLoading={setLoading} setResponse={setResponse} />
              {response && <ResultsSideBar response={response} />}
            </Box>
          </FlexCol>
          <FlexCol xs={12} m={8}>
            <Box minHeight='100vh' p={[2, 3]}>
              {loading && <Loading />}
              {!response && !loading && (
                <Box dangerouslySetInnerHTML={{ __html: html }} />
              )}
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
                  </TabList>
                  <TabPanels>
                    <Tree tree={response.tree} />
                    <Table dataRows={response.flattened} />
                    <Box>
                      <AttributionList dependencies={response.flattened} />
                    </Box>
                  </TabPanels>
                </Tabs>
              )}
            </Box>
          </FlexCol>
        </FlexRow>
      </FlexContainer>
    </Layout>
  )
}

export default Example

export const query = graphql`
  query {
    markdownRemark {
      html
    }
  }
`
