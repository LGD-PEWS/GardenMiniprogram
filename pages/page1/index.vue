<template>
	<view class="container">
		<view class="uni-flex uni-column">
			<text class="text2" @click="clickSpeaker">{{ speaker }}</text>
			<text
				class="text">{{ minute < 10 ? '0' + minute : minute }}:{{ second < 10 ? '0' + second : second }}</text>
		</view>
		<view class="uni-flex uni-row">
			<view class="tree-null"></view>
			<view class="tree" style="boxShadow: 0 0 0 5rpx green">固定宽度
			</view>
			<view class="tree-null"></view>
		</view>
		<slider :value="minute" step="5" class="slider" max="120" @change="sliderChange" @changing="sliderChanging" />
		<button v-show="startBtn" class="button" type="default" plain="true" @click="start">开 始</button>
		<button v-show="giveupBtn" class="button" type="default" plain="true" @click="giveup">放 弃</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				speaker: "开始吧...",
				speakerText: [],
				speakerTimer: "",
				minute: 0,
				second: 0,
				startBtn: true,
				giveupBtn: false,
				// 滑动计数
				sliderCount: 0
			}
		},
		watch: {
			minute: function(val, oldVal) {
				// 轻微震动
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
			}
		},
		mounted() {
			this.speakerText = ["全是bug...", "怎么回事呢...", "好想玩...", "我来讲个鬼故事..."];
		},
		methods: {
			start: function() {
				// 如果没拖拽进度条，直接返回
				if (this.minute == 0) {
					uni.showToast({
						title: '请先设置时间',
						icon: "error"
					});
					return
				}
				// 显示 放弃 按钮
				this.startBtn = false;
				this.giveupBtn = true;
				// 开始计时
				let timer = setInterval(() => {
					if (this.second > 0) {
						this.second--
					} else if (this.second == 0 && this.minute > 0) {
						this.minute--
						this.second = 59
					} else {
						this.giveup()
						clearInterval(timer);
						return
					}
				}, 1000)
				this.speakerTimer = setInterval(() => {
					this.speaker = this.speakerText[Math.floor(Math.random() * this.speakerText.length)];
				}, 8000)
			},
			giveup: function() {
				this.giveupBtn = false;
				this.startBtn = true;
				this.minute = 0;
				this.second = 0;
				this.speaker = "开始吧...";
				clearInterval(this.speakerTimer);
			},
			sliderChanging: function(event) {
				this.minute = event.detail.value
				this.sliderCount++
				if (this.sliderCount > 200) {
					this.speakerVibrate("不要划着玩^_^")
				}
			},
			sliderChange: function(event) {
				this.sliderCount = 0
				this.speaker = "开始吧...";
				this.minute = event.detail.value
			},
			clickSpeaker: function() {
				this.sliderCount++
				if (this.sliderCount == 18) {
					this.speakerVibrate("再见 XD")
					setTimeout(() => {
						this.wxExitMiniProgram()
					}, 1000)
				} else if (this.sliderCount == 10) {
					this.speakerVibrate("再点我要生气了")
				} else if (this.sliderCount == 4) {
					this.speakerVibrate("别点我了 :D")
				}
			},
			speakerVibrate: function(text) {
				this.speaker = text;
				uni.vibrateShort({

				})
			},
			wxExitMiniProgram: function() {
				console.log("我被执行了")
				wx.exitMiniProgram()
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.text {
		margin: 10rpx;
		margin-top: 40rpx;
		margin-bottom: 200rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 170rpx;
	}

	.text2 {
		margin-bottom: 100rpx;
		text-align: center;
		color: #777;
		font-size: 50rpx;
	}

	.slider {
		margin-top: 150rpx;
		margin-bottom: 100rpx;
	}

	.button {
		border-radius: 50px;
		margin: 15rpx 10rpx;
	}

	.uni-flex {
		display: flex;
		flex-direction: row;
	}

	.uni-column {
		flex-direction: column;
	}

	.tree {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
		/*  */
		border-radius: 5rpx;
		width: 200rpx;
		height: 200rpx;
		text-align: center;
		align-items: center;
	}

	.tree-null {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		/* background-color: #ebebeb; */
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		/* color: #777; */
		font-size: 26rpx;
		/*  */
		border-radius: 5rpx;
		width: 200rpx;
		height: 200rpx;
		text-align: center;
		align-items: center;
	}
</style>