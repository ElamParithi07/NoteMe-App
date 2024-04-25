import { Linking, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather,EvilIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';

const SheetCard = ({ data }) => {

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
        console.log(data)
        showToast('copied to clipboard')
    };
    const showToast = (e) => {
        ToastAndroid.show(e, ToastAndroid.SHORT);
    };
    return (
        <View style={styles.sheetcard}>
            <View style={styles.sheetnamecontainer}>
                <Text style={{ color: '#ffff' }}>{data.SheetName}</Text>
            </View>
            <View style={styles.sheetlabelcontainer}>
                <Text>{data.SheetUrl}</Text>
            </View>
            <View style={styles.sheetlinkcontainer}>
                <View style={styles.sheetlinkinner}>
                    <TouchableOpacity onPress={()=>{
                        Linking.openURL(data.SheetUrl);
                    }}>
                    <Text style={styles.sheeturlstyle}>{data.SheetUrl} <EvilIcons name="external-link" size={15} color="black" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.copybox} onPress={() => copyToClipboard(data.SheetUrl)}>
                        <Text style={{ color: 'grey' }}>copy</Text>
                        <Feather name="copy" size={13} color="grey" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.edittext}>Last edited at 5pm</Text>
            </View>
        </View>
    )
}

export default SheetCard

const styles = StyleSheet.create({
    sheetcard: {
        width: '100%',
        height: 150,
        backgroundColor: '#ffff',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#D9D9D9',
    },
    sheetnamecontainer: {
        height: '20%',
        backgroundColor: '#5865f1',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    sheetlinkcontainer: {
        height: '45%',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
    },
    sheetlinkinner:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    sheetlabelcontainer: {
        height: '35%',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    edittext: {
        color: 'grey',
        fontSize: 12,
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
    },
    sheeturlstyle:{
        color:'blue'
    }
})