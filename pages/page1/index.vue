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
				sliderCount: 0,
				// 电池电量检测
				betteryIsChecked: false,
				// 电池充电检测
				betteryIsChargingIsChecked: false
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
				this.sliderCount++
				if (this.sliderCount > 40) {
					this.speakerVibrate("不要划着玩^_^")
				}
			}
		},
		mounted() {
			this.speakerText = ["全是bug...", "怎么回事呢...", "好想玩...", "我来讲个鬼故事..."];
			// 获取电池电量
			setInterval(() => {
				this.getBattery()
			}, 5000)
		},
		methods: {
			start: function() {
				// 如果没拖拽进度条，直接返回
				if (this.minute == 0) {
					this.speakerVibrate(["请先设置时间!", "请先设置时间!!", "请先设置时间!!!"])
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
				// 正常说话
				this.speakerNormal()
			},
			giveup: function() {
				this.giveupBtn = false;
				this.startBtn = true;
				this.minute = 0;
				this.second = 0;
				this.speakerReset()
				clearInterval(this.speakerTimer);
			},
			sliderChanging: function(event) {
				this.minute = event.detail.value
			},
			sliderChange: function(event) {
				this.sliderCount = 0
				this.speakerReset()
				this.minute = event.detail.value
			},
			clickSpeaker: function() {
				this.sliderCount++
				if (this.sliderCount == 20) {
					// 关闭小程序
					wx.exitMiniProgram()
				} else if (this.sliderCount == 18) {
					this.speakerVibrate("再见 XD", 100000000)
				} else if (this.sliderCount == 10) {
					this.speakerVibrate("再点我要生气了")
				} else if (this.sliderCount == 4) {
					this.speakerVibrate("别点我了 :D")
				}
			},
			speakerVibrate: function(text, time) {
				if (typeof text == "string") {
					this.speaker = text;
				}
				if (typeof text == "object") {
					this.speaker = text[Math.floor(Math.random() * text.length)];
				}
				// 短震动
				uni.vibrateShort({})
				if (!this.startBtn) {
					// 停止说正常的话
					clearInterval(this.speakerTimer);
					// 五秒后说正常的话
					this.speakerTimer = setTimeout(() => {
						this.speakerNormal()
					}, time ? time : 3000)
				} else {
					clearInterval(this.speakerTimer);
					this.speakerTimer = setTimeout(() => {
						this.speakerReset()
					}, time ? time : 3000)

				}
			},
			speakerReset: function() {
				this.speaker = "开始吧...";
			},
			// 正常说话
			speakerNormal: function() {
				this.speakerTimer = setInterval(() => {
					this.speaker = this.speakerText[Math.floor(Math.random() * this.speakerText.length)];
				}, 8000)
			},
			getBattery: function() {
				uni.getBatteryInfo({
					success: (res) => {
						if (res.level <= 20 && !res.isCharging && !this.betteryIsChecked) {
							this.speakerVibrate("快要没电了...")
						}
						if (res.level <= 20 && res.isCharging && !this.betteryIsChargingIsChecked) {
							this.speakerVibrate("好耶有电了！")
							this.betteryIsChargingIsChecked = true
							// 
							this.betteryIsChecked = true
						}
						// 充电充到80%以上，会重置检测机制
						if (res.level >= 80) {
							this.betteryIsChecked = false
							this.betteryIsChargingIsChecked = false
						}
					}
				})
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