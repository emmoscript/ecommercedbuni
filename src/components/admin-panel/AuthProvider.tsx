"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import React from 'react'

interface PropsType {
    children: React.ReactNode
    
}

const AuthProvider = ({children}: PropsType) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider