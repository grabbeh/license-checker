import React, { useState, Children, cloneElement } from 'react'

const ShowAllToggle = ({ children }) => {
  const [toggleAll, useToggle] = useState(false)
  const updated = Children.map(children, child => {
    console.log(children)
    return cloneElement(child, {
      active: toggleAll
    })
  })

  return (
    <div>
      <div
        onClick={() => {
          useToggle(!toggleAll)
        }}
      >
        Toggle
      </div>
      <div>{updated}</div>
    </div>
  )
}

export default ShowAllToggle
