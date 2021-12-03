const InMemoryGeoTagStore = require("./geotag-store");
const GeoTagExamples = require("./geotag-examples");

geotagstore = new InMemoryGeoTagStore(GeoTagExamples.tagList);
geotagexamples = new GeoTagExamples();
const ausgabe = JSON.stringify(taglist);

console.log(ausgabe);
