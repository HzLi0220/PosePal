import React, { useEffect, useRef, useState } from 'react';
import {useLocation} from 'react-router-dom';
import SoundButton from "./SoundButton";
function CameraComponent() {

    //stuff about the counter

    const [counter, setCounter] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    // Start counter
    const startCounter = () => {
        if (!intervalId) {
            const id = setInterval(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 1000);
            setIntervalId(id);
        }
    };

    // Pause counter
    const pauseCounter = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    // Stop counter and reset
    const stopCounter = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setCounter(0);
    };

    // Cleanup interval on component unmount
    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    //button.css

    const buttonStyle = {
        backgroundColor: '#FF69B4', // Cute pink color
        color: 'white',
        border: 'none',
        borderRadius: '20px', // Gives the oval shape
        padding: '10px 20px', // Adjust padding to your preference
        fontSize: '16px', // Font size can be adjusted
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '5px', // Space between buttons
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' // Optional shadow for depth
    };
    const videoRef = useRef(null);
    const [streamActive, setStreamActive] = useState(false);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    // location in the path that we are currently in
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

        if(location.pathname === '/newsession'){
        getVideo();}
    }, [videoRef]);

    const start = () => {
        startCounter();

    }
    const stop = () => {
        stopCamera();
        stopCounter();

    }
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
                <button
                    onClick={start}
                    style={buttonStyle}>
                    start
                </button>
                <button
                    onClick={stop}
                    style={buttonStyle}>
                    Stop
                </button>
                <button
                    onClick={togglePlayback}
                    style={buttonStyle}>
                    {isPlaying ? 'Pause' : 'Resume'}
                </button>
                <SoundButton />
            </div>
            <div>
                <h1>Counter: {counter}</h1>
            </div>
        </div>
    );
}

export default CameraComponent;
