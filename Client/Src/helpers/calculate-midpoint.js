module.exports = function (lat1, lng1, lat2, lng2) {
 var result = {};
 result.lat = (lat1 + lat2) / 2;
 result.lng = (lng1 + lng2) / 2;
 return result;
}

// function cartesian(f,l) { // f = latitude, l = longitude
//     return (Math.cos(f)*Math.cos(l), Math.cos(f)*Math.sin(l), Math.sin(f))
// }
// function spherical(x,y,z) {
//     r = Math.sqrt(x^2 + y^2)
//     if (r == 0) {
//         if (z > 0) return (90, 0) 
//         else if (z < 0) return (-90, 0)
//         else return undefined // (x,y,z) == (0,0,0)
//     } else {
//         return (Math.atan2(r, z), Math.atan2(x, y)) // atan2 must return *degrees*
//     }
// }

// module.exports = function (f0,l0, f1,l1) { 
//     return spherical((cartesian(f0,l0) + cartesian(f1,l1))/2)
// }