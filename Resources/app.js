// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//Cargamos la función para leer los relatos de una categoría
Ti.include('ti.helpers.js');
Ti.include('indicator.js');
Ti.include('charset.js');
Ti.include('categorias.js');
Ti.include('config_menu.js');

//
// create base UI tab and root window
//

var win1 = Titanium.UI.createWindow({
    title:'Categorias',
    backgroundColor:'#000'
});

var categorias;

showIndicator('Leyendo categorías');

win1.open();
loadCategorias(win1);