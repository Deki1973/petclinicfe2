import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './styles/App.css'
import './styles/App.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from '../src/components/NavBar.jsx'
import Home from "../src/pages/Home.jsx"
import Owner from "../src/pages/Owner.jsx"
import Pet from './pages/Pet.jsx'
import Vet from './pages/Vet.jsx'
import Appointment from './pages/Appointment.jsx'
import UpdateOwner from './pages/UpdateOwner.jsx'
import AddNewOwner from './pages/AddNewOwner.jsx'
import DeleteOwner from './pages/DeleteOwner.jsx'
import UpdatePet from './pages/UpdatePet.jsx'
import AddNewPet from './pages/AddNewPet.jsx'
import DeletePet from './pages/DeletePet.jsx'
import UpdateVet from './pages/UpdateVet.jsx'
import AddNewVet from './pages/AddNewVet.jsx'
import DeleteVet from './pages/DeleteVet.jsx'
import UpdateAppointment from './pages/UpdateAppointment.jsx'
import AddNewAppointment from './pages/AddNewAppointment.jsx'
import DeleteAppointment from './pages/DeleteAppointment.jsx'
import AddNewAppointment2 from './pages/AddNewAppointment2.jsx'
import NotFound from './pages/NotFound.jsx'




const App=()=>{

  return(
    <>
    <main>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="owner" element={<Owner/>}/>
        <Route path="pet" element={<Pet/>}/>
        <Route path="vet" element={<Vet/>}/>
        <Route path="appt" element={<Appointment/>}/>
        <Route path="update" element={<UpdateOwner/>}/>
        <Route path="owner/add" element={<AddNewOwner/>}/>
        <Route path="owner/delete" element={<DeleteOwner/>}/>
        <Route path="pet/add" element={<AddNewPet/>}/>
        <Route path="pet/update" element={<UpdatePet/>}/>
        <Route path="pet/delete" element={<DeletePet/>}/>
        <Route path="vet/add" element={<AddNewVet/>}/>
        <Route path="vet/update" element={<UpdateVet/>}/>
        <Route path="vet/delete" element={<DeleteVet/>}/>
        <Route path="appt/update" element={<UpdateAppointment/>}/>
        <Route path="appt/add" element={<AddNewAppointment/>}/>
        <Route path="appt/delete" element={<DeleteAppointment/>}/>
        <Route path="appt/add2" element={<AddNewAppointment2/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
    </main>
    </>
  )
}
export default App