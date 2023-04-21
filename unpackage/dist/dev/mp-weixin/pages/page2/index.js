"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      index: "1"
    };
  },
  methods: {
    clickTree: function(e) {
      common_vendor.index.vibrateShort({
        success: function() {
          console.log("success");
        }
      });
      console.log("clickTree", e);
      this.index = e;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.clickTree(1)),
    b: $data.index == 1 ? " 0 0 0 5rpx green" : "",
    c: common_vendor.o(($event) => $options.clickTree(2)),
    d: $data.index == 2 ? " 0 0 0 5rpx green" : "",
    e: common_vendor.o(($event) => $options.clickTree(3)),
    f: $data.index == 3 ? " 0 0 0 5rpx green" : ""
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Sylvie/Documents/HBuilderProjects/miniprogram/pages/page2/index.vue"]]);
wx.createPage(MiniProgramPage);
