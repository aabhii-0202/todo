import React from 'react';
import {View, Text,StyleSheet , TextInput} from 'react-native';


const LoginForm = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {


     return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
      },
      labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        color:'black',
        fontWeight:'600'
      },
      containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:16
      }
});


export default LoginForm;