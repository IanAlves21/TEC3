import React from 'react'
import {Provider} from 'react-redux'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigator from './src/Navigator'
import storeConfig from './src/store/storeConfig'
import axios from 'axios'

// import App from './App';
// import Feed from './src/screens/Feed'

axios.defaults.baseURL = 'https://codeshare-aecd6.firebaseio.com/'

const store = storeConfig()
const Redux = ()=>(
    <Provider store={store}>
        <Navigator/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
