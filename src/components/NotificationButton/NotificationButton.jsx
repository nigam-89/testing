import React, { useEffect } from 'react'
import {
    regSw, subscribe,
    // unSubscribe 
} from '../../services/helper';

const NotificationButton = () => {
    async function registerAndSubscribe() {
        try {
            const serviceWorkerReg = await regSw();
            await subscribe(serviceWorkerReg);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            registerAndSubscribe();
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {/* <button onClick={registerAndSubscribe}>
                subscribe for push notifications
            </button> */}

            {/* <button onClick={unSubscribe}>
                Unsubscrie
            </button> */}
        </div>
    )
}

export default NotificationButton
