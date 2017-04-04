$(function(){
	//top部分
	//扫描二维码
	var $phoneC=$("#phoneC");
	$phoneC.mouseenter(function(){
		$(this).find(".phoneC:first").css({"color":"#dc1259","background":"url(img/mobile_s.png) no-repeat center"});
		$("#ewm").css("display","block");
	}).mouseleave(function(){
		$(this).find(".phoneC:first").css({"color":"#919191","background":"url(img/Mobile_x.gif) no-repeat center"});
		$("#ewm").css("display","none");
	});
	//my2688
	var $my2688=$("#my2688");
	var $list=$("#my2688_1").find("a");
	$my2688.mouseenter(function(){
		$(this).css({"background":"#fff","border":"solid #919191","border-width":"1px 1px 0 1px"});
		$(this).children("a:first").css("color","#dc1259");
		$("#my2688_1").css({"display":"block","background":"#fff","border":"solid #919191","border-width":"0 1px 1px 1px"});
		$list.mouseenter(function(){
			$my2688.children("a:first").css("color","#919191");
			for(var i=0;i<$list.length;i++){
				$list[i].style.color="#919191";
			}
			$(this).css({"color":"#dc1259"});
		});
	}).mouseleave(function(){
		for(var i=0;i<$list.length;i++){
			$list[i].style.color="#919191";
			$my2688.css({"border":"0","background":"#f3f3f3"})
			$my2688.children("a:first").css("color","#919191");
			$("#my2688_1").css({"display":"none"});
		}
		
	});
	//搜索框
	var $logo=$("#logo");
	var $Input=$logo.find("input");
	$Input.click(function(evt){
		var e=evt||event;
		e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		console.log(111)
		if($Input.val()=="奔腾"){
			$Input.val("");
			$Input.css("color","#000");
		}
	});
	$(document).click(function(){
		if($Input.val()==""){
			$Input.val("奔腾");
			$Input.css("color","#919191");
		}
	});
	//city
	var $JS_header_city_char=$("#JS_header_city_char");
	var $cityLetter=$JS_header_city_char.find("a");
	$cityLetter.mouseenter(function(){
		$(this).css({'background':'#d02e2c','color':'#fff'});
		//console.log($cityLetter.index(this));
		var num=$cityLetter.index(this);
		if(num<5){
			$("#JS_header_city_list").parent().css({'top':'-'+51*num+'px'});
			//console.log(1111111)
		}
		else if(num<7){
			//console.log(num)
			$("#JS_header_city_list").parent().css({'top':'-'+(200+38*(num-4))+'px'});	
		}
		else if(num==7){
			$("#JS_header_city_list").parent().css({'top':'-'+330+'px'});
		}
		else if(num==8){
			$("#JS_header_city_list").parent().css({'top':'-'+(416)+'px'});
		}
		else if(num==9){
			$("#JS_header_city_list").parent().css({'top':'-'+(466)+'px'});
		}
		else if(num==10){
			$("#JS_header_city_list").parent().css({'top':'-'+(508)+'px'});
		}
		else if(num==11){
			$("#JS_header_city_list").parent().css({'top':'-'+(577)+'px'});
		}
		else if(num==12){
			$("#JS_header_city_list").parent().css({'top':'-'+(608)+'px'});
		}
		else if(num==13){
			$("#JS_header_city_list").parent().css({'top':'-'+(658)+'px'});
		}
		else if(num==14){
			$("#JS_header_city_list").parent().css({'top':'-'+(700)+'px'});
		}
		else if(num==15){
			$("#JS_header_city_list").parent().css({'top':'-'+(750)+'px'});
		}
		else if(num==16){
			$("#JS_header_city_list").parent().css({'top':'-'+(785)+'px'});
		}
		else if(num==17){
			$("#JS_header_city_list").parent().css({'top':'-'+(855)+'px'});
		}
		else if(num==18 || num==19){
			$("#JS_header_city_list").parent().css({'top':'-'+(860+(num-17)*50)+'px'});
		}
		else if(num==20 || num==21){
			$("#JS_header_city_list").parent().css({'top':'-'+(964)+'px'});
		}
		//console.log($("#JS_header_city_list").parent().css('top'));
		//console.log(Math.abs(parseInt($("#JS_header_city_list").parent().css('top'))*144/964));
		$('#JS_header_city_bar').css('top',Math.abs(parseInt($("#JS_header_city_list").parent().css('top'))*144/964)+'px');
	}).mouseleave(function(){
		$(this).css({'background':'#fff','color':'#d02e2c'})
	});
	//滚动条
	$('#JS_header_city_bar')[0].onmousedown=function(evt){
		var e=evt||event;
		var mousedownY=e.clientY-$('#JS_header_city_bar')[0].offsetTop;
		$('.scrollBody')[0].onmousemove=function(evt){
			//console.log($('#JS_header_city_bar')[0].offsetTop);
			var e=evt||event;
			//console.log(e.clientY)
			$('#JS_header_city_bar')[0].style.top=e.clientY-mousedownY+'px';
			$("#JS_header_city_list").parent().css('top','-'+(($('#JS_header_city_bar')[0].offsetTop)/144*964)+'px');
			if($('#JS_header_city_bar')[0].offsetTop<=0){
				$('#JS_header_city_bar')[0].style.top=0;
				$("#JS_header_city_list").parent().css('top','0');
				//console.log($('#JS_header_city_bar')[0].offsetTop)
			}
			else if($('#JS_header_city_bar')[0].offsetTop>=144){
				$('#JS_header_city_bar')[0].style.top=144+'px';
				$("#JS_header_city_list").parent().css('top','-'+964+'px');
			}
		}
	}
	document.onmouseup=function(evt){
		var e=evt||event;
		$('.scrollBody')[0].onmousemove=null;
	}
  
	function onMouseWheel(evt) {/*当鼠标滚轮事件发生时，执行一些操作*/
        var e = evt || window.event;
        var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
            down = e.wheelDelta?e.wheelDelta<0:e.detail>0;
        if(down){
            if(Math.abs($("#JS_header_city_list").parent()[0].offsetTop)>=945){
            	$("#JS_header_city_list").parent()[0].style.top='-'+964+'px';
            }
            else{	
                $("#JS_header_city_list").parent()[0].style.top = $("#JS_header_city_list").parent()[0].offsetTop-20+'px';
            }
            $('#JS_header_city_bar').css('top',Math.abs(parseInt($("#JS_header_city_list").parent().css('top'))*144/964)+'px');
        }else{
        	if(Math.abs($("#JS_header_city_list").parent()[0].offsetTop)<=19){
        		$("#JS_header_city_list").parent()[0].style.top=0;
        	}
        	else{
                $("#JS_header_city_list").parent()[0].style.top = $("#JS_header_city_list").parent()[0].offsetTop+20+'px';
        	}
        	$('#JS_header_city_bar').css('top',Math.abs(parseInt($("#JS_header_city_list").parent().css('top'))*144/964)+'px');
        }
        if(e.preventDefault){/*FF 和 Chrome*/
            e.preventDefault();// 阻止默认事件
        }
        return false;
	}
    addEvent($('#JS_header_city_bar_box')[0],'mousewheel',onMouseWheel);
    addEvent($('#JS_header_city_bar_box')[0],'DOMMouseScroll',onMouseWheel);
    function addEvent(obj,xEvent,fn) {
        if(obj.attachEvent){
            obj.attachEvent('on'+xEvent,fn);
        }else{
            obj.addEventListener(xEvent,fn,false);
        }
    }
    //setCity
    $('.address').mouseenter(function(){
    	$(this).css({'background':'#dc1259','color':'#fff'});
    	$('#JS_hide_city_menu_11').css({'display':'block'});
    }).mouseleave(function(){
    	$('#JS_hide_city_menu_11').css({'display':'none'});
    	$(this).css({'background':'','color':'#000'});
    });
    $('#JS_hide_city_menu_11').mouseenter(function(){
    	$(this).css({'display':'block'});
    	$('.address').css({'background':'#dc1259','color':'#fff'});
    }).mouseleave(function(){//console.log(11111111)
    	$('.address').css({'background':'','color':'#000'});
    	$(this).css({'display':'none'});
    });
    
    //购物车件数设置
	$('.gouwuche').text('('+shoppingCarNumber+')');
});
function setCity(_self){
	$('#JS_city_current_city').text(_self.innerText);
	$('#logoCon').find(".span1").text($('#JS_city_current_city').text());
	$('.address').css({'background':'','color':'#000'});
	$('#JS_hide_city_menu_11').css({'display':'none'});
}

//获取购物车件数
var shoppingCarNumber=0;
function oShoppingCarNumber(){
	var cookieVal=cookieUtil.getCookie('shoppingCar');
	//console.log(typeof cookieVal);
	if(cookieVal!=''){
		sortCookieVal=JSON.parse(cookieVal);			
	
		//console.log(sortCookieVal.list.length)
		if(sortCookieVal.list.length>0){
			for(var j=0;j<sortCookieVal.list.length;j++){
				shoppingCarNumber+=Number(sortCookieVal.list[j].count);
				//console.log(sortCookieVal.list[j].count)
			}
		}
	}
	//console.log(shoppingCarNumber);
}
oShoppingCarNumber();
