'use client'

interface RecoilContextProviderProps {
  children: React.ReactNode
}

import React, { FunctionComponent } from 'react'
import { RecoilRoot } from 'recoil'
const RecoilContextProvider: FunctionComponent<RecoilContextProviderProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
export default RecoilContextProvider
