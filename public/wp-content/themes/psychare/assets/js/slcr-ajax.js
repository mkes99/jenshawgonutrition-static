jQuery(document).ready( function($){
    "use strict";
    // init Isotope
    var $blog_container = $('.blog__wrap');     
    var bpage = 2; 

    $('body').on('click', '.blog__loadmore_type_1', function() {  
        var ajaxurl = jQuery(this).data("blogajax-url");
        var ajaxSecurity = jQuery(this).data("blogajax-security");
        var blogajaxloadimage = jQuery(this).data("blogajax-loadimage");
        var nopage = jQuery(this).data("blogajax-nopage");
        $('.blog__loadmore_type_1').hide(); 
        $('.loading__animation').toggle(); 
            var data = {
            'action': 'slcr_posts_by_ajax',
            'page': bpage,
            'security': ajaxSecurity
        };

        $.post(ajaxurl, data, function(response) {  
            $('.pagination__blog').remove(); 
             if(response !==""){
                // Update isotope container with new data. 
                $blog_container.isotope('remove', $blog_container.data('isotope').$allAtoms )
                $blog_container.isotope('insert', $(response) )
                // trigger isotope again after images have been loaded
                .imagesLoaded( function() {
                    $blog_container.isotope('layout');
                }); 
                slcr_ajax_LazyLoad();
                if(nopage>bpage){
                    $('.my-posts').append('<div class="pagination__blog pagination__load text-center" ><span class="blog__loadmore_type_1" data-blogajax-nopage="'+nopage+'" data-blogajax-security="'+ajaxSecurity+'" data-blogajax-url="'+ajaxurl+'" data-blogajax-loadimage="'+blogajaxloadimage+'">Load More Posts</span><span class="loading__animation"style="background: url('+blogajaxloadimage+');"></span></div>');
                    bpage++;     
                }
                
            }
        
        });
    });

    // Lazy Load
    function slcr_ajax_LazyLoad() {
        var myLazyLoad = new LazyLoad ({
            elements_selector: ".lazy",
            class_loaded: "lazy-loading"
        });
    }
     
    var page = 2;
    $('body').on('click', '.blog__loadmore', function() { 

        var ajaxurl = jQuery(this).data("blogajax-url");
        var ajaxSecurity = jQuery(this).data("blogajax-security");
        var blogajaxloadimage = jQuery(this).data("blogajax-loadimage");
        var nopage = jQuery(this).data("blogajax-nopage");
        
        $('.blog__loadmore').hide(); 
        $('.loading__animation').toggle(); 
            var data = {
            'action': 'slcr_posts_by_ajax',
            'page': page,
            'security': ajaxSecurity
        };

        $.post(ajaxurl, data, function(response) {  
            $('.pagination__blog').remove(); 
             if(response !==""){
                $('.my-posts').append(response);
                slcr_ajax_LazyLoad();
                if(nopage>page){
                    $('.my-posts').append('<div class="pagination__blog pagination__load text-center" ><span class="blog__loadmore" data-blogajax-nopage="'+nopage+'" data-blogajax-security="'+ajaxSecurity+'" data-blogajax-url="'+ajaxurl+'" data-blogajax-loadimage="'+blogajaxloadimage+'">Load More Posts</span><span class="loading__animation"style="background: url('+blogajaxloadimage+');"></span></div>'); 
                    page++;
                }
            }
        
        });
    });  

    $( "body" ).on( "click",".add_to_cart_button", function(event) {   
       
         setTimeout(
          function() 
          { 

            jQuery("[name='update_cart']").trigger("click"); 

                var ajaxurl = $( "body" ).data('ajax-url');  
                  
                $.ajax({ 
                    url : ajaxurl,
                    type : 'post',
                    data : {
                         action: 'slcr_ajax_cart' , 
                    },
                    error : function( response ){
                        console.log(response);
                    }, 
                    success: function(data){  
                        $('.cart__value').text(data);
                        var cartnum = parseInt(data);
                        if(cartnum == 0){
                             var ajaxurl = $( "body" ).data('ajax-url');  
                  
                            $.ajax({ 
                                url : ajaxurl,
                                type : 'post',
                                data : {
                                     action: 'slcr_ajax_cart' , 
                                },
                                error : function( response ){
                                    console.log(response);
                                }, 
                                success: function(data){  
                                    $('.cart__value').text(data); 
                                    $(".cart__module.empty").css("display", "none");
                                    $(".cart__module.has-items").css("display", "block");   
                                    $('.cart__value').addClass('animate-in');  
                                    setTimeout(
                                    function(){ 
                                        $('.cart__value').removeClass('animate-in'); 
                                    }, 700); 
                                    
                                } 
                                    
                            });  
                            $.ajax({ 
                                url : ajaxurl,
                                type : 'post',
                                data : {
                                     action: 'slcr_ajax_cart_list' , 
                                },
                                error : function( response ){
                                    console.log(response);
                                }, 
                                success: function(data){  
                                     $('#cart-ajax-sidebar').html(data);            
                                 } 
                                    
                            });  
                        }else {
                            $(".cart__module.empty").css("display", "none");
                            $(".cart__module.has-items").css("display", "block");   
                            $('.cart__value').addClass('animate-in');  
                            setTimeout(
                            function(){ 
                                $('.cart__value').removeClass('animate-in'); 
                            }, 700); 
                        }
                        
                      $('.cart__sidebar').attr('data-cart-value', '1'); 
                    }     
                });

                $.ajax({ 
                    url : ajaxurl,
                    type : 'post',
                    data : {
                         action: 'slcr_ajax_cart_list' , 
                    },
                    error : function( response ){
                        console.log(response);
                    }, 
                    success: function(data){  
                         $('#cart-ajax-sidebar').html(data);            
                     } 
                        
                }); 
          }, 700);        
    });
});