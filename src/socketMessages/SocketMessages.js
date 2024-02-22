import React, { useEffect } from 'react'
import { io } from "socket.io-client";
import { toast } from 'react-hot-toast';

const SocketMessages = ({ children }) => {

  useEffect(() => {
    // Check if the browser supports the Notification API
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
    } else {
      console.log('This browser  support notifications.');
    }
  }, []);


  const API = "http://127.0.0.1:8080";
  const socket = io(API);
  socket.on("user-joined", (name) => {
  });

  // If server sends a message, receive it
  socket.on("receive", (data) => {
    console.log(data);
    toast.success(data?.event?.message);

    var options = {
      body: 'Mymetalogic',
      icon: 'https://res.cloudinary.com/djr2f6dlh/image/upload/v1696420770/MyMetalogic/Metalogic_Logo_vncmho.png',
      dir: 'ltr',
    };

    new Notification(data?.event?.message, options);
  });

  return (
    <div>
      {children}
    </div>
  )
}

export default SocketMessages
