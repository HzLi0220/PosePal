import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';

function CameraComponent() {
    let navigate = useNavigate();

    const [counter, setCounter] = useState(0); // Initialize counter to 0
    const [intervalId, setIntervalId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');

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

    const pauseCounter = () => {
        if (isPaused) {
            if (!intervalId) {
                const id = setInterval(() => {
                    setCounter(prevCounter => prevCounter -1 );
                }, 1000);
                setIntervalId(id);
            }
        } else {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
        setIsPaused(!isPaused);
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
            alert("Time is out");
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
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
    };

    const videoRef = useRef(null);
    const [streamActive, setStreamActive] = useState(false);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const location = useLocation();

    useEffect(() => {
        async function getVideo() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStreamActive(true);
                }
            } catch (err) {
                console.error("Error accessing the camera", err);
                setError("Error accessing the camera. Please check your camera permissions.");
            }
        }

        if (location.pathname === '/newsession') {
            getVideo();
        }
    }, [videoRef]);

    const pause = () => {
        pauseCounter();
        togglePlayback();
    };

    const start = () => {
        startCounter();
    };

    const stop = () => {
        stopCamera();
        stopCounter();
        const minutes = Math.floor((selectedTime * 60 - counter) / 60);
        const seconds = (selectedTime * 60 - counter) % 60;
        const remaining_time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        navigate('/summary', { state: { remaining_time } });
    };

    const stopCamera = () => {
        if (streamActive) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            setStreamActive(false);
        }
    };

    const togglePlayback = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    //detection logic
    const [distanceMessage, setDistanceMessage] = useState("Ready to go");
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef(null);

    async function detectEyes() {
        console.log("IsAudioPlaying: ",isAudioPlaying)
        console.log("audioRef.current:", audioRef.current);
        if (videoRef.current && streamActive) {
            console.log("Detecting eyes...");
            const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

            if (detections) {
                const landmarks = detections.landmarks;
                const leftEye = landmarks.getLeftEye();
                const rightEye = landmarks.getRightEye();

                // Calculate the center point of each eye
                const leftEyeCenter = leftEye.reduce((acc, curr) => ({ x: acc.x + curr.x / leftEye.length, y: acc.y + curr.y / leftEye.length }), { x: 0, y: 0 });
                const rightEyeCenter = rightEye.reduce((acc, curr) => ({ x: acc.x + curr.x / rightEye.length, y: acc.y + curr.y / rightEye.length }), { x: 0, y: 0 });

                // Calculate pixel distance between the centers of the two eyes
                const distancePixels = Math.sqrt(Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) + Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2));

                console.log('Distance between eyes in pixels:', distancePixels);

                // Set the message based on the distance
                if (distancePixels > 70) {
                    setDistanceMessage("Please get further");
                    if (!isAudioPlaying) {
                        audioRef.current.play(); // Start playing the audio
                        setIsAudioPlaying(true);
                    }
                } else {
                    setDistanceMessage("Ready to go");
                    console.log("should stop now")
                    audioRef.current.pause(); // Pause the audio
                    setIsAudioPlaying(false);

                }
            }
            else {
                console.log("No detections");
                // Set the message when no detections are found
                setDistanceMessage("No detections");
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
    }

    useEffect(() => {
        const interval = setInterval(() => {
            detectEyes();
        }, 100); // Interval timer calls the detectEyes function every 100 milliseconds (0.1 seconds)

        return () => clearInterval(interval);
    }, [streamActive]);

    useEffect(() => {
        async function loadModels() {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                console.log("Models loaded successfully");
            } catch (error) {
                console.error("Error loading models", error);
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
        <div style={{ position: 'relative', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {error ? (
                <p>{error}</p>
            ) : (
                <div style={{ width: '350px', height: '350px', borderRadius: '60%', overflow: 'hidden' }}>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            )}
            <div>
                <select name="times" id="time-select" onChange={handleSelectChange} value={selectedTime}>
                    <option value="">Select an option</option>
                    <option value="10">10:00</option>
                    <option value="20">20:00</option>
                    <option value="30">30:00</option>
                    <option value="40">40:00</option>
                </select>
                <button
                    onClick={start}
                    style={buttonStyle}
                >
                    Start
                </button>
                <button
                    onClick={stop}
                    style={buttonStyle}
                >
                    Stop
                </button>
                <button
                    onClick={pause}
                    style={buttonStyle}
                >
                    {isPlaying ? 'Pause' : 'Resume'}
                </button>
            </div>
            <div>
                <h1>{formatTime()}</h1>
                <h2>{distanceMessage}</h2>
            </div>
            <audio ref = {audioRef} src = "nana.mp3" preload = "auto"></audio>
        </div>
    );
}

export default CameraComponent;
