var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );

//middleware
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );

//connect to database
var connString = require( '../modules/connection' );

// add new items to the inventory
router.post( '/', urlEncodedParser, function( req, res ){
  console.log( 'addItem route hit:', req.body );
  pg.connect(connString, function(err, client ,done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      var query = client.query('INSERT INTO items (name, color, size) VALUES ($1, $2, $3)', [req.body.name, req.body.color, req.body.size]);
      query.on('end', function() {
        //disconnect from database
        done();
        res.send('OK');
      }); // query end
    } // end else
  }); // end pg connect
}); // end addItem route

// get all items in the inventory
router.get( '/', function( req, res ){
  var items = [];
  // get all items in the table and return them to client
  pg.connect(connString, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      var query = client.query('SELECT * FROM items ORDER BY name ASC');
      query.on('row', function(row) {
        items.push(row);
      }); // end query.on
      query.on( 'end', function() {
        //disconnect from database
        done();
        res.send({items: items});
      }); // end query end
    } // end else
  }); // end pg connect
}); // end addItem route

module.exports = router;
