import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { instance } from '../insatnce'
import UpdateLogo from './UpdateLogo'

const Navbar = ({dashboard, home, signin}) => {
  const [modal, setModal] = useState(false)
  const [store, setStore] = useState({})
  const [fresh, setFresh] = useState(false);
console.log(store)
  useEffect(() => {
    axios.get(`${instance}/api/get-store`)
    .then((res) => {
      setStore(res.data)
    })
  },[fresh])
  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const reload = () => {
    setFresh(!fresh)
  }
  const navigate = useNavigate()
  return (
    <div className='sticky mt-0 lg:mt-6 w-full lg:w-2/3 bg-gray-400 border mx-auto flex justify-between items-center rounded-b-xl h-16 lg:rounded-3xl shadow-xl'>
        <div className='flex items-center ml-8'>
            { localStorage.getItem('og') ?
              <div onClick={openModal}><img className='rounded-full cursor-pointer' src={store.logo} width={40} alt="" /></div>:
              <img className='rounded-full' src={store.logo} width={40} alt="" />  
            }
            <p className='text-lg font-semibold text-white ml-2'>{store.name}</p>
        </div>
        <UpdateLogo reload={reload} isOpen={modal} onClose={closeModal} />
        <div className='flex items-center mr-8 text-lg font-semibold text-white'>
          {localStorage.getItem('og') && !home && <p className='cursor-pointer' onClick={() => navigate('/')}>HOME</p>}
          {localStorage.getItem('og') && home && <p className='cursor-pointer' onClick={() => navigate('/admin')}>ADMIN</p>}
          {!localStorage.getItem('og') && !signin && <p className='cursor-pointer ml-4' onClick={() => navigate('/signin')}>SIGNIN</p>}
            {localStorage.getItem('og') && <p className='ml-4 hover:bg-red-800 cursor-pointer px-3 py-2 rounded-lg' onClick={() => {
              localStorage.removeItem('og')
              navigate('/signin')
            }}>LOGOUT</p>}
        </div>
    </div>
  )
}

export default Navbar