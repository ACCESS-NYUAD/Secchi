const colors = [
  "#0000ff",
  "#0009fb",
  "#0012f6",
  "#001af2",
  "#0023ed",
  "#002ce9",
  "#0035e5",
  "#003ee0",
  "#0046dc",
  "#004fd8",
  "#0058d3",
  "#0061cf",
  "#006aca",
  "#0072c6",
  "#007bc2",
  "#0084bd",
  "#008db9",
  "#0095b5",
  "#009eb0",
  "#00a7ac",
  "#00b0a7",
  "#00b9a3",
  "#00c19f",
  "#00ca9a",
  "#00d396",
  "#00dc92",
  "#00e58d",
  "#00ed89",
  "#00f684",
  "#00ff80",
];

// Making a map and tiles
const mymap = L.map("map", { scrollWheelZoom: true }).setView(
  [24.4539, 54.3773],
  11
);

const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ';
// const tileUrl =
//   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const tiles = L.tileLayer(tileUrl, {
  attribution,
  // id: "mapbox/streets-v11",
  maxZoom: 20,
  tileSize: 512,
  zoomOffset: -1,
  subdomains: "abc",
  detectRetina: true,
});
tiles.addTo(mymap);

function createIcon(average) {
  if (average > 30) average = 30;
  else if (average < 1) average = 1;

  const myCustomColour = colors[30 - average];

  const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 2.5rem;
    height: 2.5rem;
    display: block;
   // left: -1.5rem;
   // top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

  const icon = L.divIcon({
    className: "my-custom-pin",
    //iconAnchor: [0, 0],
    iconSize: [20, 40],
    popupAnchor: [1, -34],
    html: `<span style="${markerHtmlStyles}" />`,
  });

  return icon;
}

// const markerIcon = L.icon({
//   iconUrl: "./images/icon.svg",
//   iconAnchor: [25, 75],
//   iconSize: [20, 50],
//   popupAnchor: [1, -34],
// });

const result = document.getElementById("details");

async function getData() {
  const response = await fetch("/coordinates");
  const data = await response.json();
  if (data) {
    const allData = data.data;
    allData.forEach((element) => {
      const { latitude, longitude, deepDepth, shallowDepth } = element;
      let average = 0;
      if (shallowDepth < deepDepth) {
        average = shallowDepth + (deepDepth - shallowDepth) / 2;
      } else {
        average = deepDepth + (shallowDepth - deepDepth) / 2;
      }

      var marker = L.latLng(latitude, longitude);
      L.marker(marker, {
        icon: createIcon(Math.round(average)),
        title: `${latitude}, ${longitude}`,
      })
        .addTo(mymap)
        .on("click", () => onClick(element));
    });
  }
}

getData();
function onClick(element) {
  const localTime = new Date(element.submitted_at);
  result.innerHTML = `
    <p class="element">Latitude: <span class="data"> ${element.latitude} </span></p>
    <p class="element">Longitude: <span class="data"> ${element.longitude} </span></p>
    <p class="element">Deep depth: <span class="data"> ${element.deepDepth} </span></p>
    <p class="element">Shallow depth: <span class="data"> ${element.shallowDepth} </span></p>
    <p class="element">Time: <span class="data"> ${localTime} </span></p>
    `;
}

// setInterval(getISS, 1000);
