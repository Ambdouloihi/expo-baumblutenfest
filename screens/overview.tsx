import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dimensions, ImageBackground, View } from 'react-native';
import { Text, Chip } from '@rneui/themed';

import { RootStackParamList } from '../navigation';
import styles from '../styles';
import Curve from '../components/Curve';

type OverviewScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/header-baumblutenfest.png')} style={styles.header}>
        <Curve width={screenWidth} />
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text h1 bold style={{ textAlign: 'center' }}>Baumblütenfest</Text>

        <Text style={{ textAlign: 'center' }}>
          The Tree Blossom Festival (Baumblütenfest) in Werder starts every year with a
          magnificent parade, in which over 1000 participants take part. They walk through the
          city to the market square on the island and open up the colorful and festive hustle
          and bustle that attracts visitors in its spell.
        </Text>

        <Chip
          title="Let’s go"
          onPress={() => navigation.navigate('TabNavigator')}
          color={'#F1C3CB'}
          size='lg'
            titleStyle={{ fontSize: 20}}
        />
      </View>
    </View>
  );
}