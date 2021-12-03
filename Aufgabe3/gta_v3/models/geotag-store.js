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
    #radius = 10;

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
         var geotags = [];
         for(var geotag in this.#feld)
         {
             if(geotag.name.match(key))
             {
                 var x = geotag.latitude-latitude;
                 var y = geotag.longitude-longitude;
                 var distance = Math.sqrt((x*x)+(y*y) );

                 if(distance <= this.#radius)
                 {
                     geotags.push(geotag);
                 }
             }

         }
         return geotags;
     }


     getNearbyGeoTags(latitude, longitude)
     {
         let radius = this.#radius;
         var geotags = [];
         this.#feld.forEach(function (geotag){

             var x = geotag.latitude-latitude;
             var y = geotag.longitude-longitude;
             var distance = Math.sqrt((x*x)+(y*y) );

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



     removeGeoTag(geotag)
     {
         for(var i = 0; i < this.#feld.length; i++)
         {
             if(this.#feld[i].name == geotag.name)
             {
                 this.#feld.splice(i, 1);
             }

         }
     }






}

module.exports = InMemoryGeoTagStore
