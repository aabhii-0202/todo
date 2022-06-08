
import React, {useState} from 'react';
import {View, Text,StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const TodoForm = () => {

    const [title,setTitle] = useState();
    const [body,setbody] = useState();
     return (
        <View>
            <Card>
              <CardSection>
              <LoginForm
                label='Title'
                value={title}
                onChangeText={(text)=>{setTitle(text)}} 
                placeholder="Title" 
                secureTextEntry={false}
              />
              </CardSection>
              <CardSection>
              <LoginForm
                label='Body'
                value={body}
                onChangeText={(text)=>{setbody(text)}} 
                placeholder="Body" 
                secureTextEntry={false}
                />
              </CardSection>
              <Button
                onPress={()=>{}}
              >Update</Button> 
              
              
            </Card>

        </View>
    );
};


const styles = StyleSheet.create({

});


export default TodoForm;