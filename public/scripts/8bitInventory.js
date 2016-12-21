////// global array of items in inventory //////
var items = [];

$( document ).ready( function(){
  init();
}); // end doc ready

var init = function() {
  console.log('in init');
  // properties by which searches can be done
  var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];
  var sizes = [ 'small', 'medium', 'large' ];
  //display size & color options when doc is ready
  generateSelectOptions(colors, $('#colorIn'), $('#findColorIn'));
  generateSelectOptions(sizes, $('#sizeIn'), $('#findSizeIn'));
  // get objects when doc is ready
  getObjects();
  //event Listeners
  $('#addItemForm').on('submit', function() {
    addObject(event);
  }); // end #findItemForm submit

  // the below are tests to show what is returned when running findObject
  findObject( 'blue', 'small' );
  findObject( 'blue', 'large' );
}; // end init

var addObject = function(e){
  console.log( 'in addObject' );
  e.preventDefault();
  // assemble object from input fields
  var newItem = {
    color: $('#colorIn').val(),
    name: $('#nameIn').val(),
    size: $('#sizeIn').val()
  }; // end newItem
  console.log( 'adding:', newItem );
  $.ajax({
    type: 'POST',
    url: '/inventory',
    data: newItem,
    success: function(response) {
      console.log('ajax POST success', response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
  //add to items array
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

var generateSelectOptions = function(array, element1, element2) {
  console.log('in generateSelectOptions');
  var $el1 = element1;
  var $el2 = element2;
  for (var i = 0; i < array.length; i++) {
    $el1.append('<option value="'+ array[i] +'">' + array[i] + '</option>');
    $el2.append('<option value="'+ array[i] +'">' + array[i] + '</option>');
  } // end for
}; // end generateSelectOptions

var getObjects = function(){
  console.log( 'in getObjects');
  $.ajax({
    type: 'GET',
    url: '/inventory',
    success: function(response) {
      console.log('GET ajax success', response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getObjects
