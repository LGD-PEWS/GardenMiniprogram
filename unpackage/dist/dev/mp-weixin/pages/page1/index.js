"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
    };
  },
  watch: {
    minute: function(val, oldVal) {
      common_vendor.index.vibrateShort({
        success: function() {
          console.log("success");
        }
      });
    }
  },
  mounted() {
    this.speakerText = ["全是bug...", "怎么回事呢...", "好想玩...", "我来讲个鬼故事..."];
  },
  methods: {
    start: function() {
      if (this.minute == 0) {
        common_vendor.index.showToast({
          title: "请先设置时间",
          icon: "error"
        });
        return;
      }
      this.startBtn = false;
      this.giveupBtn = true;
      let timer = setInterval(() => {
        if (this.second > 0) {
          this.second--;
        } else if (this.second == 0 && this.minute > 0) {
          this.minute--;
          this.second = 59;
        } else {
          this.giveup();
          clearInterval(timer);
          return;
        }
      }, 1e3);
      this.speakerTimer = setInterval(() => {
        this.speaker = this.speakerText[Math.floor(Math.random() * this.speakerText.length)];
      }, 8e3);
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
      this.minute = event.detail.value;
      this.sliderCount++;
      if (this.sliderCount > 200) {
        this.speakerVibrate("不要划着玩^_^");
      }
    },
    sliderChange: function(event) {
      this.sliderCount = 0;
      this.speaker = "开始吧...";
      this.minute = event.detail.value;
    },
    clickSpeaker: function() {
      this.sliderCount++;
      if (this.sliderCount == 18) {
        this.speakerVibrate("再见 XD");
        setTimeout(() => {
          this.wxExitMiniProgram();
        }, 1e3);
      } else if (this.sliderCount == 10) {
        this.speakerVibrate("再点我要生气了");
      } else if (this.sliderCount == 4) {
        this.speakerVibrate("别点我了 :D");
      }
    },
    speakerVibrate: function(text) {
      this.speaker = text;
      common_vendor.index.vibrateShort({});
    },
    wxExitMiniProgram: function() {
      console.log("我被执行了");
      common_vendor.wx$1.exitMiniProgram();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.speaker),
    b: common_vendor.o((...args) => $options.clickSpeaker && $options.clickSpeaker(...args)),
    c: common_vendor.t($data.minute < 10 ? "0" + $data.minute : $data.minute),
    d: common_vendor.t($data.second < 10 ? "0" + $data.second : $data.second),
    e: $data.minute,
    f: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    g: common_vendor.o((...args) => $options.sliderChanging && $options.sliderChanging(...args)),
    h: $data.startBtn,
    i: common_vendor.o((...args) => $options.start && $options.start(...args)),
    j: $data.giveupBtn,
    k: common_vendor.o((...args) => $options.giveup && $options.giveup(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Sylvie/Documents/HBuilderProjects/miniprogram/pages/page1/index.vue"]]);
wx.createPage(MiniProgramPage);
