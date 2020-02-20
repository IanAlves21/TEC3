import React, {Component} from 'react'
import {
	StyleSheet,
    View,
    Platform,
	Image,
	TouchableOpacity,
	StatusBar
}from 'react-native'
import {
	Header,
	Title,
	Body,
	Text
  } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5'
import icon from '../../assets/imgs/iconCode.png'
import {Gravatar} from 'react-native-gravatar'
import {connect} from 'react-redux'
import {troca} from '../store/actions/dark'

class Headeer extends Component{
	state={
        darkMode: true,
	}
	
	mudar = ()=>{
		this.setState({darkMode: !this.state.darkMode})
		this.props.claro(this.state.darkMode)
	}
	
	render(){
		StatusBar.setHidden(true)
		const name = this.props.name || 'Anônimo'
		const gravatar = this.props.email ? <Gravatar options={{email: this.props.email, secure: true}} style={styles.avatar}/>:null
		return(
			<Header
				style={{ backgroundColor: this.props.escuro ? "rgba(1, 1, 1, 0.8)" : '#F5F5F5'}}
				androidStatusBarColor= {this.props.escuro ? "rgba(1, 1, 1, 0.8)" : '#FFFFF0'}
				iosBarStyle="light-content">
				<Body style={{flexDirection: 'row'}}>
					<TouchableOpacity onPress={()=>this.mudar()}>
						<Icon name='exchange-alt' size={35} color={this.props.escuro ?  '#FFFFF0': "rgba(1, 1, 1, 0.8)"}/>
					</TouchableOpacity>
					<Text>         </Text>
					<Image style={styles.image} source={icon} />
					<Title style={{ color: this.props.escuro ? '#FFFFF0': "rgba(1, 1, 1, 0.8)", height: 40, fontSize: 25,fontWeight: 'bold'}}> CodeShare</Title>
					<Text>         </Text>
					<View style={styles.userContainer}>
						<Text style={{fontSize: 12, color: this.props.escuro ?  '#FFFFF0': "rgba(1, 1, 1, 0.8)",}}>{name}</Text>
						{gravatar}
					</View>
				</Body>
			</Header>
		)
	}
}

const styles = StyleSheet.create({
	container2: {
		backgroundColor: "#FFF",
		flex: 1
	},
	mb10: {
		marginBottom: 10
	},
	iconBar:{
        marginTop: Platform.OS === 'ios' ? 30 : 52,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
	container:{
		marginTop: Platform.OS === 'ios' ? 20 : -40,
		borderBottomWidth: 2,
		borderColor: '#BBB',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowContainer:{
		flexDirection: 'row',
	},
	image:{
		height: 35,
		width: 35,
		resizeMode: 'contain',
	},
	userContainer:{
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar:{
		width: 30,
		height: 30,
		marginLeft: 10,
	}
})

const mapStateToProps = ({user, modo})=>{
	return{
		email: user.email,
		name: user.name,
		escuro: modo.darkMode,
	}
}

const mapDispatchToProps = dispatch=>{
    return{
		claro: (change)=> dispatch(troca(change)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headeer)
