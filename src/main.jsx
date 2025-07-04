import {  StrictMode } from 'react'
import React from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider} from 'react-redux'
import store from './store/store.js'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Protected from  "./components/AuthLayout.jsx"
import SignUp from "./pages/SignUp.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"





const router = createBrowserRouter([
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
          <Protected authentication = {false}>
            < Login />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication = {false}>
            < SignUp />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            < AllPosts />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            < AddPost />
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            < EditPost />
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authentication>
            < Post />
          </Protected>
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
