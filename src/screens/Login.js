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
    const [password,setpassword] = useState('');
    const [mail,setmail] = useState('');
    const [error,seterror] = useState(null);


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
              {error?<Text style={styles.error}>{error}</Text>:null}
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
      if(mail.length>0&&password.length>0){
      auth()
      .signInWithEmailAndPassword(mail, password)
      .then(() => {seterror(null)})
      .catch(error => {
          auth().createUserWithEmailAndPassword(mail, password)
          .then(() =>{seterror(null)}).catch(error => {
            if (error.code === 'auth/invalid-email') {
              seterror('That email address is invalid!');
            }else seterror(error);
          })

      });
    }
    else{
      seterror('Invalid Email or Password');
    }
    }
    return (
      <View>
        {check()}
      </View>
    );
};


const styles = StyleSheet.create({
  error:{
    color:'red',
    fontSize:16,
    alignSelf:'center',
    margin:8
  }
});


export default Login;