var menu = null;
var activity = Ti.Android.currentActivity;
var win = Ti.UI.currentWindow;

activity.onCreateOptionsMenu = function(e) {
	menu = e.menu; // save off menu.

	m1 = menu.add({
		title: 'Configuración',
		itemId : 1,
		groupId : 0,
		order : 0
	});
	m1.addEventListener('click',function(e){
		Titanium.UI.Android.openPreferences();
	});
}
