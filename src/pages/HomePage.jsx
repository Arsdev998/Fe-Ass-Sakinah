import Hero from '@/components/Home/hero/Hero'
import React from 'react'

const HomePage = () => {
  return (
    <main className='min-h-screen flex flex-col  mx-auto w-full max-w-[1400px]'>
      <section className='hero flex flex-col justify-center'>
        <Hero/>
      </section>
    </main>
  )
}

export default HomePage
