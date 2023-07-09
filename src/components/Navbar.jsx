import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='sticky mt-0 lg:mt-6 w-full lg:w-2/3 bg-gray-400 border mx-auto flex justify-between items-center rounded-b-xl h-16 lg:rounded-3xl shadow-xl'>
        <div className='flex items-center ml-8'>
            <img className='rounded-full' src="https://e7.pngegg.com/pngimages/2/1016/png-clipart-silhouette-of-a-dove-bird-wings-logo.png" width={40} alt="" />
            <p className='text-lg font-semibold text-white ml-2'>TEST</p>
        </div>
        <div className='flex items-center mr-8 text-lg font-semibold text-white'>
            {localStorage.getItem('og') && <p className='ml-4 hover:bg-red-800 cursor-pointer px-3 py-2 rounded-lg' onClick={() => {
              localStorage.removeItem('og')
              navigate('/signin')
            }}>LOGOUT</p>}
        </div>
    </div>
  )
}

export default Navbar