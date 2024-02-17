import { createTheme, ThemeProvider } from "@rneui/themed";
import RootStack from "./navigation/";
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const theme = createTheme({
  lightColors: {
    tertiary: '#124789',
    accent: '#f98652',
    surface: '#0990763',
  },
  darkColors: {
    tertiary: '#124789',
    accent: '#908652',
    surface: '#0990763',
  },
  components: {
    Button: (props, theme) => ({
      containerStyle: {
        backgroundColor: theme.colors.tertiary
      }
    }),
    Text: (props) => ({
      style: {
        fontWeight: props.bold ? 'bold' : 'normal',
      }
    }),
  },
  mode: 'light', // or 'dark'
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootStack />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
