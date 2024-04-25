import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome6, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Settingspage = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.headercontainer}>
                <TouchableOpacity style={styles.backbtn}
                    onPress={()=>navigation.goBack()}
                >
                    <FontAwesome6 name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={{fontSize:19,fontWeight:'bold'}}>Settings</Text>
            </View>
            <View style={styles.bodycontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.headerText}>App Settings</Text>
                    <View style={styles.accountsettings}>
                        <View style={styles.settingitem}>
                            <Text>About</Text>
                            <FontAwesome name="angle-right" size={24} color="grey" />
                        </View>
                        <View style={styles.settingitem}>
                            <Text>Privacy Policy</Text>
                            <FontAwesome name="angle-right" size={24} color="grey" />
                        </View>
                        <View style={styles.settingitem}>
                            <Text>Terms and conditions</Text>
                            <FontAwesome name="angle-right" size={24} color="grey" />
                        </View>
                        <View style={styles.settingitem}>
                            <Text>Send feedback</Text>
                            <FontAwesome name="angle-right" size={24} color="grey" />
                        </View>
                        <View style={styles.settingitem}>
                            <Text>Need Help?</Text>
                            <FontAwesome name="angle-right" size={24} color="grey" />
                        </View>
                    </View>
                    <Text style={styles.headerText}>Support Settings</Text>
                    <View style={styles.accountsettings}>
                        <View style={styles.settingitem}>
                            <Text>Support</Text>
                            <FontAwesome name="angle-right" size={24} color="grey" />
                        </View>
                        <View style={styles.settingitem}>
                            <Text>Acknowlegdements</Text>
                            <FontAwesome name="angle-right" size={24} color="grey" />
                        </View>
                    </View>
                    <View style={styles.Logoutcontainer}>
                        <View style={styles.logoutsetting}>
                            <AntDesign name="logout" size={24} color="red" />
                            <Text style={styles.logouttext}>Log out</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Settingspage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headercontainer: {
        flexDirection:'row',
        height: '10%',
        width:'60%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backbtn: {
        marginHorizontal: 20,
    },
    headerText: {
        fontSize: 15,
        padding: 10,
    },
    bodycontainer: {
        height: '90%',
        backgroundColor: '#f2f3f5',
        padding: 10,
    },
    accountsettings: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginVertical: 20,
    },
    settingitem: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Logoutcontainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginVertical: 10,
    },
    logoutsetting: {
        padding: 10,
        flexDirection: 'row',
        gap: 26,
        alignItems: 'center'
    },
    logouttext: {
        color: 'red'
    }
})