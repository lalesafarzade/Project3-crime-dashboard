//generate tile layers
var defaultView = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//generate greyscale layer
var greyscaleView = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});


//generate topo layer
var topoView = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

//generate basemaps object
let basemaps= {
    Default: defaultView,
    GrayScale: greyscaleView,
    Topographic: topoView
}

//generate map object
var atlMap = L.map("map", {
    center: [33.7490, 84.3880],
    zoom: 12,
    layers: [defaultView,greyscaleView, topoView]
})

// add map object to maps
defaultView.addTo(atlMap);

//generate layer for crime data
let crimeTabs = new L.layerGroup();

// add the overlay for tectPlates
let overlays = {
    "Crime Locations": crimeTabs,
}

//add a layer control
L.control
    .layers(basemaps, overlays)
    .addTo(atlMap);
//add another layer control for the legend
let legend = L.control({
    position: "bottomright"
});

// legend.onAdd = function(){
//     // add div for legend to appear
//     let div = L.DomUtil.create("div", "info legend");
//     let intervals = [-10,10,30,50,70,90];
//     let colors = ["green","#cafc03","#fcad03","#fc8403","red"];
//     //loop through intervales and generate label for each
//     for(var i = 0; i < intervals.length; i++)
//     {
//         // inner html that sets the square for the label
//         div.innerHTML += "<i style='background:"
//         +colors[i]
//         +"`></i>"
//         +intervals[i]
//         +(intervals[i+1] ? "km &ndash km;" + intervals[i+1] + "km<br>" : "+");
//     }
//     return div;
// };

//call Crime Data JSON
// d3.json("../Resources/crime_info.json")
//     .then(function(crimeData){
        //plot circles such that the radius depends on the earthquake magnitude, color depends on depth
        //create function that chooses color based on depth
        // function dataColor(depth){
        //     if (depth > 90)
        //         return "red";
        //     else if (depth > 70)
        //         return "#fc4903";
        //     else if (depth > 50)
        //         return "#fc8403";
        //     else if (depth > 30)
        //         return "#fcad03";
        //     else if (depth > 10)
        //         return "#cafc03";
        //     else
        //         return "green";
        // }
//call GeoJSON api
d3.json("../ResourcesDNU/crime_info.json")
    .then(function(crimeData){
        //plot circles such that the radius depends on the earthquake magnitude, color depends on depth
        //create function that chooses color based on depth
        //create function that determines radius size
        // function radiusSize(mag){
        //     if (mag==0)
        //         return 1;
        //     else
        //         return mag*4;
        // }
        // create function to add style
        function dataStyle(feature){
            return {
                opacity: 0.5,
                fillOpacity: 0.5,
                fillColor: "blue", //index 2 is depth, 0 and 1 are lat and long
                color: "000000",
                radius: 1, 
                weight: 0.5,
                stroke: true
            }
        }
        //add Crime data to layer group
        L.geoJson(crimeData, {
            pointToLayer: function(feature, latLong){
                for (let i = 0; i < cars.length; i++) {
                    let latLong = Array.from(feature.crimeinfo.lat[i],feature.crimeinfo.long[i] )
                return L.circleMarker(latLong);}
            },
            //add style
            style: dataStyle,
            // add popups
            onEachFeature: function(feature,layer){
                layer.bindPopup(`Neighborhood: <b>${feature.crime_info.neighborhood}</b><br>
                                Crime: <b>${feature.crime_info.UC2_Literal}</b><br>
                                Date: <b>${featurecrime_info.
                                    rpt_date
                                    }</b><br>`);
            }
        }).addTo(crimeTabs);

    })


crimeTabs.addTo(atlMap);
//add legend to the map
// legend.addTo(atlMap);