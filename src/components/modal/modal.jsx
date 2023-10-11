import styles from './modal.module.css';
import { useState, useRef } from 'react';
import Portal, { createContainer, PORTAL_ERROR_MSG } from '../portal/portal';

function Modal () {
    const rootRef = useRef(null);
    const modalContainerId = "modal-container-id";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        createContainer({ id: modalContainerId});
        setMounted(true)
    });

    useEffect(() => {
        const handleClickContainer = (evt) => {
            if (useRef.current === evt.target) {

            }
        }
    })

    return 
}