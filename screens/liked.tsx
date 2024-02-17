import React, { useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import useSWR from 'swr';
import useEventVenueStore, { VenueDataProps, EventDataProps } from '../context/EventVenueContext';
import EventCard from '../components/EventCard';
import VenueCard from '../components/VenueCard';
import { fetchEvents, fetchVenues } from '../tools/fetchData';
import { Tab, TabView } from '@rneui/base';

export default function TabLikedScreen() {
  const [index, setIndex] = useState(0);
  const { likedEvents, likedVenues } = useEventVenueStore();

  const { data: eventsData, isLoading: eventisLoading } = useSWR<EventDataProps[]>(['likedEvents', likedEvents], fetchEvents, {});
  const { data: venuesData, isLoading: venueisLoading } = useSWR<VenueDataProps[]>(['likedVenues',likedVenues], fetchVenues , {});

  return (
    <>
      <Tab
        variant="default"
        value={index}
        onChange={setIndex}
        indicatorStyle={{
          backgroundColor: '#F1C3CB',
          height: 3,
        }}
        >
        <Tab.Item
          title="Event"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer', type: 'ionicon', color: 'black' }}
          style={{ backgroundColor: 'white' }}
          />
        <Tab.Item
          title="Venues"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'heart', type: 'ionicon', color: 'black' }}
          style={{ backgroundColor: 'white' }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          {eventisLoading ? <ActivityIndicator size="large" /> :
            <FlatList
              data={eventsData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <EventCard {...item} />}
            />
          }
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          {venueisLoading ? <ActivityIndicator size="large" /> :
            <FlatList
              data={venuesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <VenueCard {...item} />}
            />
          }
        </TabView.Item>
      </TabView>
    </>
  );
}