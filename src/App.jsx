import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function App() {
const [ready, setReady] = useState(false);
const [video, setVideo] = useState();
const [gif, setGif] = useState();
const [mp3, setMp3] = useState();

const load = async () => {
  await ffmpeg.load();
  setReady(true);
}

useEffect(() => {
  load();
}, [])

const convertToGif = async () => {
  // Write the file to memory 
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

  // Run the FFMpeg command
  await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

  // Read the result
  const data = ffmpeg.FS('readFile', 'out.gif');

  // Create a URL
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
  setGif(url)
} 

const convertToMp3 = async () => {
  // Write the file to memory 
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

  // Run the FFMpeg command
  await ffmpeg.run('-i', 'test.mp4', '-q:a', '0', '-map', 'a','out.mp3');

  // Read the result
  const data = ffmpeg.FS('readFile', 'out.mp3');

  // Create a URL
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
  setMp3(url)
} 

 return ready? 
  <div className="App">
    <h2>Video file to GIF converter</h2>
      
      { video && <video
        controls
        width="250"
        src={URL.createObjectURL(video)}>
      </video>}

      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />

      <ul>

        {/* Convert to GIF: */}
        <li><h3>Convert to gif</h3>
          <button onClick={convertToGif}>Convert</button>
          { gif && <img src={gif} width="250" />}
        </li>

        {/* Convert to MP3: */}
        <li><h3>Convert to mp3</h3>
          <button onClick={convertToMp3}>Convert</button>
          {mp3 && <audio controls>
          <source src={mp3} type="audio/ogg"></source>
          </audio>}
        </li>
      </ul>
  </div>:
  <div>Loading...</div>;
}

export default App;
