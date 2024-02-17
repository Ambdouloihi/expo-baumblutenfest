import Strapi from "strapi-sdk-js"

const STRAPI_URL = "https://srh-festival-strapi-1ee297d017ba.herokuapp.com";
const EVENTS = 'events';
const VENUES = 'venues';

function createStrapiInstance() {
    return new Strapi({ url: STRAPI_URL });
}

export async function fetchEvents<EventDataProps>([_, likedEvents]: string[]): Promise<EventDataProps> {
    if (likedEvents.length === 0) {
        return [] as EventDataProps;
    }

    const strapi = createStrapiInstance();
    const response = await strapi.find<EventDataProps>(EVENTS, {
        filters: { id: { $in: likedEvents } },
        populate: '*',
    });

    return response.data as EventDataProps;
}

export async function fetchVenues<VenueDataProps>([_, likedVenues]: string[]): Promise<VenueDataProps[]> {
    if (likedVenues.length === 0) {
        return [] as VenueDataProps[];
    }

    const strapi = createStrapiInstance();
    const response = await strapi.find<VenueDataProps[]>(VENUES, {
        filters: { id: { $in: likedVenues } },
        populate: '*',
    });

    return response.data as VenueDataProps[];
}

export async function fetchEventsByDate<EventDataProps>([_, selectedFilters]: [string, string[]]): Promise<EventDataProps> {
    if (selectedFilters.length === 0) {
        return [] as EventDataProps;
    }

    const strapi = createStrapiInstance();
    const customFilter = selectedFilters.map((date: string) => {
        const [day, month, year] = date.split("/");
        const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
        const nextDay = new Date(`${year}-${month}-${day}`);
        nextDay.setDate(nextDay.getDate() + 1);

        return { $and: [{ start: { $gte: isoDate } }, { start: { $lt: nextDay.toISOString() } }] };
    });

    const response = await strapi.find<EventDataProps>(EVENTS, {
        filters: { $or: customFilter },
        populate: '*',
    });

    return response.data as EventDataProps;
}

export async function fetchAllEvents<EventDataProps>(): Promise<EventDataProps> {
    const strapi = createStrapiInstance();
    const response = await strapi.find<EventDataProps>(EVENTS, { fields: ['start'] });

    return response.data as EventDataProps;
}

export async function fetchVenuesByFilters<VenueDataProps>([_, searchToken, selectedFilters]: [string, string, string[]]): Promise<VenueDataProps[]> {
    if (selectedFilters.length === 0) {
        return [] as VenueDataProps[];
    }

    const strapi = createStrapiInstance();
    const response = await strapi.find<VenueDataProps[]>(VENUES, {
        filters: {
            $and: [
                { typeOfVenue: { $in: selectedFilters } },
                {
                    $or: [
                        { title: { $containsi: searchToken } },
                        { description: { $containsi: searchToken } },
                        { typeOfVenue: { $containsi: searchToken } },
                    ],
                }
            ],
        },
        populate: '*',
    });

    return response.data as VenueDataProps[];
}