/*!
 * 
 *   admin-scripts.js - slcr - Responsive Multipurpose WordPress Theme
 *   Author: Slash Creative <https://www.slashcreative.co>
 *   Version: v1.0
 * 
 */
jQuery(document).ready(function ($) {

    "use strict";
    if($("#pum_popup_settings").length >0) {
        exit();
    } 

    var final_id = [];
    var final_name = [];
    var final_acf_hidden = [];
    var tabid;
    var tabidout;
    var i = 0;
    var j = 0;
    var k = 0;
    var hide = 0;
    var contentl;
    var m = 0;

    function ACF_metabox_tabs() {
        var any_metaboxes = 0;
        $(".acf-postbox").closest(".meta-box-sortables").addClass("tab-container");
        $(".acf-postbox").each(function () { 

            $(".acf-postbox").removeClass("closed");
            $(".acf-postbox").addClass("slcr-ot");

            $(this).wrap('<div class="tabbed-content"></div>');

            if ($(this).css('display') == 'none') {
                final_acf_hidden.push("1");
            } else {
                any_metaboxes=1;
                final_acf_hidden.push("0");
            }

            var tab_name = $(this).find('h2.hndle').text();
            var tab_id = this.id;
            final_id.push(tab_id);
            final_name.push(tab_name);
        });
        contentl = final_acf_hidden.length;

        $(".tabbed-content").wrapAll('<div class="tabbed-metaboxes">');



        $(".tabbed-content").each(function () {
            if (i <= contentl) {

                $(this).attr('id', 'slcr-' + final_id[i]);
            }
            i++;
        });

        $(".tabbed-metaboxes").prepend('<ul class="tabs slcr_acf_tabs_8904593490">');
        $(".tabbed-metaboxes").append('</ul>');
        while (k < contentl) {
            if (final_acf_hidden[k] == 0) {

                tabidout = "slcr-" + final_id[k];

                if (m == 0) {
                    $(".slcr_acf_tabs_8904593490").append('<li class="active slcr-acf-group-list" id="li-' + tabidout + '" rel="' + tabidout + '"><i class=""></i>' + final_name[k] + '</li>');
                    m++;
                } else {
                    $(".slcr_acf_tabs_8904593490").append('<li class="slcr-acf-group-list" id="li-' + tabidout + '" rel="' + tabidout + '"><i class=""></i>' + final_name[k] + '</li>');
                }

            }
            k++;
        }
 
        $( document ).on( "click", ".tabbed-metaboxes .tabs li", function() {
            setTimeout(
                function () {
                    // for gutenburg update
                    $(".acf-postbox").each(function () { 
                        if (!$(this).hasClass("slcr-ot")) {  
                            $(".acf-postbox").removeClass("closed");
                            $(".acf-postbox").addClass("slcr-ot");

                            $(this).wrap('<div class="tabbed-content" id="slcr-' + this.id +'"></div>'); 
                             

                            var tab_name = $(this).find('h2.hndle').text();
                            var tab_id = this.id;
                            final_id.push(tab_id);
                            final_name.push(tab_name);

                            if ($(this).parent().parent().find("tabbed-content")) {
                                $(this).parent().parent().before($(this).parent()); 
                                $('.slcr-acf-group-list.active').trigger( "click" );  
                            }
                        }
                    });
                }, 500);
            var $tabs = $(this).closest('.tabs');
            var $content = $(this).closest('.tabbed-metaboxes');
            $tabs.find("li").removeClass("active");
            $(this).addClass("active");

            $content.find(".tabbed-content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();
        });
        $('.tabbed-metaboxes').insertAfter('#wpb_visual_composer');

        $(".tabbed-metaboxes").prepend('<h2 class="mvl_hndle hndle ui-sortable-handle"><span>Advance page and post options</span></h2> <a href="https://slashcreative.co/docs/psychare" target="_blank" class="custom-docs-link"><i class="dashicons dashicons-testimonial"></i>Need Support?</a>');
        if(any_metaboxes==0){
           $('.tabbed-metaboxes').hide(); 
        }
    }


    function list_refresh(id) {
        var id = id;

        $("#li-slcr-acf-group_acf_video-post-format-settings").remove();
        $("#li-slcr-acf-group_acf_link-post-format-settings").remove();

        if (id == "post-format-video") {
            $(".slcr_acf_tabs_8904593490").prepend('<li class="active slcr-acf-group-list" id="li-slcr-acf-group_acf_video-post-format-settings" rel="slcr-acf-group_acf_video-post-format-settings"><i class="icons-video-camera"></i>Add a video URL</li>');
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_video-post-format-settings").trigger("click");
                }, 1000);
        } else if (id == "post-format-link") {
            $(".slcr_acf_tabs_8904593490").prepend('<li class="active slcr-acf-group-list " id="li-slcr-acf-group_acf_link-post-format-settings" rel="slcr-acf-group_acf_link-post-format-settings"><i class="icons-worldwide"></i>Add a URL</li>');
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_link-post-format-settings").trigger("click"); 
                }, 1000);
        }else if (id == "video") {
            $(".slcr_acf_tabs_8904593490").prepend('<li class="active slcr-acf-group-list" id="li-slcr-acf-group_acf_video-post-format-settings" rel="slcr-acf-group_acf_video-post-format-settings"><i class="icons-video-camera"></i>Add a video URL</li>');
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_video-post-format-settings").trigger("click"); 
                }, 1000);
        } else if (id == "link") {
            $(".slcr_acf_tabs_8904593490").prepend('<li class="active slcr-acf-group-list " id="li-slcr-acf-group_acf_link-post-format-settings" rel="slcr-acf-group_acf_link-post-format-settings"><i class="icons-worldwide"></i>Add a URL</li>');
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_link-post-format-settings").trigger("click"); 
                }, 1000);
        } else {
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_post-settings").trigger("click");
                }, 1000);
        }
    }


    function ACF_metabox_refresh() {
        $(tabid).show();
        while (j <= contentl) {
            if (final_acf_hidden[j] == 0) {
                if (hide == 0) {
                    tabid = "#slcr-" + final_id[j]
                    hide++;
                }
            }
            j++;
        }
        $(tabid).show();
    }


    ACF_metabox_tabs();

    ACF_metabox_refresh();



    $( "body" ).on( "click",".post-format", function(event) {   

        var id = this.id;
        list_refresh(id);
    }); 
    // for gutenburg update 
    $(document).on('change', '.editor-post-format__content .components-select-control__input', function(event) { 
        var id = this.value;
        list_refresh(id);
    }); 
   
    $(document).on('change', '#page_template', function(event) { 

        if ($(this).val() == 'portfolio.php') {
            $(".slcr_acf_tabs_8904593490").prepend('<li class="slcr-acf-group-list active" id="li-slcr-acf-group_acf_portfolio-settings" rel="slcr-acf-group_acf_portfolio-settings"><i class="icons-grid"></i>Portfolio Settings</li>');
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_portfolio-settings").trigger("click");
                }, 500);
        } else {
            $("#li-slcr-acf-group_acf_portfolio-settings").remove();
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_page-options").trigger("click");
                }, 500);
        }
    });
    // for gutenburg update
    $(document).on('change', '.editor-page-attributes__template .components-base-control__field .components-select-control__input', function(event) {
        if ($(this).val() == 'portfolio.php') {
            $(".slcr_acf_tabs_8904593490").prepend('<li class="slcr-acf-group-list active" id="li-slcr-acf-group_acf_portfolio-settings" rel="slcr-acf-group_acf_portfolio-settings"><i class="icons-grid"></i>Portfolio Settings</li>');
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_portfolio-settings").trigger("click");
                }, 500);
        } else {
            $("#li-slcr-acf-group_acf_portfolio-settings").remove();
            setTimeout(
                function (event) {
                    $("#li-slcr-acf-group_acf_page-options").trigger("click");
                }, 500);
        }
    });
    setTimeout(
        function () {
            $("#acf-field_portfolio_type_2535").hide();
        }, 100);
    setTimeout(
        function () {
            $("#acf-field_portfolio_type_2535-type-2").hide();
        }, 200);
    setTimeout(
        function () {
            $("#acf-field_portfolio_type_2535-type-3").hide();
        }, 300);
    setTimeout(
        function () {
            $("#acf-field_portfolio_type_2535-type-4").hide();
        }, 400);
    setTimeout(
        function () {
            $("#acf-field_portfolio_type_2535-type-5").hide();
        }, 500);
    setTimeout(
        function () {
            var lab = 0;
            $(".acf-field-portfolio-type-2535").find("label").each(function () { 
                if (lab == 0) {
                    lab++;
                } else {
                    if ($(this).hasClass('selected')) {
                        var list = $(this).find('input[name="acf[field_portfolio_type_2535]"]').val();

                        if (list == "type-2") {
                            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
                            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
                            $("#li-slcr-acf-group_acf_portfolio-gallery-2").hide();
                            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
                        } else if (list == "type-3") {
                            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
                            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
                            $("#li-slcr-acf-group_acf_portfolio-gallery").hide();
                            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
                        } else if (list == "type-4") {
                            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
                            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
                            $("#li-slcr-acf-group_acf_portfolio-gallery").hide();
                            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
                        } else if (list == "type-5") {
                            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
                            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
                            $("#li-slcr-acf-group_acf_portfolio-gallery").hide();
                            $("#li-slcr-acf-group_acf_portfolio-gallery-2").hide();
                            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
                            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
                        } else {
                            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
                            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
                            $("#li-slcr-acf-group_acf_portfolio-gallery-2").hide();
                            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
                        }
                        $(this).prepend('<div class="type-select-image active"></div>');

                    } else {
                        $(this).prepend('<div class="type-select-image"></div>');
                    }

                }

            });

        }, 10);
 
    $( "body" ).on( "click",".type-select-image", function(event) {   
        $(".type-select-image").removeClass("active");
        $(this).addClass("active");

        var list = $(this).closest("label").find("input").val();


        $(".slcr-acf-group-list").show();
        if (list == "type-2") {
            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery-2").hide();
            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
        } else if (list == "type-3") {
            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery").hide();
            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
        } else if (list == "type-4") {
            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery").hide();
            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
        } else if (list == "type-5") {
            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery-2").hide();
            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
        } else if (list == "type-6") {
            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
            $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery-2").hide();
            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
        } else {
            $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2").hide();
            $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4").hide();
            $("#li-slcr-acf-group_acf_portfolio-gallery-2").hide();
            $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3").hide();
        }

    });

    $('#acf-field_portfolio_type_2535').parent().addClass("thumb-1");
    $('#acf-field_portfolio_type_2535-type-2').parent().addClass("thumb-2");
    $('#acf-field_portfolio_type_2535-type-3').parent().addClass("thumb-3");
    $('#acf-field_portfolio_type_2535-type-4').parent().addClass("thumb-4");
    $('#acf-field_portfolio_type_2535-type-5').parent().addClass("thumb-5");
    $('#acf-field_portfolio_type_2535-type-6').parent().addClass("thumb-6");


    if ($('.vc_ui-flex-row[data-tab="default_templates"]')) {
        $('.vc_ui-flex-row[data-tab="default_templates"] .vc_ui-template-list').parent().prepend('<div class="vc_col-sm-3 slcr__temp_div"><h4 id="all_slcr_vc_templates" class="active">All Templates <span class="slcr__temp_count">0</span></h4><h4 class="list__header">Content Blocks</h4><ul class="slcr__temp_filter" id="slcr__temp_filter_section"><li class="all">All<span class="slcr__temp_count">0</span></li></ul><h4 class="list__header">Full Pages</h4><ul class="slcr__temp_filter" id="slcr__temp_filter_page"><li class="all">All<span class="slcr__temp_count">0</span></li></ul></div>');
        $('.vc_ui-flex-row[data-tab="default_templates"] .vc_ui-template-list').wrapAll('<div class="vc_col-sm-9 slcr__temp_list"></div>');
        var custom_cat = new Array();
        var custom_cat_page = new Array();
        var r_custom_cat = new Array();
        var r_custom_cat_page = new Array();
        var section_count_all = 0;
        var page_count_all = 0;
        var count_all = 0;
        $(".vc_templates-template-type-default_templates").each(function () {

            var carousel_type = jQuery(this).data("custom-type");
            if (carousel_type == "section") {
                custom_cat.push(jQuery(this).data("custom-cat"));
                section_count_all++;
            } else if (carousel_type == "page") {
                custom_cat_page.push(jQuery(this).data("custom-cat"));
                page_count_all++;
            }
            count_all++;
        });  
        $.each(custom_cat, function(i, el){
            if($.inArray(el, r_custom_cat) === -1) r_custom_cat.push(el);
        });
        $.each(custom_cat_page, function(i, el){
            if($.inArray(el, r_custom_cat_page) === -1) r_custom_cat_page.push(el);
        }); 
        r_custom_cat.sort();
        r_custom_cat_page.sort(); 
        $('#slcr__temp_filter_section .all span').text(section_count_all);
        $('#slcr__temp_filter_page .all span').text(page_count_all);
        $('#all_slcr_vc_templates span').text(count_all);

        jQuery.each(r_custom_cat, function (id, cat) {
            var cat_show = cat.replace(/_/g, ' ');
            $('#slcr__temp_filter_section').append('<li class="' + cat + '">' + cat_show + '<span class="slcr__temp_count">0</span></li>');
        });
        jQuery.each(r_custom_cat_page, function (id, cat) {
            var cat_show = cat.replace(/_/g, ' ');
            $('#slcr__temp_filter_page').append('<li class="' + cat + '">' + cat_show + '<span class="slcr__temp_count">0</span></li>');
        });

        $(".vc_templates-template-type-default_templates").each(function () {

            var carousel_type2 = jQuery(this).data("custom-type");
            var custom_cat2 = jQuery(this).data("custom-cat");
            if (carousel_type2 == "section") {
                jQuery.each(r_custom_cat, function (id, cat) {
                    if (custom_cat2 == cat) {
                        var r_val_count = $('#slcr__temp_filter_section .' + cat + ' span').text();
                        r_val_count = parseInt(r_val_count);
                        $('#slcr__temp_filter_section .' + cat + ' span').text(r_val_count + 1);
                    }
                });
            } else if (carousel_type2 == "page") {
                jQuery.each(r_custom_cat_page, function (id, cat) {
                    if (custom_cat2 == cat) {
                        var r_val_count = $('#slcr__temp_filter_page .' + cat + ' span').text();
                        r_val_count = parseInt(r_val_count);
                        $('#slcr__temp_filter_page .' + cat + ' span').text(r_val_count + 1);
                    }
                });
            }
        });

        $('.slcr__temp_div').parent().addClass('slcr__temp_cont');


        $("#all_slcr_vc_templates").on("click", function (event) {
            $(".vc_templates-template-type-default_templates").show();
        });
        $("#slcr__temp_filter_section li").on("click", function (event) {
            if ($(this).hasClass('active')) {} else {
                var cat = $(this).attr("class");
                $(".vc_templates-template-type-default_templates").hide();
                $(".vc_templates-template-type-default_templates").each(function () {

                    var carousel_type2 = jQuery(this).data("custom-type");
                    var custom_cat2 = jQuery(this).data("custom-cat");
                    if (carousel_type2 == "section") {
                        if (custom_cat2 == cat) {
                            $(this).show();
                        } else if (cat == "all") {
                            $(this).show();
                        }
                    }
                });
            }
        });

        $("#slcr__temp_filter_page li").on("click", function (event) {
            if ($(this).hasClass('active')) {} else {
                $(".vc_templates-template-type-default_templates").hide();
                var cat = $(this).attr("class");
                $(".vc_templates-template-type-default_templates").each(function () {

                    var carousel_type2 = jQuery(this).data("custom-type");
                    var custom_cat2 = jQuery(this).data("custom-cat");
                    if (carousel_type2 == "page") {
                        if (custom_cat2 == cat) {
                            $(this).show();
                        } else if (cat == "all") {
                            $(this).show();
                        }
                    }
                });
            }

        });


        $('.slcr__temp_filter li').on('click', function (event) {
            $('.slcr__temp_div h4').removeClass('active');
            $('.slcr__temp_filter li').removeClass('active');
            $(this).addClass('active');
        });
        $('#all_slcr_vc_templates').on('click', function (event) {
            $('.slcr__temp_div h4').removeClass('active');
            $('.slcr__temp_filter li').removeClass('active');
            $(this).addClass('active');
        });

    }

    $(".vc_ui-list-bar-item .img-wrap").on("click", function (event) {
        $(this).parent().find(".vc_ui-list-bar-item-trigger").click();
    });

    $("#li-slcr-acf-group_acf_video-post-format-settings i").addClass('icons-video-camera');
    $("#li-slcr-acf-group_acf_link-post-format-settings i").addClass('icons-worldwide');
    $("#li-slcr-acf-group_acf_page_header-options i").addClass('icons-monitor');
    $("#li-slcr-acf-group_acf_page_page_options i").addClass('icons-settings');
    $("#li-slcr-acf-group_acf_page_page_options_header i").addClass('icons-menu');
    $("#li-slcr-acf-group_acf_page_page_options_footer i").addClass('icons-switch');
    $("#li-slcr-acf-group_acf_portfolio-settings i").addClass('icons-grid');
    $("#li-slcr-acf-group_acf_portfolio-gallery-style i").addClass('icons-grid');
    $("#li-slcr-acf-group_acf_portfolio-item-type i").addClass('icons-layers');
    $("#li-slcr-acf-group_acf_portfolio-gallery i").addClass('icons-add');
    $("#li-slcr-acf-group_acf_portfolio-gallery-2 i").addClass('icons-add');
    $("#li-slcr-acf-group_acf_portfolio-gallery-3 i").addClass('icons-add');
    $("#li-slcr-acf-group_acf_post-settings i").addClass('icons-feather');

    $("#li-slcr-acf-group_acf_image-scroll-portfolio-type-1 i").addClass('icons-edit');
    $("#li-slcr-acf-group_acf_image-Slider-portfolio-type-2 i").addClass('icons-edit');
    $("#li-slcr-acf-group_acf_hero_image-portfolio-type-3 i").addClass('icons-edit');
    $("#li-slcr-acf-group_acf_hero_image_overlay-portfolio-type-4 i").addClass('icons-edit');

  	if ($('.slcr_sc_admin_notice')[0]) {
	    var rurl = $('.slcr_sc_admin_notice').attr("data-rurl-redux");  
	    window.location.replace(rurl); 
	}  
	if ($('.slcr_sc_admin_notice_multi')[0]) {
	    var rurl = $('.slcr_sc_admin_notice_multi').attr("data-rurl-redux");  
	    var image_rurl = $('.slcr_sc_admin_notice_multi').attr("data-rurl-redux-img");  
 		$('#menu-comments').after('<li class="wp-has-submenu  menu-top toplevel_page_slash-creative-options menu-top-last" id="toplevel_page_slash-creative-options"><a href="'+rurl+'" class="wp-has-submenu wp-menu-open menu-top toplevel_page_slash-creative-options menu-top-last" aria-haspopup="false"><div class="wp-menu-image dashicons-before"><img src="'+image_rurl+'" alt="slcr"></div><div class="wp-menu-name">SC Options</div></a></li>');
	} 

    if ($('.documentation_slcr')[0]) {
        $('.documentation_slcr').find('a').attr("href", "https://slashcreative.co/docs/psychare/");
        $('.documentation_slcr').find('a').attr("target", "_blank");   
    } 

    if($('img.redux-slides-image').attr('src') == '') {
      $(this).hide();
    }
    $('img.redux-slides-image').each(function( index ) {
        if($(this).attr('src') == '') {
            $(this).hide();
        }
    });  
    $(document).on('change', '.checkbox.color-transparency', function(event) {
    if(this.checked) {
            $(this).parent().parent().find( "button.wp-color-result" ).css( "background-color", "" );
        }
    });
    if ($('#has_shop_page_acf_3242')[0]) { 
        $("#li-slcr-acf-group_acf_page_header-options").css("display", "none"); 
        $("#li-slcr-acf-group_acf_page_page_options").trigger("click");
        setTimeout(
        function () {
            $("#li-slcr-acf-group_acf_page_page_options").trigger("click");
        }, 500);
    }
});