var requestCount = 0;
var dartCommon = {
	JSON : "application/json; charset=utf-8",
	HTML : "application/x-www-form-urlencoded; charset=UTF-8",
	ajax : function(objParam, callback, eCallback){
		
		var init = {
			async		: true,
			method		: "POST",		// method type
			dataType	: "json",
			timeout : 120000, 
			data		: null,
			url			: null,
			processData : true,
			contentType	: dartCommon.HTML
		}
		if( objParam === null || typeof objParam !== "object") return false;
		
		if(objParam.contentType === dartCommon.JSON) {
			objParam.data = JSON.stringify(objParam.data);
		}
	
		// param data copy
		$.extend(init, objParam, true);
		
		$(".loadingCommon").show();
		
		$.ajax({
			method		: 	init.method,
			url			: 	init.url,
			data		: 	init.data,		
			dataType	: 	init.dataType,	
			contentType	: 	init.contentType,
			async		: 	init.async,
			processData : 	init.processData,
			beforeSend : function(xhr){
				
				var header = $("meta[name='_csrf_header']").attr("content");
				var token = $("meta[name='_csrf']").attr("content");
				
				if(header && token)xhr.setRequestHeader(header,token);
				
			},
			success: function(obj) {
				if(obj.error){
					if(eCallback){
						eCallback(obj.error);
						return;
					}else{
						alert(obj.error.message);
					}
				}
//					TODO login 여부 check

				$(".loadingCommon").hide();
				
				if(typeof(callback) != 'function'){
					alert('callback function error');
				}else{
					callback(obj);
				}
			},
			error: function(x, textStatus, e) {

				$(".loadingCommon").hide();
				if(typeof(eCallback) != 'function'){
					
					if(x.status==0){
						//alert('네트워크 오류');
						//location.href = "/views/error/error.jsp";
		            }else if(x.status==404){
			            //alert('페이지를 찾을수 없습니다.');
//							location.href = "/views/error/404_error.jsp";
		            }else if(x.status==500){
						//alert('서버에러');
//							location.href = "/views/error/500_error.jsp";
		            }else if(e=='parsererror'){
						//alert('JSON 타싱에러');
						//location.href = "/views/error/error.jsp";
		            }else if(e=='timeout'){
						//alert('타임아웃');
						//location.href = "/views/error/error.jsp";
		            }else {
						//alert('Unknow Error.n'+x.responseText);
//							location.href = "/views/error/error.jsp";
		            }
				}else{
					eCallback(x, textStatus, e);
				}
			}
		});
	}
}
