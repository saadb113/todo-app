
import { useRef } from 'react';
import '../../App.css';

function Toast({text}) {
    const toastRef = useRef(null);

    const handleClose = () => {
        if (toastRef.current) {
            toastRef.current.style.display = 'none';
        }
    };

    return (
        <div className='toast' ref={toastRef}>
            {text} <button onClick={handleClose}>X</button>
        </div>
    );
}

export default Toast;
