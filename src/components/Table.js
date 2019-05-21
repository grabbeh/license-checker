import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Text from './Text'

const FullTable = props => {
  // TODO: filter uniques except where licenses length > 2
  let { dataRows } = props
  let picked = _.chain(dataRows)
    .map(d => {
      return d.licenses.map(l => {
        return { name: d.name, license: l.license }
      })
    })
    .flatten()
    .map(r => {
      return _.pick(r, ['name', 'license'])
    })
    .value()

  let dataColumns = _.keys(picked[0])
  const tableHeaders = (
    <thead>
      <Tr>
        {dataColumns.map((column, i) => (
          <Td key={i}>
            <Text fontWeight='bold' color='black'>
              {column}
            </Text>
          </Td>
        ))}
      </Tr>
    </thead>
  )

  const tableBody = picked.map((row, i) => (
    <Tr key={i}>
      {dataColumns.map((column, i) => (
        <Td key={i}>
          <Text color='black'>{row[column] || 'Unknown'}</Text>
        </Td>
      ))}
    </Tr>
  ))

  return (
    <Table>
      {tableHeaders}
      <tbody>{tableBody}</tbody>
    </Table>
  )
}

export default FullTable

const Tr = styled('tr')`
  border-bottom: 1px solid black;
  &:nth-child(even) {
    background: rgba(42, 117, 146, 0.12);
  }
`

const Table = styled('table')`
  table-layout: fixed;
  border-collapse: collapse;
  background: white;
`
/*
const Th = styled('th')`
  padding: 10px;
  width: 100px;
` */

const Td = styled('td')`
  padding: 5px;
`
