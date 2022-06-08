import React,{useState,useEffect} from 'react';
import {View, Text,StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import TodoList from './components/TodoList';
import EditTodo from './EditTodo';


const Home = ({navigation,route}) => {

    const {user} = route.params;
    const [todoList,setTodoList]= useState([]);
    const ref = firestore().collection(`Todo/User: ${user.uid}/List`);

    

    useEffect(() => {
        getAlldata();
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

    const getAlldata = async () => {
        await ref.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc=>{
                const {temp} = doc.data();
                list.push({temp})
            })
            setTodoList(list);
        });
          
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
            <FlatList
                data={todoList}
                renderItem={({item})=>{
                    return(
                        <TodoList
                            todo={item.temp}
                            click={()=>navigation.navigate('EditTodo',{todo:item.temp,user:user})}
                        />
                    );
                }}
                />
            <TouchableOpacity
            onPress={()=>{
                navigation.navigate('AddNew',{user:user});
            }}
            >
                <Text>Add new</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({

});


export default Home;