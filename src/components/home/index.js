/*
 * @Author: lle_wang
 * @Date:   2018-05-13 21:46:33
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:56:33
 */
import React from 'react';
import HomeCarousel from 'containers/homeCarousel/index';
import HomeDataList from 'containers/homeDataList/index';
class Home extends React.Component {
	render() {
		return (
			<div className="home">
				<HomeCarousel></HomeCarousel>
				<HomeDataList></HomeDataList>
			</div>
		);
	}
}

export default Home;