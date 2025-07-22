// "use client"

import { useState } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import AuthPage from "./page"
import Dashboard from "./dashboard/page"

const inter = Inter({ subsets: ["latin"] })

interface User {
  email: string
  name: string
  organization: string
}

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {user ? <Dashboard user={user} onLogout={handleLogout} /> : <AuthPage onLogin={handleLogin} />}
        <Toaster />
      </body>
    </html>
  )
}

// export const metadata = {
//       generator: 'v0.dev'
//     };
