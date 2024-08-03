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
import UserForm from '@/components/layout/UserForm';

const ProfilePage = () => {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/editProfile').then(response => {
        response.json().then(data => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

    if (status === 'loading') {
        return 'Loading ....';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
      }
    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
    
        const savingPromise = new Promise(async (resolve, reject) => {
          const response = await fetch('/api/editProfile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
          if (response.ok)
            resolve()
          else
            reject();
        });
    
        await toast.promise(savingPromise, {
          loading: 'Saving...',
          success: 'Profile saved!',
          error: 'Error',
        });
    
      }

    return (

    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} session={session} onSave={handleProfileInfoUpdate} />
      </div>
      <ToastContainer />
    </section>
    );
};

export default ProfilePage;
