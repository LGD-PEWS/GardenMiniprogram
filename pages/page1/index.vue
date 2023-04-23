<template>
	<view class="container">
		<view class="uni-flex uni-column">
			<text class="text2" @click="clickSpeaker">{{ speaker }}</text>
			<text
				class="text">{{ minute < 10 ? '0' + minute : minute }}:{{ second < 10 ? '0' + second : second }}</text>
		</view>
		<uni-grid :column="2" :highlight="false" :showBorder="false">
			<uni-grid-item style="margin: auto" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #E5D9B6;boxShadow:0 0 0 20rpx #5F8D4E;">
					<image class="image" :src="plant" />
				</view>
			</uni-grid-item>
		</uni-grid>
		<slider :value="minute" step="5" class="slider" max="120" @change="sliderChange" @changing="sliderChanging"
			activeColor="#5F8D4E" backgroundColor="#E5D9B6" block-color="#5F8D4E" />
		<button v-show="startBtn" class="buttonStart" type="default" plain="true" @click="start">开 始</button>
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
				betteryIsChargingIsChecked: false,
				plantUrl: "/static/plants/plant0.png",
				plant: "/static/plants/plant0.png"
			}
		},
		onLoad() {
			// 监听事件
			uni.$on('useThisPlant', res => {
				console.log("plantUrl", res.url); // =>"掘金" res即emitData携带的对象
				this.plantUrl = res.url
				this.plant = res.url
			});
		},
		watch: {
			minute: function(val, oldVal) {
				this.sliderCount++
				if (this.sliderCount > 80) {
					this.speakerVibrate("不要划着玩^_^")
				} else {
					// 轻微震动
					uni.vibrateShort({
						success: function() {
							console.log('success');
						}
					});
				}
				// 植物成长
				console.log("val", val)
				if (val < 40) {
					this.plant = "/static/plants/seed0.png"
				} else if (val < 80) {
					this.plant = "/static/plants/seed1.png"
				} else {
					this.plant = this.plantUrl
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
					this.speaker = this.random(text);
				}
				// 短震动
				uni.vibrateShort({})
				if (!this.startBtn) {
					// 如果在计时
					// 重新计时3s
					// 3s后说正常的话
					clearInterval(this.speakerTimer);
					this.speakerTimer = setTimeout(() => {
						this.speakerNormal()
					}, time ? time : 3000)
				} else {
					// 如果没在计时
					// 重新计时3s
					// 3s后说"开始吧"
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
					this.speaker = this.random(this.speakerText);
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
			},
			random: function(array) {
				return array[Math.floor(Math.random() * array.length)];
			}
		}
	}
</script>

<style>
	page {
		/* 页面背景色 */
		background-color: #A4BE7B;
	}

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
		background-color: #5F8D4E;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #E5D9B6;
		font-size: 170rpx;
	}

	.text2 {
		margin-bottom: 100rpx;
		text-align: center;
		color: #E5D9B6;
		font-size: 50rpx;
	}

	.slider {
		margin-top: 150rpx;
		margin-bottom: 100rpx;
	}

	.buttonStart {
		border-radius: 50px;
		margin: 15rpx 10rpx;
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

	.image {
		width: 120rpx;
		height: 120rpx;
	}
</style>