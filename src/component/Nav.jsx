import React from 'react'

const Nav = () => {
  return (
    <nav className='flex justify-between bg-pink-600 text-black py-5'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>MY-Todo</span>
        </div>
       <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
       </ul>
    </nav>
  )
}

export default Nav
