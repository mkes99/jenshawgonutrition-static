function initMap() {
    "use strict"; 
    jQuery(document).ready(function($) { 
    	$(".slcr-google-map").each(function() { 
	    	var mapid = this.id;  
	    	var custom_water_color_map = $('#'+mapid).attr('data-slcr-custom-water-color');
	    	var custom_landscape_color_map = $('#'+mapid).attr('data-slcr-custom-landscape-color');
	    	var custom_highway_color_map = $('#'+mapid).attr('data-slcr-custom-highway-color');
	    	var custom_poi_color_map = $('#'+mapid).attr('data-slcr-custom-poi-color');
	    	var custom_labels_text_stroke_map = $('#'+mapid).attr('data-slcr-custom-labels-text-stroke');
	    	var custom_geometry_on_off_map = $('#'+mapid).attr('data-slcr-custom-geometry-on-off'); 
	    	if(custom_water_color_map =="null") {
	    		custom_water_color_map="#000000";
	    	}
	    	if(custom_landscape_color_map =="null") {
	    		custom_landscape_color_map="#000000";
	    	}
	    	if(custom_highway_color_map =="null") {
	    		custom_highway_color_map="#000000";
	    	}
	    	if(custom_poi_color_map =="null") {
	    		custom_poi_color_map="#000000";
    		}
    	var MapDark = new google.maps.StyledMapType(
        [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
            	{
            		"visibility": custom_labels_text_stroke_map
            	},
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": custom_landscape_color_map
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": custom_poi_color_map
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": custom_highway_color_map
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": custom_highway_color_map
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
            	{
                    "visibility": custom_geometry_on_off_map
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": custom_water_color_map
                },
                {
                    "lightness": 17
                }
            ]
        }
    ],
     {
        name: 'Dark'
    });
	
	var custom_water_color_map = $('#'+mapid).attr('data-slcr-custom-water-color');
	var custom_landscape_color_map = $('#'+mapid).attr('data-slcr-custom-landscape-color');
	var custom_highway_color_map = $('#'+mapid).attr('data-slcr-custom-highway-color');
	var custom_poi_color_map = $('#'+mapid).attr('data-slcr-custom-poi-color');
	var custom_labels_text_stroke_map = $('#'+mapid).attr('data-slcr-custom-labels-text-stroke');
	var custom_geometry_on_off_map = $('#'+mapid).attr('data-slcr-custom-geometry-on-off');
	if(custom_water_color_map =="null"){
		custom_water_color_map="#6DC0D5";
	}  
	if(custom_landscape_color_map =="null"){
		custom_landscape_color_map="#ffffff";
	}
	if(custom_highway_color_map =="null"){
		custom_highway_color_map="#eeeeee";
	}
	if(custom_poi_color_map =="null"){
		custom_poi_color_map="#f1f1f1";
	}
    var MapLight = new google.maps.StyledMapType(
    [
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": custom_water_color_map
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": custom_landscape_color_map
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": custom_highway_color_map
                },
                {
                    "lightness": 0
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": custom_highway_color_map
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                },
                {
                    "lightness": 50
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": custom_poi_color_map
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": custom_labels_text_stroke_map
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": custom_geometry_on_off_map
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        }
    ],
     {
        name: 'Light Blue'
    });
   

    	
     
    
    var map_zoom = parseFloat($('#'+mapid).attr('data-map-zoom'));
    var center_lat = $('#'+mapid).attr('data-center-lat');
    var center_long = $('#'+mapid).attr('data-center-long');

    
    var center = new google.maps.LatLng(center_lat, center_long);
    
    // Map Controls
    var map = new google.maps.Map(document.getElementById(mapid), {
        center: center,
        zoom: map_zoom,
        cursor: false,
        mapTypeControl: false,
        scrollwheel: false,
        zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_CENTER
          },
        scaleControl: false
    });
    
    var marker_locations = $('#'+mapid).attr('data-map-marker-locations'); 
    if(marker_locations == ""){

    }else {
    	var numbers_marker_locations = marker_locations.split('|');
    	jQuery.each( numbers_marker_locations, function( i, val ) { 
	  	var position = val.split(',');  
	  	var position1 = parseFloat(position[0]);
	  	var position2 = parseFloat(position[1]); 
	  	var set_position = {lat: position1, lng: position2}; 
	  	 // Map Marker 1
	  	var custom_marker = $('#'+mapid).attr('data-custom-marker');
	  	if(custom_marker == "false"){
	  		var marker = new google.maps.Marker({
	      	position: set_position,
	     	map: map
	     	  });	
	  	}else {
		  	var marker = new google.maps.Marker({
	      	position: set_position,
	     	map: map,
	     	icon: $('#'+mapid).attr('data-custom-marker')
	     	  });	
	  	}
  
    
	});
    }
   
   
    var custom_map_style = $('#'+mapid).attr('data-slcr-google-map-style');
    if(custom_map_style == "light"){
    	map.mapTypes.set('styled_map', MapLight);
    	map.setMapTypeId('styled_map');
    }else if(custom_map_style == "dark"){
    	map.mapTypes.set('styled_map', MapDark);
    	map.setMapTypeId('styled_map');
    } 
    
    });

    });
}
