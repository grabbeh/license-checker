import React from 'react'
import Box from './Box'
import Flex from './Flex'
import Dependency from './Dependency'

const Tree = ({ tree }) => (
  <Box>
    <Flex flexWrap='wrap'>
      {tree.map((l, i) => {
        return (
          <Box width={[1, 1 / 2, 1 / 3, 1 / 4, 1 / 5]} key={l.parent.name}>
            <Dependency
              number={i + 1}
              parent={l.parent}
              dependencies={l.dependencies}
            />
          </Box>
        )
      })}
    </Flex>
  </Box>
)

export default Tree
