/*
 * @Author: lle_wang
 * @Date:   2018-05-15 15:37:51
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-16 09:54:08
 */
import React from 'react';
import {
	connect
} from 'react-redux';
import DataList from 'components/dataList/index';

class SearchList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: null
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props !== nextProps) {
			return true;
		}
		if (this.state.keyword !== nextState.keyword) {
			return true;
		}
		return false;
	}
	componentDidUpdate() {
		this.setState({
			keyword: this.props.match.params.keyword
		})
	}
	componentDidMount() {
		this.setState({
			keyword: this.props.match.params.keyword
		})
	}

	search = (kword) => {
		let datas = this.props.currentCityDatas.cityDatas.datas,
			totalPage = datas.totalPage,
			filterDatas = [],
			keyword = kword;

		function filterKeyword(item) {
			let res = item.sellerName.search(keyword);
			if (res !== -1) {
				return item;
			}
		}

		for (var i = 0; i < totalPage; i++) {
			let pageName = 'page' + (i + 1);
			filterDatas = filterDatas.concat(datas[pageName].filter(filterKeyword));
		}

		return filterDatas;
	}

	render() {
		let kword = this.state.keyword;
		let filterDatas = this.search(kword);
		let transmitDatas = {
			cityName: this.props.currentCityDatas.currentCity
		};
		let totalPage = Math.ceil(filterDatas.length / 10);
		if (totalPage === 0) {
			transmitDatas.datas = {}
		} else if (totalPage === 1) {
			transmitDatas.datas = {
				totalPage: totalPage,
				page1: filterDatas
			}
		} else {
			for (var i = 0; i < totalPage; i++) {
				let pageName = 'page' + (i + 1);
				transmitDatas.datas[pageName] = filterDatas.slice((10 * (i + 1) - 10), 10 * (i + 1));
			}
			transmitDatas.datas.totalPage = totalPage;
		}
		return (<DataList datakey={transmitDatas} title='查询结果'></DataList>);
	}
}

const mapStateToProps = state => ({
	currentCityDatas: state.cityDatas
})

export default connect(mapStateToProps)(SearchList);