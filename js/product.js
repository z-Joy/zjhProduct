$(function(){
	if (sessionStorage.loginUserName) {
		console.log(sessionStorage.loginUserName);
		$('#pleaseLogin').html(sessionStorage.loginUserName);
		$('#pleaseLogin').attr('href', 'my2688.html');
	}
	
	//menu
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
	
	//获取数据
	var setting={
		url:"json/product.json",
		success:function(data){
			sortJieG(data);
			sortData(data);
			dl_border();
			tempLibData();
		}
	}
	$.ajax(setting);
	//整理数据
	function sortJieG(data){
		var data=data.data;
		for(var i=0;i<data.length-1;i++){
			var $Cloneli=$('.mainCon ul li')[0].cloneNode(true);
			$('.mainCon ul').append($Cloneli);
		}
	}
	function sortData(data){
		var data=data.data;
		var $dlList=$('.mainCon ul li dl');
		//console.log(data)
		for(var i=0;i<data.length;i++ ){
			$($dlList[i]).find('.aHref').attr('href','DetailPages.html');//data[i].href
			$($dlList[i]).find('dt:first').find('img')[0].src=data[i].src;
			$($dlList[i]).find('dt:first').find('img')[0].alt=data[i].alt;
			$($dlList[i]).children('.proName').children('a').html(data[i].proName);
			$($dlList[i]).children('.num').children('em').html(data[i].price1);
			$($dlList[i]).children('.num').children('.Price').html(data[i].price2);
			$($dlList[i]).children('.proButton').children('.tempLib').attr('id',data[i].id);
		}
	}
	//划入时改变dl的边框
	function dl_border(){
		var $dlList=$('.mainCon ul li dl');
		$dlList.mouseenter(function(){
			$(this).addClass('addBor');
		}).mouseleave(function(){
			$(this).removeClass('addBor');
		});
	}
	//回到顶部
	$('#backTop img').mouseenter(function(){
		this.src='img/untitled2.jpg';
	}).mouseleave(function(){
		this.src='img/untitled1.jpg';
	}).click(function(){
			var timer=setInterval(function(){
				if($(window).scrollTop()<=0){
					$(window).scrollTop(0);
					clearInterval(timer);
					return;
				}
				$(window).scrollTop($(window).scrollTop()-8);
			},10);
	});
	$(window).scroll(function(){
		if($(window).scrollTop()>600){
			$("#backTop")[0].style.display='block';
		}
		else{
			$("#backTop")[0].style.display='none';
		}
	});
	//cookie设置     放入暂存架
	var cookieName='productLib';
	function tempLibData(){
		$tempLib=$('.tempLib');
		$tempLib.click(function(){
			var day=new Date();
			day.setDate(day.getDate()+7);
			var oProduct={
				"id":$(this).attr('id'),
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
						$('#tishi').text('暂存架中已存在该产品');
						$('#tishi').fadeIn(1000).fadeOut(3000);//console.log(22222)
						flag=true;
					}
				}
				if(!flag){//console.log(11111)
					obProductsOld.list.push(oProduct);
					$('#tishi').text('成功加入暂存架');
					$('#tishi').fadeIn(1000).fadeOut(3000);
				}
			}else{
				obProductsOld.list=[];
				obProductsOld.list.push(oProduct);
				$('#tishi').text('成功加入暂存架');
				$('#tishi').fadeIn(1000).fadeOut(3000);
			}

			var strProduct=JSON.stringify(obProductsOld);
			document.cookie=cookieName+"="+strProduct+";expires="+day;
		});	
	}
	
	
});



