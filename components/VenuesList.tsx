import React from 'react';
import {  ActivityIndicator } from "react-native";
import { Text } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import useEventVenueStore, {  } from '../context/EventVenueContext';
import VenueCard from './VenueCard';

export default function VenuesList() {
  const { venues } = useEventVenueStore();
  const { data, isLoading } = venues;

  return (
    <>
      {isLoading ? <ActivityIndicator size="large" /> :
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <VenueCard {...item} />;
          }}
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No found</Text>}
        />}
    </>
  );

}