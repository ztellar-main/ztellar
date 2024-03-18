import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function Toastify({message},e) {

  // useEffect(() => {
  //   if(message2 !== undefined){
  //     notify();
  //   }
  // },[])

  useEffect(() => {
    if(message !== undefined){
      notify();
    }
  },[])

  const notify = (e) => {
    toast.success(
    `${message}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    top:'100px'
    })};



  return (
    <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
  )
}

export default Toastify