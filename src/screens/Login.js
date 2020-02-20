import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../store/actions/user'
import {
    View, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView,
}from 'react-native'
import {
    Container,
    Button,
    Item,
    Label,
    Input,
    Text
  } from "native-base";
import Icone from 'react-native-vector-icons/Entypo'

class Login extends Component{
    state={
        name: 'Temporario',
        email: '',
        password: '',
    }

    componentDidUpdate = prevProps =>{
        if(prevProps.isLoading && !this.props.isLoading){
            this.props.navigation.navigate('Profile')
        }
    }

    login = ()=>{
        this.props.onLogin({...this.state})
    }

    render(){
        return(
            <ScrollView>
                <Container style={[styles.container, {backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)':'#FFFFF0'}]}>
                    <Item floatingLabel style={{marginTop: 5}}>
                        <Label style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)', fontWeight: 'bold'}}>    {<Icone name='user' size={20} color={this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}/>}  E-mail</Label>
                        <Input style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}} keyboardType='email-address' 
                            autoFocus={true}  value={this.state.email} 
                            onChangeText={email=>this.setState({email})}/>
                    </Item>
                    <Text>          </Text>
                    <Item floatingLabel last style={{marginTop: 5}}>
                        <Label style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)', fontWeight: 'bold'}}>{<Icone name='lock' size={20} color={this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}/>}  Senha</Label>
                        <Input style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}} secureTextEntry value={this.state.password}
                            onChangeText={senha=>this.setState({password: senha})}/>
                    </Item>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Button onPress={this.login}
                            rounded success style={styles.button}
                            disabled={this.props.isLoading}>
                            <Icone name='login' size={30} color={'white'}/>
                            <Text>Login</Text>
                        </Button>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}}>
                            <Text>                 </Text>
                            <Text style={[styles.buttonText,{color:  this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}]}><Icone name='add-user' size={30} color={ this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}/> Criar nova conta</Text>
                        </TouchableOpacity>

                    </View>
                </Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container2: {
		marginTop: 45
    },
    container:{
		flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
		paddingHorizontal: 20,
		marginLeft: 15,
    },
    buttonText:{
        fontSize: 20,
    },
    input:{
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
    }
})

const mapStateToProps =({user,modo})=>{
    return{
        isLoading: user.isLoading,
        escuro: modo.darkMode,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onLogin: user=> dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)