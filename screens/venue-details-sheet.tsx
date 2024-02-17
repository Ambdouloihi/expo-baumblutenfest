import { FontAwesome } from '@expo/vector-icons';
import { SearchBar } from "@rneui/themed";
import React, { useState, useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VenuesList from '../components/VenuesList';
import Filter from '../components/Filter';

import useSWR from 'swr';
import useEventVenueStore, { VenueDataProps } from '../context/EventVenueContext';
import { fetchVenuesByFilters } from '../tools/fetchData';

import { VENUE_TYPES } from '../constants/venueTypes';

const useFetchAndFilterVenues = (search: string, filterVenues: string[]) => {
  const searchToken = search.split(' ')
  const { data, isLoading } = useSWR<VenueDataProps[]>(
    ['venues', searchToken, filterVenues],
    fetchVenuesByFilters,
    {}
  );

  const { setVenues } = useEventVenueStore();

  useEffect(() => {
    setVenues({ data: data || [], isLoading });
  }, [data, search, setVenues, isLoading]);
}

export default function VenueDetailsSheet() {
  const [filterVenues, setFilterVenues] = useState(VENUE_TYPES.map((filter) => filter.name));
  const [search, setSearch] = useState("");
  useFetchAndFilterVenues(search, filterVenues);

  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['20%', '100%'];

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSheetChanges = (index: number) => {
    if (index === 0) {
      Keyboard.dismiss();
    }
    setIsExpanded(index === 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={{ display: isExpanded ? 'none' : 'flex' }}
      backgroundStyle={{ borderRadius: isExpanded ? 0 : 24, backgroundColor: 'white' }}
    >

      <SearchBar
        searchIcon={<FontAwesome name="search" size={24} color="black" />}
        placeholder="Type Here..."
        onChangeText={setSearch}
        onFocus={() => bottomSheetRef.current?.expand()}
        onBlur={() => Keyboard.dismiss()}
        value={search}
        inputContainerStyle={{ ...{ backgroundColor: '#e5e5e5', borderRadius: 24 } }}
        containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
      />
      <Filter
        filterOptions={VENUE_TYPES}
        selectedFilters={filterVenues}
        setSelectedFilters={setFilterVenues}
      />
      <VenuesList />
    </BottomSheet>
  );
}