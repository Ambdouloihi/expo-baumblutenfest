import { Text, Icon } from '@rneui/base';
import { Image, View, Dimensions } from 'react-native'; 
import useEventVenueStore, { VenueDataProps } from '../context/EventVenueContext';
import { VENUE_TYPES } from '../constants/venueTypes';
import styles from '../styles';

const imageWidth = Dimensions.get('window').width * 0.50;

export default function VenueCard({ id, attributes }: VenueDataProps) {
    const { likedVenues, likeVenue, unlikeVenue } = useEventVenueStore();
    const imageUrl = attributes.photo.data ? attributes.photo.data[0].attributes.url : null;
    const sourceUri = { uri: imageUrl };
    const typeColor = VENUE_TYPES.find((type) => type.name === attributes.typeOfVenue)?.color;

    return (
        <View style={styles.card} >
            <View style={styles.iconContainer}>
                    <Image
                        source={imageUrl ? sourceUri : require('../assets/icon.png')}
                        style={{...styles.image, width: imageWidth, height: imageWidth}}
                    />
                <Icon
                    name={likedVenues.includes(id) ? 'heart' : 'heart-o'}
                    type="font-awesome"
                    size={36}
                    color="#F1C3CB"
                    onPress={() => {
                        likedVenues.includes(id) ? unlikeVenue(id) : likeVenue(id);
                    }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{attributes.title}</Text>
                <Text style={{...styles.type, color: typeColor}}>
                    {attributes.typeOfVenue}
                </Text>
                <Text style={styles.description}>{attributes.description}</Text>
            </View>

        </View>
    );
};
