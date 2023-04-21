<template>
	<view class="container">
		<view class="uni-flex uni-row">
			<view @click="clickTree(1)" class="text tree" :style="{boxShadow:(index == 1?' 0 0 0 5rpx green':'')}">固定宽度
			</view>
			<view @click="clickTree(2)" class="text tree" :style="{boxShadow:(index == 2?' 0 0 0 5rpx green':'')}">固定宽度
			</view>
			<view @click="clickTree(3)" class="text tree" :style="{boxShadow:(index == 3?' 0 0 0 5rpx green':'')}">固定宽度
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: "1"
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
				console.log("clickTree", e)
				this.index = e;
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

	.text2 {
		margin-bottom: 100rpx;
		text-align: center;
		color: #777;
		font-size: 50rpx;
	}

	.uni-flex {
		display: flex;
		flex-direction: row;
	}

	.uni-row {
		flex-direction: row;
	}

	.uni-column {
		flex-direction: column;
	}
</style>