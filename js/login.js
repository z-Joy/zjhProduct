$(function(){
	//登录
	var $input=$('#loginCon').find('.loginInput').find('input:first');
	var $tishiB=$('#loginCon').find('.loginInput').find('b:first');
	var $tishiB1=$('#loginCon').find('.loginInput:lt(2)').find('b:last');
	$input[0].focus();
	$input.click(function(evt){
		//console.log($('select').val())
		var e=evt||event;
		e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		$(this).css({'border':""});
		$tishiB[$input.index(this)].style.display='none';
		$input.removeClass('focus');
		$(this).addClass('focus');
		if($input.index(this)==2){
			$(this).css('width',78+'px');
		}else{
			$($input[2]).css('width',80+'px');
		}
		checkUser();
		checkPassW();
	});
	//console.log($tishiB)
	var tongG3=0;
	$(document).click(function(e){
		checkJG(e);
	});
	//页面按下之后检测结果
	function checkJG(e){
		tongG3=0;
		checkUser();
		checkPassW();
		e.stopPropagation();
		//console.log(11111)
		$input.removeClass('focus');
		$($input[2]).css('width',80+'px');
		if($input[2].value!='' && $input[2].value.toUpperCase()!=$('.createYZ').text().toUpperCase()){
			$tishiB[2].style.display="block";
			$tishiB[2].innerText="验证码错误，请重试";
			$tishiB[2].style.color='#f00';
			$input[2].style.border="1px solid #f00";
			changeYZM();
		}
		else if($input[2].value.toUpperCase()==$('.createYZ').text().toUpperCase()){
			$tishiB[2].style.display="block";
			$tishiB[2].innerText="验证通过";
			$tishiB[2].style.color='#0f0';
			tongG3=1;
		}
	}
	//加载时创建一个验证码
	changeYZM();
	//用户名检查
	var tongG1=0;
	function checkUser(){
		var flag=true;
		tongG1=0;
		$tishiB1[0].style.display='none';
		//console.log(localStorage.user);
		var userTemp=eval(localStorage.user);
		if($input[0].value!=''){
			if($('select').val()==1){
				for(var i in userTemp){
					if(userTemp[i].userName==$input[0].value){
						flag=false;
						tongG1=1;
						sessionStorage.loginUserName = userTemp[i].userName;
						break;
					}
				}		
				if(flag){
					$tishiB1[0].style.display='block';
					$tishiB1[0].innerText='用户名不存在';
				}
			}
			else if($('select').val()==2){
				for(var i in userTemp){
					if(userTemp[i].clientNum==$input[0].value){
						flag=false;tongG1=1;
						sessionStorage.loginUserName = userTemp[i].userName;
						break;
					}
				}
				if(flag){
					$tishiB1[0].style.display='block';
					$tishiB1[0].innerText='客户编号不存在';
				}
			}
			else if($('select').val()==3){
				for(var i in userTemp){
					if(userTemp[i].email==$input[0].value){
						flag=false;tongG1=1;
						sessionStorage.loginUserName = userTemp[i].userName;
						break;
					}
				}
				if(flag){
					$tishiB1[0].style.display='block';
					$tishiB1[0].innerText='Email地址不存在';
				}
			}
			else if($('select').val()==4){
				for(var i in userTemp){
					if(userTemp[i].phone==$input[0].value){
						flag=false;tongG1=1;
						sessionStorage.loginUserName = userTemp[i].userName;
						break;
					}
				}
				if(flag){
					$tishiB1[0].style.display='block';
					$tishiB1[0].innerText='手机号码不存在';
				}
			}
		}
	}
	//检查密码
	var tongG2=0;
	function checkPassW(){
		var flag=true;
		tongG2=0;
		var userTemp=eval(localStorage.user);
		$tishiB1[1].style.display='none';
		if($input[1].value!=''){
			for(var i in userTemp){
				if(userTemp[i].passWord==$input[1].value){
					flag=false;tongG2=1;
					break;
				}
			}		
			if(flag){
				$tishiB1[1].style.display='block';
			}
		}
	}
	var tongG=0;
	//登录验证
	$('#loginsubmit').click(function(e){//console.log(1111111)
		checkJG(e);
		for(var i in $input){
			if($input[i].value==""){
				$tishiB[i].style.display="block";
				$input[i].style.border="1px solid #f00";
				if(i==2){	
					$tishiB[i].innerText="请输入验证码";
					$tishiB[i].style.color='#f00';
					tongG3=0;
				}
				if(i<2){
					$tishiB1[i].style.display='none';
					if(i=0){
						tongG1=0;
					}
					else{
						tongG2=0;
					}
				}
			}
		}
		tongG=tongG1+tongG2+tongG3;
		//console.log(tongG);
		console.log(localStorage.user);
		if(tongG==3){
			window.location.href='index.html';
		}
	});
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
	//select切换
	$('select').click(function(){
		if($(this).val()==1){
			$('form').find('.loginInput:first').find('span').text('用户名：');
		}
		else if($(this).val()==2){
			$('form').find('.loginInput:first').find('span').text('客户编号：');
		}
		else if($(this).val()==3){
			$('form').find('.loginInput:first').find('span').text('Email地址：');
		}
		else if($(this).val()==4){
			$('form').find('.loginInput:first').find('span').text('手机号码：');
		}
	})
});
function changeYZM(){
	$('.createYZ').html("");
	for(var i=0;i<Math.floor(Math.random()*3+4);i++){
		var lineHeight=Math.floor(Math.random()*9+18)+'px';
		var $span=$("<span style='display:inline-block;width:12px;height:22px;text-align:center;line-height:"+lineHeight+";'></span>");
		$('.createYZ').append($span);
		$span.text(createCheckCode(1));
		$span.css('color',randomColor());
		if($span.css('color')=='rgb(255, 255, 255)'){
			$span.css('color','#000000');
		}
	}
}


