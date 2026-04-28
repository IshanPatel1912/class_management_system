const ONESIGNAL_APP_ID = "308f3e64-aa90-464a-8609-caafabfb60ba";
const ONESIGNAL_REST_API_KEY = "os_v2_app_gcht4zfksbdevbqjzkx2x63axl6mvqootiee6bmjkeuah6ykbckqfqbum3uzcok6mounhgzhntva4pz73h2kgjfviwzstsyv2i5fajq"; // new key from Step 1

export const sendPushToAll = async (title, message) => {
  try {
    const response = await fetch('/api/onesignal/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        included_segments: ["All"],
        headings: { en: title },
        contents: { en: message },
        android_accent_color: "FF2196F3",
        android_visibility: 1,
      })
    });

    const data = await response.json();
    console.log('Push sent:', data);
    return data;
  } catch (error) {
    console.error('Push error:', error);
  }
};

export const sendPushToStudent = async (title, message, rollNumber) => {
  try {
    const response = await fetch('/api/onesignal/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        filters: [
          { field: "tag", key: "rollNumber", relation: "=", value: rollNumber }
        ],
        headings: { en: title },
        contents: { en: message },
      })
    });

    const data = await response.json();
    console.log('Push sent to student:', data);
    return data;
  } catch (error) {
    console.error('Push error:', error);
  }
};