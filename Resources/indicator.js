//
//  CREATE CUSTOM LOADING INDICATOR
//
var actInd = null;
function showIndicator(m)
{
	m = (typeof m == 'undefined')? 'Loading':m;

	// loading indicator
	actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
		bottom:10,
		height:50,
		font: {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'},
		color: 'white',
		message: m,
		width:200
	});
	actInd.show();
}

function hideIndicator()
{
	actInd.hide();
}
