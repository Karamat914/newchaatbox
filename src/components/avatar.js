import React from 'react'

export default function Avatar(props) {
  return (
    <div className='flex justify-center items-center text-xl font-bold text-white rounded-full bg-blue-500 basis-8 grow-0 shrink-0 w-8 h-8 drop-shadow-lg overflow-hidden'>
      {!props.src && <p>{props.initial}</p>}
      {props.src && <img src={props.src} alt="Lu's profile" />}
    </div>
  )
}
