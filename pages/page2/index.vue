<template>
	<view class="container">
		<uni-grid :column="3" :highlight="true" :showBorder="false">
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
						text: 'Grid 1',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/plants/plant1.png',
						text: 'Grid 2',
						badge: '1',
						type: "success"
					},
				]
			}
		},
		methods: {
			// 点击时触发
			// change(e) {
			// 	let {
			// 		index
			// 	} = e.detail
			// 	this.list[index].badge && this.list[index].badge++

			// 	uni.showToast({
			// 		title: `点击第${index+1}个宫格`,
			// 		icon: 'none'
			// 	})
			// },
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
</style>