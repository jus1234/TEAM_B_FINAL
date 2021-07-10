
var HtmlSelect = {setSelectedIndexByValue:function (obj, value, caseSensitive) {
	for (var i = 0; i < obj.length; i++) {
		if (caseSensitive) {
			if (obj.options[i].value == value) {
				obj.selectedIndex = i;
				return;
			}
		} else {
			if (obj.options[i].value.toLowerCase() == value.toLowerCase()) {
				obj.selectedIndex = i;
				return;
			}
		}
	}
}, setSelectedIndexByText:function (obj, value, caseSensitive) {
	for (var i = 0; i < obj.length; i++) {
		if (caseSensitive) {
			if (obj.options[i].text == value) {
				obj.selectedIndex = i;
				return;
			}
		} else {
			if (obj.options[i].text.toLowerCase() == value.toLowerCase()) {
				obj.selectedIndex = i;
				return;
			}
		}
	}
}, getSelectedText:function (obj) {
	return obj.options[obj.selectedIndex].text;
}, containedValue:function (obj, value, caseSensitive) {
	for (var i = 0; i < obj.length; i++) {
		if (caseSensitive) {
			if (obj.options[i].value == value) {
				return true;
			}
		} else {
			if (obj.options[i].value.toLowerCase() == value.toLowerCase()) {
				return true;
			}
		}
	}
	return false;
}, addOption:function(selectbox,text,value) {
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}};


var filter = /^([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
//var commaFilter = /^([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]|[\*])$/;
var commaFilter = /^([1-2\*]?[0-9\*]?[0-9\*])$/;

function fnIpChange(target, regExp){
	if( !regExp.test($(target).val()) && ($(target).val()) ){
		alert("IP는 숫자만 입력 가능합니다.");
		$(target).focus();
		$(target).val("");
	}
}

function checkPassword(pw){
	var isPass = true;

	var pattern1 = /[a-zA-Z]/;
	var pattern2 = /[0-9]/;
	var pattern3 = /[!@#$%^&*()]/;

	if(pw.length < 8 || pw.length > 14){
		isPass = false;
	}
	if(isPass && !pattern1.test(pw)){
		isPass = false;
	}
	if(isPass && !pattern2.test(pw)){
		isPass = false;
	}
	if(isPass && !pattern3.test(pw)){
		isPass = false;
	}

	if(!isPass){
		return "비밀번호는 영문자, 숫자, 특수문자( !,@,#,$,%,^,&,*,(,) )를 반드시 포함하여 8~14자리로 입력해야 합니다.";
	}

	if(!checkConsecutivePw(pw) || checkKeyboard(pw) == "3"){
		return "비밀번호는 동일문자/연속문자/키보드 연속문자를 3자이상 입력 하실 수 없습니다!";
	}

	return "";
}

function checkConsecutivePw(pw){
	var pw_passed = true;
	var SamePass_0 = 0; //동일문자 카운트
	var SamePass_1 = 0; //연속성(+) 카운드
	var SamePass_2 = 0; //연속성(-) 카운드

    for(var i=0; i < pw.length; i++){
	    var chr_pass_0;
	    var chr_pass_1;
	    var chr_pass_2;

	    chr_pass_0 = pw.charCodeAt(i-2);
	    chr_pass_1 = pw.charCodeAt(i-1);
	    chr_pass_2 = pw.charCodeAt(i);

	  	//동일문자 카운트
        if((chr_pass_0 == chr_pass_1) && (chr_pass_1 == chr_pass_2)){
        	SamePass_0 ++;
        } else {
        	SamePass_0 = 0;
        }

        //연속성(+) 카운드
        if(chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1){
            SamePass_1++;
        } else {
        	SamePass_1 = 0;
        }

        //연속성(-) 카운드
        if(chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1){
            SamePass_2++;
        } else {
        	SamePass_2 = 0;
        }

		if(SamePass_0 > 0){
			pw_passed = false;
		}
		if(SamePass_1 > 0 || SamePass_2 > 0){
			pw_passed = false;
		}
		if(SamePass_0 > 0){
			pw_passed = false;
		}
		if(!pw_passed){
			return false;
			break;
		}
    }
    return true;
}

function checkKeyboard(pw) {
	var result = "0";
	var chek = "";

	var kb1rowUp = "~!@#$%^&*()_+";
	var kb1rowLow = "`1234567890-=";
	var kb2rowUp = "QWERTYUIOP{}";
	var kb2rowLow = "qwertyuiop[]";
	var kb3rowUp = "ASDFGHJKL:\""; // "은 \"으로 인식 처리
	var kb3rowLow = "asdfghjkl;'";
	var kb4rowUp = "ZXCVBNM<>?";
	var kb4rowLow = "zxcvbnm,./";

	var pwArrList = new Array(	kb1rowUp, kb1rowUp.split("").reverse().join(""),
								kb1rowLow, kb1rowLow.split("").reverse().join(""),
								kb2rowUp, kb2rowUp.split("").reverse().join(""),
								kb2rowLow, kb2rowLow.split("").reverse().join(""),
								kb3rowUp, kb3rowUp.split("").reverse().join(""),
								kb3rowLow, kb3rowLow.split("").reverse().join(""),
								kb4rowUp, kb4rowUp.split("").reverse().join(""),
								kb4rowLow, kb4rowLow.split("").reverse().join("")  );

	for(var i = 0; i < pw.length-2; i++) {
		chek = pw.charAt(i) + pw.charAt(i+1) + pw.charAt(i+2);

		for(var j = 0; j < pwArrList.length; j++) {
			if(pwArrList[j].indexOf(chek) != -1) {
				result = "3"; //자판 연속
			}
		}
	}
	return result;
}

function isValidPhoneNum(num) {
    var pattern = /^\d{9}/;
    if (!pattern.test(num.value)) return false;
    
    return true;
}

function isValidBizNo(el) {

    var pattern = /([0-9]{3})?([0-9]{2})?([0-9]{5})/;
    var num = el.value;

    if (!pattern.test(num)) return false;
    var strNumb = RegExp.$1 + RegExp.$2 + RegExp.$3;

    sumMod  =   0;
    sumMod  +=  parseInt(strNumb.substring(0,1), 10);
    sumMod  +=  parseInt(strNumb.substring(1,2), 10) * 3 % 10;
    sumMod  +=  parseInt(strNumb.substring(2,3), 10) * 7 % 10;
    sumMod  +=  parseInt(strNumb.substring(3,4), 10) * 1 % 10;
    sumMod  +=  parseInt(strNumb.substring(4,5), 10) * 3 % 10;
    sumMod  +=  parseInt(strNumb.substring(5,6), 10) * 7 % 10;
    sumMod  +=  parseInt(strNumb.substring(6,7), 10) * 1 % 10;
    sumMod  +=  parseInt(strNumb.substring(7,8), 10) * 3 % 10;
    sumMod  +=  Math.floor(parseInt(strNumb.substring(8,9)) * 5 / 10);
    sumMod  +=  parseInt(strNumb.substring(8,9), 10) * 5 % 10;
    sumMod  +=  parseInt(strNumb.substring(9,10), 10);

    if (sumMod % 10 != 0) {
        return false;
    }
    return true;
}

function setCookieDay(name, value, expiredays) {
	var today = new Date();
	today.setDate(today.getDate() + expiredays);
	document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toGMTString() + ';'
}

function getCookie(name) {
	var cName = name + '=';
	var x = 0;
	var i = 0;
	while (i <= document.cookie.length) {
		var y = (x + cName.length);
		if (document.cookie.substring(x, y) == cName) {
			if ((endOfCookie = document.cookie.indexOf(';', y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(' ', x) + 1;
		if (x == 0)
			break;
	}
	return '';
}
