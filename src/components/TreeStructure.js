import React from 'react'
import Box from './Box'
import Flex from './Flex'
import Dependency from './Dependency'

const Tree = ({ tree }) => (
  <Box my={3}>
    <Flex flexWrap='wrap'>
      {tree.map(({ parent, dependencies }, i) => {
        return (
          <Box width={[1, 1 / 2, 1 / 3, 1 / 4]} key={parent.name}>
            <Dependency
              number={i + 1}
              parent={parent}
              dependencies={dependencies}
            />
          </Box>
        )
      })}
    </Flex>
  </Box>
)

export default Tree
