import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

 import HomeScreen from './screens/Inicio';
 import MapaScreen from './screens/Mapa';

 const Drawer = createDrawerNavigator();

 function App() {
     return (
     <NavigationContainer>
         <Drawer.Navigator initialRouteName='Início'>
         <Drawer.Screen name='Início' component={HomeScreen} />
         <Drawer.Screen name='Mapa' component={MapaScreen} />
         </Drawer.Navigator>
     </NavigationContainer>
     );
 }

 export default App;