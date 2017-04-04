$(function(){
	if (sessionStorage.loginUserName) {
		console.log(sessionStorage.loginUserName);
		$('#pleaseLogin').html(sessionStorage.loginUserName);
		$('#pleaseLogin').attr('href', 'my2688.html');
	}
	var $banner=$("#banner");
	var $boutique=$("#boutique");
	var $skincare=$("#skincare");
	var $homeStore=$("#homeStore");
	var $numericalCode=$("#numericalCode");
	var $clothes=$("#clothes");
	var $redDates=$("#redDates");
	var $hotProduct=$("#hotProduct");
	var $banUl=$('#bannerImg').children('ul');
	var $banList=$banUl.find('li');
	var setting={
		url:"json/index.json",
		success:function(data){
			sortData0(data);
			sortData1(data);
			sortData2(data);
			sortData3(data);
			sortData4(data);
			sortData5(data);
			sortGuanGao(data);
			sortHotP(data);
		}
	}
	$.ajax(setting);
	//整理banner图数据
	function sortData0(data){//<li><a href=""><img src=""/></a></li>
		var data0=data.data0;
		for(var i in data0){
			var createImg=$banList[0].cloneNode(true);
			$banUl.append(createImg);
		}
		var $Img=$('#bannerImg').children('ul').find("img");
		//console.log($Img)
		$Img[0].src=data0[data0.length-1].src;
		$Img[$Img.length-1].src=data0[0].src;
		var createSpanBox=$("<p style='position:absolute;bottom:0;left:0;width:100%;height:15px;text-align:center'></p>");
		$('#bannerImg').append(createSpanBox);
		for(var j=1;j<$Img.length-1;j++){
			$Img[j].src=data0[j-1].src;
			var createSpan=$("<span style='background:#000000;border-radius:50%;display:inline-block;width:15px;height:15px;margin:0 3px;'></span>");
			createSpanBox.append(createSpan);
		}
		$('#bannerImg').children('p').find('span:first').css('background','#DC1259');
		$banUl.css('width',(($Img.length)*720)+'px');
		flag=true;
	}
	//整理精选商品数据——boutique
	function sortData1(data){
		var data1=data.data1;
		var $Img=$boutique.find("img");
		for(var i in data1){
			$Img[i].src=data1[i].src;
		}
	}
	//整理1F——美容护肤数据（skincare）
	function sortData2(data){
		var data2=data.data2;
		var $Img=$skincare.find("img");
		var $introduce=$skincare.find(".productName").find("a");
		var $price=$skincare.find(".productPrice");
		//console.log($introduce);
		for(var i in data2){
			$Img[i].src=data2[i].src;
			if(i>6){
				$introduce[i-7].innerHTML=data2[i].introduce;
				$price[i-7].innerHTML=data2[i].price;
			}
		}
	}
	//整理2F——家居家装数据（HOMEstore）
	function sortData3(data){
		var data3=data.data3;
		var $Img=$homeStore.find("img");
		var $introduce=$homeStore.find(".productName").find("a");
		var $price=$homeStore.find(".productPrice");
		for(var i in data3){
			$Img[i].src=data3[i].src;
			if(i>6){
				$introduce[i-7].innerHTML=data3[i].introduce;
				$price[i-7].innerHTML=data3[i].price;
			}
		}
	}
	//整理3F——数码家电数据（numerical code）
	function sortData4(data){
		var data4=data.data4;
		var $Img=$numericalCode.find("img");
		var $introduce=$numericalCode.find(".productName").find("a");
		var $price=$numericalCode.find(".productPrice");
		for(var i in data4){
			$Img[i].src=data4[i].src;
			if(i>6){
				$introduce[i-7].innerHTML=data4[i].introduce;
				$price[i-7].innerHTML=data4[i].price;
			}
		}
	}
	//整理4F——服饰箱包数据（clothes）
	function sortData5(data){
		var data5=data.data5;
		var $Img=$clothes.find("img");
		var $introduce=$clothes.find(".productName").find("a");
		var $price=$clothes.find(".productPrice");
		for(var i in data5){
			$Img[i].src=data5[i].src;
			if(i>6){
				$introduce[i-7].innerHTML=data5[i].introduce;
				$price[i-7].innerHTML=data5[i].price;
			}
		}
	}
	//整理广告数据（AD）
	function sortGuanGao(data){
		var $guangGao=data.guangGao;
		//console.log($guangGao);
		var $Img=$redDates.find("img");
		//console.log($Img);
		$Img[0].src=$guangGao;
	}
	//整理热推商品数据（hot product）
	function sortHotP(data){
		var data6=data.data6;
		var $Img=$hotProduct.find("img");
		var $introduce=$hotProduct.find(".productName").find("a");
		var $price=$hotProduct.find(".productPrice");
		for(var i in data6){
			$Img[i].src=data6[i].src;
			$introduce[i].innerHTML=data6[i].introduce;
			$price[i].innerHTML=data6[i].price;
		}
	}
	
	
	//notic
	var $notic=$("#notic");
	var $p=$notic.find("p");
	$p.mouseenter(function(){
		$(this).siblings().css({"background": "#F3F3F3","border-bottom": "1px solid #efefef"});
		$(this).css({"background": "#fff","border-bottom": "1px solid #fff"});
		//console.log($notic.find("p:first")[0].style.background=="rgb(255, 255, 255)")
		if($notic.find("p:first")[0].style.background=="rgb(255, 255, 255)"){
			//console.log(111111)
			$(".noticCon")[0].style.display="block";
			$(".noticCon_1")[0].style.display="none";
		}
		else{
			$(".noticCon")[0].style.display="none";
			$(".noticCon_1")[0].style.display="block";
		}
	});
	//menu_2 (二级菜单)
	var $lis=$("#nav_2").find("li");
	var $subMenu=$("#menu_2").children(".fenkuai");
	$lis.mouseenter(function(){
		for(var i=0;i<$lis.length;i++){
			$($lis[i]).css('background','#C6004B').children("a").css({'color':'#fff'});
		}
		$(this).css({'background':'#FFFFFF'}).children("a").css({'color':'#dc1259'});
		$("#menu_2").css('display','block').stop().animate({left:"210px"},100,function(){});
		
		for(var j=0;j<$subMenu.length;j++){
			$subMenu[j].style.display="none";
		}
		$subMenu[$lis.index(this)].style.display="block";
	});
	$("#nav_2").mouseleave(function(){
		$("#menu_2").stop().animate({left:'160px'},100).css({'display':'none'});
	});
	$("#menu_2").mouseenter(function(){
		$("#menu_2").css({'display':'block'}).stop().animate({'left':'210px'},100);
		
	}).mouseleave(function(){
		$("#menu_2").stop().animate({'left':'160px'},100).css({'display':'none'});
		for(var i=0;i<$lis.length;i++){
			$($lis[i]).css('background','#C6004B').children("a").css({'color':'#fff'});
		}
	});
	document.onmousemove=function(e){
		//console.log(getComputedStyle($("#menu_2")[0],null)['display'])
		e.stopPropagation();
		if(getComputedStyle($("#menu_2")[0],null)['display']=='none'){
			for(var i=0;i<$lis.length;i++){
				$($lis[i]).css('background','#C6004B').children("a").css({'color':'#fff'});
			}
		}	
	}
	
	
    //轮播图
	$banUl.css({'left':"-"+720+'px'});
	var $span;
	var Imgnum=1;
	var flag=false;
	var flag1=false;
	var $ImgList;
	var timer=setInterval(function(){
		if(flag){
			flag=false;
			$ImgList=$('#bannerImg').children('ul').find('img');
			$span=$('#bannerImg').children("p").find("span");
			spanStart();
			nextBtn();
			prevBtn();
			flag1=true;
		}
		//console.log($span)
		if(flag1){
			for(var i in $span){
				$span.css({'background':"#000"});
			}
			if(Imgnum<$ImgList.length){
				Imgnum++;
			}
			if(Imgnum>=$ImgList.length){
				Imgnum=2;
				$('#bannerImg').children('ul').css({'left':"-"+720+'px'});
			}
			//console.log(Imgnum)
			if(Imgnum==$ImgList.length-1){
				$span[0].style.background="#dc1259";
			}
			else if(Imgnum<$ImgList.length-1){
				$span[Imgnum-1].style.background="#dc1259";
			}
			$('#bannerImg').children('ul').animate({'left':'-'+Imgnum*720+'px'},1000,'linear');
		}
	},4000);
	$('#bannerImg').mouseenter(function(){
		flag1=false;
	}).mouseleave(function(){
		flag1=true;
	});
	$('#bannerImg').children('p').mouseenter(function(){
		flag1=false;
	}).mouseleave(function(){
		flag1=true;
	});
	function spanStart(){	
		$span.mouseenter(function(){
			$(this).css('background',"#dc1259");
			flag1=false;
		}).mouseleave(function(){
			$(this).css('background',"#000");
			if(Imgnum==$ImgList.length-1){
				$span[0].style.background="#dc1259";
			}
			else if(Imgnum<$ImgList.length-1){
				$span[Imgnum-1].style.background="#dc1259";
			}
		}).click(function(){
			$span.css('background',"#000");
			$(this).css('background',"#dc1259");
			if($span.index(this)==0){
				Imgnum=$ImgList.length-1;
				console.log(Imgnum)
			}
			else{
				Imgnum=$span.index(this)+1;
			}
			$('#bannerImg').children('ul').css({'left':'-'+Imgnum*720+'px'});
		});
	}
	function nextBtn(){
		$('.next').click(function(){
			for(var i in $span){
				$span.css({'background':"#000"});
			}
			if(Imgnum<$ImgList.length){
				Imgnum++;
			}
			if(Imgnum>=$ImgList.length){
				Imgnum=2;
				$('#bannerImg').children('ul').css({'left':"-"+720+'px'});
			}
			//console.log(Imgnum)
			if(Imgnum==$ImgList.length-1){
				$span[0].style.background="#dc1259";
			}
			else if(Imgnum<$ImgList.length-1){
				$span[Imgnum-1].style.background="#dc1259";
			}
			$('#bannerImg').children('ul').stop().animate({'left':'-'+Imgnum*720+'px'},1000,'linear');	
			flag1=false;
		}).mouseover(function(){
			flag1=false;
		});
	}
	function prevBtn(){
		$('.prev').click(function(){
			for(var i in $span){
				$span.css({'background':"#000"});
			}
			if(Imgnum<=0){
				Imgnum=$ImgList.length-2;
				$('#bannerImg').children('ul').css({'left':"-"+Imgnum*720+'px'});
			}
			if(Imgnum>=1){
				Imgnum--;
			}
			//console.log(Imgnum)
			if(Imgnum==$ImgList.length-1){
				$span[0].style.background="#dc1259";
			}
			else if(Imgnum==0){
				$span[$span.length-1].style.background="#dc1259";
			}
			else if(Imgnum<$ImgList.length-1 && Imgnum>0){
				$span[Imgnum-1].style.background="#dc1259";
			}
			$('#bannerImg').children('ul').stop().animate({'left':'-'+Imgnum*720+'px'},1000,'linear');	
			flag1=false;
		}).mouseover(function(){
			flag1=false;
		});
	}
	
});

