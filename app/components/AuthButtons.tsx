'use client'

import { signIn } from 'next-auth/react'
import { signOut } from 'next-auth/react'

export function SignIn() {
    return (
        <button onPointerDown={() => signIn()
            .catch(err => console.error(err))
        }>
            Sign in
        </button>
    )
}

export function SignOut(){

    return (
        <button onPointerDown={() => signOut()
            .catch(err => console.error(err))
        }>
            Sign out
        </button>
    )
}
