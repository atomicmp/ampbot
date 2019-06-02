"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomString = function (len, bits) {
    if (len === void 0) { len = 4; }
    if (bits === void 0) { bits = 16; }
    bits = bits || 36;
    var outStr = "";
    var newStr;
    while (outStr.length < len) {
        newStr = Math.random()
            .toString(bits)
            .slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
    }
    return outStr.toUpperCase();
};
function generateKey() {
    return ("AMP-" +
        randomString(4, 16) +
        "-" +
        randomString(4, 16) +
        "-" +
        randomString(4, 16) +
        "-" +
        randomString(4, 16));
}
exports.default = generateKey;
