import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import TabList from './TabList'
import TabPanels from './TabPanels'
import UrlForm from './UrlForm'
import JSONForm from './JSONForm'
import { Text, fonts } from '@zopauk/react-components'

const InputSideBar = props => {
  let { setLoading, setResponse } = props
  return (
    <Tabs>
      <TabList>
        <Tab>
          <Text fontFamily={fonts.alverata} size='xl' fw='bold'>
            URL
          </Text>
        </Tab>
        <Tab>
          <Text fontFamily={fonts.alverata} size='xl' fw='bold'>
            Paste
          </Text>
        </Tab>
      </TabList>
      <TabPanels>
        <UrlForm setLoading={setLoading} setResponse={setResponse} />
        <JSONForm setLoading={setLoading} setResponse={setResponse} />
      </TabPanels>
    </Tabs>
  )
}

export default InputSideBar
