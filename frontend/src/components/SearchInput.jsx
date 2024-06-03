import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import useWallet from '@/context/UseWallet'

export const SearchInput = () => {
    const {role} = useWallet();
  return (
    <div className='w-1/3 flex items-center gap-2 p-2'>
        <Search size={20} className='text-zinc-400' />
        <Input className="outline-none border-none p-0 rounded-none h-full" placeholder="Search for Doctors, Records or Files" />
    </div>
  )
}