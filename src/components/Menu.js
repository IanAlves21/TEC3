import React from 'react'
import {
    ScrollView,
    Image, 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native'
import {DrawerItems} from 'react-navigation'
import icon from '../../assets/imgs/iconCode.png'

export default props =>{
    return(
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.rr}>
                    <Text style={styles.title}>CodeShare</Text>
                    <Image style={styles.image} source={icon} />
                </View>
            </View>
            <DrawerItems {...props}/>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    rr:{
        flexDirection: 'row',
    },
    image:{
		marginTop: 26,
		height: 40,
		width: 40,
		resizeMode: 'contain',
	},
    header:{
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    title:{
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 40,
        paddingTop: 20,
        padding: 10,
        fontWeight: 'bold',
       
    },
    avatar:{
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#AAA',
        borderRadius: 30,
        margin: 10,
    },
    name:{
        fontSize: 30,
        marginLeft: 10,
    },
    email:{
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
    menu:{
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    userInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoutIcon:{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    }
})