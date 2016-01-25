'use strict';

var Trip = require('../Models/trip');

/**
 * Create a new trip with information from the response object.
 * @param  {object} req  Request object decorated with params and body properties
 * @param  {object} res  The response to client, either new record or error
 * @return {undefined}      The server responds from within the promise.
 */
function create(req, res, data){
  // Grab userId from the req params.
  var user = req.params.user_id;

  // Use the Trip models create method to create a new instance of trip
  // and write to Mongo.
  // Note that `path` and `videos` are empty at create time.
  return Trip.create({
    user_id: user,
    destination: req.body.destination,
    start_time: req.body.startTime,
    overdue_time: req.body.overdueTime
  }).then(function(newTrip){ //Once the new trip is created
      console.log(newTrip); // console.log for debugging  REMOVE
      res.status(201).json(newTrip); //send the object back to client with status 201
    })
    .catch(function(err){ // if there is an error
      // TODO: be sure that server logs errors with logger
      res.status(500).send('The trip could not be created', err); //send appropriate response to client.
    });
}

function read(req, res){
  var trip = req.params.trip_id;

  return Trip.findOne({ _id: trip})
    .then(function(record){
      res.json(record);
    })
    .catch(function(err){
      res.status(404).send(err);
    });
}

function update(req, res, data){
  var id = req.params.trip_id;

  return Trip.findByIdAndUpdate(id, { $set: req.body })
    .then(function(trip){
      res.status(204);
    })
    .catch(function(err){
      res.status(500).send('There was problem updated the trip.  It was either not found, or the update data is invalid.');
    })
}

module.exports = {
  create: create,
  read: read,
  update: update
};
