/*
 * @Author: lle_wang
 * @Date:   2018-05-13 11:00:19
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-16 19:05:40
 */
import React from 'react';
import './dataList.scss';
import Stars from 'components/stars/index';
import {
	Link
} from 'react-router-dom';
class DataList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cityName: null,
			datas: null,
			currentDatas: null,
			totalPage: null,
			nextPage: 2,
			initial: true
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props !== nextProps) {
			return true;
		}
		if (this.state.cityName !== nextState.cityName) {
			return true;
		}
		if (this.state.totalPage !== nextState.totalPage) {
			return true;
		}
		if (this.state.currentDatas !== nextState.currentDatas) {
			return true;
		}
		if (this.state.isMore !== nextState.isMore) {
			return true;
		}
		return false;
	}

	componentDidUpdate() {
		this._isMounted = true;
		if (this._isMounted) {
			if (this.state.initial) {
				this.changeState(this.props.datakey);
			}
		}
	}

	componentWillUnMount = () => {
		this._isMounted = false;
		clearTimeout(this.timer);
		window.removeEventListener('scroll');
	}

	componentDidMount() {
		this._isMounted = true;
		if (this._isMounted) {
			let datakey = this.props.datakey;
			if (datakey) {
				this.changeState(datakey);
			}
			window.addEventListener('scroll', () => {
				// 这里定时器的作用是增强性能，减少onscroll事件的频繁发生！
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					// 整个页面的总高度
					let totalHeight = document.body.offsetHeight,
						// 页面卷曲上去的总高度
						scrollTop = document.documentElement.scrollTop;
					// 加载更多到设备/客户端顶部距离
					// let changeMoreTopDistance = this.refs.more.getBoundingClientRect().top;
					// 设备客户端高度
					let clientHeight = document.documentElement.clientHeight;
					if ((totalHeight - scrollTop - 50) < clientHeight) {
						this.loadMore();
					}
				}, 1000);
			})
		}
	}

	// 加载更多事件
	loadMore = () => {
		let datas = this.state.datas,
			currentDatas = this.state.currentDatas,
			totalPage = this.state.totalPage,
			nextPage = this.state.nextPage;
		if (Number(totalPage) >= Number(nextPage)) {
			let pageName = 'page' + nextPage;
			this.setState({
				currentDatas: currentDatas.concat(datas[pageName]),
				nextPage: nextPage + 1,
				initial: false
			})
		}
	}

	changeState = (da) => {
		this.setState({
			cityName: da.cityName,
			datas: da.datas,
			currentDatas: da.datas.page1,
			totalPage: da.datas.totalPage
		})
	}

	render() {
		let datas = this.state.datas,
			currentDatas = this.state.currentDatas,
			totalPage = this.state.totalPage,
			nextPage = this.state.nextPage,
			listContent,
			moreContent;
		//--------------------------------------------------------------------//
		//--------------------------------------------------------------------//
		//------------------------是否有可用商户数据然后渲染---------------------//
		//--------------------------------------------------------------------//
		//--------------------------------------------------------------------//
		if (datas === null) {
			listContent = 'loading';
		} else {
			listContent = JSON.stringify(datas) !== '{}' ? currentDatas.map((item, index) => {
				let urlPath = this.state.cityName + '/' + item.img,
					personConsumption = item.pConsumption === '暂无' ? '暂无人均价' : (item.pConsumption + '元/人');
				return (
					<li className='li-item' key={item.id}>
						<span className="left">
							<Link to={`${'/details/' + this.state.cityName + '/' + item.id}`}>
								<img src={require('../../images/list/' + urlPath)} alt={`${item.category + '.jpg'}`}/>
							</Link>
						</span>
						<span className="right">
							<span className="top">
								<span className="li-title">{item.sellerName}</span>
								<span className='stars-group'>
									<Stars starValue = {item.stars}/>
									<span className="pConsumption">{personConsumption}</span>
								</span>
							</span>
							<span className="d-bottom">
								<span className="category">{item.category}</span>
								<span className='distance'>{item.distance}</span>
							</span>
						</span>
					</li>
				);
			}) : (<li style={{
        fontSize: '3rem',
        textAlign: 'center'
      }}>暂时未获取到任何商户信息</li>);
		}

		//--------------------------------------------------------------------//
		//--------------------------------------------------------------------//
		//-----------------------------是否有加载更多--------------------------//
		//--------------------------------------------------------------------//
		//--------------------------------------------------------------------//
		if (totalPage) {
			moreContent = Number(nextPage) <= Number(totalPage) ? (<p className="more" ref='more'>加载更多<i className="icon-jiantou4"></i></p>) : (<p className="more" ref='more'>没有更多了</p>);
		} else if (totalPage === null) {
			moreContent = (<p className="more" ref='more'>loading...</p>);
		} else {
			moreContent = (<p className="more" ref='more'>没有更多了</p>);
		}

		return (
			<div className="data-list-group">
				<div className="line-cut"></div>
				<p className="title">{this.props.title}</p>
				<ul className="d-list" ref='list'>
					{listContent}
				</ul>
				{moreContent}
			</div>
		);
	}
}

export default DataList;