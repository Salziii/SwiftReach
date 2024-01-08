import { Metadata } from 'next'
import React from 'react'
import Header from '../(components)/header'

export const metadata: Metadata = {
 title: "Services"
}

export default function page() {
  return <Header />
}
