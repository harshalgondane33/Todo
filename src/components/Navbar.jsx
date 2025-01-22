import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 p-4 text-white'>
        <div className="logo">
            <span className='text-2xl font-bold text-red-300 mx-8'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Todos</li>
        </ul>
    </nav>
  )
}

export default Navbar
