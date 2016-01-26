var User = require('./Models/user.js');
var Trip = require('./Models/trip.js');

var cont1 = {
	contact_name: 'Barbara Streisand',
	contact_email: 'oranges?@fakemail.com',
	contact_phone: 666
};
var cont2 = {
	contact_name: 'A big bag of tumors',
	contact_email: 'tumorBag@gmail.com',
	contact_phone: 242
};
var cont3 = {
	contact_name: 'Alf',
	contact_email: 'motherfuckingAlf@geocities.com',
	contact_phone: 4555
};

var trip1 = {
  user_id: 'A',
  active: true,
  destination: { "location": { "coordinates": [ -122.40906260000001, 37.783750399999995] } },
  start_time: Date.now(),
  overdue_time: "2015-07-18T00:43:35.490Z"
  //path: []
  //videos: [ VideoModel ]
};
var trip2 = {
  user_id: 'B',
  active: false,
  destination: { "location": { "coordinates": [ -122.40906260000001, 37.783750399999995] } },
  start_time: Date.now(),
  overdue_time: "2015-06-06T16:25:04.356Z"
  //path: []
  //videos: [ VideoModel ]
};
var trip3 = {
  user_id: 'C',
  active: true,
  destination: { "location": { "coordinates": [ -122.40906260000001, 37.783750399999995] } },
  start_time: Date.now(),
  overdue_time: "2016-04-10T19:27:19.698Z"
  //path: []
  //videos: [ VideoModel ]
};

var user1 = {
_id:'A',
name:'Gary Coleman',
phone: 5554444,
delay: 50,
contacts: [cont1]
//trips: [trip1]
};
var user2 = {
_id:'B',
name:'Carrot Top',
phone: 2221334,
delay: 1,
contacts: [cont1, cont2]
//trips: [trip2]
};
var user3 = {
_id:'C',
name:'Saddam Hussein',
phone: 666,
delay: 5,
contacts: [cont3]
//trips: [trip3]
};

Trip.create(trip1, function(){});
Trip.create(trip2, function(){});
Trip.create(trip3, function(){});

User.create(user1, function(){});
User.create(user2, function(){});
User.create(user3, function(){});





