import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { MdNotStarted } from 'react-icons/md';
import { FaCircleStop } from 'react-icons/fa6';

function CameraComponent() {
  let navigate = useNavigate();

  const [counter, setCounter] = useState(0); // Initialize counter to 0
  const [intervalId, setIntervalId] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [overDistanceCount, setOverDistanceCount] = useState(0); // New state for over distance count

  const overDistanceCountRef = useRef(0);
  const [hasStarted, setHasStarted] = useState(false); // State to track if the start button has been pressed

  const handleSelectChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const startCounter = () => {
    if (!intervalId && selectedTime) {
      const initialCounter = parseInt(selectedTime) * 60; // Convert selectedTime to seconds
      setCounter(initialCounter);

      const id = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      setIntervalId(id);
    }
  };

  const stopCounter = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCounter(0);
  };

  useEffect(() => {
    if (counter === -1) {
      stop();
      alert('Time is out');
    }
  }, [counter, intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const buttonStyle = {
    backgroundColor: '#FF69B4',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '5px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  };

  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function getVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.error('Error accessing the camera', err);
        setError(
          'Error accessing the camera. Please check your camera permissions.'
        );
      }
    }

    if (location.pathname === '/newsession') {
      getVideo();
    }
  }, [videoRef]);

  const start = () => {
    setHasStarted(true);
    // console.log("has started: ", hasStarted)
    startCounter();
    overDistanceCountRef.current = 0;
  };

  const stop = async () => {
    stopCamera();
    stopCounter();
    setHasStarted(false);
    const minutes = Math.floor((selectedTime * 60 - counter) / 60);
    const seconds = (selectedTime * 60 - counter) % 60;
    let percentage =
      (overDistanceCountRef.current * 10) / (minutes * 60 + seconds);
    console.log('percentage: ', percentage);
    const remaining_time = `${minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    navigate('/summary', {
      state: { remaining_time: remaining_time, violation_Count: percentage },
    });
    overDistanceCountRef.current = 0;
  };

  const stopCamera = () => {
    if (streamActive) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setStreamActive(false);
    }
  };

  //detection logic
  const [distanceMessage, setDistanceMessage] = useState('Ready to go');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  async function detectEyes() {
    // console.log("IsAudioPlaying: ", isAudioPlaying)
    // console.log("audioRef.current:", audioRef.current);
    if (videoRef.current && streamActive) {
      // console.log("Detecting eyes...");
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      if (detections) {
        const landmarks = detections.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        // Calculate the center point of each eye
        const leftEyeCenter = leftEye.reduce(
          (acc, curr) => ({
            x: acc.x + curr.x / leftEye.length,
            y: acc.y + curr.y / leftEye.length,
          }),
          { x: 0, y: 0 }
        );
        const rightEyeCenter = rightEye.reduce(
          (acc, curr) => ({
            x: acc.x + curr.x / rightEye.length,
            y: acc.y + curr.y / rightEye.length,
          }),
          { x: 0, y: 0 }
        );

        // Calculate pixel distance between the centers of the two eyes
        const distancePixels = Math.sqrt(
          Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) +
            Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
        );

        // console.log('Distance between eyes in pixels:', distancePixels);

        // Set the message based on the distance
        if (distancePixels > 70) {
          setDistanceMessage('Please get further');
          // console.log("hasStarted: ", hasStarted)
          // console.log("overdistance: ", overDistanceCount)
          if (hasStarted) {
            overDistanceCountRef.current += 1; // Updating ref
            // console.log("Ref Count:", overDistanceCountRef.current);

            audioRef.current.play(); // Start playing the audio
            setIsAudioPlaying(true);
            // console.log("overDistanceCount", overDistanceCount)
          }
          return true;
        } else {
          setDistanceMessage('Ready to go');
          // console.log("should stop now")
          audioRef.current.pause(); // Pause the audio
          setIsAudioPlaying(false);
        }
      } else {
        // console.log("No detections");
        // Set the message when no detections are found
        setDistanceMessage('No detections');
        audioRef.current.pause(); // Pause the audio
        setIsAudioPlaying(false);
      }
    } else {
      // Handle the case where the video or stream is not active
      if (isAudioPlaying) {
        audioRef.current.pause(); // Pause the audio
        setIsAudioPlaying(false);
      }
    }
    return false;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      detectEyes();
    }, 100); // Interval timer calls the detectEyes function every 100 milliseconds (0.1 seconds)

    return () => clearInterval(interval);
  }, [streamActive]);

  useEffect(() => {
    if (hasStarted) {
      const interval = setInterval(() => {
        detectEyes();
      }, 100); // Call detectEyes every 100 milliseconds

      return () => clearInterval(interval);
    }
  }, [hasStarted]);

  useEffect(
    () => {
      if (detectEyes) {
        if (hasStarted) {
          setOverDistanceCount((count) => count + 1);
        }
      }
    },
    [hasStarted],
    [overDistanceCount]
  );

  useEffect(() => {
    async function loadModels() {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        // console.log("Models loaded successfully");
      } catch (error) {
        console.error('Error loading models', error);
      }
    }
    loadModels();
  }, []);
  const formatTime = () => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div style={{ fontFamily: 'Monomaniac One', color: 'white' }}>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="rounded-xl h-96">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-3xl h-96"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      <div className="flex justify-evenly items-center py-3">
        <select
          className="rounded-xl h-fit py-4"
          style={{ color: 'black' }}
          name="times"
          id="time-select"
          onChange={handleSelectChange}
          value={selectedTime}
        >
          <option value="">Select an option</option>
          <option value="10">10:00</option>
          <option value="20">20:00</option>
          <option value="30">30:00</option>
          <option value="40">40:00</option>
        </select>
        <button onClick={start} style={buttonStyle} className="rounded-full">
          <MdNotStarted size={40} />
        </button>
        <button onClick={stop} style={buttonStyle}>
          <FaCircleStop size={40} />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div style={{ alignItems: 'center', fontSize: '125px' }}>
          {formatTime()}
        </div>

        <h2>{distanceMessage}</h2>
      </div>
      <audio ref={audioRef} src="nana.mp3" preload="auto"></audio>
    </div>
  );
}

export default CameraComponent;
