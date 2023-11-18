import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const Admin = async() => {
  const session = await getServerSession(authOptions);
  if(session?.user){
    return (
      <div>
        <h1 className='text-2xl'>Welcome {session?.user.username} to dashboard admin side  </h1>
      </div>
    );
  }
    return (
      <div className='text-2xl'>
        Please login...
      </div>
    )
  
}

export default Admin