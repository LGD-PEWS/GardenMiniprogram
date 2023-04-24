<template>
	<view class="container">
		<!-- <text class="goldText">{{gold}}</text> -->
		<!-- <image src="/static/tabbar/gold.png" class="gold"></image> -->
		<uni-grid :column="3" :highlight="false" :showBorder="false">
			<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
				<view @click="clickTree(index)" class="grid-item-box" style="background-color: #E5D9B6;"
					:style="{boxShadow:(usePlant == index?' 0 0 0 5rpx #5F8D4E':'')}">
					<image class="image" :src="item.url" />
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usePlant: "0",
				list: [{
						url: '/static/plants/plant0.png',
						gold: "0"
					},
					{
						url: '/static/plants/plant1.png',
						gold: '5',
					},
				],
				gold: "0"
			}
		},
		onLoad() {
			// 监听事件
			uni.$on('getGold', res => {
				console.log("getGold", res.gold); // =>"掘金" res即emitData携带的对象
				this.gold += res.gold
			});
		},
		methods: {
			clickTree: function(e) {
				// 轻微震动
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
				console.log("clickTree", e)
				this.usePlant = e;
				uni.$emit('useThisPlant', {
					url: `/static/plants/plant${e}.png`,
				});
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


	.goldText {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 10rpx;
		right: 40rpx;
		color: #E5D9B6;
	}

	.gold {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 10rpx;
		right: 10rpx;
	}
</style>