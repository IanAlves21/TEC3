import React from 'react'
import { 
    createBottomTabNavigator, 
    createSwitchNavigator, 
    createStackNavigator, 
} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Feed from './screens/Feed'
import AddCode from './screens/AddCode';
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'
import Menu from './components/Menu'

const authRouter = createStackNavigator({
    Login: {screen: Login, navigationOptions: {title: 'Login' }},
    Register: {screen: Register, navigationOptions:{title:'Registrar'}}
},{
    initialRouteName: 'Login',
    stackOptions:{
        style: {
            backgroundColor: 'grey',
        },
    }
})

const loginOrProfileRoute = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
},{initialRouteName: 'Auth',})

const MenuRoutes = {
    Feed:{
        name: 'Questoes',
        screen: Feed,
        navigationOptions:{
            title: 'Questões',
            tabBarIcon:({tintColor})=><Icon name='book' size={30} color={tintColor}/>
        },
    },
    Add:{
        name: 'AddQuest',
        screen: AddCode,
        navigationOptions:{
            title: 'Adicionar Questão',
            tabBarIcon: ({tintColor})=><Icon name='upload' size={30} color={tintColor}/>
        }
    },
    Profile:{
        name: 'Profile',
        screen: loginOrProfileRoute,
        navigationOptions:{
            title: 'Perfil',
            tabBarIcon: ({tintColor})=><Icon name='user' size={30} color={tintColor}/>
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Feed',
    contentComponent: Menu,
    tabBarOptions:{
        showLabel: true,
        activeTintColor: '#00FF7F',
        inactiveTintColor: '#FFFFF0',
        labelStyle: {
            fontSize: 15,
        },
        style: {
            backgroundColor: 'rgba(1, 1, 1, 0.8)',
        },
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)

export default MenuNavigator