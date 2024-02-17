import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1.5,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 24,
        borderColor: '#e5e5e5',
        borderWidth: 2,
        backgroundColor: 'white',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 16,
        padding: 10,
    },
    image:
    {
        borderRadius: 16,
        marginBottom: 10
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    type: {
        fontSize: 20,
        color: '#666',
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
});