var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var pg = require( 'pg' );
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 3003;

//connect to database
var connString = require( '../modules/connection' );

// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end spin up server

// static folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end home base

// add new objects to the inventory
app.post( '/addItem', urlEncodedParser, function( req, res ){
  console.log( 'addItem route hit:', req.body );
  pg.connect(connString, function(err, client ,done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      console.log('connected to database');
      var query = client.query('INSERT INTO items (name, color, size) VALUES ($1, $2, $3)', [req.body.name, req.body.color, req.body.size]);
      query.on('end', function() {
        //disconnect from database
        done();
        res.send('OK');
      }); // query end
    } // end else
  }); // end pg connect
}); // end addItem route

// get all objects in the inventory
app.get( '/getInventory', function( req, res ){
  console.log( 'getInventory route hit' );
  var items = [];
  // get all items in the table and return them to client
  pg.connect(connString, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      console.log('connected to the database');
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
