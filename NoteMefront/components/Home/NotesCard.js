import { StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid, Alert, Modal } from 'react-native';
import { Feather, AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import EditNote from '../EditNote.js/EditNote';

const NotesCard = ({ data }) => {
    const navigation = useNavigation();
    const showToast = (e) => {
        ToastAndroid.show(e, ToastAndroid.SHORT);
    };
    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
        console.log(data)
        showToast('copied to clipboard')
    };


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardtitle}>
                    <View style={{ gap: 5 }}>
                        <Text style={styles.cardtitletext}>{data.title}</Text>
                        <Text>{data.content}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.editbox} onPress={() => navigation.navigate('EditNote', { data })}>
                            <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#65B741" />
                            <Text style={{ color: '#65B741' }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.edit}>
                    <Text style={styles.edittext}>Last edited 12pm</Text>
                    <TouchableOpacity style={styles.copybox} onPress={()=>copyToClipboard(data.content)}>
                        <Text style={{ color: 'grey' }}>copy</Text>
                        <Feather name="copy" size={13} color="grey" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderLeftWidth: 3,
        borderColor: '#5865f1'
    },
    cardtitle: {
        height: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    edit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    edittext: {
        color: 'grey',
        fontSize: 11,
    },
    cardtitletext: {
        fontSize: 19,
        color: '#5865f1',
    },
    editbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#65B741',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    copybox: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        paddingHorizontal: 13,
        paddingVertical: 5,
    }
});

export default NotesCard;
