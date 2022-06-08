import React,{useState,useEffect} from 'react';
import {View, Text,StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import TodoList from './components/TodoList';
import Button from './components/Button';


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
                const {
                    title,
                    body,
                    date,
                    checked
                } = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    body,
                    date,
                    checked
                })
            })
            setTodoList(list);
        });
          
    }
    
     return (
        <View>
            <Button
                onPress={()=>{
                logout();
            }}>Log Out</Button>
            <FlatList
                data={todoList}
                renderItem={({item})=>{
                    // console.log(item);
                    return(
                        <TodoList
                            keyExtractor={(item) => item.id}
                            todo={item}
                            click={()=>navigation.navigate('EditTodo',{todo:item,user:user})}
                        />
                    );
                }}
                />
                <Button
                 onPress={()=>{
                    navigation.navigate('AddNew',{user:user});
                }}>Add New</Button>
        </View>
    );
};


const styles = StyleSheet.create({

});


export default Home;