import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "@/components/chat";
import Login from "@/components/login";

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
