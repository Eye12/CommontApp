/*
 * @Author: lle_wang
 * @Date:   2018-05-13 14:29:36
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:54:33
 */
import 'normalize-compass/normalize';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';
import {
	createStore
} from 'redux';
import App from './app';
import rootReducers from 'reducers/index';
let store = createStore(rootReducers);
ReactDOM.render(<Provider store={store}><App></App></Provider>, document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}