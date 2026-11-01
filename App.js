import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from './lib/supabase';
import { farger } from './theme/theme';

import JaktlagScreen from './screens/JaktlagScreen';
import DetaljScreen from './screens/DetaljScreen';
import MinStatusScreen from './screens/MinStatusScreen';
import LoggInnScreen from './screens/LoggInnScreen';
import NyttMedlemScreen from './screens/NyttMedlemScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// Stack = skjerm over skjerm, med tilbakeknapp.
function JaktlagStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Jaktlag"
        component={JaktlagScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalj"
        component={DetaljScreen}
        options={{ title: 'Detaljer' }}
      />
      <Stack.Screen
        name="NyttMedlem"
        component={NyttMedlemScreen}
        options={{ title: 'Nytt medlem' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [laster, setLaster] = useState(true);

  // KRAV: autentisering. Henter lagret okt og lytter pa endringer.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLaster(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nySession) => {
      setSession(nySession);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (laster) {
    return (
      <View style={styles.laster}>
        <ActivityIndicator size="large" color={farger.aksent} />
      </View>
    );
  }

  if (!session) {
    return <LoggInnScreen />;
  }

  return (
    <NavigationContainer>
      {/* Navigasjon. Tabs = bunnmeny. Stacken ligger inni første fane. */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: farger.aksent,
          tabBarInactiveTintColor: farger.tekstSvak,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarStyle: {
            backgroundColor: farger.flate,
            borderTopColor: farger.linje,
            paddingTop: 6,
          },
        }}
      >
        <Tab.Screen
          name="LagFane"
          component={JaktlagStack}
          options={{
            title: 'Jaktlaget',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MinStatus"
          component={MinStatusScreen}
          options={{
            title: 'Min status',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  laster: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: farger.bakgrunn,
  },
});