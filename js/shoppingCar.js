$(function(){
	//购物车数据获取
	var setting={
		url:"json/product.json",
		success:function(data){
			sortCookie(data);
			sortGWC();
			shanchu();
		}
	}
	$.ajax(setting);
	function sortCookie(data){
		var cookieVal=cookieUtil.getCookie('shoppingCar');
		var data=data.data;
		//console.log(typeof cookieVal);
		if(cookieVal!=''){
			sortCookieVal=JSON.parse(cookieVal);			
		
			//console.log(sortCookieVal.list.length)
			if(sortCookieVal.list.length>0){
				$('.noShop').css('display','none');
				$('.hideShow').css('display','block')
				//$('#productNum').css('display','block').find('span').text(sortCookieVal.list.length);
				for(var j=0;j<sortCookieVal.list.length;j++){
					var cookieId=sortCookieVal.list[j].id;//console.log(cookieId)
					for(var i=0;i<data.length;i++){//console.log(data[i].id)
						if(data[i].id==cookieId){//console.log(111111)
							var price1=data[i].price2.substring(1);
							var arr=price1.split(",");
							if(arr.length>1){
								price=Number(arr[0])*1000+Number(arr[1])+'.00';
							}
							else{
								price=Number(arr[0])+'.00';
							}
							var $li=$('<li><input name="qtest" type="checkbox" value="" class="inputBut"><img src="'+data[i].src+'"/><div class="productDetail"><a href="###">'+data[i].alt+'</a><p>[<span>'+data[i].id+'</span>]</p></div><div class="strong" style="color:#d51317">'+price+'</div><div id="a" class="Spinner"><a class="Decrease" href="javascript:void(0)"><i>-</i></a><input class="Amount" value="'+sortCookieVal.list[j].count+'" autocomplete="off" maxlength="3" type="text"><a class="Increase" href="javascript:void(0)"><i>+</i></a></div><div class="total-price">'+price+'</div><div class="cz"><a href="javascript:void(0)" >删除</a></div></li>');
							$('.shop-table ul').append($li);
							break;
						}
					}
				}
			}
			else{
				$('.hideShow').css('display','none');
				$('#noShop').css('display','block');
			}
		}
	}
	function sortGWC(){
		//减商品数量
		$('.Decrease').click(function(){
			var productNum=Number($(this).next().val());
			if(productNum>1){
				productNum--;
			}else{
				productNum=1;
			}
			$(this).next().val(productNum);
			$(this).parent().next().text(($(this).parent().prev().text()*productNum).toFixed(2));
			changeNum($(this));
		});
		//加商品数量
		$('.Increase').click(function(){
			$(this).prev().val(Number($(this).prev().val())+1);
			$(this).parent().next().text(($(this).parent().prev().text()*Number($(this).prev().val())).toFixed(2));
			changeNum($(this));
		});
		//手动改变input商品数量
		$('.Amount').blur(function(){
			$(this).parent().next().text(($(this).parent().prev().text()*Number($(this).val())).toFixed(2));
			changeNum($(this));
		});
		$('#inputBut').click(function(){
			allPrice=0;yxshopNum=0;
			if($('#inputBut')[0].checked){
				
				for(var i=0;i<$checkBox.length;i++){
					$checkBox[i].checked=true;//console.log(Number($('.total-price')[i].innerText))
					allPrice+=Number($('.total-price')[i].innerText);
					$('.yxshopNum').text(++yxshopNum);
				}
			}else{
				for(var i=0;i<$checkBox.length;i++){
					$checkBox[i].checked=false;	
					allPrice=0;	
					$('.yxshopNum').text(0);
				}
			}
			$('.heji').text(allPrice.toFixed(2));
			$('.heji1').text($('.heji').text());
		});
		var $checkBox=$('.inputBut');
		var allPrice=0;
		var yxshopNum=0;
		$checkBox.click(function(){//console.log($checkBox[i].checked);
				if($checkBox[$checkBox.index(this)].checked){	
					allPrice+=Number($('.total-price')[$checkBox.index(this)].innerText);
					$('.yxshopNum').text(++yxshopNum);
					//console.log(allPrice)
				}
				else{
					allPrice-=Number($('.total-price')[$checkBox.index(this)].innerText);
					$('.yxshopNum').text(--yxshopNum);
				}
			$('.heji').text(allPrice.toFixed(2));
			$('.heji1').text($('.heji').text());
		});
		
		for(var m=0;m<$('.total-price').length;m++){
			$('.total-price')[m].innerText=(Number($('.strong')[m].innerText)*Number($('.Spinner .Amount')[m].value)).toFixed(2);
		}
	}
	//删除购物车商品
	var flagNum;
	function shanchu(){
		$('.cz a').click(function(){
			$('#tishi1').css('display','block');
			flagNum=$('.cz a').index(this);
		});
		$('#tishi1 button').click(function(){
			var day=new Date();
			day.setDate(day.getDate()+7); 
			if($('#tishi1 button').index(this)==0){
				$('#tishi1').css('display','none');
				var nowCookie=cookieUtil.getCookie('shoppingCar');
				var nowCookieVal=JSON.parse(nowCookie);
				//console.log(nowCookieVal)
				//console.log(flagNum)
				for(var i=0;i<nowCookieVal.list.length;i++){
					if(flagNum==i){
						nowCookieVal.list.splice(i,1);
						break;
					}
				}
				//console.log(nowCookieVal)
				
				var strProduct=JSON.stringify(nowCookieVal);
				document.cookie="shoppingCar"+"="+strProduct+";expires="+day;
				window.location.href='shoppingCar.html';
			}
			else{
				$('#tishi1').css('display','none');
			}
		});
	}
	
	//修改商品数量
	function changeNum(canshu){
		var day=new Date();
		day.setDate(day.getDate()+7); 
		var nowCookie=cookieUtil.getCookie('shoppingCar');
		var nowCookieVal=JSON.parse(nowCookie);
		//console.log(nowCookieVal)
		//console.log(canshu)
		var idCard=canshu.parent().prev().prev().find('span').text();
		for(var i=0;i<nowCookieVal.list.length;i++){
			if(idCard==nowCookieVal.list[i].id){
				nowCookieVal.list[i].count=canshu.parent().find('.Amount').val();
				break;
			}
		}
		//console.log(nowCookieVal)
		
		var strProduct=JSON.stringify(nowCookieVal);
		document.cookie="shoppingCar"+"="+strProduct+";expires="+day;
	}
});
