// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {


    // TODO: ... your code here ...
    //latitude, longitude, name, 
    
    #latitude;
    #longitude;
    #name;
    #hashtag;

    constructor(latitude, longitude, name, hashtag)
    {
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#name = name;
        this.#hashtag = hashtag;

    } 

    get latitude()
    {
        return this.#latitude;
    }

    get longitude()
    {
        return this.#longitude;
    }

    get name()
    {
        return this.#name;
    }

    get hashtag()
    {
        return this.#hashtag;
    }

    toJSON()
    {
        return {latitude: this.#latitude, longitude: this.#longitude, name: this.#name, hashtag: this.#hashtag};
    }

    
    


    
    
}

module.exports = GeoTag;
