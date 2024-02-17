import { Text, Icon, Card } from '@rneui/base';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import useEventEventStore, { EventDataProps } from '../context/EventVenueContext';
import React from 'react';
import styles from '../styles';

const imageWidth = Dimensions.get('window').width * 0.50;

const formatTime = (time: string) => {
    const optionFormat = { hour: '2-digit', minute: '2-digit' };
    return new Date(time).toLocaleTimeString('en-UK', optionFormat as any);
};

const calculateEndTime = (start: string, duration: number) => {
    const startTime = new Date(start);
    if (isNaN(startTime.getTime())) {
        throw new Error(`Invalid start time: ${start}`);
    }

    const endTime = new Date(startTime.getTime() + duration * 60000);
    if (isNaN(endTime.getTime())) {
        throw new Error(`Invalid end time calculated from start time: ${start} and duration: ${duration}`);
    }

    return formatTime(endTime.toISOString());
};

export default function EventCard({ id, attributes }: EventDataProps) {
    const { likedEvents, likeEvent, unlikeEvent } = useEventEventStore();

    const startTime = formatTime(attributes.start);
    const endTime = calculateEndTime(attributes.start, attributes.duration);

    const imageUrl = attributes.image && attributes.image.data ? attributes.image.data[0].attributes.url : null;
    const sourceUri = { uri: imageUrl };

    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                    <Image
                        source={imageUrl ? sourceUri : require('../assets/icon.png')}
                        style={{...styles.image, width: imageWidth, height: imageWidth}}
                    />
                <Icon
                    name={likedEvents.includes(id) ? 'heart' : 'heart-o'}
                    type="font-awesome"
                    size={36}
                    color="#F1C3CB"
                    onPress={() => {
                        likedEvents.includes(id) ? unlikeEvent(id) : likeEvent(id);
                    }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{attributes.title}</Text>
                <Text style={styles.type}>{attributes.typeOfEvent}</Text>
                <Text style={styles.description}>{attributes.description}</Text>
                <Text>{startTime} - {endTime}</Text>
            </View>
        </View>
    );
};
