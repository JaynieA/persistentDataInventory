#8-bit Inventory Launchpad

##Description

Updating the earlier "Do You Have This?" project with persistent data.

Think about this in stages: Using the existing project as a POC you'll want to complete the following:

* [x] Step 1 - Complete the basic functionality using JQuery

* [x] Step 2 - Use a server side array to store the inventory

* [x] Step 3 - Add an SQL db for persistent inventory data

##Technologies

* JQuery
* HTML
* JavaScript
* SQL

##Database

* db name should be 'inventory'
* table name should be 'items'

##Stretch Goals
* [x] Add styling
* [x] Host app on Heroku
  * [View On Heroku](https://whispering-brushlands-53474.herokuapp.com/)
* [x] Add Quantity column to items table
  * [x] Add logic to update the quantity (by adding the quantity entered to the existing quantity) of an added item if the name, color, and size fields are the same as an existing item rather than inserting a new record.
* [ ] Add Server Side Validation
