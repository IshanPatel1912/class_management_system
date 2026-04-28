importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCobYLjSIRK9ua0MQ2UxsNfOstYcBYugDk",
  authDomain: "class-management-system-1912.firebaseapp.com",
  projectId: "class-management-system-1912",
  storageBucket: "class-management-system-1912.firebasestorage.app",
  messagingSenderId: "317825896895",
  appId: "1:317825896895:web:692742f044bb941365910a"
});

const messaging = firebase.messaging();

// Handle background messages (when browser tab is closed/hidden)
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});