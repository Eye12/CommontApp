/*
 * @Author: lle_wang
 * @Date:   2018-05-14 10:20:48
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-15 16:05:10
 */
import React from 'react';
import {
	connect
} from 'react-redux';
import DataList from 'components/dataList/index';

class HomeDataList extends React.Component {
	render() {
		return (
			<DataList datakey={this.props.currentCityDatas.cityDatas} title='猜你喜欢'></DataList>
		);
	}
}

const mapStateToProps = state => ({
	currentCityDatas: state.cityDatas
})

export default connect(mapStateToProps)(HomeDataList);