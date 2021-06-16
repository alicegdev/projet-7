// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  // Create the map.
  const userPos = { lat: position.coords.latitude, lng: position.coords.longitude};
  const map = new google.maps.Map(document.getElementById("map"), {
    center: userPos,
    zoom: 17,
    mapId: "8d193001f940fde3",
  });
  new google.maps.Marker({
    position: userPos,
    map,
    title: "Hello World!",
  });
  // Create the places service.
  const service = new google.maps.places.PlacesService(map);
  let getNextPage;
  const moreButton = document.getElementById("more");

  moreButton.onclick = function () {
    moreButton.disabled = false;

    if (getNextPage) {
      getNextPage();
    }
  };
  // Perform a nearby search.
  service.nearbySearch(
    { location: userPos, radius: 500, type: "restaurant" },
    (results, status, pagination) => {
      if (status !== "OK" || !results) return;
      addPlaces(results, map);
      moreButton.disabled = !pagination || !pagination.hasNextPage;

      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          // Note: nextPage will call the same handler function as the initial call
          pagination.nextPage();
        };
      }
    }
  );
      })
}

function addPlaces(places, map) {
  const placesList = document.getElementById("places");

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
     
      new google.maps.Marker({
        map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
      });
      
      const li = document.createElement("li");
      li.textContent = place.name;
      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(place.geometry.location);
        li.textContent = "Note moyenne : "+ place.rating;
        li.addEventListener("click", () => {
          li.textContent = place.name;
        });
      });
      
      ;}
    }
  }
}


/*
// c'est bon, mon API fonctionne ! L'utilisateur est localisé et les restaurants du quartier apparaissent
// un marqueur s'affiche à la position de l'utilisateur.
let map, infoWindow, marker;
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: position.coords.latitude, lng: position.coords.longitude },
          zoom: 15,
          mapId: '29709a5861b53cec',
        });
        infoWindow = new google.maps.InfoWindow();
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map: map,
        });
          // Try HTML5 geolocation.
           //infoWindow.setPosition(pos);
           infoWindow.setContent(marker);
           infoWindow.open(map);
           map.setCenter(pos);
           
          
                  
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  
    
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

*/