import React, { useMemo } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, View } from 'react-native';
import VenueDetailsSheet from './venue-details-sheet';
import useVenueContext, { VenueDataProps } from '../context/EventVenueContext';
import VenueMapMarker from '../components/VenueMapMarker';
import { VENUE_TYPES } from '../constants/venueTypes';

const INITIAL_REGION = {
  latitude: 52.37535883968519,
  longitude: 12.928559841971293,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const getRandomOffset = () => (Math.random() - 0.5) / 1500;

const VenueMarker = ({ venue }: { venue: VenueDataProps }) => {
  const latitude = useMemo(() => venue.attributes.location.Latitude + getRandomOffset(), [venue]);
  const longitude = useMemo(() => venue.attributes.location.Longitude + getRandomOffset(), [venue]);

  const venueType = VENUE_TYPES.find((type) => type.name === venue.attributes.typeOfVenue);

  return (
    <Marker
      key={venue.id}
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={venue.attributes.title}
      description={venue.attributes.description}
    >
      {venueType && <VenueMapMarker icon={venueType.icon} color={venueType.color} />}
    </Marker>
  );
};

export default function VenueMap() {
  const { venues } = useVenueContext();
  const { data } = venues;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={INITIAL_REGION}
      >
        <Image
          style={{ margin: 12 }}
          source={require('../assets/logo-baumblutenfest.png')}
        />
        {data.map((venue) => <VenueMarker key={venue.id} venue={venue} />)}
      </MapView>
      <VenueDetailsSheet />
    </View>
  );
}