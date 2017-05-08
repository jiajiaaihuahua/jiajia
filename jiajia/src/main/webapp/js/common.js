//返回
function back(){
	window.history.back();
}
/*页面加载中，无遮罩 zhujj*/
function loading(content){
	var tp = document.createElement("div");
	tp.id="mytips";
	tp.innerHTML="<img src='images/5-121204193R7.gif' />&nbsp;"+content;
	var cw=document.documentElement.clientWidth || document.body.clientWidth;
	var ch=document.documentElement.clientHeight || document.body.clientHeight;
	var st=document.documentElement.scrollTop || document.body.scrollTop;
	tp.style.left=(cw-200)/2;
	tp.style.top=(ch-40)/2+st;
	tp.style.position='absolute';
	document.body.appendChild(tp);
}
/*创建蒙板*/
function createMask(ids){
	var doc;
	//判断浏览器
	if (document.all) {doc = window.parent.frames[ids].document;} 
	else {doc = window.parent.getElementById(ids).contentDocument;}
	var divs = doc.createElement("div");
	divs.className="maskDiv";
	divs.id = "maskDiv";
	//判断< !DOCTYPE..>
	var ch=doc.documentElement.clientHeight || doc.body.clientHeight;
	var st=doc.documentElement.scrollTop || doc.body.scrollTop;
	divs.style.height=(ch+st)+"px";
	doc.body.appendChild(divs);
}
// 项目中返回按钮要求返回到之前带参数的页面 by zhujj 
function gotoUrl(url){
//	location.href=url+(url.indexOf("?")>0?'':'?')+'&preURL='+escape(location.href.indexOf('preURL')>0?location.href.substring(0,location.href.indexOf('preURL')-1):location.href);
	var f = document.createElement('form');
	f.action = url;
	f.method = 'post';
	document.body.appendChild(f);
	var temp=document.createElement('input');
	temp.type= 'hidden';
	temp.value = location.href;	//.indexOf('preURL')>0?location.href.substring(0,location.href.indexOf('preURL')-1):location.href;
	temp.name='preURL';
	f.appendChild(temp);
	f.submit();
}
function gotoMarkUrl(url,mark){
//	location.href=url+(url.indexOf("?")>0?'':'?')+'&preURL='+escape(location.href.indexOf('preURL')>0?location.href.substring(0,location.href.indexOf('preURL')-1):location.href)+';'+mark;
	var f= document.createElement('form');
	f.action = url;
	f.method = 'post';
	document.body.appendChild(f);
	var temp=document.createElement('input');
	temp.type= 'hidden';
	temp.value= location.href.indexOf('preURL')>0?location.href.substring(0,location.href.indexOf('preURL')-1):location.href+';'+mark; 
	temp.name='preURL';
	f.appendChild(temp);
	f.submit();
}
function delExcelObject(className,oid){
	Dialog.confirm("确定删除该条记录吗?", function() {
		var url = 'deleteExcelObject.action?className='+className+'&oid='+oid;
		gotoUrl(url);
	});
}
function DateUtil() {} /***功能:格式化时间*示例:DateUtil.Format("yyyy/MM/dd","Thu Nov 9 20:30:37 UTC+0800 2006 ");*返回:2006/11/09*/
DateUtil.Format = function (fmtCode, date) {
	var result, d, arr_d;
	var patrn_now_1 = /^y{4}-M{2}-d{2}\sh{2}:m{2}:s{2}$/;
	var patrn_now_11 = /^y{4}-M{1,2}-d{1,2}\sh{1,2}:m{1,2}:s{1,2}$/;
	var patrn_now_2 = /^y{4}\/M{2}\/d{2}\sh{2}:m{2}:s{2}$/;
	var patrn_now_22 = /^y{4}\/M{1,2}\/d{1,2}\sh{1,2}:m{1,2}:s{1,2}$/;
	var patrn_now_3 = /^y{4}年M{2}月d{2}日\sh{2}时m{2}分s{2}秒$/;
	var patrn_now_33 = /^y{4}年M{1,2}月d{1,2}日\sh{1,2}时m{1,2}分s{1,2}秒$/;
	var patrn_date_1 = /^y{4}-M{2}-d{2}$/;
	var patrn_date_11 = /^y{4}-M{1,2}-d{1,2}$/;
	var patrn_date_2 = /^y{4}\/M{2}\/d{2}$/;
	var patrn_date_22 = /^y{4}\/M{1,2}\/d{1,2}$/;
	var patrn_date_3 = /^y{4}年M{2}月d{2}日$/;
	var patrn_date_33 = /^y{4}年M{1,2}月d{1,2}日$/;
	var patrn_time_1 = /^h{2}:m{2}:s{2}$/;
	var patrn_time_11 = /^h{1,2}:m{1,2}:s{1,2}$/;
	var patrn_time_2 = /^h{2}时m{2}分s{2}秒$/;
	var patrn_time_22 = /^h{1,2}时m{1,2}分s{1,2}秒$/;
	if (!fmtCode) {
		fmtCode = "yyyy/MM/dd hh:mm:ss";
	}
	if (date) {
		d = new Date(date);
		if (isNaN(d)) {
			msgBox("时间参数非法\n正确的时间示例:\nThu Nov 9 20:30:37 UTC+0800 2006\n或\n2006/ 10/17");
			return;
		}
	} else {
		d = new Date();
	}
	if (patrn_now_1.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.yyyy + "-" + arr_d.MM + "-" + arr_d.dd + " " + arr_d.hh + ":" + arr_d.mm + ":" + arr_d.ss;
	} else if (patrn_now_11.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.yyyy + "-" + arr_d.MM + "-" + arr_d.dd + " " + arr_d.hh + ":" + arr_d.mm + ":" + arr_d.ss;
	} else if (patrn_now_2.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.yyyy + "/" + arr_d.MM + "/" + arr_d.dd + " " + arr_d.hh + ":" + arr_d.mm + ":" + arr_d.ss;
	} else if (patrn_now_22.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.yyyy + "/" + arr_d.MM + "/" + arr_d.dd + " " + arr_d.hh + ":" + arr_d.mm + ":" + arr_d.ss;
	} else if (patrn_now_3.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.yyyy + "年" + arr_d.MM + "月" + arr_d.dd + "日" + " " + arr_d.hh + "时" + arr_d.mm + "分" + arr_d.ss + "秒";
	} else if (patrn_now_33.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.yyyy + "年" + arr_d.MM + "月" + arr_d.dd + "日" + " " + arr_d.hh + "时" + arr_d.mm + "分" + arr_d.ss + "秒";
	} else if (patrn_date_1.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.yyyy + "-" + arr_d.MM + "-" + arr_d.dd;
	} else if (patrn_date_11.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.yyyy + "-" + arr_d.MM + "-" + arr_d.dd;
	} else if (patrn_date_2.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.yyyy + "/" + arr_d.MM + "/" + arr_d.dd;
	} else if (patrn_date_22.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.yyyy + "/" + arr_d.MM + "/" + arr_d.dd;
	} else if (patrn_date_3.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.yyyy + "年" + arr_d.MM + "月" + arr_d.dd + "日";
	} else if (patrn_date_33.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.yyyy + "年" + arr_d.MM + "月" + arr_d.dd + "日";
	} else if (patrn_time_1.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.hh + ":" + arr_d.mm + ":" + arr_d.ss;
	} else if (patrn_time_11.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.hh + ":" + arr_d.mm + ":" + arr_d.ss;
	} else if (patrn_time_2.test(fmtCode)) {
		arr_d = splitDate(d, true);
		result = arr_d.hh + "时" + arr_d.mm + "分" + arr_d.ss + "秒";
	} else if (patrn_time_22.test(fmtCode)) {
		arr_d = splitDate(d);
		result = arr_d.hh + "时" + arr_d.mm + "分" + arr_d.ss + "秒";
	} else {
		msgBox("没有匹配的时间格式!");
		return;
	}
	return result;
};

function splitDate(d, isZero) {
	var yyyy, MM, dd, hh, mm, ss;
	if (isZero) {
		yyyy = d.getYear();
		MM = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
		dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
		hh = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
		mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
		ss = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
	} else {
		yyyy = d.getYear();
		MM = d.getMonth() + 1;
		dd = d.getDate();
		hh = d.getHours();
		mm = d.getMinutes();
		ss = d.getSeconds();
	}
	return {
		"yyyy": yyyy,
		"MM": MM,
		"dd": dd,
		"hh": hh,
		"mm": mm,
		"ss": ss
	};
}
function initTableTitle(tableId) {
	initTableTitleStandard(tableId, false);
}
function initTableTitleNoPage(tableId) {
	initTableTitleStandard(tableId, true);
}
function initTableTitleStandard(tableId, pageFlag) {
	var mytable = document.getElementById(tableId);
	if(mytable != null) {
		var tableRowLength = mytable.rows.length;
		var flag = navigator.appName.indexOf("Explorer") > -1;
		for(var i = 1; i < tableRowLength; i++) {
			if(pageFlag || i != tableRowLength - 1) {
				var tableCellLength = mytable.rows[i].cells.length;
				for(var j = 0; j < tableCellLength-1; j++) {
					if(j!=0){
						if(!flag)
							mytable.rows[i].cells[j].title = mytable.rows[i].cells[j].textContent;
						else 
							mytable.rows[i].cells[j].title = mytable.rows[i].cells[j].innerText;
					}
				}
			}
		}
	}
}

//分页使用方法
function addPage(url) {
	paginationArray[pagination_max] = url;
	pagination_max = pagination_max + 1;
}

function skipToPage(p, pageMax, url1) {
	if (!(/^([1-9][0-9]*)$/.test(p))) {
		document.getElementById('page').value = '';
		Dialog.alertFocus("请输入页数必须为正整数！","page");
		return false;
	}

	if (eval(p) > eval(pageMax)) {
		document.getElementById('page').value = '';
		Dialog.alertFocus('输入的页面不能大于最大页数','page');
		return false;
	}
	var m = url1.indexOf('page=');
	this.location.href = url1.substring(0, m) + 'page=' + p + '&amp;pageIds=' + p;
}


//数字金额自动转换成大写 begin
function amountToChinese(p_amount) {
		var p_array = new Array();
		var mo_array = new Array("","\u4e07","\u4ebf");
		var tmpNumber = 0, i = 0;
		var dollar = "", cent = "", transNumber = "";
		if (isNaN(p_amount)) return ""; //如果不是数字则直接返回空字符串
		if (p_amount.substr(0,1)=="-") return ""; //如果是负值也不予处理直接返回
		p_array = p_amount.split(".");
		if (p_array.length == 2) { //有小数部分
			if (p_array[1].length > 2) return ""; //小数部分超过三位，不予转换
			tmpNumber = parseInt(p_array[1]);
			if (tmpNumber != "0") {
				if (p_array[1].length == 1) tmpNumber = tmpNumber * 10;
				
				cent += amountToChineseSimpleNumber(parseInt(tmpNumber/10), "\u89d2"); //角
				cent += amountToChineseSimpleNumber(tmpNumber % 10, "\u5206"); //分
				if (cent.substr(cent.length-1,1)=="\u96f6") { //去末尾的零
					cent = cent.substr(0,cent.length-1);
				}
			}
		}
		transNumber = p_array[0];
		p_array.length = 0;
		if (parseInt(transNumber)>0) {
			do {
				if (transNumber.length<5) {
					p_array[i++] = transNumber;
					transNumber = "";
				} else {
					p_array[i++] = transNumber.substr(transNumber.length-4,4);
					transNumber = transNumber.substr(0,transNumber.length-4);
				}
			} while (transNumber.length>0);
		}
		i = 0;
		for (i=0;i<p_array.length;i++) {
			dollar = transFourBit(p_array[i],mo_array[i]) + dollar;
		}
		dollar = fixedNumber(dollar);
		if (dollar.length==0) {
			transNumber = cent;
		} else {
			transNumber = dollar + "\u5143" + cent;
		}
		transNumber += "\u6574";
		return transNumber.replace(/^\u96f6/,"");
	}
	
	function amountToChineseSimpleNumber(n,m) {
		var simpleNumber = new Array("\u96f6","\u58f9","\u8d30","\u53c1","\u8086","\u4f0d","\u9646","\u67d2","\u634c","\u7396");
		var aNumber = parseInt(n);
		
		if (aNumber==0) {
			return "\u96f6";
		} else {
			return simpleNumber[aNumber]+m;
		}
	}
	
	function transFourBit(n,m) {
		var tmpNumber = "";
		var aTmp = 0;
		var resultChar = "";
		var ttlLength = 0;
		aTmp = parseInt(n);
		tmpNumber = aTmp + ""; //去除前导零
		ttlLength = tmpNumber.length;
		if (ttlLength>3) {
			resultChar = amountToChineseSimpleNumber(tmpNumber.substr(0,1),"\u4edf"); //千
			tmpNumber = tmpNumber.substr(1,3);
		}
		if (ttlLength>2) {
			resultChar += amountToChineseSimpleNumber(tmpNumber.substr(0,1),"\u4f70"); //百
			tmpNumber = tmpNumber.substr(1,2);
		}
		if (ttlLength>1) {
			resultChar += amountToChineseSimpleNumber(tmpNumber.substr(0,1),"\u62fe"); //十
			tmpNumber = tmpNumber.substr(1,1);
		}
		resultChar += amountToChineseSimpleNumber(tmpNumber.substr(0,1),""); //个位
		if (ttlLength<4) resultChar = "\u96f6" + resultChar;
		resultChar = fixedNumber(resultChar);
		if (resultChar == "") { //如果什么都没有剩下，则直接返回零
			return "\u96f6";
		} else {
			return resultChar + m;
		}
	}
	
	function fixedNumber(n) {
		var a = "";
		a = n;
		// 先去除连续重复的零
		do {
			n = a;
			a = n.replace("\u96f6\u96f6","\u96f6");
		} while (n!=a);
		//再去除结尾的零
		n = n.replace(/\u96f6$/,"");
		return n;
	}
//数字金额自动转换成大写 end
	
//建言献策 异步提交
function themeSubmit(){
	var replayContent = document.getElementById('replayContent').value;
	var themeId = document.getElementById('themeId').value;
	var sort = 0;//废弃字段
	var flag = false;
	if(replayContent.length != 0 && replayContent.length <=200){
		flag=true;
	}
	if(!flag){
		Dialog.alertFocus("请输入内容且不能超过200个汉字！");
        return false;
	}
	WebDwr.themeSuggestAdd(replayContent,themeId,sort,function(flag){
		if(flag){
			Dialog.alertFocus("提交成功！");
			document.getElementById("replayContent").value = '';
		}
	});
}