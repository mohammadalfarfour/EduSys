
  import React, { Component } from "react";
  import axiosClient from '../axios.js'
  import { useState } from "react";

  export default function Dashboard() {
    const [error, setError] = useState({ __html: "" });
    const onSubmit = (ev) => {
      ev.preventDefault();
      setError({ __html: "" });

    axiosClient
    .post("/getproduct", { crossdomain: true } ,{
      barcode: 'Mohammad Farfour',
     
    })
    .then(({ data }) => {
      console.log(data.user)
      console.log(data.token)
    })
    .catch((error) => {
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
        console.log(finalErrors)
        setError({__html: finalErrors.join('<br>')})
      }
      console.error(error)
    });
};


    return (
      <div>
      <form
      onSubmit={onSubmit}
      className="mt-8 space-y-6"
      action="#"
      method="POST"
    >
 <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Click Me</button>
</form>      

      </div>
    )
  }
  