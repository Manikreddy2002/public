document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your donation! Someone from our team will contact you soon.');
});
function initMap() {
    // Create a map object and specify the DOM element for display.
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},  // Default center
        zoom: 6
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Your Location'
            });

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, map, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, map, pos) {
    alert(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
    map.setCenter(pos);
}
