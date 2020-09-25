import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback as TWF,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {addComment} from '../store/actions/posts'

class AddComment extends Component {
    state = {
        comment: '',
        editMode: false
    }

    handleAddComment = () => {
        this.props.onAddComment({
            postId: this.props.postId,
            comment:{
                nickname: this.props.name,
                user_id: this.props.user_id,
                comment: this.state.comment
            }
        })
        this.setState({comment:'', editMode: false})
    }
    
    render() {
        let commentArea = null
        if (this.state.editMode) {
            commentArea = (
                <View style={styles.container}>
                    <TextInput style={[styles.input, {color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}]} 
                        placeholder='Pode comentar...'
                        autoFocus={true}
                        value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })}
                        onSubmitEditing={this.handleAddComment} />
                    <TWF onPress={() => this.setState({ editMode: false })}>
                        <Icon name='times' size={20} color={this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'} />
                    </TWF>
                </View>
            )
        } 
        else {
            commentArea = (
                <TWF onPress={() => this.setState({ editMode: true })}>
                    <View style={styles.container}>
                        <Icon name='reply-all' size={25} color= {this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'} />
                        <Text style={[styles.caption, {color: this.props.escuro ? '#FFFFF0':'rgba(30, 30, 30, 0.8)'}]}>
                            Adicione um comentário...
                        </Text>
                    </View>
                </TWF>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {commentArea}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    caption: {
        marginLeft: 10,
        fontSize: 12,
    },
    input: {
        width: '80%',
    }
})

const mapStateToProps = ({user, modo})=>{
    return{
        name: user.name,
        user_id: user.user_id,
        escuro: modo.darkMode,
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onAddComment: payload=> dispatch(addComment(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
