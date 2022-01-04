// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
const GeoTagExamples = require("../models/geotag-examples.js");
const Pagination = require('../models/pagination.js');
const store = new GeoTagStore(GeoTagExamples.tagList);
var pagination;

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

 router.get('/', (req, res) => {
  res.render('index');  //bei get-Abfrage
});



// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 * 
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...

router.get('/api/geotags', (req, res) => {   //Feld mit geotags zurückgeben
  var searchterm = req.query.s;
  var latitude = req.query.l1;
  var longitude = req.query.l2;
  var geotags;
  if(latitude === undefined || longitude === undefined) {
    geotags = store.getFeld;
  } else if(searchterm === undefined) {
    geotags = store.getNearbyGeoTags(latitude, longitude);
  } else {
    geotags = store.searchNearbyGeoTags(latitude, longitude, searchterm);
  }

  var page;
  if(geotags.length === 0) {
    page = {
      taglist: [],
      message: "",
      hasPrev: false,
      hasNext: false
    };
    
  } else {
    pagination = new Pagination(geotags);
    page = {
      taglist: pagination.currentTags,
      message: pagination.currentPage + "/" + pagination.lastPage + " ("+ pagination.amountTags + ")",
      hasPrev: pagination.hasPrevious(),
      hasNext: pagination.hasNext()
    };
  }
  res.json(page);

});

router.get('/api/geotags/prevPage', (req, res) => {
  pagination.prev();
  const page = {
    taglist: pagination.currentTags,
    message: pagination.currentPage + "/" + pagination.lastPage + " ("+ pagination.amountTags + ")",
    hasPrev: pagination.hasPrevious(),
    hasNext: pagination.hasNext()
  };

  res.json(page);
  
});

router.get('/api/geotags/nextPage', (req, res) => {
  pagination.next();
  const page = {
    taglist: pagination.currentTags,
    message: pagination.currentPage + "/" + pagination.lastPage + " ("+ pagination.amountTags + ")",
    hasPrev: pagination.hasPrevious(),
    hasNext: pagination.hasNext()
  };

  res.json(page);
  
});

/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned to the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...

router.post('/api/geotags', (req, res) => {
  
     store.addGeoTag(req.body);
     var id = store.getFeld.length - 1;
     res.setHeader("Location", "http://localhost:3000/api/geotags/"+ id);
     pagination = new Pagination([req.body]);
     const page = {
      taglist: pagination.currentTags,
      message: pagination.currentPage + "/" + pagination.lastPage + " ("+ pagination.amountTags + ")",
      hasPrev: pagination.hasPrevious(),
      hasNext: pagination.hasNext()
    };
  
    res.json(page);
    res.status(201).end(); 
});

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...


router.get('/api/geotags/:id', (req, res) => {

 var id = req.params.id;
 if(id >= 0 && id < store.getFeld.length)
 {
     res.json(store.getFeld[id]);
 }
});


/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

// TODO: ... your code here ...

router.put('/api/geotags/:id', (req, res) => {

      var tag_id = req.params.id;
      var geotag = req.body;

      store.getFeld[tag_id] = geotag;
      res.json(geotag);

});


/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...


router.delete('/api/geotags/:id', (req, res) => {

 var id = req.params.id;
 var geotag = store.getFeld[id];  // call-by-value

 store.removeGeoTag(id);
 res.json(geotag);
});

module.exports = router;
