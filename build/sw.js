this.addEventListener('activate', function (event) {
    // console.log('service worker activated');
});


self.addEventListener('push', async function (event) {
    try {
        const message = await event.data.json();
        const { title, description, image, link, linkName } = message;

        // console.log('Received push message:', message);

        if (title && description && image && link && linkName) {
            const notificationOptions = {
                body: description,
                icon: image,
                actions: [
                    {
                        action: 'check_update',
                        title: linkName,
                    },
                ],
                data: link,
            };

            // Display the notification
            const notificationPromise = self.registration.showNotification(title, notificationOptions);

            // Extend the lifetime of the event until the notification is shown
            event.waitUntil(notificationPromise);
        } else {
            console.error('Invalid push message format. Missing title, description, or image.');
        }
    } catch (error) {
        console.error('Error processing push notification:', error);
    }
});

// Add an event listener for the notification click during the initial evaluation of the worker script
self.addEventListener('notificationclick', (event) => {
    // const clickedAction = event.action;
    const notification = event.notification;


    // if (clickedAction === 'check_update') {
    //     // Handle the 'Check Update' action
    //     // Access the URL from the data property
    //     const url = notification.data;

    //     if (url) {
    //         clients.openWindow(url);
    //     }
    // }

    const url = notification.data;
    if (url) {
        clients.openWindow(url);
    }
    
    notification.close();
});
