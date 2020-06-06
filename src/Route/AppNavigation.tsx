import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MenuList from '../Screen/MenuList';
import CartPage from '../Screen/CartPage';
import OrderConfirm from '../Screen/OrderConfirm';

const Stack = createStackNavigator();
export default class AppNavigation extends React.Component {
    render(){
      return (
        <NavigationContainer>
            <Stack.Navigator screenOptions= {{ headerShown: false }} >
                <Stack.Screen name="MenuList" component={MenuList} ></Stack.Screen>
                <Stack.Screen name="CartPage" component={CartPage} ></Stack.Screen>
                <Stack.Screen name="OrderConfirm" component={OrderConfirm} ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }