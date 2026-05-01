import React from 'react'
import Weather from './components/Weather'
import { Analytics } from '@vercel/analytics/react'

const App = () => {
  return (
    <div className='app'>
      <Weather />
      <Analytics />
    </div>
  )
}

export default App