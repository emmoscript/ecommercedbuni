"use client"
import Loader from '@/components/admin-panel/Loader'
import Login from '@/components/admin-panel/Login'
import Sidebar from '@/components/admin-panel/Sidebar'
import { useAppSelector } from '@/redux/hooks'
import { useSession } from 'next-auth/react'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {

    const isLoading = useAppSelector(store => store.LoadingReducer)
    const {data: session} = useSession()

    if(!session?.user){
        return <Login />
    }

    return <div className='flex'>
      <Sidebar/>
      <div className='w-full h-full'>
        {/*<Navbar setShowCart={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.')
        } }/>*/}
        <div className='bg-gray-200 p-4 ]'>
          {children}
        </div>
      </div>
      {isLoading && <Loader/>}
    </div>
};

export default Layout