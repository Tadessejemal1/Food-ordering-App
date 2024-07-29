'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const session = useSession();
  console.log(session);
  const status = session.status;
  const userName = session.data;
  const userB = userName?.user.name;
  console.log(userB);

  return (
    <header className='flex items-center justify-between p-4 bg-white shadow-md'>
      <Link href="/" className='text-primary font-semibold text-2xl'>
        ST PIZZA
      </Link>
      <nav className='flex gap-8 text-gray-500 font-semibold'>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <nav className='flex items-center gap-4 text-gray-500 font-semibold'>

        {status === 'authenticated' ? (
          <>
           <Link href={'/editProfile'} className="whitespace-nowrap">Hello, {userB}</Link>
            <button className="bg-primary rounded-full text-white px-8 py-2" onClick={() => signOut()}>
            Logout
          </button>
          </>
     
        ) : (
          <>
            <Link href="/login" className='rounded-full px-6'>Login</Link>
            <Link href="/register" className="bg-primary rounded-full text-white px-8 py-2">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
