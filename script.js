document.addEventListener("DOMContentLoaded", function() {
    const directionsButton = document.getElementById("get-directions");

    if (directionsButton) {
        directionsButton.addEventListener("click", function() {
            const address = "9806 W Florissant Ave, St. Louis, MO 63136"; // Address for directions
            let mapsUrl = "";

            // Enhanced device detection
            const userAgent = navigator.userAgent.toLowerCase();
            const platform = navigator.platform.toLowerCase();
            const isAndroid = /android/i.test(userAgent);
            const isIOS = /iphone|ipod|ipad/i.test(userAgent);
            const isWindows = platform.indexOf('win') !== -1;

            // For iOS devices, try to open Apple Maps first
            if (isIOS && !isWindows) {
                mapsUrl = `maps://maps.apple.com/?daddr=${encodeURIComponent(address)}`;
            } 
            // For Android devices, try to open Google Maps app if available
            else if (isAndroid && !isWindows) {
                mapsUrl = `google.navigation:q=${encodeURIComponent(address)}`;
            } 
            // For desktop or unsupported devices, fallback to Google Maps in the browser
            else if (isWindows) {
                mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
            } 
            // Default fallback if user-agent isn't detected
            else {
                mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
            }

            // Attempt to open the maps link
            const openMapApp = () => {
                window.location.href = mapsUrl;
            };

            // If the device doesn't support the URL scheme or it doesn't work, fallback to Google Maps in browser
            setTimeout(function() {
                if (!document.hasFocus()) {
                    window.open(`https://www.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
                }
            }, 500); // Give some time for the app to launch

            openMapApp();
        });
    } else {
        console.error("Directions button not found.");
    }
});
