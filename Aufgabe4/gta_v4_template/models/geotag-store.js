// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */



const GeoTag = require("./geotag");

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword ().
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{

    // TODO: ... your code here ...

    #feld = [];
    #radius = 2400; // in meter

    constructor(list = [])
    {
        for(let i = 0; i < list.length; i++)
        {
            let geotag = new GeoTag(list[i][1], list[i][2], list[i][0], list[i][3]);
            this.addGeoTag(geotag);
        }

    }

    addGeoTag(geotag)
     {
         this.#feld.push(geotag);
     }

     searchNearbyGeoTags(latitude, longitude, key)
     {
         var geotags = this.getNearbyGeoTags(latitude, longitude);
         var output = [];
         let regex = new RegExp(key);
         geotags.forEach(function (geotag) {

             if(regex.test(geotag.name) || regex.test(geotag.hashtag))
             {
                 output.push(geotag);
             }

         } );

         return output;
     }


     getNearbyGeoTags(latitude, longitude)
     {
         let radius = this.#radius;
         var geotags = [];
         this.#feld.forEach(function (geotag){

             const R = 6371e3; // metres
             const φ1 = geotag.latitude * Math.PI/180; // φ, λ in radians
             const φ2 = latitude * Math.PI/180;
             const Δφ = (latitude-geotag.latitude) * Math.PI/180;
             const Δλ = (longitude-geotag.longitude) * Math.PI/180;

             const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                 Math.cos(φ1) * Math.cos(φ2) *
                 Math.sin(Δλ/2) * Math.sin(Δλ/2);
             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

             const distance = R * c; // in metres


             if(distance <= radius)
             {
                 geotags.push(geotag);
             }

         });

         return geotags;
     }

     get getFeld()
     {
        return this.#feld;
     }



     removeGeoTag(id)
     {
        this.#feld.splice(id, 1);
     }






}

module.exports = InMemoryGeoTagStore
