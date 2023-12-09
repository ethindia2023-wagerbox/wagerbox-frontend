import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { HuddleProvider, HuddleClient } from '@huddle01/react';


import './App.css'

import Router from "./Router";

const HUDDLE_PROJ_ID = import.meta.env.VITE_HUDDLE_PROJ_ID;
const HUDDLE_API_KEY = import.meta.env.VITE_HUDDLE_API_KEY;

const huddleClient = new HuddleClient({
  projectId: HUDDLE_PROJ_ID,
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

const App = () => {
  return (
    <>
      <HuddleProvider key={HUDDLE_API_KEY} client={huddleClient}>
        <RouterProvider router={Router} />
      </HuddleProvider>
    </>
  )
}

export default App
