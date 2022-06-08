import React,{useState, useEffect } from 'react';
import {View, Text,StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import moment from 'moment';
import Multiline from './components/Multiline';


const EditTodo = ({navigation,route}) => {

    const {todo,user} = route.params;
    const [title,setitle] = useState(todo.title);
    const [body,setbody] = useState(todo.body);
    const ref = firestore().collection(`Todo/${user.email} ${user.uid}/List`).doc(`${todo.id}`);

    const addnew = async () => {

        await ref.update({
            title,
            body,
            date:moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'),
            checked:false
        })
        .then(()=>{

        })
        .catch((err)=>{console.log(err)})    
    }

    return (
        <Card>
            <CardSection>
                <LoginForm
                    label='Title' 
                    value={title} 
                    onChangeText={(text)=>{setitle(text)}}
                    placeholder='Title' 
                    secureTextEntry={false}
                    />
            </CardSection>
            <CardSection>
                <Multiline
                    label='Body' 
                    value={body} 
                    onChangeText={(text)=>{setbody(text)}}
                    placeholder='Body' 
                    secureTextEntry={false}
                    />
            </CardSection>
            <View>
                <Button
                onPress={()=>{addnew()}}
                >
                    Save
                </Button>

            </View>
        </Card>
    );
};


const styles = StyleSheet.create({

});


export default EditTodo;