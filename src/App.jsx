import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Contact, Login, Register, Reset, NotFound, Admin } from './pages'
import { InputToFIrebase, FilterData } from './coba'
import { Header, Product_list, Product_Laptop, Product_Electonics, Product_fashion, Product_phone, SelectLenovo, SelectHp, SelectOppo, SelectSamsung, SelectTechno } from './components'
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
            {/* STATE PROVIDER DARI USE CONTEXT */}

            <Route path='/' element={<Home />}>
              <Route index element={<Product_list />} />
              <Route path='/laptop' element={<Product_Laptop />} />
              <Route path='/electronics' element={<Product_Electonics />} />
              <Route path='/fashion' element={<Product_fashion />} />
              <Route path='/phone' element={<Product_phone />} />
              {/* Select */}
              <Route path='/lenovo' element={<SelectLenovo />} />
              <Route path='/hp' element={<SelectHp />} />
              <Route path='/samsung' element={<SelectSamsung />} />
              <Route path='/oppo' element={<SelectOppo />} />
              <Route path='/techno' element={<SelectTechno />} />
            </Route>


            <Route path='/coba' element={<Coba />} />

            {/* <Route
            path='/admin/*'
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          /> */}

            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset' element={<Reset />} />
            <Route path='/inputTofirebase' element={<InputToFIrebase />} />
            <Route path='/filterData' element={<FilterData />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </StateProvider>


      </BrowserRouter>
    </div>
  )
}

export default App