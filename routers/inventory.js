var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );

//middleware
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );

//connect to database
var connString = require( '../modules/connection' );

// add new items to the inventory OR update them if a match exists
router.post( '/', urlEncodedParser, function( req, res ){
  console.log( 'addItem route hit:', req.body );
  //declare match variable as 'empty' for later comparison
  var match = 'empty';
  pg.connect(connString, function(err, client ,done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      //select any items that have the same name, color, and size as the one added by the user
      var query = client.query('SELECT * FROM items WHERE name = $1 AND color = $2 AND size = $3', [req.body.name, req.body.color, req.body.size]);
      query.on('row', function(row) {
        //hold on to any matches
        match = row;
      });
      //after the above query has completed, continue
      query.on('end', function() {
        var query2;
        //if there are no matches, insert new record into database
        if (match === 'empty') {
          query2 = client.query('INSERT INTO items (name, color, size, quantity) VALUES ($1, $2, $3, $4)', [req.body.name, req.body.color, req.body.size, req.body.quantity]);
          query2.on('end', function() {
            res.send('OK');
          }); // query2 end
        //if there is a match, ADD the quantity of the user input to that match
        } else {
          var matchId = match.id;
          var newQty =  Number(req.body.quantity) + Number(match.quantity);
          query2 = client.query('UPDATE items SET quantity=$1 WHERE id=$2', [newQty, matchId]);
          query2.on('end', function() {
            res.send('OK');
          }); // query2 end
        } // end else
        //disconnect from database
        done();
      }); // main query end
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
