import React, { useRef } from 'react';

function SoundButton() {
    // Create a ref for the audio element
    const audioRef = useRef(null);

    // Function to play sound
    const playSound = () => {
        audioRef.current.play();
    };

    return (
        <div>
            <button onClick={playSound}>Play Sound</button>
            <audio ref={audioRef} src="nana.mp3" preload="auto"></audio>
        </div>
    );
}

export default SoundButton;