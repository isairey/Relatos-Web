Ti.include('ti.helpers.js');
Ti.include('indicator.js');
Ti.include('charset.js');

function loadVisor(evento){
	var row = evento.row;

	var enlace_convertido = row.enlace.replace('/','%2F');

	showIndicator('Cargando el relato...');
	$.ajax({
		url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2Fwww.todorelatos.com"+enlace_convertido+"%22%20and%20xpath%3D%22%2F%2F*%5B%40id%3D'trtabla'%5D%22%20and%20charset%3D%22windows-1252%22",
		method: "GET",
		async: true,
		onload: function(){
			hideIndicator();
			var lectura = this.responseXML;

			var lectura_text = Ti.XML.serializeToString( lectura.getElementsByTagName("results").item(0) ).replace("<results>","").replace("</results>","") ;
			lectura_text = lectura_text.replace('font-size:12px','');

			var textsize = Titanium.App.Properties.getString('textsize', '14');
			var nightmode = Titanium.App.Properties.getBool('nightmode', true);

			var webview = Titanium.UI.createWebView({html:'<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><style>body{background: '+(nightmode?'#000':'#fff')+'; color: '+(nightmode?'#fff':'#000')+'; font-size: '+textsize+'px !important;-webkit-text-size-adjust:none;}</style> </head><body>'+lectura_text+'</body></html>'});
		    var window = Titanium.UI.createWindow();
		    window.add(webview);
		    window.open({modal:true});
		},
		onerror: function(){
			hideIndicator();

			var dialog = Titanium.UI.createAlertDialog({
				title: "Error",
				message: "No se han podido recibir los datos"
			}).show();
		},
		headers:{

		}
	});
	//$.log(relato);
}
