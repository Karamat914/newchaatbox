import React from 'react'
import MagaluLogo from './magalu-logo'

export default function AppBar() {
  return (
    <div className='bg-blue-500 p-4 h-14 drop-shadow-lg' onClick={() => {
      window.location.reload()
    }}>
      <MagaluLogo />
    </div>
  )
}
