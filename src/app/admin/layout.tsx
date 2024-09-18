"use client";
import Loader from '@/components/admin-panel/Loader';
import Login from '@/app/login/page';
import Sidebar from '@/components/admin-panel/Sidebar';
import { useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const reduxLoading = useAppSelector(store => store.LoadingReducer);
  
  // Show loader while session is being loaded
  if (status === 'loading') {
    return <Loader />;
  }

  // If the session is not available (user is not authenticated), show the Login page
  if (!session) {
    return <Login />;
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full h-full'>
        <div className='bg-gray-200 p-4'>
          {children}
        </div>
      </div>
      {reduxLoading && <Loader />}
    </div>
  );
};

export default Layout;
