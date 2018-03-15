(function(root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], factory);
	} else {
		factory(root.jQuery);
	}
}(this, function($) {

	$.ts = {
		// 根据name读取cookie
		getCookie : function(name) {
			var arr = document.cookie.replace(/\s/g, "").split(';');
			for (var i = 0; i < arr.length; i++) {
				var tempArr = arr[i].split('=');
				if (tempArr[0] == name) {
					return decodeURIComponent(tempArr[1]);
				}
			}
			return '';
		},
		// 设置Cookie
		setCookie : function(name, value, days) {
			var date = new Date();
			date.setDate(date.getDate() + days);
			document.cookie = name + '=' + value + ';expires=' + date;
		},
		// 判断是否为身份证号
		isIdCard : function(str) {
			 return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
		},
		//判断是否邮件
		isEmail:function(str) {
		    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
		},
		//判断是否为手机号
		isPhoneNum:function(str) {
		    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
		},
		//判断是否为URL地址
		isUrl:function(str) {
		    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
		},
		// 获取浏览器类型和版本
		getExplore : function() {
			var sys = {}, ua = navigator.userAgent.toLowerCase(), s;
			(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] : (s = ua
					.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] : (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] : (s = ua
					.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] : (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] : (s = ua
					.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
			// 根据关系进行判断
			if (sys.ie)
				return ('IE: ' + sys.ie)
			if (sys.edge)
				return ('EDGE: ' + sys.edge)
			if (sys.firefox)
				return ('Firefox: ' + sys.firefox)
			if (sys.chrome)
				return ('Chrome: ' + sys.chrome)
			if (sys.opera)
				return ('Opera: ' + sys.opera)
			if (sys.safari)
				return ('Safari: ' + sys.safari)
			return 'Unkonwn'
		},
		// 获取操作系统类型
		getOS : function() {
			var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
			var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
			var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
			if (/mac/i.test(appVersion))
				return 'mac'
			if (/win/i.test(appVersion))
				return 'windows'
			if (/linux/i.test(appVersion))
				return 'linux'
			if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent))
				'ios'
			if (/android/i.test(userAgent))
				return 'android'
			if (/win/i.test(appVersion) && /phone/i.test(userAgent))
				return 'win-phone'
		},
		// 加
		floatAdd : function(arg1, arg2) {
			var r1, r2, m;
			try {
				r1 = arg1.toString().split(".")[1].length;
			} catch (e) {
				r1 = 0;
			}
			try {
				r2 = arg2.toString().split(".")[1].length;
			} catch (e) {
				r2 = 0;
			}
			m = Math.pow(10, Math.max(r1, r2));
			return (arg1 * m + arg2 * m) / m;
		},
		// 减
		floatSub : function(arg1, arg2) {
			var r1, r2, m, n;
			try {
				r1 = arg1.toString().split(".")[1].length;
			} catch (e) {
				r1 = 0;
			}
			try {
				r2 = arg2.toString().split(".")[1].length;
			} catch (e) {
				r2 = 0;
			}
			m = Math.pow(10, Math.max(r1, r2));
			n = (r1 >= r2) ? r1 : r2;
			return ((arg1 * m - arg2 * m) / m).toFixed(n);
		},
		// 乘
		floatMul : function(arg1, arg2) {
			var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
			try {
				m += s1.split(".")[1].length;
			} catch (e) {
			}
			try {
				m += s2.split(".")[1].length;
			} catch (e) {
			}
			return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
		},
		// 除
		floatDiv : function(arg1, arg2) {
			var t1 = 0, t2 = 0, r1, r2;
			try {
				t1 = arg1.toString().split(".")[1].length;
			} catch (e) {
			}
			try {
				t2 = arg2.toString().split(".")[1].length;
			} catch (e) {
			}
			with (Math) {
				r1 = Number(arg1.toString().replace(".", ""));
				r2 = Number(arg2.toString().replace(".", ""));
				return (r1 / r2) * pow(10, t2 - t1);
			}
		},
		// 设置精度
		setScale : function(value, scale, roundingMode) {
			if (roundingMode == "roundhalfup") {
				return (Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
			} else if (roundingMode == "roundup") {
				return (Math.ceil(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
			} else {
				return (Math.floor(value * Math.pow(10, scale)) / Math.pow(10, scale)).toFixed(scale);
			}
		},
		//现金额转大写
		digitUppercase : function(n) {
			var fraction = [ '角', '分' ];
			var digit = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ];
			var unit = [ [ '元', '万', '亿' ], [ '', '拾', '佰', '仟' ] ];
			var head = n < 0 ? '欠' : '';
			n = Math.abs(n);
			var s = '';
			for (var i = 0; i < fraction.length; i++) {
				s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
			}
			s = s || '整';
			n = Math.floor(n);
			for (var i = 0; i < unit[0].length && n > 0; i++) {
				var p = '';
				for (var j = 0; j < unit[1].length && n > 0; j++) {
					p = digit[n % 10] + unit[1][j] + p;
					n = Math.floor(n / 10);
				}
				s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
			}
			return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
		},
		//格式化${startTime}距现在的已过时间
		formatPassTime:function (startTime) {
		    var currentTime = Date.parse(new Date()),
		        time = currentTime - startTime,
		        day = parseInt(time / (1000 * 60 * 60 * 24)),
		        hour = parseInt(time / (1000 * 60 * 60)),
		        min = parseInt(time / (1000 * 60)),
		        month = parseInt(day / 30),
		        year = parseInt(month / 12);
		    if (year) return year + "年前"
		    if (month) return month + "个月前"
		    if (day) return day + "天前"
		    if (hour) return hour + "小时前"
		    if (min) return min + "分钟前"
		    else return '刚刚'
		},
		//格式化现在距${endTime}的剩余时间
		formatRemainTime:function(endTime) {
		    var startDate = new Date(); //开始时间
		    var endDate = new Date(endTime); //结束时间
		    var t = endDate.getTime() - startDate.getTime(); //时间差
		    var d = 0,
		        h = 0,
		        m = 0,
		        s = 0;
		    if (t >= 0) {
		        d = Math.floor(t / 1000 / 3600 / 24);
		        h = Math.floor(t / 1000 / 60 / 60 % 24);
		        m = Math.floor(t / 1000 / 60 % 60);
		        s = Math.floor(t / 1000 % 60);
		    }
		    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
		},
		dateToString : function(date) {
			return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		},
		getSysDate : function() {
			return new Date().format('yyyy-MM-dd');
		},
		stringToDate : function(date) {
			var dateParts = date.split("-");
			if (dateParts == date)
				dateParts = date.split("/");
			return new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
		},
		replaceAll: function (Source, stringToFind, stringToReplace) {
            var temp = Source;
            var index = temp.indexOf(stringToFind);
            while (index != -1) {
                temp = temp.replace(stringToFind, stringToReplace);
                index = temp.indexOf(stringToFind);
            }
            return temp;
        },
		isBlank : function(value) {
			return $.trim(value) === '' ? true : false;
		},
		//判断`obj`是否为空
		isEmptyObject:function (obj) {
		    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
		        return false
		    return !Object.keys(obj).length
		}
	};
}));