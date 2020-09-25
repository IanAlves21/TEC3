import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    Platform,
    Alert
} from 'react-native'
import {
    Text,
    Button,
    Root
} from "native-base";
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

const noUser = 'voce precisa se logar para postar imagens'

class AddCode extends Component {
    state = {
        url_imagem: null,
        comment: '',
    }

    componentDidUpdate = prevProps => {
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                url_imagem: null,
                comment: '',
            })
            this.props.navigation.navigate('Feed')
        }
    }

    pickImage = () => {
        if (!this.props.name) {
            Alert.alert('Falha', noUser)
            return
        }
        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800,
        }, res => {
            if (!res.didCancel) {
                console.log("----------------------------------")
                console.log(res)
                console.log("----------------------------------")
                this.setState({ url_imagem: res
                    // { 
                    //     fileName: res.fileName,
                    //     path: res.path,
                    //     type: res.type,
                    //     data: res.data,
                    //     uri: res.uri,
                    // } 
                })
            }
        })
    }

    save = async () => {
        if (!this.props.name) {
            Alert.alert('Falha!', noUser)
            return
        }
        // console.log("propriedadessssssssssss ->> ", this.props)
        this.props.onAddPost({
            // id: Math.random(),
            usuario: this.props.user_id,
            // nickname: this.props.name,
            // email: this.props.email,


            url_imagem: this.state.url_imagem,


            enunciado: this.state.comment,
            titulo: "Nova dúvida"

            // comments: [
            //     {
            //         nickname: this.props.name,
            //         comment: this.state.comment
            //     }
            // ]
        })
    }
    render() {
        return (
            <View style={{ flex: 2 }}>
                <View style={[styles.container, { backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0' }]}>
                    <Text style={[styles.title, { color: this.props.escuro ? '#FFFFF0' : 'rgba(30, 30, 30, 0.8)' }]}>Compartilhe sua solução</Text>
                    <View style={[styles.imageContainer, { backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0' }]}>
                        <Image source={this.state.url_imagem} style={[styles.image]} />
                    </View>
                    <TextInput placeholder='Algum comentario para o codigo?'
                        style={[styles.input, { color: this.props.escuro ? '#FFFFF0' : 'rgba(30, 30, 30, 0.8)' }]} value={this.state.comment}
                        editable={this.props.name != null}
                        onChangeText={comment => this.setState({ comment })} />
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            rounded
                            success
                            disabled={this.props.loading}
                            onPress={this.pickImage}>
                            <Icon2 name='google-photos' size={30} color={'#FFFFF0'} />
                            <Text>Escolher imagem</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0' }}>
                    <Text>                             </Text>
                    <Root>
                        <Button
                            style={[this.props.loading ? styles.buttonDisabled : null]}
                            rounded
                            success
                            disabled={this.props.loading}
                            onPress={this.save}>
                            <Icon name='share-google' size={30} color={'#FFFFF0'} />
                            <Text>Postar</Text>
                        </Button>
                    </Root>
                </View>
                <View style={{ backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0' }}>
                    <Text>      </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width,
        marginTop: 10,
    },
    image: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').width),
        resizeMode: 'contain',
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#228B22',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
    },
    input: {
        marginTop: 10,
        width: '90%',
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    }
})

const mapStateToProps = ({ user, posts, modo }) => {
    return {
        email: user.email,
        name: user.name,
        user_id: user.user_id,
        loading: posts.isUploading,
        escuro: modo.darkMode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCode)