import { messaging } from '../firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { db } from '../firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

const VAPID_KEY = "BBpoStLdadgWCXcsmzIHn0IQMLoOfc7kWqxW2yPIcQ-F8z5lkXkGJ4N7NkZmzCO7k2yjYbSs3syyVQs4DSzupLs"; // Paste your VAPID key from Step 3

// Request permission and get FCM token (run this in the STUDENT app)
export const requestNotificationPermission = async (rollNumber) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    
    if (token && rollNumber) {
      await setDoc(doc(db, 'fcmTokens', rollNumber), {
        token: token,
        rollNumber: rollNumber,
        updatedAt: new Date()
      });
      console.log('FCM Token saved:', token);
    }
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const onForegroundMessage = (callback) => {
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};