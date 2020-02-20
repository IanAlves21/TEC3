import React, {Component} from 'react'
import {
    View,
    StyleSheet,
}from 'react-native'
import {
    Button,
    Text
} from "native-base";
import {Gravatar} from 'react-native-gravatar'
import {connect} from 'react-redux'
import {logout} from '../store/actions/user'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
class Profile extends Component{
    logout = () =>{
        this.props.onLogout()
        this.props.navigation.navigate('Auth')
    }

    render(){
        const options = {email: this.props.email, secure: true}
        return(
            <View style={[styles.container, {backgroundColor:  this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0'}]}>
                <Gravatar options={options} style={styles.avatar}/>
                <Text style={[styles.nickname, {color:  this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}]}>{this.props.name}</Text>
                <Text style={[styles.email, {color:  this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}]}>{this.props.email}</Text>
                <View style={{alignItems: 'center'}}>
                    <Text>             </Text>
                    <Text>             </Text>
                    <Text>             </Text>
                    <Text>             </Text>
                    <Text>             </Text>
                    <Text>             </Text>
                    <Button onPress={this.logout}
                        rounded success style={styles.button}
                        disabled={this.props.isLoading}>
                        <Icon name='logout' size={30} color={'white'}/>
                        <Text>Sair</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    avatar:{
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100,
    },
    nickname:{
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    email:{
        marginTop: 20,
        fontSize: 25,
    },
    button:{
        padding: 10,
    },
    buttonText:{
        fontSize: 20,
        color: '#FFFFF0'
    }
})

const mapStateToProps = ({user, modo})=>{
    return{
        email: user.email,
        name: user.name,
        isLoading: user.isLoading,
        escuro: modo.darkMode,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onLogout: ()=> dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)