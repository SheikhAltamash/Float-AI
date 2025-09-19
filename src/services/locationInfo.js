import axios from "axios";

export const getLocationData = async () => {
  try {
    // Enhanced IP-API request with all available fields
    const locationResponse = await axios.get(
      "http://ip-api.com/json/?fields=66846719"
    );

    // Battery API data (where supported)
    let batteryData = {};
    try {
      if ("getBattery" in navigator) {
        const battery = await navigator.getBattery();
        batteryData = {
          batteryLevel: (battery.level * 100).toFixed(1) + "%",
          batteryCharging: battery.charging,
          batteryChargingTime: battery.chargingTime || "Unknown",
          batteryDischargingTime: battery.dischargingTime || "Unknown",
        };
      }
    } catch (e) {
      batteryData = {
        batteryLevel: "Not supported",
        batteryCharging: "Unknown",
      };
    }

    // WebGL and Graphics Info
    let webglInfo = {};
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        webglInfo = {
          webglVendor: debugInfo
            ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
            : "Unknown",
          webglRenderer: debugInfo
            ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            : "Unknown",
          webglVersion: gl.getParameter(gl.VERSION),
          webglShadingLanguageVersion: gl.getParameter(
            gl.SHADING_LANGUAGE_VERSION
          ),
        };
      }
    } catch (e) {
      webglInfo = {
        webglVendor: "Not supported",
        webglRenderer: "Not supported",
      };
    }

    // Media Devices Info (no permission required for enumeration)
    let mediaInfo = {};
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        mediaInfo = {
          audioInputDevices: devices.filter((d) => d.kind === "audioinput")
            .length,
          audioOutputDevices: devices.filter((d) => d.kind === "audiooutput")
            .length,
          videoInputDevices: devices.filter((d) => d.kind === "videoinput")
            .length,
        };
      }
    } catch (e) {
      mediaInfo = {
        audioInputDevices: "Unknown",
        audioOutputDevices: "Unknown",
        videoInputDevices: "Unknown",
      };
    }

    // Storage Quota Information
    let storageInfo = {};
    try {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        storageInfo = {
          storageQuota:
            (estimate.quota / (1024 * 1024 * 1024)).toFixed(2) + " GB",
          storageUsage: (estimate.usage / (1024 * 1024)).toFixed(2) + " MB",
          storageUsagePercentage:
            ((estimate.usage / estimate.quota) * 100).toFixed(2) + "%",
        };
      }
    } catch (e) {
      storageInfo = { storageQuota: "Unknown", storageUsage: "Unknown" };
    }

    // Performance and Timing Data
    const performanceInfo = {
      loadTime: performance.timing
        ? performance.timing.loadEventEnd - performance.timing.navigationStart
        : "Unknown",
      domContentLoadedTime: performance.timing
        ? performance.timing.domContentLoadedEventEnd -
          performance.timing.navigationStart
        : "Unknown",
      firstPaintTime: performance.getEntriesByType
        ? performance
            .getEntriesByType("paint")
            .find((entry) => entry.name === "first-paint")?.startTime ||
          "Unknown"
        : "Unknown",
      firstContentfulPaintTime: performance.getEntriesByType
        ? performance
            .getEntriesByType("paint")
            .find((entry) => entry.name === "first-contentful-paint")
            ?.startTime || "Unknown"
        : "Unknown",
    };

    // CSS and Display Features
    const displayInfo = {
      pixelRatio: window.devicePixelRatio || 1,
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      orientation: screen.orientation ? screen.orientation.type : "Unknown",
      orientationAngle: screen.orientation
        ? screen.orientation.angle
        : "Unknown",
      colorGamut: matchMedia("(color-gamut: srgb)").matches
        ? "sRGB"
        : matchMedia("(color-gamut: p3)").matches
        ? "P3"
        : matchMedia("(color-gamut: rec2020)").matches
        ? "Rec2020"
        : "Unknown",
      prefersColorScheme: matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      prefersReducedMotion: matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
    };

    // Browser Features and API Support
    const browserFeatures = {
      serviceWorkerSupport: "serviceWorker" in navigator,
      webAssemblySupport: typeof WebAssembly === "object",
      webRTCSupport: !!(
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
      ),
      indexedDBSupport: "indexedDB" in window,
      localStorageSupport: typeof Storage !== "undefined",
      sessionStorageSupport: typeof sessionStorage !== "undefined",
      geolocationSupport: "geolocation" in navigator,
      notificationSupport: "Notification" in window,
      pushSupport: "PushManager" in window,
      vibrationSupport: "vibrate" in navigator,
    };

    // Network Information (Extended)
    const networkInfo = {
      connectionType: navigator.connection?.effectiveType || "Unknown",
      connectionDownlink: navigator.connection?.downlink || "Unknown",
      connectionRTT: navigator.connection?.rtt || "Unknown",
      connectionSaveData: navigator.connection?.saveData || false,
      maxDownlink: navigator.connection?.downlinkMax || "Unknown",
      networkType: navigator.connection?.type || "Unknown",
      onLine: navigator.onLine,
    };

    // Enhanced device and browser info
    const deviceInfo = {
      // Basic info
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      languages: navigator.languages?.join(", ") || navigator.language,
      primaryLanguage: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
      doNotTrack: navigator.doNotTrack || "Unknown",
      javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,

      // Screen/Display info
      screenResolution: `${screen.width}x${screen.height}`,
      availableScreenSize: `${screen.availWidth}x${screen.availHeight}`,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,

      // Hardware info
      hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
      deviceMemory: navigator.deviceMemory || "Unknown",
      maxTouchPoints: navigator.maxTouchPoints || 0,

      // Time/Locale info
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: Intl.DateTimeFormat().resolvedOptions().locale,
      timezoneOffset: new Date().getTimezoneOffset(),
      localTime: new Date().toLocaleString(),

      // Session info
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "Direct",
      pageUrl: window.location.href,

      // Merge all additional data
      ...batteryData,
      ...webglInfo,
      ...mediaInfo,
      ...storageInfo,
      ...performanceInfo,
      ...displayInfo,
      ...networkInfo,
      ...browserFeatures,
    };

    // Enhanced session tracking
    const sessionInfo = {
      sessionId: Date.now() + Math.random().toString(36).substr(2, 9),
      visitType: document.referrer ? "Referral" : "Direct",
      landingPage: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      documentTitle: document.title,
      documentCharacterSet: document.characterSet || document.charset,
      documentReadyState: document.readyState,
      historyLength: history.length,
    };

    return {
      location: {
        // Basic location data
        country: locationResponse.data.country || "Unknown",
        countryCode: locationResponse.data.countryCode || "Unknown",
        region: locationResponse.data.regionName || "Unknown",
        regionCode: locationResponse.data.region || "Unknown",
        city: locationResponse.data.city || "Unknown",
        district: locationResponse.data.district || "Unknown",
        zip: locationResponse.data.zip || "Unknown",

        // Coordinates
        latitude: locationResponse.data.lat || "Unknown",
        longitude: locationResponse.data.lon || "Unknown",

        // Network info
        ip: locationResponse.data.query || "Unknown",
        isp: locationResponse.data.isp || "Unknown",
        org: locationResponse.data.org || "Unknown",
        as: locationResponse.data.as || "Unknown",
        asname: locationResponse.data.asname || "Unknown",

        // Connection type indicators
        mobile: locationResponse.data.mobile || false,
        proxy: locationResponse.data.proxy || false,
        hosting: locationResponse.data.hosting || false,

        // Time/Currency
        timezone: locationResponse.data.timezone || "Unknown",
        offset: locationResponse.data.offset || "Unknown",
        currency: locationResponse.data.currency || "Unknown",
      },
      device: deviceInfo,
      session: sessionInfo,
    };
  } catch (error) {
    console.error("Error getting location data:", error);
    return null;
  }
};
