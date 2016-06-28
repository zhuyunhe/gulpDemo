var timeInterval;	//计时器
var startTime;		//抢购开始时间
var endTime;		//抢购结束时间
var tag;			//区分新老版的标志位，加了微信支付的2.12版tag=1
$(function(){
	var args = getSearch();	//获取url中的查询参数
	var phoneId = args.phoneId;	//得到手机机器码
	localStorage.setItem('phoneId',phoneId);

	var datastr = sessionStorage.getItem("userData");	//得到用户信息
	var data = JSON.parse(datastr);
	uid = uid || args.uid;								//拿到uid
	tag = args.tag;

	var client = args.client || "";	//拿到客户端信息，2.11版本中安卓和IOS在签到页显示商城
	if(client.toUpperCase()==='IOS' && args.client_version==='2.12.5'){
		tag = '1';
	}

	$('.market').hide();
	if(client && (client==='Android'||client.toUpperCase()==='IOS')){
		$('.market').show();
		//拿到今日抢购商品数据
		getTodayPro();
	}

	//未登录状态
	if(!uid){
		$('.login').show();
		$('.login').on('click',function(){
			sessionStorage.removeItem('userData');
			login();
		});
	} else{
		$('.advance').show();
		//localStorage存入用户id
		localStorage.setItem('uid',uid);
	}
	//2.7之上的版本才有phoneId，暂时用来做版本控制，新版显示做对题数、连续辅导天数、邀请码
	if(!!phoneId){
		$('.getInvitation').show();
	}
	
	if(data){
		//缓存中有用户数据，显示处理
		cookData(data);
	}else{	//第一次进入，sessionStorage中没有数据,去后台请求用户数据
		ajaxInfo();
	}

	//点击活动
	$(".activity").on('click',function(){
		//window.location.href = '/share/activity/lwj.html?itemId=1174&uid='+uid;
		window.location.href = 'http://www.lewaijiao.com/web/neworder';
	});

	//赚金币绑定事件
	$(".getCoin").on('click',getCoin);

	//查看订单事件
	$('.myOrder').on('click',showMyOrder);

	//查看金币规则
	$('.coinRule').on('click',function(){
		window.location.href = '/task/rule.htm';
	});

	//进入商城
	$(".intoMarket").on('click',function(){
		window.location.href = 'http://haojiazhang123.com/share/mall_3.0/flashSale_3.2.html?uid='+uid+'&tag='+tag;
	});
	$(".hotSell").on('click',function(){
		window.location.href = 'http://haojiazhang123.com/share/mall_3.0/goodDetail_xxj.html?item_id=1177&uid='+uid+'&tag='+tag;
	});

	//邀请码
	$('.getInvitation').on('click',function(){
		if(!!uid){
			window.location.href = "http://haojiazhang123.com/share/index/invitation.html?uid="+uid+'&phoneId='+phoneId;
		}else{	//未登录
			sessionStorage.removeItem('userData');	//先清除缓存
			login();
		}
	});

	//下雪效果(有覆盖下面按钮的bug，先去掉)
	//makeSnow();
});

//登录函数
function login()
{
	var u = navigator.userAgent;
	if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
	{
		window.location.href = "ios://login";
	}else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
	{
		window.stub.jsMethod("login");
	}else{
		alert("请下载“好家长”客户端登录");
	}
}
//赚金币函数
function getCoin()
{	
	var u = navigator.userAgent;
	if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
	{
		window.location.href = "ios://getcoin";
	}else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
	{
		window.stub.jsMethod("getcoin");
	}else{
		alert("请下载“好家长”客户端赚金币");
	}
}

//查看订单
function showMyOrder(){
	window.location.href="/share/index/myOrder.html";
}

//判断一个对象是否为空
function isEmptyObj(obj){
	for(var param in obj){
		return false;
	}
	return true;
}

/*
获取URL中请求参数
*/
function getSearch(){
	var query = window.location.search.substring(1);
	var args = {};
	var pairs = query.split('&');
	var pos;
	var key;
	var value;
	for(var i=0; i<pairs.length; i++){
		pos = pairs[i].indexOf('=');
		if(pos === -1){
			continue;
		} else{
			key = pairs[i].substring(0,pos);
			value = pairs[i].substring(pos+1);
			args[key] = decodeURI(value);
		}
	}
	return args;
}
//ajax请求用户数据
function ajaxInfo(){
	$.ajax({
		url : "/task/user_info.json",
		type : "get",
		dataType : "json",
		data : {
			uid : uid,
		},
		success : function(data){
			cookData(data);
		},
		error : function(status){
			//alert(JSON.stringify(status));
		}

	});
}

/*
处理用户数据的函数
*/
function cookData(data){
	if(data.status != 'fail'){
		var datastr = JSON.stringify(data); 
		sessionStorage.setItem("userData",datastr);
		var userInfo = data.user;
		var giftInfo = data.gift;

		var coinArr = [10,15,20,25,30,30,35];						//签到金币的数组

		if(!isEmptyObj(userInfo)){
			var nickName = userInfo.nickname;
			var coinNum;									//用户金币数
			var studyDay = userInfo.study_day;				//学习天数
			var signedDay = parseInt(userInfo.signed_day);	//连续签到天数
			var rightNum = userInfo.right_number;			//做对题数
			var advanceScore = Math.ceil(rightNum/studyDay);
			var progressDay = signedDay>7 ? 7 : signedDay;
			switch(true){
				case signedDay===1 : advanceScore = 5;
					break;
				case signedDay===2 : advanceScore = 10;
					break;
				case signedDay===3 : advanceScore = 15;
					break;
				case signedDay===4 : advanceScore = 20;
					break;
				case signedDay===5 : advanceScore = 25;
					break;
				case signedDay===6 : advanceScore = 30;
					break;
				case (signedDay>6) : advanceScore = 35;
					break;
			}	
			
			var exchangeDone = sessionStorage.getItem('exchangeDone');	//是否兑换过礼品的标志，1表示兑换过，0表示没有兑换过
			if(exchangeDone == 1){
				coinNum = localStorage.getItem('coinNum');				//从缓存中拿用户金币数
			} else{
				coinNum = userInfo.coin_num;							//从请求中拿用户金币数
			}

			//存入localStorage,用户金币数和用户uid、用户名
			localStorage.setItem('coinNum',coinNum);
			localStorage.setItem('uid',uid);
			localStorage.setItem('nickName',nickName);

			//签到天数动态增加效果
			var signedDayInc = new CountUp("signedDay", 0, signedDay);		//累计做对题数自动增长
			signedDayInc.start();
			$('#studyDay').text(studyDay);
			$('#advanceScore').text(advanceScore?advanceScore : 0);
			$('#rightNum').text(rightNum);
			$('#coinNum').text(coinNum);
			$('#todayCoin').text(coinArr[progressDay-1]);
			if(progressDay === 7){
				$('#tomCoin').text(coinArr[6]);
			} else{
				$('#tomCoin').text(coinArr[progressDay]);
			}
			
			//如果第一次,弹窗小猫,issigned===0表示第一次登录
			if(issigned === 0){
				var $bg = $('.bg');
				var $cat = $('.cat');
				$bg.show();
				$cat.show();
				var coinAdd = coinArr[progressDay-1];						//今天签到应该给的金币数
				var coinOld = coinNum - coinAdd;
				var numAnim = new CountUp("catCoin", coinOld, coinNum);		//金币数自动增长
				numAnim.start(function(){
					$bg.hide();
					$cat.hide();
				});
			}

			//点亮进度条
			$('#progressbar>li:lt('+progressDay+')').addClass('active');
		}
		
		var $coinPrize = $(".coinPrize");
		//循环生成礼品
		for(var i=0; i<giftInfo.length; i++){
			$coinPrize.append('<div class="num clearfix" data-id="'+giftInfo[i].id+'">'+
				'<div class="image"><img class="lazy" data-original="'+giftInfo[i].img_path[0]+'"></div>'+
				'<div class="prizeInfo"><p class="prizeName">'+giftInfo[i].title+'</p><p class="prizeCoin">'+giftInfo[i].coin+'金币</p><p class="stock">剩余:'+giftInfo[i].stock+'</p><p class="getPrize" data-id="'+giftInfo[i].id+'">立即兑换</p></div></div>');
		}
		$(".num").on('click',function(event){
			var giftId = $(this).attr("data-id");
			window.location.href = "/share/index/gift.html?giftId="+giftId;
		});

		$("img.lazy").lazyload();
	} else{
		alert('网络异常，请稍后再试');
	}

}

/*
请求今日抢购商品数据，第一次进入签到页后拉取商品数据，随后存入本地，每晚十二点清除本地存储从新拉取
*/
function getTodayPro(){
	var date = getNowDate();						//得到当前日期yyyymmdd
	var oldDate = localStorage.getItem('oldDate');	//获取老时间
	//不是同一天则清除清除本地的商品数据
	if(date !== oldDate){
		localStorage.setItem('oldDate',date);
		localStorage.removeItem('proData');
	}
	var proData = localStorage.getItem('proData');
	if(!proData){
		$.ajax({
			url : "http://haojiazhang123.com/mall/mall_index.json",
			type : "get",
			dataType : "json",
			data : {
				uid : uid,
			},
			success : function(data){
				if(data.status==='success' && data.on_sales.length!==0){
					//处理在售商品
					cookOnsaleData(data.on_sales);
				}
			},
			error : function(status){
				alert(JSON.stringify(status));
			}
		});
	} else{
		cookProData(proData);
	}
}

/*
处理在售商品数据（一共三个，需要倒计时）
@param {}:data，商品信息对象
*/
function cookOnsaleData(data){
	var item_frame = [];   			//一件商品的html框架
	var item_amount = data.length; 	//商品数量
	var endtime_arr = [];			//保存商品销售结束时间的数组
	
	var $list = $('#productList');		//商品容器

	for (var i = 0; i < item_amount; i++) {
		var good = data[i];
		var cover = good.item.cover_square;
		if(!cover){
			cover="/static/images/mall/24.png";
		}
		var item_id = data[i].item.id;
		endtime_arr.push(data[i].end_time); 									//存入每个商品的截止时间
		var improved_ability = data[i].item.improved_ability;
		var improved_ability_arr = improved_ability.split("|",2);
		var url ;
		if(!uid){
			url =  'http://haojiazhang123.com/share/mall_3.0/goodDetail.html?item_id='+item_id+'&endtime='+encodeURI(good.end_time)+'&tag='+tag;
		}else{
			url =  'http://haojiazhang123.com/share/mall_3.0/goodDetail.html?uid='+uid+'&item_id='+item_id+'&endtime='+encodeURI(good.end_time)+'&tag='+tag;
		}
		$('<div class="todayProduct"><a href="'+url+'"><div class="productImg"><img class="lazy" src="/static/images/mall/24.png" data-original="'+cover+'"><p class="countPanel"><img class="clock" src="/static/images/mall/1.png"><span class="countdown"></span></p><p class="hotBuyer">'+good.read_count+'人在抢</p></div></a><p class="productTitle">'+good.item.title+'</p><p class="productDetail clearfix"><span class="price">¥'+good.item.current_price+'</span><span class="oldPrice">¥'+good.item.original_price+'</span></p></div>').appendTo($list);
	}

	//lazyload
	$("img.lazy").lazyload();

	freshTime(endtime_arr);
	timeInterval = setInterval(freshTime,1000,endtime_arr);
}
/*
得到现在的时间,yyyymmdd
@return:20151020
*/
function getNowDate(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	return year+''+month+''+day;
}

// 刷新倒计时时间
function freshTime(endtime_arr)
{
	for(var i=0;i<endtime_arr.length;i++){
		var formed_endtime = endtime_arr[i].replace(/-/gi,'/').replace(/T/gi,' ');
		var endtime=new Date(formed_endtime);//结束时间
        var nowtime = new Date();//当前时间
        var lefttime=  parseInt((endtime.getTime()-nowtime.getTime())/1000)  ; 
        var timestr;
        d= parseInt(lefttime/(24*3600));
        h= parseInt(lefttime/3600%24)<10 ? '0'+parseInt(lefttime/3600%24) : parseInt(lefttime/3600%24);
        m= parseInt(lefttime/60%60)<10 ? '0'+parseInt(lefttime/60%60) : parseInt(lefttime/60%60);
        s= parseInt(lefttime%60)<10 ? '0'+parseInt(lefttime%60) : parseInt(lefttime%60);
        if(d>0){
       		$(".countdown:eq("+i+")").text(d+'天'+h+'时');
       		//$(".countdown:eq("+i+")").text('春节抢购');
        }else{
       		$(".countdown:eq("+i+")").text(h+":"+m+":"+s);
       		//$(".countdown:eq("+i+")").text('春节抢购');
        }
        if(lefttime<=0){
        	$(" .count_time[id="+i+"]").attr({style:"background:gray"});
        	$(".coundown:eq("+i+")").text("已抢光");
        	timestr = "已抢光";
        }
	}
}	

/*
下雪特效
*/
function makeSnow(){
	//初始化canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext("2d");

	//设置画布大小
	var W = $("#canvas").innerWidth();
	var H = $("#canvas").innerHeight();
	canvas.width = W;
	canvas.height = H;

	//产生雪花
	var mp = 80;	//100片雪花
	var particles = [];
	for(var i=0; i<mp; i++){
		particles.push({
			x:Math.random()*W,
			y:Math.random()*H,
			r:Math.random()*2+1,
			d:Math.random()*mp
		});
	}

	//画雪花函数
	function draw(){
		ctx.clearRect(0,0,W,H);
	    //ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
	    ctx.fillStyle = "#ffffff";

		ctx.fill();	//填充雪花的白色

		ctx.beginPath();
		for(var i=0; i<mp; i++){
			var p = particles[i];
			ctx.moveTo(p.x,p.y);
			ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);	//true表示逆时针
		}

		moveFlakes();	//雪花飘起来
  	}

  		var angle = 0;
		//让雪花动起来
		function moveFlakes(){
			angle += 0.01;
			for(var i=0; i<mp; i++){
				var p = particles[i];
				//更新雪花的x，y坐标
				//为了防止cos函数求值为负数时雪花往上飘
				//每片雪花的density参数都不一样，用于产生不同的下降轨迹
				//可以把雪花的半径参数加到计算雪花位置的函数中，让雪花的位置更随机
				p.y += Math.cos(angle+p.d)+1+p.r/2;
				p.x += Math.sin(angle)*2;

				//当雪花飘出画布后，把它们送回画布顶部
				//并且为了让雪花下落的效果更自然，让雪花也可以从画布的左边或右边进入
				if(p.x >W+5 || p.x<-5 || p.y>H){
					if(i%3 > 0){	//66.7%的雪花从顶部进入
						particles[i] = {
							x : Math.random() * W,
							y : -10,
							r : p.r,
							d : p.d
						};
					} else{	//剩余33.3%的雪花
						//如果雪花从右边退出
						if(Math.sin(angle)>0){
							//从左边进入
							particles[i] = {
								x : -5,
								y : Math.random()*H,
								r : p.r,
								d : p.d
							};
						}else{	//从右边进入
							particles[i] = {
								x : W+5,
								y : Math.random()*H,
								r : p.r,
								d : p.d
							};
						}
					}
				}
			}
		}
	//animation loop
	setInterval(draw, 35);
}