import React, { useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import axiosClient from '../axios.js'
import { useState } from "react";




const PriceChecker = () => {

  useEffect(() => {
    let selectedDeviceId;
    const codeReader = new BrowserMultiFormatReader();
    console.log('ZXing code reader initialized');

    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceSelect = document.getElementById('sourceSelect');
        selectedDeviceId = videoInputDevices[0].deviceId;
        if (videoInputDevices.length >= 1) {
          videoInputDevices.forEach((element) => {
            const sourceOption = document.createElement('option');
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
          });

          sourceSelect.onchange = () => {
            selectedDeviceId = sourceSelect.value;
          };

          const sourceSelectPanel = document.getElementById('sourceSelectPanel');
          sourceSelectPanel.style.display = 'block';
        }

        document.getElementById('startButton').addEventListener('click', () => {
          codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
           
            
            if (result) {
              console.log(result);
              document.getElementById('result').textContent = result;

Post();

             
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
              document.getElementById('result').textContent = err;
            }
          });
          console.log(`Started continuous decode from camera with id ${selectedDeviceId}`);
        });

        document.getElementById('resetButton').addEventListener('click', () => {
          codeReader.reset();
          document.getElementById('result').textContent = '';
          console.log('Reset.');
        });
       
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="wrapper" style={{ paddingTop: '2em' }}>
      <section className="container" id="demo-content">

        <div>
          <button className="button" id="startButton">Start</button>
          <button className="button" id="resetButton">Reset</button>
        </div>

        <div>
          <video id="video" width="300" height="200" style={{ border: '1px solid gray' }} ></video>
        </div>

        <div id="sourceSelectPanel" style={{ display: 'none' }}>
          <label htmlFor="sourceSelect">Change video source:</label>
          <select id="sourceSelect" style={{ maxWidth: '400px' }}></select>
        </div>
<button onClick={Post}>Helo</button>
        <label>Result:</label>
        <pre><code id="result"></code></pre>

      </section>

     
    </div>
  );
};


 function Post(){
 
axiosClient
.post("/getproduct", { crossdomain: true,barcode: '8717163714942', } ,{
  barcode: '8717163714942',
 
})
.then(({ data }) => {
  alert(data.user)
  console.log(data.user)
  console.log(data.token)
})
.catch((error) => {
  if (error.response) {
    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
    console.log(finalErrors)
    alert(finalErrors)
    setError({__html: finalErrors.join('<br>')})
  }
  console.error(error)
});
}

  
export default PriceChecker;
