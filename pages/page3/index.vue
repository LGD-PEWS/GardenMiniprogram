<template>
	<view class="container">
		<uni-grid :column="3" :highlight="false" :showBorder="false">
			<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
				<view @click="clickTree(index)" open-type="share" class="grid-item-box"
					style="background-color: #E5D9B6;"
					:style="{boxShadow:(usePlant == index?' 0 0 0 5rpx #5F8D4E':'')}">
					<image class="image" :src="item.url" />
				</view>
			</uni-grid-item>
		</uni-grid>
		<button open-type="share">送 花</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sharebtn: false,
				usePlant: "0",
				list: [{
					url: '/static/plants/plant0.png',
					time: "2023-04-23",
					age: "120"
				}]
			}
		},
		onLoad() {
			// 监听事件
			uni.$on('newGardenPlant', res => {
				console.log("newGardenPlant", res); // =>"掘金" res即emitData携带的对象
				this.list.push(res)
			});
		},
		mounted() {
			// App({
			//   onLaunch(res) {
			//     wx.redirectTo({
			//       url: 'pages/...'
			//     }) // 如果是 tabbar 页面，请使用 wx.switchTab
			//   }
			// })
		},
		onShareAppMessage: function(res) {
			var that = this;
			//如果用户是点击按钮进行分享的
			return {
				title: "赠花", //分享出去的标题
				path: "pages/page3/index" //别人点击链接进来的页面及传递的参数
			}
		},
		methods: {
			clickTree: function(e) {
				// 轻微震动
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
				console.log("clickTree", e);
				console.log("list", this.list);
				// this.usePlant = e;
				// 		confirmColor: '#f55850',
				// 		cancelColor: '#39B54A',
				this.sharebtn = true
				var that = this
				wx.showModal({
					title: '赠花',
					content: `种植时间：${this.list[e].time}\r\n植物年龄：${this.list[e].age}分钟`,
					cancelText: "放回", // 取消按钮的文字
					confirmText: "赠予好友", // 确认按钮的文字 
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击赠予');
							wx.showShareMenu({
								withShareTicket: true,
								success: () => {
									that.give(e)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击放回');
							that.sharebtn = false
						}
					}
				});
			},
			give: function(e) {
				// uni.createSelectorQuery().selectAll(".button").boundingClienRect(res => {
				// 	// this.leftItemTop = res.map(item => item.top)
				// 	console.log(res)
				// }).exec(() => {
				// console.log(this.leftItemTop)
				// })
				// const query = wx.createSelectorQuery()
				// query.select('#shareButton').click()
				// console.log(document.getElementById("shareButton"))


				// console.log(this.$refs.shareButton)
				// console.log(document.getElementById('shareButtonn'))
				// this.$refs.shareButton.click()
				// document.getElementById('shareButton').click()
				// this.list.splice(e, 1)
			}
		}
	}
</script>

<style>
	page {
		/* 页面背景色 */
		background-color: #A4BE7B;
	}

	.grid-item-box {
		border-radius: 50%;
		flex: 1;
		/* position: relative; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
		margin: 15rpx;
	}

	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.image {
		width: 80rpx;
		height: 80rpx;
	}
</style>