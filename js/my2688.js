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
	//my2666列表收缩
	$('.jianhao').click(function(){
		$(this).css('display','none').siblings().css('display','block');
		$(this).parent().next().css('display','none');
	});
	$('.jiahao').click(function(){
		$(this).css('display','none').siblings().css('display','block');
		$(this).parent().next().css('display','block');
	});
	
	//暂存架submit设置
	//阻止表单submit默认提交
	$('form').submit(function(){
		return false;
	});
	//获取暂存数据
	var setting={
		url:"json/product.json",
		success:function(data){
			sortCookie(data);
			cancelPro();
			shoppingCarCookie();
		}
	}
	$.ajax(setting);
	function sortCookie(data){
		var cookieVal=cookieUtil.getCookie('productLib');
		var data=data.data;
		//console.log(typeof cookieVal);
		if(cookieVal!=''){
			sortCookieVal=JSON.parse(cookieVal);			
		
			//console.log(sortCookieVal.list.length)
			if(sortCookieVal.list.length>0){
				$('#EmptyCartLabel').css('display','none');
				$('#productNum').css('display','block').find('span').text(sortCookieVal.list.length);
				var $tab=$('<table cellspacing="0" rules="all" bordercolor="White" border="1" id="CartItemsDataGrid" style="border-color:White;border-style:None;width:100%;border-collapse:collapse;text-align: center;"><tbody><tr class="daoh" style="background-color:#E0E0E0;"><td>商品编号</td><td>商品名称</td><td>零售价</td><td>现价</td><td>状态</td><td>选择</td></tr></tbody></table>');
				$('.list_right_pjneir').prepend($tab);
				for(var j=0;j<sortCookieVal.list.length;j++){
					var cookieId=sortCookieVal.list[j].id;//console.log(cookieId)
					for(var i=0;i<data.length;i++){//console.log(data[i].id)
						if(data[i].id==cookieId){//console.log(111111)
							var $tr=$('<tr class="dingdannr" style="color:DimGray;background-color:White;height:46px;"><td>'+cookieId+'</td><td><a class="12Uv4" href="'+data[i].href+'">'+data[i].alt+'</a></td><td style="text-decoration: line-through;">'+data[i].price2+'</td><td class="price">'+data[i].price1+'</td><td><font color="red">'+data[i].zhuT+'</font></td><td><input class="CartItemsDataGrid__ctl2_CheckBoxDel" type="checkbox" name="CartItemsDataGrid:_ctl2:CheckBoxDel"></td></tr>');
							$('.list_right_pjneir tbody').append($tr);
							break;
						}
					}
				}
			}
			else{
				$('#EmptyCartLabel').css('display','block');
				$('#productNum').css('display','none');
			}
		}
	}
	//暂存架操作
	
	//清空暂存架
	$('#EmptyButton').click(function(){
		$('#tishi').css('display','block');
	});
	$('#tishi button').click(function(){
		if($('#tishi button').index(this)==0){
			$('#tishi').css('display','none');
			cookieUtil.removeCookie('productLib');
			window.location.href='my2688.html';
		}
		else{
			$('#tishi').css('display','none');
		}
	});
	//选中商品
	var checkBoxArr=[];
	function cancelPro(){
		var $checkedBox=$('.CartItemsDataGrid__ctl2_CheckBoxDel');//console.log($checkedBox)
		$checkedBox.click(function(){//console.log(111111);
			if(this.checked){
				checkBoxArr.push($checkedBox.index(this));
			}
			else{
				for(var i in checkBoxArr){
					if(checkBoxArr[i]==$checkedBox.index(this)){
						checkBoxArr.splice(i,1);
					}
				}
			}
		});	
	}
	//删除选中
	$('#DelButton').click(function(){
		$('#tishi1').css('display','block');	
	});
	$('#tishi1 button').click(function(){
		var day=new Date();
		day.setDate(day.getDate()+7); 
		if($('#tishi1 button').index(this)==0){
			$('#tishi1').css('display','none');
			var nowCookie=cookieUtil.getCookie('productLib');
			var nowCookieVal=JSON.parse(nowCookie);
			//console.log(nowCookieVal)
			for(var j=0;j<checkBoxArr.length;j++){//console.log(typeof checkBoxArr[j])
				for(var i=0;i<nowCookieVal.list.length;i++){
					if(checkBoxArr[j]==i){
						nowCookieVal.list.splice(i,1);
						checkBoxArr.splice(j,1);
						break;
					}
				}
			}
			var strProduct=JSON.stringify(nowCookieVal);
			document.cookie="productLib"+"="+strProduct+";expires="+day;
			window.location.href='my2688.html';
		}
		else{
			$('#tishi1').css('display','none');
		}
	});
	
	//放入购物车
	var idArr=[];
	function shoppingCarCookie(){
		var cookieName='shoppingCar';
		$TurnButton=$('#TurnButton');
		$TurnButton.click(function(){
			var day=new Date();
			day.setDate(day.getDate()+7);
			for(var i in checkBoxArr){
				for(var j=1;j<$('.list_right_pjneir tbody tr').length;j++){
					if(checkBoxArr[i]==(j-1)){
						var tdTxt=$($('.list_right_pjneir tbody tr')[j]).children('td:first').text();
						idArr.push(tdTxt);
					}
				}
			}
			for(var k in idArr){
				var oProduct={
					"id":idArr[k],
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
			}
		});
	}
	
});
