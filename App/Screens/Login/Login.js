import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import family from '../../../assets/family.jpg'
import LoginStyle from './Style'


export default function Login() {
    return (
        <View style={LoginStyle.container} >
            <Text style={LoginStyle.title}>Notre Calendrier</Text>
            <Image source={family} style={LoginStyle.family} />
            <TouchableOpacity style={LoginStyle.button}
                onPress={() => console.log("yoo")}>
                <Text style={LoginStyle.buttonContainer}>Login With Google</Text>
            </TouchableOpacity>
        </View >
    )
}