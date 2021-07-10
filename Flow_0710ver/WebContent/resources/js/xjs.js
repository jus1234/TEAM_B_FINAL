
/**
 * jquery와 prototype의 충돌을 피하기 위한 선언
 */
//var $j = jQuery.noConflict();

/**
 * SELECT객체에 OPTION 객체를 추가한다.
 */
function addOption(selectbox, text, value) {
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

/**
 *  SELECT 객체내의 OPTION들을 모두 제거한다.
 */
function removeAllOptions(selectbox) {
	var i;
	for(i=selectbox.options.length-1;i>=0;i--) {
		selectbox.remove(i);
	}
}

/**
 * SELECT 객체에서 선택된 OPTION을 삭제한다.
 */
function removeOptions(selectbox) {
	var i;
	for(i=selectbox.options.length-1;i>=0;i--) {
		if(selectbox.options[i].selected)
		selectbox.remove(i);
	}
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}

function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function checkQueryString(str) {
	var comp = ["!", "%", "=", "\"", "'", "--", "<", ">", "|"];
	for(var i=0; i<comp.length; i++) {
		if (str.indexOf(comp[i]) > -1) {
			return false;
		}
	}
	return true;
}

function URLEncode(inStr)
{
    outStr=' ';  //not '' for a NS bug!
    for (var i=0; i < inStr.length; i++)
    {
            aChar=inStr.substring (i, i+1);
            switch(aChar)
            {
                    case '%': outStr += "%25"; break;
                    case ',': outStr += "%2C"; break;
                    //case '/': outStr += "%2F"; break;
                    case ':': outStr += "%3A"; break;
                    case '~': outStr += "%7E"; break;
                    case '!': outStr += "%21"; break;
                    case '"': outStr += "%22"; break;
                    case '#': outStr += "%23"; break;
                    case '$': outStr += "%24"; break;
                    case "'": outStr += "%27"; break;
                    case '`': outStr += "%60"; break;
                    case '^': outStr += "%5E"; break;
                    case '&': outStr += "%26"; break;
                    case '(': outStr += "%28"; break;
                    case ')': outStr += "%29"; break;
                    case '+': outStr += "%2B"; break;
                    case '{': outStr += "%7B"; break;
                    case '|': outStr += "%7C"; break;
                    case '}': outStr += "%7D"; break;
                    case ';': outStr += "%3B"; break;
                    case '<': outStr += "%3C"; break;
                    case '=': outStr += "%3D"; break;
                    case '>': outStr += "%3E"; break;
                    case '?': outStr += "%3F"; break;
                    case '[': outStr += "%5B"; break;
                    case '\\': outStr += "%5C"; break;
                    case ']': outStr += "%5D"; break;
                    case ' ': outStr += "+"; break;
                    case '/': outStr += "+"; break;
                    default: outStr += aChar;
            }
    }
    return outStr.substring(1, outStr.length);
}

/**
 * fss.or.kr 에 있는 자료 가져오기
 * @param path
 * @param filename
 * @return
 */
function filedown(path,filename) {
	filedownIFrame.location.href  ="http://www.fss.or.kr/kor/include/file_down.jsp?path="+path+"&filename="+filename;
}

function setSelectValue(obj, value) {
	for(var i=0; i<obj.options.length; i++) {
		if (obj.options[i].value == value) {
			obj.selectedIndex = i;
			return;
		}
	}
}
