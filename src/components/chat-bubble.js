import React from 'react'

export default function ChatBubble(props) {
  const className =
    'bubble w-fit text-left rounded-xl bg-blue-500 text-white p-1 px-3 whitespace-pre-line drop-shadow-lg ' + props.className + ' '
    + (props.secondary ? 'bg-green-600 rounded-br-none  text-right ' : 'bg-blue-500 rounded-bl-none' )
  return (
    <div {...props} className={className}>
      {props.content}
    </div>
  )
}
