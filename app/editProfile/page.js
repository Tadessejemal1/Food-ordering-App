'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');

    async function handleProfileInfoUpdate(ev) {
      setSucess(true)
        ev.preventDefault();
        try {
            const response = await fetch('/api/editProfile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName }),
            });

            if (response.ok) {
                setSucess(true)
                setError('');
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.error || 'Profile update failed'}`);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.user.name);
        }
    }, [status, session]);

    if (status === 'loading') {
        return 'Loading ....';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return (
        <section className='mt-8'>
            <h1 className='text-center text-primary text-4xl'>Profile</h1>
            {sucess && <h2 className='text-green-500 text-center'>Profile saved successfully!</h2>} {/* Success message */}
            <form className='max-w-sm mx-auto border' onSubmit={handleProfileInfoUpdate}>
                <div className='flex gap-2 items-center'>
                    <div className='relative bg-gray-300 p-2 rounded-lg'>
                        <Image src={'/pizza.png'} objectFit={'contain'} alt={'pizza'} width={64} height={64} />
                        <button type='button'>Change avatar</button>
                    </div>
                    <div>
                        <input
                            type='text'
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                            placeholder='First and Last name'
                        />
                        <input type='email' disabled placeholder='Email' value={session.user.email} />
                        <button type='submit'>Save</button>
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </section>
    );
};

export default ProfilePage;
