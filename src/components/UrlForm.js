import React from 'react'
import { Formik, Form } from 'formik'
import { string, object } from 'yup'
import { navigate } from 'gatsby'
import Box from './Box'
import Flex from './Flex'
import { Button, TextField, Text, Spinner } from '@zopauk/react-components'
import axios from 'axios'

const UrlForm = props => {
  let { setLoading, setResponse } = props
  return (
    <Formik
      initialValues={{
        url: ''
      }}
      validateOnChange={false}
      validationSchema={object().shape({
        url: string()
          .url()
          .required('Please provide a valid url')
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        setLoading(true)
        setResponse(null)
        setErrors({
          url: false,
          serverError: false
        })
        let { url } = values
        axios
          .post('/.netlify/functions/process-package-json', { url })
          .then(r => {
            setResponse(r.data)
            setSubmitting(false)
            setLoading(false)
            navigate(`/?url=${url}`)
          })
          .catch(err => {
            setErrors({
              serverError: 'Error'
              // serverError: err.response.data
            })
            setSubmitting(false)
            setLoading(false)
          })
      }}
    >
      {props => {
        const { values, errors, isSubmitting, handleChange } = props
        return (
          <Form>
            <TextField
              onChange={handleChange}
              name='url'
              fontSize={2}
              value={values.url}
              label='Please input a package.json URL'
              inputProps={{ name: 'url' }}
              errorMessage={errors.url || errors.serverError}
            />
            <Box mt={3}>
              <Flex justifyContent='flex-end'>
                <Button
                  compact
                  disabled={isSubmitting}
                  type='submit'
                  px={3}
                  py={2}
                >
                  {isSubmitting ? (
                    <Text color='gray'>
                      <Spinner thickness={5} />
                    </Text>
                  ) : (
                    <Text color='white'>Submit</Text>
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
