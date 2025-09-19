export const saveToGoogleSheets = async (data) => {
  // Your deployment URL
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzntoBUZDYRBBg2tUASyPigNOfUXoAPnsDGO9DrRoUkDGe8uNDwf1ekFYRcvpiM2B5B/exec";

  try {
    console.log(
      "Sending enhanced data to organized Google Sheets via GET:",
      data
    );

    // Convert data to URL parameters for GET request
    const params = new URLSearchParams({
      timestamp: new Date().toISOString(),

      // Location data
      country: data.location?.country || "Unknown",
      countryCode: data.location?.countryCode || "Unknown",
      region: data.location?.region || "Unknown",
      regionCode: data.location?.regionCode || "Unknown",
      city: data.location?.city || "Unknown",
      district: data.location?.district || "Unknown",
      zip: data.location?.zip || "Unknown",
      latitude: data.location?.latitude || "Unknown",
      longitude: data.location?.longitude || "Unknown",
      timezone: data.location?.timezone || "Unknown",
      currency: data.location?.currency || "Unknown",

      // Network data
      ip: data.location?.ip || "Unknown",
      isp: data.location?.isp || "Unknown",
      org: data.location?.org || "Unknown",
      as: data.location?.as || "Unknown",
      mobile: data.location?.mobile || false,
      proxy: data.location?.proxy || false,
      hosting: data.location?.hosting || false,

      // Device data
      userAgent: data.device?.userAgent || navigator.userAgent,
      platform: data.device?.platform || navigator.platform,
      languages: data.device?.languages || navigator.language,
      screenResolution:
        data.device?.screenResolution || `${screen.width}x${screen.height}`,
      windowSize: data.device?.windowSize || "Unknown",
      hardwareConcurrency: data.device?.hardwareConcurrency || "Unknown",
      deviceMemory: data.device?.deviceMemory || "Unknown",

      // Connection data
      connectionType: data.device?.connectionType || "Unknown",
      connectionDownlink: data.device?.connectionDownlink || "Unknown",
      connectionRTT: data.device?.connectionRTT || "Unknown",

      // Session data
      sessionId: data.session?.sessionId || "Unknown",
      visitType: data.session?.visitType || "Unknown",
      landingPage: data.session?.landingPage || window.location.pathname,
      referrer: data.device?.referrer || document.referrer || "Direct",
      loadTime: data.device?.loadTime || "Unknown",
    });

    // Use GET request - no CORS issues!
    const response = await fetch(`${scriptUrl}?${params.toString()}`, {
      method: "GET",
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse as JSON first, fall back to text
    let result;
    const responseText = await response.text();

    try {
      result = JSON.parse(responseText);
      console.log("Success response:", result);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", responseText);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    return result;
  } catch (error) {
    console.error("❌ Error saving to Google Sheets:", error);
    throw error;
  }
};
