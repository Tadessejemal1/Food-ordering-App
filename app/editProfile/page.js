'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Link from "next/link";
import UserTabs from "@/components/layout/userTabs";

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.user.name || '');
            setUserImage(session.user.image || '');
            
            const fetchUserData = async () => {
                try {
                    const response = await fetch('/api/editProfile');
                    if (response.ok) {
                        const data = await response.json();
                        setPhoneNumber(data.phoneNumber || '');
                        setStreetAddress(data.streetAddress || '');
                        setPostalCode(data.postalCode || '');
                        setCity(data.city || '');
                        setCountry(data.country || '');
                        setIsAdmin(data.admin || "")
                    } else {
                        const errorData = await response.json();
                        setError(`Error: ${errorData.error || 'Failed to fetch user data'}`);
                    }
                } catch (err) {
                    setError(`Error: ${err.message}`);
                }
            };

            fetchUserData();
        }
    }, [status, session]);

    if (status === 'loading') {
        return 'Loading ....';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        toast('Saving!', {
            className: 'whitespace-nowrap',
            bodyClassName: 'text-sm',
        });
        try {
            const response = await fetch('/api/editProfile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: userName, 
                    image: userImage,
                    phoneNumber,
                    streetAddress,
                    postalCode,
                    city,
                    country
                }),
            });

            if (response.ok) {
                toast.success('Profile saved successfully!', {
                    className: 'bg-green-500 text-white rounded-lg px-4 py-3 shadow-lg whitespace-nowrap',
                    bodyClassName: 'text-sm',
                });
                setError('');
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.error || 'Profile update failed'}`);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    }

    async function handleUpload(ev) {
        const files = ev.target.files;
        if (files?.length > 0) {
            const data = new FormData();
            data.append('file', files[0]);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });

                if (response.status === 200) {
                    const responseData = await response.json();
                    toast.success('Image uploaded successfully!', {
                        className: 'bg-green-500 text-white rounded-lg px-4 py-2 shadow-lg whitespace-nowrap',
                        bodyClassName: 'text-sm',
                    });
                    setUserImage(responseData.link);
                } else {
                    const errorData = await response.json();
                    console.error(`Upload failed: ${errorData.error || 'Unknown error'}`);
                }
            } catch (err) {
                console.error(`Upload error: ${err.message}`);
            }
        }
    }

    return (
        <section className='mt-8'>
           <UserTabs isAdmin={isAdmin} />
            <form className='max-w-sm mx-auto' onSubmit={handleProfileInfoUpdate}>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center'>
                        <div className='relative bg-gray-300 p-2 rounded-lg'>
                            {userImage ? (
                                <Image src={userImage} alt='User profile image' width={64} height={64} objectFit='contain' />
                            ) : (
                                <Image src='/pizza.png' alt='Default image' width={64} height={64} objectFit='contain' />
                            )}
                            <label>
                                <input type='file' className='hidden' onChange={handleUpload} />
                                <span className='text-center block border-gray-300 p-2 cursor-pointer' type='button'>Edit</span>
                            </label>
                        </div>
                        <div className='flex-1'>
                            <label htmlFor='userName' className='block text-sm font-medium text-gray-700'>
                                Name
                            </label>
                            <input
                                id='userName'
                                type='text'
                                value={userName}
                                onChange={ev => setUserName(ev.target.value)}
                                placeholder='First and Last name'
                                className='w-full p-2 border border-gray-300 rounded-md mt-1'
                            />
                            
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mt-2'>
                                Email
                            </label>
                            <input
                                id='email'
                                type='email'
                                disabled
                                placeholder='Email'
                                value={session.user.email}
                                className='w-full p-2 border border-gray-300 rounded-md mt-1'
                            />
                            
                            <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 mt-2'>
                                Phone number
                            </label>
                            <PhoneInput
                                id='phoneNumber'
                                international
                                defaultCountry="US"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                placeholder='Phone number'
                                className='w-full p-2 border border-gray-300 rounded-md mt-1'
                            />
                            
                            <label htmlFor='streetAddress' className='block text-sm font-medium text-gray-700 mt-2'>
                                Street Address
                            </label>
                            <input
                                id='streetAddress'
                                type='text'
                                value={streetAddress}
                                onChange={ev => setStreetAddress(ev.target.value)}
                                placeholder='Street Address'
                                className='w-full p-2 border border-gray-300 rounded-md mt-1'
                            />
                            
                            <div className='flex gap-4 mt-2'>
                                <div className='flex-1'>
                                    <label htmlFor='postalCode' className='block text-sm font-medium text-gray-700'>
                                        Postal Code
                                    </label>
                                    <input
                                        id='postalCode'
                                        type='text'
                                        value={postalCode}
                                        onChange={ev => setPostalCode(ev.target.value)}
                                        placeholder='Postal Code'
                                        className='w-full p-2 border border-gray-300 rounded-md'
                                    />
                                </div>
                                
                                <div className='flex-1'>
                                    <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                                        City
                                    </label>
                                    <input
                                        id='city'
                                        type='text'
                                        value={city}
                                        onChange={ev => setCity(ev.target.value)}
                                        placeholder='City'
                                        className='w-full p-2 border border-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                            
                            <label htmlFor='country' className='block text-sm font-medium text-gray-700 mt-2'>
                                Country
                            </label>
                            <input
                                id='country'
                                type='text'
                                value={country}
                                onChange={ev => setCountry(ev.target.value)}
                                placeholder='Country'
                                className='w-full p-2 border border-gray-300 rounded-md mt-1'
                            />
                            
                            <button type='submit' className='mt-4 bg-blue-500 text-white p-2 rounded-md'>Save</button>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </form>
            <ToastContainer />
        </section>
    );
};

export default ProfilePage;
