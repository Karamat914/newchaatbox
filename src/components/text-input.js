import React from 'react'

export default function TextInput(props) {
  return (
    <input type="text" {...props} className={'rounded-xl px-2 focus-visible:border-blue-500 ' + props.className} />
  )
}
