import React, { useState, useEffect } from 'react';
import {View, Text,StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import Card from './components/Card';
import CardSection from './components/CardSection';
import { CommonActions } from '@react-navigation/native';

const Login = ({navigation}) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [password,setpassword] = useState('password');
    const [mail,setmail] = useState('test1@test.com');


    const check = () =>{
        // Handle user state changes
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
      }, []);

      if (initializing) return null;

      if (!user) {
          return (
            <Card>
              <CardSection>
              <LoginForm
                label='Email'
                value={mail}
                onChangeText={(text)=>{setmail(text)}} 
                placeholder="abc@xyz.com" 
                secureTextEntry={false}
              />
              </CardSection>
              <CardSection>
              <LoginForm
                label='Password'
                value={password}
                onChangeText={(text)=>{setpassword(text)}} 
                placeholder="password" 
                secureTextEntry={true}
              />
              </CardSection>
              <Button
                onPress={()=>{signin()}}
              >LogIn</Button> 
            </Card>
          );
      }
      return (
          
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Home',params:{user:user} }
              ],
            })
          )
      );
    }

    const signin = () => {
      auth()
      .signInWithEmailAndPassword(mail, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
          auth().createUserWithEmailAndPassword(mail, password)
          .then(() =>{
            console.log('User account  signed in!');
          }).catch(error => {
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
          })
        

        

        console.error(error);
      });
    }

    const signout = () => {
      auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    }
    return (
      <View>
        {check()}
      </View>
    );
};


const styles = StyleSheet.create({

});


export default Login;