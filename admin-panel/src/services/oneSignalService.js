const ONESIGNAL_APP_ID = "308f3e64-aa90-464a-8609-caafabfb60ba";
const ONESIGNAL_REST_API_KEY = "os_v2_app_gcht4zfksbdevbqjzkx2x63axi7yamyyy2rutjuu6kzrug2cvv4ik5njqih3i4fy2hs24372smzeiaznfkdvm3egs6fuoufdda265cq";

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
    console.log('Push sent to all:', data);
    return data;
  } catch (error) {
    console.error('Push error:', error);
  }
};

export const sendPushToStudent = async (title, message, rollNumber) => {
  try {
    // ✅ Using external_id instead of tags — much more reliable
    const response = await fetch('/api/onesignal/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_aliases: {
          external_id: [rollNumber] // ✅ directly use roll number
        },
        target_channel: "push",
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