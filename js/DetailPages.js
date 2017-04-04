$(document).ready(function(){
	if (sessionStorage.loginUserName) {
		console.log(sessionStorage.loginUserName);
		$('#pleaseLogin').html(sessionStorage.loginUserName);
		$('#pleaseLogin').attr('href', 'my2688.html');
	}
	//menu  二级菜单设置
	$('#nav_1 .li1').hover(function(){
		$(this).children('ul').css('display','block');
	},function(){
		$(this).children('ul').css('display','none');
	});
	$all_li=$('#nav_1 ul li');
	//console.log($all_li)
	$all_li.hover(function(){
		$(this).children('.menu_2').css({'display':'block','top':'-'+$all_li.index(this)*31+'px'});
		if($all_li.index(this)*31>=$(this).children('.menu_2').height()-31){
			$(this).children('.menu_2').css('height',$all_li.index(this)*31+50+'px');
		}
	},function(){
		$(this).children('.menu_2').css('display','none');
	});
	//放大镜
	$(".ImgCon ul li").mouseenter(function(){
		var oSrc=$(this).children('img').attr('src');
		$(this).addClass('changeBor1');
		//console.log(oSrc)
		$('.imgZS img').attr('src',oSrc);
	}).mouseleave(function(){
		$(this).removeClass('changeBor1');
	});
	$(".moveBox").mousemove(function(evt){
		var e=evt||event;
		var mouseX=e.offsetX;
		var mouseY=e.offsetY;
		//console.log(mouseX,mouseY);
		if(mouseX>=275){
			mouseX=275;
		}
		else if(mouseX<=75){
			mouseX=75;
		}
		if(mouseY>=275){
			mouseY=275;
		}
		else if(mouseY<=75){
			mouseY=75;
		}
		$("#showBox").css({"left":mouseX-$("#showBox").width()/2+"px","top":mouseY-$("#showBox").height()/2+"px","display":"block"});
		//console.log($("#showBox")[0].offsetLeft)
		var bigX=Math.floor($("#showBox")[0].offsetLeft/2);
		var bigY=Math.floor($("#showBox")[0].offsetTop);
		$("#bigBox").css("display","block");
		//console.log(bigX);
		$("#img2").css({
			"left":"-"+bigX+"px",
			"top":"-"+bigY+"px"
		});
	}).mouseleave(function(){
		$("#bigBox").css("display","none");
		$("#showBox").css("display","none");
	});
	//类别选择
	$('.pic li a').mouseenter(function(){
		$(this).addClass('changeBor');
	}).mouseleave(function(){
		$(this).removeClass('changeBor');
	}).click(function(){
		$('.pic li a').removeClass('btnBor xuanZ')
		$(this).addClass('btnBor xuanZ');
		var oImg=$('.ImgCon ul li img')
		$('.checkinfo span').text($(this).children('span').text());
		$('.Product_Name h5 span').text($(this).children('span').text());
		
		if($('.pic li a').index(this)==0){
			$('.imgZS img').attr('src','img/201512017326_6C_S.jpg');
			oImg[0].src='img/201512017326_6C_S.jpg';
			oImg[1].src='img/201512017326_3W_S.jpg';
			oImg[2].src='img/201512017326_8U_S.jpg';
			oImg[3].src='img/201512017326_EZ_S.jpg';
			oImg[4].src='img/201512017326_OK_S.jpg';
		}
		else if($('.pic li a').index(this)==1){
			$('.imgZS img').attr('src','img/201512017326_H9.jpg');
			oImg[0].src='img/201512017326_H9.jpg';
			oImg[1].src='img/201512017326_RC_S.jpg';
			oImg[2].src='img/201512017326_34_S.jpg';
			oImg[3].src='img/201512017326_PL_S.jpg';
			oImg[4].src='img/201512017326_JG_S.jpg';
		}
	});
	//加入购物车
		var cookieName='shoppingCar';
		$('.btn-append').click(function(){
			var day=new Date();
			day.setDate(day.getDate()+7);
			var oId=$('.bianhao').text();
			console.log(oId)
				var oProduct={
					"id":oId,
					"count":1
				}
				var obProductsOld={};
				var cookieOld=cookieUtil.getCookie(cookieName);
				//console.log(cookieOld);
				if(cookieOld.length>0){
					obProductsOld=JSON.parse(cookieOld);
					var flag=false;
					for(var i=0;i<obProductsOld.list.length;i++){
						if(obProductsOld.list[i].id==oProduct.id){
							$('#tishi2').text('购物车中已存在该产品');
							$('#tishi2').fadeIn(1000).fadeOut(3000);//console.log(22222)
							flag=true;
						}
					}
					if(!flag){//console.log(11111)
						obProductsOld.list.push(oProduct);
						$('#tishi2').text('成功加入购物车');
						$('#tishi2').fadeIn(1000).fadeOut(3000);
					}
				}else{
					obProductsOld.list=[];
					obProductsOld.list.push(oProduct);
					$('#tishi2').text('成功加入购物车');
					$('#tishi2').fadeIn(1000).fadeOut(3000);
				}
				var strProduct=JSON.stringify(obProductsOld);
				document.cookie=cookieName+"="+strProduct+";expires="+day;
				console.log(cookieUtil.getCookie(cookieName));
		});
});