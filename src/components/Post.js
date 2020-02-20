import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Modal,
}from 'react-native'
import {
    Card,
    CardItem,
    Left,
    Body,
} from "native-base";
import ImageView from 'react-native-image-zoom-viewer'
import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'
import {connect} from 'react-redux'

const {width} = Dimensions.get('window');

class Post extends Component{
  	constructor(props) {
		super(props);

		this.state = {
			imageIndex: 0,
			isImageViewVisible: false,
		};
	}
    render(){
		const addComment = this.props.name ? <AddComment postId={this.props.id}/> : null
		const {isImageViewVisible, imageIndex} = this.state
        return(
            <View>
                <Card >
                    <CardItem style={{borderRadius: 10, backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0'}}>
                        <Left>
                            <Body>
                                <Author email={this.props.email} nickname={this.props.nickname}/>
                                <Text style={{color: this.props.escuro ? '#FFFFF0': "rgba(1, 1, 1, 0.8)"}} note>{this.props.email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody style={{borderRadius: 10, backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0'}}>
                        <View style={{marginLeft: 0}}>
                            <TouchableWithoutFeedback key={'oi'}
                                onPress={() => {
                                    this.setState({
                                        imageIndex: 0,
                                        isImageViewVisible: true,
                                    })}}>
                                <Image
                                    style={{width, height: 400}}
                                    source={{uri: this.props.image}}
                                    resizeMode="contain"/>
                            </TouchableWithoutFeedback>
                            <Modal visible={isImageViewVisible} transparent={true}>
                                <ImageView
                                    onDoubleClick={() => this.setState({isImageViewVisible: false})}
                                    imageUrls={[{
                                        props:{
                                            source:{uri: this.props.image},
                                        },
                                        width: width,
                                        height: ((width*16)/9),
                                    },]}
                                />
                            </Modal>
                        </View>
                    </CardItem>
                    <CardItem style={{ borderRadius: 10, paddingVertical: 0 , backgroundColor: this.props.escuro ? 'rgba(30, 30, 30, 0.8)' : '#FFFFF0'}}>
                    <Left>
                        <View style={{margintop:10, flexWrap: 'wrap'}}>
                            <Comments comments={this.props.comments}/>
                            {addComment}
                        </View>
                    </Left>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container:{
        flex: 1,
	},
	image:{
        paddingHorizontal: -100,
        resizeMode: 'contain',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width *1.2 ,
	},
})

const mapStateToProps = ({user, modo})=>{
    return{
        name: user.name,
        escuro: modo.darkMode,
    }
}

export default connect(mapStateToProps,null)(Post)