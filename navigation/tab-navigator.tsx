import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import MapVenues from '../screens/map-venues';
import Schedule from '../screens/schedule';
import Liked from '../screens/liked';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

const tabs = [
  { name: 'Schedule', component: Schedule, icon: 'calendar' },
  { name: 'Map', component: MapVenues, icon: 'map' },
  { name: 'Liked', component: Liked, icon: 'heart' },
];

export default function TabLayout({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#F1C3CB',
          tabBarInactiveTintColor: 'black',
          tabBarLabel: route.name,
          tabBarIcon: ({ color }) => {
            const tab = tabs.find(t => t.name === route.name);
            const iconName = tab ? tab.icon : 'circle';
            return <TabBarIcon name={iconName as any} color={color} />;
          },
        })}
      >
        {tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{ headerShown: false }} />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}