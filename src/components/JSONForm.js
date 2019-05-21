import React from 'react'
import { Formik, Form } from 'formik'
import isJSON from 'validator/lib/isJSON'
import Box from './Box'
import Text from './Text'
import Flex from './Flex'
import Button from './Button'
import axios from 'axios'
import Error from './Error'
import TextArea from './TextArea'

const UrlForm = props => {
  let { setLoading, setResponse } = props
  return (
    <Formik
      initialValues={{
        json: ''
      }}
      validateOnChange={false}
      validate={values => {
        let errors = {}
        if (!values.json) {
          errors.json = 'Please provide some JSON'
        } else if (!isJSON(values.json)) {
          errors.json = 'Invalid JSON'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        setErrors({
          json: false,
          serverError: false
        })
        let { json } = values
        axios
          .post('/.netlify/functions/process-package-json', { json })
          .then(r => {
            setSubmitting(false)
            setResponse(r.data)
            setLoading(false)
          })
          .catch(err => {
            setErrors({
              serverError: err.response.data
            })
            setSubmitting(false)
            setLoading(false)
          })
      }}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange } = props
        return (
          <Form>
            <TextArea
              width={1}
              handleChange={handleChange}
              value={values.json}
              height={400}
              name='json'
              placeholder='Paste in a package.json file...'
            />
            <Box mt={2}>{touched.json && <Error>{errors.json}</Error>}</Box>
            <Box mt={2}>
              <Error>{errors.serverError}</Error>
            </Box>
            <Box mt={3}>
              <Flex justifyContent='flex-end'>
                <Button disabled={isSubmitting} type='submit' px={3} py={2}>
                  {isSubmitting ? (
                    <Text color='white' fontSize={2}>
                      Loading...
                    </Text>
                  ) : (
                    <Text color='white' fontSize={2}>
                      Submit
                    </Text>
                  )}
                </Button>
              </Flex>
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}

export default UrlForm
