
import { Navbar } from '@/components/navbar5'
import Services from '@/components/services'
import CTA from '@/components/shadcn-space/blocks/cta-02/cta'
import Footer from '@/components/shadcn-space/blocks/footer-02/footer'
import Gallery from '@/components/shadcn-space/blocks/gallery-01/gallery'
import React from 'react'

export default function CommonLayout({children}: {children:React.ReactNode}) {
  return (
    <div className='container mx-auto'>
      <Navbar className='flex items-center justify-center'></Navbar>
      {children}
      
      <Footer></Footer>
    </div>
  )
}
