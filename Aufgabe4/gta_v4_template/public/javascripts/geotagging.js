// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...

console.log("The geoTagging script is going to start...");


/**
 * A class to help using the MapQuest map service.
 */

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...

var mm;
var lat;
var long;

function updateLocation (helper) {

    lat = helper.latitude;
    long = helper.longitude;
    document.getElementById("lat_input").value = lat;
    document.getElementById("long_input").value = long;

    updateGeoTags([]);
}

function updateGeoTags(taglist) {
    var ul = document.getElementById("discoveryResults");
    ul.innerHTML = "";//remove all child elements inside of ul

    taglist.forEach(function(gtag) { 
        var node = document.createElement("LI");
        node.innerHTML = gtag.name+" ("+gtag.latitude+","+ gtag.longitude + ") " +  gtag.hashtag;
        ul.appendChild(node);
     });
    var mapView = document.getElementById("mapView");
    mapView.src = mm.getMapUrl(lat, long, taglist, 13);

}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    mm = new MapManager('mTAajLz6sIamsAGNO3Fub5cEUdFRfTRH');
    document.getElementById("tag-form").addEventListener("submit",  function(evt) {
        evt.preventDefault();
        var geotag = {
            name: document.getElementById("name_input").value,
            hashtag: document.getElementById("hashtag_input").value,
            latitude: lat, 
            longitude: long,
        };
        fetch("http://localhost:3000/api/geotags",{ 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(geotag) 
        }).then(res => res.json())
        .then(geotag => updateGeoTags([geotag]));
        
    });

    document.getElementById("discoveryFilterForm").addEventListener("submit", function(evt) {
        evt.preventDefault();
        var s = document.getElementById("search_term").value;

        fetch("http://localhost:3000/api/geotags?l1=" + lat + "&l2=" + long + "&s=" + s,{ 
            method: "GET"
        }).then(res => res.json())
        .then(taglist => updateGeoTags(taglist));

    });

    LocationHelper.findLocation(updateLocation);

});