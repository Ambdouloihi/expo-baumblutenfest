# Expo-baumblutenfest

This is a simple app to help you find the best spots to see the cherry blossoms in Werder (Havel), Germany. It was created with [Expo](https://expo.io/), a framework for building cross-platform apps with React.

## Getting started

Run the following commands to get started:

```bash
npm install
npm run start
```

## Features

Built with React Native, React Native Element, SWR library for data fetching, and TypeScript for type safety.

1. **View Schedule**: Displays a list of event cards with title, start date, and venue name.
2. **Filter Events by Date**: Filters the schedule by selected dates.
3. **Venue Details Sheet**: A bottom sheet interface for venue details, with search and filter functionality.
4. **Venue List**: Displays venues matching the search query and selected filters, fetched from the server.
5. **Snap Styling**: The VenueDetailsSheet has a snap point at 20% of the screen height for different expanded and collapsed states. When expanded, the sheet looks like a normal view, and when collapsed, it looks like a modal.

## Liked Events and Venues
The TabLikedScreen provides a tabbed interface for liked events and venues.

1. **Switch Between Tabs**: Switch between the "Event" and "Venues" tabs.
2. **View Liked Events/Venues**: Displays a list of liked events or venues.

## State Management
The useEventVenueStore component manages the state of venues and events, including data, loading state, and liked items.

## Navigation
The TabLayout component provides a tabbed navigation interface with three tabs: "Schedule", "Map", and "Liked".