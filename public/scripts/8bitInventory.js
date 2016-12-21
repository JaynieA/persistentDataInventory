// properties by which searches can be done
var sizes = [ 'small', 'medium', 'large' ];
var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];

////// global array of items in inventory //////
var items = [];

$( document ).ready( function(){
  init();
}); // end doc ready

var init = function() {
  console.log('in init');
  // get objects when doc is ready
  getObjects();
  // the below are tests to show what is returned when running findObject
  addObject( 'blue', 'blueberry', 'small' );
  findObject( 'blue', 'small' );
  findObject( 'blue', 'large' );
}; // end init

var addObject = function( colorIn, nameIn, sizeIn ){
  console.log( 'in addObject' );
  // assemble object from new fields
  // var newItem = {
  //   color: colorIn,
  //   name: nameIn,
  //   size: sizeIn
  // }; // end testObject
  var newItem = {
    color: "pink",
    name: "jelly bean",
    size: "small"
  }; // end testObject
  console.log( 'adding:', newItem );
  ////// TODO: add ajax call (POST) to addItem route to add this item to the table
  $.ajax({
    type: 'POST',
    url: '/addItem',
    data: newItem,
    success: function(response) {
      console.log('ajax POST success', response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
  // add to items array
  items.push( newItem );
}; // end addObject

var findObject = function( colorCheck, sizeCheck ){
  console.log( 'in findObject. Looking for:', colorCheck, sizeCheck );
  // array of matches
  var matches = [];
  for ( var i = 0; i < items.length; i++ ) {
    if( items[i].color == colorCheck && items[i].size == sizeCheck ){
      // match, add to array
      matches.push( items[i] );
    } // end if
  } // end for
  console.log( 'matches:', matches );
  ////// TODO: display matches
}; // end findObject

var getObjects = function(){
  console.log( 'in getObjects');
  $.ajax({
    type: 'GET',
    url: '/getInventory',
    success: function(response) {
      console.log('GET ajax success', response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getObjects
