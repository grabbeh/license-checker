import React, { Fragment } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from '@react-pdf/renderer'
import { Button } from '@zopauk/react-components'
import Box from './Box'

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    fontSize: 10,
    fontFamily: 'Courier'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
})

const GeneratePDF = ({ deps }) => {
  const generate = () => (
    <Document>
      <Page>
        {deps.map((d, i) => {
          return d.licenses.map(({ text }) => (
            <Fragment key={i}>
              <View style={styles.header}>
                <Text>{d.name}</Text>
              </View>
              <View style={styles.section}>
                <Text>{text}</Text>
              </View>
            </Fragment>
          ))
        })}
      </Page>
    </Document>
  )

  return (
    <Box>
      <PDFDownloadLink document={generate()} fileName='licences.pdf'>
        {({ loading }) => (
          <Button sizing='compact'>
            {loading ? 'Loading document...' : 'Download as pdf'}
          </Button>
        )}
      </PDFDownloadLink>
    </Box>
  )
}

export default GeneratePDF
