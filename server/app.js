var express = require( 'express' );
var app = express();
var port = process.env.PORT || 3003;

// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end spin up server

// static folder
app.use( express.static( 'public' ) );

//ROUTERS
var index = require('../routers/index');
app.use('/', index);

var inventory = require('../routers/inventory');
app.use('/inventory', inventory);
