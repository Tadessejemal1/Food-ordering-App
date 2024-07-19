import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <header className='flex items-center justify-between'>
        <Link href="/" className='text-primary font-semibold text-2xl'>
          ST PIZZA
        </Link>
          <nav className='flex gap-8 text-gray-500 font-semibold'>
            <Link href={''}>Home</Link>
            <Link href={''}>Menu</Link>
            <Link href={''}>About</Link>
            <Link href={''}>Contact</Link>
            <Link className='bg-primary text-white rounded-full px-6 py-2' href={''}>Login</Link>
          </nav>
      </header>
    </>
  )
}

export default Header
