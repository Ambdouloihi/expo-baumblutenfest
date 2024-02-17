import { Text } from '@rneui/base';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import { EventDataProps } from '../context/EventVenueContext';
import { fetchEventsByDate, fetchAllEvents } from '../tools/fetchData';
import EventCard from '../components/EventCard';
import Filter from '../components/Filter';

interface Filter {
  name: string;
  icon: string;
  color: string;
}

function useEventDateFilters(): Filter[] {
  function sortEventsByDate(events: EventDataProps[]): EventDataProps[] {
    return events.sort((a, b) => new Date(a.attributes.start).getTime() - new Date(b.attributes.start).getTime());
  }
  
  function getUniqueEventDates(events: EventDataProps[]): string[] {
    const optionFormat: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dates = events.map(event => new Date(event.attributes.start).toLocaleDateString('en-FR', optionFormat));
    return Array.from(new Set(dates));
  }
  
  function createFiltersFromDates(dates: string[]): Filter[] {
    return dates.map(date => ({ name: date, icon: 'calendar', color: '#F1C3CB' }));
  }
  
  const { data } = useSWR<EventDataProps[]>(['allEventsDates'], fetchAllEvents, {});
      
  const sortedEvents = useMemo(() => sortEventsByDate(data ?? []), [data]);
  const uniqueDates = useMemo(() => getUniqueEventDates(sortedEvents), [sortedEvents]);
  const filters = useMemo(() => createFiltersFromDates(uniqueDates), [uniqueDates]);

  return filters;
}

export default function TabScheduleScreen() {
  const filters = useEventDateFilters();
  const [filterDate, setFilterDate] = useState<string[]>([]);

  useEffect(() => {
    if (filters.length > 0 && filterDate.length === 0) {
      setFilterDate(filters.map(filter => filter.name));
    }
  }, [filters]);

  const { data, isLoading } = useSWR<EventDataProps[]>(['events', filterDate.length > 0 ? filterDate : []], fetchEventsByDate, {});

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Text h1 bold>Schedule</Text>
      {filters.length === 0 ? <ActivityIndicator size="large" /> :
        <Filter
          filterOptions={filters}
          selectedFilters={filterDate}
          setSelectedFilters={setFilterDate}
        />}
      {isLoading ? <ActivityIndicator size="large" /> :
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventCard {...item} />}
        />
      }
    </View>
  );
}