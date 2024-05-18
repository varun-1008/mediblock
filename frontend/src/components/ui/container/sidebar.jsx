import useWallet from '@/context/UseWallet';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const { address, contract } = useWallet();
  const navigate = useNavigate();
  return (
    <div>sidebar</div>
  )
}

