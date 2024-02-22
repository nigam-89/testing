import axios from 'axios';

const getBaseClientUrl = () => {
    const currentUrl = window.location.href;

    // Check if the current URL includes 'www'
    if (currentUrl.includes('www')) {
        return 'https://www.mymetalogic.com';
    } else {
        return 'https://mymetalogic.com';
    }
};
const BASE_URL_CLIENT = getBaseClientUrl();
const BASE_URL_SERVER = "https://api.mymetalogic.webdesys.info";

// const BASE_URL_CLIENT = "http://localhost:3000";
// const BASE_URL_SERVER = "http://localhost:8080";

async function regSw() {
    if ('serviceWorker' in navigator) {
        let url = BASE_URL_CLIENT + "/sw.js";
        const reg = await navigator.serviceWorker.register(url, { scope: '/' });
        console.log('service config is', { reg });
        return reg;
    }
    throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    if (subscription === null) {
        let subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BBSqTwKFA2qpico_65enX6bCTp4nwPhH-GyvHQhj7Hvv2rzrTxG5MxhZ3uRPfT3bDpx-RSfSaLvAQBKji5wVEcQ',
        });
        // console.log(subscription)
        axios.post(BASE_URL_SERVER + '/subscribe', subscription);
    }
    else {
        console.log("Subscription found")
    }
}

async function unSubscribe() {
    navigator.serviceWorker.ready.then(function (registration) {
        registration.pushManager.getSubscription().then(async function (subscription) {
            if (subscription) {
                try {
                    const res = await axios.post(BASE_URL_SERVER + '/unsubscribe', { endpoint: subscription?.endpoint });
                    if (res?.data?.success) {
                        alert(res?.data?.message);
                    }

                    subscription.unsubscribe().then(async function () {
                    }).catch(function (error) {
                        console.error('Error unsubscribing:', error);
                    });
                } catch (err) {
                    console.log(err?.response?.data?.message);
                }

            } else {
                // No existing subscription, proceed with new subscription logic
                console.log("No subscribiption found")
            }
        });
    });
}

export { regSw, subscribe, unSubscribe };