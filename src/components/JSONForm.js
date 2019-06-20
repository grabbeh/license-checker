import React from 'react'
import { Formik, Form } from 'formik'
import isJSON from 'validator/lib/isJSON'
import Box from './Box'
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
          console.log(err)
            setErrors({
              serverError: "Server error"
            })
            setSubmitting(false)
            setLoading(false)
          })
      }}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange } = props
        return (
          <Box mt={2}>
            <Form>
              <TextArea
                width={1}
                border='2px solid'
                borderColor='#D6D7DE'
                label='Paste in a package.json file'
                handleChange={handleChange}
                value={values.json}
                height={400}
                name='json'
                error={errors.json}
              />
              <Box mt={1}>{touched.json && <Error>{errors.json}</Error>}</Box>
              <Box mt={1}>
                <Error>{errors.serverError}</Error>
              </Box>
              <Box mt={2}>
                <Flex justifyContent='flex-end'>
                  <Button disabled={isSubmitting} type='submit'>
                    Submit
                  </Button>
                </Flex>
              </Box>
            </Form>
          </Box>
        )
      }}
    </Formik>
  )
}

export default UrlForm
