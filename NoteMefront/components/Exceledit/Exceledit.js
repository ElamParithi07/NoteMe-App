import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons, AntDesign, Foundation, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native'


const names = [
    { id: 1, name: 'Abilash R' },
    { id: 2, name: 'Akash Unnikrishnan' },
    { id: 3, name: 'Akshyaram' },
    { id: 4, name: 'Arthi' },
    { id: 5, name: 'Balashanmugi' },
  ];
  const labels = [
    { id: 1, name: 'Name' },
    { id: 2, name: 'Reg no' },
    { id: 3, name: 'Roll no' },
    { id: 4, name: 'Department' },
    { id: 5, name: 'Phonenumber' },
  ];
  
const Exceledit = () => {
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState('');
    const [check, setcheck] = useState(false);
    const [iscreate, setcreate] = useState(true);

    const handleOptionSelection = (option) => {
        setSelectedOption(prevOption => prevOption === option ? '' : option);
    };
    return (
        <View style={styles.container}>
            <View style={styles.headercontainer}>
                <Text style={styles.headertext}>Create.Share.Update{"\n"}<Text style={{ color: '#5865f1' }}>Repeat.</Text></Text>
            </View>
            <View style={styles.bodycontainer}>
                <View style={styles.togglecontainer}>
                    <View>
                        <TouchableOpacity style={styles.createbtn} onPress={() => setcreate(true)}>
                            <MaterialCommunityIcons name="microsoft-excel" size={18} color="#5865f1" />
                            <Text>Create sheet</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.createbtn} onPress={() => setcreate(false)}>
                            <MaterialCommunityIcons name="microsoft-excel" size={18} color="#5865f1" />
                            <Text>Update sheet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {iscreate ?
                        <View style={styles.createsheetcontainer}>
                            <View>
                                <Text>Name of the Sheet</Text>
                                <TextInput
                                    placeholder='Enter Sheet Name'
                                    style={styles.input}
                                />
                            </View>
                            <View>
                                <Text>Labels</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Multiselect",{data:labels})}>
                                    <Text style={styles.input}>Select labels</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                                <TouchableOpacity style={styles.checkbox} onPress={() => setcheck(!check)}>
                                    {check && <MaterialIcons name="check" size={20} color="black" />}
                                </TouchableOpacity>
                                <Text>fill all names by default  (or)</Text>
                                <TouchableOpacity style={{ borderWidth: 0.5, padding: 5, borderColor: '#D9D9D9', borderRadius: 5 }} onPress={() => navigation.navigate("Multiselect",{data:names})}>
                                    <Text style={{ color: 'grey' }}>Select names</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.createbutton}>
                                <AntDesign name="paperclip" size={19} color="white" />
                                <Text style={styles.createbtnText}>Create Spreadsheet</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.updatesheetcontainer}>
                            <View>
                                <Text>Sheet Link</Text>
                                <TextInput
                                    placeholder='Paste your spreadsheet link'
                                    style={styles.input}
                                />
                            </View>
                            <View>
                                <Text>Reference data</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <TouchableOpacity onPress={() => handleOptionSelection('Name')}>
                                        <Text style={[styles.input, selectedOption === 'Name' && styles.selected]}> Name </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionSelection('Reg No.')}>
                                        <Text style={[styles.input, selectedOption === 'Reg No.' && styles.selected]}>Reg No.</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionSelection('Roll No.')}>
                                        <Text style={[styles.input, selectedOption === 'Roll No.' && styles.selected]}>Roll No.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Text>Values</Text>
                                <TouchableOpacity>
                                    <Text style={styles.input}>Select Values</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.updatebutton}>
                                <Foundation name="page-filled" size={16} color="white" />
                                <Text style={styles.updatebtntext}>Fill the sheet</Text>
                            </TouchableOpacity>
                        </View>}
                </ScrollView>
            </View>
        </View>
    )
}

export default Exceledit

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headercontainer: {
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    headertext: {
        fontSize: 25,
        textAlign: 'center'
    },
    bodycontainer: {
        flex: 1,
        height: '85%',
    },
    togglecontainer: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    createbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#f2f3f5',
        backgroundColor: 'white'
    },
    createsheetcontainer: {
        flex: 1,
        margin: 10,
        padding: 20,
        gap: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    createbutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#5865f1',
        borderRadius: 5,
        alignItems: 'center',
        gap: 5,
        marginVertical: 10,
    },
    createbtnText: {
        color: 'white'
    },
    updatesheetcontainer: {
        flex: 1,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    updatebutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#5865f1',
        borderRadius: 5,
        alignItems: 'center',
        gap: 9,
        marginVertical: 10,
    },
    updatebtntext: {
        color: 'white'
    },
    input: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#D9D9D9',
        marginVertical: 8,
        color: 'grey'
    },
    selected: {
        backgroundColor: '#ECEEFF',
        borderColor:'#5865f1'
    },
    checkbox: {
        height: 20,
        width: 20,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 5
    }
})