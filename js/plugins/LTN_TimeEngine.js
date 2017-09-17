// =============================================================================
// LTN_TimeEngine.js
// =============================================================================
// Version 1.3.0
/* eslint-disable camelcase */
/*~struct~TimeWindow:
  @param x
  @type text
  @text X Position
  @default left
  @desc The x position on the map, for this windows origin point to rest on

  @param y
  @text Y Position
  @type number
  @default 420
  @desc The y position on the map, for this windows origin point to rest on

  @param width
  @text Width
  @type number
  @default 230
  @desc The width of the window.

  @param height
  @text Height
  @type number
  @default 230
  @desc The height of the window.

  @param format
  @text Clock Format
  @type text
  @default compact
  @desc The format the clock should be displayed. compact, full or simple, see the help file for more information.

  @param font
  @text Font Size
  @type number
  @default 24
  @desc The size of the font for all contents of the window.

  @param opacity
  @text Opacity/Transparency
  @type number
  @max 255
  @min 0
  @default 255
  @desc The opacity is used to make the window transparent or opaque
*/

/*:
 * @plugindesc v 1.3.0 A simple but powerful time engine.
 <LTN_TimeEngine>

 * @author LTN Games (https://ltngames.net)

 @param Game Time

 @param Time Speed
 @parent Game Time
 @type decimals 2
 @desc How fast should the time move? Higher the number slower the time.
 @default 0.8

 @param Seconds In A Minute
 @parent Game Time
 @desc How many seconds in a minute? This will fine tune time speed for those
 @type number
 looking for better adjustment of speed. Default: 60
 @default 60

 @param Minutes In An Hour
 @parent Game Time
 @desc How many minutes in an hour?
 @type number
 Default: 60
 @default 60

 @param Hours In A Day
 @parent Game Time
 @desc How many hours in a day?
 @type number
 Default: 24
 @default 24

 @param Days Options
 @parent Game Time

 @param Days of the Week
 @parent Days Options
 @desc The names of the days of the week
 @type text[]
 @default ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

 @param Days of the Week Abreviations
 @parent Days Options
 @type text[]
 @desc The names of the days of the week in abreviated form.
 @default ["Sun.","Mon.","Tues.","Wed.","Thurs.","Fri.","Sat."]

 @param Months Options
 @parent Game Time

 @param Month Names
 @parent Months Options
 @type text[]
 @desc The names of the months in a year.
 @default ["January","February","March","April","May","June","July","August","September","October","November","December"]

 @param Month Abreviations
 @parent Months Options
 @type text[]
 @desc The names of the months in a year in abreviated form.
 @default ["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."]

 @param Days in a Month
 @parent Months Options
 @type number[]
 @desc Define the number of days in each month
 @default ["31","28","31","30","31","30","31","31","30","31","30","31"]

 @param Year Suffix
 @parent Game Time
 @desc The year suffix name(E.G. AD, BC, etc)
 @default A.D.

 @param Pause Options
 @parent Game Time

 @param Pause With Message
 @parent Pause Options
 @type boolean
 @desc Pause time from moving when dialogue window is open.
 @default false

 @param Pause In Battle
 @parent Pause Options
 @type boolean
 @desc Pause time from moving when in the battle scene.
 @default true

 @param Pause In Menu
 @parent Pause Options
 @type boolean
 @desc Pause time from moving when main menu is open.
 @default true

 @param  Display Clock

 @param Toggle Button
 @parent  Display Clock
 @desc The button to press to show and hide the clock.
 @default tab

 @param 24 Hour Time
 @parent Display Clock
 @type boolean
 @desc Would you like to display the time in 24hour time.
 @default false

 @param Integrate On Map
 @parent  Display Clock
 @type boolean
 @desc Integrate the clock on the map.
 @default true

 @param Hide Year From Clock
 @parent  Display Clock
 @type boolean
 @desc Choose to hide or show the year in the display clock.
 @default false

 @param Clock Detials For Map
 @parent  Display Clock
 @type struct<TimeWindow>
 @desc Change the position of the clock on the map.
 @default "x:right\ny:top\nwidth:230\nformat:compact\nfont:24"

 @param Integrate In Menu
 @parent  Display Clock
 @type boolean
 @desc Integrate the clock in the main menu.
 @default false

 @param Clock Detials For Menu
 @parent  Display Clock
 @type struct<TimeWindow>
 @desc Change the position of the clock in the main menu.
 @default "x:left\ny:420\nwidth:230\nformat:compact\nfont:24"

 @param Integrate In Battle
 @parent  Display Clock
 @type boolean
 @desc Integrate the clock in the battle scene
 @default false

 @param Clock Detials For Battle
 @parent  Display Clock
 @type struct<TimeWindow>
 @desc Change the position of the clock in battle.
 @default

* @help ================================================================================
 ▼ TERMS OF USE
 ================================================================================
Credit must be given to: LTN Games

Exclusive to https://ltngames.net, please don't share anywhere else unless given strict
permission by the author of the plugin.

The plugin may be used in commerical and non-commerical products.
Credit must be given!

Please report all bugs to https://ltngames.net/Support

 ===============================================================================
 ▼ DEPENDENCIES
 ===============================================================================
 Requires LTN Core.

 Ensure you have LTN Core installed and above this plugin.

 ===============================================================================
 ▼ INFORMATION
 ===============================================================================
 This is the core time engine for a a series of plugins to give your game basic
 time and other time related features.

 This core gives you a complete basic time system and does not require any of
 the add-ons to work. With this plugin you will have access to a display clock
 (HUD) which can be shown on the game map, battle scene or main menu.
 ============================================================================
 ▼ DONATIONS
 ============================================================================
Most of the plugins I write are free to use commercially, and I put a lot of
hours into the development of my plugins, If you like my work and want to see
more of it in the future, I ask that you consider offering a donation.

If you do wish to provide your support, you can do so by sending your
contribution via PayPal to - https://ltngames.net/Donate
 ===============================================================================
 ▼ INSTRUCTIONS
 ===============================================================================
By default when this plugin is turned on it will start working right away, you
will have a clock on the game map when starting a new game, set to the default
time. It is up to you to customize the details of how you want the clock to be
displayed and you can start with the plugins parameter setting.

===================
PlUGIN PARAMETERS:
===================
Most plugin parameters you can choose from are self explanatory, but for the
ones which are not described well, I'll explain here.

A quick note about setting up months, weeks, and days. Just keep note of how
the default values are formatted you always use a , after each month, day or
week.

The first name in the 'months' parameter will be 'January', so the first one
in the 'Abreviated Months' parameter must be 'Jan' and the first one in the
'days in a month' parameter will be be 31 and so on.

The first name in Months is also the first month of the year, when the time
has reached all the way the last month it will reset back to the first month.
You may include as many months as you'd like.

-----------------------------
The clock detail parameters
------------------------------
These parameters are for changing the appearance and location of the clock.

Clock Detials For Map
Clock Detials For Menu
Clock Detials For Battle

Each of these can be adjusted to your liking using a simple format like
this below.

 x:left, y:420, width:230, height:80, format:compact, font:24

 Just ensure you type the property you want to adjust followed by a : then
 the value you want that property to be, followed by a comma ,.

 x: Is the location of the window on the x axis(left and right) You can
 keep it simple and use the word left to align the clock to the 'left' or
 use the word 'right' to align the window to the right. You may also use
 numbers to fine tune and adjust the clock wherever you'd like on the x axis.

 y: Is the same as the x propperty but instead of left and right it's up
 and down. You may use the words bottom and top to align the window, and
 you may also use a number to fine tune and adjust the location.

 width: This is the width of the window, you really only need to adjust
 this if you have a larger default font, or you change the font size and
 notice the text is being cut off.

 format: This is the format of the date,
 'compact' will use all the abreviated names.
 'full' will use the full names of the month and weekday
 'simple' will remove the date entirely, and show just the clock,

 font: This is the font size of the date and time.

===================
PlUGIN COMMANDS:
===================

Plugin Command:
-----------------------------------------
TE SetTime hour minute day week month year
------------------------------------------
eg:
TE SetTime 18 30 14 Thursday December 2000
TE SetTime 18 30 14 5 12 2000
TE SetTime x x 14 x 12 x
TE SetTime 16 30

This plugin command will set the date and time if you choose to.

You do not have to enter a time, if you only want to set 1 option
simply type in an x on the option(s) you don't want to set
in the plugin command. As seen in the example above.

The hour option uses 24 hour time. It must be a number set between 1
and the amount you set in the parameter "Hours In A Day"

The minute option is a number between 1 and the amount you set in
the parameter "Minutes In an Hour".

The day option is the day of the month you want to switch to, ensure
you don't set the day past the max amount of days in a month.

The week option is the day of the week(the name or number) ensure you
don't set past the max amount of days in a week.

The Month option is to set the month in a year(the name or number)
ensure you don't  set past the max amount of months in a year.

The year option is, you guessed it, the year. You can set this to whatever
you want just ensure it's only a number.

Plugin Command:
------------------------------------------
TE SetSpeed Speed Seconds
------------------------------------------
eg:
TE SetSpeed 3, 5
TE SetSpeed 1, 60

The speed option is to fine tune the speed of the time. The higher the number
the slower the time will progress.

The seconds option is a number you may change to whatever you want
and represents how much seconds are in a minute. This will also speed up or
slow down time.

Plugin Command:
------------------------------------------
TE Pause
------------------------------------------

eg:
TE Pause true   //Pause time
TE Pause false  //Unpause time

This is for pausing the time during cutscenes or whenever you need to pause time.
You can use the same command to unpause time as well.
Note: You may use the keywords 'true', 'yes', 'false', and 'no' to pause and unpause.

Plugin Command:
------------------------------------------
TE Variables static/current Hour Minute Day Week Month Year
------------------------------------------

eg:
# Takes a snapshot of the time, which  will always remain the time when you set them.
TE Variables static 1 2 3 4 5 6

# This will always update the variables to be the current time.
TE Variables active 1 2 3 4 5 6

# This will clear the active variables from being updated
TE Variables clear

This plugin command will setup the game time to the variable # you set.
In the example above the hour will go into variable 1 and so on.

variables - is a keyword which lets the plugin know you want to set variables

static or active - the third keyword let's the plugin know you want to get a
timestamp(static) of the current time or you want the variabels to be always updated
(active).

clear - This is a third keyword you can use to clear the active variables, this will
stop the active variables from being updated, until you set the active variables again.
NOTE: The variables will still reflect the time it was when you cleared the active variables.

Plugin Command:
------------------------------------------
TE Clock hide
------------------------------------------
eg:
TE Clock hide

This plugin command will hide the clock from all scenes you intergrated it into
until you decide to show it again.

Plugin command:
------------------------------------------
TE Clock show
------------------------------------------
eg:
TE Clock show

This plugin command will show the clock from all scenes you intergrated it into
until you decide to hide it again.

Plugin Command:
------------------------------------------
TE Add amount type skipTimers
------------------------------------------
eg:
TE Add 2 hours
TE Add 2 days

This plugin command is an easy way to add to the current time, this would be useful
when you have a cutscene that advances the story in time, or sleeping at an inn , etc.

Adding time will automatically update and adjust all timers unless
you specify otherwise by setting the skipTimers argument to true

Adding a 'week' will add 7 days to the current time.

Plugin Command:
------------------------------------------
TE Timer Year Month Day Hour Minute onStart onComplete destroy reset
------------------------------------------

TE Timer 0 0 2 1 0 1 2 true false
- The timer will complete every 2 days and 1 hour and activate common event 1
when it starts and 2 when it completes. Once finished it will destroy itself.

TE Timer 0 2 0 0 0 1 2 false true
- The timer will complete every month and activate common event 1
when it starts and 2 when it completes. Once complete it will reset
and start again.

This command is a bit more advanced, it's a timer and using it will create a new
timer that will start to countdown the moment the plugin command has been
activated.

Timer - The keyword to let the plugin know you are creating a new timer.

Year, Month, Day, Hour, Minute - All these options can be used to choose
when the timer should complete. If you don't want to use a specific time
property then simply input 0.

onStart - This is a callback feature, you will use this to call a common event
or something more advanced like a javascript method. This will be called when
the timer has started. Using a number here will call a common event by the it's
number id.

onComplete - This is a callback feature, you will use this to call a common event
or something more advanced like a javascript method.This will be called when the
timer has completed. Using a number here will call a common event by the it's
number id.

Destroy - Set to true if you want the timer to destroy itself and never activate
again.

Reset - Set to true if you want the timer to reset and start the timer countdown
again.

===================
MESSAGE CODES:
===================
\STIME  - this will retrieve the current time in standard time. eg: 5:00AM
\ATIME  - this will retireve the current time in army time.     eg: 14:35

\FDATE  - this will retrieve the current date in full format. eg: Sunday, January 1
\SDATE  - this will retrieve the current date in simple format. eg: Sun, Jan 1
*/
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof LTN === 'undefined') {
  var strA = 'You need to install the LTN Core plugin';
  var strB = 'in order for this plugin to work! Please visit';
  var strC = '\n http://ltngames.net/ltn-core';
  var strD = ' to download the latest verison.';
  throw new Error(strA + strB + strC + strD);
} else {
  // Set plugin namespace
  LTN.PluginRegistrar.registerPlugin('TimeEngine', '1.3.0', 'LTNGames');
}

(function ($) {
  // Require Utility functions
  var _Utils = LTN.Utilities;

  $.Parameters = PluginManager.getPluginParameters('LTN_TimeEngine');
  $.Param = $.Param || {};
  // Game Time
  $.Param.monthNames = String($.Parameters['Month Names']);
  $.Param.monthNameAbvs = String($.Parameters['Month Abreviations']);
  $.Param.monthDays = String($.Parameters['Days in a Month']);

  $.Param.weekNames = String($.Parameters['Days of the Week']);
  $.Param.weekNameAbvs = String($.Parameters['Days of the Week Abreviations']);

  $.Param.yearSuffix = String($.Parameters['Year Suffix']);
  $.Param.timeSpeed = Number($.Parameters['Time Speed']);

  $.Param.secondsInMin = Number($.Parameters['Seconds In A Minute']);
  $.Param.minutesInHour = Number($.Parameters['Minutes In An Hour']);
  $.Param.hoursInDay = Number($.Parameters['Hours In A Day']);

  $.Param.pauseInMenu = _Utils.toBool($.Parameters['Pause In Menu']);
  $.Param.pauseInBattle = _Utils.toBool($.Parameters['Pause In Battle']);
  $.Param.pauseWhenMessage = _Utils.toBool($.Parameters['Pause With Message']);

  $.Param.hideYear = _Utils.toBool($.Parameters['Hide Year From Clock']);
  $.Param.mapDetails = _Utils.toObj($.Parameters['Clock Detials For Map']);
  $.Param.menuDetails = _Utils.toObj($.Parameters['Clock Detials For Menu']);
  $.Param.battleDetails = _Utils.toObj($.Parameters['Clock Detials For Battle']);

  $.Param.mapIntegrate = _Utils.toBool($.Parameters['Integrate On Map']);
  $.Param.battleIntegrate = _Utils.toBool($.Parameters['Integrate In Battle']);
  $.Param.menuIntegrate = _Utils.toBool($.Parameters['Integrate In Menu']);

  $.Param.twentyFourHour = _Utils.toBool($.Parameters['24 Hour Time']);
  $.Param.toggleButton = String($.Parameters['Toggle Button']) || 'tab';

  /** ----------------------------------------------------
   * Add Clock To Scenes >>
   *
   * Aliased Methods: SceneMenu, SceneMap, SceneBattle
   * SceneBase
   ------------------------------------------------------- */

  $.Alias.SceneMap_createDisplayObjs = Scene_Map.prototype.createDisplayObjects;

  Scene_Map.prototype.createDisplayObjects = function () {
    $.Alias.SceneMap_createDisplayObjs.call(this);
    if ($.Param.mapIntegrate) {
      $.gameTime.createClock();
    }
  };

  $.Alias.Scene_Menu_create = Scene_Menu.prototype.create;

  Scene_Menu.prototype.create = function () {
    $.Alias.Scene_Menu_create.call(this);
    if ($.Param.menuIntegrate) {
      $.gameTime.createClock();
    }
  };

  $.Alias.SceneBattle_create = Scene_Battle.prototype.create;
  Scene_Battle.prototype.create = function () {
    $.Alias.SceneBattle_create.call(this);
    if ($.Param.battleIntegrate) {
      $.gameTime.createClock();
    }
  };

  $.Alias.SceneBase_update = Scene_Base.prototype.update;

  Scene_Base.prototype.update = function () {
    $.Alias.SceneBase_update.call(this);
    $.gameTime.updateTime();
  };

  /** ----------------------------------------------------
   * Game_Time >>
   *
   * Basic time system
   * Record time events, update time.
   * Functions: Set speed, current hh:mm:ss, update, record
   *
   ------------------------------------------------------- */

  var Game_Time = function () {
    function Game_Time() {
      _classCallCheck(this, Game_Time);

      this.initialize.apply(this, arguments);
    }

    /**
     * @function
     * @name initialize
     * @desc Initialize and setup important time information
     */


    _createClass(Game_Time, [{
      key: 'initialize',
      value: function initialize() {
        var speed = $.Param.timeSpeed;
        this.time = {
          year: 2022,
          month: 6,
          day: 12,
          week: 1,
          hour: 10,
          minute: 0,
          second: 0,
          millisecond: 0,
          speed: speed
        };
        this._pauseTime = false;
        this._clockHide = false;
        this._timers = [];
        this._activeVars = [];
        this.setupDatesInformation();
      }

      /**
       * @function
       * @name setupDatesInformation
       * @desc Converts all time parameters into an object of arrays.
       */

    }, {
      key: 'setupDatesInformation',
      value: function setupDatesInformation() {
        this.date = {
          days: _Utils.toArray($.Param.monthDays),
          months: _Utils.toArray($.Param.monthNames),
          monthsAbv: _Utils.toArray($.Param.monthNameAbvs),
          weeks: _Utils.toArray($.Param.weekNames),
          weeksAbv: _Utils.toArray($.Param.weekNameAbvs)
        };
      }
    }, {
      key: 'createClock',
      value: function createClock() {
        this._winTimeHUD = new Window_TimeHUD(); //eslint-disable-line
        SceneManager._scene.addChild(this._winTimeHUD);
      }
    }, {
      key: 'hideClock',
      value: function hideClock(option) {
        if (SceneManager._scene.constructor === Scene_Map && this._wintTimeHUD) {
          if (option.toLowerCase() === 'hide') {
            this._winTimeHUD.close();
            this.clockVisible = true;
          } else if (option === 'show') {
            this._winTimeHUD.open();
            this.clockVisible = false;
          }
        }
      }
    }, {
      key: 'pauseTime',


      /**
       * @function
       * @name pauseTime
       * @desc Set the times pause condition.
       */
      value: function pauseTime(bool) {
        this._pauseTime = bool;
      }
    }, {
      key: 'isPaused',
      value: function isPaused() {
        return this._pauseTime;
      }
    }, {
      key: 'currentTime',
      value: function currentTime() {
        return this.time;
      }
    }, {
      key: 'cloneCurrentTime',
      value: function cloneCurrentTime() {
        return Object.assign({}, JSON.parse(JSON.stringify(this.time)));
      }

      /**
       * @function
       * @name currentDate
       * @desc Returns the current date and time. All full details of each
       * date.
       */

    }, {
      key: 'currentDate',
      value: function currentDate() {
        var date = {
          month: this.currentMonth(),
          week: this.currentWeek(),
          day: this.time.day,
          year: this.time.year,
          time: this.currentTime()
        };
        return date;
      }

      /**
       * @function
       * @name currentWeek
       * @desc Returns the current weeks full details. Full and short name as well
       * as the current day number.
       */

    }, {
      key: 'currentWeek',
      value: function currentWeek() {
        var week = {};
        week.name = this.date.weeks[this.time.week - 1];
        week.nameAbv = this.date.weeksAbv[this.time.week - 1];
        week.number = this.date.weeks.indexOf(week.name) + 1;
        return week;
      }

      /**
       * @function
       * @name currentMonth
       * @desc Returns the current months full details. The month number,
       * the month full and abreivated name and amount of days in the month.
       */

    }, {
      key: 'currentMonth',
      value: function currentMonth() {
        var month = {};
        month.name = this.date.months[this.time.month - 1];
        month.nameAbv = this.date.monthsAbv[this.time.month - 1];
        month.number = this.date.months.indexOf(month.name) + 1;
        month.days = parseInt(this.date.days[month.number - 1], 10);
        return month;
      }

      /**
       * @function
       * @name currentMax
       * @desc Returns the max time for each type. hour = 24, month = 31..etc
       */

    }, {
      key: 'currentMaxTime',
      value: function currentMaxTime() {
        var max = {
          month: this.date.months.length,
          week: this.date.weeks.length,
          day: this.currentMonth().days,
          hour: $.Param.hoursInDay,
          minute: $.Param.minutesInHour,
          second: $.Param.secondsInMin
        };

        return max;
      }
    }, {
      key: 'minutesInYear',
      value: function minutesInYear() {
        var months = this.date.months;
        var totalMonths = months.length;
        var totalMins = 0;
        for (var i = 0; i < totalMonths; i++) {
          totalMins += this.minutesInMonth(months[i]);
        }
        return totalMins;
      }
    }, {
      key: 'minutesInMonth',
      value: function minutesInMonth(month) {
        var index = this.date.months.indexOf(month);
        return this.minutesInDay() * this.date.days[index];
      }
    }, {
      key: 'minutesInDay',
      value: function minutesInDay() {
        return $.Param.hoursInDay * $.Param.minutesInHour;
      }
    }, {
      key: 'setSpeed',
      value: function setSpeed(speed) {
        this.time.speed = speed;
      }
    }, {
      key: 'setTime',
      value: function setTime(hour, minute, varInput) {
        if (varInput) {
          this.time.hour = $gameVariables.value(hour);
          this.time.minute = $gameVariables.value(minute);
        } else {
          this.time.hour = hour;
          this.time.minute = minute;
        }
        this.updateTimersOnChange();
      }
    }, {
      key: 'addTime',
      value: function addTime(type) {
        var timeMethods = {
          year: this.addYear.bind(this),
          month: this.addMonth.bind(this),
          week: this.addWeek.bind(this),
          day: this.addDay.bind(this),
          hour: this.addHour.bind(this),
          minute: this.addMinute.bind(this)
        };
        return timeMethods[type]();
      }
    }, {
      key: 'addTimeCommand',
      value: function addTimeCommand(amount, type) {
        var skipTimer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        /* Type should never contain an s, so remove them */
        type = type.split('').filter(function (char) {
          return char !== 's';
        }).join('');
        var max = this.currentMaxTime();
        for (var i = 0; i < amount; i++) {
          if (type === 'week') {
            for (var _i = 0, len = amount * max.week; _i < len; _i++) {
              this.addTime('day');
            }
            return;
          }
          /* Manually add hour because addHour() method does not add an hour unless conditions are  met. They will never be met when adding time */
          if (type === 'hour') {
            this.time.hour++;
          }
          this.addTime(type);
        }
        if (!skipTimer) {
          this.updateTimersOnChange();
        }
        // this.updateTimeOnChange(type, amount)
      }
    }, {
      key: 'removeTimeCommand',
      value: function removeTimeCommand(amount, type) {
        var skipTimer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (type !== 'undefined') {
          if (type.slice(-1) === 's') {
            type = type.slice(0, -1);
          }
          this.time[type] -= amount;
          if (!skipTimer) {
            this.updateTimersOnChange();
          }
        }
      }
    }, {
      key: 'setDate',
      value: function setDate(day, week, month, year, varInput) {
        if (varInput) {
          var weekVar = week !== 'x' ? $gameVariables.value(week) : this.time.week;

          var monthVar = month !== 'x' ? $gameVariables.value(month) : this.time.month;
          /* Set day */
          this.time.day = $gameVariables.value(day);
          /* Set week */
          this.time.week = !isNaN(weekVar) ? weekVar : this.date.weeks.indexOf(weekVar) + 1;
          /* Set month */
          this.time.month = !isNaN(monthVar) ? monthVar : this.date.weeks.indexOf(monthVar) + 1;
          /* Set year */
          this.time.year = $gameVariables.value(year);
        } else {
          this.time.day = day;
          this.time.week = !isNaN(week) ? week : this.date.weeks.indexOf(week) + 1;
          this.time.month = !isNaN(month) ? month : this.date.months.indexOf(month) + 1;
          this.time.year = year;
        }
        this.updateTimersOnChange();
      }
    }, {
      key: 'clearActiveVariables',
      value: function clearActiveVariables() {
        this._activeVars.length = 0;
      }

      /**
       * @function
       * @name updateActiveVariables
       * @desc Updates the active variables, always shwoing the current time.
       */

    }, {
      key: 'updateActiveVariables',
      value: function updateActiveVariables() {
        if (this._activeVars.length < 0) {
          return;
        }
        var time = this.time;
        var times = [time.hour, time.minute, time.day, this.currentWeek().name, this.currentMonth().name, time.year];
        this._activeVars.forEach(function (variable, index) {
          if (!isNaN(variable) || variable !== 'x') {
            $gameVariables.setValue(variable, times[index]);
          }
        });
      }

      /**
       * @function
       * @name setStaticVariables
       * @desc Add's the current time into in-game variables. They will not update!
       */

    }, {
      key: 'setStaticVariables',
      value: function setStaticVariables(hour, minute, day, week, month, year) {
        var time = this.time;
        var times = [time.hour, time.minute, time.day, this.currentWeek().name, this.currentMonth().name, time.year];
        var variables = [Number(hour), Number(minute), Number(day), Number(week), Number(month), Number(year)];
        variables.forEach(function (variable, index) {
          if (!isNaN(variable) || variable !== 'x') {
            $gameVariables.setValue(variable, times[index]);
          }
        });
      }

      /**
       * @function
       * @method $.gameTime.activeVariables
       * @name activeVariables
       * @desc Returns the array of active variables
       */

    }, {
      key: 'activeVariables',
      value: function activeVariables() {
        return this._activeVars;
      }

      /**
       * @function
       * @method $.gameTime.newTimer
       * @name newTimer
       * @desc Creates a new timer object and pushes to _timer array.
       */

    }, {
      key: 'newTimer',
      value: function newTimer(start, stop, onStart, onComplete, options, destroy, reset, auto) {
        /* Create a new timer object */
        var timer = {

          /**
           * @property {object} start - the time the timer was started
           */
          start: start !== null ? start : this.currentTime(),

          /**
           * @property {object} stop - the intervals at which the timer should stop.
           */
          stop: stop,

          /**
           * @property {object} timeDefault - the default time set for the timer to stop.
           * @readonly
           */
          timeDefault: _Utils.clone(stop) || _Utils.clone(this.time),

          /**
           * @property {function} onComplete - the callback function to be called when timer is complete.
           */
          onComplete: onComplete || null,

          /**
           * @property {boolean} isComplete - a flag variable to know if the timer has stopped and callback complete.
           * @readonly
           */
          isComplete: false,

          /**
           * @property {function} onStart - the callback function to be called when timer has started.
           */
          onStart: onStart || null,

          /**
           * @property {boolean} isStarted - a flag variable to know if the timer has started and callback complete.
           * @readonly
           */
          isStarted: false,

          /**
           * @property {any} options - Optional arguments to be passed to the callback functions.
           */
          options: options || null,

          /**
           * @property {boolean} isActive - a flag variable to know if the timer is currently active.
           */
          isActive: false,

          /**
           * @property {boolean} destroy - set to auto destroy when timer is complete, else it will remain alive.
           */
          destroy: destroy === null ? true : destroy,

          /**
           * @property {boolean} reset - set to true for auto reset when timer is complete, if false
           *  all data will remain at it's completed state.
           */
          reset: reset === null ? true : reset,

          /**
           * @property {number} index - The index value in the main _array. Not set until after it's been added.
           */
          index: null,

          /**
           * @property {number} index - The index value in the main _array. Not set until after it's been added.
           */
          auto: auto || false

        };

        /* Push new timer to _timers array */
        this._timers.push(timer);

        timer.index = this._timers.length - 1;

        /* Return current timer object */
        return this._timers[timer.index];
      }

      /**
       * @function
       * @name timerStopped
       * @desc Checks if current time is greater than or equal to the timers stop time.
       */

    }, {
      key: 'timerStopped',
      value: function timerStopped(timer) {
        return timer.stop <= 0;
      }

      /**
       * @function
       * @name timerStarted
       * @desc Checks if timer is active or auto is set to true.
       */

    }, {
      key: 'timerStarted',
      value: function timerStarted(timer) {
        return timer.isActive || timer.auto;
      }

      /**
       *
       * @param {Object} timer
       */

    }, {
      key: 'isTimerActive',
      value: function isTimerActive(timer) {
        return timer.start !== null || timer.isStarted;
      }

      /**
       * @function
       * @name calculateElapsed
       * @desc Calculates the elapsed time and return the total minutes elapsed.
       * stop time should have already be converted to total minutes.
       */

    }, {
      key: 'calculateElapsed',
      value: function calculateElapsed(start, stop) {
        var startTotal = this.convertToMins(start);
        var stopTotal = this.convertToMins(stop);
        return stopTotal - startTotal;
      }

      /**
       * @function
       * @name addTotalMins
       * @desc Converts the time object of a timer into total minutes.
       */

    }, {
      key: 'convertToMins',
      value: function convertToMins(time, isTimer) {
        var _this = this;

        var totalMins = 0;
        var months = this.date.months;
        var startMonth = months.indexOf(this.time.month);
        var endMonth = months.indexOf(startMonth);
        var timeIn = {
          year: this.minutesInYear(),
          month: this.minutesInMonth(),
          day: this.minutesInDay(),
          hour: $.Param.minutesInHour
        };
        var multiply = function multiply(a, b) {
          return a * b;
        };

        var getTotalMinutes = function getTotalMinutes(prop, a, b) {
          return multiply(a[prop], b[prop] || 0);
        };

        var getTotalMonths = function getTotalMonths(start, end, action) {
          for (var i = start; i < months.length; i++) {
            return action(months[i] || null);
          }
        };

        Object.keys(time).forEach(function (prop) {
          if (time.hasOwnProperty(prop)) {
            switch (prop) {
              case 'month':
                getTotalMonths(startMonth, endMonth, function (month) {
                  if (isTimer && month !== null) {
                    totalMins += _this.minutesInMonth(month);
                  } else if (month !== null) {
                    totalMins += _this.minutesInMonth(months[time.month]);
                  }
                });
                break;
              case 'minute':
                totalMins += multiply(1, Number(time[prop]));
                break;

              default:
                getTotalMinutes(prop, timeIn, time);
                break;
            }
          }
        });
        return totalMins;
      }

      /**
       * @function
       * @name onTimerStart
       * @desc Destroys the timer from array after performing a calllback.
       */

    }, {
      key: 'onTimerStart',
      value: function onTimerStart(index, timer) {
        if (!timer.isStarted) {
          /* Set default time set to timer.stop */
          timer.timeDefault = _Utils.clone(timer.stop);

          /* Convert the stop time to total mins */
          var totalMins = this.convertToMins(timer.stop);
          timer.stop = totalMins;
          /* if callback is a function then proceed to call it */
          if (_Utils.isFunction(timer.onStart)) {
            timer.onStart(timer.options);
          } else if (!isNaN(timer.onStart)) {
            $gameTemp.reserveCommonEvent(timer.onStart);
          }

          /* set the timers isStarted flag to true */
          timer.isStarted = true;
        }
      }
      /**
       * @function
       * @name onTimerComplete
       * @desc Destroys the timer from array after performing a calllback.
       */

    }, {
      key: 'onTimerComplete',
      value: function onTimerComplete(timer) {
        if (!timer.isComplete) {
          /* if callback is a function then proceed to call it */
          if (_Utils.isFunction(timer.onComplete)) {
            timer.onComplete(timer.options);
          } else if (!isNaN(timer.onComplete)) {
            $gameTemp.reserveCommonEvent(timer.onComplete);
          }

          /* remove timer from array */
          if (timer.destory) {
            this.destroyTimer(timer);
            return;
          }

          /* resert timers properties */
          if (timer.reset) {
            this.resetTimer(timer);
            return;
          }

          /* set the timers isStarted flag to true, if reset and destory are false */
          timer.isActive = false;
          timer.isComplete = true;
        }
      }

      /**
       * @function
       * @name updateTimers
       * @desc Updates all timers in the _timer array if they're active.
       */

    }, {
      key: 'updateTimers',
      value: function updateTimers() {
        /* Get current timers */
        var timers = this._timers;
        var max = timers.length;

        for (var i = 0; i < max; i++) {
          var timer = timers[i];
          var index = i;

          /* if timer is active, run onStart callback function */
          if (this.timerStarted(timer)) {
            this.onTimerStart(index, timer);
            timer.stop--;

            /* if timer is complete run onTimerComplete to destory and callback */
            if (this.timerStopped(timer)) {
              this.onTimerComplete(timer);
            }
          }
        }
      }

      /**
       * @function
       * @name updateTimersOnChange
       * @desc Updates and completes the all missed timers when changing dates or time traveling.
       */

    }, {
      key: 'updateTimersOnChange',
      value: function updateTimersOnChange() {
        var _this2 = this;

        var timers = this._timers.filter(function (timer) {
          return _this2.isTimerActive(timer);
        });
        /* Loop through all timers */
        timers.forEach(function (timer) {
          if (!timer.isStarted) {
            return;
          }
          var timesMissed = 0;
          var elapsedTime = _this2.calculateElapsed(timer.start, _this2.time);
          var timerDefault = _this2.convertToMins(timer.timeDefault, true);
          timesMissed = Math.ceil(elapsedTime / timerDefault);
          for (var j = 0; j < timesMissed; j++) {
            _this2.onTimerComplete(timer);
          }
        });
      }

      /**
       * @function
       * @name getTimer
       * @desc Retrieves the timer object from _timer array by index value
       */

    }, {
      key: 'getTimer',
      value: function getTimer(timer) {
        var index = timer.index;
        return this._timers[index];
      }

      /**
       * @function
       * @name destoryTimer
       * @desc Removes the timer from the _timer array by index value
       */

    }, {
      key: 'destroyTimer',
      value: function destroyTimer(timer) {
        var index = timer.index;
        this._timers.splice(index, 1);
      }

      /**
       * @function
       * @name resetTimer
       * @desc Resets timers values and resets timers callback flags
       */

    }, {
      key: 'resetTimer',
      value: function resetTimer(timer, stop, start) {
        timer.isComplete = false;
        timer.isStarted = false;
        timer.isActive = false;
        timer.stop = stop || timer.timeDefault;
        /* Reset timers start */
        timer.start = start || _Utils.clone(this.currentTime());
      }
    }, {
      key: 'updateTimePause',
      value: function updateTimePause() {
        /* Pause time parameter is true and scene matches */
        if ($.Param.pauseInMenu && SceneManager._scene instanceof Scene_MenuBase) {
          this._pauseTime = true;
        } else if ($.Param.pauseInBattle && SceneManager._scene.constructor === Scene_Battle) {
          this._pauseTime = true;
        } else if ($.Param.pauseWhenMessage && $gameMessage.isBusy()) {
          this._pauseTime = true;
        } else {
          this._pauseTime = false;
        }
      }

      /**
       * @function
       * @name updateTime
       * @desc Updates the main time system. Seconds, minutes hours days etc will be calculated here.
       */

    }, {
      key: 'updateTime',
      value: function updateTime() {
        this.updateTimePause();
        /* Pause time if _pausedTime is true */
        if (this._pauseTime) {
          return;
        }

        /* Update active variables if the array contains any */
        if (this._activeVars.length) {
          this.updateActiveVariables();
        }

        /* Start time system by adding seconds */
        this.addSeconds();
      }
    }, {
      key: 'addSeconds',
      value: function addSeconds() {
        this.time.millisecond++;
        // Millsecond To Second
        if (this.time.millisecond >= this.time.speed) {
          this.time.second++;
          this.addMinute();
          this.time.millisecond = 0;
        }
      }
    }, {
      key: 'addMinute',
      value: function addMinute() {
        // Second To Minute
        if (this.time.second >= $.Param.secondsInMin) {
          this.time.minute++;
          this.addHour();
          this.time.second = 0;
          /* Update timers if the array contains any */
          if (this._timers.length) {
            this.updateTimers();
          }
        }
      }
    }, {
      key: 'addHour',
      value: function addHour() {
        // Minute To Hour
        if (this.time.minute >= $.Param.minutesInHour) {
          this.time.hour++;
          this.time.minute = 0;
        }
        /* If Maxed hours, reset */
        if (this.time.hour > $.Param.hoursInDay) {
          this.time.hour = 1;
          this.time.minute = 0;
          this.addDay();
        }
      }
    }, {
      key: 'addDay',
      value: function addDay() {
        // If last day of month, add month else add day
        if (this.time.day === this.currentMonth().days) {
          this.addMonth();
          this.time.day = 1;
        } else {
          this.time.day++;
        }
        this.addWeek();
      }
    }, {
      key: 'addWeek',
      value: function addWeek() {
        if (this.time.week >= this.date.weeks.length) {
          this.time.week = 1;
        } else {
          this.time.week++;
        }
      }
    }, {
      key: 'addMonth',
      value: function addMonth() {
        if (this.currentMonth().number === this.date.months.length) {
          this.addYear();
          this.time.month = 1;
        } else {
          this.time.month++;
        }
      }
    }, {
      key: 'addYear',
      value: function addYear() {
        this.time.year++;
      }
    }, {
      key: 'clockVisible',
      set: function set(value) {
        this._clockHide = value;
      }
    }]);

    return Game_Time;
  }();

  /** ----------------------------------------------------
   * Window_Base >>
   * Extra escape charcters for displaying time and date in messages.
   ------------------------------------------------------- */


  $.Alias.Window_Base_convertEscapeCharacter = Window_Base.prototype.convertEscapeCharacters;

  Window_Base.prototype.convertEscapeCharacters = function (text) {
    text = $.Alias.Window_Base_convertEscapeCharacter.call(this, text);

    text = text.replace(/\ATIME/g, function () {
      // eslint-disable-line no-useless-escape
      return String(_Utils.toArmyTime(0, 0, $.gameTime.time));
    });

    text = text.replace(/\STIME/g, function () {
      return String(_Utils.toTimeFormat(0, 0, $.gameTime.time));
    });

    text = text.replace(/\FDATE/g, function () {
      // eslint-disable-line no-useless-escape
      var date = $.gameTime.currentDate();
      var week = String(date.week.name);
      var month = String(date.month.name);
      var day = $.gameTime.time.day;
      var fdate = ' ' + week + ', ' + month + ' ' + day;
      return fdate;
    });

    text = text.replace(/\SDATE/g, function () {
      var date = $.gameTime.currentDate();
      var week = String(date.week.nameAbv);
      var month = String(date.month.nameAbv);
      var day = $.gameTime.time.day;
      var sdate = ' ' + week + ', ' + month + ' ' + day;

      return sdate;
    });

    return text;
  };
  /** ----------------------------------------------------
   * Window_TimeHUD >>
   *
   * Main time window shown on Scene_Map
   * Display hh:mm:ss or army time HH:MM
   *
   ------------------------------------------------------- */

  var Window_TimeHUD = function (_Window_Base) {
    _inherits(Window_TimeHUD, _Window_Base);

    function Window_TimeHUD() {
      _classCallCheck(this, Window_TimeHUD);

      var _this3 = _possibleConstructorReturn(this, (Window_TimeHUD.__proto__ || Object.getPrototypeOf(Window_TimeHUD)).call(this));

      _this3.initialize();
      return _this3;
    }

    _createClass(Window_TimeHUD, [{
      key: 'initialize',
      value: function initialize() {
        this._info = this.currentSceneInfo();
        this._format = this._info.format ? this._info.format : 'compact';
        var w = this.windowWidth();
        var h = this.windowHeight();
        Window_Base.prototype.initialize.call(this, 0, 0, w, h);

        this.padding = 5;
        // Assign x & y position after base call.
        this.x = this.windowX();
        this.y = this.windowY();
        // Assign Global Time to local time vars.
        this._time = $.gameTime.currentTime();
        this.opacity = this.windowOpacity();
        this.visible = $.gameTime._clockHide === false;
        this.refresh();
      }
    }, {
      key: 'update',
      value: function update() {
        Window_Base.prototype.update.call(this);
        this.toggleButton();
        this.refresh();
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.contents.clear();

        if (this._format === 'full' || this._format === 'compact') {
          this.contents.fontSize = this._info.font;
          this.drawTime(this._time, 0, 35);
          this.drawDate(0, 0);
        }

        if (this._format === 'simple') {
          this.contents.fontSize = this._info.font;
          this.drawTime(this._time, 0, 0);
        }
      }
    }, {
      key: 'drawDate',
      value: function drawDate(x, y) {
        var date = $.gameTime.currentDate();
        var year = $.Param.hideYear ? '' : ', ' + date.year;
        var month = this._format !== 'compact' ? date.month.name : date.month.nameAbv;
        var week = this._format !== 'compact' ? date.week.name : date.week.nameAbv;
        var day = date.day;
        var yearSuffix = ' ' + $.Param.yearSuffix;
        if (this._format === 'compact') {
          this.drawText(week + ' ' + month + ' ' + day + year, x, y, this.width, 'center');
        } else {
          this.drawText(week + ', ' + month + ' ' + day + year + yearSuffix, x, y, this.width, 'center');
        }
      }
    }, {
      key: 'drawTime',
      value: function drawTime(time, x, y) {
        var text = $.Param.twentyFourHour ? _Utils.toArmyTime(0, 0, time) : _Utils.toTimeFormat(0, 0, time);
        this.drawText(text, x, y, this.width, 'center');
      }
    }, {
      key: 'toggleButton',
      value: function toggleButton() {
        if (SceneManager._scene.constructor === Scene_Map && $.gameTime._clockHide === false) {
          if (Input.isTriggered($.Param.toggleButton) && !this.visible) {
            this.open();
          } else if (Input.isTriggered($.Param.toggleButton) && this.visible) {
            this.close();
          }
        }
      }

      /**
       * Returns current scene window information and sets opacity
       */

    }, {
      key: 'currentSceneInfo',
      value: function currentSceneInfo() {
        switch (SceneManager._scene.constructor) {
          case Scene_Map:
            return $.Param.mapDetails;
          case Scene_Menu:
            return $.Param.menuDetails;
          case Scene_Battle:
            return $.Param.battleDetails;
          default:
            return $.Param.mapDetails;
        }
      }
    }, {
      key: 'windowX',
      value: function windowX() {
        return this._info.x === 'right' ? Graphics.width - this.width : this._info.x === 'left' ? 0 : this._info.x ? Number(this._info.x) : 0;
      }
    }, {
      key: 'windowY',
      value: function windowY() {
        return this._info.y === 'bottom' ? Graphics.height - this.height : this._info.y === 'top' ? 0 : this._info.y ? Number(this._info.y) : 0;
      }
    }, {
      key: 'windowWidth',
      value: function windowWidth() {
        return this._info.width ? Number(this._info.width) : this._format === 'simple' ? 100 : 280;
      }
    }, {
      key: 'windowHeight',
      value: function windowHeight() {
        return this._info.height ? Number(this._info.height) : this._format === 'simple' ? 50 : 80;
      }
    }, {
      key: 'windowOpacity',
      value: function windowOpacity() {
        return Number(this._info.opacity);
      }
    }, {
      key: 'standardPadding',
      value: function standardPadding() {
        return 5;
      }
    }, {
      key: 'close',
      value: function close() {
        this.visible = false;
      }
    }, {
      key: 'open',
      value: function open() {
        this.visible = true;
      }
    }]);

    return Window_TimeHUD;
  }(Window_Base);
  /** ----------------------------------------------------
   * Plugin Commands >>
   *
   * Contain time engine plugin commands.
   * WHAT A MESS!!
   ------------------------------------------------------- */


  $.Alias.GameInterp_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    /* eslint-disable complexity */
    var hour = 0;
    var minute = 0;
    var day = 0;
    var week = 0;
    var month = 0;
    var year = 0;
    var speed = 1;
    var secondInMin = 60;
    var pause = false;
    /* Timer Variables */
    var start = $.gameTime.time;
    var stop = {};
    var onStart = null;
    var onComplete = null;
    var destroy = null;
    var reset = null;
    if (command === 'TE') {
      var time = $.gameTime.currentTime();
      switch (args[0].toLowerCase()) {
        /**
         * @keyword
         * @name settime
         * @desc Changes the current time to time set here.
         */
        case 'settime':
          hour = args[1] !== 'x' ? Number(args[1]) : time.hour;
          minute = args[2] !== 'x' ? Number(args[2]) : time.minute;
          day = args[3] !== 'x' ? Number(args[3]) : time.day;
          week = args[4] !== 'x' ? args[4] : time.week;
          month = args[5] !== 'x' ? args[5] : time.month;
          year = args[6] !== 'x' ? Number(args[6]) : time.year;
          $.gameTime.setTime(hour, minute);
          if (args.length > 3) {
            $.gameTime.setDate(day, week, month, year);
          }
          break;

        /**
         * @keyword
         * @name varsettime
         * @desc Allows to change time using in-game variables
         */
        case 'varsettime':
          hour = args[1] !== 'x' ? Number(args[1]) : time.hour;
          minute = args[2] !== 'x' ? Number(args[2]) : time.minute;
          day = args[3] !== 'x' ? Number(args[3]) : time.day;
          week = args[4];
          month = args[5];
          year = args[6] !== 'x' ? Number(args[6]) : time.year;
          $.gameTime.setTime(hour, minute, true);
          if (args.length > 3) {
            $.gameTime.setDate(day, week, month, year, true);
          }
          break;

        case 'add':
          $.gameTime.addTimeCommand(Number(args[1]), args[2], args[3]);
          break;

        case 'remove':
          $.gameTime.removeTimeCommand(Number(args[1]), args[2], args[3]);
          break;

        /**
         * @keyword
         * @name setspeed
         * @desc Set the current time speed to a custom value.
         */
        case 'setspeed':
          speed = args[1] ? Number(args[1]) : time.speed;
          secondInMin = args[2] ? Number(args[2]) : time.second;
          $.gameTime.setSpeed(speed, secondInMin);
          break;

        /**
         * @keyword
         * @name pause
         * @desc Pause the current game time, by calling pauseTime method.
         */
        case 'pause':
          pause = args[1] ? _Utils.toBool(args[1]) : false;
          $.gameTime.pauseTime(pause);
          break;

        /**
         * @keyword
         * @name variables
         * @desc Set in game variables to current time.
         * TE variables hour minute day week month year
         */
        case 'variables':
          // Set variables to make a timstamp of current time.
          if (args[1].toLowerCase() === 'static') {
            $.gameTime.setStaticVariables(args[2], args[3], args[4], args[5], args[6], args[7]);

            // Set active variables which always update
          } else if (args[1].toLowerCase() === 'active') {
            var varArgs = [args[2], args[3], args[4], args[5], args[6], args[7]];
            var argsMax = varArgs.length;
            for (var i = 0; i < argsMax; i++) {
              $.gameTime._activeVars.push(varArgs[i]);
            }
            // Clear active variables from updating.
          } else if (args[1].toLowerCase() === 'clear') {
            $.gameTime.clearActiveVariables();
          }

          break;
        /**
         * @keyword
         * @name clock
         * @desc hide the clock from view.
         */
        case 'clock':
          $.gameTime.hideClock(args[1]);
          break;

        /**
         * @keyword
         * @name timer
         * @desc Add a new timer to be used in game.
         */
        /* TE Timer start, stop, onStart, onComplete, options, destroy, reset */
        case 'timer':
          stop.year = Number(args[1]);
          stop.month = Number(args[2]);
          stop.day = Number(args[3]);
          stop.hour = Number(args[4]);
          stop.minute = Number(args[5]);
          onStart = Number(args[6]) || null;
          onComplete = Number(args[7]) || null;
          destroy = _Utils.toBool(args[8]);
          reset = _Utils.toBool(args[9]);
          $.gameTime.newTimer(_Utils.clone(start), stop, onStart, onComplete, null, destroy, reset, true);
          break;

        default:
          $.Alias.GameInterp_pluginCommand.call(this, command, args);
      }
    } else {
      $.Alias.GameInterp_pluginCommand.call(this, command, args);
    }
  };

  /** -----------------------------------------------------------------------
   * Save And Load Core Signals >>
   ------------------------------------------------------------------------ */
  LTN.CoreSignals.add('new-game', function () {
    $.gameTime = new Game_Time();
  });

  LTN.CoreSignals.add('game-save', function (contents) {
    $.SaveData = {
      gameTime: {
        _clockHide: $.gameTime._clockHide,
        time: $.gameTime.time,
        _timers: $.gameTime._timers,
        _activeVars: $.gameTime._activeVars
      }
    };
  });

  /** ----------------------------------------------------
   * EXPORT FOR ADD-ONS>>
   ------------------------------------------------------- */
  $.Game_Time = Game_Time;
  $.Window_Clock = Window_TimeHUD;
})(LTN.PluginRegistrar.requirePlugin(false, 'TimeEngine'));
/** ----------------------------------------------------
 * END OF PLUGIN, TRUE STORY!>>
 ------------------------------------------------------- */