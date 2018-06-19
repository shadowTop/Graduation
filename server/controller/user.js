const User = require('model/User')
const Token = require('utils/token')

const { writeImg, bcryptPass } = require('utils/db/user')

const { getNotice } = require('utils/db/notice')
const { getElectrics } = require('utils/db/electric')
const { getWeather } = require('utils/http')

module.exports = {

	async login(ctx) {
		const { account,password } = ctx.request.body
		const user = await User.findOne({ account: account })
		if (!user) {
			return ctx.sendError('用户不存在！')
		}
		console.log(user)
		const isMatch = await user.comparePassword(password, user.password)
		if (!isMatch) {
			return ctx.sendError('密码错误！')
		}
		const userInfo = {
			name: user.name,
			account: user.account,
			address: user.address,
			avatar: user.avatar,
			news: user.news
		}
		const [token,notice,weather,electrics] = await Promise.all([Token.generate(account),getNotice(account),getWeather(user.address.code),getElectrics(account)])
		const value = { token,userInfo,weather,notice,electrics }

		ctx.send('信息获取成功！',value)
	},
	async getUserInfo(ctx) {
		const account = ctx.state.user.data
		const user = await User.findOne({ account: account })
		const userInfo = {
			name: user.name,
			account: user.account,
			address: user.address,
			avatar: user.avatar,
			news: user.news
		}

		const [notice,weather,electrics] = await Promise.all([getNotice(account),getWeather(user.address.code),getElectrics(account)])
		const value = { userInfo,weather,notice,electrics}

		ctx.send('信息获取成功！',value)
	},
	async registry(ctx) {
		const userInfo = ctx.request.body
		if (ctx.session.captcha !== userInfo.captcha.toString()) {
			return ctx.sendError('验证码错误！')
		}
		const isHad = await User.findOne({ account: userInfo.account })
		if (isHad) {
			return ctx.sendError('账号已存在！')
		}

		Reflect.deleteProperty(userInfo,'captcha')
		Reflect.deleteProperty(userInfo,'checkpass')

		const hasSaved = await new User(userInfo).save()
		if (!hasSaved) {
			return ctx.sendError('因不可抗拒因素，注册失败！')
		}
		ctx.send('注册成功！')
	},

	async hasExisted(ctx) {
		const { account } = ctx.request.query
		await User.findOne({ account:account }, (err, data) => {
			if (err) {
				return ctx.sendError(err)
			}
			ctx.send('',{hasExisted: !!data})
		})
	},

	async updateUserInfo(ctx) {
		const account = ctx.state.user.data
		const userInfo = ctx.request.body

		let _token, avatar, password
		userInfo.account = account

		if (userInfo.avatar && userInfo.password) {
			[avatar, password,_token] = await Promise.all([writeImg(userInfo), bcryptPass(userInfo),Token.generate(account)])

			userInfo.avatar = avatar
			userInfo.password = password

		} else {
			if (userInfo.avatar) {
				userInfo.avatar = await writeImg(userInfo)
			} else if (userInfo.password) {
				[password,_token] = await Promise.all([bcryptPass(userInfo),Token.generate(account)])
				userInfo.password = password
			}
		}
		const isUpdated = await User.updateOne({ account }, userInfo)
		if (!isUpdated) {
			return ctx.sendError('因不可抗拒因素，您的信息更改失败！')
		}
		ctx.send('您的信息已更改成功！',{_token})
	},

	async newsToZero(ctx) {
		const account = ctx.state.user.data
		await User.updateOne({account},{ news: { [ctx.params.type]: 0 } }) && ctx.send('消息数目已清空！')
	}
}
