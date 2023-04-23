"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      usePlant: "0",
      list: [
        {
          url: "/static/plants/plant0.png",
          text: "Grid 1",
          badge: "0",
          type: "primary"
        },
        {
          url: "/static/plants/plant1.png",
          text: "Grid 2",
          badge: "1",
          type: "success"
        }
      ]
    };
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
      common_vendor.index.vibrateShort({
        success: function() {
          console.log("success");
        }
      });
      console.log("clickTree", e);
      this.usePlant = e;
      common_vendor.index.$emit("useThisPlant", {
        url: `/static/plants/plant${e}.png`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.o(($event) => $options.clickTree(index), index),
        c: $data.usePlant == index ? " 0 0 0 5rpx #5F8D4E" : "",
        d: index,
        e: "cf0c6d00-1-" + i0 + ",cf0c6d00-0",
        f: common_vendor.p({
          index
        })
      };
    }),
    b: common_vendor.p({
      column: 3,
      highlight: false,
      showBorder: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Sylvie/Documents/HBuilderProjects/miniprogram/pages/page2/index.vue"]]);
wx.createPage(MiniProgramPage);
