// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createbrowserRouter, RouterProvider } from "react-router-dom"
import { Provider} from 'react-redux'
import store from './store/store.js'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import AuthLayout from  "./components/AuthLayout.jsx"
import SignUp from "./pages/SignUp.jsx"



const router = createbrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          // uses prop to confirm whether or not auth is needed at this page
          <AuthLayout authentication = {false}>
            < Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          // uses prop to confirm whether or not auth is needed at this page
          <AuthLayout authentication = {false}>
            < SignUp />
          </AuthLayout>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* making sure the router grabs the auth information from user/manages the state*/}
    <Provider store ={store}>
     <RouterProvider router={router }/>  
    </Provider>
  </React.StrictMode>
)
