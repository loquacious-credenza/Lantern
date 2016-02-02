module.exports = function (lat1, lng1, lat2, lng2) {
 var result = {};
 result.lat = (lat1 + lat2) / 2;
 result.lng = (lng1 + lng2) / 2;
 result.latDelta =  1.5 * Math.abs(lat1 - lat2);
 result.lngDelta = 1.5 * Math.abs(lng1-lng2);
 return result;
}
