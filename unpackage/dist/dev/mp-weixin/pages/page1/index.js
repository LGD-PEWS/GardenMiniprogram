"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniGetbatteryinfo_utssdk_mpWeixin_index = require("../../uni_modules/uni-getbatteryinfo/utssdk/mp-weixin/index.js");
const _sfc_main = {
  data() {
    return {
      speaker: "开始吧...",
      speakerText: [],
      timer: "",
      speakerTimer: "",
      finalMinute: 0,
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
      plant: "/static/plants/plant0.png",
      // 手机战斗力
      benchmarkLevel: "0",
      // 植物年龄
      age: 0
    };
  },
  onLoad() {
    common_vendor.index.$on("useThisPlant", (res) => {
      console.log("plantUrl", res.url);
      this.plantUrl = res.url;
      this.plant = res.url;
    });
  },
  watch: {
    minute: function(val, oldVal) {
      this.sliderCount++;
      if (this.sliderCount > 80) {
        this.speakerVibrate("不要划着玩^_^");
      } else if (this.startBtn) {
        common_vendor.index.vibrateShort({});
      }
      console.log("val", val);
      if (val < 40) {
        this.plant = "/static/plants/seed0.png";
      } else if (val < 80) {
        this.plant = "/static/plants/seed1.png";
      } else {
        this.plant = this.plantUrl;
      }
    }
  },
  mounted() {
    common_vendor.wx$1.getSystemInfo({
      success(res) {
        this.benchmarkLevel = res.benchmarkLevel;
        console.log("手机战斗力", res.benchmarkLevel);
      }
    });
    this.speakerText = ["全是bug...", "怎么回事呢...", "好想玩...", "我来讲个鬼故事...", `您的手机战斗力:${this.benchmarkLevel}`];
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
      this.minute = 0;
      this.timer = setInterval(() => {
        if (this.second < 59) {
          this.second++;
        } else if (this.second == 59 && this.minute < this.finalMinute) {
          this.second = 0;
          this.minute++;
        } else {
          common_vendor.index.$emit("newGardenPlant", {
            url: this.plant,
            time: this.getTime(),
            age: this.age
          });
          common_vendor.index.$emit("getGold", {
            gold: this.age
          });
          this.giveup();
          return;
        }
      }, 100);
      this.speakerNormal();
    },
    giveup: function() {
      clearInterval(this.timer);
      this.giveupBtn = false;
      this.startBtn = true;
      this.minute = this.finalMinute;
      this.second = 0;
      this.speakerReset();
      clearInterval(this.speakerTimer);
    },
    sliderChanging: function(event) {
      this.minute = event.detail.value;
    },
    sliderChange: function(event) {
      this.sliderCount = 0;
      this.speakerReset();
      this.minute = event.detail.value;
      this.finalMinute = event.detail.value;
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
        this.speaker = this.random(text);
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
        this.speaker = this.random(this.speakerText);
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
    },
    random: function(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getTime: function() {
      var date = new Date(), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(), minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(), second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      month >= 1 && month <= 9 ? month = "0" + month : "";
      day >= 0 && day <= 9 ? day = "0" + day : "";
      var timer = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
      return timer;
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
    a: common_vendor.t($data.speaker),
    b: common_vendor.o((...args) => $options.clickSpeaker && $options.clickSpeaker(...args)),
    c: common_vendor.t($data.minute < 10 ? "0" + $data.minute : $data.minute),
    d: common_vendor.t($data.second < 10 ? "0" + $data.second : $data.second),
    e: $data.plant,
    f: _ctx.index,
    g: common_vendor.p({
      index: _ctx.index
    }),
    h: common_vendor.p({
      column: 2,
      highlight: false,
      showBorder: false
    }),
    i: $data.startBtn,
    j: $data.minute,
    k: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    l: common_vendor.o((...args) => $options.sliderChanging && $options.sliderChanging(...args)),
    m: $data.giveupBtn,
    n: $data.giveupBtn,
    o: $data.minute,
    p: $data.finalMinute,
    q: $data.startBtn,
    r: common_vendor.o((...args) => $options.start && $options.start(...args)),
    s: $data.giveupBtn,
    t: common_vendor.o((...args) => $options.giveup && $options.giveup(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Sylvie/Documents/HBuilderProjects/miniprogram/pages/page1/index.vue"]]);
wx.createPage(MiniProgramPage);
