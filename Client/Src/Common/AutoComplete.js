var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var React = require('react-native');
import Keys from '../Keys'

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

var AutoComplete = React.createClass({
  render() {
    return (
      <GooglePlacesAutocomplete
        ref = 'Auto'
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          var coords = details.geometry.location;
          this.props.selectPoint({latitude: coords.lat,longitude: coords.lng});
          // this.refs.Auto.setState({text: ''});
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: Keys.AutoCompleteKey,
          language: 'en', // language of the results
          // types: '(establishment)', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        clearText={() => {
          this.refs.Auto.setState({text: ''});
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Near By"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}
        enablePoweredByContainer={false}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        predefinedPlaces={[homePlace, workPlace]}
      />
    );
  }
});

module.exports = AutoComplete;