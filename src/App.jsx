import React from 'react';
import './App.css'
import { Button } from "@/components/ui/button"
import Hero from "@/components/ui/custom/Hero"

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <Hero />
    </>
  )
}

export default App;
