//=============================================================================
// Sk_MapGenerator.js
//=============================================================================
// Copyright (c) 2015 Sanshiro
// Extended  by DreamX
// Extended  by Skillsan 2017
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 
 * Skill-san map generator v1.10
 * DreamX extention, SAN_MapGenerator ver1.00a - https://twitter.com/rev2nym
 *
 * Generate map and allocate events automatically.
 * @author Skill-san
 *
 * @param Extra Connection
 * @desc Chance for create a extra connection. 0 - 100, 0 is no chance and 100 all adjacente is connected. 10 is good for a simple dedal
 * @default 10
 *
 * @param Wall Height
 * @desc Processed as eval. The height of the walls. Default: 1
 * @default 1
 * 
 * @param Minimum Room Size
 * @desc Processed as eval. Minimum size of generated rooms. Default: 3
 * @default 3
 *
 * @param Maximum Room Size
 * @desc Processed as eval. Maximum size of generated rooms, -1 no limit. Default: 10
 * @default 10
 * 
 * @param Minimum Rooms
 * @desc Processed as eval. Minimum amount of rooms to generate if the map is 
 * large enough. Default: 2
 * @default 2
 * 
 * @param Maximum Rooms
 * @desc Processed as eval. Maximum amount of rooms to generate. Default: 5
 * @default 5
 * 
 * @param Space Between Walls
 * @desc Processed as eval. Whether there can be space tiles in between the inner walls. Default: true
 * @default true
 *
* @help 
 * First, read the documentation from Sanshiro's Map Generator. Then, read this 
 * help for more clarification and instruction on how to use the additional 
 * features this extension offers.
 * 
 * Tiles: You MUST use autotiles for the tiles to display correctly. 
 * You can put other, normal tiles on top, but the bottom-most tile must be an 
 * autotile.
 * 
 * space :{x:0, y:0} - This is what is placed around the map and sometimes in 
 * between walls (unless you display that in this extension as a parameter).
 * room  :{x:0, y:1} - Room tiles.
 * pass  :{x:0, y:2} - Tiles for the passageways between rooms.
 * roof  :{x:0, y:3} - Tiles for the roofs of the walls.
 * wall  :{x:0, y:4} - Tiles for the walls.
 * rubble:{x:0, y:5} - Tiles that sometimes appear in passageways.
 * 
 * Events:
 * start:{x:1, y:0} - Place an event here. The event be whatever you want. 
 * I recommend putting stairs as the event graphic and a transfer command, but 
 * it's up to you. Use <SpecialWall:1> to force this event to start on a wall.
 * 
 * goal :{x:1, y:1} - Place an event here. The event be whatever you want. 
 * I recommend putting stairs as the event graphic and a transfer command, but 
 * it's up to you. Use <SpecialWall:1> to force this event to start on a wall.
 * 
 * All other coordinates: Place an event anywhere else (NOT where the start/goal or 
 * tiles are supposed to be) and then use a Rate notetag.
 *
 * --- Modification Skill-san ---
 * One of my own modification, is the modification of makepasses function.
 * In the original, all adjacent room are connected by a passage. After the modification, 
 * thise function create a connection so that each piece have a path to the goal. 
 * That which creates a more realistic dungeon labyrinth.
 * The paramet "extra connection" is a chance to créate a extra connection. That créate a multi way labyrinth.
 * 
 * ============================================================================
 * Rate Notetags
 * ============================================================================
 * These notetags define the probability of non-start/goal events spawning on 
 * the map. x represents the % chance, from 0.0 to 1.0. If you wanted a 
 * 50% chance, for example, you would use 0.5
 * You should use only one Rate notetag for an event.
 * 
 * <RateRoom:x> The chance to appear in a room. This is tested for every room.
 * For example, if you entered 0.75, every room would have a 75% chance of 
 * having this event.
 * 
 * <RateRoomTile:x> The chance to appear on a room tile.
 * 
 * <RateWall:x> The chance to appear on a wall tile.
 * 
 * <RateStart> Appear in the room containing the start 
 * event.
 * <RateGoal> Appear in the room containing the room event.
 * 
 * ============================================================================
 * Extra Notetags
 * ============================================================================
 * These notetags allow you to further define the conditions for your event to 
 * spawn.
 * 
 * <MinimumStartDistance:x> x is the minimum distance away from the room 
 * containing the start event that this event can spawn. 
 * <MinimumGoalDistance:x> x is the minimum distance away from the room 
 * containing the goal event that this event can spawn. 
 * 
 * <NoStartRoomSpawn:1> This event may not spawn in the same room as the start 
 * event.
 * <NoGoalRoomSpawn:1> This event may not spawn in the same room as the start 
 * event.
 * 
 * <InnerWallOnly:1> If this event is set to spawn on wall tiles, it may only 
 * spawn on the inner walls.
 * <LowerWallOnly:1> If this event is set to spawn on wall tiles, and wall 
 * height is at least 2, this event may only spawn on the bottom wall tile.
 * <UpperWallOnly:1> If this event is set to spawn on wall tiles, and wall 
 * height is at least 2, this event may only spawn on the upper wall tile.
 * 
 * <NoPassageBlock:1> This event may not spawn in a location that would 
 * block a passageway. 
 * 
 * <Minimum:x> The minimum amount of times this event must be tested to appear 
 * on the map. If the rate for the event is 1.0, the event is almost guaranteed 
 * to spawn a minimum of this many times on the room.
 * <Maximum:x> The maximum amount of times this event may be tested to appear 
 * on the map. The event may not be spawned more than this many times in the room.
 * ============================================================================
 * Extra Extra (skills-san version) Notetags
 * ============================================================================
 * Event note tag
 * ======================================
 * <Unique> If a event is tagged with Unique tag, the event spawn a single time, not one more.
 * ======================================
 * Map note tag
 * ======================================
 * <oneBigRoom> créate a unique big room in the map. The tag <NoStartRoomSpawn> <NoGoalRoomSpawn> is not available in this map.
 * make sure to use the tag Minimum and Maximum to set the other events.
 * 
 * Set the specific values for the map.
 * <setWallHeight:x> x is the height of the walls
 * <setMinimumRoomSize:x> x is the Minimum size of generated rooms
 * <setMaximumRoomSize:x> x is the Maximum size of generated rooms
 * <setMinimumRooms:x> x is the Minimum amount of rooms to generate
 * <setMaximumRooms:x> x is the Maximum amount of rooms to generate
 * ============================================================================
 * Tips
 * ============================================================================
 * Use fading in/out to hide the lag that may be caused while a map is 
 * generated.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * This an extended done by Skillsan of the extension of DreamX of Sanshiro's Map Generator.
 * Please remember to credit Sanshiro and DreamX.
 * This plugin is a stand alone version of the original plugin, of the extension and my modification
 * 
 * Released under MIT license:
 * https://opensource.org/licenses/MIT
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * Skillsan, DreamX, Sanshiro
 */

var Imported = Imported || {};
Imported.SAN_MapGenerator = true;

var Sanshiro = Sanshiro || {};
Sanshiro.Game_MapGenerator = Sanshiro.Game_MapGenerator || {};

var parameters = PluginManager.parameters('Sk_MapGenerator');
var extraPasseChance = Number(parameters['Extra Connection'] || 10);

//=============================================================================
// Import
//=============================================================================
var Imported = Imported || {};
Imported.DreamX_EXT_SAN_MapGenerator = true;

var DreamX = DreamX || {};
DreamX.EXT_SAN_MapGenerator = DreamX.EXT_SAN_MapGenerator || {};

//=============================================================================
// Parameters
//=============================================================================

var paramWallHeight = String(parameters['Wall Height'] || '1');
var paramMinRoomSize = String(parameters['Minimum Room Size'] || '3');
var paramMaxRoomSize = String(parameters['Maximum Room Size'] || '10');
var paramMinRooms = String(parameters['Minimum Rooms'] || '2');
var paramMaxRooms = String(parameters['Maximum Rooms'] || '5');
var paramSpaceBetweenWalls = String(parameters['Space Between Walls'] || 'true');
//var paramForceNarrow = String(parameters['Force Narrow Routes'] || 'false');

//-----------------------------------------------------------------------------
// Game_MapGenerator
//
// Map generator (large room)

function Game_MapGenerator() {
    this.initialize();
}

// Auto tile analysis tile id list

Game_MapGenerator.tileIdsFloor = {};

Game_MapGenerator.tileIdsFloor.candidate =
    [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
     12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
     24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
     36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

Game_MapGenerator.tileIdsFloor.connect = {
    1:[ 0,  1,  2,  3,  4,  5,  6,  7, 16, 17, 18, 19,
       20, 21, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35,
       36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 1:Bottom left
    2:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
       24, 25, 26, 27, 32, 34, 35, 36, 37, 42, 47],         // 2:下
    3:[ 0,  1,  2,  3,  8,  9, 10, 11, 16, 17, 20, 22,
       24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36,
       37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 3:右下
     4:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
        12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 26, 27,
        28, 29, 30, 31, 33, 36, 37, 38, 39, 45, 47],         // 4:左
    6:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
       28, 29, 30, 31, 33, 34, 35, 40, 41, 43, 47],         // 6:右
    7:[ 0,  2,  4,  6,  8, 10, 12, 14, 16, 17, 18, 19,
       20, 21, 22, 23, 24, 25, 28, 30, 32, 33, 34, 35,
       36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 47],         // 7:左上
    8:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27,
       28, 29, 30, 31, 32, 38, 39, 40, 41, 44, 47],         // 8:上
    9:[ 0,  1,  4,  5,  8,  9, 12, 13, 16, 18, 20, 21,
       22, 23, 24, 25, 26, 27, 28, 29, 32, 33, 34, 35,
       36, 37, 38, 39, 40, 42, 43, 44, 45, 46, 47]          // 9:右上
};

Game_MapGenerator.tileIdsFloor.noConnect = {
    1:[ 8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
       22, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35,
       37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 1:左下
    2:[28, 29, 30, 31, 33, 38, 39, 40, 41, 43, 44, 45, 46], // 2:下
    3:[ 4,  5,  6,  7, 12, 13, 14, 15, 18, 19, 21, 23,
       24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36,
       37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 3:右下
    4:[16, 17, 18, 19, 32, 34, 35, 40, 41, 42, 43, 44, 46], // 4:左
    6:[24, 25, 26, 27, 32, 36, 37, 38, 39, 42, 44, 45, 46], // 6:右
    7:[ 1,  3,  5,  7,  9, 11, 13, 15, 16, 17, 18, 19,
       20, 21, 22, 23, 26, 27, 29, 31, 32, 33, 34, 35,
       36, 37, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 7:左上
    8:[20, 21, 22, 23, 33, 34, 35, 36, 37, 42, 43, 45, 46], // 8:上
    9:[ 2,  3,  6,  7, 10, 11, 14, 15, 17, 19, 20, 21,
       22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35,
       36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47]          // 9:右上
};

Game_MapGenerator.tileIdsWall = {};

Game_MapGenerator.tileIdsWall.candidate =
    [ 0,  1,  2,  3,  4,  5,  6,  7,
      8,  9, 10, 11, 12, 13, 14, 15];

Game_MapGenerator.tileIdsWall.connect = {
    2:[ 0,  1,  2,  3,  4,  5,  6,  7],  // 2:下
    4:[ 0,  2,  4,  6,  8, 10, 12, 14],  // 4:左
    6:[ 0,  1,  2,  3,  8,  9, 10, 11],  // 6:右
    8:[ 0,  1,  4,  5,  8,  9, 12, 13]   // 8:上
};

Game_MapGenerator.tileIdsWall.noConnect = {
    2:[ 8,  9, 10, 11, 12, 13, 14, 15],  // 2:下
    4:[ 1,  3,  5,  7,  9, 11, 13, 15],  // 4:左
    6:[ 4,  5,  6,  7, 12, 13, 14, 15],  // 6:右
    8:[ 2,  3,  6,  7, 10, 11, 14, 15]   // 8:上
};


Game_MapGenerator.prototype.initialize = function() {
    // change: wall height now parameter
    this._wallHeight = eval(paramWallHeight) || 1;
    this._startXY = {x:0, y:0};
    this._goalXY  = {x:0, y:0};
    this._blocks  = [];
    this._rooms   = [];
    this._passes  = [];
    this._data    = [];
    this._isReady = false;
    this._oneBigRoom          = $dataMap.meta.oneBigRoom          ? true                              : false;
    this._setMinimumRoomSize  = $dataMap.meta.setMinimumRoomSize  ? eval($dataMap.meta.setMinimumRoomSize)  : false;
    this._setMaximumRoomSize  = $dataMap.meta.setMaximumRoomSize  ? eval($dataMap.meta.setMaximumRoomSize)  : false;
    this._setMinimumRooms     = $dataMap.meta.setMinimumRooms     ? eval($dataMap.meta.setMinimumRooms)     : false;
    this._setMaximumRooms     = $dataMap.meta.setMaximumRooms     ? eval($dataMap.meta.setMaximumRooms)     : false;

    // tag setWallHeight
    if ($dataMap.meta.setWallHeight){
      this._wallHeight = eval($dataMap.meta.setWallHeight) || this._wallHeight;
    }
};

Game_MapGenerator.prototype.setup = function () {
  $gameMap._events = [];
  for (key in $gameSelfSwitches._data) {
    if (key.split(",")[0] === String($gameMap.mapId())) {
      delete $gameSelfSwitches._data[key];
    }
  }
  $gameMap.SanMapGenerator = true;
  this._isReady = false;
  this._blocks = [];
  this._rooms = [];
  this._passes = [];
  this._startXY = {x: 0, y: 0};
  this._goalXY = {x: 0, y: 0};
  this._data = [];
  
  this.initSymbolTable();
  this.initSymbolMap();
  this.generateMap();
  this.refreshWallAndRoof();

  // change: close cavities
  if (eval(paramSpaceBetweenWalls) === false) {
    this.closeCavities();
  }
  this.makeData();
  this.setRateEvents();
  SceneManager._scene.createDisplayObjects();
  this._isReady = true;
};

// シンボル定義表の初期化
Game_MapGenerator.prototype.initSymbolTable = function() {
    // シンボル定義
    //  refXY      : シンボルに対応するタイルのツクールのマップ上の座標
    //  baseTileId : シンボルに対応するタイル ID 
    //  dispChar   : 生成したマップを文字列として表示する際の文字 
    this._symbolTable = {
        player: {refXY:{x:0, y:0}, baseTileId:[], dispChar:'＠'},
        space:  {refXY:{x:0, y:0}, baseTileId:[], dispChar:'　'},
        room:   {refXY:{x:0, y:1}, baseTileId:[], dispChar:'□'},
        pass:   {refXY:{x:0, y:2}, baseTileId:[], dispChar:'■'},
        roof:   {refXY:{x:0, y:3}, baseTileId:[], dispChar:'＃'},
        wall:   {refXY:{x:0, y:4}, baseTileId:[], dispChar:'＝'},
        rubble: {refXY:{x:0, y:5}, baseTileId:[], dispChar:'＊'}, 
        start:  {refXY:{x:1, y:0}, baseTileId:[], dispChar:'△'},
        goal:   {refXY:{x:1, y:1}, baseTileId:[], dispChar:'▽'}//,
    //  fence:  {refXY:{x:0, y:6}, baseTileId:[], dispChar:'只'},
    //  pond:   {refXY:{x:0, y:7}, baseTileId:[], dispChar:'○'},
    //  hole:   {refXY:{x:0, y:8}, baseTileId:[], dispChar:'●'},
    //  brink:  {refXY:{x:0, y:9}, baseTileId:[], dispChar:'＾'},
    //  enemy:  {refXY:{x:1, y:2}, baseTileId:[], dispChar:'＄'},
    //  crawler:{refXY:{x:0, y:1}, baseTileId:[], dispChar:'＆'}
    };
    for (symbol in this._symbolTable) {
        var x = this._symbolTable[symbol].refXY.x;
        var y = this._symbolTable[symbol].refXY.y;
        for (var z = 0; z < 6; z ++) {
            // z0:タイルA下層, z1:タイルA上層, z2:タイルB下層, z3:タイルB上層, z4:影, z5:リージョン
            this._symbolTable[symbol].baseTileId[z] = this.baseAutoTileId(x, y, z);
        }
    }
};

// オートタイルタイルの基点タイルID 
Game_MapGenerator.prototype.baseAutoTileId = function(x, y, z) {
    if ($gameMap.tileId(x, y, z) >= Tilemap.TILE_ID_A1) {
        return (Math.floor(($gameMap.tileId(x, y, z) - Tilemap.TILE_ID_A1) / 48)) * 48 + Tilemap.TILE_ID_A1;
    } else {
        return $gameMap.tileId(x, y, z);
    }
};

// シンボルで表現されるマップの初期化（初期化時はスペースで埋める）
Game_MapGenerator.prototype.initSymbolMap = function() {
    this._symbolMap = new Array($gameMap.width());
    for (var x = 0; x < $gameMap.width(); x++) {
        this._symbolMap[x] = new Array($gameMap.height());
        for (var y = 0; y < $gameMap.height(); y++) {
            this._symbolMap[x][y] = 'space';
        }
    }
};

// シンボルによる通行可能判定（通行可否定義）
Game_MapGenerator.prototype.isPassable = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y]) {
        return false;
    }
    return ['room', 'pass', 'start', 'goal', 'crawler'].indexOf(this._symbolMap[x][y]) !== -1;
};

// マップ上における通行可能タイルの割合
Game_MapGenerator.prototype.passableRatio = function() {
    var passableCount = 0;
    for(var x = 0; x < $gameMap.width(); x++) {
        for(var y = 0; y < $gameMap.height(); y++) {
            if (this.isPassable(x, y)) {
                passableCount++;
            }
        }
    }
    return passableCount / ($gameMap.width() * $gameMap.height());
};

// シンボルマップ生成
Game_MapGenerator.prototype.generateMap = function() {
    // change: added hasStart and hasGoal to room and if room is Connectes To Goal
    var room = {x: 0, y: 0, w: 0, h: 0, hasStart: false, hasGoal: false, roomConnectToGoal : false};
    room.x = 1;
    room.y = 1 + this._wallHeight;
    room.w = $dataMap.width - 2;
    room.h = $dataMap.height - (this._wallHeight + 1) * 2;
    room.roomConnectToGoal = false;

    for (var oX = 0; oX < room.w; oX++) {
        for (var oY = 0; oY < room.h; oY++) {
            this._symbolMap[oX + room.x][oY + room.y] = 'room';
        }
    }
    this._rooms.push(room);
}

Game_MapGenerator.prototype.canSetInRoom = function (room, event) {
  var dataEvent = $dataMap.events[event._eventId] ? $dataMap.events[event._eventId] : event;
  var NoStartRoomSpawn = dataEvent.meta.NoStartRoomSpawn ? true : false;
  var NoGoalRoomSpawn = dataEvent.meta.NoGoalRoomSpawn ? true : false;
  var StartRoomSpawn = dataEvent.meta.RateSpawn ? true : false;
  var GoalRoomSpawn = dataEvent.meta.RateGoal ? true : false;
  var Unique = dataEvent.meta.Unique ? true : false;
  var Unique_present = dataEvent.meta.Present ? true : false;
        
  if (Unique === true && Unique_present === true) {
    return false;
  }
  if (NoStartRoomSpawn === true && room.hasStart === true && this._oneBigRoom === false) {
    return false;
  }
  if (NoGoalRoomSpawn === true && room.hasGoal === true && this._oneBigRoom === false) {
    return false;
  }
  if (StartRoomSpawn === true && room.hasStart === false && this._oneBigRoom === false) {
    return false;
  }
  if (GoalRoomSpawn === true && room.hasGoal === false && this._oneBigRoom === false) {
    return false;
  }

  var viableTiles = this.viableTiles(event, 'room', room);
  if (viableTiles.length === 0) {
    return false;
  }
  if(Unique === true)
    dataEvent.meta.Present = true;
    
  return true;
};

// イベントの設置
Game_MapGenerator.prototype.setEvent = function(event, targetSymbols, targetArea) {
    targetSymbols = targetSymbols || ['room'];
    targetArea = targetArea || {x:0, y:0, w:$dataMap.width, h:$dataMap.height};
    var canSet = false;
    
    var viableTiles = this.viableTiles(event, targetSymbols, targetArea);
    if (viableTiles.length >= 1) {
      canSet = true;
    }

    if (canSet) {
      // choose a random index from the array
      var randCoorNum = Math.floor(Math.random() * viableTiles.length);
      $gameMap._events.push(event);
      event._eventId = $gameMap._events.indexOf(event);
      event.setPosition(viableTiles[randCoorNum].xCoor, viableTiles[randCoorNum].yCoor);
      return {x: viableTiles[randCoorNum].xCoor, y: viableTiles[randCoorNum].yCoor};
    } 
    else {
      return undefined;
    }
};

// 座標によるイベントデータの配列
Game_MapGenerator.prototype.dataMapEventsXy = function(x, y) {
    return $dataMap.events.filter(function(event) {
        return (!!event && event.x === x && event.y === y);
    }, this);
};

Game_MapGenerator.prototype.closeCavities = function () {
  for (var x = 0; x < this._symbolMap.length; x++) {
    for (var y = 0; y < this._symbolMap[x].length; y++) {
      if ((this._symbolMap[x][y] === 'space' || this._symbolMap[x][y] === 'wall') && this._symbolMap[x][y + 1] === 'roof') {
        var outerSpace = true;
        var j = 0;
        while (y - j !== 0) {
          if (this._symbolMap[x][y - j] !== 'space') {
            outerSpace = false;
          }
          j++;
        }
        var i = 0;
        if (outerSpace === false) {
        while (this._symbolMap[x][y - i] === 'space' || this._symbolMap[x][y - i] === 'wall') {
          this._symbolMap[x][y - i] = 'roof';
           i++;
          }
        }
      }
    }
  }
};
    
// スタート地点イベントの設置
Game_MapGenerator.prototype.setStart = function() {
    var refXY = this._symbolTable['start'].refXY;
    var event = new Game_Event($gameMap.mapId(), this.dataMapEventsXy(refXY.x, refXY.y)[0].id);
    var dataEvent = $dataMap.events[event._eventId];
    var newPlayerLocationX;
    var newPlayerLocationY;
    event.meta = dataEvent.meta;
    event.name = dataEvent.name;
    
    if (dataEvent.meta.SpecialWall) {
      this._startXY = this.setEvent(event, 'wall');
      // we want to spawn the player below the wall event so they dont get stuck
      newPlayerLocationY = this._startXY.y + 1;
      // set priority type to 1 (same as characters) so that player can touch event
      // to trigger it
      event.setPriorityType(1);
    }
    else {
      // change: call chooseRoom function
      var room = this.chooseRoom(event);
      // change: mark start room
      this._rooms[this._rooms.indexOf(room)].hasStart = true;
      // change: call setEvent with 'room' and room parameters
      this._startXY = this.setEvent(event, 'room', room);
      newPlayerLocationY = this._startXY.y;
    }
    newPlayerLocationX = this._startXY.x;
    $gamePlayer.locate(newPlayerLocationX, newPlayerLocationY);
    $gamePlayer.reserveTransfer($gameMap.mapId(), newPlayerLocationX, newPlayerLocationY);
    $gameMap._interpreter.setWaitMode('transfer')
};

// ゴール地点イベントの設置
Game_MapGenerator.prototype.setGoal = function() {
    var refXY = this._symbolTable['goal'].refXY;
    var event = new Game_Event($gameMap.mapId(), this.dataMapEventsXy(refXY.x, refXY.y)[0].id);
    var dataEvent = $dataMap.events[event._eventId];
    event.meta = dataEvent.meta;
    event.name = dataEvent.name;
    if (dataEvent.meta.SpecialWall) {
      // change: spawn on wall
      this._goalXY = this.setEvent(event, 'wall');
      // set priority type to 1 (same as characters) so that player can touch event
      // to trigger it
      event.setPriorityType(1);
    }
    else {
      // change: call chooseRoom function
      var room = this.chooseRoom(event);
      // change: mark goal room
      this._rooms[this._rooms.indexOf(room)].hasGoal = true;
      // change: call setEvent with 'room' and room parameters
      this._goalXY = this.setEvent(event, 'room', room);
    }
};

Game_MapGenerator.prototype.chooseRoom = function (event) {
  var areaArray = [];
  this._rooms.forEach(function (room) {
    if (this.canSetInRoom(room, event)) {
      areaArray.push(room);
    }
  }, this);
  var randRoomNum = Math.floor(Math.random() * areaArray.length);
  return areaArray[randRoomNum];
};



Game_MapGenerator.prototype.setRateEvents = function () {
  var mapDataRateMapEvents = $dataMap.events.filter(function (event) {
    return !!event && !!event.meta.RateMap;
  });
  mapDataRateMapEvents.forEach(function (mapDataEvent) {
    // change: check event meta for min/max
    var minimum = mapDataEvent.meta.Minimum ? parseInt(mapDataEvent.meta.Minimum) : 1;
    var maximum = mapDataEvent.meta.Maximum ? parseInt(mapDataEvent.meta.Maximum) : 1;
    var count = minimum;
    if (maximum - minimum >= 1) {
      count = Math.round((Math.random() * maximum) + minimum);
    }
    for (var i = 0; i < count; i++) {
      if (this.randBool(parseFloat(mapDataEvent.meta.RateMap))) {
        var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
        event.meta = mapDataEvent.meta;
        event.name = mapDataEvent.name;
        // change: select room by calling chooseRoom
        var room = this.chooseRoom(event);
        this.setEvent(event, 'room', room);
      }
    }
  }, this);

  var mapDataRateRoomEvents = $dataMap.events.filter(function (event) {
    return !!event && !!event.meta.RateRoom;
  });
  mapDataRateRoomEvents.forEach(function (mapDataEvent) {
    this._rooms.forEach(function (room) {
      // change: check event meta for min/max
      var minimum = mapDataEvent.meta.Minimum ? parseInt(mapDataEvent.meta.Minimum) : 1;
      var maximum = mapDataEvent.meta.Maximum ? parseInt(mapDataEvent.meta.Maximum) : 1;
      var count = minimum;
      if (maximum - minimum >= 1) {
        count = Math.round((Math.random() * maximum) + minimum);
      }

      // change: make more than one attempt
      for (var i = 0; i < count; i++) {
        // change: check if can set in room
        if (this.canSetInRoom(room, mapDataEvent)) {
          if (this.randBool(parseFloat(mapDataEvent.meta.RateRoom))) {
            var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
            event.meta = mapDataEvent.meta;
            event.name = mapDataEvent.name;
            this.setEvent(event, 'room', room);
          }
        }
      }
    }, this);
  }, this);

  var mapDataRateRoomTilesEvents = $dataMap.events.filter(function (event) {
    return !!event && !!event.meta.RateRoomTiles;
  });
  mapDataRateRoomTilesEvents.forEach(function (mapDataEvent) {
    // change: check event meta for min/max
    var minimum = mapDataEvent.meta.Minimum ? parseInt(mapDataEvent.meta.Minimum) : 1;
    var maximum = mapDataEvent.meta.Maximum ? parseInt(mapDataEvent.meta.Maximum) : 1;
    var count = minimum;
    if (maximum - minimum >= 1) {
      count = Math.round((Math.random() * maximum) + minimum);
    }
    for (var i = 0; i < count; i++) {
      if (this.randBool(parseFloat(mapDataEvent.meta.RateRoomTiles))) {
        var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
        event.meta = mapDataEvent.meta;
        event.name = mapDataEvent.name;
        // change: select room by calling chooseRoom
        var room = this.chooseRoom(event);
        this.setEvent(event, 'room', room);
      }
    }
  }, this);

  var mapDataRateWallsEvents = $dataMap.events.filter(function (event) {
    return !!event && !!event.meta.RateWall;
  });
  mapDataRateWallsEvents.forEach(function (mapDataEvent) {
    // change: check event meta for min/max
    var minimum = mapDataEvent.meta.Minimum ? parseInt(mapDataEvent.meta.Minimum) : 1;
    var maximum = mapDataEvent.meta.Maximum ? parseInt(mapDataEvent.meta.Maximum) : 1;
    var count = minimum;
    if (maximum - minimum >= 1) {
      count = Math.round((Math.random() * maximum) + minimum);
    }
    for (var i = 0; i < count; i++) {
      if (this.randBool(parseFloat(mapDataEvent.meta.RateWall))) {
        var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
        event.meta = mapDataEvent.meta;
        event.name = mapDataEvent.name;
        // change: select room by calling chooseRoom
        var room = this.chooseRoom(event);
        this.setEvent(event, 'wall');
      }
    }
  }, this);
};

Game_MapGenerator.prototype.startRoom = function () {
  var startRoom;
  this._rooms.forEach(function (room) {
  if (room.hasStart === true)
    startRoom = room;
  }, this);
  return startRoom;
};

Game_MapGenerator.prototype.goalRoom = function () {
  return this._rooms.forEach(function (room) {
  if (room.hasGoal === true)
    return room;
  }, this);
};

Game_MapGenerator.prototype.isWallRoofOrRubble = function (x, y) {
  switch (this._symbolMap[x][y]) {
    case 'roof':
    case 'wall':
    case 'rubble':
      return true;
    break;
  }
  return false;
};

//ランダムブール
//probability : true が返る確立
Game_MapGenerator.prototype.randBool = function(probability) {
    return Math.random() < probability;
};

Game_MapGenerator.prototype.isViableTile = function (event, targetSymbols, x, y) {
  var dataEvent = $dataMap.events[event._eventId] ? $dataMap.events[event._eventId] : event;
  var MinimumStartRoomDistance = dataEvent.meta.MinimumStartRoomDistance ? parseInt(dataEvent.meta.MinimumStartRoomDistance) : 0;
  var MinimumGoalRoomDistance = dataEvent.meta.MinimumGoalRoomDistance ? parseInt(dataEvent.meta.MinimumGoalRoomDistance) : 0;

  var MinimumStartDistance = dataEvent.meta.MinimumStartDistance ? parseInt(dataEvent.meta.MinimumStartDistance) : 0;
  var MinimumGoalDistance = dataEvent.meta.MinimumGoalDistance ? parseInt(dataEvent.meta.MinimumGoalDistance) : 0;

  var InnerWallOnly = dataEvent.meta.InnerWallOnly ? true : false;
  var OuterWallOnly = dataEvent.meta.OuterWallOnly ? true : false;
  var LowerWallOnly = dataEvent.meta.LowerWallOnly ? true : false;
  var MiddleWallOnly = dataEvent.meta.MiddleWallOnly ? true : false;
  var UpperWallOnly = dataEvent.meta.UpperWallOnly ? true : false;
        // tile must be a pass tile adjacent to a room
  var DoorWayOnly = dataEvent.meta.DoorWayOnly ? true : false;
        // tile may not be block a pass
  var NoPassageBlock = dataEvent.meta.NoPassageBlock ? true : false;

  // if tile doesn't match desired type, tile not viable
  if (this._symbolMap[x][y] !== targetSymbols) {
    return false;
  }
  // if there is already an event here, return false
  if ($gameMap.eventsXy(x, y).length !== 0) {
    return false;
  }
        
  if (NoPassageBlock === true) {
    // check passability to the left
    if (this.isWallRoofOrRubble(x - 1, y) === false && this.isWallRoofOrRubble(x - 1, y + 1) === true
      && this.isWallRoofOrRubble(x - 1, y - 1) === true) {
      return false;
    }
    // check passability to the right
    if (this.isWallRoofOrRubble(x + 1, y) === false && this.isWallRoofOrRubble(x + 1, y + 1) === true
      && this.isWallRoofOrRubble(x + 1, y - 1) === true) {
      return false;
    }
    // check passability up
    if (this.isWallRoofOrRubble(x, y - 1) === false && this.isWallRoofOrRubble(x + 1, y - 1) === true
      && this.isWallRoofOrRubble(x - 1, y - 1) === true) {
      return false;
    }
    // check passability down
    if (this.isWallRoofOrRubble(x, y + 1) === false && this.isWallRoofOrRubble(x + 1, y + 1) === true
      && this.isWallRoofOrRubble(x - 1, y + 1) === true) {
      return false;
    }
  }

  // if there is a minimum distance from the start event and tile is too
  // close, tile not viable
  if (this._startXY && MinimumStartDistance >= 1) {
    var distance = Math.abs(x - this._startXY.x) + Math.abs(y - this._startXY.y);
    if (distance < MinimumStartDistance + 1) {
      return false;
    }
  }

  // if there is a minimum distance from the goal event and tile is too
  // close, tile not viable
  if (this._goalXY && MinimumGoalDistance >= 1) {
    var distance = Math.abs(x - this._goalXY.x) + Math.abs(y - this._goalXY.y);
    if (distance < MinimumGoalDistance + 1) {
      return false;
    }
  }

  if ((dataEvent.meta.RateWall || dataEvent.meta.SpecialWall) && UpperWallOnly === true) {
    // if the tile above is not roof, then not upper wall
    if (this._symbolMap[x][y - 1] !== 'roof') {
      return false;
    }
    // if the tile below is not wall, then not upper wall
    if (this._symbolMap[x][y + 1] !== 'wall') {
      return false;
    }
  }

  if ((dataEvent.meta.RateWall || dataEvent.meta.SpecialWall) && LowerWallOnly === true) {
    // if the tile above is not wall, then not lower wall
    if (this._symbolMap[x][y - 1] !== 'wall') {
      return false;
    }
    // if the tile below is wall, then not lower wall
    if (this._symbolMap[x][y + 1] === 'wall') {
      return false;
    }
  }

  // if any tile below (for wall height) is space or 
  // any tile above (for wall height) is roof, it is 
  // the outer wall so return false
  if ((dataEvent.meta.RateWall || dataEvent.meta.SpecialWall) && InnerWallOnly === true) {
    // if tile below is roof, don't spawn
    if (this._symbolMap[x][y + 1] === 'roof') {
      return false;
    }

    // find position of tile on wall
    var tilesAboveToRoof = 1;
    if (this._symbolMap[x][y - 1] !== 'roof') {
      for (tilesAboveToRoof = 1; this._symbolMap[x][y - tilesAboveToRoof] !== 'roof'; tilesAboveToRoof++) {
        // nothing
      }
    }

    if (this._symbolMap[x][y - tilesAboveToRoof + this._wallHeight + 1] === 'space') {
      return false;
    }
  }
  return true;
};

Game_MapGenerator.prototype.viableTiles = function (event, targetSymbols, targetArea) {
  var coorsArray = [];
  for (var x = targetArea.x; x < targetArea.x + targetArea.w; x++) {
    for (var y = targetArea.y; y < targetArea.y + targetArea.h; y++) {
      if (this.isViableTile(event, targetSymbols, x, y)) {
        var coors = {xCoor: x, yCoor: y};
        coorsArray.push(coors);
      }
    }
  }
  return coorsArray;
};

// シンボルマップの壁と天井を設置：マップ全体
// 床と通路だけのシンボルマップに壁と天井を追加する
Game_MapGenerator.prototype.refreshWallAndRoof = function() {
    for (var x = 0; x < this._symbolMap.length; x++) {
        for (var y = 0; y < this._symbolMap[x].length; y++) {
            if (!this.isPassable(x, y)) {
                continue;
            }
            this.refreshWallAndRoofUpperSide(x - 1, y - 1);  // 左上
            this.refreshWallAndRoofUpper(x, y - 1);          // 上
            this.refreshWallAndRoofUpperSide(x + 1, y - 1);  // 右上
            this.refreshWallAndRoofSide(x - 1, y);           // 左
            this.refreshWallAndRoofSide(x + 1, y);           // 右
            this.refreshWallAndRoofDowner(x - 1, y + 1);     // 左下
            this.refreshWallAndRoofDowner(x, y + 1);         // 下
            this.refreshWallAndRoofDowner(x + 1, y + 1);     // 右下
        }
    }
    for (var x = this._symbolMap.length - 1; x >= this._symbolMap.length; x--) {
        for (var y = this._symbolMap[x].length - 1; y >= this._symbolMap[x].length; y--) {
            if (this._symbolMap[x][y] === 'roof' && this._symbolMap[x][y - 1] === 'wall') {
                this._symbolMap[x][y - 1] = 'roof';
            }
        }
    }
};

// シンボルマップの壁と天井を設置：上
Game_MapGenerator.prototype.refreshWallAndRoofUpper = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    for (var h = 0; h < y && !this.isPassable(x, y - h); h++);
    if (h > this._wallHeight) {
        for (var wH = 0; wH < this._wallHeight; wH++) {
            this._symbolMap[x][y - wH] = 'wall';
        }
        this._symbolMap[x][y - this._wallHeight] = 'roof';
    } else {
        for (var wH = 0; wH < h; wH++) {
            if (this._symbolMap[x][y - wH] === 'space') {
                this._symbolMap[x][y - wH] = 'rubble';
            }
        }
    }
};

// シンボルマップの壁と天井を設置：下
Game_MapGenerator.prototype.refreshWallAndRoofDowner = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    for (var h = 0; h + y < $gameMap.height() && !this.isPassable(x, y + h); h++);
    if (h > this._wallHeight) {
        this._symbolMap[x][y] = 'roof';
        for (var wH = 0; wH < this._wallHeight; wH++) {
            if (this._symbolMap[x][y + wH + 1] !== 'roof') {
                this._symbolMap[x][y + wH + 1] = 'wall';
            }
        }
    } else {
        for (var wH = 0; wH < h; wH++) {
            if (this._symbolMap[x][y + wH] === 'space') {
                this._symbolMap[x][y + wH] = 'rubble';
            }
        }
    }
};

//シンボルマップの壁と天井を設置：横
Game_MapGenerator.prototype.refreshWallAndRoofSide = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    if (this.isPassable(x, y + 1)) {
        this.refreshWallAndRoofUpper(x, y);
    } else {
        this.refreshWallAndRoofDowner(x, y);
    }
};

// シンボルマップの壁と天井を設置：斜め上
Game_MapGenerator.prototype.refreshWallAndRoofUpperSide = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    this.refreshWallAndRoofDowner(x, y - this._wallHeight);
};

// オートタイルを考慮したタイルID
Game_MapGenerator.prototype.autoTileId = function(x, y, z) {
    if ((x < 0 || x >= $dataMap.width) || (y < 0 || y >= $dataMap.height)) {
        return 0;
    } else if (z === 4) {
        return this.shadow(x, y);
    } else if ((z !== 0 && z !== 1) || this._symbolTable[this._symbolMap[x][y]].baseTileId[z] === 0) {
        return this._symbolTable[this._symbolMap[x][y]].baseTileId[z];
    }
    var candidateTileIds = [];
    if (this._symbolMap[x][y] !== 'wall') {
        // 壁以外の場合
        candidateTileIds = Game_MapGenerator.tileIdsFloor.candidate.concat();
        [1, 2, 3, 4, 6, 7, 8, 9].forEach (function(direction) {
            var dx = x + Math.floor((direction - 1) % 3) - 1;
            var dy = y - Math.floor((direction - 1) / 3) + 1;
            if ((dx < 0 || dx >= $dataMap.width) || (dy < 0 || dy >= $dataMap.height)) {
                return; // マップ範囲外なら判定しない
            }
            if (this._symbolMap[x][y] === this._symbolMap[dx][dy]) {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsFloor.connect[direction].indexOf(Id) !== -1;
                }); // 同種シンボルの場合候補タイルIDから接続タイルIDを選択
            } else {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsFloor.noConnect[direction].indexOf(Id) !== -1;
                }); // 異種シンボルの場合候補タイルIDから非接続タイルIDを選択
            }
        }, this);
    } else {
        // 壁の場合
        candidateTileIds = Game_MapGenerator.tileIdsWall.candidate.concat();
        for (var by = y; this._symbolMap[x][y] === this._symbolMap[x][by + 1]; by++);  // 壁の下端
        for (var ty = y; this._symbolMap[x][y] === this._symbolMap[x][ty - 1]; ty--);  // 壁の上端
        // 上下の処理
        [2, 8].forEach(function(direction) {
            var dx = x + Math.floor((direction - 1) % 3) - 1;
            var dy = y - Math.floor((direction - 1) / 3) + 1;
            if ((dx < 0 || dx >= $dataMap.width) || (dy < 0 || dy >= $dataMap.height)) {
                return; // マップ範囲外なら判定しない
            }
            if (this._symbolMap[x][y] === this._symbolMap[dx][dy]) {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.connect[direction].indexOf(Id) !== -1;
                }); // 同種シンボルの場合候補タイルIDから接続タイルIDを選択
            } else {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.noConnect[direction].indexOf(Id) !== -1;
                }); // 異種シンボルの場合候補タイルIDから非接続タイルIDを選択
            }
        }, this);
        // 左右の処理
        [4, 6].forEach(function(direction) {
            var dx = x + Math.floor((direction - 1) % 3) - 1;
            var dy = y - Math.floor((direction - 1) / 3) + 1;
            if ((dx < 0 || dx >= $dataMap.width) || (dy < 0 || dy >= $dataMap.height)) {
                return; // マップ範囲外なら判定しない
            }
            if ((this._symbolMap[dx][ty] === 'wall' || this._symbolMap[dx][ty] === 'roof') &&
                (this._symbolMap[dx][by] === 'wall' || this._symbolMap[dx][by] === 'roof'))
            {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.connect[direction].indexOf(Id) !== -1;
                });　// 壁の下端の両横隣が壁または天井でかつ上端の両横隣が壁または天井でなければ接続タイルIDを選択
            } else {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.noConnect[direction].indexOf(Id) !== -1;
                });　// 非接続タイルIDを選択
            }
        }, this);
    }
    return this._symbolTable[this._symbolMap[x][y]].baseTileId[z] + candidateTileIds[0];
};

// 影の算出
Game_MapGenerator.prototype.shadow = function(x, y) {
    if (!this._symbolMap[x - 1] ||
        this._symbolMap[x][y] === 'space'||
        this._symbolMap[x][y] === 'roof' ||
        this._symbolMap[x][y] === 'wall')
    {
        return 0;
    } else if (this._symbolMap[x - 1][y] === 'roof') {
        if (this._symbolMap[x - 1][y - 1] === 'roof' ||
            this._symbolMap[x - 1][y - 1] === 'wall')
        {
            return 5;
        }
    }  else if (this._symbolMap[x - 1][y] === 'wall') {
        return 5;
    }
    return 0;
};

//マップデータ作成
Game_MapGenerator.prototype.makeData = function() {
    var width = $dataMap.width;
    var height = $dataMap.height;
    for (var x = 0; x < this._symbolMap.length; x++) {
        for (var y = 0; y < this._symbolMap[x].length; y++) {
            for (var z = 0; z < 6; z++) {
                this._data[(z * height + y) * width + x] = this.autoTileId(x, y, z);
            }
        }
    }
};

// マップデータ
Game_MapGenerator.prototype.data = function() {
    return this._data;
};

// タイルID
Game_MapGenerator.prototype.tileId = function(x, y, z) {
    return this._data[(z * $dataMap.height + y) * $dataMap.width + x];
};

// 準備完了判定
Game_MapGenerator.prototype.isReady = function() {
    return this._isReady;
};

// マップのコンソール表示（デバッグ用）
Game_MapGenerator.prototype.printMap = function() {
    var dispMap = "";
    for (var y = 0; y < this._symbolMap[0].length; y++) {
        for (var x = 0; x < this._symbolMap.length; x++) {
            dispMap += this._symbolTable[this._symbolMap[x][y]].dispChar;
        }
        dispMap += "\r\n";
    }
    console.log(dispMap);
    // this.fPrintMap(dispMap);
};

// テキスト出力（デバッグ用）
Game_MapGenerator.prototype.fPrintMap = function(mapString) {
    var data = LZString.compressToBase64(mapString);
    var fs = require('fs');
    var dirPath = StorageManager.localFileDirectoryPath();
    var filePath = StorageManager.localFileDirectoryPath() + 'mapData.txt';
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(filePath, mapString);
};

//-----------------------------------------------------------------------------
// Game_MapGeneratorRoomAndPass
//
// マップジェネレーター（部屋と通路）

function Game_MapGeneratorRoomAndPass() {
    this.initialize.apply(this, arguments);
}

Game_MapGeneratorRoomAndPass.prototype = Object.create(Game_MapGenerator.prototype);
Game_MapGeneratorRoomAndPass.prototype.constructor = Game_MapGeneratorRoomAndPass;

// 初期化
Game_MapGeneratorRoomAndPass.prototype.initialize = function() {
    Game_MapGenerator.prototype.initialize.call(this);
};

// マップ（ダンジョン）自動生成
Game_MapGeneratorRoomAndPass.prototype.generateMap = function() {
    this._minRoomSize = this._setMinimumRoomSize != false ? this._setMinimumRoomSize : eval(paramMinRoomSize);
    this._maxRoomSize = this._setMaximumRoomSize != false ? this._setMaximumRoomSize : eval(paramMaxRoomSize);
    
    if (this._maxRoomSize != -1 && this._minRoomSize > this._maxRoomSize)
      this._maxRoomSize = this._minRoomSize;
      
    this._minBlockSize = this._minRoomSize + 2;
    
    this._minRooms = this._setMinimumRooms != false ? this._setMinimumRooms : eval(paramMinRooms);
    this._maxRooms = this._setMaximumRooms != false ? this._setMaximumRooms : eval(paramMaxRooms);
    
    if (this._minRooms < 2) 
      this._minRooms = 2;
    
    if (this._maxRooms < 2) 
      this._maxRooms = 2;
 
    if (this._oneBigRoom === true){
      this._maxRooms = this._minRooms = 1;    
    }
    
    this._adjacentBlockIndexList = [];
    this._extraPasseChance = eval(extraPasseChance);
    var block = {
        x:1,
        y:1 + this._wallHeight,
        w:$dataMap.width - 2,
        h:$dataMap.height - (this._wallHeight + 1) * 2
    };
    this._blocks.push(block);
    this.splitBlock(this._blocks[0]);
    this.makeAdjacentBlockIndexList();
    this.makeRooms();
    this.setStart();
    this.setGoal();
    this.makePasses();
};

// 隣り合うブロックのリスト作成
Game_MapGeneratorRoomAndPass.prototype.makeAdjacentBlockIndexList = function() {
    for (var crntIndex = 0; crntIndex < this._blocks.length; crntIndex++) {
        var crntBlock = this._blocks[crntIndex];
        this._adjacentBlockIndexList[crntIndex] = {t:[], b:[], l:[], r:[]};
        for (var tgetIndex = 0; tgetIndex < this._blocks.length; tgetIndex++) {
            var tgetBlock = this._blocks[tgetIndex];
            if (crntBlock === tgetBlock) {
                continue;
            }
            var adjacentT = (crntBlock.y === tgetBlock.y + tgetBlock.h + 1);
            var adjacentB = (tgetBlock.y === crntBlock.y + crntBlock.h + 1);
            var adjacentL = (crntBlock.x === tgetBlock.x + tgetBlock.w + 1);
            var adjacentR = (tgetBlock.x === crntBlock.x + crntBlock.w + 1);
            if (!adjacentT && !adjacentB && !adjacentL && !adjacentR) {
                continue;
            }
            var matchH =
                (tgetBlock.x <= crntBlock.x + crntBlock.w && tgetBlock.x >= crntBlock.x) ||
                (tgetBlock.x + tgetBlock.w <= crntBlock.x + crntBlock.w && tgetBlock.x + tgetBlock.w >= crntBlock.x) ||
                (crntBlock.x <= tgetBlock.x + tgetBlock.w && crntBlock.x >= tgetBlock.x) ||
                (crntBlock.x + crntBlock.w <= tgetBlock.x + tgetBlock.w && crntBlock.x + crntBlock.w >= tgetBlock.x);
            var matchV =
                (tgetBlock.y <= crntBlock.y + crntBlock.h && tgetBlock.y >= crntBlock.y) ||
                (tgetBlock.y + tgetBlock.h <= crntBlock.y + crntBlock.h && tgetBlock.y + tgetBlock.h >= crntBlock.y) ||
                (crntBlock.y <= tgetBlock.y + tgetBlock.h && crntBlock.y >= tgetBlock.y) ||
                (crntBlock.y + crntBlock.h <= tgetBlock.y + tgetBlock.h && crntBlock.y + crntBlock.h >= tgetBlock.y);
            if (adjacentT && matchH) {
                this._adjacentBlockIndexList[crntIndex].t.push(tgetIndex);
                continue;
            } else if (adjacentB && matchH) {
                this._adjacentBlockIndexList[crntIndex].b.push(tgetIndex);
                continue;
            }
            if (adjacentL && matchV) {
                this._adjacentBlockIndexList[crntIndex].l.push(tgetIndex);
                continue;
            } else if (adjacentR && matchV) {
                this._adjacentBlockIndexList[crntIndex].r.push(tgetIndex);
                continue;
            }
        }
    }
};

Game_MapGeneratorRoomAndPass.prototype.makeRooms = function () {
  this._blocks.forEach(function (block) {
    var roomW = 0;
    var roomH = 0;
    if(this._oneBigRoom === true){
      roomW = $dataMap.width - 4 - Math.randomInt($dataMap.width / 10);
      roomH = $dataMap.height - 2 - (this._wallHeight + 1) * 2 - Math.randomInt($dataMap.width / 10);
    }
    else{
      roomW = this._minRoomSize + Math.randomInt(block.w - this._minRoomSize - 2);
        if (roomW > this._maxRoomSize && this._maxRoomSize != -1) roomW = this._maxRoomSize;
      roomH = this._minRoomSize + Math.randomInt(block.h - this._minRoomSize - 2);
        if (roomH > this._maxRoomSize && this._maxRoomSize != -1) roomH = this._maxRoomSize;
    }
    var roomX = block.x + 1 + Math.randomInt(block.w - roomW - 2);
    var roomY = block.y + 1 + Math.randomInt(block.h - roomH - 2);            
            
    // change: added hasStart and hasGoal to room
    var room = {x: roomX, y: roomY, w: roomW, h: roomH, hasStart: false, hasGoal: false, roomConnectToGoal : false};
    room.roomConnectToGoal = false;
    this._rooms.push(room);
  }, this);
  this._rooms.forEach(function (room) {
    for (var y = 0; y < room.h; y++) {
      for (var x = 0; x < room.w; x++) {
        this._symbolMap[room.x + x][room.y + y] = 'room';
      }
    }
  }, this);
};

// 通路作成
Game_MapGeneratorRoomAndPass.prototype.makePasses = function() {
    if (this._oneBigRoom === true)
      return;
      
    var cache = {};
    var allConnectedToGoal = false;
    var maxLoop = 50;
    var currentLoop = 0;
    var blockOk = [];

    while(allConnectedToGoal === false && maxLoop > currentLoop){
      allConnectedToGoal = true;
      currentLoop++;
      console.log("map generator Passe " + currentLoop);
      for (var crntIndex = 0; crntIndex < this._adjacentBlockIndexList.length; crntIndex++ ) {
          cache[crntIndex] = [];
          var crngBlock = this._blocks[crntIndex];
          
          if (blockOk.indexOf(crntIndex) != -1)
            continue;

          for(var direction in this._adjacentBlockIndexList[crntIndex]) {
              var tgetIndexList = this._adjacentBlockIndexList[crntIndex][direction];
              tgetIndexList.forEach(function(tgetIndex) {
                  if (cache[tgetIndex] !== undefined && cache[tgetIndex].indexOf(crntIndex) !== -1){
                      return;
                  }
                  
                  var tgetBlock = this._blocks[tgetIndex];
                  var crntRoom = this._rooms[crntIndex];
                  var tgetRoom = this._rooms[tgetIndex];
                  
                  if (Math.randomInt(100) <= extraPasseChance){
                    console.log(Math.randomInt(100) + " <= "+ extraPasseChance);
                    this.makePasseRoomToRoom(crntRoom,tgetRoom,crngBlock,tgetBlock,direction);
                    cache[crntIndex].push(tgetIndex);
                    console.log(crntIndex + "-" + tgetIndex + " passe rand");
                  }
                  else {
                    var crntConnectGoal = crntRoom.hasGoal === true || crntRoom.roomConnectToGoal === true;
                    var tgetConnectGoal = tgetRoom.hasGoal === true || tgetRoom.roomConnectToGoal === true;
                    
                    if(crntConnectGoal === false){
                      if (tgetConnectGoal === true){
                        this.makePasseRoomToRoom(crntRoom,tgetRoom,crngBlock,tgetBlock,direction);
                        cache[crntIndex].push(tgetIndex);
                        console.log(crntIndex + "-" + tgetIndex + " passe target");
                      }
                      else{  
                        allConnectedToGoal = false;
                      }
                    }
                    else{
                      if (tgetConnectGoal === false){
                        this.makePasseRoomToRoom(crntRoom,tgetRoom,crngBlock,tgetBlock,direction);
                        cache[crntIndex].push(tgetIndex);
                        console.log(crntIndex + "-" + tgetIndex + " passe current");
                      }
                    }
                  }
              }, this);
          }
          if(this._rooms[crntIndex].hasGoal === true || this._rooms[crntIndex].roomConnectToGoal === true)
            blockOk.push(crntIndex);
      }
    }
    this._passes.forEach(function(pass) {
        for (var y = 0; y < pass.h; y++) {
            for (var x = 0; x < pass.w; x++) {
                this._symbolMap[pass.x + x][pass.y + y] = 'pass';
            }
        }
    }, this);
};

Game_MapGeneratorRoomAndPass.prototype.makePasseRoomToRoom = function(crntRoom,tgetRoom,crngBlock,tgetBlock,direction) {
  var crntPass = {};
  var tgetPass = {};
  var bordPass = {};
    
  if ((tgetRoom.hasGoal === true || tgetRoom.roomConnectToGoal === true))
    crntRoom.roomConnectToGoal = true;
  else if ((crntRoom.hasGoal === true || crntRoom.roomConnectToGoal === true))
    tgetRoom.roomConnectToGoal = true;
                
                
  switch (direction) {
    case 't':
      crntPass.x = crntRoom.x + 1 + Math.randomInt(crntRoom.w - 2);
      crntPass.y = crngBlock.y;
      crntPass.w = 1;
      crntPass.h = crntRoom.y - crngBlock.y;
      tgetPass.x = tgetRoom.x + 1 + Math.randomInt(tgetRoom.w - 2);
      tgetPass.y = tgetRoom.y + tgetRoom.h;
      tgetPass.w = 1;
      tgetPass.h = crngBlock.y - tgetPass.y;
      bordPass.x = Math.min(crntPass.x, tgetPass.x);
      bordPass.y = crngBlock.y - 1;
      bordPass.w = Math.max(crntPass.x, tgetPass.x) - bordPass.x + 1;
      bordPass.h = 1;
      break;
    case 'b':
      crntPass.x = crntRoom.x + 1 + Math.randomInt(crntRoom.w - 2);
      crntPass.y = crntRoom.y + crntRoom.h;
      crntPass.w = 1;
      crntPass.h = tgetBlock.y - crntPass.y;
      tgetPass.x = tgetRoom.x + 1 + Math.randomInt(tgetRoom.w - 2);
      tgetPass.y = tgetBlock.y;
      tgetPass.w = 1;
      tgetPass.h = tgetRoom.y - tgetBlock.y;
      bordPass.x = Math.min(crntPass.x, tgetPass.x);
      bordPass.y = tgetBlock.y - 1;
      bordPass.w = Math.max(crntPass.x, tgetPass.x) - bordPass.x + 1;
      bordPass.h = 1;
      break;
    case 'l':
      crntPass.x = crngBlock.x - 1;
      crntPass.y = crntRoom.y + 1 + Math.randomInt(crntRoom.h - 2);
      crntPass.w = crntRoom.x - crntPass.x;
      crntPass.h = 1;
      tgetPass.x = tgetRoom.x + tgetRoom.w;
      tgetPass.y = tgetRoom.y + 1 + Math.randomInt(tgetRoom.h - 2);
      tgetPass.w = crntPass.x - tgetRoom.x - tgetRoom.w;
      tgetPass.h = 1;
      bordPass.x = crngBlock.x - 1;
      bordPass.y = Math.min(crntPass.y, tgetPass.y);
      bordPass.w = 1;
      bordPass.h = Math.max(crntPass.y, tgetPass.y) - bordPass.y + 1;
      break;
    case 'r':
      crntPass.x = crntRoom.x + crntRoom.w
      crntPass.w = tgetBlock.x - 1 - crntRoom.x - crntRoom.w
      crntPass.y = crntRoom.y + 1 + Math.randomInt(crntRoom.h - 2);
      crntPass.h = 1;
      tgetPass.x = tgetBlock.x - 1;
      tgetPass.y = tgetRoom.y + 1 + Math.randomInt(tgetRoom.h - 2);
      tgetPass.w = tgetRoom.x - tgetPass.x;
      tgetPass.h = 1;
      bordPass.x = tgetBlock.x - 1;
      bordPass.y = Math.min(crntPass.y, tgetPass.y);
      bordPass.w = 1;
      bordPass.h = Math.max(crntPass.y, tgetPass.y) - bordPass.y + 1;
      break;
  }
  this._passes.push(crntPass);
  this._passes.push(tgetPass);
  this._passes.push(bordPass);
};

// ブロック分割：ランダム
Game_MapGeneratorRoomAndPass.prototype.splitBlock = function(block) {
    if (this.randBool(0.5)) {
        if (this.isSplitableH(block)) {
            this.splitBlockH(block);
        }
        if (this.isSplitableV(block)) {
            this.splitBlockV(block);
        }
    } else {
        if (this.isSplitableV(block)) {
            this.splitBlockV(block);
        }
        if (this.isSplitableH(block)) {
            this.splitBlockH(block);
        }
    }
};

//ブロック分割：横分割
Game_MapGeneratorRoomAndPass.prototype.splitBlockH = function(block) {
    var width1 = 0;
    var width2 = 0;
    while (width1 < this._minBlockSize || width2 < this._minBlockSize) {
        width1 = Math.floor(block.w / 4 + block.w * Math.random() / 2);
        width2 = block.w - width1 - 1;
    }
    block.w = width1;
    var newBlock = {x:block.x + width1 + 1, y:block.y, w:width2, h:block.h};
    this._blocks.push(newBlock);
    this.splitBlock(block);
    this.splitBlock(newBlock);
};

// ブロック分割：縦分割
Game_MapGeneratorRoomAndPass.prototype.splitBlockV = function(block) {
    var height1 = 0;
    var height2 = 0;
    while (height1 < this._minBlockSize || height2 < this._minBlockSize) {
        height1 = Math.floor(block.h / 4 + block.h * Math.random() / 2);
        height2 = block.h - height1 - 1;
    }
    block.h = height1;
    var newBlock = {x:block.x, y:block.y + height1 + 1, w:block.w, h:height2};
    this._blocks.push(newBlock);
    this.splitBlock(block);
    this.splitBlock(newBlock);
};

// ブロック分割可能判定：部屋数
Game_MapGeneratorRoomAndPass.prototype.isSplitableByRoomNum = function() {
    if (this._blocks.length >= this._maxRooms) {
        return false;
    }
    if (this._blocks.length >= this._minRooms &&
        this.randBool((this._blocks.length - this._minRooms + 1) / (this._maxRooms - this.minRooms + 1)))
    {
        return false;
    }
    return true;
};

// ブロック分割可能判定：横分割
Game_MapGeneratorRoomAndPass.prototype.isSplitableV = function(block) {
    return (block.h > (this._minRoomSize + 2) * 2 + 1) && this.isSplitableByRoomNum();
};

// ブロック分割可能判定：縦分割
Game_MapGeneratorRoomAndPass.prototype.isSplitableH = function(block) {
    return (block.w > (this._minRoomSize + 2) * 2 + 1) && this.isSplitableByRoomNum();
};

// 座標によって部屋を取得
Game_MapGeneratorRoomAndPass.prototype.roomByXY = function(x, y) {
    this._rooms.forEach(function(room) {
        if (room.x <= x && x <= room.x + room.w && room.y <= y && y <= room.y + room.h) {
            return result = room;
        }
    }, this);
    return undefined;
};

//-----------------------------------------------------------------------------
// Game_Map
//
// マップクラス

// マップクラスの初期化
Sanshiro.Game_MapGenerator.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    Sanshiro.Game_MapGenerator.Game_Map_initialize.call(this);
};

// マップクラスのセットアップ
Sanshiro.Game_MapGenerator.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Sanshiro.Game_MapGenerator.Game_Map_setup.call(this, mapId)
    this._mapGenerator = null;
};

// マップクラスのタイルID
Sanshiro.Game_MapGenerator.Game_Map_tileId = Game_Map.prototype.tileId
Game_Map.prototype.tileId = function(x, y, z) {
    if (!!this._mapGenerator && this._mapGenerator.isReady()) {
        return this._mapGenerator.tileId(x, y, z);
    } else {
        return Sanshiro.Game_MapGenerator.Game_Map_tileId.call(this, x, y, z);
    }
};

// マップクラスのマップデータ
Sanshiro.Game_MapGenerator.Game_Map_data = Game_Map.prototype.data
Game_Map.prototype.data = function() {
    if (!!this._mapGenerator && this._mapGenerator.isReady()) {
        return this._mapGenerator.data();
    } else {
        return Sanshiro.Game_MapGenerator.Game_Map_data.call(this);
    }
};

// マップクラスのマップ自動生成
Game_Map.prototype.generateMap = function(mapType) {
    mapType = mapType || 'FillRoom';
    switch (mapType) {
    case 'RoomAndPass':
        this._mapGenerator = new Game_MapGeneratorRoomAndPass();
        break;
    case 'FillRoom':
        this._mapGenerator = new Game_MapGenerator();
        break;
    }
    this._mapGenerator.setup();
    if (Imported.SAN_AnalogMove) {
        Game_CollideMap.setup();
    }
};

//-----------------------------------------------------------------------------
// Game_Event
//
// イベントクラス

// イベントクラスの初期化
Sanshiro.Game_MapGenerator.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    this._dataEventId = eventId;
    Sanshiro.Game_MapGenerator.Game_Event_initialize.call(this, mapId, eventId);
};

// イベントクラスのデータベースのイベントデータ
Game_Event.prototype.event = function() {
    return $dataMap.events[this._dataEventId];
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// インタープリタークラス

// プラグインコマンド
Sanshiro.Game_MapGenerator.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Sanshiro.Game_MapGenerator.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MapGenerator') {
        $gameMap.generateMap(args[0]);
    }
};
