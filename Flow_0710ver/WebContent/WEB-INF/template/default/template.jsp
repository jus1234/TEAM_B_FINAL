<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<title>FLOW</title>
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<link rel="stylesheet" type="text/css" href="resources/css/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/custom.css" />
<link rel="stylesheet" type="text/css" href="resources/css/slick.css" />
<link rel="stylesheet" type="text/css" href="resources/js/jquery-ui-1.12.1/jquery-ui.min.css" />
<link rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;," />
<script type="text/javascript" src="resources/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="resources/js/cssCommon.js"></script>
<script type="text/javascript" src="resources/js/slick.min.js"></script>
<script type="text/javascript" src="resources/js/util.js"></script>
<script type="text/javascript" src="resources/js/xajax.js"></script>
<script type="text/javascript" src="resources/js/search.js"></script>
<script type="text/javascript" src="resources/js/xjs.js"></script>
<script type="text/javascript" src="resources/js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="resources/js/jquery-ui-1.12.1/datepicker-ko.js"></script>
<script>
$(document).ready(function(){
});
/* 메인 롤링배너 */
$(document).ready(function(){
    var mainVisual = $('.visualSlide').slick({
        dots: true,
        dotsClass: 'visualDots',
        touchMove: false,
        draggable: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000
    });

    var currentIndex = ($('.visualSlide').slick('slickCurrentSlide'));
    setTimeout(function(){
        $('.slick-slide').eq(currentIndex+1).addClass('ts');
    }, 100);


    $('.visualSlide').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.slick-slide').removeClass('ts').eq(currentSlide+1).addClass('ts');
    });

    $('.visualDots').children('li:last').after('<li class="playSetup"><button type="button">멈춤</button></li>')

    $('.mainVisualArea').mousemove(function(e){
//         $('.visualMove > span').parallax(-25,e);
    });

    $('.playSetup > button').click(function(){
        if($(this).hasClass('play')){
            mainVisual.slick('slickPlay');
            $(this).removeClass('play').addClass('stop').text('멈춤');
        } else {
            mainVisual.slick('slickPause');
            $(this).removeClass('stop').addClass('play').text('재생');
        }
    });

    var innoMain = $('.innoSlideMain').slick({
        fade: true,
        speed: 1000,
        slidesToshow: 1,
        slidesToScroll: 1,
        dots: false,
        touchMove: false,
        draggable: true,
        arrows: true,
        infinite: true,
        autoplay: false,
        asNavFor: '.innoSlideRolling',
        prevArrow: $('.btnSlideArea > .btnPrev'),
        nextArrow: $('.btnSlideArea > .btnNext'),
        rtl: true
    });

    var innoRolling = $('.innoSlideRolling').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        asNavFor: '.innoSlideMain',
        dots: false,
        touchMove: false,
        draggable: false,
        arrows: false,
        infinite: true,
        autoplay: false,
        focusOnSelect: true,
        variableWidth: true,
        rtl: true
    });

    mainVisualImage();

    $(window).resize(function(){
        mainVisualImage();
    });

    fnInitNoitce();
	
});
/* 메인 롤링 배너 비쥬얼 이미지 */
var mainVisualImage = function(){
    var visual  = $('.visualMove');
    var bgImg = visual.children('span');
    
    visual.css({width:$(window).width()+'px', height: $(window).height()+'px'});
    bgImg.css({width:($(window).width()+200)+'px', height: ($(window).height()+200)+'px'});
}
function fnDetailView(target){
	$(target).closest("form[name='subForm']").submit();
}
function closeWin(windowNum) {
	switch (windowNum) {
	case 0: // 0일 경우만 시스템 공지
		if (document.getElementById("pop_today0").checked) {
			setCookieDay("notice0", "done", 7);
		}
		document.getElementById('errorPopWrap').style.display = "none";
		break;
	case 1:
		if (document.getElementById("pop_today1").checked) {
			setCookieDay("notice1", "done", 1);
		}
		document.getElementById('mainPop01').style.display = "none";
		break;
	case 2:
		if (document.getElementById("pop_today2").checked) {
			setCookieDay("notice2", "done", 1);
		}
		document.getElementById('mainPop02').style.display = "none";
		break;
	case 3:
		if (document.getElementById("pop_today3").checked) {
			setCookieDay("notice3", "done", 1);
		}
		document.getElementById('mainPop03').style.display = "none";
		break;
	default:
		break;
	}
}
function fnInitNoitce(){
	cookiedata = document.cookie;
/* 
	//시스템 공지사항
	if(document.getElementById('errorPopWrap')){
		if (cookiedata.indexOf("notice0=done") < 0) {
			document.getElementById('errorPopWrap').style.display = "inline";
		} else {
			document.getElementById('errorPopWrap').style.display = "none";
		}
	}
 */
	if(document.getElementById('mainPop01')){
		if (cookiedata.indexOf("notice1=done") < 0) {
			document.getElementById('mainPop01').style.display = "inline";
		} else {
			document.getElementById('mainPop01').style.display = "none";
		}
	}
	if(document.getElementById('mainPop02')){
		if (cookiedata.indexOf("notice2=done") < 0) {
			document.getElementById('mainPop02').style.display = "inline";
		} else {
			document.getElementById('mainPop02').style.display = "none";
		}
	}
	
	if(document.getElementById('mainPop03')){
		if (cookiedata.indexOf("notice3=done") < 0) {
			document.getElementById('mainPop03').style.display = "inline";
		} else {
			document.getElementById('mainPop03').style.display = "none";
		}
	}
}
function fnPopNoitce(){
	var url	= "/popup/notice.html";
	var opt	= "resizable=no, scrllbars=1, status=no, width=695, height=945, left=5, top=10";
	window.open(url,'notice',opt);
}
</script>
<script type="text/javascript">
	function actionLogout()
	{
		document.selectOne.action = "/uat/uia/actionLogout.do";
		document.selectOne.submit();
		//top.document.location.href = "/j_spring_security_logout";
	}
    function toSNS(sns, menu) {
    	var strTitle = document.title;
    	var strURL = "https://opendart.fss.or.kr/index.jsp?null";
//     	if(menu == "110"){
//     		strTitle = "대표이사ㆍ신고담당이사 공시서류 확인 및 서명";
//     	} else if(menu == "120"){
//     		strTitle = "대표이사ㆍ신고담당이사 이사의 경영진단 및 분석의견";
//     	} else if(menu == "210"){
//     		strTitle = "공시실무자 정기 보고서";
//     	} else if(menu == "220"){
//     		strTitle = "공시실무자 주요사항 보고서";
//     	} else if(menu == "230"){
//     		strTitle = "공시실무자 발행공시";
//     	} else if(menu == "240"){
//     		strTitle = "공시실무자 합병";
//     	} else if(menu == "310"){
//     		strTitle = "지분공시의무자 대량 보유상황 보고";
//     	} else if(menu == "320"){
//     		strTitle = "지분공시의무자 임원 소유상황 보고";
//     	} else if(menu == "330"){
//     		strTitle = "지분공시의무자 단기매매차익 반환";
//     	} else if(menu == "400"){
//     		strTitle = "공시업무스케쥴";
//     	} else if(menu == "500"){
//     		strTitle = "공시의무를 미이행시 어떤 일이 일어날까요?";
//     	} else{
//     		strTitle = "기업공시 길라잡이";
//     	}
     	//strURL = "http://dart.fss.or.kr/introduction/content1.do";
        if(sns == 'T'){
        	window.open("//twitter.com/home?status="+encodeURIComponent(strTitle) + ' ' + strURL);
        }
        else if(sns == 'F'){
            window.open("https://www.facebook.com/sharer/sharer.php?u="+strURL+"&t="+strTitle);
        }
        else if(sns == 'B'){
        	window.open("http://blog.naver.com/openapi/share?url=" + encodeURIComponent(strURL) + "&title=" + encodeURIComponent(strTitle));
        }
        else if(sns == 'K'){
       		Kakao.Link.sendDefault({
       			objectType: 'feed',
       			content: {
       				title: strTitle,
       				description: strTitle,
       				imageUrl: "http://opendart.fss.or.kr/images/common/logo.gif",
       				imageWidth: 800,
       				imageHeight: 450,
       				link: {
       					mobileWebUrl: strURL,
       					webUrl: strURL
      					}
       			}
       		});
       	}
        else if(sns == 'M'){
    		if (window.sidebar && window.sidebar.addPanel) {
    			// Firefox version < 23
    			window.sidebar.addPanel(strTitle, strURL, '');
    		} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
    			//Firefox version >= 23 and Opera Hotlist
    			var elem = document.createElement('a');
    			elem.setAttribute('href',strURL);
    			elem.setAttribute('title',strTitle);
    			elem.setAttribute('rel','sidebar');
    			elem.click();
    		} else if (window.external && ('AddFavorite' in window.external)) {
    			// IE Favorite
    			window.external.AddFavorite(strURL, strTitle);
    		} else {
    			// WebKit - Safari/Chrome
    			alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
    		}
        }
    }
</script>
</head>
<body>
<div id="wrap">
		<tiles:insertAttribute name="header"/>
			<tiles:insertAttribute name="body"/>
		<tiles:insertAttribute name="footer"/>
	</div>
</body>
</html>