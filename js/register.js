$(function(){
	//登录
	var $input=$('#loginCon').find('.loginInput').find('input');
	var $tishiB=$('#loginCon').find('.loginInput').find('b:first');
	var $tishiB1=$('#loginCon').find('.loginInput').find('b:last');
	var $through=$('.through');
	var flag=false;
	var flag1=true;
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
	//打开页面时使第一个输入框自动聚焦
	$input[0].focus();
	//输入框单机时执行
	$input.click(function(evt){
		userNameCheck();
		setPassWord();
		passWordOK();
		emailCheck();
		phoneCheck();
		var e=evt||event;
		e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		$(this).css({'border':""});
		$tishiB.css('display','none');
		$tishiB1[$input.index(this)].style.display='none';
		$tishiB[$input.index(this)].style.display='block';
		if($input.index(this)==1){
			if(flag){
				$tishiB[1].style.display='none';
			}
		}
		$input.removeClass('focus');
		$(this).addClass('focus');
		if($input.index(this)==5){
			$(this).css('width',78+'px');
		}
		else{
			$($input[5]).css('width',80+'px');
		}
	});
	//单页面单击时 输入框的所有效果样式等取消（恢复刚打开页面时的样子）
	$(document).click(function(e){
		e.stopPropagation();
		//console.log(11111)
		$input.removeClass('focus');
		$tishiB.css('display','none');
		$($input[5]).css('width',80+'px');
		userNameCheck();
		setPassWord();
		passWordOK();
		emailCheck();
		phoneCheck();
		yzmCheck();
	});
	
	//打开页面时随机创建一个验证码
	changeYZM();
	
	//check  表单检查
 	$input.blur(function(){
		userNameCheck();
		setPassWord();
		passWordOK();
		emailCheck();
		phoneCheck();
		
		if(flag){
			$through[1].style.display='block';
		}
	});
	
	//显示密码 or 手机、邮箱设置为用户名
	$('.showBox').click(function(){
		if($('.showBox').index(this)==0){
			if($('#showMM')[0].checked){
				$input[1].type="text";
				$input[2].type="text";
			}
			else{
				$input[1].type="password";
				$input[2].type="password";
			}	
		}
		if($('.showBox').index(this)==1){
			if($('#userName_email')[0].checked){
				$input[0].value=$input[3].value;
				userNameCheck();
			}
			else{
				$input[0].value="";
			}	
		}
		if($('.showBox').index(this)==2){
			if($('#userName_phone')[0].checked){
				$input[0].value=$input[4].value;
				userNameCheck();
			}
			else{
				$input[0].value="";
			}
		}	
	});
	
	
	//register验证
	$('#registerSubmit').click(function(){//console.log(1111111)
		for(var i=0;i<$input.length;i++){
			if($input[i].value==""){
				$tishiB[i].style.display="none";
				$tishiB1[i].style.display="block";
				$input[i].style.border="1px solid #f00";	
				if(i==0){
					$tishiB1[0].innerHTML="请输入用户名";
				}
			}
			if(i==3 || i==4){
				$tishiB[i].style.display="none";
				$input[i].style.border="";
			}
		}
	});
	
	//用户数据处理
	var userTemp;
	function userSort(){
			
		userTemp=eval(localStorage.user);
		//console.log(typeof userTemp);
		for(var i in userTemp){
			if(userTemp[i].userName==$input[0].value){
				$tishiB1[0].innerHTML="该用户名太受欢迎了，已被注册";
				$tishiB1[0].style.display='block';
				$tishiB[0].style.display='none';
				$through[0].style.display='none';
				$input[0].style.border="1px solid #f00";
			}
		}
	}
	//用户名检查
	function userNameCheck(){
		if($input[0].value!=""){
			if($input[0].value.length<4 || $input[0].value.length>40)
			{	
				$tishiB1[0].innerHTML="用户名为4~40位";
				$tishiB1[0].style.display='block';
				$tishiB[0].style.display='none';
				$through[0].style.display='none';
				$input[0].style.border="1px solid #f00";
			}
			else if(!(/^[\w-@.]{4,40}$/.test($input[0].value)))
			{
				$tishiB1[0].innerHTML="用户名只能由中文、英文、数字及“_”、“-”、“@”、“.”组成";
				$tishiB1[0].style.display='block';
				$tishiB[0].style.display='none';
				$through[0].style.display='none';
				$input[0].style.border="1px solid #f00";
			}
			else if(/^[\w-@.]{4,40}$/.test($input[0].value))
			{
				$tishiB1[0].style.display='none';
				$through[0].style.display='block';
				$input[0].style.border="";
			}
			userSort();
		}
	}
	//验证码检查
	function yzmCheck(){
		if($input[5].value!='' && $input[5].value.toUpperCase()!=$('.createYZ').text().toUpperCase()){
			$tishiB[5].style.display="block";
			$tishiB[5].innerText="验证码错误，请重试";
			$tishiB[5].style.color='#f00';
			$input[5].style.border="1px solid #f00";
			$through[5].style.display='none';
			changeYZM();
		
		}
		else if($input[5].value==''){
			$tishiB[5].style.display="none";
			$tishiB[5].innerText="请输入验证码";
			$tishiB[5].style.color='#999';
			$through[5].style.display='none';
		
		}
		else if($input[5].value.toUpperCase()==$('.createYZ').text().toUpperCase()){
			$tishiB[5].style.display="block";
			$tishiB[5].innerText="验证通过";
			$tishiB[5].style.color='#0f0';
			$through[5].style.display='block';
			
		}
	}
	//设置密码检查
	function setPassWord(){//console.log(111111)
			if($input[1].value!=""){
				if($input[1].value.length<6 || $input[1].value.length>16)
				{	
					$tishiB1[1].innerHTML="密码长度只能在6~16位之间";
					$tishiB1[1].style.display='block';
					$tishiB[1].style.display='none';
					$(".strong")[0].style.display='none';
					$through[1].style.display='none';
					$input[1].style.border="1px solid #f00";
					flag=false;
					
				}
				else if(!(/^[-\w]{6,16}$/.test($input[1].value)))
				{
					$tishiB1[1].innerHTML="密码只能由英文、数字及“_”、“-”组成";
					$tishiB1[1].style.display='block';
					$tishiB[1].style.display='none';
					$(".strong")[0].style.display='none';
					$through[1].style.display='none';
					$input[1].style.border="1px solid #f00";
					flag=false;
					
				}
				else if(/^[-\w]{6,16}$/.test($input[1].value))
				{
					var num=0;
					var str=0;
					var teshu=0;
					var stro=0
					if(/\d/.test($input[1].value)){
						num=1;
					}
					if(/[a-zA-Z]/.test($input[1].value)){
						str=1;
					}
					if(/[_-]/.test($input[1].value)){
						teshu=1;
					}
					stro=num+str+teshu;
					//console.log(stro);
					if(stro==3){
						$(".strong").css('display','block').find('u').css({'width':90+'px','background':'#f00'})
						$(".strong").find('i').text('强');
						$tishiB1[1].style.display='none';
						$tishiB[1].style.display='none';
						$through[1].style.display='block';
						$input[1].style.border="";
						flag=true;
						
					}
					else if(stro==2){
						$(".strong").css('display','block').find('u').css({'width':60+'px','background':'#ff0'})
						$(".strong").find('i').text('中');
						$tishiB1[1].style.display='none';
						$tishiB[1].style.display='none';
						$through[1].style.display='block';
						$input[1].style.border="";
						flag=true;
						
					}
					else if(stro==1){
						$(".strong").css('display','block').find('u').css({'width':30+'px','background':'#0f0'})
						$(".strong").find('i').text('弱');
						$tishiB1[1].style.display='none';
						$tishiB[1].style.display='none';
						$through[1].style.display='block';
						$input[1].style.border="";
						flag=true;
					}
				}
			}
			else{
				$tishiB1[1].style.display='none';
				$(".strong")[0].style.display='none';
				$tishiB[1].style.display='none';
				flag=false;
			}
	}
	$input[1].onkeyup=function(){
		setPassWord();
	}
	//确认密码检查
	function passWordOK(){
		if($input[2].value!=""){
			if($input[2].value.length<6 || $input[2].value.length>16)
			{	
				$tishiB1[2].innerHTML="密码长度只能在6~16位之间";
				$tishiB1[2].style.display='block';
				$tishiB[2].style.display='none';
				$through[2].style.display='none';
				$input[2].style.border="1px solid #f00";
				
			}
			else if(!(/^[-\w]{6,16}$/.test($input[2].value)))
			{
				$tishiB1[2].innerHTML="密码只能由英文、数字及“_”、“-”组成";
				$tishiB1[2].style.display='block';
				$tishiB[2].style.display='none';
				$through[2].style.display='none';
				$input[2].style.border="1px solid #f00";
				
			}
			else if(flag){
				if($input[2].value!=$input[1].value){
					$tishiB1[2].innerHTML="两次密码不一致";
					$tishiB1[2].style.display='block';
					$tishiB[2].style.display='none';
					$through[2].style.display='none';
					$input[2].style.border="1px solid #f00";
					
				}
				else{
					$through[2].style.display='block';
					$tishiB[2].style.display='none';
					$tishiB1[2].style.display='none';
					$input[2].style.border="";
					
				}
			}
		}
	}
	//电子邮箱检查
	function emailCheck(){
		if($input[3].value!=""){
			if(!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($input[3].value)))
			{
				$tishiB1[3].innerHTML="电子邮箱格式不正确";
				$tishiB[3].style.display='none';
				$tishiB1[3].style.display='block';
				$through[3].style.display='none';
				$input[3].style.border="1px solid #f00";
			
			}
			else{
				$through[3].style.display='block';
				$tishiB[3].style.display='none';
				$tishiB1[3].style.display='none';
				$input[3].style.border="";
			
			}
		}
	}
	//手机格式检查
	function phoneCheck(){
		if($input[4].value!=""){
			if(!(/^1(3|4|5|7|8)\d{9}$/.test($input[4].value)))
			{
				$tishiB1[4].innerHTML="手机号码格式不正确";
				$tishiB[4].style.display='none';
				$tishiB1[4].style.display='block';
				$through[4].style.display='none';
				$input[4].style.border="1px solid #f00";
			
			}
			else{
				$through[4].style.display='block';
				$input[4].style.border="";
			
			}
		}	
		
	}
	//注册用户保存
	var getUser;
	function flag1OK(){
		flag1=true;
		for(var i=0;i<$through.length;i++){
			if($through[i].style.display!='block'){
				flag1=false;
				break;
			}
		}
		console.log(flag1)
	}
	var clientN=0;
	var getUser=eval('('+localStorage.user +')')|| new Array();
	$('#registerSubmit').click(function(){
		flag1OK();
		//console.log(flag1)
		if(flag1){
			console.log(getUser);
			if(getUser.length>0){
				clientN=(getUser[getUser.length-1].clientNum);
				getUser=eval('('+localStorage.user+')');
			}
			clientN++;
			var Obj={
				userName:$input[0].value,
				passWord:$input[1].value,
				email:$input[3].value,
				phone:$input[4].value,
				clientNum:clientN
			};
			
			getUser.push(Obj);
			userJson=JSON.stringify(getUser);
			localStorage.user=userJson;
			$('.tanchu').css('display','block').find('span').text(clientN);
			
		}
		//
	});
	//console.log(localStorage.user);	
    //localStorage.clear();
    //弹出层按钮设置（是否立即登录）
	$('.tanchu button').click(function(){
		if($('.tanchu button').index(this)==0){
			window.location.href="login.html";
		}
		else{
			$('.tanchu').css('display','none');
		}
	});
	
});
//创建验证码（改变验证码）
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