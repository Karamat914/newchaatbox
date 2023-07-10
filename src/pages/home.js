import React from 'react'
import AppBar from '../components/app-bar'
import Button from '../components/button'
import ChatBubble from '../components/chat-bubble'

export default function Home({onStartSession}) {
  return (
    <div className='h-screen w-screen flex flex-col overflow-hidden' style={{ background: 'radial-gradient(99.45% 99.45% at 50% 0.55%, #FFFFFF 0%, #FFFFFF 0.01%, #FFFFFF 75%, #2596FD 96.88%, #0086FF 100%)' }}>
      <AppBar />
      <div className='text-center p-6 flex-1 flex flex-col justify-between pt-14'>
        <div className='text-blue-500 text-4xl font-bold'>
          Encontre o produto ideal para sua ocasião comigo!
        </div>
        <div className='text-lg'>
          Eu sou a Lu, e utilizando Aprendizado de Máquina e Processamento de Linguagem Natural, posso recomendar o produto perfeito especialmente para você.
        </div>

        <Button onClick={()=>{onStartSession()}}>iniciar</Button>
      </div>
      <div className='h-96 relative img_button'>
        <img className='absolute bottom-0 left-6 h-full' src="/logo-lu-do-magalu.webp" alt="" />
        <div className='absolute w-fit top-0 left-56 lg:left-64 xl:left-64 2xl:left-10 btn_estou'>
          <ChatBubble content={'Estou aqui para te ajudar!'} />
        </div>
      </div>
    </div>
  )
}