(function($){
    $(document).ready(function(){
		
		header.sub();
        header.mover();

        frm.checkbox();
		 
//        layerPop.click();
//        layerPop.close();
		
		depthPop.click();
        depthPop.close();
//		layerPop.scroll();

    });
})(jQuery);

// 개발 가이드 토글
$(function() {
	$(".titleWrapToggle").on("click", function(){
		if($(this).find("span").hasClass("iconClose")){
			var _span = $(this).find("span.iconClose");
			$(_span).removeClass("iconClose");
			$(_span).addClass("iconOpen");
		}else{
			var _span = $(this).find("span.iconOpen");
			$(_span).removeClass("iconOpen");
			$(_span).addClass("iconClose");
		}
		$(this).parent().find(".contWrapToggle").toggle();
	});
	
	$(".initHidden").each(function(){
		$(this).trigger("click");
	});
});

// 텝
$(function() {
	$('.DGTab li').click(function() {
	var activeTab = $(this).attr('data-tab');
	$('.DGTab li').removeClass('on');
	$('.DGTabContent').removeClass('on');
	$(this).addClass('on');
	$('#' + activeTab).addClass('on');
	})
});
		
// 레이어팝업 
var layerPop = {
    click: function(){
        var layerPop = $('.layerPop, .companyPop, .errorPopWrap');
        var mask = $('.mask');
        var btnOpen = $('.btnLayerPop');
        
        btnOpen.click(function(e){
            e.preventDefault();
            var className = $(this).attr('class');
            var layerPopName = className.split(' ')[1];
            var layerId;

            layerPop.each(function(i){
                layerId = layerPop.eq(i).attr('id');
                if(layerPopName === layerId){
                    $('#'+layerId).show();
                    var layerPopHeight= layerPop.eq(i).outerHeight();
                    layerPop.eq(i).css({marginTop : - (layerPopHeight / 2) + 'px'});
                    mask.show();

                    $('.btnClose').focus();
                }
            });
        });

        if(layerPop.is(':visible')){
            var layerPop = $('.layerPop, .companyPop, .errorPopWrap');

            layerPop.each(function(i){
                var layerPopHeight= layerPop.eq(i).outerHeight();
                layerPop.eq(i).css({marginTop : - (layerPopHeight / 2) + 'px'});
            });
        }
    },

    close: function(){
        var layerPop = $('.layerPop, .companyPop, .errorPopWrap');
        var mask = $('.mask, .errorPopMask');
        layerPop.on('click', '.btnClose', function(){
            if(layerPop.is(':visible')){
                layerPop.hide();
                mask.hide();
            }
        });
    },

    scroll: function(){
        var layerPop = $('.layerPop, .companyPop, .errorPopWrap');
        if(layerPop.is(':visible')){
            $('html, body').css({overflow: 'hidden', height: '100%'});
        } else {
            $('html, body').css({overflow: 'auto', height: '100%'});
        }
    }
}


// 2뎁스 팝업 
var depthPop = {
    click: function(){
        var depthPop = $('.infoPop');
        var btnOpen = $('.btnDepthPop');
        
        btnOpen.click(function(e){
            e.preventDefault();
            var className = $(this).attr('class');
            var depthPopName = className.split(' ')[1];
            var layerId;

            depthPop.each(function(i){
                layerId = depthPop.eq(i).attr('id');
                if(depthPopName === layerId){
                    $('#'+layerId).show();
                    var depthPopHeight= depthPop.eq(i).outerHeight();
                    depthPop.eq(i).css({marginTop : - (depthPopHeight / 2) + 'px'});
                    mask.show();

                    $('.depthBtnClose').focus();
                }
            });
        });

        if(depthPop.is(':visible')){
            var depthPop = $('.infoPop');

            depthPop.each(function(i){
                var depthPopHeight= depthPop.eq(i).outerHeight();
                ldepthPop.eq(i).css({marginTop : - (depthPopHeight / 2) + 'px'});
            });
        }
    },

    close: function(){
        var depthPop = $('.infoPop');
        depthPop.on('click', '.depthBtnClose', function(){
            if(depthPop.is(':visible')){
                depthPop.hide();
            }
        });
    }	

}

// 컨테이너 가로영역 제어 
$(function () {
	$('.btn_wide_on' ).click( function() {
		$('#contentsWrap').attr('id','zoomContentsWrap');
		$( '.btn_wide_on' ).hide();
		$( '.btn_wide_off' ).show();
	} );
		
	$('.btn_wide_off' ).click( function() {
		$('#zoomContentsWrap').attr('id','contentsWrap');
		$( '.btn_wide_off' ).hide();
		$( '.btn_wide_on' ).show();
	} );
} );


//모바일 gnb 
$(function () {
	$('#m_menu').click(function () {
		$('.m_gnb_wrap').show();
	});
	
	$('.m_gnb .close_btn').click(function () {
		$('.m_gnb_wrap').hide();
	});
});


//모바일 gnb 펼치기 버튼 제어
(function($){

var m_gnbUI = {
 click : function (target, speed) {
   var _self = this,
       $target = $(target);
   _self.speed = speed || 300;
   
   $target.each(function(){
     if(findChildren($(this))) {
       return;
     }
     $(this).addClass('noDepth');
   });
   
   function findChildren(obj) {
     return obj.find('> ul').length > 0;
   }
   
   $target.on('click','a', function(e){
       e.stopPropagation();
       var $this = $(this),
           $depthTarget = $this.next(),
           $siblings = $this.parent().siblings();
     
     $this.parent('li').find('ul li').removeClass('on');
     $siblings.removeClass('on');
     $siblings.find('ul').slideUp(250);
     
     if($depthTarget.css('display') == 'none') {
       _self.activeOn($this);
       $depthTarget.slideDown(_self.speed);
     } else {
       $depthTarget.slideUp(_self.speed);
       _self.activeOff($this);
     }
     
   })
   
 },
 activeOff : function($target) {
   $target.parent().removeClass('on');
 },
 activeOn : function($target) {
   $target.parent().addClass('on');
 }
};


// Call lnbUI
$(function(){
 m_gnbUI.click('.m_gnb li', 300)
});


}(jQuery));




// 웹 gnb 
var header = {
    sub: function(){
        if(!$('#wrap').hasClass('main')){
            $('#wrap').addClass('sub');
        }
    },

    mover: function(){
        var gnbList = $('.gnb');
        var gnbItem = gnbList.children('li').children('a');
        var subList = $('.gnb').find('ul');
        var contents = $('#container, #containerMain, .headerTop');
		var headerTop = $('.headerTop');

        $(".gnb").mouseenter(function(){
            $('#header').addClass('on');
            $('#header').children('.bg01, .gnb').show();
            subList.show();
        });

        $(".gnb").mouseleave(function(){
            $('#header').removeClass('on');
            $('#header').children('.bg01, .gnb').hide();
            subList.hide();
        });
        
    },
    
}

/*  Form 요소 */
var frm = {
    checkbox: function(){
        var checkbox = $('.frm_check');
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
    },
}
