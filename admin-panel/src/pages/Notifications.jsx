import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { Megaphone, Trash2, Send } from 'lucide-react';
import { getDocs } from 'firebase/firestore';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'notifications'), 
      (snapshot) => {
        setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );
    return () => unsubscribe();
  }, []);


const FCM_SERVER_KEY = "YOUR_FCM_SERVER_KEY";
const sendNotification = async (e) => {
  e.preventDefault();
  try {
    // 1. Save to Firestore as before
    await addDoc(collection(db, 'notifications'), {
      title,
      message,
      timestamp: serverTimestamp(),
      seenBy: []
    });

    // 2. Get all FCM tokens from Firestore
    const tokensSnapshot = await getDocs(collection(db, 'fcmTokens'));
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token).filter(Boolean);

    if (tokens.length === 0) {
      alert("Notification saved! No student devices registered yet.");
      setTitle('');
      setMessage('');
      return;
    }

    // 3. Send push directly to FCM API
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${FCM_SERVER_KEY}`
      },
      body: JSON.stringify({
        registration_ids: tokens,
        notification: {
          title: title,
          body: message,
          icon: '/favicon.svg'
        }
      })
    });

    const result = await response.json();
    console.log('FCM Response:', result);
    alert(`Notification sent to ${result.success} students!`);
    setTitle('');
    setMessage('');
  } catch (error) {
    alert("Error: " + error.message);
  }
};

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Megaphone className="text-blue-600" /> Broadcast Alerts
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h2 className="text-lg font-semibold mb-4">New Announcement</h2>
          <form onSubmit={sendNotification} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input required type="text" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Exam Schedule" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea required rows="4" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter details here..." />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700">
              <Send size={18} /> Send to All Students
            </button>
          </form>
        </div>

        {/* History List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-700">Sent History</h2>
          {notifications.map(notif => (
            <div key={notif.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-start shadow-sm">
              <div className="flex-1 pr-4">
                <h3 className="font-bold text-slate-900">{notif.title}</h3>
                <p className="text-slate-600 text-sm mt-1">{notif.message}</p>
                <p className="text-xs text-slate-400 mt-2">
                  {notif.timestamp?.toDate().toLocaleString()}
                </p>
                
                {/* Updated "Seen By" Section */}
                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Seen by Roll Numbers:</p>
                  <div className="flex flex-wrap gap-1">
                    {notif.seenBy && notif.seenBy.length > 0 ? (
                      notif.seenBy.map((roll, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                          {roll}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No one yet</span>
                    )}
                  </div>
                </div>
              </div>

              <button onClick={() => deleteDoc(doc(db, 'notifications', notif.id))} className="text-slate-300 hover:text-red-600 p-1 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;