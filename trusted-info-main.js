async function sendUserInfo() {
  try {
    // Fetch IP info from an external API
    const ipRes = await fetch('https://ipapi.co/json/');
    const ipData = await ipRes.json();

    const userInfo = {
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      platform: navigator.platform,
      ip: ipData.ip,
      city: ipData.city,
      region: ipData.region,
      country: ipData.country_name,
      timestamp: new Date().toISOString()
    };

    await fetch('https://bbbb53.free.beeceptor.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    });

    console.log('User info sent successfully');
  } catch (error) {
    console.error('Failed to send user info:', error);
  }
}

// Call the function when the page loads
window.addEventListener('load', sendUserInfo);
