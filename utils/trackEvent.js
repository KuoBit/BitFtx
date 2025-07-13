
export const trackEvent = async (event_type) => {
    if (typeof window === "undefined") return;
  
    try {
      const session_id = localStorage.getItem("bftx_session_id");
      const source = localStorage.getItem("bftx_source") || 'organic';
      const path = window.location.pathname;
      const user_agent = navigator.userAgent;
      const device_type = /Mobile|Android|iPhone/i.test(user_agent) ? 'mobile' : 'desktop';
  
      // Use a free IP geolocation service
      const geo = await fetch('https://ipapi.co/json').then(res => res.json());
      const country = geo?.country_name || 'Unknown';
  
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id,
          source,
          event_type,
          path,
          user_agent,
          device_type,
          country,
        }),
      });
    } catch (err) {
      console.error("❌ Failed to track event", err);
    }
  };
  