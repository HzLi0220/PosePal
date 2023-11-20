import React, { useState, useRef, useEffect } from 'react';
import { FaCircleQuestion } from 'react-icons/fa6';
import { FaFontAwesomeFlag } from 'react-icons/fa';
import { FaRegPauseCircle } from 'react-icons/fa';

const AboutComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  return (
    <div>
      <div className="absolute top-6 left-9" onClick={togglePopup}>
        <FaCircleQuestion size={60} color="white" />
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div
            ref={popupRef}
            className="flex flex-col items-center justify-evenly bg-red w-3/4 h-3/4 p-10 z-10 rounded-xl text-white font-monomaniac"
          >
            <div className="text-6xl">ABOUT</div>
            <div className="text-4xl">
              PosePal is a web app designed to student and workers to keep a
              distance to their screen and protect their vision.
            </div>
            <div className="text-4xl">
              Press ‘new session’ to begin a new study session
            </div>
            <div className="text-4xl flex items-center">
              <FaFontAwesomeFlag className="pr-2" />
              press this button to start the session
            </div>
            <div className="text-4xl flex items-center">
              <FaRegPauseCircle className="pr-2" />
              press this to end it sooner than preset
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutComponent;
