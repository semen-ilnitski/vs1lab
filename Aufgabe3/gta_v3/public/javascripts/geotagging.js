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
function updateLocation (helper) {

    document.getElementById("lat_input").value = helper.latitude;
    document.getElementById("lat_input_hidden").value = helper.latitude;
    document.getElementById("long_input").value = helper.longitude;
    document.getElementById("long_input_hidden").value = helper.longitude;



  mm = new MapManager('mTAajLz6sIamsAGNO3Fub5cEUdFRfTRH');
  var mapView = document.getElementById("mapView");
  var taglist_json = mapView.getAttribute("data-tags");
  var tags = JSON.parse(taglist_json);


  //window.error(helper.latitude);
  mapView.src = mm.getMapUrl(helper.latitude, helper.longitude, tags, 13);

}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    LocationHelper.findLocation(updateLocation);
});