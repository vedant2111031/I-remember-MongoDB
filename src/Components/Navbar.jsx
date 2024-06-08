import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-100 flex justify-between items-center px-5 py-4'>
      <div className='logo text-2xl font-bold'>
      <span className='text-blue-400'>I-</span>
      <span className='text-blue-600'>rem</span>
      <span className='text-blue-800'>ember</span>
      </div>
        <ul className='font-bold text-blue-500 px-9 g'>
          <li className='flex gap-3'>
            <a href="https://github.com/vedant2111031" target='/blank' className='hover:text-blue-800'>Github</a>
            <a href="https://www.linkedin.com/in/vedant-pandey7/" target='/blank' className='hover:text-blue-800'>Linkedin</a>
            <a href="https://x.com/vedant1262" target='/blank' className='hover:text-blue-800'>X</a>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar
