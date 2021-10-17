import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function App() {
const [ready, setReady] = useState(false);

const load = async () => {
  await ffmpeg.load();
  setReady(true);
}

useEffect(() => {
  load();
}, [])



 return (<div className="App">

 </div>);
}

export default App;
