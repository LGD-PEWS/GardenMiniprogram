"use strict";
const common_vendor = require("../../../../common/vendor.js");
function getBatteryInfo(options) {
  return common_vendor.wx$1.getBatteryInfo(options);
}
exports.getBatteryInfo = getBatteryInfo;
