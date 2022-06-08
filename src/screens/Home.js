import React,{useState,useEffect} from 'react';
import {View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import TodoList from './components/TodoList';


const Home = ({navigation,userId}) => {


    const [todoList,setTodoList]= useState({});

    const todo = {
        title: 'Gym',
        body: 'Goto gym',
        time: '12:30 PM',
        checked: false
    }
    useEffect(() => {
        todos();
    }, []);
    const logout = () => {
        auth()
        .signOut()
        .then(() => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Login' }
              ],
            })
        ));
    }

    const todos = () => {
        const ref = firestore().collection(`Databsase/${userId}/TodoList`);
    }

     return (
        <View>
            <TouchableOpacity
            onPress={()=>{
                logout();
            }}
            >
                <Text>Logout</Text>
            </TouchableOpacity>
            <Text>Home Screen</Text>
            <TodoList
                todo={todo}
                click={()=>console.log('Todo clicked')}
                del={()=>console.log('delete clicked')}
            />
        </View>
    );
};


const styles = StyleSheet.create({

});


export default Home;