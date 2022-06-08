import React from 'react';
import {View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';


const TodoList = ({todo,click}) => {
    const {title,body,time,checked} = todo;
    const data = [{label: ''}];
    console.log(title);
     return (
        <View style={{
            flexDirection:'row',
        }}>
        <TouchableOpacity 
        style={styles.container}
        onPress={click}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.date}>{time}</Text>
        </TouchableOpacity>
        <RadioButtonRN
            style={{
                alignSelf:'center',
                marginBottom:10
            }}
            data={data}
            selectedBtn={(e) => console.log(e)}
            box={false}
            circleSize={12}
        />
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignSelf:'stretch',
        padding:16,
        marginHorizontal:16,
        width:'80%',
        justifyContent:'space-between'

    },
    image:{
        height:20,
        width:20,
        alignSelf:'center',
        margin:8
    },
    text:{
        color:'black',
        fontSize:16,
        alignSelf:'flex-start',
        marginLeft:16
    },
    date:{
        color:'black',
        fontSize:16,
        alignSelf:'flex-end',
        marginLeft:16
    }
});


export default TodoList;