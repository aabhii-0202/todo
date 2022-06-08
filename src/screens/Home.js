import React,{useState,useEffect} from 'react';
import {StyleSheet, ScrollView, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import TodoList from './components/TodoList';
import Button from './components/Button';


const Home = ({navigation,route}) => {

    const {user} = route.params;
    const [todoList,setTodoList]= useState([]);
    const ref = firestore().collection(`Todo/${user.email} ${user.uid}/List`);

    

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

    const deletetodo = (id) => {
        const ref = firestore().collection(`Todo/${user.email} ${user.uid}/List`).doc(`${id}`);
        ref.delete();
    }
    
     return (
        <ScrollView style={styles.parent}>
            <Button
                 onPress={()=>{
                    navigation.navigate('AddNew',{user:user});
                }}>Add New</Button>
            <FlatList
                data={todoList}
                renderItem={({item})=>{
                    // console.log(item);
                    return(
                        <TodoList
                            keyExtractor={(item) => item.id}
                            todo={item}
                            click={()=>navigation.navigate('EditTodo',{todo:item,user:user})}
                            del={()=>{deletetodo(item.id)}}
                        />
                    );
                }}
                />
                <Button
                onPress={()=>{
                logout();
            }}>Log Out</Button>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    parent:{
        borderColor: 'green',
        borderWidth:1,
        borderRadius:8,
        margin:16
    }
});


export default Home;