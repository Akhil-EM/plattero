import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
const searchOptions = {
  componentRestrictions: { country: ['in'] },
}

export class MapLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat:10.0260688,
        lng:76.3124753
      }
    };

  }

  handleChange = address => {
    this.setState({ address });
  };
  
  handleSelect = address => {
    this.setState({ address });
    
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // console.log('Success', latLng);
        // update center state
         this.props.setInfo(latLng.lat,latLng.lng,address)
         if(latLng==='') console.log('it is null')
        this.setState({ mapCenter: latLng});
      })
      .catch(error => console.error('Error', error));
  };
 
  
  render() {
    return (
      <div id='googleMaps' >
        <PlacesAutocomplete
         searchOptions={searchOptions}
          className='auto-complete'
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div >
              <input
                {...getInputProps({
                  placeholder: 'Choose Location..',
                  className: 'form-control',
                })}
              />
              <div className="autocomplete-dropdown-container" >
                {loading && <div >Loading...</div>}
                {suggestions.map((suggestion,key) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div key={key} className='loader' style={{padding:'20px',width:'500px'}}
                      
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}>
                      <span key={key}>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Map 
          style={{height:'350px'}}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          >
          <Marker 
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }} />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD8L237G-BLrf0hQtqaTdTiezwwqEzoq4A')
})(MapLoader)