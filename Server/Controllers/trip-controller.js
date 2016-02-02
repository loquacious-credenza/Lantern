'use strict';

var Trip = require('../Models/trip');

/**
 * Create a new trip with information from the response object.
 * @param  {object} req  Request object decorated with params and body properties
 * @param  {object} res  The response to client, either new record or error
 * @return {undefined}      The server responds from within the promise.
 */
function create(req, res){
  // Grab userId from the req params.
  var user = req.params.user_id;
  var origin = {location:{coordinates:[req.body.origin.longitude,req.body.origin.latitude]}}
  var destination = {location:{coordinates:[req.body.destination.longitude,req.body.destination.latitude]}}

  console.log('origin is', origin)
  // Use the Trip models create method to create a new instance of trip
  // and write to Mongo.
  // Note that `path` and `videos` are empty at create time.
  return Trip.create({
    user_id: user,
    active: true,
    origin: origin,
    destination: destination,
    start_time: req.body.startTime,
    overdue_time: req.body.overdueTime
  }).then(
    // onSuccess handler
    function(newTrip){ //Once the new trip is created
      console.log(newTrip); // console.log for debugging  REMOVE
      res.status(201).json(newTrip); //send the object back to client with status 201
      return newTrip;
    },
    // onError handler
    function(err){ // if there is an error
      // TODO: be sure that server logs errors with logger
      console.log(err);
      res.status(500).send('The trip could not be created', err); //send appropriate response to client.
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
  var id = req.params.trip_id;

  // uses the findOne method to return a single object found by ID
  return Trip.findOne({ _id: id})
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
  var id = req.params.trip_id;

  return Trip.findByIdAndUpdate(id, { $set: req.body })
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

function addLocPoints(id, data, res) {
  console.log('ID IS: ', id);
  Trip.findByIdAndUpdate(id, { $pushAll: {path: data} }, function (err, response) {
    if (err) {
      console.log("Error pushing locpoint data to trip: ", err);
      res.sendStatus(500);
    } else {
      //res.sendStatus(200);
      res.json(response);
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
  delete: del
};
