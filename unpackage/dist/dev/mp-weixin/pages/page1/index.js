"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniGetbatteryinfo_utssdk_mpWeixin_index = require("../../uni_modules/uni-getbatteryinfo/utssdk/mp-weixin/index.js");
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
      sliderCount: 0,
      // 电池电量检测
      betteryIsChecked: false,
      // 电池充电检测
      betteryIsChargingIsChecked: false
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
    setInterval(() => {
      this.getBattery();
    }, 5e3);
  },
  methods: {
    start: function() {
      if (this.minute == 0) {
        this.speakerVibrate(["请先设置时间!", "请先设置时间!!", "请先设置时间!!!"]);
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
      this.speakerNormal();
    },
    giveup: function() {
      this.giveupBtn = false;
      this.startBtn = true;
      this.minute = 0;
      this.second = 0;
      this.speakerReset();
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
      this.speakerReset();
      this.minute = event.detail.value;
    },
    clickSpeaker: function() {
      this.sliderCount++;
      if (this.sliderCount == 20) {
        common_vendor.wx$1.exitMiniProgram();
      } else if (this.sliderCount == 18) {
        this.speakerVibrate("再见 XD", 1e8);
      } else if (this.sliderCount == 10) {
        this.speakerVibrate("再点我要生气了");
      } else if (this.sliderCount == 4) {
        this.speakerVibrate("别点我了 :D");
      }
    },
    speakerVibrate: function(text, time) {
      if (typeof text == "string") {
        this.speaker = text;
      }
      if (typeof text == "object") {
        this.speaker = text[Math.floor(Math.random() * text.length)];
      }
      common_vendor.index.vibrateShort({});
      if (!this.startBtn) {
        clearInterval(this.speakerTimer);
        this.speakerTimer = setTimeout(() => {
          this.speakerNormal();
        }, time ? time : 3e3);
      } else {
        clearInterval(this.speakerTimer);
        this.speakerTimer = setTimeout(() => {
          this.speakerReset();
        }, time ? time : 3e3);
      }
    },
    speakerReset: function() {
      this.speaker = "开始吧...";
    },
    // 正常说话
    speakerNormal: function() {
      this.speakerTimer = setInterval(() => {
        this.speaker = this.speakerText[Math.floor(Math.random() * this.speakerText.length)];
      }, 8e3);
    },
    getBattery: function() {
      uni_modules_uniGetbatteryinfo_utssdk_mpWeixin_index.getBatteryInfo({
        success: (res) => {
          if (res.level <= 20 && !res.isCharging && !this.betteryIsChecked) {
            this.speakerVibrate("快要没电了...");
          }
          if (res.level <= 20 && res.isCharging && !this.betteryIsChargingIsChecked) {
            this.speakerVibrate("好耶有电了！");
            this.betteryIsChargingIsChecked = true;
            this.betteryIsChecked = true;
          }
          if (res.level >= 80) {
            this.betteryIsChecked = false;
            this.betteryIsChargingIsChecked = false;
          }
        }
      });
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
