const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Trigger: When a new notification is added to Firestore, send push to all students
exports.sendPushOnNewNotification = functions.firestore
  .document("notifications/{notifId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    // Get all FCM tokens from the fcmTokens collection
    const tokensSnapshot = await db.collection("fcmTokens").get();
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token).filter(Boolean);

    if (tokens.length === 0) {
      console.log("No tokens to send to.");
      return null;
    }

    const message = {
      notification: {
        title: data.title,
        body: data.message,
      },
      data: {
        type: "notification",
        notifId: context.params.notifId,
      },
      tokens: tokens, // Send to all student devices
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`${response.successCount} messages sent successfully`);
    return null;
  });

// You can duplicate this for polls, events, marks, materials
exports.sendPushOnNewPoll = functions.firestore
  .document("polls/{pollId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const tokensSnapshot = await db.collection("fcmTokens").get();
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token).filter(Boolean);
    if (!tokens.length) return null;

    await admin.messaging().sendEachForMulticast({
      notification: {
        title: "📊 New Poll Available!",
        body: data.question,
      },
      tokens,
    });
    return null;
  });

exports.sendPushOnNewEvent = functions.firestore
  .document("events/{eventId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    const tokensSnapshot = await db.collection("fcmTokens").get();
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token).filter(Boolean);
    if (!tokens.length) return null;

    await admin.messaging().sendEachForMulticast({
      notification: {
        title: "📅 New Event: " + data.title,
        body: data.description,
      },
      tokens,
    });
    return null;
  });

exports.sendPushOnNewMarks = functions.firestore
  .document("marks/{markId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    // Send only to the specific student's token
    const tokenDoc = await db.collection("fcmTokens").doc(data.rollNumber).get();
    if (!tokenDoc.exists) return null;

    await admin.messaging().send({
      notification: {
        title: "📝 Your Marks are Published!",
        body: `${data.subject} (${data.examType}): ${data.score}`,
      },
      token: tokenDoc.data().token,
    });
    return null;
  });