import React from 'react';
import { View } from 'react-native';
import { Icon } from '@rneui/themed';
import { FAB } from '@rneui/base';

export default function VenueMapMarker( filter: { color: string; icon: string }) {
  return (
     <View>
     <Icon
      name='map-marker'
      type='font-awesome-5'
      size={36}
      color={filter.color}
     />
     <FAB
      icon={{ name: filter.icon, type: 'font-awesome-5', size: 14, color: 'white' }}
      color='transparent'
      containerStyle={{
        position: 'absolute',
        transform: [{ translateY: -16 }],
      }}
     />
     </View>
  );
}