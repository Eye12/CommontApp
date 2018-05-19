/*
 * @Author: lle_wang
 * @Date:   2018-05-13 21:34:12
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:54:14
 */
import React from 'react';
import {
	HashRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Header from 'containers/header/index';
import Home from 'components/home/index';
import Citys from 'containers/citys/index';
import SearchList from 'containers/searchList/index'
import DetailPage from 'containers/detailPage/index';
import LoginContainer from 'containers/loginContainer/index';
import RegisterContainer from 'containers/registerContainer/index';
import UserCenterContainer from 'containers/userCenterContainer/index';
import ErrorPage from 'components/error/index';
import actions from 'actions/index.js';
import 'whatwg-fetch';
import {
	connect
} from 'react-redux';
class App extends React.Component {
	componentWillMount() {
		let _this = this,
			cityName = '北京';
		fetch('/citys?cityName=' + cityName).then(res => {
			return res.json();
		}).then(data => {
			if (data.status) {
				_this.props.dispatch(actions.chooseCity(cityName, data.cityItem));
			} else {
				alert(data.info);
			}
		})
	}
	render() {
		const appContent = (
			<div className="app">
				<Header></Header>
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route exact path='/citys' component={Citys}></Route>
					<Route exact path='/search-list/:keyword?' component={SearchList}></Route>
					<Route component={ ErrorPage }></Route>
				</Switch>
			</div>
		);
		return (
			<Router>
				<Switch>
					<Route exact path='/details/:city/:id' component={DetailPage}></Route>
					<Route exact path='/login' component={LoginContainer}></Route>
					<Route exact path='/register' component={RegisterContainer}></Route>
					<Route exact path='/usercenter' component={UserCenterContainer}></Route>
					<Route path='/' render={props => appContent}></Route>
				</Switch>
			</Router>
		);
	}
}

export default connect()(App);