import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
}from 'react-native'
import {connect} from 'react-redux'

class Comments extends Component{
    render(){
        let view = null
        if(this.props.comments){
            view = this.props.comments.map((item, index)=>{
                return(
                    <View key={index} style={styles.commentContainer}>
                        <Text style={[styles.nickname, {color: this.props.escuro ? '#FFFFF0' : 'rgba(30, 30, 30, 0.8)'}]}>{item.nickname}: </Text>
                        <Text style={[styles.comment, {color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}]}>{item.comment}</Text>
                    </View>
                )
            })
        }
        return(
            <View style={styles.container}>
                {view}
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container:{
        flex: 1,
        margin: 5,
        marginTop: 5,
	},
	commentContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 3,
    },
	nickname:{
        fontWeight: 'bold',
        fontSize: 15,
        flexWrap: 'wrap',
	},
	comment:{
        fontSize: 12,      
        width: '70%'  ,
        flexWrap: 'wrap',
	}
})


const mapStateToProps = ({modo})=>{
    return{
        escuro: modo.darkMode,
    }
}

export default connect(mapStateToProps,null)(Comments)