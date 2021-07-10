// =============================================================================
// 공통
// =============================================================================
// 검색폼
var formSearch = "searchForm";
var isKor = false; //국문사이트여부

/**
 * 포커스 이동
 * @param id
 */
function nextFocus(id){
	setTimeout(function(){
		$('#'+id).focus();
	},100);
}

// =============================================================================
// 회사명 검색
// =============================================================================

var winSearchCorp = null; // xwindow object
var divSearchCorp = "divSearchCorpWin"; // ajax 수신 div
var txtSearchCorp = "textCrpNm"; // 회사명 텍스트박스 id
var txtSearchCik = "textCrpCik"; // 회사명 cik
var formSearchCorp = "corpSearchForm"; // 회사명 검색을 위한 액션폼의 id
var urlSearchCorpL = "/corp/searchCorpL.ax";
var urlSearchCorpA = "/corp/searchCorp.ax";
var divSearchCorpL = "corpListContents";
var chkSearchCorp = "checkCorpSelect";
var defaultSearchCrop = "회사명 또는 종목코드를 입력하세요";
var titleSearchCorp = "회사명 찾기";
var widthSearchCorp = 538;
var heightSearchCorp = 595;
var errMsgSearchCorp = "선택된 회사명이 없습니다";
var errMsgNotice = "주의!";
var singleChoice = "N";

/*
 * 회사명찾기 초기화
 */
function initSearchCorp() {
//	$(document.body).append( '<div id="' + divSearchCorp + '" class="x-hidden"></div>');
//	winSearchCorp = xwindow.createWindow(titleSearchCorp, widthSearchCorp, heightSearchCorp, divSearchCorp);
//
//	var frm = findForm(formSearch);
//	if (!frm[txtSearchCorp].value) {
//		frm[txtSearchCorp].value = defaultSearchCrop;
//	}
}


function openCorpInfo(key){
//	destoryToolTip();
	var target = "#layerPop03";

    var layerPop = $(target);
    var mask = $('.mask');
    var btnOpen = $('.btnLayerPop');

    var className = $(target).attr('class');
    var layerPopName = className.split(' ')[1];
    var layerId;

    $("#layerPop03").show();
    var layerPopHeight= layerPop.outerHeight();
    layerPop.css({marginTop : - (layerPopHeight / 2) + 'px'});
    mask.show();

    $('.btnClose').focus();

	dartCommon.ajax({
		url : "/cmm/selectPopup.do", 
		dataType: "html",
		data : {selectKey : key}, 
	}, succ = function(data) {
		$("#layerPop03").empty();
		
		$("#layerPop03").html(data)

//        var layerPop = $(target);

        layerPop.each(function(i){
            var layerPopHeight= layerPop.outerHeight();
            layerPop.css({marginTop : - (layerPopHeight / 2) + 'px'});
        });

        var mask = $('.mask');
        layerPop.on('click', '.btnClose', function(){
            if(layerPop.is(':visible')){
                layerPop.hide();
                mask.hide();
            }
        });
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}


/**
 * Find Company 화면에서 여러 회사를 선택할 수 있게 한다.
 *
 * @return
 */
function openSearchCorpWindow(isMultiCheck) {
	singleChoice = "N";
	var frm = findForm(formSearch);
	if (frm.textCrpNm.value.split("index.html").length > 10) {
		alert("회사명은 동시에 최대 10개까지 조회 가능합니다.");
		frm.textCrpNm.select();
		return;
	}
	clearSearchCorpText();
//	xajax.initParameter();
//	xajax.addParameterObj(frm.textCrpNm);
//	xajax.setTimeout(20000);
//	xajax.blockUI = true;
//	xajax.blockTarget = "";
//	xajax.simpleSend(urlSearchCorpA, function(html) {
//		getRef(divSearchCorp).innerHTML = html;
//		xwindow.show(winSearchCorp);
//		//xwindow.setSize(winSearchCorp, divSearchCorp);
//		xwindow.syncSize(winSearchCorp);
//		setTimeout(function(){document.corpSearchForm.textCrpNm.focus();},100);
//	});
//	blurSearchCorp();
	
	var param = {
			textCrpNm : frm.textCrpNm.value
		};
	if(isMultiCheck == 'Y'){
		frm.isMultiCheck.value = isMultiCheck;
	}

    var layerPop = $('#layerPop04');
    var mask = $('.mask');
    $(layerPop).show();
    var layerPopHeight= layerPop.outerHeight();
    layerPop.css({marginTop : - (layerPopHeight / 2) + 'px'});
    mask.show();
    $('.btnClose').focus();
    
    $("#searchedCorpArea").empty();

	dartCommon.ajax({
		url : "/cmm/searchCorp.do", 
		dataType: "html",
		data : $("#searchForm").serialize(),
	}, succ = function(data) {
		$("#layerPop04").html(data)
		
		$("#textCrpNm").focus();
		
        var layerPopHeight= layerPop.outerHeight();
        layerPop.css({marginTop : - (layerPopHeight / 2) + 'px'});

        layerPop.on('click', '.btnClose', function(){
            if(layerPop.is(':visible')){
                layerPop.hide();
                mask.hide();
            }
        });
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}
/**
 * Find Company 화면에서 회사 하나만 선택할 수 있게 한다.
 *
 * @return
 */
function openSearchCorpWindow_singleChoice() {
	singleChoice = "Y";
	var frm = findForm(formSearch);
	clearSearchCorpText();
	xajax.initParameter();
	xajax.addParameter("singleChoice", singleChoice);
	xajax.addParameterObj(frm.textCrpNm);
	xajax.setTimeout(20000);
	xajax.blockUI = true;
	xajax.blockTarget = "";
	xajax.simpleSend(urlSearchCorpA, function(html) {
		getRef(divSearchCorp).innerHTML = html;
		xwindow.show(winSearchCorp);
		xwindow.setSize(winSearchCorp, divSearchCorp);
		setTimeout(function(){document.corpSearchForm.textCrpNm.focus();},100);
	});
	blurSearchCorp();
}

function searchCorp(page) {
	var frm = findForm("corpSearchForm");

// 	if(frm.textCrpNm.value == "" && frm.searchIndex.value == "") {
// 		alert("회사명을 입력해 주세요.");
// 		return false;
// 	}

    if(page=='') page=1;
    frm.pageIndex.value = page;

    if (!checkQueryString(frm.textCrpNm.value)) {
    	alert("회사명에 [! % = \" ' -- < > |] 문자를 입력할 수 없습니다.");
    	$(frm.textCrpNm).focus();
    	return false;
    }
	
    if(!frm.searchIndex.value && !frm.textCrpNm.value){
    	alert("회사명을 입력하세요.");
    	return;
    }

	dartCommon.ajax({
		url : findForm("corpSearchForm").action, 
		dataType: "html",
		data : $("#corpSearchForm").serialize(), 
	}, succ = function(data) {
		$("#searchedCorpArea").empty();
		
		$("#searchedCorpArea").html(data)

    	$("tr[group='even']:odd").addClass("even");
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}

/**
 * 알파벳으로 조회
 *
 * @param num
 * @return
 */
function searchCorpByIdx(num) {
    var frm = findForm("corpSearchForm");
	frm.searchIndex.value = num;
	frm.textCrpNm.value = "";
	searchCorp('');
}

/**
 * 팝업화면에서 select 버튼을 누를때 발생하는 이벤트
 *
 * @return
 */
function selectSearchCorp() {
	var frm = findForm(formSearchCorp);
	var ciks = getRefNm("hiddenCikCD1");
	var chks = getRefNm(chkSearchCorp);

	var strCiks = "";
	var strChks = "";
	var selectedCnt = 0;
	for ( var i = 0; i < chks.length; i++) {
		if (chks[i].checked == true) {
			strCiks += ciks[i].value + " ";
			strChks += chks[i].value + "/";
			selectedCnt++;
		}
	}
	if(selectedCnt > 10){
		alert("회사명은 10개까지 선택할 수 있습니다.");
		return;
	}

	findElementInForm(formSearch, txtSearchCik).value = strCiks.substr(0,
			strCiks.length - 1);
	findElementInForm(formSearch, txtSearchCorp).value = strChks.substr(0,
			strChks.length - 1);
	if (strCiks == "") {

		alert(errMsgSearchCorp);
		return;
	} else {
		$(".btnClose").trigger("click");
		frm.searchIndex.value = "";
		if(isKor)search(1); // 회사명 선택시 무조건 검색되게 함
	}

}

function clearSearchCorpText() {
	var obj = findElementInForm(formSearch, txtSearchCorp);
	if (obj.value == defaultSearchCrop) {
		obj.value = "";
		findElementInForm(formSearch, txtSearchCik).value = "";
	}
}

function clearSearchCorpCik() {
	findElementInForm(formSearch, txtSearchCik).value = "";
}

function blurSearchCorp() {
	var frm = findForm(formSearch);
	if (!frm[txtSearchCorp].value) {
		frm[txtSearchCorp].value = defaultSearchCrop;
	}
}

function focusSearchCorp() {
	clearSearchCorpText();
}

function validateSearchCorp(obj, id, name, value) {
	var frm = findForm(formSearch);

	clearSearchCorpText();

	if (getRef("typesOfBusiness") != null
			&& getRef("typesOfBusiness").value != "all") {
		if (frm[txtSearchCorp].value) {
			obj.err = "업종선택시 회사명을 입력할 수 없습니다";
			frm[txtSearchCorp].value = "회사명 또는 종목코드를 입력하세요";
			return false;
		} else {
			return true;
		}
	}

	var allItem;
	if (document.all) {
		allItem = document.all["publicType"];
	} else {
		allItem = document.getElementsByName("publicType");
	}

	var checkCnt = 0;
	for ( var i = 0; i < allItem.length; i++) {
		if (allItem[i].checked) {
			checkCnt++;
		}
	}

	if (checkCnt == 0 && frm[txtSearchCorp].value == "") {
		obj.err = "하나이상의 공시유형을 선택하시거나 회사이름을 입력하셔야 합니다.";
		frm[txtSearchCorp].value = defaultSearchCrop;
		return false;
	}

	return true;
}

function getCorpExistAll(corpName) {
	xajax.initParameter();
	xajax.addParameter("textCrpNm", corpName);
	xajax.async = false;
	xajax.blockUI = true;
	var result = true;
	xajax.blockTarget = "";
	xajax.simpleSend("/cmm/searchCorpExistAll.do", function(existAllCik) {
		if (existAllCik == "null") {
			result = false;
		} else {
			findElementInForm(formSearch, txtSearchCik).value = existAllCik
					.substr(0, existAllCik.length - 1);
			xajax.addParameter("textCrpCik", existAllCik);
			result = true;
		}
	});
	xajax.async = true;
	return result;
}

function searchCorpPressEnter(obj) {
	if (event.keyCode == 13) {
		obj.blur();
		searchCorp(1);
	}
}

if(navigator.userAgent.indexOf('Firefox') >= 0){
	(function(){
		var events = ["mousedown", "mouseover", "mouseout", "mousemove", "mousedrag", "click", "dblclick", "onkeyup", "onkeypress", "onkeydown"];
		for (var i = 0; i < events.length; i++){
			window.addEventListener(events[i], function(e){
				window.event = e;
			}, true);
		}
	}());
};
var isDOM = (document.getElementById ? true : false);
var isIE4 = ((document.all && !isDOM) ? true : false);
var isNS4 = (document.layers ? true : false);
var isNS = navigator.appName == "Netscape";

function findForm(name){
  return document.forms[name];
}
function getRef(id) {
	if (isDOM) return document.getElementById(id);
	if (isIE4) return document.all[id];
	if (isNS4) return document.layers[id];
}
function getRefNm(name){
	if (isDOM) return document.getElementsByName(name);
	if (isIE4) return document.all[name];
	if (isNS4) return document.layers[name];
}
function getOpenerRef(id){
	if (isDOM) return window.opener.document.getElementById(id);
	if (isIE4) return opener.document.all[id];
	if (isNS4) return opener.document.layers[id];
}
function getOpenerRefNm(name){
	if (isDOM) return window.opener.document.getElementsByName(name);
	if (isIE4) return opener.document.all[name];
	if (isNS4) return opener.document.layers[name];
}
function findElementInForm(obj, name) {
	frm = findForm(obj);
	for(var i=0; i<frm.length; i++) {
		var ele = frm[i];
		if (ele.getAttribute("name") == name || ele.name == name) {
			return ele;
		}
	}
	return null;
}
function ShowMessage(msg, args) {
  var delim = "^";
  var msgs = msg.split(delim);
  var params = args.split(delim);

  var message = "";
  for (var i = 0 ; i < msgs.length ; i++) {
    message += msgs[i];
    if (params.length <= i) continue;
    message += params[i];

    var j = i + 1;
    if (msgs.length <= j) continue;
    if (!(/^.{1}\(.{1}\)/).test(msgs[j])) continue;

    var bStr = msgs[j].substring(0, 4);
    var eStr = msgs[j].substring(4);
    var ch = params[i].charCodeAt(params[i].length - 1);

    if ((ch - 44032) % 28 > 0) msgs[j] = bStr.charAt(0) + eStr;
    else                       msgs[j] = bStr.charAt(2) + eStr;
  }

  alert(message);
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
};

function chkObjMessage(obj, msg) {
	if (obj.value == "") {
		alert(msg);
		obj.focus();
		return false;
	}
	return true;
}

var deny_char = '! % = \" \' -- < > |';
///////////////070419!!!  회사명에 특수문자 입력 막음
function onlyEng(CrpNm) {
	var deny_pattern = /[!%=\"\'<>|]/;
	var flag = false;

	if (CrpNm.indexOf('--') >= 0) {
		flag = true;
	} else if (deny_pattern.test(CrpNm)) {
		flag = true;
	}

	return flag;
}

function getOpenSize(width, height){
	if (navigator.userAgent.indexOf("Firefox") > -1) {
		height += 10;
	} else if (navigator.userAgent.indexOf("Chrome") > -1) {
		height += 15;
	} else if (navigator.userAgent.indexOf("Safari") > -1) {
		height -= 80;
	}

	return "width="+width+",height="+height;
}


// =============================================================================
// 기간검색
// =============================================================================

// 기간의 시작일자와 종료일 (xcalendar 객체)
var calStartDate = null;
var calEndDate = null;
var txtStartDate = "startDate";
var txtEndDate = "endDate";
var lstFixDate = "pixDate";
var titleStartDate = "검색 시작일";
var titleEndDate = "검색 종료일";

/*
 * 기간의 시작과종료일 초기화
 */
function initCalStartEndDate() {
	if (getRef(txtStartDate).value == "" && getRef(txtEndDate).value == "") {
		setDate();
	}
	// TODO Calendar 적용되면 아래 소스 살려야 함.
	// 기간시작과 기간종료 캘린더 윈도우 생성
//	calStartDate = xcalendar.createWindow(titleStartDate, function(date) {
//		getRef(txtStartDate).value = date;
//		xcalendar.hide(calStartDate);
//	});
//	calEndDate = xcalendar.createWindow(titleEndDate, function(date) {
//		getRef(txtEndDate).value = date;
//		xcalendar.hide(calEndDate);
//	});
}

function setDate(num) {
	var now = new Date();
	var beDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
	var tmp = num;
	if (tmp == 1)
		beDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
	else if (tmp == 2)
		beDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
	else if (tmp == 4)
		beDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
	else if (tmp == 5)
		beDate = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
	else if (tmp == 6)
		beDate = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
	else if (tmp == 7)
		beDate = new Date(1999, 0, 1);
	else
		beDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
	var startDT = formatDate(beDate, "-");
	var endDT = formatDate(now, "-");
	findForm(formSearch).startDate.value = startDT;
	findForm(formSearch).endDate.value = endDT;
//	setDateImg(tmp)
}

//function setDateImg(num) {
//	var tmp = num;
//	var imgs = getRefNm("dateImg");
//	for (var i = 0; i < imgs.length; i++) {
//		if (i + 1 == tmp) {
//			imgs[i].src = "/images/common/" + imgs[i].id + "_on.gif"
//		} else {
//			imgs[i].src = "/images/common/" + imgs[i].id + "_off.gif"
//		}
//	}
//}

function validateDate(obj, id, name, value) {
	var frm = findForm(formSearch);

	if (frm.startDate.value != "" && frm.endDate.value == "") {
		obj.err = "기간 검색은 종료일을 같이 입력하셔야 합니다.";
		obj.err = "기간 검색은 종료일을 같이 입력하셔야 합니다.";
		return false;
	}
	if (frm.endDate.value != "" && frm.startDate.value == "") {
		obj.err = "기간 검색은 시작일을 같이 입력하셔야 합니다.";
		obj.err = "기간 검색은 시작일을 같이 입력하셔야 합니다.";
		return false;
	}
	if (frm.startDate.value != "" || frm.endDate.value != "") {
		if (frm.startDate.value > frm.endDate.value) {
			obj.err = "시작일은 종료일 보다 클 수 없습니다.";
			obj.err = "시작일은 종료일 보다 클 수 없습니다.";
			return false;
		}
	}
	return true;
}

/**
 * 유효한 날짜인지 확인한다.
 *
 * @return
 */
function isDate(obj) {
	var sdate = obj.value;

	if (sdate == "") {
		alert("날짜를 입력하세요.");
		return false;
	}
	if (sdate.length != 10) {
		alert("옳바른 날짜 형식이 아닙니다.");
		return false;
	}

	var year = sdate.substr(0, 4);
	var month = sdate.substr(5, 2) - 1;
	var day = sdate.substr(8, 2);
	var date = new Date(year, month, day);

	if (date.getFullYear() != year || date.getMonth() != month
			|| date.getDate() != day) {

		alert("옳바른 날짜 형식이 아닙니다.");

		return false;
	}

	return true;

}

function openCalStartDate() {
	xcalendar.showWindow(calStartDate);
	// xcalendar.show(calStartDate);
}

function openCalEndDate() {
	xcalendar.showWindow(calEndDate);
	// xcalendar.show(calEndDate);
}

// =============================================================================
// 제출인찾기
// =============================================================================

var winSearchCik = null;
var divSearchCik = "ajaxSearchCik";
var urlSearchCikL = "/presenter/main.ax";
var urlSearchCikA = "/presenter/search.ax";
var formSearchCik = "presenterForm";
var divSearchCikL = "pstListContents";
var titleSearchCik = "제출인명 찾기";

function initSearchCik() {
	$(document.body).append(
			'<div id="' + divSearchCik + '" class="x-hidden"></div>');
	winSearchCik = xwindow.createWindow(titleSearchCik, 530, 560, divSearchCik);
}

function openSearchCik() {
	var frm = findForm(formSearch);
	xajax.initParameter();
	xajax.setTimeout(20000);
	xajax.blockUI = true;
	xajax.addParameterObj(frm.textPresenterNm);
	xajax.blockTarget = "";
	xajax.simpleSend(urlSearchCikL, function(html) {
		getRef(divSearchCik).innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
		xwindow.show(winSearchCik);
		setTimeout(function(){document.presenterForm.textPresenterNm.focus();},100);
	});
}

function searchCik(page) {
	var frm = findForm(formSearchCik);
	/*
	 * 오류... (무조건 searchForm을 탄다 ㅠ.ㅠ) if (!validateStandard(frm, "")) { return
	 * false; } if(frm.textPresenterNm.value==""){ alert("제출인명을
	 * 입력하세요."); return; }
	 */
	if (page == null || page == "" || page == "null") {
		page = 1;
	}
	frm.pageIndex.value = page;
	// frm.searchIndex.value = "";
	xajax.initParameter();
	xajax.blockTarget="";
	xajax.blockUI = true;
	xajax.sendForm(formSearchCik, urlSearchCikA, function(html) {
		getRef(divSearchCikL).innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
	});
}

/**
 * 알파벳으로 조회
 *
 * @param num
 * @return
 */
function searchCikByIdx(num) {
	var frm = findForm(formSearchCik);
	frm.searchIndex.value = num;
	frm.textPresenterNm.value = "";
	frm.pageIndex.value = 1;

	xajax.blockUI = true;
	xajax.sendForm(formSearchCik, urlSearchCikA, function(html) {
		getRef(divSearchCikL).innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
	});
}

function selectSearchCik(str) {
	var frm = findForm(formSearch);
	frm.textPresenterNm.value = str;
	// var frm = findForm(formSearchCik);
	// frm.textPresenterNm.value = str;
	// frm.searchIndex.value = "";
	xwindow.hide(winSearchCik);
}



// =============================================================================
// 업종상세찾기
// =============================================================================
var winSearchCategory = null;
var divSearchCategory = "ajaxSearchCategory";
var urlSearchCategoryForm = "/category/categoryForm.ax";
var urlSearchCategoryData = "/category/categorySearch.ax";
var divSearchCategoryBaseId = "divCode";
var lstSearchCategoryBaseId = "lstCode";
var titleSearchCategory = "업종상세 찾기";
var widthCategory = 550;
var heightCategory = 325;
var errMsgSearchCategory = "중분류 이상 선택하셔야 합니다";
var initHtml = "";


/**
 * 초기화 : 팝업 영역 잡기
 */
function initSearchCategory() {
	$(document.body).append(
			'<div id="' + divSearchCategory + '" class="x-hidden"></div>');
	winSearchCategory = xwindow.createWindow(titleSearchCategory,
			widthCategory, heightCategory, divSearchCategory);
}

/**
 * 선택박스에서 onChange 가 발생될 때 객체 저장
 * @param selectList
 */
var SearchCategoryObj;
function selectCategory(obj){
	SearchCategoryObj = obj;
}

/**
 * 업종상세찾기 팝업 열기
 */
function openSearchCategory() {

    var layerPop = $('#layerPop02');
    var mask = $('.mask');
    $(layerPop).show();
    var layerPopHeight= layerPop.outerHeight();
    layerPop.css({marginTop : - (layerPopHeight / 2) + 'px'});
    mask.show();
    $('.btnClose').focus();
    
	dartCommon.ajax({
		url : "/cmm/categoryForm.do", 
		dataType: "html",
		data : $("#searchForm").serialize(),
	}, succ = function(data) {
		$(layerPop).html(data)
		
        layerPop.each(function(i){
            var layerPopHeight= layerPop.eq(i).outerHeight();
            layerPop.eq(i).css({marginTop : - (layerPopHeight / 2) + 'px'});
        });

        var mask = $('.mask');
        layerPop.on('click', '.btnClose', function(){
            if(layerPop.is(':visible')){
                layerPop.hide();
                mask.hide();
            }
        });
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}

/**
 * 업종 선택박스의 이벤트를 설정한다.
 */
function setEventCategory(Idx){
	//이벤트 초기화
    $('#lstCode'+Idx).click(function(){
    	changeSearchCategory(Idx);
    }).keyup(function(event){
		if (event.which == 13) {
			changeSearchCategory(Idx);
		}
	});
}

/**
 * 선택박스의 항목을 클릭/엔터/선택 했을 때 발생되는 이벤트
 */
var optionAll = '<option value="all">전체</option>';
function changeSearchCategory(Idx) {
	var nextIdx = Idx+1 ;
	if(nextIdx > 4) return;
	if(nextIdx == 2){
        $('#lstCode3').html(optionAll);
        $('#lstCode4').html(optionAll);
	}else if(nextIdx == 3){
		$('#lstCode4').html(optionAll);
	}
	
	var param = {};

	var v = $('#lstCode'+Idx).val() ;
	if (Idx == 1) {
		param.indCodeStart = v.substring(0, 2);
		param.indCodeEnd = v.substring(2, 4);
	} else {
		param.indCode = v;
	}
	param.lstId = lstSearchCategoryBaseId + nextIdx;

	dartCommon.ajax({
		url : "/cmm/categorySearch.do", 
		dataType: "html",
		data : param, 
	}, succ = function(data) {
		$('#lstCode'+ nextIdx).html(data);
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}

function selectSearchCategory() {
	var values = new Array(4);
	var value = null;
	var text = null;
	for (var i = 0; i < 4; i++) {
		var obj = getRef(lstSearchCategoryBaseId + (i+1));
		values[i] = obj.value;
		if (values[i] != "all") {
			value = values[i];
			text = HtmlSelect.getSelectedText(obj);
		}
	}
	if (values[1] == "all") {
		alert(errMsgSearchCategory);
		return;
	}

	var obj = getRef("typesOfBusiness");
	if(!HtmlSelect.containedValue(obj,value)){
		value='SSS'+value;HtmlSelect.addOption(obj,text,value);
	}
	HtmlSelect.setSelectedIndexByValue(obj, value);

	$("#layerPop02 .btnClose").trigger("click");
}

function fnCloseLayerPopup(target){
	$(target).closest("div.layerPop").find(".btnClose").trigger("click");
// 	$("#layerPop02 .btnClose").trigger("click");
}
// =============================================================================
// 보고서명찾기 : 상세검색
// =============================================================================
var winFindReport = null;
var divFindReport = "winFindReport";
var urlFindReportL = "/report/main.ax";
var urlFindReportA = "/report/search.ax";
var urlFindReportKind = "/report/searchReportKind.ax";
var formFindReport = "formReportForm";
var titleFindReport = "보고서명 찾기";
var initHtmlFindReport = "";
var optionAllFindReport = '<option value="">전체</option>' ;
/**
 * 보고서명찾기 초기화
 */
function initFindReport() {
	$(document.body).append(
			'<div id="' + divFindReport + '" class="x-hidden"></div>');
	winFindReport = xwindow.createWindow(titleFindReport, 538, 585, divFindReport);
}
/**
 * 보고서명찾기 팝업 열기
 */
function openFindReport() {	
	xajax.initParameter();
	xajax.addParameter("rpt_nm_e", $('#reportName').val());
	xajax.blockUI = true;
	xajax.blockTarget = "";
	xajax.simpleSend(urlFindReportL, function(html) {
		getRef(divFindReport).innerHTML = html;
		xwindow.show(winFindReport);
		setTimeout(function(){
			document.formReportForm.rpt_market.focus();
		},100);
	});
}
/**
 * 보고서명찾기 조회
 */
function searchFindReport() {
	var frm = findForm(formFindReport);
	xajax.initParameter();
	xajax.blockUI=true;
	xajax.blockTarget="";
	xajax.sendForm(formFindReport, urlFindReportA, function(str) {
		getRef("reportListContents").innerHTML = str;
		/*$("tr[group='even']:odd").addClass("even");*/
	});
}


/**
 * 보고서명찾기 Dialog 보고서 선택
 */
function selectFindReport(reportNm) {
	var frm = findForm(formSearch);
	frm.reportName.value = reportNm;
	frm.reportNamePopYn.value="Y";
	xwindow.hide(winFindReport);
}

/**
 * 보고서명찾기 Dialog 보고서구분 조
 */
function searchBsnTp() {
	if ($('#dspTp').val() != "")
		xajax.sendForm(formFindReport, urlFindReportKind, searchBsnTpResult);
}

/**
 * 보고서명찾기 Dialgo 보고서구분 조회 결과
 */
function searchBsnTpResult(str) {

	var obj = findForm(formFindReport).bsnTp;

	var cnt = obj.length;
	while (cnt > 0) {
		obj.options.remove(0);
		cnt--;
	}
	var optAll = new Option();
	optAll.value = "";
	optAll.text = "전체";
	obj.add(optAll);

	var kindResult = eval(str.replace(/(^\s*)|(\s*$)/g, ""));
	for ( var i = 0; i < kindResult.length; i++) {
		var opt = new Option();
		opt.value = kindResult[i][0];
		opt.text = kindResult[i][1];
		obj.add(opt);
	}
}

// =============================================================================
// 첨부서류 찾기
// =============================================================================
var winFindAttach = null;
var divFindattach = "winFindAttach";

function initFindAttach() {
	$(document.body).append(
			'<div id="' + divFindattach + '" class="x-hidden"></div>');
	winFindAttach = xwindow.createWindow("첨부서류명 찾기", 532, 500, divFindattach);
}

function openFindAttach() {
	var frm = findForm("searchForm");
	xajax.initParameter();
	xajax.addParameterObj(frm.attachDocNm);
	xajax.setTimeout(30000);
	xajax.blockUI = true;
	xajax.blockTarget = "";
	xajax.simpleSend("/attach/main.ax", function(html) {
		getRef(divFindattach).innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
		xwindow.show(winFindAttach);
	});
}

function searchFindAttach() {
	xajax.initParameter();
	xajax.blockUI=true;
	xajax.blockTarget="";
	xajax.sendForm("attachSearchForm", "/attach/search.ax", function(html) {
		getRef("attachlistContents").innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
	});
}

function selectFindAttach(str) {
	findForm("searchForm").attachDocNm.value = str;
	findForm("searchForm").attachDocNmPopYn.value="Y";
	xwindow.hide(winFindAttach);
}

function searchPressEnter(obj, evt) {
	if (evt.keyCode == 13) {
		search(1);
	}
}
function clearReportPopYn() {
	var frm=findForm(formSearch);
	frm.reportNamePopYn.value="N";
}
function clearAttachDocNmPopYn() {
	var frm=findForm(formSearch);
	frm.attachDocNmPopYn.value="N";
}

// =============================================================================
// 펀드명 검색
// =============================================================================

var winSearchFund = null; // xwindow object
var divSearchFund = "divSearchCorpWin"; // ajax 수신 div
var txtSearchFund = "textCrpNm"; // 펀드명 텍스트박스 id
var txtSearchFundCik = "textCrpCik"; // 펀드명 cik
var formSearchFund = "corpSearchForm"; // 펀드명 검색을 위한 액션폼의 id
var urlSearchFundL = "/corp/searchFundL.ax";
var urlSearchFundA = "/corp/searchFund.ax";
var divSearchFundL = "corpListContents";
var chkSearchFund = "checkCorpSelect";
var defaultSearchFund = "펀드명 또는 펀드코드를 입력하세요";
var titleSearchFund = "펀드명 찾기";
var widthSearchFund=535;
var heightSearchFund=570;
var errMsgSearchFund = "선택된 펀드명이 없습니다";
//var singleChoice = "N";
/*
 * 펀드명찾기 초기화
 */
function initSearchFund() {
	$(document.body).append(
			'<div id="' + divSearchFund + '" class="x-hidden"></div>');
	winSearchFund = xwindow.createWindow(titleSearchFund, widthSearchFund,
			heightSearchFund, divSearchFund);
	var frm = findForm(formSearch);
	if (!frm[txtSearchFund].value) {
		frm[txtSearchFund].value = defaultSearchFund;
	}
}

/**
 * Find Company 화면에서 여러 펀드를 선택할 수 있게 한다.
 *
 * @return
 */
function openSearchFundWindow() {
	singleChoice = "N";
	var frm = findForm(formSearch);
	clearSearchFundText();
	xajax.initParameter();
	xajax.addParameterObj(frm.textCrpNm);
	xajax.setTimeout(20000);
	xajax.blockUI = true;
	xajax.blockTarget = "";
	xajax.simpleSend(urlSearchFundA, function(html) {
		getRef(divSearchFund).innerHTML = html;
		xwindow.show(winSearchFund);
		xwindow.setSize(winSearchFund, divSearchFund);
		setTimeout(function(){$('#corpSearchForm input[name=textCrpNm]').focus();},700);
	});
	blurSearchFund();

}
/**
 * Find Company 화면에서 펀드명 하나만 선택할 수 있게 한다.
 *
 * @return
 */
function openSearchFundWindow_singleChoice() {
	// alert("openSearchCorpWindow_singleChoice");
	singleChoice = "Y";
	var frm = findForm(formSearch);
	clearSearchFundText();
	xajax.initParameter();
	xajax.addParameter("singleChoice", singleChoice);
	xajax.addParameterObj(frm.textCrpNm);
	xajax.setTimeout(20000);
	xajax.blockUI = true;
	// xajax.blockTarget = divSearchCorp;
	xajax.blockTarget = "";
	xajax.simpleSend(urlSearchFundA, function(html) {
		getRef(divSearchFund).innerHTML = html;
		xwindow.show(winSearchFund);
	});
	blurSearchFund();

}

function searchFund(page) {
	var frm = findForm(formSearchFund);
	if (page == null || page == "" || page == "null") {
		page = 1;
	}
	frm.pageIndex.value = page;
	xajax.initParameter();
	xajax.addParameterObj(frm.textCrpNm);
	xajax.blockUI = true;
	xajax.blockTarget = divSearchFundL;
	xajax.sendForm(formSearchFund, urlSearchFundL, function(str) {
		getRef(divSearchFundL).innerHTML = str;
	});
}

/**
 * 알파벳으로 조회
 *
 * @param num
 * @return
 */
function searchFundByIdx(num) {
	var frm = findForm(formSearchFund);
	frm.searchIndex.value = num;
	frm.textCrpNm.value = "";
	searchFund();
}

/**
 * 팝업화면에서 select 버튼을 누를때 발생하는 이벤트
 *
 * @return
 */
function selectSearchFund() {

	var frm = findForm(formSearchFund);
	var ciks = getRefNm("hiddenCikCD1");
	var chks = getRefNm(chkSearchCorp);

	var strCiks = "";
	var strChks = "";
	for ( var i = 0; i < chks.length; i++) {
		if (chks[i].checked == true) {
			strCiks += ciks[i].value + " ";
			strChks += chks[i].value + "/";
		}
	}

	findElementInForm(formSearch, txtSearchFundCik).value = strCiks.substr(0,
			strCiks.length - 1);
	findElementInForm(formSearch, txtSearchFund).value = strChks.substr(0,
			strChks.length - 1);

	if (strCiks == "") {

		alert(errMsgSearchFund);
		return;
	} else {

		xwindow.hide(winSearchFund);
		frm.searchIndex.value = "";
		search(1); // 회사명 선택시 무조건 검색되게 함
	}

}

function clearSearchFundText() {
	var obj = findElementInForm(formSearch, txtSearchFund);
	if (obj.value == defaultSearchFund) {
		obj.value = "";
	}

}

function clearSearchFundCik() {
	findElementInForm(formSearch, txtSearchFundCik).value = "";
}

function blurSearchFund() {
	var frm = findForm(formSearch);
	if (!frm[txtSearchFund].value) {
		frm[txtSearchFund].value = defaultSearchFund;
	}
}

function focusSearchFund() {
	clearSearchFundText();
}

function validateSearchFund(obj, id, name, value) {
	var frm = findForm(formSearch);

	clearSearchFundText();

	if (getRef("typesOfBusiness") != null
			&& getRef("typesOfBusiness").value != "all") {
		if (frm[txtSearchFund].value) {
			obj.err = "업종선택시 회사명을 입력할 수 없습니다";
			frm[txtSearchFund].value = "회사명 또는 종목코드를 입력하세요";
			return false;
		} else {
			return true;
		}
	}

	var allItem;
	if (document.all) {
		allItem = document.all["publicType"];
	} else {
		allItem = document.getElementsByName("publicType");
	}

	var checkCnt = 0;
	for ( var i = 0; i < allItem.length; i++) {
		if (allItem[i].checked) {
			checkCnt++;
		}
	}

	if (checkCnt == 0 && frm[txtSearchFund].value == "") {
		obj.err = "하나이상의 공시유형을 선택하시거나 펀드명을 입력하셔야 합니다.";
		frm[txtSearchFund].value = defaultSearchFund;
		return false;
	}

	return true;
}

function getFundExistAll(corpName) {
	xajax.initParameter();
	xajax.addParameter("textCrpNm", corpName);
	xajax.async = false;
	xajax.blockUI = true;
	var result = true;
	xajax.blockTarget = "";
	xajax.simpleSend("/fund/searchExistAll.ax", function(existAllCik) {
		if (existAllCik == "null") {
			result = false;
		} else {
			findElementInForm(formSearch, txtSearchFundCik).value = existAllCik
					.substr(0, existAllCik.length - 1);
			xajax.addParameter("textCrpCik", existAllCik);
			result = true;
		}
	});
	xajax.async = true;
	return result;
}

function searchFundPressEnter(obj) {
	if (event.keyCode == 13) {
		obj.blur();
		searchFund(1);
	}
}

// =============================================================================
// 자산운용사명 찾기
// =============================================================================

var winSearchFundCik = null;
var divSearchFundCik = "ajaxSearchCik";
var urlSearchFundCikL = "/presenter/mainFund.ax";
var urlSearchFundCikA = "/presenter/searchFund.ax";
var formSearchFundCik = "presenterForm";
var divSearchFundCikL = "pstListContents";
var titleSearchFundCik = "자산운용사명 찾기";

function initSearchFundCik() {
	$(document.body).append(
			'<div id="' + divSearchFundCik + '" class="x-hidden"></div>');
	winSearchFundCik = xwindow.createWindow(titleSearchFundCik, 530, 555,
			divSearchFundCik);
}

function openSearchFundCik() {
	var frm = findForm(formSearch);
	xajax.initParameter();
	xajax.setTimeout(20000);
	xajax.blockUI = true;
	xajax.addParameterObj(frm.textPresenterNm);
	xajax.blockTarget = "";
	xajax.simpleSend(urlSearchFundCikL, function(html) {
		getRef(divSearchFundCik).innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
		xwindow.show(winSearchFundCik);
	});
}

function searchFundCik(page) {
	var frm = findForm(formSearchFundCik);

	if (page == null || page == "" || page == "null") {
		page = 1;
	}
	frm.pageIndex.value = page;
	// frm.searchIndex.value = "";
	xajax.initParameter();
	xajax.blockTarget="";
	xajax.blockUI = true;
	xajax.sendForm(formSearchFundCik, urlSearchFundCikA, function(html) {
		getRef(divSearchFundCikL).innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
	});
}

/**
 * 알파벳으로 조회
 *
 * @param num
 * @return
 */
function searchFundCikByIdx(num) {
	var frm = findForm(formSearchFundCik);
	frm.searchIndex.value = num;
	frm.textPresenterNm.value = "";
	frm.pageIndex.value = 1;

	xajax.blockUI = true;
	xajax.sendForm(formSearchFundCik, urlSearchFundCikA, function(html) {
		getRef(divSearchFundCikL).innerHTML = html;
		$("tr[group='even']:odd").addClass("even");
	});
}

function selectSearchFundCik(str) {
	var frm = findForm(formSearch);
	frm.textPresenterNm.value = str;
	xwindow.hide(winSearchFundCik);
}

// =============================================================================
// 보고서명 찾기 (펀드공시용)
// =============================================================================

var winFindFundReport = null;
var divFindFundReport = "winFindReport";
var urlFindFundReportL = "/report/mainFund.ax";
var urlFindFundReportA = "/report/searchFund.ax";
var urlFindFundReportKind = "/report/searchFundReportKind.ax";
var formFindFundReport = "formReportForm";
var titleFindFundReport = "보고서명 찾기";

function initFindFundReport() {
	$(document.body).append(
			'<div id="' + divFindFundReport + '" class="x-hidden"></div>');
	winFindFundReport = xwindow.createWindow(titleFindFundReport, 530, 555,
			divFindReport);
}

function openFindFundReport() {
	var frm = findForm(formSearch);
	xajax.initParameter();
	xajax.addParameter("dcmNm", frm.reportName.value);
	xajax.blockUI = true;
	xajax.blockTarget = "";
	xajax.simpleSend(urlFindFundReportL, function(str) {
		getRef(divFindFundReport).innerHTML = str;
		xwindow.show(winFindFundReport);
	});
}

/**
 * 보고서명찾기 조회
 */
function searchFindFundReport() {
	xajax.initParameter();
	xajax.blockUI=true;
	xajax.blockTarget=""
	xajax.sendForm(formFindFundReport, urlFindFundReportA, function(str) {
		getRef("reportListContents").innerHTML = str;
	});
}

/**
 * 보고서명찾기 Dialog 보고서 선택
 */
function selectFindFundReport(reportNm) {
	var frm = findForm(formSearch);
	frm.reportName.value = reportNm;
	frm.reportNamePopYn.value="Y";
	xwindow.hide(winFindFundReport);
}

/**
 * 보고서명찾기 Dialog 보고서구분 조
 */
function searchFundBsnTp() {
	var frm = findForm(formFindFundReport);
	if (frm.dspTp.value != "")
		xajax.sendForm(formFindFundReport, urlFindFundReportKind,
				searchFundBsnTpResult);
}


/**
 * 목록의 최대개수를 변경한다.
 */
function changeMaxResults(max){

	var frm = findForm("searchForm");
	frm.maxResults.value=max;
	search(1);
	//alert("max="+frm.maxResults.value);
	location.href="#layoutTop";

}

/*ie9 createContextualFragment error관련*/
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment){
	Range.prototype.createContextualFragment = function(html){var frag = document.createDocumentFragment(),div = document.createElement("div");
	frag.appendChild(div);
	div.outerHTML = html;
	return frag;
	};
}

/**
 * 리스트 정렬을 값을 넣고 search()를 호출한다.
 * img속성에 name="sortImg"로 해야 하며 각각 id값을 다르게 하야 한다.
 * /img/sort 밑에 해당 id값으로 된 폴더가 존재 하여야 하며, asc.gif, desc.gif, disable.gif가 존재해야 한다.
 *
 * obj - dom4j Element(클릭된 이미지 객체)
 *
 * return
 */
function setOrder(obj){
	var sortOrdr = document.searchForm.sortOrdr;
    var sortStdr = document.searchForm.sortStdr;

	var imgs = getRefNm("sortImg");
	for(var i = 0; i < imgs.length; i++){
		if(imgs[i].id == obj.id){
            sortStdr.value = obj.id;
			if(sortOrdr.value == "asc"){
				sortOrdr.value = "desc";
				imgs[i].src = "/images/sort/"+imgs[i].id+"/on_asc.gif";
			}else{
				sortOrdr.value = "asc";
				imgs[i].src = "/images/sort/"+imgs[i].id+"/on_desc.gif";
			}
		}else{
			imgs[i].src = "/images/sort/"+imgs[i].id+"/off_asc.gif";
		}
	}
	search('');
}

function setOrder_ext005(obj){
	var sortOrdr=document.searchForm.sortOrdr;
	var sortStdr=document.searchForm.sortStdr;

	var sumSortOrdr=document.searchForm.sumSortOrdr;
	var sumSortStdr=document.searchForm.sumSortStdr;

	var imgs=getRefNm("sortImg");
	//alert("obj.id :>>> "+obj.id);
	for(var i=0;i<imgs.length;i++){
		//alert("imgs["+i+"].id :>>>> "+ imgs[i].id);
		if(imgs[i].id==obj.id){
			if(obj.id == "sum"){
				sumSortStdr.value=obj.id;
				if(sumSortOrdr.value=="asc"){
					sumSortOrdr.value="desc";
				}else{
					sumSortOrdr.value="asc";
				}
			}else {
				sortStdr.value=obj.id;
				if(sortOrdr.value=="asc"){
					sortOrdr.value="desc";
				}else{
					sortOrdr.value="asc";
				}
			}
		}
	}// for

	search('');
}

function clearSearchCorpIdx(){
	var frm=findForm("corpSearchForm");
	frm.searchIndex.value="";
}

function initCheckBox(target){
    var checkbox = $(target + ' .frm_check');
    checkbox.each(function(i){
        checkbox.eq(i).click(function(){
            if(checkbox.eq(i).hasClass('single') && checkbox.eq(i).hasClass('disabled')){
                return false;
            } else if(checkbox.eq(i).hasClass('single')){
                if($(this).children(':checkbox').is(':checked')){
                    $(this).removeClass('checked').children(':checkbox').prop('checked', false);
                } else {
                    $(this).addClass('checked').children(':checkbox').prop('checked', true);
                }
            }
        });

        if(checkbox.eq(i).hasClass('single') && checkbox.eq(i).hasClass('disabled')){
            checkbox.eq(i).addClass('disabled');
        }
    });

    var termCheck = $('.termCheck');
    termCheck.each(function(i){
        termCheck.eq(i).click(function(){
            if($(this).children(':checkbox').hasClass('chkReadonly')){
                return false;
            }
        });
    })
}

function allChecks(obj, str) {
    var chks = getRefNm(str);
	for(var i=0; i < chks.length; i++) {
    	chks[i].checked = obj.checked;
	}
}

function oneCheck(obj, str) {
	if(obj.checked == false && getRef(str).checked == true) {
    	getRef(str).checked = false;
    } else if (obj.checked == true && getRef(str).checked == false) {
		var chks = getRefNm(obj.name);
		var j = 0;
		for(var i=0; i < chks.length; i++) {
			if(chks[i].checked == true) j++;
		}
		if(chks.length == j) getRef(str).checked = true;
	}
}

function scrapFeed(cik) {
    var rssValue = "";
    if(cik == "today"){
    	rssValue = "http://dart.fss.or.kr/api/todayRSS.xml";
    }
    else{
    	rssValue = "http://dart.fss.or.kr/api/companyRSS.xml?crpCd=" + cik;
    }

    if(window.clipboardData){  // IE처리
    	if (window.clipboardData.setData("Text", rssValue)) {
        	alert('클립보드에 복사되었습니다');
    	}
    }
    else {                     // 비IE 처리
    	window.prompt ("Ctrl+C를 눌러 클립보드로 복사하세요", rssValue);
    }
}

var win_num = 1;

function openReportViewer(rcpNo, dcmNo){
	var _host = "http://dart.fss.or.kr/";
	var url = _host + "/dsaf001/main.do?rcpNo=" + rcpNo;
	if (dcmNo) {
		//<![CDATA[
		url += "&dcmNo=" + dcmNo;
		//]]>
	}

	var size = getOpenSize(1024, 768);
	window.open(url, rcpNo+win_num, size+",resizable=yes");
	win_num++;
	if (dcmNo) {
		$("#r_"+rcpNo+dcmNo).css("color","#cd0093");
	}else{
		$("#r_"+rcpNo).css("color","#cd0093");
	}
}

function openReportViewerDetail(rcpNo, page, toc, gubun){
	//page = 4(재무), 5(사업보고서)
	//page = 4, toc = 0(재무-연결) | 5(재무-개별), gubun = J(주석)
	//page = 5, gubun = A부터

/*	var _host = "http://dart.fss.or.kr";
	var url = _host + "/dsext004/viewer.do?rcpNo=" + rcpNo + "&page=" + page + "&selectToc=" + toc + "&gubun=" + gubun;
*/
	var url = "/disclosureinfo/viewer.do?rcpNo=" + rcpNo + "&page=" + page + "&selectToc=" + toc + "&gubun=" + gubun;
	
	var size = getOpenSize(1024, 768);
	window.open(url, rcpNo+win_num, size+",resizable=yes");
	win_num++;
	$("#r_"+rcpNo).css("color","#cd0093");
}

function fnCheckValue(target){
	if($("#corpSearchForm input[name=isMultiCheck]").val() != "Y"){
		if($(target).prop('checked')){
			$("input[name='checkCorpSelect']:checked").prop('checked', false);
			$(target).prop('checked', true);
		}
	}
}

/**
 * Date 객체를 받아서 구분자로 연결된 문자열 형태로 리턴한다.
 *
 * date - Date 객체
 * separator - 년과 월, 월과일 사이에 연결할 문자열
 *
 * return 문자열
 */
function formatDate(date, separator){
	if((date.getMonth()+1) < 10) month = "0"+(date.getMonth()+1);
	else month = date.getMonth()+1;
	if(date.getDate() < 10) day = "0"+date.getDate();
	else day = date.getDate();
	return date.getFullYear() + "" + separator + "" + month+ "" + separator+ "" + day;
}



//=============================================================================
//보고자찾기
//=============================================================================

var winSearchReporter = null;
var divSearchReporter = "ajaxSearchCik";
var urlSearchReporterL = "/reporter/main.ax";
var urlSearchReporterA = "/reporter/search.ax";
var formSearchReporter = "reporterForm";
var divSearchReporterL = "pstListContents";
var titleSearchReporter = "보고자 찾기";

function openSearchReporter() {
	var frm = findForm(formSearch);
	var srchfrm = findForm("searchForm");	

    var layerPop = $('#layerPop05');
    var mask = $('.mask');
    $(layerPop).show();
    var layerPopHeight= layerPop.outerHeight();
    layerPop.css({marginTop : - (layerPopHeight / 2) + 'px'});
    mask.show();
    $('.btnClose').focus();

	dartCommon.ajax({
		url : "/cmm/reporterMain.do",
		dataType: "html",
		data : $("#searchForm").serialize(), 
	}, succ = function(data) {
		$("#layerPop05").html(data)
		
        var layerPopHeight= layerPop.outerHeight();
        layerPop.css({marginTop : - (layerPopHeight / 2) + 'px'});

        layerPop.on('click', '.btnClose', function(){
            if(layerPop.is(':visible')){
                layerPop.hide();
                mask.hide();
            }
        });
        clearSearchReporterIdx();
        clearSearchReporter();
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}

function searchReporter(page) {
	var frm = findForm(formSearchReporter);

	if (page == null || page == "" || page == "null") {
		page = 1;
	}
	frm.pageIndex.value = page;

    if (!checkQueryString(frm.textReporterNm.value)) {
    	alert("보고자명에 [! % = \" ' -- < > |] 문자를 입력할 수 없습니다.");
    	$(frm.textReporterNm).focus();
    	return false;
    }

	dartCommon.ajax({
		url : "/cmm/reporterSearch.do",
		dataType: "html",
		data : $("#reporterForm").serialize(), 
	}, succ = function(data) {
		$("#pstListContents").html(data)
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}

/**
* 알파벳으로 조회
*
* @param num
* @return
*/
function searchReporterByIdx(num) {
	var frm = findForm(formSearchReporter);
	frm.searchIndex.value = num;
	frm.textReporterNm.value = "";
	frm.textReporterCik.value = "";
	frm.pageIndex.value = 1;

	dartCommon.ajax({
		url : "/cmm/reporterSearch.do",
		dataType: "html",
		data : $("#reporterForm").serialize(), 
	}, succ = function(data) {
		$("#pstListContents").html(data)
	}, err = function(xhr, textStatus, error) {
		alert(error);
	});
}

function selectSearchReporter(str, str1) {
	var frm = findForm(formSearch);
	frm.textReporterNm.value = str;
	frm.textReporterCik.value = str1;

	$("#layerPop05 .btnClose").trigger("click");
}

function clearSearchReporterIdx() {
	var frm = findForm(formSearchReporter);
	frm.searchIndex.value = "";
}

function clearSearchReporter() {
	var frm = findForm(formSearchReporter);
	frm.textReporterCik.value = "";
	frm.pageIndex.value = 1;
}

function searchReporterPressEnter(obj) {
	if (event.keyCode == 13) {
		obj.blur();
		searchReporter(1);
	}
}

function setOrder_ext004(obj){
	var sortOrdr=document.searchForm.sortOrdr;
	var sortStdr=document.searchForm.sortStdr;


	var imgs=getRefNm("sortImg");
	//alert("obj.id :>>> "+obj.id);
	for(var i=0;i<imgs.length;i++){
		//alert("imgs["+i+"].id :>>>> "+ imgs[i].id);
		if(imgs[i].id==obj.id){
			sortStdr.value=obj.id;
			if(sortOrdr.value=="asc"){
				sortOrdr.value="desc";
			}else{
				sortOrdr.value="asc";
			}
		}
	}// for

	search('');
}
