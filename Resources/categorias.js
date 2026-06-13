//Cargamos la función para leer los relatos de una categoría
Ti.include('relatos.js');
Ti.include('ti.helpers.js');
Ti.include('indicator.js');
Ti.include('charset.js');

//Recibe de parámetro la ventana donde se cargará el listado de categorías
function loadCategorias(win1){
	if (Titanium.Network.online) {
		Titanium.Yahoo.yql('select * from html where url = "http://www.todorelatos.com/categorias/" and xpath="//*[@id=\'AutoNumber23\']/tr/td/table/tr/td/strong/a" and charset="windows-1252"', function(e){

			try {
				//Comprueba si tiene datos
				if (e.data) {

					var enlaces = e.data.a;

					//guardamos en variable global
					Ti.App.categorias = e.data.a;

					var tablacategorias = [];
					var i = 0;

					for (var x in enlaces) {
						var row = Ti.UI.createTableViewRow({
							hasChild:true,
							height: 50
						});

						if(i==0){
							row.header = "Categorías";
							i++;
						}

						contenido = enlaces[x]["content"].replace(/[\r|\n]+/gi," ").replace(String.fromCharCode(10)," ").replace(/[\s|\t]+/gi, " ");

						//$.log(contenido + " : "+getCharcode(contenido,true));

						row.enlace = enlaces[x]["href"];

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

						tablacategorias.push(row);
					}

					var tableview = Titanium.UI.createTableView({
						data: tablacategorias
					});

					// create table view event listener
					tableview.addEventListener('click', loadRelatos);

					win1.add(tableview);

					hideIndicator();

				}
				else {
					//Si después del YQL no se obtienen enlaces entonces error
					hideIndicator();

					var dialog = Titanium.UI.createAlertDialog({
						title: "No hay datos",
						message: "No se han podido localizar los datos"
					}).show();
				}
			}
			catch (e) {
				//Si algo falla...
				hideIndicator();

				var dialog3 = Titanium.UI.createAlertDialog({
					title: "Error",
					message: "No se ha podido mostrar las categorías"
				}).show;

			}
		});
	}
	else {
		//Si Network.online false avisamos que no hay conexión
		hideIndicator();

		var dialog = Titanium.UI.createAlertDialog({
			title: "No hay conexión",
			message: "Compruebe que está conectado a Internet por WIFI o 3G"
		}).show();
	}

}