import React,{useState, useEffect } from 'react';
import {View, Text,StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import moment from 'moment';
import Multiline from './components/Multiline';


const AddNew = ({navigation,route}) => {

    const [title,setitle] = useState('');
    const [body,setbody] = useState('');
    const {user} = route.params;
    const ref = firestore().collection(`Todo/${user.email} ${user.uid}/List`);

    const addnew = async () => {

        await ref.add({
            title,
            body,
            date:moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'),
            checked:false
        })
        .then(()=>{
            
            navigation.pop();
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


export default AddNew;