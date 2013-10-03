// ==UserScript==
// @id             iitc-plugin-portal-details-as-text@arneschween
// @name           IITC plugin: display detailed portal information as text
// @category       info
// @version        0.1.0.20130920.214800
// @namespace      https://github.com/arneschween/ingress-intel-total-conversion
// @updateURL      https:///github.com/arneschween/iitc/release/plugins/portal-details-as-text.meta.js
// @downloadURL    https:///github.com/arneschween/iitc/release/plugins/portal-details-as-text.user.js
// @description    [arneschween-2013-09-20-214800] displays detailed portal information as text
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portaldetails = function() {};

window.plugin.portaldetails.getDetails = function(){
	if (portals[selectedPortal]) {
		
		var d = portals[selectedPortal].options.details;
		var now = new Date();
		var text = getPortalDescriptionFromDetails(d) + "<br/>" 
			+ $.datepicker.formatDate("dd.mm.yy", now) + "<br/>"
			+ now.toLocaleTimeString() + "<br/>";
		$.each(d.resonatorArray.resonators, function(i, resonator) {
			if (!resonator) return true; 
			var agent = getPlayerName(resonator.ownerGuid);
			if (agent) {
				text += agent + "<br/>";
			}
		});
 		dialog({
			html: '<div id="portaldetails">' + text + '</div>',
			title: 'Portal details',
		});
	}
};

var setup =  function() {
  $('#toolbox').append(' <a onclick="window.plugin.portaldetails.getDetails()" title="Display portal details as text">Portal details as text</a>');
  $('head').append('<style>' +
    '</style>');
};

// PLUGIN END //////////////////////////////////////////////////////////


if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);


