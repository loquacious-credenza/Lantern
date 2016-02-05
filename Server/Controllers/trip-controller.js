'use strict';

var Trip = require('../Models/trip');
var User = require('../Models/user.js');

/**
 * Create a new trip with information from the response object.
 * @param  {object} req  Request object decorated with params and body properties
 * @param  {object} res  The response to client, either new record or error
 * @return {undefined}      The server responds from within the promise.
 */

// THIS FUNCTION CREATES A NEW TRIP AND UPDATES THE USER ASSOCIATED WITH IT. IT CREATES A NEW TRIP USING THE DATA PROVIDED IN 'req.body'.
// IT THEN FINDS A USER WITH THE ID PROVIDED BY 'req.params.user_id' AND PUSHES THE '_id' VALUE OF THE NEWLY CREATED TRIP INTO THE
// USER'S 'trips' ARRAY. THIS WAY BOTH TRIPS AND USERS BOTH HAVE REFERENCES TO ONE ANOTHER. IT RESPONDS TO THE SERVER WITH A JSON OBJECT
// CONTAINING THE NEWLY CREATED TRIP.
function create(req, res){
  var user = req.params.user_id;
  var origin = {location:{coordinates:[req.body.origin.longitude,req.body.origin.latitude]}}
  var destination = {location:{coordinates:[req.body.destination.longitude,req.body.destination.latitude]}}
  return Trip.create({
    user_id: user,
    active: true,
    origin: origin,
    eta: new Date(req.body.eta),
    destination: destination,
    start_time: new Date(req.body.startTime),
    overdue_time: new Date(req.body.overdueTime)
  })
  .then(function(newTrip){
    User.findByIdAndUpdate(newTrip.user_id, {$push: {trips: newTrip._id}}, function (err, response) {
      if (err) {
        console.log('Error pushing trip ID into user trip array: ', err);
        res.sendStatus(500);
      } else {
        res.json(newTrip);
      }
    });
    },
    // onError handler
    function(err){ // if there is an error
      console.log('Error creating new trip: ', err);
      res.sendStatus(500); //send appropriate response to client.
    });
}

/**
 * Gets a trip record with a trip id.
 * @param  {object} req Request object decorated with trip_id
 * @param  {object} res Response is either JSON of trip record or error message
 * @return {undefined}     Server response is made with either error or data payload.
 */
function read(req, res){
  // trip id from req params
  var user_id = req.params.user_id;

  // uses the findOne method to return a single object found by ID
  return Trip.findOne({ user_id: user_id, active:true})
    .then(
    // onSuccess handler
    function(record){ //the record is passed to callback
      res.json(record); //and sent as the response to the front-end
    },
    // onError handler
    function(err){ //if there is an error it is passed to callback
      res.status(404).send(err); // and a response is sent with 404 (not found) status.
    });
}

function update(req, res, data){
  var user_id = req.params.user_id;

  return Trip.findOneAndUpdate({user_id: user_id, active: true}, {$set: req.body}, {new: true})
    .then(
    // onSuccess handler
    function(trip){
      res.status(204);
    },
    // onError handler
    function(err){
      res.status(500).send('There was problem updated the trip.  It was either not found, or the update data is invalid.');
    })
}

// FINDS AN ACTIVE TRIP BY THE PROVIDED 'user_id' AND PUSHES THE NEW LOCATION IN 'data' INTO THE TRIP'S 'path' ARRAY.
// THE SERVER THEN RESPONDS WITH THE UPDATED TRIP OBJECT
function addLocPoints(user_id, data, res) {
  Trip.findOneAndUpdate({user_id: user_id, active: true}, {$push: {path: data}}, {new:true}, function (err, response) {
    if (err) {
      console.log("Error pushing locpoint data to trip: ", err);
      res.sendStatus(500);
    } else {
      console.log("Successfully added LocPoint To Trip")
      res.json(response);
    }
  });
}
// THIS METHOD FINDS THE ACTIVE TRIP ASSOCIATED WITH THE PROVIDED 'user_id' AND SWITCHES IT TO 'active:false'
function renderInactive(user_id, res) {
  Trip.findOneAndUpdate({user_id: user_id, active: true}, {active: false}, function (err, response) {
    if (err) {
      console.log("Error rendering trip inactive: ", err);
    } else {
      res.sendStatus(200);
    }
  });
}

/**
 * Deletes the the current Trip found by id.
 * @param  {object} req Request object containing Trip.id to be deleted
 * @param  {object} res Response is either removed record or error indicating delete was unsuccessful
 * @return {undefined}     Server response is initiated from method.
 */
function del(req, res){
  // grab the trip_id from the request object params
  var id = req.params.trip_id;

  // Find a trip in the Trips collecton by id and remove it from Storage
  return Trip.findByIdAndRemove(id)
    .then(
    // onSuccess handler
    function(deleted){ //pass the removed record to the callback.
      res.json(deleted); //respond with status 200 returning the removed record to the caller.
    },
    // onError handler
    function(err){
      res.status(500).send('There was a problem finding or deleting the record', err);
    })
}

module.exports = {
  addLocPoints: addLocPoints,
  create: create,
  read: read,
  update: update,
  delete: del,
  renderInactive: renderInactive
};
