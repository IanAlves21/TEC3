import React, { Component } from 'react'
import { 
    StyleSheet, 
    FlatList, 
    View,
    ImageBackground,
} from 'react-native'
import {
    Container,
    Content,
  } from "native-base";
import Header from '../components/Header'
import Post from '../components/Post'
import img from '../../assets/imgs/login.jpg'
import {connect} from 'react-redux'
import {fetchPosts} from '../store/actions/posts'

class Feed extends Component {
    componentDidMount = ()=>{
        this.props.onFetchPosts()
    }

    componentDidUpdate=()=>{
        this.props.onFetchPosts()
    }

    render() {
        return (
            <Container >
                <Header {...this.props}/>
                <Content>
                    <ImageBackground source={img} style={styles.background}>
                    <View style={styles.formContainer}>
                        <FlatList data={this.props.posts} keyExtractor={item=>`${item.id}`}
                            renderItem={({item})=><Post key={item.id} {...item}/>}/>
                    </View>
                    </ImageBackground>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    background:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    formContainer:{
        flex: 1,
		backgroundColor:'rgba(52, 52, 52, 0.8)',
		width: '100%',
	},
})

const mapStateToProps = ({posts, modo})=>{
    return{
        posts: posts.posts,
		escuro: modo.darkMode,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onFetchPosts: ()=> dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)