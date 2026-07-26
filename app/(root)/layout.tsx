import { Footer } from '@/components/layouts/footer'
import { MainHeader } from '@/components/layouts/main-header'
import { TypeLayout } from '@/types'
import React from 'react'

const Layout = ({children}:TypeLayout) => {
  return (
    <>
    <MainHeader/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout