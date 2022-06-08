import React from 'react';
import {View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import AddNew from './screens/AddNew';
import EditTodo from './screens/EditTodo';


const App = () => {

    const Stack = createNativeStackNavigator();

     return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddNew" component={AddNew} />
                <Stack.Screen name="EditTodo" component={EditTodo} />
            </Stack.Navigator>
            
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({

});


export default App;