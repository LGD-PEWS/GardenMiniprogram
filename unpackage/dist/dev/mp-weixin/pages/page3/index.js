"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      sharebtn: false,
      usePlant: "0",
      list: [{
        url: "/static/plants/plant0.png",
        time: "2023-04-23",
        age: "120"
      }]
    };
  },
  onLoad() {
    common_vendor.index.$on("newGardenPlant", (res) => {
      console.log("newGardenPlant", res);
      this.list.push(res);
    });
  },
  mounted() {
  },
  onShareAppMessage: function(res) {
    return {
      title: "赠花",
      //分享出去的标题
      path: "pages/page3/index"
      //别人点击链接进来的页面及传递的参数
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
      console.log("list", this.list);
      this.sharebtn = true;
      var that = this;
      common_vendor.wx$1.showModal({
        title: "赠花",
        content: `种植时间：${this.list[e].time}\r
植物年龄：${this.list[e].age}分钟`,
        cancelText: "放回",
        // 取消按钮的文字
        confirmText: "赠予好友",
        // 确认按钮的文字 
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击赠予");
            common_vendor.wx$1.showShareMenu({
              withShareTicket: true,
              success: () => {
                that.give(e);
              }
            });
          } else if (res.cancel) {
            console.log("用户点击放回");
            that.sharebtn = false;
          }
        }
      });
    },
    give: function(e) {
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
        e: "2d5e7c41-1-" + i0 + ",2d5e7c41-0",
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Sylvie/Documents/HBuilderProjects/miniprogram/pages/page3/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
