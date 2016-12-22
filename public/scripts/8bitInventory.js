var logs = false;
// properties by which searches can be done
var COLORS = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];
var SIZES = [ 'small', 'medium', 'large' ];

$( document ).ready( function(){
  init();
}); // end doc ready

var init = function() {
  if (logs) console.log('in init');
  //display size & color options when doc is ready
  generateSelectOptions(COLORS, $('#colorIn'), $('#findColorIn'));
  generateSelectOptions(SIZES, $('#sizeIn'), $('#findSizeIn'));
  //event Listeners
  $('#addItemForm').on('submit', function() {
    addItem(event);
  }); // end #addItemForm submit
  $('#findItemForm').on('submit', function() {
    getItems(event);
  }); // end #findItemForm submit
}; // end init

var clearForm = function(formId) {
  if (logs) console.log('in clearForm');
  $("#" + formId + " input, #" + formId + " select").val('');
}; // end clearForm

var addItem = function(e){
  if (logs) console.log( 'in addItem' );
  e.preventDefault();
  // assemble newItem from input fields
  var newItem = {
    color: $('#colorIn').val(),
    name: $('#nameIn').val(),
    size: $('#sizeIn').val(),
    quantity: Number($('#quantityIn').val())
  }; // end newItem
  $.ajax({
    type: 'POST',
    url: '/inventory',
    data: newItem,
    success: function(response) {
      if (logs) console.log('ajax POST success', response);
      clearForm('addItemForm');
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end addItem

var findItem = function(array){
  if (logs) console.log('in findItem');
  //get values from selects
  var colorCheck = $('#findColorIn').val();
  var sizeCheck = $('#findSizeIn').val();
  // array of matches
  var matches = [];
  for ( var i = 0; i < array.length; i++ ) {
    if( array[i].color == colorCheck && array[i].size == sizeCheck ){
      // match, add to array
      matches.push( array[i] );
    } // end if
  } // end for
  clearForm('findItemForm');
  displayMatches(matches, colorCheck, sizeCheck);
}; // end findItem

var displayMatches = function(array, colorSearched, sizeSearched) {
  if (logs) console.log('in displayMatches', array);
  //clear output div
  $('#outputDiv').html('');
  //If no matches, tell user. Else, display matches
  if (array.length < 1) {
    $('#outputDiv').append('<p>There are no matches for this search</p>');
  } else {
    $('#outputDiv').append('<h3>Search Results:</h3>');
    $('#outputDiv').append('<hr>');
    $('#outputDiv').append('<h4>Search Criteria: ' + sizeSearched + ', ' + colorSearched + '</h4>');
    for (var i = 0; i < array.length; i++) {
      //If quantity is greater than 1, make item plural by adding an 's'
      if (array[i].quantity > 1) {
        $('#outputDiv').append('<p class="search-result">' + array[i].quantity + ' ' + array[i].name + 's</p>');
      } else {
        $('#outputDiv').append('<p class="search-result">' + array[i].quantity + ' ' + array[i].name + '</p>');
      } // end else
    } // end for
  } // end else
};// end displayMatches

var generateSelectOptions = function(array, element1, element2) {
  if (logs) console.log('in generateSelectOptions');
  var $el1 = element1;
  var $el2 = element2;
  for (var i = 0; i < array.length; i++) {
    $el1.append('<option value="'+ array[i] +'">' + array[i] + '</option>');
    $el2.append('<option value="'+ array[i] +'">' + array[i] + '</option>');
  } // end for
}; // end generateSelectOptions

var getItems = function(e){
  if (logs) console.log('in getItems');
  //prevent form submission
  e.preventDefault();
  if (logs) console.log( 'in getItems');
  $.ajax({
    type: 'GET',
    url: '/inventory',
    success: function(response) {
      if (logs) console.log('GET ajax success', response);
      var items = response.items;
      findItem(items);
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getItems
