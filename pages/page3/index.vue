<template>
	<view class="container">
		<uni-grid :column="3" :highlight="false" :showBorder="false">
			<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
				<view @longtap="longtapTree(index)" @click="clickTree(index)" class="grid-item-box"
					style="background-color: #E5D9B6;"
					:style="{boxShadow:(usePlant == index?' 0 0 0 5rpx #5F8D4E':'')}">
					<image class="image" :src="item.url" />
				</view>
			</uni-grid-item>
		</uni-grid>
		<button :disabled="!sharebtn" open-type="share" class="buttonShare" type="default" plain="true">送 花</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sharebtn: false,
				usePlant: "-1",
				list: [{
					url: '/static/plants/plant0.png',
					time: "2023-04-23",
					age: "120"
				}, {
					url: '/static/plants/plant1.png',
					time: "2023-04-24",
					age: "119"
				}],
				shareURL: "",
				shareMessage: "",
				e: ""
			}
		},
		onLoad(options) {
			if (options.shareMessage) {
				console.log("shareMessage", options.shareMessage); //即可拿到分享时传递的参数
				this.list.push(JSON.parse(options.shareMessage))
			}
			// 监听事件
			uni.$on('newGardenPlant', res => {
				console.log("newGardenPlant", res); // =>"掘金" res即emitData携带的对象
				this.list.push(res)
			});
		},
		mounted() {

		},
		onShareAppMessage: function(res) {
			this.list.splice(this.e, 1)
			var that = this;
			//如果用户是点击按钮进行分享的
			return {
				title: "赠了您一束花", //分享出去的标题
				imageUrl: that.shareURL,
				path: "pages/page3/index?shareMessage=" + that.shareMessage //别人点击链接进来的页面及传递的参数
			}
		},
		methods: {
			longtapTree: function(e) {
				// 轻微震动
				uni.vibrateShort({});
				console.log("longtapTree", e);
				this.usePlant = e;
				console.log("list", this.list);
				var that = this
				wx.showModal({
					title: '植物信息',
					// TODO 以后会加种植原因（学习或休息等）
					content: `种植时间：${this.list[e].time}\r\n植物年龄：${this.list[e].age}分钟`,
					confirmText: "我知道了", // 确认按钮的文字 
					showCancel: false
				});
			},
			clickTree: function(e) {
				this.e = e
				// 轻微震动
				uni.vibrateShort({});
				console.log("clickTree", e);
				this.usePlant = e;
				this.sharebtn = true
				this.shareURL = this.list[e].url
				this.shareMessage = JSON.stringify(this.list[e])
				console.log("shareMessage", this.shareMessage);
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

	.buttonShare {
		border-radius: 50px;
		margin: 15rpx 10rpx;
	}
</style>