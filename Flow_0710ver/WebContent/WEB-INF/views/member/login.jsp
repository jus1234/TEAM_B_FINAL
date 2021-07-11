<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
  
<!-- Mirrored from opendart.fss.or.kr/uat/uia/egovLoginUsr.do by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 06 Jul 2021 12:29:40 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
 

<!-- 회사명 찾기 여러개 레이어 팝업 -->
<div class="mask"></div>
<div id="layerPop01" class="companyPop wrap">
</div>

<!-- 업종 상세 찾기 레이어 팝업 2 -->
<div id="layerPop02" class="layerPop layerPopL">
</div>

<!-- 기업개황 레이어 팝업 -->
<div id="layerPop03" class="layerPop layerPopL">
</div>

<!-- 회사명 찾기 단일 레이어 팝업 -->
<div id="layerPop04" class="companyPop wrap">
</div>

<!-- 보고자 찾기 단일 레이어 팝업 -->
<div id="layerPop05" class="companyPop wrap">
</div>

<!-- IP 변경 신청 레이어 팝업 -->
<div id="layerPop06" class="layerPop layerPopL">
</div>

<!-- 변경 신청 내역 상세 레이어 팝업 -->
<div id="layerPop07" class="layerPop layerPopL">
</div>


<div id="wrap">
 
<script type="text/javaScript" language="javascript">
$(document).ready(function(){
	
	
});

function press(event) {
	if (event.keyCode==13) {
		actionLogin();
	}
}

function checkLogin(userSe) {
    document.loginForm.rdoSlctUsr[0].checked = true;
    document.loginForm.rdoSlctUsr[1].checked = false;
    document.loginForm.rdoSlctUsr[2].checked = false;
    document.loginForm.userSe.value = "GNR";
}

function actionLogin() {
	if (document.loginForm.id.value =="") {
        alert("Please enter your ID."); 
    } else if (document.loginForm.password.value =="") {
        alert("Please enter your password."); 
    } else {
        document.loginForm.action="/uat/uia/actionLogin.do";
        //document.loginForm.j_username.value = document.loginForm.userSe.value + document.loginForm.username.value;
        //document.loginForm.action="/j_spring_security_check";
        document.loginForm.submit();
    }
}

function actionCrtfctLogin() {
    document.defaultForm.action="/uat/uia/actionCrtfctLogin.do";
    document.defaultForm.submit();
}

function goFindId() {
    document.defaultForm.action="/uat/uia/egovIdPasswordSearch.do";
    document.defaultForm.submit();
}

function goRegiUsr() {
    document.loginForm.action="/uss/umt/EgovMberInsertView.do";
    document.loginForm.submit();
}

function goFindUsr() {
    document.loginForm.action="/uss/umt/findForm.do";
    document.loginForm.submit();
}

function goGpkiIssu() {
    document.defaultForm.action="/uat/uia/egovGpkiIssu.do";
    document.defaultForm.submit();
}

function setCookieTime (name, value, expires) {
    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
}

function getCookie(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        offset = document.cookie.indexOf(search);
        if (offset != -1) { // 쿠키가 존재하면
            offset += search.length;
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
    return "";
}

function saveid(form) {
    var expdate = new Date();
    // 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
    if (form.checkId.checked)
        expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30일
    else
        expdate.setTime(expdate.getTime() - 1); // 쿠키 삭제조건
    setCookieTime("saveid", form.id.value, expdate);
}

function getid(form) {
    form.checkId.checked = ((form.id.value = getCookie("saveid")) != "");
}

function fnInit() {
	/* if (document.getElementById('loginForm').message.value != null) {
	    var message = document.getElementById('loginForm').message.value;
	} */
    /* if ( != "") {
        alert();
    } */

    /* *************************
    document.loginForm.rdoSlctUsr[0].checked = false;
    document.loginForm.rdoSlctUsr[1].checked = false;
    document.loginForm.rdoSlctUsr[2].checked = true;
    document.loginForm.userSe.value = "USR";
    document.loginForm.id.value="TEST1";
    document.loginForm.password.value="rhdxhd12";
    **************************** */

    //getid(document.loginForm);
    // 포커스
    //document.loginForm.rdoSlctUsr.focus();
    
    getid(document.loginForm);
    
    fnLoginTypeSelect("typeGnr");
    
    
    
}

function fnLoginTypeSelect(objName){

		document.getElementById("typeGnr").className = "";
		document.getElementById("typeEnt").className = "";
		document.getElementById("typeUsr").className = "";
		
		document.getElementById(objName).className = "on";

		document.loginForm.userSe.value = "GNR";
}

function fnShowLogin(stat) {
	if (stat < 1) {	//일반로그인
		$(".login_input").eq(0).show();
		$(".login_input").eq(1).hide();
	} else {		//공인인증서 로그인
		$(".login_input").eq(0).hide();
		$(".login_type").hide();
		$(".login_input").eq(1).show();
	}
}

</script>


<!-- 타이틀 -->
<div class="head_tit">
	<h3>로그인</h3>
	<ul class="navy">
		<li class="home"><img src="../../images/ico_head_title_home.png" alt="홈" /></li>
		<li>계정관리</li>
		<li>로그인</li>
	</ul>
</div>

<!-- 로그인 -->
<div class="loginBox" onLoad="fnInit();">
	
	<div class="loginTop">
		<h4><span class="em">OPEN DART</span> 에 오신 것을 환영합니다.</h4>
		<span class="exp">
			<p>원하시는 서비스를 이용하기 위해서는 로그인을 해주세요.</p>
		</span>
	</div>
	
	<div class="loginWrap">
		<div class="loginImg">
			<div class="imgWrap"></div>
		</div>
		<div class="login">
			<div class="inputWrap">
				<form name="loginForm" id="loginForm" action="https://opendart.fss.or.kr/uat/uia/actionLogin.do" method="post">
					<input type="hidden" id="message" name="message" value="">
					
					<label for="id">이메일</label>
					<input type="text" name="id" id="id" title="이메일" placeholder="이메일" onkeypress="press(event);">
					
					
					<label for="password">Password</label>
					<input type="password" name="password" id="password" maxlength="20" title="Password " placeholder="Password " onkeypress="press(event);">
					
					<input name="userSe" type="hidden" value="GNR"/>
					<input name="j_username" type="hidden"/>
				</form>
			</div>
			<div class="btnWrap">
				<button class="loginBtn" type="button" onclick="actionLogin();">로그인</button>
			</div>
		</div>
	</div>
	
	<div class="loginBottom">
		<div class="accountWrap">
			<div class="btnWrap">
				<button class="accountBtn" type="button" onclick="goRegiUsr(); return false;">인증키 신청</button>
			</div>
			<span class="exp"><p>인증키 신청을 하시면 </p><p>API서비스를 이용하실 수 있습니다.</p></span>
		</div>
		<div class="findWrap">
			<div class="btnWrap">
				<button class="findBtn" type="button" onclick="goFindUsr(); return false;">이메일 / 비밀번호 찾기</button>
			</div>
			<span class="exp"><p>이메일 또는 비밀번호를</p><p> 잊으셨나요? </p></span>
		</div>
	</div>
	
</div>
<!-- //로그인 --> 


			<!-- 메인컨텐츠 영역 끝 -->	
			
		</div>
		</div>
	</div>
	
 
			
</body>
</html>