import React from 'react'
import { hierarchy, tree } from 'd3-hierarchy'
import * as d3 from 'd3'
import Box from './Box'

const width = 650

const createTree = data => {
  const root = hierarchy(data)
  root.dx = 50
  root.dy = width / (root.height + 1)
  return tree().nodeSize([root.dx, root.dy])(root)
}

const drawTree = data => {
  // create a hierarchy from the root

  const root = createTree(data)

  let x0 = Infinity
  let x1 = -x0
  root.each(d => {
    if (d.x > x1) x1 = d.x
    if (d.x < x0) x0 = d.x
  })

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2])

  const g = svg
    .append('g')
    .attr('font-size', 20)
    .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`)

  const link = g
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#4b3cfa')
    .attr('stroke-opacity', 1)
    .attr('stroke-width', 2)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .attr(
      'd',
      d3
        .linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
    )

  const node = g
    .append('g')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants())
    .join('g')
    .attr('transform', d => `translate(${d.y},${d.x})`)
  /*
  node
    .append('circle')
    .attr('fill', d => (d.children ? '#555' : '#999'))
    .attr('r', 2.5)
*/
  node
    .append('text')
    .attr('dy', '0.31em')

    .attr('text-anchor', d => (d.children ? 'end' : 'start'))
    .text(d => d.data.name)
    .clone(true)
    .lower()
    .attr('stroke', 'white')
  return { __html: svg.node().innerHTML }
}

const TreeVis = ({ tree }) => {
  return (
    <Box>
      {tree && (
        <svg
          style={{ overflowY: 'scroll', width: '100%', height: '100vh' }}
          dangerouslySetInnerHTML={drawTree(tree)}
        />
      )}
    </Box>
  )
}

export default TreeVis
