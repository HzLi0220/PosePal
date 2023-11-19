import React from "react";
import CameraComponent from "../components/CameraComponent";

const NewSession = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>
                    {/* this is the part where you put your head inside of a random circle */}
                    <CameraComponent />
                </p>
            </div>
        </>

    );
};

export default NewSession;