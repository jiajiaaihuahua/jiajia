// JavaScript Document
function $i(id){
	return document.getElementById(id);
}
function tabswitch(c){
	this.container_1 = $i(c);
	this.pause = false;
	this.nexttb = 1;
	this.tabs = this.container_1.getElementsByTagName('dt');
	var _this = this;
	if(this.tabs.length<1)this.tabs = this.container_1.getElementsByTagName('li');
	for(var i = 0; i < this.tabs.length; i++){
		var _ec = this.tabs[i].getElementsByTagName('span');
		if(_ec.length<1)_ec = this.tabs[i].getElementsByTagName('a');
		if(_ec.length<1){
			_ec = this.tabs[i]
		}else{
			_ec = _ec[0];
		}
		_ec.onclick = function(e) {
			_this.pause = true;
			var ev = !e ? window.event : e;
			$(_this.container_1).find('a').css('color','#575656');
			$(ev.srcElement ? ev.srcElement : ev.target).css('color','#084d72');
			$('#ifc').attr('src','queryWebNewsInfoList.action?webColumnId='+$(ev.srcElement ? ev.srcElement : ev.target).attr('id'));
			$('#ifc_product').attr('src','queryProductShowList.action?webColumnId='+$(ev.srcElement ? ev.srcElement : ev.target).attr('id'));
			$('#ifc_case').attr('src','querySuccessfulCaseList.action?webColumnId='+$(ev.srcElement ? ev.srcElement : ev.target).attr('id'));
			$('#ifc_customer').attr('src','getCustomerServiceDetail.action?webColumnId='+$(ev.srcElement ? ev.srcElement : ev.target).attr('id'));
			$('#ifc_company').attr('src','getCompanyProfileDetail.action?webColumnId='+$(ev.srcElement ? ev.srcElement : ev.target).attr('id'));
			$('#ifc_zf').attr('src','getHandInHandWithUsDetail.action?webColumnId='+$(ev.srcElement ? ev.srcElement : ev.target).attr('id'));
			$('#ifc_connect').attr('src','queryConnectUsList.action?webColumnId='+$(ev.srcElement ? ev.srcElement : ev.target).attr('id'));
			
			var txt = $(ev.srcElement ? ev.srcElement : ev.target).html();//add by shimh
			 $('#text').text(txt); //add by shimh
			_this.start(ev, false, null);
		};
		
		_ec.onmouseout = function() {
			_this.pause = false;
		};
		
		try{
			$i(this.tabs[i].id + '_body').onclick = function(){
				_this.pause = true;
			};
			$i(this.tabs[i].id + '_body').onmouseout = function(){
				_this.pause = false;
			};
		}catch(e){}
	}
 
	if ($i(c + '_sts')) {
		var _sts = $i(c + '_sts');
		var _step = _sts.getElementsByTagName('li');
		if(_step.length<1)_step = _sts.getElementsByTagName('div');
		_step[0].onclick = function() {
			if (_this.tabs[_this.tabs.length-1].className.indexOf() > -1) {
				_this.nexttb = _this.tabs.length + 1;
			};
			_this.nexttb = _this.nexttb - 2 < 1 ? _this.tabs.length : _this.nexttb - 2;
			//alert(_this.nexttb);
			_this.start(null, null, _this.nexttb);
		};
		
		_step[1].onclick = function() {
			_this.nexttb = _this.nexttb < 1 ? 1 : _this.nexttb;
			_this.start(null, null, _this.nexttb);
		};
	};
	
	this.start = function(e, r, n){
		if(_this.pause && !e)return;
		if(r){
			curr_tab = $i(_this.container_1.id + '_' + rand(4));
		}else{
			if(n){				
				curr_tab = $i(_this.container_1.id + '_' + _this.nexttb);
			}else{
				curr_tab = e.target ? e.target : e.srcElement;
				if(curr_tab.id=="")curr_tab = curr_tab.parentNode;
			}
		}
		
		var tb = curr_tab.id.split("_");
		for(var i = 0; i < _this.tabs.length; i++){
			if(_this.tabs[i]==curr_tab){
				_this.tabs[i].className="";
				try{					
					$i(_this.tabs[i].id + '_body').style.display = "block";
				}catch(e){}
			}else{
				_this.tabs[i].className="";
				try{
					$i(_this.tabs[i].id + '_body').style.display = "none";
				}catch(e){}
			}
		}
		_this.nexttb = parseInt(tb[tb.length-1]) >= _this.tabs.length ? 1 : parseInt(tb[tb.length-1]) + 1;
	};
}
//设置
var tab1,tab2,tab3,tab4,tab5;
function init_load(){
    if ($i('tab1')) {
    	tab1 = new tabswitch('tab1');
	}
	if ($i('tab2')) {
		tab2 = new tabswitch('tab2');
	}
		if ($i('tab3')) {
		tab3 = new tabswitch('tab3');
	}
		if ($i('tab4')) {
		tab4 = new tabswitch('tab4');
	}
		if ($i('tab5')) {
		tab5 = new tabswitch('tab5');
	}
}
if(window.attachEvent){
    window.attachEvent("onload",init_load);
}else if(window.addEventListener){
    window.addEventListener("load",init_load,false);
}