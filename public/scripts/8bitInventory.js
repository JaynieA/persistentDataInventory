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
  }); // end #addItemForm submit
  $('#findItemForm').on('submit', function() {
    findObject(event);
  }); // end #findItemForm submit
}; // end init

var clearForm = function(formId) {
  console.log('in clearForm');
  $("#" + formId + " input, #" + formId + " select").val('');
}; // end clearForm

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
      clearForm('addItemForm');
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
  //add to items array
  items.push( newItem );
}; // end addObject

var findObject = function(e){
  console.log( 'in findObject');
  //prevent form submission
  e.preventDefault();
  //get values from selects
  var colorCheck = $('#findColorIn').val();
  var sizeCheck = $('#findSizeIn').val();
  // array of matches
  var matches = [];
  //TODO: separate or rename this function???
  for ( var i = 0; i < items.length; i++ ) {
    console.log('item color:', items[i].color);
    if( items[i].color == colorCheck && items[i].size == sizeCheck ){
      // match, add to array
      matches.push( items[i] );
    } // end if
  } // end for
  console.log( 'matches:', matches );
  clearForm('findItemForm');
  displayMatches(matches);
}; // end findObject

var displayMatches = function(array) {
  console.log('in displayMatches', array);
  if (array.length < 1) {
    console.log('no matches found');
    $('#outputDiv').append('<p>There are no matches for this search</p>');
  } else {
    $('#outputDiv').append('<h3>Matching Items Found:</h3>');
    for (var i = 0; i < array.length; i++) {
      $('#outputDiv').append('<div class="itemFound"></p>');
      var $el = $('#outputDiv').children().last();
      $el.append('<p>' + array[i].name + '</p>');
      $el.append('<p>' + array[i].color + '</p>');
      $el.append('<p>' + array[i].size + '</p>');
    } // end for
  } // end else
};// end displayMatches

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
      //Push each item into items array
      for (var i = 0; i < response.items.length; i++) {
        items.push(response.items[i]);
      } // end for
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getObjects
