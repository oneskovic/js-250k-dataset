(function() {
  module.exports = {
    android: {
      prefix: "-webkit-",
      minor: true,
      future: ["4.4.3"],
      versions: ["4.4", "4.3", "4.2", "4.1", "4", "3", "2.3", "2.2", "2.1"],
      popularity: [0.578839, 0.92955, 0.92955, 2.28131, 0.912523, 0.00680987, 1.1032, 0.0680987, 0.0204296]
    },
    bb: {
      prefix: "-webkit-",
      minor: true,
      versions: ["10", "7"],
      popularity: [0, 0.106132]
    },
    chrome: {
      prefix: "-webkit-",
      future: ["38", "37", "36"],
      versions: ["35", "34", "33", "32", "31", "30", "29", "28", "27", "26", "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4"],
      popularity: [7.05523, 22.7781, 1.19654, 0.554496, 0.65664, 0.21888, 0.372096, 0.153216, 0.539904, 0.175104, 0.058368, 0.051072, 0.051072, 0.10944, 0.423168, 0.029184, 0.014592, 0.058368, 0.021888, 0.029184, 0.03648, 0.029184, 0.03648, 0.043776, 0.10944, 0.029184, 0.014592, 0.014592, 0.014592, 0.021888, 0.014592, 0.021888]
    },
    ff: {
      prefix: "-moz-",
      future: ["32", "31", "30"],
      versions: ["29", "28", "27", "26", "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3.6", "3.5", "3", "2"],
      popularity: [8.28826, 3.52397, 0.277248, 0.21888, 0.124032, 0.233472, 0.087552, 0.102144, 0.262656, 0.080256, 0.065664, 0.058368, 0.087552, 0.10944, 0.065664, 0.058368, 0.058368, 0.138624, 0.058368, 0.065664, 0.029184, 0.043776, 0.021888, 0.03648, 0.021888, 0.03648, 0.175104, 0.021888, 0.07296, 0.014592]
    },
    ie: {
      prefix: "-ms-",
      versions: ["11", "10", "9", "8", "7", "6", "5.5"],
      popularity: [7.01468, 2.71315, 2.65995, 4.37752, 0.136798, 0.250796, 0.009298]
    },
    ios: {
      prefix: "-webkit-",
      future: ["8"],
      versions: ["7.0", "6.1", "6.0", "5.1", "5.0", "4.3", "4.2", "4.1", "4.0", "3.2"],
      popularity: [5.17486, 0.324933, 0.324933, 0.084242, 0.084242, 0.01805185, 0.01805185, 0.00300864, 0.00300864, 0]
    },
    opera: {
      prefix: "-o-",
      future: ["23", "22"],
      versions: ["21", "20", "19", "18", "17", "16", "15", "12.1", "12", "11.6", "11.5", "11.1", "11", "10.6", "10.5", "10.1", "10.0", "9.6", "9.5"],
      popularity: [0.313728, 0.1824, 0.021888, 0.021888, 0.014592, 0.007296, 0.007296, 0.342912, 0.021888, 0.014592, 0.007296, 0.008219, 0.014996, 0.007296, 0.008392, 0.003648, 0.003648, 0.003648, 0.003648]
    },
    safari: {
      prefix: "-webkit-",
      future: ["8"],
      versions: ["7", "6.1", "6", "5.1", "5", "4", "3.2", "3.1"],
      popularity: [1.61242, 0.627456, 0.372096, 0.7296, 0.211584, 0.102144, 0.008692, 0]
    }
  };

}).call(this);
