import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUser} from '../store/actions/user'
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
}from 'react-native'
import {
    Container,
    Button,
    Item,
    Label,
    Input,
} from "native-base";
import Icone from 'react-native-vector-icons/Entypo'
import Icone2 from 'react-native-vector-icons/MaterialCommunityIcons'

class Register extends Component{
    state={
        name: '',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps =>{
        if(prevProps.isLoading && !this.props.isLoading){
            this.setState({
                name: '',
                email: '',
                password: ''
            })
            this.props.navigation.navigate('Profile')
        }
    }

    render(){
        return(
            <ScrollView>
                <Container style={[styles.container, {backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)':'#FFFFF0'}]}>
                    <Item floatingLabel style={{marginTop: 5}}>
                        <Label style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)', fontWeight: 'bold'}}>    {<Icone2 name='rename-box' size={20} color={this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}/>}  Nome</Label>
                        <Input style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}}
                            autoFocus={true}  value={this.state.name} 
                            onChangeText={name=>this.setState({name})}/>
                    </Item>
                    <Item floatingLabel style={{marginTop: 5}}>
                        <Label style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)', fontWeight: 'bold'}}>    {<Icone name='user' size={20} color={this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}/>}  E-mail</Label>
                        <Input style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}} keyboardType='email-address' 
                            value={this.state.email} onChangeText={email=>this.setState({email})}/>
                    </Item>
                    <Item floatingLabel last style={{marginTop: 5}}>
                        <Label style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)', fontWeight: 'bold'}}>{<Icone name='lock' size={20} color={this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}/>}  Senha</Label>
                        <Input style={{color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}} secureTextEntry value={this.state.password}
                            onChangeText={senha=>this.setState({password: senha})}/>
                    </Item>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Button onPress={() => {this.props.onCreateUser(this.state)}} style={{padding: 25}}
                            rounded success 
                            disabled={this.props.isLoading} >
                            <Icone name='save' size={30} color={'white'}/>
                            <Text style={{color: 'white'}}>  Salvar</Text>
                        </Button>
                    </View>
                </Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingHorizontal: 20,
        marginLeft: 15,
    },
    buttonText:{
        fontSize: 20,
        color: '#FFF',
    },
    input:{
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15,
    }
})

const mapStateToProps =({user, modo})=>{
    return{
        isLoading: user.isLoading,
        escuro: modo.darkMode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)