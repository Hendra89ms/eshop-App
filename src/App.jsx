import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Contact, Login, Register, Reset, NotFound, Admin } from './pages'
import { InputToFIrebase } from './coba'
import { Header } from './components'
import Coba from './coba/Coba'

import { ToastContainer } from 'react-toastify'
import { StateProvider } from './store/stateContext'
import Coba2 from './coba/Coba2'


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
            <Route path='/coba2' element={<Coba2 />} />

            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset' element={<Reset />} />
            <Route path='/inputTofirebase' element={<InputToFIrebase />} />
            {/* <Route path='/filterData' element={<FilterData />} /> */}

            <Route path='*' element={<NotFound />} />
          </Routes>
        </StateProvider>


      </BrowserRouter>
    </div>
  )
}

export default App