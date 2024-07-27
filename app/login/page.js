"use client";
import { useState } from 'react'
import {signIn} from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
      ev.preventDefault();
      setLoginInProgress(true);
  
      await signIn('credentials', {email, password, callbackUrl: '/'});
  
      setLoginInProgress(false);
    }
  return (
    <section className='text-center text-primary text-4xl mb-4' onSubmit={handleFormSubmit}>
      <h1>
        Login
      </h1>
      <form className="max-w-xs mx-auto" >
        <input 
            type='email' placeholder='email' value={email} 
            disabled={false} className=''
            onChange={ev => setEmail(ev.target.value)} 
        />
        <input 
            type='password' 
            placeholder='password' value={email} disabled={false} 
            className=''
            onChange={ev => setPassword(ev.target.value)} 
        />
         <button disabled={loginInProgress} type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  )
}

export default LoginPage
