import { create } from 'zustand';

type ImageData = {
    attributes: {
        url: string;
    }
}

type LocationData = {
    Latitude: number;
    Longitude: number;
}

type Venue = {
    title: string;
    description: string;
    typeOfVenue: string;
    location: LocationData;
    photo: {
        data: ImageData[] | null;
    }
}

type Event = {
    title: string;
    description: string;
    typeOfEvent: string;
    start: string;
    duration: number;
    image: {
        data: ImageData[] | null;
    }
}

export type VenueDataProps = {
    id: number;
    attributes: Venue;
};

export type EventDataProps = {
    id: number;
    attributes: Event;
};


type VenueState = {
    venues: {
        data: VenueDataProps[];
        isLoading: boolean;
    }
    setVenues: (venues: { data: VenueDataProps[], isLoading: boolean }) => void;

    events: {
        data: EventDataProps[];
        isLoading: boolean;
    }
    setEvents: (events: { data: EventDataProps[], isLoading: boolean }) => void;

    likedVenues: number[];
    likeVenue: (id: number) => void;
    unlikeVenue: (id: number) => void;

    likedEvents: number[];
    likeEvent: (id: number) => void;
    unlikeEvent: (id: number) => void;
}

const useEventVenueStore = create<VenueState>((set) => ({
    venues: {
        data: [],
        isLoading: true,
    },
    setVenues: (venues) => set({ venues }),

    events: {
        data: [],
        isLoading: true,
    },
    setEvents: (events) => set({ events }),

    likedVenues: [],
    likeVenue: (id: number) => set((state) => ({ likedVenues: [...state.likedVenues, id] })),
    unlikeVenue: (id: number) => set((state) => ({ likedVenues: state.likedVenues.filter((venueId) => venueId !== id) })),

    likedEvents: [],
    likeEvent: (id: number) => set((state) => ({ likedEvents: [...state.likedEvents, id] })),
    unlikeEvent: (id: number) => set((state) => ({ likedEvents: state.likedEvents.filter((eventId) => eventId !== id) })),
}));

export default useEventVenueStore;