/**
 * 生成验证码
 * 参数{ 
 *		 size:表示验证码的位数 
 *	   } 
 * 例： createCheckCode(5); 生成5位长度的验证码
 */
function createCheckCode(size){
	var list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',0,1,2,3,4,5,6,7,8,9];
	for(var num=65;num<=90;num++){
		list.push(String.fromCharCode(num));
	}
	var temp = [];
	for(var i=0; i<size; i++){
		temp.push( list[parseInt(Math.random()*list.length)] );
	}
	return temp.join("");
}

/**
	根据指定的范围大小生成一个随机整数
	参数 min表示下限  max表示上限
	例： randomInt(5,18); 生成一个5-18的随机数，包含5和18
*/
function randomInt(min, max){
	return Math.round(Math.random()*(max-min)) + min;
}

/**
	将一个日期对象转换成一个字符串
	参数：
		d 日期对象
		sep 转换字符串以后的分隔符
	例：date2String(new Date(2008,12,9), "/")
	结果： 返回字符串 "2008/12/09 00:00:00"
*/
function date2string(d, sep){
	sep = sep || "-";
	function toDouble(num){
		return num<10?"0"+num:num;
	}
	return d.getFullYear()+sep+ toDouble(d.getMonth()+1) + sep + toDouble(d.getDate()) + " " + toDouble(d.getHours()) + ":" + toDouble(d.getMinutes()) + ":" + toDouble(d.getSeconds());
}

/**
	将一个日期字符串转成一个日期对象
	参数:
		datestr 日期字符串
		sep 日期字符串使用的分隔符
	例： string2Date("1989.5.26",".");
	结果： 返回一个日期对象
*/
function string2date(datestr,sep) {
	///2016-08-09 || 2016/09/12
	var str = datestr.replace(new RegExp(sep,"g"),"-");
	return new Date(str);
}

/**
	计算N天以后的日期
	参数: 
		n 天数  number类型
	返回日期对象
	例： afterNday(7)
*/
function afterNday(n){
	var now = new Date();
	now.setDate( now.getDate()+n );
	return now;
}

/**
	计算两个日期之间的间隔
	参数：
		start 日期对象
		end 日期对象
	返回 两个日期相隔的天数
	例：between(new Date("2016-11-09"), new Date("2046-10-05"))
*/
function between(start, end){
	return Math.abs(start.getTime() - end.getTime())/(24*60*60*1000);
}

/**
	返回随机颜色
*/
function randomColor(){
	var R = Math.round(Math.random()*255).toString(16);
	var G = Math.round(Math.random()*255).toString(16);
	var B = Math.round(Math.random()*255).toString(16);
	return "#"+(R.length<2?"0"+R:R)+(G.length<2?"0"+G:G)+(B.length<2?"0"+B:B);
}
/**
	解决IE兼容ClassName的问题
	参数：
		classname 指要查找的元素class名
		* 指找到所有拥有class属性的元素
	遍历并判断是否与要查找的class名相同，最后存储到arr数组中
	返回所有拥有该classname的对象
	例：getElementsByClassName4IE("abc");
*/
function getElementsByClassName4IE(classname)
{
	var alldom = document.getElementsByTagName("*");
	var arr = [];
	for(var i=0; i<alldom.length; i++)
	{
		var classes = alldom[i].className.split(/\s+/);
		var flag = false;
		for(var k in classes)
		{
			if(classname == classes[k]) flag = true;
		}
		if(flag)
		{
			arr.push(alldom[i]);
		}
	}
	return arr;
}
/**
	取出所有子节点中的元素节点
	参数：
		Ele 父元素
	例：getElementNode(ul); //获取ul下的所有元素节点
*/
function getElementNode(Ele)
	{
		var allChildNode=Ele.children||Ele.childNodes;
		var EleNode=[];
		for(var i=0;i<allChildNode.length;i++)
		{
			if(allChildNode[i].nodeType==1)
			{
				EleNode.push(allChildNode[i]);
			}
		}
		return EleNode;
	}
/**
	解决IE关于添加事件的兼容
	参数：
		ele 元素
		eventName 事件名称
		func 函数
		isCapture 是否捕获
	例：//给一个用btn代表的元素添加onclick事件，编写函数function，并且捕获
		addEvent(btn,"click",function(){...},true);  
*/
function addEvent(ele, eventname, func, isCapture){
	/**
	if(window.VBArray){
		判断是否为IE浏览器
	}
	*/
	if(ele.attachEvent) {
		ele.attachEvent("on"+eventname, func);
	} else {
		ele.addEventListener(eventname, func, isCapture);
	}
}
/**
	获取非行内样式
	obj为获取对象
	name为字符串
	*只读
*/
function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		//IE
		return obj.currentStyle.name;
	}
	else
	{
		return getComputedStyle(obj,false).name;
	}
}
/**
 	检测用户名,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkUserName("用户名不合法！"，2000);
 */
function checkUserName(content,value,times)
{
	if(!/^[\u2E80-\u9FFF]{2,10}$/.test(content))
	{
		tanchuceng(value,times);
	}
}

/**
 	检测邮箱,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkEmail("用户名不合法！"，2000);
 */
function checkEmail(content,value,times)
{
	if(!/^\w+@\w+(\.\w+)+$/.test(content))
	{
		tanchuceng(value,times);				
	}
}

/**
 	检测电话号码,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkPhone("电话号码不合法！"，2000);
 */
function checkPhone(content,value,times)
{
	if(!/^1(3|4|5|7|8)\d{9}$/.test(content))
	{
		tanchuceng(value,times);
	}
}

/**
 	检测身份证,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkIDcard("身份证不合法！"，2000);
 */
function checkIDcard(content,value,times)
{
	if(!/\d{17}(\d|X)$/.test(content))
	{
		tanchuceng(value,times);				
	}
}

/**
 	检测地址栏是否为空,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkAdress("地址不能为空！"，2000);
 */
function checkAdress(content,value,times)
{
	if(content=="")
	{
		tanchuceng(value,times);				
	}
}

/**
 	检测邮政编码,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkPostcode("邮政编码不合法！"，2000);
 */
function checkPostcode(content,value,times)
{
	if(!/^[1-9]\d{5}$/.test(content))
	{
		tanchuceng(value,times);				
	}
}

/**
 	检测出生日期,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkBirthday("出生日期不合法！"，2000);
 */
function checkBirthday(content,value,times)
{
	if(!/^[12]\d{3}(\.|-|\/)([0][1-9]|[1][012])(\.|-|\/)([0][1-9]|[1][0-9]|[2][0-9]|[3][01])$/.test(content))
	{
		tanchuceng(value,times);				
	}
}

/**
 	检测国家是否为空,不合格则弹出提示并可设置时间
 	参数：
 		content 测试内容
 		value 弹框提示内容
 		times 弹框消失时间
 	例：checkCountry("国家不能为空！"，2000);
 */
function checkCountry(content,value,times)
{
	if(content=="")
	{
		tanchuceng(value,times);				
	}
}

/**
 	检查结果弹出层
 	参数：
 		value 弹出层内容
 		times 弹出层消失时间
 	例：tanchuceng("我是错误提示",2000);
 */
function tanchuceng(value, times)
{
		
	if(!window.main_z_1_jh)
	{
		window.main_z_1_jh = document.createElement("div");
		
		main_z_1_jh.style.padding = "10px";
		main_z_1_jh.style.background = "#FFFFCC";
		main_z_1_jh.style.borderRadius = "3px";
		main_z_1_jh.style.textAlign = "center";
		main_z_1_jh.style.position = "fixed";
		main_z_1_jh.style.left = "50%";
		main_z_1_jh.style.top = 0;
		main_z_1_jh.style.opacity = 0;
		document.body.insertBefore(main_z_1_jh,document.body.children[0]);
		
	}
	
	main_z_1_jh.innerText = value;
	main_z_1_jh.style.marginLeft = "-"+main_z_1_jh.offsetWidth/2+"px";
	
	clearInterval(main_z_1_jh.showtimer);
	clearTimeout(main_z_1_jh.timeout);
	clearInterval(main_z_1_jh.hidetimer);
	//过渡出现
	main_z_1_jh.showtimer = setInterval(function()
	{
		main_z_1_jh.style.opacity = parseFloat(main_z_1_jh.style.opacity) + 0.05;
		if(main_z_1_jh.style.opacity >= 1)
		{
			clearInterval(main_z_1_jh.showtimer);
			main_z_1_jh.style.opacity = 1;
			main_z_1_jh.timeout = setTimeout(function()
			{
				//过渡消失
				main_z_1_jh.hidetimer = setInterval(function()
				{
					main_z_1_jh.style.opacity = parseFloat(main_z_1_jh.style.opacity) - 0.05;
					if(main_z_1_jh.style.opacity <= 0)
					{
						clearInterval(main_z_1_jh.hidetimer);
						main_z_1_jh.style.opacity = 0;
					}
				},30);
			},times||2000);
		}
	},30);
}









