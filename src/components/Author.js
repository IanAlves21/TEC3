import React,{Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
}from 'react-native'
import {Gravatar} from 'react-native-gravatar'
import {connect} from 'react-redux'

class Author extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Gravatar options={{email: this.props.email, secure: true}} style={styles.avatar}/>
                <Text style={[styles.nickname, {color:  this.props.escuro ? '#FFFFF0' : 'rgba(30, 30, 30, 0.8)'}]}>{this.props.nickname}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container:{
        alignItems: 'center',
        flexDirection: 'row',
	},
	avatar:{
		width: 30,
		height: 30,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    nickname:{
        color: '#FFFFF0',
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
    }
})

const mapStateToProps = ({modo})=>{
    return{
        escuro: modo.darkMode,
    }
}

export default connect(mapStateToProps,null)(Author)