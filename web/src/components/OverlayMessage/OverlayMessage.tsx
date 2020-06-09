import React from 'react';
import './styles.css';


interface Props {
    icon: any,
    message: string,
    type: string,
}
const OverlayMessage: React.FC<Props> = ({ icon, message, type }) => {

    return (
        <>
            <div className="overlay">
                <span className={type}>{icon}</span>
                <span className="message">{message}</span>
            </div>
        </>
    )
}

export default OverlayMessage;