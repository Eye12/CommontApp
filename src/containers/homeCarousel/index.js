/*
 * @Author: lle_wang
 * @Date:   2018-05-13 15:28:04
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:55:42
 */
import React from 'react';
import ReactSwipe from 'react-swipe';
import 'whatwg-fetch';
import './carousel.scss';

class HomeCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentkey: 0,
			fetchData: null
		}
	}
	componentDidMount() {
		fetch('./carousel').then(res => res.json()).then(data => {
			if (data.status) {
				this.setState({
					fetchData: data.data
				})
			} else {
				alert(data.info);
			}
		})
	}

	render() {
		let options = {
				continuous: false,
				disableScroll: false,
				auto: 3000,
				callback: index => {
					this.setState({
						currentkey: Number(index)
					})
				}
			},
			pageOneContent = 'loading...',
			pageTwoContent = 'loading...',
			fetchData = this.state.fetchData,
			oneContent,
			twoContent;
		if (fetchData) {
			let pageOne = fetchData.pageOne,
				pageTwo = fetchData.pageTwo,
				pageItemMap = (item, index) => {
					let imgUrl = require('../../images/carousel/' + item.img + '.png');
					return (
						<li key={index} className='item'>
							<img src={imgUrl} alt={item.img} className='item-img' />
							<span className="txt">{item.name}</span>
						</li>
					);
				};
			oneContent = pageOne.length ? pageOne.map((item, index) => pageItemMap(item, index)) : '没有加载到数据';
			twoContent = pageTwo.length ? pageTwo.map((item, index) => pageItemMap(item, index)) : '没有加载到数据';
		}

		let liClassNameOne = this.state.currentkey === 0 ? 'li-item icon-circular' : 'li-item icon-circle',
			liClassNameTwo = this.state.currentkey === 1 ? 'li-item icon-circular' : 'li-item icon-circle';

		return (
			<div className="carousel-container">
				<ReactSwipe className="carousel" swipeOptions={ options }>
                	<div className='group group-1'>
                		<ul className='list'>{oneContent}</ul>
                	</div>
                	<div className='group group-2'>
                		<ul className='list'>{twoContent}</ul>
                	</div>
            	</ReactSwipe>
            	<ol className="circle-list">
            		<li className={liClassNameOne}></li>
            		<li className={liClassNameTwo}></li>
            	</ol>
			</div>
		);
	}
}

export default HomeCarousel;