import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons,Feather } from '@expo/vector-icons';
import NotesCard from './NotesCard';
import { useNavigation } from '@react-navigation/native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Home = () => {
    const navigation = useNavigation();
    const data = [
        {
            id: 1,
            title: 'Name with Initial',
            content: 'Elamparithi S',
        },
        {
            id: 2,
            title: 'Roll No',
            content: '21IT011',
        },
        {
            id: 3,
            title: 'Reg No',
            content: '722821205011',
        },
        {
            id: 4,
            title: 'Department',
            content: 'Information Technology',
        },
        {
            id: 5,
            title: 'Domain',
            content: 'Full Stack Development',
        },
        {
            id: 6,
            title: 'Gender',
            content: 'Male',
        },
        {
            id: 7,
            title: 'Resume Link',
            content: 'https://resumelink.com',
        },
    ]
    const renderItem = ({ item }) => (
        <View style={{ padding: 10 }}>
            <NotesCard data={item}/>
        </View>
    );

    

    return (
        <View style={styles.container}>
            <View style={styles.headercontainer}>
                <View style={styles.searchbar}>
                    <TextInput
                        placeholder=' Search your details here...'
                        style={styles.searchbarinput}
                    />
                    <Feather name="search" size={24} color="#5865f1" />
                </View>
            </View>
            <View style={styles.notescontainer}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headercontainer: {
        height: (height * 10) / 100,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 20,
        backgroundColor:'#5865f1',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    searchbar:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'white',
        padding:10,
        borderWidth:0.5,
        borderColor:'#D9D9D9',
        borderRadius:10,
    },
    searchbarinput:{
        width:'90%'
    },
    profilecontainer: {
    },
    headertext: {
        fontSize: 20,
    },
    notescontainer: {
        flex: 1,
        backgroundColor:'#F2F3FF'
    }
})