import React from 'react'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'

export default function App(){
  return (
    <div className="min-h-screen flex bg-[linear-gradient(180deg,#0B1120_0%,#111827_50%,#1E293B_100%)] text-slate-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <main className="mt-6">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
