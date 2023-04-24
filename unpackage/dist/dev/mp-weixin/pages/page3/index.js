"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      sharebtn: false,
      usePlant: "-1",
      list: [{
        url: "/static/plants/plant0.png",
        time: "2023-04-23",
        age: "120"
      }, {
        url: "/static/plants/plant1.png",
        time: "2023-04-24",
        age: "119"
      }],
      shareURL: "",
      shareMessage: "",
      e: ""
    };
  },
  onLoad(options) {
    if (options.shareMessage) {
      console.log("shareMessage", options.shareMessage);
      this.list.push(JSON.parse(options.shareMessage));
    }
    common_vendor.index.$on("newGardenPlant", (res) => {
      console.log("newGardenPlant", res);
      this.list.push(res);
    });
  },
  mounted() {
  },
  onShareAppMessage: function(res) {
    this.list.splice(this.e, 1);
    var that = this;
    return {
      title: "赠了您一束花",
      //分享出去的标题
      imageUrl: that.shareURL,
      path: "pages/page3/index?shareMessage=" + that.shareMessage
      //别人点击链接进来的页面及传递的参数
    };
  },
  methods: {
    longtapTree: function(e) {
      common_vendor.index.vibrateShort({});
      console.log("longtapTree", e);
      this.usePlant = e;
      console.log("list", this.list);
      common_vendor.wx$1.showModal({
        title: "植物信息",
        // TODO 以后会加种植原因（学习或休息等）
        content: `种植时间：${this.list[e].time}\r
植物年龄：${this.list[e].age}分钟`,
        confirmText: "我知道了",
        // 确认按钮的文字 
        showCancel: false
      });
    },
    clickTree: function(e) {
      this.e = e;
      common_vendor.index.vibrateShort({});
      console.log("clickTree", e);
      this.usePlant = e;
      this.sharebtn = true;
      this.shareURL = this.list[e].url;
      this.shareMessage = JSON.stringify(this.list[e]);
      console.log("shareMessage", this.shareMessage);
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
        b: common_vendor.o(($event) => $options.longtapTree(index), index),
        c: common_vendor.o(($event) => $options.clickTree(index), index),
        d: $data.usePlant == index ? " 0 0 0 5rpx #5F8D4E" : "",
        e: index,
        f: "2d5e7c41-1-" + i0 + ",2d5e7c41-0",
        g: common_vendor.p({
          index
        })
      };
    }),
    b: common_vendor.p({
      column: 3,
      highlight: false,
      showBorder: false
    }),
    c: !$data.sharebtn
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Sylvie/Documents/HBuilderProjects/miniprogram/pages/page3/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
