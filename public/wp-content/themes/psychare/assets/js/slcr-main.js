/*
 * 
 *   main.js - Psychare - WordPress Theme
 *   Author: Slash Creative <https://www.slashcreative.co>
 *   Version: v1.0
 * 
 */
jQuery(document).ready(function ($) {

    "use strict"; 

    // Init. SC Carousels
    slcrCarousels();

    // Init. WOW Animations
    new WOW().init(); 

	// Init. Lazy Load Library
    var myLazyLoad = new LazyLoad ({
	    elements_selector: ".lazy",
		class_loaded: "lazy-loading"
	});
	 
    $(window).on('resize', function() {

        "use strict";

        // Comparison Images Visual Composer Element
        $('.image-comparison').each(function () {
            var cur = $(this);
            var width = cur.width() + 'px';
            cur.find('.comp-img-two img').css('width', width);
        });

        $('.nav__item:not(.mega__dropdown) .submenu__dropdown').each(function () {
	        if ($(this).offset().left + $(this).outerWidth() + 50 > $(window).width()) {
	            $(this).addClass('repell__left');
	        }
	    });

    });

    // Privacy Consent Bar 

    function PrivacyBar() {
	    setTimeout(function () {
	        $(".privacy__bar").addClass("in-action");
	    }, 3000);
	}
	PrivacyBar();

	// SC Tabs Visual Composer Element

    function TabbedContent() {

        $(".tabbed_content:first-child").show();

        $(".tabs li").on('click', function () {
            var $tabs = $(this).closest('.tabs');
            var $content = $(this).closest('.tabbed_section');
            $tabs.find("li").removeClass("active");
            $(this).addClass("active");

            $content.find(".tabbed_content").hide();
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn();
        });
    }
    TabbedContent();


    // Scroll back to top
    
    function ScrollBackTop() {

	    $(window).on('scroll', function () {
	        ($(this).scrollTop() > 300) ? $('.back__top').addClass('visible'): $('.back__top').removeClass('visible');
	    });
	    $('.back__top').on('click', function (event) {
	        event.preventDefault();
	        $('body,html').animate({
	            scrollTop: 0,
	        }, 600);
	    });

	}
	ScrollBackTop();


    // SC Accordions Visual Composer Element

    function Accordions() {

        $('.accordion').each(function () {
            var height = $(this).outerHeight();
            $(this).css('min-height', height)
        });

        $('.accordion li:first-child').addClass('active');

        $('.accordion-header').on('click', function () {
            $(this).toggleClass('active');

            var main = $(this).closest('.accordion'),
                list = $(this).closest('li');

            if (list.hasClass('active')) list.removeClass('active');
            else if (main.hasClass('one-tab')) {
                var active = main.find('li.active');
                active.removeClass('active'), list.addClass('active')
            } else list.addClass('active')
        });
    }
    Accordions();



	// Project Gallery Popup

	function ProjectGallery() {
	    $('.popup-gallery').magnificPopup({
	        delegate: 'a',
	        type: 'image',
	        tLoading: 'Loading image #%curr%...',
	        mainClass: 'mfp-img-mobile',
	        gallery: {
	            enabled: true,
	            navigateByImgClick: true,
	            preload: [0, 1]
	        },
	        image: {
	            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
	            titleSrc: function (item) {
	                return item.el.attr('title');
	            }
	        }
	    });
	}
	ProjectGallery();

	// Modern Mobile Menu Icon

	function NavToggleIcon() {
	    $('.nav-toggle-icon').on('click', function () {
	        $(this).toggleClass('rotate');
	        $('.responsive').toggleClass('active');
	        $('.header-dark').toggleClass('mob');
	        $('.header-light').toggleClass('mob');
	    });
	}
	NavToggleIcon();

	// SC FlipBox Visual Composer Element

    function FlipBox() {
	    $('.flip-box').each(function () {
	        var height = $(this).attr('data-box-height');
	        $(this).css('min-height', height + 'px');
	    });
	}
    FlipBox();

    // SC Comparison Images Element

    function ImageComparison() {
	    $('.image-comparison').each(function () {
	        var cur = $(this);
	        var width = cur.width() + 'px';
	        cur.find('.comp-img-two img').css('width', width);
	        drags(cur.find('.handle'), cur.find('.comp-img-two'), cur);
	    });
	}
	ImageComparison();

	function drags(dragElement, resizeElement, container) {
    	dragElement.on('mousedown touchstart', function (e) {

	        dragElement.addClass('draggable');
	        resizeElement.addClass('resizable');

	        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

	        var dragWidth = dragElement.outerWidth(),
	            posX = dragElement.offset().left + dragWidth - startX,
	            containerOffset = container.offset().left,
	            containerWidth = container.outerWidth();

	        var minLeft = containerOffset + 0;
	        var maxLeft = containerOffset + containerWidth - dragWidth - 0;

	        dragElement.parents().on("mousemove touchmove", function (e) {

	            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

	            var leftValue = moveX + posX - dragWidth;
	            if (leftValue < minLeft) {
	                leftValue = minLeft;
	            } else if (leftValue > maxLeft) {
	                leftValue = maxLeft;
	            }

	            var widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

	            $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
	                $(this).removeClass('draggable');
	                resizeElement.removeClass('resizable');
	            });
	            $('.resizable').css('width', widthValue);
	        }).on('mouseup touchend touchcancel', function () {
	            dragElement.removeClass('draggable');
	            resizeElement.removeClass('resizable');
	        });
	        e.preventDefault();
	    }).on('mouseup touchend touchcancel', function (e) {
	        dragElement.removeClass('draggable');
	        resizeElement.removeClass('resizable');
	    });
	}

	// SC Typed Text Visual Composer Elements

	function TypedText() {
	    $('.typed-text-1').each(function () {
	        var id = this.id;
	        var typedspeed = $('#' + id).data('type-speed'),
	            databackspeed = $('#' + id).data('back-speed'),
	            loopstatus = $('#' + id).data('type-loop'),
	            loopcount = $('#' + id).data('loop-count'),
	            delay = $('#' + id).data('start-delay'),
	            typedtext = $('#' + id).data('typed-text'),
	            typedstrings = $('#' + id).data('typed-strings'),
	            fadeeffect = $('#' + id).data('fade-effect');

	        $(function () {
	            var id = new Typed('#' + typedtext, {
	                stringsElement: '#' + typedstrings,
	                typeSpeed: typedspeed,
	                backSpeed: databackspeed,
	                startDelay: delay,
	                loop: loopstatus,
	                loopCount: loopcount,
	                fadeOut: fadeeffect
	            });
	        });
	    });
	}
	TypedText();

    $('.secondary__toggle').on('click', function () {
        $('.nav__third').toggleClass('active');
    });

    $('.nav__module').find('.nav__social-links').parent().hide();
    $('.nav__module .nav__social-links').find('li').parent().parent().show();

    // Modern Mobile Menu trigger

    function ModernSidebar() {

	    $('.mob__trigger').on('click', function () {

	        var clicks = $(this).data('clicks');

	        if (clicks) {
	            $('.nav__background').removeClass('active');
	            $('.nav__mobile').removeClass('in-action');
	            $('.ham__menu').removeClass('active');
	            $('.nav__section').removeClass('active');

	        } else {
	            $('.nav__background').addClass('active');
	            $('.nav__mobile').addClass('in-action');
	            $('.ham__menu').addClass('active');
	            setTimeout(function () {
	                $('.nav__section').addClass('active');
	            }, 300);
	        }
	        $(this).data("clicks", !clicks);

	    });
	}
	ModernSidebar();

	// Enabling WooCommerce sideabar

	function WooSidebar() {
	    $('.nav__cart .svg__icon').on('click', function () {
	        $('.cart__sidebar').addClass('in-action');
	    });

	    $('.cart__close ').on('click', function () {
	        $('.cart__sidebar').removeClass('in-action');
	    });
	}
	WooSidebar();

	// SC multi-level dropdown

    function MultilevelDropdown() {

    	var hovered = $('.nav__list .nav__item').not('.mega__dropdown').find('.submenu__dropdown').find('li');

        $('.nav__list .nav__item:not(.mega__dropdown)').on('mouseover', function () {
            $(this).find('.submenu__dropdown:first').addClass('active');
        });

        $('.nav__list .nav__item:not(.mega__dropdown)').on('mouseleave', function () {
            $(this).find('.submenu__dropdown:first').removeClass('active');
        });

        $('.nav__item:not(.mega__dropdown) .submenu__dropdown').on('mouseover', function () {
            $(this).addClass('active');
        });

        $('.nav__item:not(.mega__dropdown) .submenu__dropdown .dropdown__item a').on('mouseover', function () {
            $('.submenu__dropdown').removeClass('active');
            $(this).parent().find('.submenu__dropdown:first').addClass('active');
        });

        $('.nav__item:not(.mega__dropdown) .submenu__dropdown').on('mouseleave', function () {
            $('.submenu__dropdown').removeClass('active');
        });

        $('.nav__item:not(.mega__dropdown) .submenu__dropdown').each(function () {
	        if ($(this).offset().left + $(this).outerWidth() + 50 > $(window).width()) {
	            $(this).addClass('repell__left');
	        }
	    });

	    $(hovered).on ('hover',

		    function () { 
		    	$(this).find('a:first').addClass('white__hovered') 
		    },
		    function () { 
		    	$(this).find('a:first').removeClass('white__hovered') 
		    }
		)

    }
    MultilevelDropdown();

    // SC Mega drop-down menu

    function MegaDropdown() {
        $('.mega__dropdown').find('.submenu__dropdown:first').css({
            'position': 'absolute'
        });

        $('.mega__dropdown').find('.submenu__dropdown:first').removeClass('child');

        $('.mega__dropdown').on('mouseover', function () {
            $(this).find('.submenu__dropdown:first').addClass('active');
        });

        $('.mega__dropdown').on('mouseleave', function () {
            $(this).find('.submenu__dropdown:first').removeClass('active');
        });

        $('.mega__dropdown').each(function () {
            $(this).find('ul:first').wrapInner('<div class="container no-padding" />')
        });
    }
    MegaDropdown();

    // SC Search trigger

    function SiteSearch() {
	    $('.nav__search .svg__icon').on('click', function (event) {
	        event.preventDefault();
	        $('.header__search').addClass('active');
	        $(".search__input").focus();
	    });

	    $('.search__close_btn i').on('click', function () {
	        $('.header__search').removeClass('active');
	    });
	}
	SiteSearch();

	// Actions on hovering nav items

    function HoverNavItems() {
        $('.nav__main').find('.nav__list:first .nav__item').addClass('link__active');
        $('.nav__second').find('.nav__list:first .nav__item').addClass('link__active');
        $('.nav__main').find('.nav__list .link__active').find('a:not(.btn):first').addClass('mouseover__call');
        $('.nav__second').find('.nav__list .link__active').find('a:not(.btn):first').addClass('mouseover__call');
    }
    HoverNavItems();

    function WrapMenuItems() {
    	$( ".mouseover__call" ).wrapInner( "<span class='inner__item'></span>");
    }
    WrapMenuItems();

    // Selecting current nav items

    function CurrentItemSelector() {
        var $main = $(".nav__main").find('.nav__list .nav__item .submenu__dropdown .menu-item-has-children.active');
        $main.find('a:first').addClass('active__dropdown-item');

        var $main_2 = $(".nav__main").find('.nav__list .dropdown__item.current-menu-item.active');
        $main_2.find('a:first').addClass('active__dropdown-item');

        var $second = $(".nav__second").find('.nav__list .nav__item .submenu__dropdown .menu-item-has-children.active');
        $main.find('a:first').addClass('active__dropdown-item');

        var $second_2 = $(".nav__second").find('.nav__list .dropdown__item.current-menu-item.active');
        $main_2.find('a:first').addClass('active__dropdown-item');

        $(".nav__main").find(".nav__list .nav__item .submenu__dropdown a").addClass("child__hover");
        $(".nav__second").find(".nav__list .nav__item .submenu__dropdown a").addClass("child__hover");
    }
    CurrentItemSelector();

    // Custom css classes for mega dropdown

    function cssClasses() {
    	$('.make__title').find('a:first').addClass('title__text');
    	$('.hide__label').find('a:first').hide();
    }
    cssClasses();
    
    // Toggling simple nav sidebar

    function SimpleSidebar() {
	    $('.mob__toggle').on('click', function () {
	        $('.nav__mobile').addClass('in-action');
	        setTimeout(function () {
	            $('.nav__section').addClass('active');
	        }, 300);
	    });

	    $('.nav__close').on('click', function () {
	        $('.nav__section').removeClass('active');
	        setTimeout(function () {
	            $('.nav__mobile').removeClass('in-action');
	        }, 300);
	    });
	    $(window).on('scroll', function () {
	        if ($(window).scrollTop() >= 200) {
	            $('[data-sticky-scroll="true"]').addClass('nav__animated');
	        } else {
	            $('[data-sticky-scroll="true"]').removeClass('nav__animated');
	        }
	    });
	    $(window).on('scroll', function () {
	        if ($(window).scrollTop() >= 300) {
	            $('[data-sticky-scroll="true"]').addClass('sticky');
	        } else {
	            $('[data-sticky-scroll="true"]').removeClass('sticky');
	        }
	    });
	}
	SimpleSidebar();

    

    /*-- Multi-level mobile menu --*/

    function MobileMenu() {

        var close_ext = '0';
        var text_val;

        $('.sub-menu .nav__mobile_item > a').on('click', function () {
            var $item = $(this).parent().find('.sub-menu:first');
            $item.toggleClass('open-child-menu');

        });

        $('.parent__menu > a').on('click', function () {

            $('.parent__menu').find('.child').removeClass('open-submenu');
            $(this).parent().find('.child:first').addClass('open-submenu');

            if (text_val == $(this).text()) {
                text_val = '0';
                $('.parent__menu').find('.child').removeClass('open-submenu');
            } else {
                if ($(this).parent().find('open-submenu')) {
                    text_val = $(this).text();
                }
            }

        });

        $('.sub-menu .nav__mobile_item > a').on('click', function () {
            var $item = $(this).parent().find('.sub-menu:first');
            $item.toggleClass('open-child-menu');

        });

        $('.parent__menu > .anchor_parent__menu').on('click', function () {

            $('.anchor_parent__menu').find('.child').removeClass('open-submenu');
            $(this).parent().find('.child:first').addClass('open-submenu');

            if (text_val == $(this).text()) {
                text_val = '0';
                $('.anchor_parent__menu').find('.child').removeClass('open-submenu');
            } else {
                if ($(this).parent().find('open-submenu')) {
                    text_val = $(this).text();
                }
            }

        });

        $('.nav__mobile_list li a.dropdown').on('click', function () {
        	return false;
        });

    }
    MobileMenu();

    // Navigation fifth layout adjustments

    function NavFifth() {
	    $('.nav__logo img').each(function () {
	        var width = $(this).outerWidth();

	        var half = width / 2 + 20;

	        $('[data-nav-layout="fifth"] .nav__main').css('padding-right', half + 'px');
	        $('[data-nav-layout="fifth"] .nav__content').css('padding-left', half + 'px');
	    });
	}
	NavFifth();


	function DisbaleCartFunctionality() {
	    $('.nav__cart .cart-contents').on("click", function () {
	        return false;
	    });
	}
	DisbaleCartFunctionality();

	// Hide multiple search titles

    function HideSearchTitle() {
	    $('.widget_search').each(function () {
	        if ($(this).children('h3').length > 1) {
	            $(this).children('.title').hide();
	        }
	    });
	}
	HideSearchTitle();

    $('#slcr_cookies_verify_footer_bar').on('click', function (e) {
        var value = $(this).data('privacy_consent');
        var day_ex = $(this).data('days_ex');
        var privacy_consent = getCookie("PrivacyConsent");
        if (privacy_consent == "") {
            value = value;
        } else {
            value = privacy_consent + "," + value;
        }
        setCookie("PrivacyConsent", value, day_ex);
        location.reload(true);
    });
    $('.slcr_cookies_verify_video').on('click', function (e) {
        var day_ex = $(this).data('days_ex');
        var privacy_consent = getCookie("PrivacyConsent");
        var value = $(this).data('privacy_consent');
        var v_class = ".slcr_cookies_verify_video_" + $(this).data('privacy_consent');
        if (privacy_consent == "") {
            value = value;
        } else {
            value = privacy_consent + "," + value;
        }
        setCookie("PrivacyConsent", value, day_ex);
        location.reload(true);
    });
    $('.slcr_cookies_verify_gmap').on('click', function (e) {
        var day_ex = $(this).data('days_ex');
        var privacy_consent = getCookie("PrivacyConsent");
        var value = $(this).data('privacy_consent');
        var v_class = ".slcr-google-map";
        if (privacy_consent == "") {
            value = value;
        } else {
            value = privacy_consent + "," + value;
        }
        setCookie("PrivacyConsent", value, day_ex);
        location.reload(true);
    });
    $('.slcr_cookies_verify_insta').on('click', function (e) {
        var day_ex = $(this).data('days_ex');
        var privacy_consent = getCookie("PrivacyConsent");
        var value = $(this).data('privacy_consent');
        var v_class = ".instagram-wrap";
        if (privacy_consent == "") {
            value = value;
        } else {
            value = privacy_consent + "," + value;
        }
        setCookie("PrivacyConsent", value, day_ex);
        location.reload(true);
    });
    $('.slcr_cookies_verify_video_acf').on('click', function (e) {
        var day_ex = $(this).data('days_ex');
        var video_id = $(this).data('id');
        var privacy_consent = getCookie("PrivacyConsent");
        var value = $(this).data('privacy_consent'); 
        if (privacy_consent == "") {
            value = value;
        } else {
            value = privacy_consent + "," + value;
        }
        setCookie("PrivacyConsent", value, day_ex);
        location.reload(true);
    });
    $('.slcr_cookies_verify_video_load').on('click', function (e) {
        var day_ex = $(this).data('days_ex');
        var video_id = $(this).data('id');
        var privacy_consent = getCookie("PrivacyConsent");
        var value = $(this).data('privacy_consent'); 
        if (privacy_consent == "") {
            value = value;
        } else {
            value = privacy_consent + "," + value;
        }
        setCookie("PrivacyConsent", value, day_ex);
        $(this).parent().hide();
        location.reload(true);

    });

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    }

    // SC Instagram Visual Composer Element

    function InstagramFeed() {

        $('.instagram-feed').each(function () {
            var instatoken = $(this).attr('data-instatoken');
            var instaclientID = $(this).attr('data-instaclientID');
            jQuery.fn.spectragram.accessData = {
                accessToken: instatoken
            }
            var count = $(this).attr('data-post-count');
            var username = $(this).attr('data-username');
            $(this).spectragram('getUserFeed', {
                max: count
            });
        });
    }
    InstagramFeed();
    
    // Video and Content modals

    function MagnificPopup() {

        $('.popup-modal').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            preloader: false,
            modal: true,
            focus: '#privacy-modal',
            showCloseBtn: true,
            return: false
        });

        $(document).on('click', '.modal-dismiss', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });

        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $(function () {
            $('.single-image').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-img-mobile',
                image: {
                    verticalFit: true
                }

            });
        });

    }
    MagnificPopup();

    // SC Image Hotspots Visual Composer Element

    function ImageHotspotsOnHover() {

        $('.hotspot_point').on('hover', function () {
                var $tooltip = $(this).closest('.hotspot_cont').find('[data-tooltip-style="hover"]');
                $tooltip.addClass('open');
            },
            function () {
                $('[data-tooltip-style="hover"]').removeClass('open');
            }
        );


        $('.image_hotspots.hover .hotspot_cont').on('hover',
            function () {
                $(this).addClass('hotspot_stacked');
            },
            function () {
                $(this).removeClass('hotspot_stacked');
            }
        );
    }
    ImageHotspotsOnHover();

    // Resposive click Image Hotspot

    function HoverToClickEventOnResponsive() {

        $('.image_hotspots.hover').find('.hotspot_tooltip').attr('data-tooltip-style', 'hover');
        $('.image_hotspots.click').find('.hotspot_tooltip').attr('data-tooltip-style', 'click');

        var winsize = $(window).width();
        if (winsize < 767) {
            $('.image_hotspots.hover').find('.hotspot_tooltip').attr('data-tooltip-style', 'click');

            $('body').on('click', '.image_hotspots img', function () {
                $(this).parents().find('.hotspot_point').removeClass('open');
                $(this).parent().find('.hotspot_tooltip.open').removeClass('open');
            });

        }
    }
    HoverToClickEventOnResponsive();
    $(window).on('resize', HoverToClickEventOnResponsive);

    // Toggle Image Hotspot items on click

    function ImageHotspotsOnClick() {

        $('body').on('click', '.hotspot_point', function () {

            var $tooltip = $(this).closest('.hotspot_cont').find('[data-tooltip-style="click"]');
            $tooltip.parents('.image_hotspots').find('.hotspot_tooltip').removeClass('open');
            $tooltip.parent().find('.hotspot_tooltip').addClass('open');

            $tooltip.parents('.image_hotspots').find('.hotspot_point').removeClass('open');
            $tooltip.parent().find('.hotspot_point').addClass('open');

            $tooltip.parents('.image_hotspots').find('img').addClass('hotspot_image');

        });

        $('body').on('click', '.image_hotspots img', function () {
            $(this).parents('.image_hotspots').find('img').removeClass('hotspot_image');
        });

        $('body').on('click', '.hotspot_point.open', function () {
            $(this).parents().find('.hotspot_point').removeClass('open');
            $(this).parent().find('.hotspot_tooltip').removeClass('open');
        });

        $('.close_hotspot').on('click', function () {
            $(this).parents().find('.hotspot_tooltip').removeClass('open');
        });

        $('.image_hotspots.click .hotspot_cont').on('click', function () {
            $('.hotspot_cont').removeClass('hotspot_stacked');
            $(this).addClass('hotspot_stacked');
        });

    }
    ImageHotspotsOnClick();

    // Hide and Show comment respond form
 
   function CommentForm() {
        
        $(".reply").on('click', function () {
            $(this).parent().parent().parent().parent().children('.reply-form-cont').addClass('reply-form-show');
        });
        $(".cancel").on('click', function () {
            $(this).parent().parent().removeClass('reply-form-show');
        });

    }
    CommentForm();

    // Sticky Header on scroll

    function HeaderSticky() {

	    var didScroll;
	    var lastScrollTop = 0;
	    var delta = 5;
	    var navbarHeight = $('.header').outerHeight();

	    $(window).on('scroll', function (event) {
	        didScroll = true;
	    });

	    setInterval(function () {
	        if (didScroll) {
	            hasScrolled();
	            didScroll = false;
	        }
	    }, 1);

	    function hasScrolled() {
	        var st = $(this).scrollTop();
	        if (Math.abs(lastScrollTop - st) <= delta)
	            return;
	        if (st > lastScrollTop && st > navbarHeight) {
	            // Scroll Down
	            $('.header-fixed').removeClass('header-down').addClass('header-up');
	        } else {
	            // Scroll Up
	            if (st + $(window).height() < $(document).height()) {
	                $('.header-fixed').removeClass('header-up').addClass('header-down header-fixed');
	            }
	        }

	        lastScrollTop = st;
	    }

	    $(window).on("scroll", function () {
	        if ($(window).scrollTop() > 200) {
	            $("[data-on-scroll=light]").addClass("header-scroll-light");
	        } else {
	            $('.header').removeClass("header-scroll-light");
	        }
	        if ($(window).scrollTop() > 200) {
	            $("[data-on-scroll=dark]").addClass("header-scroll-dark");
	        } else {
	            $('.header').removeClass("header-scroll-dark");
	        }

	    });

	    $("[data-header-fixed=true]").addClass("header-fixed");
	    $("[data-header-scheme=dark]").addClass("header-dark");
	    $("[data-header-scheme=light]").addClass("header-light");

	}
	HeaderSticky();

    function smooth_top() {
	    $(document).on('click', '.smooth', function (event) {
	        event.preventDefault();
	        var target = "#" + this.getAttribute('data-target');
	        $('html, body').animate({
	            scrollTop: $(target).offset().top
	        }, 1000);
	    });
	}
	smooth_top();

    // WooCommerce Account page navigation icons

    function set__account_icons() {
        $('.woocommerce-MyAccount-navigation-link--dashboard').find('i').addClass('icon_document_alt');
        $('.woocommerce-MyAccount-navigation-link--orders').find('i').addClass('icon_bag_alt');
        $('.woocommerce-MyAccount-navigation-link--downloads').find('i').addClass('icon_cloud-download_alt');
        $('.woocommerce-MyAccount-navigation-link--edit-address').find('i').addClass('icon_building');
        $('.woocommerce-MyAccount-navigation-link--edit-account').find('i').addClass('icon_documents_alt');
        $('.woocommerce-MyAccount-navigation-link--customer-logout').find('i').addClass('arrow_back');
    }
    set__account_icons();

    // Custom WooCommerce quantity selection

    function woo_quantity() { 
        $(document).on("click",".inc", function(event) {
            var input = $(this).prev('input.qty');
            var val = 0; 
            if($.isNumeric(input.val())){
            	val = parseInt(input.val());
            }   
            input.val(val + 1).change();
        });
 
        $(document).on("click",".dec", function(event) {
            var input = $(this).next('input.qty');
            var val = parseInt(input.val());
            if (val > 0) {
                input.val(val - 1).change();
            }
        });
    }
    woo_quantity();

    // Smooth scroll in-page links

    function smooth_scroll_links() {
        $(document).on('click', '.smooth__links a[href^="#"]:not(.popup-modal, .wc-tabs a)', function (e) {
            var id = $(this).attr('href');
            var $id = $(id);
            if ($id.length === 0) {
                return;
            }
            e.preventDefault();
            var pos = $id.offset().top;
            $('body, html').animate({
                scrollTop: pos
            });
        });
    }
    smooth_scroll_links();

    jQuery(document.body).on('updated_cart_totals', remove_cart_totals_twice);

    function remove_cart_totals_twice() {
        $(".cart-collaterals > .cart_totals:not(:last)").remove();
    }

    // SC carousels

    function slcrCarousels() {
    $('.team_04').owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        nav: true,
        autoplay: true,
        responsiveClass: true,
        smartSpeed: 850,
        responsive: {
            0: {
                items: 1,
                nav: false,
                loop: true
            },
            600: {
                items: 2,
                nav: false,
                loop: true
            },
            1000: {
                items: 3,
                nav: false,
                loop: true
            }
        }
    });
    $('.team_07').owlCarousel({
        loop: true,
        margin: 0,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        dots: true,
        nav: true,
        autoplay: true,
        responsiveClass: true,
        smartSpeed: 850,
        responsive: {
            0: {
                items: 1,
                nav: false,
                loop: true
            },
            600: {
                items: 1,
                nav: false,
                loop: true
            },
            1000: {
                items: 1,
                nav: false,
                loop: true
            }
        }
    });
    $('.testimonial_01').owlCarousel({
        loop: true,
        dots: true,
        autoplay: true,
        responsiveClass: true,
        smartSpeed: 500,
        responsive: {
            0: {
                items: 1,
                loop: true
            },
            600: {
                items: 2,
                margin: 10,
                loop: true
            },
            1000: {
                items: 2,
                stagePadding: 100,
                loop: true
            }
        }
    });
    $('.testimonial_02').owlCarousel({
        loop: true,
        margin: 0,
        animateOut: 'fadeOutDown',
        animateIn: 'fadeInUp',
        dots: true,
        autoplay: true,
        nav: false,
        navText: [],
        responsiveClass: true,
        smartSpeed: 850,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 1,
                nav: false,
            },
            1000: {
                items: 1,
                dots: false,
            }
        }
    });
    $('.testimonial_03').owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        autoplay: true,
        responsiveClass: true,
        smartSpeed: 850,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    $('.testimonial_04').owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        autoplay: true,
        responsiveClass: true,
        smartSpeed: 850,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    jQuery(".carousel-shortcode").each(function () {

        var carousel_loop = jQuery(this).data("carousel-loop");
        var carousel_dots = jQuery(this).data("carousel-dots");
        var carousel_margin = jQuery(this).data("carousel-margin");
        var carousel_autoplay = jQuery(this).data("carousel-autoplay");
        var carousel_stagepadding = jQuery(this).data("carousel-stage-padding");
        var carousel_anii = jQuery(this).data("carousel-ani-i");
        var carousel_anio = jQuery(this).data("carousel-ani-o");
        var carousel_smartspeed = jQuery(this).data("carousel-smartspeed");
        var carousel_items_mob = jQuery(this).data("carousel-items-mob");
        var carousel_items_tab = jQuery(this).data("carousel-items-tab");
        var carousel_items_pc = jQuery(this).data("carousel-items-pc");
        var carousel_nav_mob = jQuery(this).data("carousel-nav-mob");
        var carousel_nav_tab = jQuery(this).data("carousel-nav-tab");
        var carousel_nav_pc = jQuery(this).data("carousel-nav-pc");
        var carousel_dots_mob = jQuery(this).data("carousel-dots-mob");
        var carousel_dots_tab = jQuery(this).data("carousel-dots-tab");
        var carousel_dots_pc = jQuery(this).data("carousel-dots-pc");
        $(this).owlCarousel({
            loop: carousel_loop,
            margin: carousel_margin,
            dots: carousel_dots,
            navText: [],
            autoplay: carousel_autoplay,
            responsiveClass: true,
            animateIn: carousel_anii,
            animateOut: carousel_anio,
            smartSpeed: carousel_smartspeed,
            items: carousel_items_pc,
            responsive: {
                0: {
                    items: carousel_items_mob,
                    nav: carousel_nav_mob,
                    dots: carousel_dots_mob
                },
                600: {
                    items: carousel_items_tab,
                    nav: carousel_nav_tab,
                    dots: carousel_dots_tab
                },
                1000: {
                    items: carousel_items_pc,
                    nav: carousel_nav_pc,
                    stagePadding: carousel_stagepadding,
                    dots: carousel_dots_pc
                }
            }
        });
    });
}

});

jQuery(function($) {

	"use strict";

	// WINDOW ON LOAD FUNCTIONS 
	$(window).ready(function () {


	    // remove p tag from customstyle
	    var styletags = $( "style" );
		if ( styletags.parent().is( "p" ) ) { 
		    styletags.parent('p').css({ "display": "none"});
		} 

		
	    // SC Portfolio masonry and others

	    function slcrPortfolio() {
		    // Isotope is optional in the static Astro build.
		    // The live WP site includes it via WPBakery/RevSlider stacks, but our
		    // build intentionally omits heavy plugin JS. Guard all usage.
		    if (!$.fn || !$.fn.isotope) {
		        $('.full-screen').css({
		            'height': $(window).height()
		        });
		        return;
		    }

		    var $testimonials = $('.testimonials-container');
		    var $grid = $('.grid');
		    var $blog_grid = $('.blog__wrap');

		    if ($testimonials && $testimonials.length) $testimonials.isotope({
		        filter: '*',
		        itemSelector: '.grid-item-masonry',
		        originLeft: true,
		        animationOptions: {
		            duration: 75,
		            easing: 'linear',
		            queue: false
		        },
		        layoutMode: 'masonry',
		        masonry: {
		            columnWidth: 0,
		        }
		    });

		    // Only initialize the blog Isotope grid if the expected WP markup exists.
		    // Our Astro blog cards intentionally match the theme styling but not the
		    // plugin-driven masonry structure. Initializing Isotope without the
		    // expected `.blog__item` elements causes absolute positioning artifacts.
		    if ($blog_grid && $blog_grid.length && $blog_grid.find('.blog__item').length) {
		        $blog_grid.isotope({
		            itemSelector: '.blog__item',
		            percentPosition: true,
		            masonry: {
		                columnWidth: '.blog-grid-size',
		                horizontalOrder: true
		            }
		        });
		    }


		    $('.full-screen').css({
		        'height': $(window).height()
		    });
		}
		slcrPortfolio();

		function loaded() {
			$('#status').fadeOut();
        	$('#preloader').delay(350).fadeOut('slow');
        	$('body').delay(350).css({
            	'overflow': 'visible'
        	});
        	$('.load__wrapper').fadeOut(800);
        	$('.load__wrapper .loading__page').fadeOut(200);
		}
		loaded();

		// SC Progress Bar Visual Composer Element
		var waypoint	
		function ProgressBar() {
		      jQuery(".progress-bar").each(function () {
	        	var x=0;
	        	var id = $(this).attr('id');
	            var progressdata = jQuery(this).data("progressdata"); 
	            var waypoints = $('#'+id).waypoint({
				  handler: function() { 
				    $('#' + progressdata + ' > .progress-count').each(function () {
	                	if(x == 0){
	                		x++;
	                        $(this).prop('Counter', 0).animate({
	                            Counter: $(this).text()
	                        }, {
	                            duration: 2000,
	                            easing: 'swing',
	                            step: function (now) {
	                                $(this).text(Math.ceil(now) + '%');
	                            }
	                        });
	                    }
	                });

	                $('#' + progressdata).each(function () {
	                    var each_bar_width = $(this).attr('aria-valuenow');
	                    $(this).width(each_bar_width + '%');
	                });
				    this.destroy()
				  }, 
				  offset: 'bottom-in-view'
				}) 
	        });
	    }
	    ProgressBar();
	    
	    // SC Counter Visual Composer Element

	    function slcrCounters() {
	    	$("[data-count-separator=true] .counter-value").addClass("has-separator");
	        $("[data-count-separator=false] .counter-value").addClass("no-separator");
	        $("[data-count-position=center]").addClass("text-center");
	        $("[data-count-position=right]").addClass("text-right");
	        $("[data-count-position=left]").addClass("text-left");
	        $("[data-count-size=small]").addClass("small");
	        $("[data-count-size=large]").addClass("large");
	        $("[data-count-size=medium]").addClass("medium");

	        function startCounter(val) {
	            var idval = '#' + val;
	            $(idval).each(function () {
	                var $this = $(this);
	                $(this).prop('Counter', 0).animate({
	                    Counter: $(this).text()
	                }, {
	                    duration: 1500,
	                    easing: 'swing',
	                    step: function () {
	                        var nowval = 0;
	                        if ($(idval).hasClass('has-separator')) {
	                            if (this.Counter > nowval) {
	                                $this.text(separator(Math.ceil(this.Counter)));
	                                nowval++;
	                            }
	                        } else {
	                            if (this.Counter > nowval) {
	                                $this.text(Math.ceil(this.Counter));
	                                nowval++;
	                            }
	                        }
	                    }

	                });
	            });

	        }

	        function separator(val) {
	            while (/(\d+)(\d{3})/.test(val.toString())) {
	                val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	            }
	            return val;
	        }

	        jQuery(".counter__01").each(function () {

	            var iddata = jQuery(this).data("iddata");
	            var id = $(this).attr('id');
	            var i = 0;
	            var waypoints = $(this).waypoint({
				  handler: function() { 
				    startCounter(iddata);
				    this.destroy()
				  }, 
				  offset: 'bottom-in-view'
				})  
	        });
		}

		slcrCounters();

		 // SC Text Reveal Visual Composer Element

    function TextReaveal() {
        jQuery(".reveal_text").each(function () { 
            var id = $(this).attr('id');
            var waypoints = $(this).waypoint({
			  handler: function() { 
			    $('#' + id).addClass('revealed');
			    this.destroy()
			  }, 
			  offset: 'bottom-in-view'
			}) 
        });
    }
    TextReaveal();

		// Curve Animation on Row element

		function CurveAnimation() {
			jQuery('.row__shape').each(function () {
                var $animation_data = $(this).data('curve-animation');
                var $height = $(this).data('curve-height');
                var $this = $(this);
                var waypoints = $(this).waypoint({
				  handler: function() { 
				    $this.each(function () { 
                            $(this).css("height", $height);
                        })
				    this.destroy()
				  }, 
				  offset: '110%'
				}) 
            });
		}
		CurveAnimation();

		// SC Radials Bar Visual Composer Element

		function Radial() {

	        jQuery(".radial_bar").each(function () {

	            var radialdata = jQuery(this).data("radialdata");
	             var waypoints = $(this).waypoint({
				  handler: function() { 
				    $('#' + radialdata).each(function () {
                        var radialsize = $(this).data('size');
                        $(this).width(radialsize) + 'px';
                        $(this).height(radialsize) + 'px';
                        $(this).easyPieChart({
                            easing: 'easeOutBounce',
                            onStep: function (from, to, percent) {
                                $(this.el).find('.radial_value').text(Math.round(percent));
                            }
                        });
                    });
				    this.destroy()
				  }, 
				  offset: '110%'
				})  
	        });
	    }
	    Radial();

	    // SC Notification Visual Composer Element

	    function Notification() {

            var $notification_delay = $('.notification').data('notification-delay');
            $('.notification').delay($notification_delay).queue(function () {
                $(this).addClass("active"); 
            });

            $('.notification-close').on('click', function () {
                $('.notification').removeClass('active');
            });
	    }
	    Notification();

	    function tilt_boxes() {	
	        // Tilt Effect for box element
		    $(function () {
		        $('.tilt-effect').tilt({
		            maxTilt:        10,
					perspective:    1000,
					scale:          1.1,
					reset:          true,
					speed:          400
		        });
		        $('.tilt-effect-glare').tilt({
		        	maxTilt:        10,
		            perspective:    1000,
		            scale:          1.1,
		            glare:          true,
		            maxGlare:       .2,
		            reset:          true,
		            speed:          400
		        });
		    });
		 
		    $(".tilt-effect-glare-2").tilt({
		    	maxTilt:        10,
		        perspective:    1000,
		        scale:          1.1,
		        glare:          true,
		        maxGlare:       .2,
		        reset:          true,
		        speed:          400
		    }); 

		    $('.boxes.tilt-effect').each(function () {
		    	var inner = $(this).find('.inner');
		    	var sense = inner.data('sense');

		    	inner.css('transition', 'transform ease .2s');

		    	$(this).hover (
			    	function(e){  
			    		inner.css('transform' , 'translateZ('+sense+')');
			    	}, // over
			    	function(e){  
			    		inner.css('transform' , 'translateZ(0px)');
			    	}  // out
				);
		    });

		    $('.boxes.tilt-effect-glare').each(function () {
		    	var inner = $(this).find('.inner');
		    	var sense = inner.data('sense');

		    	inner.css('transition', 'transform ease .2s');

		    	$(this).hover (
			    	function(e){  
			    		inner.css('transform' , 'translateZ('+sense+')');
			    	}, // over
			    	function(e){  
			    		inner.css('transform' , 'translateZ(0px)');
			    	}  // out
				);
		    });
		}
		tilt_boxes();
    });
});
     