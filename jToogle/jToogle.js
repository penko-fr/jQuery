(function($)
{
    $.fn.jToogle=function(options)
    {    
        var defauts =
        {
            'default': 'off',       //Default value 'on' or 'off'
            'mode' : true,          //true if you only want to click on the hidden part of the switch, false allows the click anywhere
            'class' : 'hover',      //Customizable class hover (top who hide)
            'onToogle': null        //on change switch value
        }; 
        
        var parametres = $.extend(defauts, options);
     
        return this.each(function(){

            var element = $(this);   
            element.html('<div class="'+parametres.class+'"></div>');

            var hover = $(this).children();
       
            element.css({
                'position': 'relative',
                'cursor': 'pointer',
                'overflow': 'hidden'
            });

            hover.css({
                'position': 'absolute',
                'cursor': 'pointer',
                'overflow': 'hidden'
            });

            if($.trim(parametres.default) == 'on'){
                hover.css({'right' : 0});
                element.addClass('jToogleOn');
            }else{
                hover.css({'left' : 0});
            }

            if(parametres.mode == true){
                element.css({'cursor': 'default'});
            }

            element.click(function(event){
                elementClick(element, parametres, event);
            });  

            hover.click(function(event){ 
                hoverClick(element, parametres, event);
            });               
       
        });                  
    };


    $.fn.jToogleChange=function(el)
    {    
        var element = $(this);
        console.log(element.attr('class'));

        return this.each(function(){

            if($(this).hasClass('jToogleOn')){
                toogleOff(element);         
             }else{
                toogleOn(element);         
             }
        });                  
    };


    function elementClick(element, parametres, event ){
        event.stopPropagation();
        if(parametres.mode == false){
            if($(this).hasClass('jToogleOn')){
                toogleOff(element);
                onToogleCallback(parametres, element, 'off');
            }else{
                toogleOn(element);
                onToogleCallback(parametres, element, 'on');
            }
        }
    }


    function hoverClick(element, parametres, event ){
        event.stopPropagation();
        if(element.hasClass('jToogleOn')){
            toogleOff(element);
            onToogleCallback(parametres, element, 'off');
        }else{
            toogleOn(element);  
            onToogleCallback(parametres, element, 'on');               
        }
    }

    //Callback toogleOn
    function toogleOn(element){
        element.children('.hover').css({ 'right' : 0, 'left' : 'auto' });
        element.addClass('jToogleOn');
    }  
    
    //Callback toogleOff
    function toogleOff(element){
        element.children('.hover').css({ 'right' : 'auto', 'left' : 0 });
        element.removeClass('jToogleOn');
    }    

    //Callback return
    function onToogleCallback(parametres, element, value){
        if(parametres.onToogle){
            parametres.onToogle(element, value);
        }
    }    
})(jQuery);