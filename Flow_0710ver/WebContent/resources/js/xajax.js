/*
 *  1. 화일이름		: xajax.js
 *  2. 작성자			: 신영진
 *  3. 작성일자		: 2008. 05. 08
 *  4. 파일설명		: ajax관련 스크립트 파일
 *  5. 프로그램 변경 내역
 *     1) 2008. 05. 08 / 배포 / 최초 포맷 설정
 *     2) 2008. 07. 04 / 배포 / jquery lib 에서 사용하는 ajax모듈로 전송 모듈 변경.
 *     3) 2008. 07. 06 / 배포 / debug 창 추가
 *     4) 2008. 07. 14 / 배포 / dartHttp.js --> xajax.js로 이름 변경
 *     5) 2008. 07. 15 / 배포 / 결과 xml에 movePage 추가.
 *     6) 2008. 07. 23 / 배포 / XML에 있는 상태정보를 Response Header으로 이동 (김상욱)
 *
 */
xajax = function () {
};

xajax.version = "1.0";
xajax.waitMessage = "데이터 수신중입니다!"; // 잠시만 기다려 주세요!
xajax.fatalErrorMessage = "예기치 않은 오류가 발생하였습니다!"; // 예기치 않은 오류가 발생하였습니다!
xajax.defaultErrorMessage = "요청이 실패하였습니다!"; // 요청이 실패하였습니다!
xajax.url = "";
xajax.execute = "";
xajax.message = "";
xajax.movePage = "";
xajax.openDialog = "";
xajax.queryString = "";
xajax.receivedData = "";
xajax.async = true;
xajax.type = "POST";
xajax.timeout = 120000;
xajax.blockUI = true;
xajax.dataType = "html";
xajax.debugMode = false;
xajax.blockTarget = "";
xajax.blockHeight = "150px";

xajax.setUrl = function (url) {
	xajax.url = url;
};
xajax.setAsync = function (bool) {
	xajax.async = bool;
};
xajax.setType = function (method) {
	xajax.type = method;
};
xajax.setTimeout = function (time) {
	xajax.timeout = time;
};
xajax.setBlockUI = function (bool) {
	xajax.blockUI = bool;
};
xajax.setDataType = function (type) {
	xajax.dataType;
};
xajax.initParameter = function () {
	xajax.queryString = "";
	xajax.blockTarget = "";
};
xajax.findFrm = function (name) {
	var frmArray = $("form");
	for (var i = 0; i < frmArray.length; i++) {
		if (frmArray[i].name == name || frmArray[i].id == name) {
			return frmArray[i];
		}
	}
	return null;
};
xajax.addParameter = function (strKey, strValue) {
	if (xajax.queryString != "") {
		xajax.queryString += "&";
	}
	xajax.queryString += strKey + "=" + encodeURIComponent(strValue);
};
xajax.addParameterObj = function (obj) {
	if (obj != null) {
		if (obj.length == null) {
			if (obj.name != "" && obj.value != "") {
				if (xajax.queryString != "") {
					xajax.queryString += "&";
				}
				xajax.queryString += obj.name + "=" + encodeURIComponent(obj.value);
			}
		} else {
			if (obj.length > 0) {
				for (var i = 0; i < obj.length; i++) {
					if (obj[i].name != "" && obj[i].value != "") {
						if (obj[i].type == "checkbox") {
							if (obj[i].checked == false) {
								continue;
							}
						}
						if (xajax.queryString != "") {
							xajax.queryString += "&";
						}
						xajax.queryString += obj[i].name + "=" + encodeURIComponent(obj[i].value);
					}
				}
			}
		}
	}
};
xajax.addParameterForm = function (frm) {
	if (xajax.findFrm(frm) != null) {
		if (xajax.queryString != "") {
			xajax.queryString += "&";
		}
		xajax.queryString += $(xajax.findFrm(frm)).serialize();
	}
};
xajax.simpleSend = function (url, funcSuccess) {
	xajax.setUrl(url);
	xajax.realSendForm(funcSuccess);
};
xajax.sendForm = function (frmName, url, funcSuccess) {
	xajax.queryString = "";
	xajax.addParameterForm(frmName);
	xajax.setUrl(url);
	xajax.realSendForm(funcSuccess);
};
xajax.fSuccess = function (data, funcSuccess) {
	try {
		document.body.style.cursor = "auto";
	} catch (e) {
	}
	try {
		var execute = xajax.execute;
		var message = xajax.message;
		var movePage = xajax.movePage;
		var openDialog = xajax.openDialog;
		var body = data;
		if (message != null && message != "" && message != "null") {
			if (openDialog == "true") {
				xmsgbox.show(xmsgbox.ICON_INFO, "정보", message, xmsgbox.BTN_OK);
			} else {
				alert(message);
			}
		}
		if (movePage != null && movePage != "" && movePage != "null") {
			document.location = movePage;
		}
		if (execute == "true" && funcSuccess != "" && funcSuccess != null && funcSuccess != "null") {
			funcSuccess(body);
		}
	}
	catch (e) {
		var strTmp = xajax.fatalErrorMessage + "<br/>";
		strTmp += e + "<br/>";
		strTmp += e.description + "<br/>";
		xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp, xmsgbox.BTN_OK);
	}
};
xajax.fError = function (request, textStatus, error) {
	try {
		document.body.style.cursor = "auto";
	} catch (e) {
	}
	try {
		if (request.status == 404) {
			alert("\uc694\uccad\ud558\uc2e0 " + xajax.url + " \ud398\uc774\uc9c0\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.");
		} else {
			alert(xajax.fatalErrorMessage);
		}
		if (xajax.debugMode) {
			var strTmp = "request.status : " + request.status;
			strTmp += "<br>" + request.responseText;
			xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp);
		}
	}
	catch (e) {
		var strTmp = xajax.fatalErrorMessage + "<br/>";
		strTmp += e + "<br/>";
		strTmp += e.description + "<br/>";
		xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp);
		$.unblobkcUI();
	}
};
xajax.realSendForm = function (funcSuccess) {
	try {
		xajax.execute = "";
		xajax.message = "";
		xajax.openDialog = "";
		xajax.movePage = "";
		xajax.receivedData = "";
		try {
			document.body.style.cursor = "progress";
			if (xajax.blockTarget != "") {
				$("#" + xajax.blockTarget).html("<table class='list' border=0 width='100%' height='" + xajax.blockHeight + "'><tr><td align='center' style='line-height: 30px;'><img src='/images/bert2.gif'><br><b>데이터를 수신중입니다!</b></td></tr></table>");
			}
		} catch (e) {
		}
		$.ajax({
			async:xajax.async, 
			type:xajax.type, 
			dataType: xajax.dataType,
			timeout:xajax.timeout, 
			data:xajax.queryString, 
			url:xajax.url, 
			beforeSend:function () {
			}, 
			success:function (data) {
				xajax.receivedData = data;
			}, 
			error:xajax.fError, 
			complete:function (xhr, status) {
				try {
					document.body.style.cursor = "auto";
				} catch (e) {
				}
				if (status == "success") {
					xajax.message = decodeURIComponent(xhr.getResponseHeader("message")).replace(/\+/g, " ");
					xajax.execute = xhr.getResponseHeader("execute");
					xajax.movePage = decodeURIComponent(xhr.getResponseHeader("movePage"));
					xajax.openDialog = xhr.getResponseHeader("openDialog");
					xajax.fSuccess(xajax.receivedData, funcSuccess);
				}
			}
		});
	}
	catch (e) {
		var strTmp = xajax.fatalErrorMessage + "<br/>";
		strTmp += e + "<br/>";
		strTmp += e.description + "<br/>";
		xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp);
	}
};
xajax.getHtml = function(url, target) {
	xajax.blockTarget = target;
	$.ajax({
			async:true, 
			type:"get", 
			dataType: "html",
			timeout:2000, 
			data:xajax.queryString, 
			//contentType: "text/html; euc-kr",
			url:url, 
			success:function (html) {
				try {
					getRef(target).innerHTML = html;
				} catch (e) {
					alert(target);
				} finally {
					;
				}
			}
	}); 
}

xajax.getAutoCompleteScript = function() {
	$.getScript("/corp/searchAutoComplete.do", function() {
		;
	});
}