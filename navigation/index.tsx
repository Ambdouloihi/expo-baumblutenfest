import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './tab-navigator';
import Overview from '../screens/overview';

export type RootStackParamList = {
  Overview: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Overview">
        <Stack.Screen name="Overview" 
        component={Overview} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false, headerLeft: () => null, gestureEnabled: false}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
