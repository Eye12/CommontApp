/*
 * @Author: lle_wang
 * @Date:   2018-05-10 11:44:17
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 19:32:30
 */
let express = require('express');
let fs = require('fs');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let buf = new Buffer(1024);
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json())

//--------------------------------//
//--------------------------------//
//-----------新用户注册-----------//
//--------------------------------//
//--------------------------------//
app.post('/register', (req, res) => {
	// 获取存档用户数据
	fs.readFile(path.resolve(__dirname, './data/users.json'), (err, data) => {
		let userDatas = JSON.parse(data.toString());
		// 检查新用户是否被注册过
		let checkUserInfo = false;
		userDatas.map(item => {
			if (item.name === req.body.name) {
				checkUserInfo = true;
			}
		})
		console.log(checkUserInfo);
		if (checkUserInfo) {
			res.json({
				status: 0,
				info: '对不起，该账户已被注册！'
			})
		} else {
			// 新用户存档
			let newUser = {
				name: req.body.name,
				password: req.body.password,
				telPhone: req.body.tel
			}
			userDatas.push(newUser);
			fs.writeFile(path.resolve(__dirname, './data/users.json'), JSON.stringify(userDatas), err => {
				if (err) {
					console.error(err);
				} else {
					res.json({
						status: 1,
						info: '恭喜您，注册成功！'
					})
				}
			})
		}
	})
})

//--------------------------------//
//--------------------------------//
//------------用户登录------------//
//--------------------------------//
//--------------------------------//
app.post('/login', (req, res) => {
	// 获取登录用户信息
	let username = req.body.name,
		password = req.body.password;

	// 获取所有存档的用户信息
	fs.readFile(path.resolve(__dirname, './data/users.json'), (err, data) => {
		let userDatas;
		if (err) {
			console.error(err);
		} else {
			userDatas = JSON.parse(data.toString());
		}
		// 检查用户是否存在
		let userItem = null;
		userDatas.map(item => {
			if (item.name === username && item.password === password) {
				userItem = item;
			}
		})
		if (userItem) {
			res.json({
				status: 1,
				info: '恭喜您，登录成功！',
				datas: userItem.datas
			})
		} else {
			res.json({
				status: 0,
				info: '账号密码不匹配'
			})
		}
	})
})

//--------------------------------//
//--------------------------------//
//-----------获取城市数据-----------//
//--------------------------------//
//--------------------------------//
app.get('/citys', (req, res) => {
	let cityName = req.query.cityName;
	// 获取存档中所有城市数据
	fs.readFile(path.resolve(__dirname, './data/citys.json'), (err, data) => {
		if (err) {
			console.error(err);
			res.json({
				status: 4,
				info: err
			})
		}
		let datas = JSON.parse(data.toString()),
			cityItem = null;
		datas.map(item => {
			if (item.cityName === cityName) {
				cityItem = item;
			}
		})
		if (cityItem) {
			res.json({
				status: 1,
				cityItem
			});
		} else {
			res.json({
				status: 0,
				info: '没有匹配城市数据'
			})
		}
	})
})

//--------------------------------//
//--------------------------------//
//----------获取轮播图数据----------//
//--------------------------------//
//--------------------------------//
app.get('/carousel', (req, res) => {
	fs.readFile(path.resolve(__dirname, './data/carouselDatas.json'), (err, data) => {
		if (err) {
			console.error(err);
			res.json({
				status: 0,
				info: err
			});
		} else {
			let carouselDatas = JSON.parse(data.toString());
			res.json({
				status: 1,
				data: carouselDatas
			})
		}
	})
})

//--------------------------------//
//--------------------------------//
//---------获取单个商户信息---------//
//--------------------------------//
//--------------------------------//
app.get('/commodity', (req, res) => {
	let city = req.query.city,
		id = req.query.id;
	fs.readFile(path.resolve(__dirname, './data/commodityBank.json'), (err, data) => {
		if (err) {
			console.err(err);
			res.json({
				status: 0,
				info: err
			})
		} else {
			let commodityBankDatas = JSON.parse(data.toString()),
				cityFilter = (item) => {
					return item.city === city;
				},
				cityFilteredItemData = commodityBankDatas.filter(cityFilter),
				idFilter = (item) => {
					return Number(item.id) === Number(id);
				},
				idFilteredItemData = cityFilteredItemData[0].commodityArr.filter(idFilter);
			if (idFilteredItemData) {
				res.json({
					status: 1,
					datas: idFilteredItemData
				})
			} else {
				res.json({
					status: 1,
					datas: '您查找的商品不在了'
				})
			}
		}
	})
})

let server = app.listen(3000, function() {

	let host = server.address().address
	let port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})