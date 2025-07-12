import { useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import Header from './components/header/header'
import Footer from './components/footer/Footer'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch

  useEffect(()=>{
    //check if user is logged in 
    //if true then load page otherwise, load null
     authService.getCurrentUser().then((userData)=>{
      if(userData) dispatch(login({
      userData}))
      else dispatch(logout())
     })
     .finally(()=> setLoading(false))
    },[dispatch])
  return !loading ? (
    <>
      <div className=" min-h-screen flex flex-wrap bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet/>
          </main>
          <div className="w-full block">
            <Footer />
          </div>
        </div>
      
        
      </div>
    </>
  )
  : null

  }


export default App
