import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import JaktlagScreen from './screens/JaktlagScreen';
import DetaljScreen from './screens/DetaljScreen';
import MinStatusScreen from './screens/MinStatusScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function JaktlagStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Jaktlag"
        component={JaktlagScreen}
        options={{ title: 'Jaktlaget' }}
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
      <Tab.Navigator>
        <Tab.Screen
          name="LagFane"
          component={JaktlagStack}
          options={{ title: 'Jaktlaget', headerShown: false }}
        />
        <Tab.Screen
          name="MinStatus"
          component={MinStatusScreen}
          options={{ title: 'Min status' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}