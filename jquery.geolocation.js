/**
 * An extended jQuery-Geolocation-Plugin
 * 
 *
 * @author Sebastian Majstorovic <canbuffi@gmail.com>
 * @initial_author Thomas Michelbach <thomas@nomoresleep.net>
 * @copyright majstorovic & majstorovic gbr <http://www.canbuffi.de>
 * @version 0.5
 * @license MIT LICENSE <http://www.opensource.org/licenses/mit-license.php>
 *
 */

(function($){
	$.extend($.support,{
		geolocation:function(){
			return $.geolocation.support();
		}
	});

	$.geolocation = {
		browser: {
			find:function(success, error, options){
				if($.geolocation.browser.support()){
					options = $.extend({highAccuracy: false, track: false}, options);
					($.geolocation.browser.object())[(options.track ? 'watchPosition' : 'getCurrentPosition')](function(location){
						success(location.coords.latitude, location.coords.longitude);
					}, function(locationError){
						error(locationError);
					}, {enableHighAccuracy: options.highAccuracy, timeout: options.timeout, maximumAge: options.maximumAge});		
				}else{
					error();
				}
			},
			object:function(){
				if (google.gears) {
					return google.gears.factory.create('beta.geolocation');
				}
				return navigator.geolocation;
			},
			support:function(){
				return ($.geolocation.browser.object()) ? true : false;
			}
		},
		ip: {
			find:function(success, error){
				if ($.geolocation.ip.support()){
					success($.geolocation.ip.object().latitude, $.geolocation.ip.object().longitude);
				} else {
					error();
				}
			},
			object:function(){
				return google.loader.ClientLocation;
			},
			support:function(){
				return (google && google.loader && google.loader.ClientLocation) ? true : false;
			}
		},
		find:function(success, error, options){
			$.geolocation.browser.find(success, function(locationError){
				$.geolocation.ip.find(success, error);
			}, options);
		},
		support: function(){
			return ($.geolocation.browser.support() || $.geolocation.ip.support()) ? true : false;
		}
	};
	
})(jQuery);