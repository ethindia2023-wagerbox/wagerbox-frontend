import { RouterProvider } from "react-router-dom";

import './App.css'

import Router from "./Router";

const App = () => {
  return (
    <>
      <RouterProvider router={Router}/>
    </>
  )
}

export default App
