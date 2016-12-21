var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );

// base url
router.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end home base

module.exports = router;
