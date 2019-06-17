import React, { Fragment } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  BlobProvider
} from '@react-pdf/renderer'
import { Button } from '@zopauk/react-components'
import Box from './Box'

const styles = StyleSheet.create({
  section: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    fontSize: 10,
    fontFamily: 'Courier'
  },
  header: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 30
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
                <Text>{text || 'None provided'}</Text>
              </View>
            </Fragment>
          ))
        })}
      </Page>
    </Document>
  )
  // TODO: Work out how to generate pdf on click rather than on dep change (badddd!)
  return (
    <Box>
      <BlobProvider document={generate()}>
        {({ url }) => (
          <Button sizing='compact'>
            <a rel='noopener noreferrer' href={url} target='_blank'>
              Open PDF
            </a>
          </Button>
        )}
      </BlobProvider>
    </Box>
  )
}

export default GeneratePDF
