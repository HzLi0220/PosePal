

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SummaryBoard({ timeCompleted }) {

    // Format the total time as minutes:seconds
    const formatTotalTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
                        <h2>Session Summary</h2>
                        <p>Total Countdown Time: {formatTotalTime(timeCompleted)}</p>
                        <Link to="/" style={buttonStyle}>
                            Close
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

const buttonStyle = {
    backgroundColor: '#FF69B4',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
};

export default SummaryBoard;


