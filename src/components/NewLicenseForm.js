import React from 'react'
import { Formik, Form } from 'formik'
import Box from './Box'
import Flex from './Flex'
import { Button } from '@zopauk/react-components'
import Input from './Input'
import Error from './Error'
import TextArea from './TextArea'

const newLicenseForm = props => {
  let { addLicense } = props
  return (
    <Formik
      initialValues={{
        name: '',
        text: ''
      }}
      validateOnChange={false}
      validate={values => {
        let errors = {}
        if (!values.name) errors.name = 'Please give a name'
        if (!values.text) errors.text = 'We need a license'
        return errors
      }}
      onSubmit={(values, { setSubmitting, setErrors, setValues }) => {
        setErrors({
          name: false,
          text: false
        })
        let { name, text } = values
        addLicense({ name, text })
        setValues({ name: '', text: '' })
        setSubmitting(false)
      }}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange } = props
        return (
          <Box maxWidth={800} mt={2}>
            <Form>
              <Input
                onChange={handleChange}
                name='name'
                value={values.name}
                label='Package name'
                width={1}
                border='2px solid'
                borderColor='#D6D7DE'
                borderRadius={2}
                fontSize={3}
                p={2}
              />
              <Box>{touched.name && <Error>{errors.name}</Error>}</Box>
              <Box mt={2}>
                <TextArea
                  width={1}
                  border='2px solid'
                  borderColor='#D6D7DE'
                  label='Paste in some license text'
                  handleChange={handleChange}
                  value={values.text}
                  height={400}
                  name='text'
                />
              </Box>
              <Box>{touched.text && <Error>{errors.text}</Error>}</Box>
              <Box mt={2}>
                <Flex justifyContent='flex-end'>
                  <Button
                    styling='primary'
                    sizing='small'
                    disabled={isSubmitting}
                    type='submit'
                  >
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

export default newLicenseForm
