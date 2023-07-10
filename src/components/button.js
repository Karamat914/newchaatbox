import React from 'react'

export default function Button({ onClick, children, ...props }) {
  return (
    <div onClick={onClick} className={'h-12 uppercase font-bold bg-blue-500 rounded-xl text-white flex justify-center items-center drop-shadow-lg hover:bg-blue-600 active:bg-blue-700 cursor-pointer ' + props.className}>
      {children}
    </div>
  )
}
