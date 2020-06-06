import * as React from 'react'
import 'react-native-gesture-handler';
import AppNavigation from './Route/AppNavigation'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Store/reducers/root';


const store = createStore(rootReducer)
export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
      <AppNavigation />
      </Provider>
    );
  }
}