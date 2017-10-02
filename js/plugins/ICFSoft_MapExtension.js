//=============================================================================
// ICF-Soft Plugins - Map Extension
// ICFSoft_MapExtension.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_MapExtension = true;

var ICF = ICF || {};
ICF.MapExtension = ICF.MapExtension || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 This plugin allow to use more than 999 maps and to
 * preload maps.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Current Map Index
 * @desc Current index using.
 * @default 0
 *
 * @param Map Index Count
 * @desc How many indexes are.
 * @default 1
 *
 * @param Preload All Maps
 * @desc If true will preload all maps from game.
 * @default false
 *
 * @param Preload Maps
 * @desc The maps you want to preload at startup separated by spaces.
 * @default 
 *
 * @param Retain Maps
 * @desc Allow to store maps when loaded.
 * @default false
 *
 * @param Custom start map
 * @desc To start in a specified location.
 * mapId x y
 * @default 0
 *
 * @param Custom boat position
 * @desc Custom starting position for boat.
 * mapId x y
 * @default 0
 *
 * @param Custom ship position
 * @desc Custom starting position for ship.
 * mapId x y
 * @default 0
 *
 * @param Custom airship position
 * @desc Custom starting position for airship.
 * mapId x y
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * 
 * By default RPG Maker MV has a 999 map limit and cannot be added or use
 * more. Also some plugins uses events from other maps.
 * 
 * This plugin uses a system to allow more than 999 maps by grouping
 * inside folders and a system to preload maps.
 * 
 * ============================================================================
 * How to use
 * ============================================================================
 * 
 * Inside data folder you create folders named '000', '001', '002' and so
 * on. These correspond to indexes.
 * 
 * When first 999 maps are filled copy all of them and map infos to '000'
 * folder and update current index. Proccess is intuitive for every folder.
 * You can edit only last index.
 * You would usually close and open project while doing this.
 * 
 * Maps nº 0, 1000, 2000 and so on are not used by RPG Maker, so are
 * skipped.
 * 
 * To edit maps from other index you should place current maps to its group
 * and place maps from index to main data folder.
 * 
 * CAREFULL:
 * If you know what are you doing and you will not confuse maps you can
 * move only the map you are going to edit to save time.
 * Doing this wrong can make you lose maps.
 * 
 * 
 * If retain maps is off you can store maps when loaded with <persistent map>
 * notetag.
 * 
 * ============================================================================
 * Plugin commands
 * ============================================================================
 * 
 * Without plugin commands you can only reffer to maps from 1 to 999.
 * 
 * maptransfer mapid x y [down|left|right|up]
 * 
 *  - Transfer player to a specified location.
 * 
 * maptransferv var var var [down|left|right|up]
 * 
 *  - Transfer player to a specified location given by game variables.
 * 
 * setvehiclelocation mapid x y [boat|ship|airship]
 * 
 *  - Set vehicle location to a specified spot.
 * 
 * setvehiclelocationv var var var [boat|ship|airship]
 * 
 *  - Set vehicle location to a specified spot given by game variables.
 * 
 * preloadmap x
 * 
 *  - Preload specified map.
 * 
 * preloadmaps x x x x
 * 
 *  - Preload specified maps. You can place all you'll need in a single line.
 * 
 * unloadmap x
 * 
 *  - Unload specified map.
 * 
 * unloadmaps x x x x
 * 
 *  - Unload specified maps. You can place all you'll need in a single line.
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * Current Map Index: This is the current index you are using.
 * When player goes to a map in this index map will be loaded from main
 * data folder, else will be loaded from the right one.
 * 
 * Map Index Count: How many indexes are been using.
 * It's needed for map infos files.
 * 
 * Preload All Maps: If actived all maps from game will be preloaded.
 *
 * Preload Maps: If previous param is off all maps from this array
 * will be preloaded.
 *
 * Retain Maps: If actived when a map is loaded it'll be added to
 * preloaded maps. When off only maps with <persistent map> notetag
 * will be added.
 *
 * Custom starting positions for starting map and vehicles.
 * They need mapId and x y to work, else will be ignored.
 * 
 * Custom start map / [boat ship airship] positions:
 * Custom starting positions for starting map and vehicles.
 * They need mapId and x y to work, else will be ignored.
 * 
 * ============================================================================
 * Incompatibilities
 * ============================================================================
 * 
 * There's no known incompatible plugins yet.
 * 
 * ============================================================================
 * Known isues
 * ============================================================================
 * 
 * Not yet.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Added a preload map system.
 * - Prepared for a better use of ICF-Soft Event Extension.
 *
 * Version 1.00:
 * - Finished plugin!
 * 
 * ============================================================================
 * 
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * ============================================================================
*/
//=============================================================================
 /*:es
 * @plugindesc v1.01 Este plugin permite sobrepasar el límite de 999 mapas además
 * de la posibilidad de precargar los mapas.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Current Map Index
 * @desc El índice actual de mapas.
 * @default 0
 *
 * @param Map Index Count
 * @desc El número de índices existentes.
 * @default 1
 *
 * @param Preload All Maps
 * @desc Si está activado precargará todos los mapas del juego.
 * No - false   Si - true
 * @default false
 *
 * @param Preload Maps
 * @desc Los mapas que quieres precargar separados por espacios.
 * @default 
 *
 * @param Retain Maps
 * @desc Permite que los mapas que se carguen vayan a los precargados.
 * No - false   Si - true
 * @default false
 *
 * @param Custom start map
 * @desc Posición inicial del jugador personalizada.
 * mapId x y
 * @default 0
 *
 * @param Custom boat position
 * @desc Posición inicial del vehículo personalizada.
 * mapId x y
 * @default 0
 *
 * @param Custom ship position
 * @desc Posición inicial del vehículo personalizada.
 * mapId x y
 * @default 0
 *
 * @param Custom airship position
 * @desc Posición inicial del vehículo personalizada.
 * mapId x y
 * @default 0
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 * 
 * De manera predeterminada RPG Maker MV tiene un límite de 999 mapas
 * y no se pueden añadir o usar más. Además de que hay plugins que utilizan
 * eventos de otros mapas.
 * 
 * Este complemento usa un sistema que permite el uso de más de 999 mapas
 * agrupándolos en carpetas y un sistema de precarga de mapas.
 * 
 * ============================================================================
 * Uso
 * ============================================================================
 * 
 * Dentro de la carpeta 'data' creas otras llamadas '000', '001', '002'
 * y así sucesivamente las que necesites. Corresponden a los índices.
 * 
 * Al terminar los primeros 999 mapas los colocas en la carpeta '000'
 * junto a mapinfos y actualizas el índice. El proceso se repite para
 * cada nuevo índice. Solo puedes editar los mapas del índice actual.
 * Cada vez hay que cerrar y abrir el proyecto.
 * 
 * Los mapas nº 0, 1000, 2000 no son utilizados por RPG Maker, así que
 * se saltan.
 * 
 * Para editar mapas de otro índice tienes que poner los mapas actuales
 * en su carpeta correspondiente y poner los mapas del índice en 'data'.
 * 
 * PRECAUCIÓN:
 * Si sabes lo que haces y no vas a confundir mapas puedes mover solo
 * el mapa que vas a editar para ahorrar tiempo.
 * Hacerlo mal puede resultar en la pérdida de mapas.
 * 
 * 
 * Si retain maps está desactivado los mapas que incluyan la etiqueta
 * <persistent map> permanecerán en memoria durante la partida.
 * 
 * ============================================================================
 * Comandos de complemento
 * ============================================================================
 * 
 * Sin estos comandos solo puedes referirte a los mapas del 1 al 999.
 * 
 * maptransfer mapid x y [down|left|right|up]
 * 
 *  - Transfiere al jugador a una posición específica.
 * 
 * maptransferv var var var [down|left|right|up]
 * 
 *  - Transfiere al jugador a una posición almacenada en variables.
 * 
 * setvehiclelocation mapid x y [boat|ship|airship]
 * 
 *  - Coloca el vehículo en una posición específica.
 * 
 * setvehiclelocationv var var var [boat|ship|airship]
 * 
 *  - Coloca el vehículo en una posición almacenada en variables.
 * 
 * preloadmap x
 * 
 *  - Precarga el mapa específico.
 * 
 * preloadmaps x x x x
 * 
 *  - Precarga los mapas específicos. Puedes poner todos los que necesites en
 *    una sola linea.
 * 
 * unloadmap x
 * 
 *  - Elimina el mapa específico.
 * 
 * unloadmaps x x x x
 * 
 *  - Elimina los mapas específicos. Puedes poner todos los que necesites en
 *    una sola linea.
 * 
 * ============================================================================
 * Parámetros
 * ============================================================================
 * 
 * Current Map Index: Este es el índice actual en uso.
 * Cuando el jugador es transferido a un mapa dentro del índice se cargará
 * desde la carpeta 'data' principal, en caso contrario se cargará desde
 * la carpeta correspondiente.
 * 
 * Map Index Count: Cuantos índices se están utilizando.
 * Es necesario para los archivos 'mapinfos.json'.
 * 
 * Preload All Maps: Si se activa se precargarán todos los mapas del juego.
 *
 * Preload Maps: Si el parámetro anterior está desactivado se precargarán
 * los mapas indicados.
 *
 * Retain Maps: Si está activado al cargar un mapa se añadirá a los mapas
 * precargados. Si no solo los mapas con la etiqueta <persistent map> se
 * añadirán.
 *
 * Custom start map / [boat ship airship] positions:
 * Posiciones personalizadas iniciales para el jugador y los vehículos.
 * Permiten empezar en un mapa posterior al 999. Se configura con tres
 * números separados por espacios para mapId, x e y.
 * En caso contrario se usarán los predeterminados por el MV.
 * 
 * ============================================================================
 * Incompatibilidades
 * ============================================================================
 * 
 * No se conocen complementos que sean incompatibles hasta la fecha.
 * 
 * ============================================================================
 * Problemas conocidos
 * ============================================================================
 * 
 * Por el momento ninguno.
 * 
 * ============================================================================
 * Historial de versiones
 * ============================================================================
 *
 * Versión 1.01:
 * - Se ha añadido un sistema de precarga de mapas.
 * - Preparado para funcionar con ICF-Soft Event Extension.
 *
 * Versión 1.00:
 * - Complemento terminado.
 * 
 * ============================================================================
 * 
 * Para juegos comerciales y no comerciales.
 * Se debe incluir a ICF-Soft en los créditos.
 * Esta cabecera debe incluirse íntegramente con el plugin.
 * 
 * ============================================================================
*/
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_MapExtension');
ICF.Param = ICF.Param || {};

ICF.Param.CurrentMapIndex = Number(ICF.Parameters['Current Map Index']);
ICF.Param.MapIndexCount = Number(ICF.Parameters['Map Index Count']);

if (!Imported.ICFSoft_MainUtility) {throw new Error('This plugin requires ICF-Soft Main Utility plugin to work.\nYou can download it at icfsoft.blogspot.com inside plugins section.');}

ICF.Param.PreloadedMaps = ICF.Parameters['Preload Maps'].trim().split(/\s+/).extend().leaveNumbers().removeRepeated();
ICF.Param.PreloadAllMaps = ICF.Parameters['Preload All Maps'].trim().toLowerCase() === "true";
ICF.Param.RetainMaps = ICF.Parameters['Retain Maps'].trim().toLowerCase() === "true";

ICF.Param.CustomStartMap = ICF.Parameters['Custom start map'].trim().split(/\s+/).leaveNumbers();
if (ICF.Param.CustomStartMap.length < 3) ICF.Param.CustomStartMap = null;

ICF.Param.CustomVehiclePosition = [];
ICF.Param.CustomVehiclePosition[0] = ICF.Parameters['Custom boat position'].trim().split(/\s+/).leaveNumbers();
ICF.Param.CustomVehiclePosition[1] = ICF.Parameters['Custom ship position'].trim().split(/\s+/).leaveNumbers();
ICF.Param.CustomVehiclePosition[2] = ICF.Parameters['Custom airship position'].trim().split(/\s+/).leaveNumbers();

if (ICF.Param.CustomVehiclePosition[0].length < 3) ICF.Param.CustomVehiclePosition[0] = null;
if (ICF.Param.CustomVehiclePosition[1].length < 3) ICF.Param.CustomVehiclePosition[1] = null;
if (ICF.Param.CustomVehiclePosition[2].length < 3) ICF.Param.CustomVehiclePosition[2] = null;

var $dataPreloadedMaps = [];

//=============================================================================
// DataManager
//=============================================================================

ICF.MapExtension.loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function() {
    ICF.MapExtension.loadDatabase.call(this);
    var test = this.isBattleTest() || this.isEventTest();
    if (!test) {
	window.setTimeout(function () {
	    DataManager.loadingMapInfos();
	},50);
    };
    if (!this.isBattleTest() && !ICF.Param.PreloadAllMaps) {
	DataManager.preloadMaps();
    };
};

DataManager.loadingMapInfos = function() {
    if ($dataMapInfos) {
	var array = [];
	array[ICF.Param.CurrentMapIndex] = $dataMapInfos;
	$dataMapInfos = array;
	for (var i = 0; i < ICF.Param.MapIndexCount; i++) {
		if (i != ICF.Param.CurrentMapIndex) { 
		    this.loadDataArrayFiles('$dataMapInfos', i, i.padZero(3) + '/MapInfos.json');
		}
		if (ICF.Param.PreloadAllMaps) window.setTimeout(function (index) {
		    DataManager.preloadMapGroup(index);
		},50,i);
	}
    } else {
	window.setTimeout(function () {
	    DataManager.loadingMapInfos();
	},50);
    }
};

DataManager.preloadMapGroup = function(index) {
    if ($dataMapInfos[index]) {
	for (var i = 1; i < $dataMapInfos[index].length; i++) {
	     if ($dataMapInfos[index][i]) DataManager.preloadMap(index * 1000 + i);
	};
    } else {
	window.setTimeout(function (index) {
	    DataManager.preloadMapGroup(index);
	},50,i);
    }
};

DataManager.preloadMaps = function() {
    for (var i = 0; i < ICF.Param.PreloadedMaps.length; i++) {
	DataManager.preloadMap(ICF.Param.PreloadedMaps[i]);
    };
};

DataManager.preloadMap = function(mapId) {
	var xhr = new XMLHttpRequest();
	var baseId = mapId % 1000;
	var index = Math.trunc(mapId / 1000);
	var url = 'Map%1.json'.format(baseId.padZero(3));
	if (index != ICF.Param.CurrentMapIndex) url = index.padZero(3) + '/' + url;
	url = 'data/' + url;
	xhr.open('GET', url);
	xhr.overrideMimeType('application/json');
	xhr.onload = function() {
	    if (xhr.status < 400) {
	        $dataPreloadedMaps[mapId] = JSON.parse(xhr.responseText);
	        DataManager.extractMetadata($dataPreloadedMaps[mapId]);
		var map = $dataPreloadedMaps[mapId];
		for (var i = 1; i < map.events.length; i++) {
		    DataManager.extractMetadata(map.events[i]);
		    if (ICF.Events && ICF.Events.ProcessEvent) ICF.Events.ProcessEvent(map.events[i], map.events[i].pages);
		}
	    };
	};
	xhr.onerror = function() {
	    DataManager._errorUrl = DataManager._errorUrl || url;
	};
	window["$dataPreloadedMaps"][mapId] = null;
	xhr.send();
};

DataManager.loadMapData = function(mapId) {
    if ($dataPreloadedMaps[mapId]) {
        $dataMap = $dataPreloadedMaps[mapId];
    } else if (mapId > 0) {
        var baseId = mapId % 1000;
	var index = Math.trunc(mapId / 1000);
        var filename = 'Map%1.json'.format(baseId.padZero(3));
	if (index != ICF.Param.CurrentMapIndex) filename = index.padZero(3) + '/' + filename;
        this.loadDataFile('$dataMap', filename);
    } else {
        this.makeEmptyMap();
    }
};

ICF.MapExtension.setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    ICF.MapExtension.setupNewGame.call(this);
    if (ICF.Param.CustomStartMap) $gamePlayer.reserveTransfer(ICF.Param.CustomStartMap[0],
        ICF.Param.CustomStartMap[1], ICF.Param.CustomStartMap[2]);
    else $gamePlayer.reserveTransfer($dataSystem.startMapId + ICF.Param.CurrentMapIndex * 1000,
        $dataSystem.startX, $dataSystem.startY);
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.mapInfo = function() {
    var baseId = this._mapId % 1000;
    var index = Math.trunc(this._mapId / 1000);
    return $dataMapInfos[index][baseId];
};

ICF.MapExtension.mapSetup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    ICF.MapExtension.mapSetup.call(this, mapId);
    if ($dataMap.note.match(/<persistent[-_ ]map>/i) || ICF.Param.RetainMaps) {
        $dataPreloadedMaps[mapId] = $dataMap;
    }
};

//=============================================================================
// Game_Vehicle
//=============================================================================

ICF.MapExtension.vehicleInitPositions = Game_Vehicle.prototype.loadSystemSettings;
Game_Vehicle.prototype.loadSystemSettings = function() {
    ICF.MapExtension.vehicleInitPositions.call(this);
    if (this.isBoat()) {
	if (ICF.Param.CustomVehiclePosition[0]) {
	    this._mapId = ICF.Param.CustomVehiclePosition[0][0];
	    this.setPosition(ICF.Param.CustomVehiclePosition[0][1], ICF.Param.CustomVehiclePosition[0][2]);
	}
    } else if (this.isShip()) {
	if (ICF.Param.CustomVehiclePosition[1]) {
	    this._mapId = ICF.Param.CustomVehiclePosition[1][0];
	    this.setPosition(ICF.Param.CustomVehiclePosition[1][1], ICF.Param.CustomVehiclePosition[1][2]);
	}
    } else if (this.isAirship()) {
	if (ICF.Param.CustomVehiclePosition[2]) {
	    this._mapId = ICF.Param.CustomVehiclePosition[2][0];
	    this.setPosition(ICF.Param.CustomVehiclePosition[2][1], ICF.Param.CustomVehiclePosition[2][2]);
	}
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

ICF.MapExtension.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
        ICF.MapExtension.pluginCommand.call(this, command, args);
	if (command.toLowerCase() === 'maptransfer') {
		if (args.length < 3) return;
		if (args.length == 3) {
		    args[3] = 0;
		} else if (args.length >= 4) {
		    if (isNaN(Number(args[3]))) args[3] = (['down','left','right','up'].indexOf(args[3].toLowerCase()) + 1) * 2;
		    if ([2,4,6,8].indexOf(Number(args[3])) < 0) args[3] = 0;
		}
		if (args.length >= 5) {
		    args[4] = ['fade'].indexOf(args[4].toLoweCase()) + 1;
		} else {
		    args[4] = 0;
		}
		$gamePlayer.reserveTransfer(Number(args[0]), Number(args[1]), Number(args[2]), args[3], args[4]);
	} else if (command.toLowerCase() === 'maptransferv') {
		if (args.length < 3) return;
		args[0] = $gameVariables.value(args[0]);
		args[1] = $gameVariables.value(args[1]);
		args[2] = $gameVariables.value(args[2]);
		if (args.length == 3) {
		    args[3] = 0;
		} else if (args.length >= 4) {
		    if (isNaN(Number(args[3]))) args[3] = (['down','left','right','up'].indexOf(args[3].toLowerCase()) + 1) * 2;
		    if ([2,4,6,8].indexOf(Number(args[3])) < 0) args[3] = 0;
		}
		if (args.length >= 5) {
		    args[4] = ['fade'].indexOf(args[4].toLowerCase()) + 1;
		} else {
		    args[4] = 0;
		}
		$gamePlayer.reserveTransfer(args[0], args[1], args[2], args[3], args[4]);
	} else if (command.toLowerCase() === 'setvehiclelocation') {
		if (args.length < 4) return;
		if (isNaN(Number(args[0]))) args[0] = ['boat','ship','airship'].indexOf(args[3].toLowerCase());
		if (args[0] < 0) return;
		var vehicle = $gameMap.vehicle(Number(args[0]));
		if (vehicle) {
		    vehicle.setLocation(Number(args[1]), Number(args[2]), Number(args[3]));
		}
	} else if (command.toLowerCase() === 'setvehiclelocationv') {
		if (args.length < 4) return;
		args[1] = $gameVariables.value(args[1]);
		args[2] = $gameVariables.value(args[2]);
		args[3] = $gameVariables.value(args[3]);
		if (isNaN(Number(args[0]))) args[0] = ['boat','ship','airship'].indexOf(args[3].toLowerCase());
		if (args[0] < 0) return;
		var vehicle = $gameMap.vehicle(Number(args[0]));
		if (vehicle) {
		    vehicle.setLocation(args[1], args[2], args[3]);
		}
	} else if (command.toLowerCase() === 'preloadmap') {
		if (args.length < 1 || $dataPreloadedMaps[Number(args[0])]) return;
		DataManager.preloadMap(Number(args[0]));
	} else if (command.toLowerCase() === 'preloadmaps') {
		for (var i = 0; i < args.length; i++) {
		    if (!$dataPreloadedMaps[Number(args[i])]) DataManager.preloadMap(Number(args[i]));
		}
	} else if (command.toLowerCase() === 'unloadmap') {
		if (args.length < 1 || !$dataPreloadedMaps[Number(args[0])]) return;
		$dataPreloadedMaps[Number(args[0])] = null;
	} else if (command.toLowerCase() === 'unloadmaps') {
		for (var i = 0; i < args.length; i++) {
		    if ($dataPreloadedMaps[Number(args[i])]) $dataPreloadedMaps[Number(args[i])] = null;
		}
	}
};

//=============================================================================
// End of File
//=============================================================================
