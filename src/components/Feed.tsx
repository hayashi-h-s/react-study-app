import { Button } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';

const Feed = () => {
  return (
    <div>Feed
      <Button
        onClick={()=> signOut(auth)}
      >
        Logout
      </Button>
    </div>
  )
}

export default Feed
