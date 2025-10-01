mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12", // Use the standard style for the map
  zoom: 9, // initial zoom level, 0 is the world view, higher values zoom in
  center: listing.geometry.coordinates, // center the map on this longitude and latitude
});

map.addControl(new mapboxgl.NavigationControl());

const popup = new mapboxgl.Popup({
  offset: 25,
  closeButton: false,
  closeOnClick: false,
}).setHTML(
  `<h3>${listing.location}</h3><p>Exact location is provided after booking</p>`
);

// === Main Marker ===
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);

const markerEl = marker1.getElement();

// === Hover Icon Marker (Custom) ===
const hoverIcon = document.createElement("div");
hoverIcon.style.backgroundImage = "url('/images/icon.jpeg')";
hoverIcon.style.width = "50px";
hoverIcon.style.height = "50px";
hoverIcon.style.backgroundSize = "cover";
hoverIcon.style.borderRadius = "50%";
hoverIcon.style.transition = "all 0.3s ease-in";

const hoverMarker = new mapboxgl.Marker({ element: hoverIcon })
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);
hoverIcon.style.display = "none";

// === Hover Events ===
markerEl.addEventListener("mouseenter", () => {
  popup.addTo(map);
  markerEl.style.display = "none"; // Hide default marker
  hoverIcon.style.display = "block"; // Show hover marker
});

hoverIcon.addEventListener("mouseleave", () => {
  popup.remove();
  markerEl.style.display = "block"; // Show default marker again
  hoverIcon.style.display = "none"; // Hide hover marker
});

// === 🔵 Accuracy Circle Around Marker ===
// This will add a scalable circle layer like Google Maps "accuracy radius"
// radiusMeters = your estimated accuracy (example: 500m)
const radiusMeters = 15000;

map.on("load", () => {
  // Add a GeoJSON source at the marker's coordinates
  map.addSource("accuracyCircle", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: listing.geometry.coordinates,
      },
    },
  });

  // Add a circle layer that scales with zoom
  map.addLayer({
    id: "accuracyCircleLayer",
    type: "circle",
    source: "accuracyCircle",
    paint: {
      // Circle radius in meters -> convert to pixels depending on zoom
      // 0.075 is an approximate conversion factor at zoom 20
      "circle-radius": {
        stops: [
          [0, 0], // At world zoom (0), tiny
          [20, radiusMeters / 0.075], // At street zoom (20), scale properly
        ],
        base: 2,
      },
      "circle-color": "#FD5C63",       // 🔵 Blue fill
      "circle-opacity": 0.2,          // Semi-transparent fill
      "circle-stroke-color": "#FD5C63", // Border color
      "circle-stroke-width": 2,
      "circle-stroke-opacity": 0.4,
    },
  });
});
