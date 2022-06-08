import React from 'react';
import {View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';


const TodoList = ({todo,click,del}) => {
    const {title,body,date} = todo;
     return (
        <View style={{
            flexDirection:'row',
            marginHorizontal:16,
            backgroundColor:'white',
            borderRadius:8,
            marginVertical:4
        }}>
        <TouchableOpacity 
        style={styles.container}
        onPress={click}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.imgcont}
        onPress={del}
        >
            <Image
                style={styles.image}
                source={require('../../../assets/delete.png')}
                />
        </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        alignSelf:'stretch',
        padding:8,
        flex:5
    },
    image:{
        height:20,
        width:20,
        alignSelf:'center',
        margin:8
    },
    text:{
        color:'black',
        fontSize:24,
        alignSelf:'flex-start',
        marginLeft:16
    },
    date:{
        color:'black',
        fontSize:12,
        alignSelf:'flex-start',
        marginLeft:16,
        marginTop:8
    },
    image:{
        height:30,
        width:30,
    },
    imgcont:{
        alignSelf:'center',
        flex:1
    }
});


export default TodoList;