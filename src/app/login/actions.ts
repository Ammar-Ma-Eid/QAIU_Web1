'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type State = {
  error?: string
}

export async function login(prevState: State | undefined, formData: FormData): Promise<State | undefined> {
  const username = formData.get('username')
  const password = formData.get('password')

  // In a real application, these should be environment variables.
  if (username === 'adminQAIU_2025' && password === 'QAIU_adminpassword_2025') {
    // This is a simplified secret token for demonstration.
    // In a real application, you should use a more secure session management strategy.
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now
    cookies().set('auth_token', 'QAIU_ADMIN_TOKEN_SECRET_2025', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: expires,
    })
  } else {
    return { error: 'Invalid username or password. Please try again.' }
  }
  
  // Redirect must be called outside of the try/catch block.
  redirect('/admin')
}

export async function logout() {
  cookies().delete('auth_token')
  redirect('/login')
}
