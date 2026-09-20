import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { farger } from './theme/theme';
import { Ionicons } from '@expo/vector-icons';

import JaktlagScreen from './screens/JaktlagScreen';
import DetaljScreen from './screens/DetaljScreen';
import MinStatusScreen from './screens/MinStatusScreen';

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
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      // Navigasjon. Tabs = bunnmeny. Stacken ligger inni første fane.
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