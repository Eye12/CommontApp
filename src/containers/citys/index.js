/*
 * @Author: lle_wang
 * @Date:   2018-05-14 21:44:40
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:55:23
 */
import React from 'react';
import './city';
import 'whatwg-fetch';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import actions from 'actions/index.js';

class Citys extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			citys: [
				'北京', '上海', '重庆', '天津', '杭州',
				'广州', '成都', '西安', '苏州', '深圳',
				'武汉', '厦门', '山西', '安徽', '拉萨',
				'四川', '西藏', '新疆'
			]
		}
	}

	clickHandler = (e) => {
		let cityName = e.target.getAttribute('datakey');
		this.getCityDatas(cityName);
	}

	// 获取对应城市数据
	getCityDatas = (cityName) => {
		let _this = this;
		fetch('/citys?cityName=' + cityName).then(res => {
			return res.json();
		}).then(data => {
			if (data.status) {
				_this.props.dispatch(actions.chooseCity(cityName, data.cityItem));
				history.back();
			} else {
				alert(data.info);
			}
		})
	}

	render() {
		let listContent = this.state.citys.map(item => {
			return (<li key={item} datakey={item} className='item' onClick={ this.clickHandler }>{item}</li>)
		})
		return (
			<div className="citys">
				<h1 className='title'>选择城市</h1>
				<ul className="city-list">
					{ listContent }
				</ul>
			</div>
		);
	}
}

export default connect()(Citys);