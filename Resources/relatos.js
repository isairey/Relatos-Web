Ti.include('ti.helpers.js');
Ti.include('visor.js');
Ti.include('indicator.js');
Ti.include('charset.js');

//Carga los relatos de una categoría
// recibe de parámetro el evento de la row donde está la info
function loadRelatos(evento){
	// event data
	//var index = e.index;
	//var section = e.section;
	var row = evento.row;

	var relatos = Titanium.UI.createWindow({
	    title:'Relatos',
	    backgroundColor:'#000'
	});

	showIndicator('Buscando relatos...');
	if (Titanium.Network.online) {
		Titanium.Yahoo.yql('select * from html where url = "http://www.todorelatos.com'+row.enlace+'" and xpath="//*[@id=\'AutoNumber19\']/tbody/tr/td/table/tr/td/strong/a" and class="rlink" and charset="windows-1252"', function(e){
			try{
				if (e.data) {

					var relatos = e.data.a
					var relatos_win = Titanium.UI.createWindow({
					    title:'Relatos',
					    backgroundColor:'#000'
					});

					var tablarelatos = [];
					var i = 0;

					for (var x in relatos) {
						//$.log(relatos[x]["content"]);
						var row = Ti.UI.createTableViewRow({
							hasChild:true,
							height: 50
						});

						if(i==0){
							row.header = "Relatos";
							i++;
						}

						contenido = relatos[x]["content"].replace(/[\r|\n]+/gi," ").replace(String.fromCharCode(10)," ").replace(/[\s|\t]+/gi, " ");

						//$.log(contenido + " : "+getCharcode(contenido,true));

						row.enlace = relatos[x]["href"];

						var label = Ti.UI.createLabel({
							text: contenido,
							color: '#fff',
							shadowColor: '#900',
							shadowOffset: {
								x: 0,
								y: 1
							},
							textAlign: 'left',
							left: 10,
							font: {
								fontWeight: 'bold',
								fontSize: 15
							},
							width: 'auto',
							height: 'auto'
						});
						row.add(label);

						tablarelatos.push(row);
					}

					hideIndicator();

					var tableview = Titanium.UI.createTableView({
						data: tablarelatos
					});

					// create table view event listener
					tableview.addEventListener('click', loadVisor);

					relatos_win.add(tableview);

					relatos_win.open();

				}else{
					hideIndicator();

					var dialog = Titanium.UI.createAlertDialog({
						title: "No hay datos",
						message: "No se han podido localizar los datos"
					}).show();
				}
			}catch(err){
				hideIndicator();

				var dialog3 = Titanium.UI.createAlertDialog({
					title: "Error",
					message: "No se ha podido mostrar los relatos"
				}).show;
			}
		});
	}else{
		hideIndicator();
		var dialog = Titanium.UI.createAlertDialog({
			title: "No hay conexión",
			message: "Compruebe que está conectado a Internet por WIFI o 3G"
		}).show();
	}
}