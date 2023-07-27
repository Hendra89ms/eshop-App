import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Contact, Login, Register, Reset, NotFound, Admin } from './pages'
import { InputToFIrebase } from './coba'
import { Header, DetailsProduct } from './components'
import Coba from './coba/Coba'

import { ToastContainer } from 'react-toastify'
import { StateProvider } from './store/stateContext'


function App() {

  return (
    <div className='w-screen '>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        {/* <Coba /> */}

        <StateProvider>
          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/coba' element={<Coba />} />

            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset' element={<Reset />} />
            <Route path='/details/:id' element={<DetailsProduct />} />
            <Route path='/inputTofirebase' element={<InputToFIrebase />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </StateProvider>


      </BrowserRouter>
    </div>
  )
}

export default App