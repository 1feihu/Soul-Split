// =============================================================================
// LTN_QuestJournal.js
// =============================================================================
// Version 1.2.0
/*~struct~ExtraCommandNames:
  @param moreInfo
  @text More Info Command
  @default More Info
  @desc The name to use for the more info command.

  @param setActive
  @text Set Active Command
  @default Set Active
  @desc The name to use for the set active quest command

  @param cancel
  @text More Info Command
  @default Back
  @desc The name to use for the more cancel/back command.
*/
/*~struct~CommandNames:
  @param all
  @text All Command Name
  @default All
  @desc The name to use for the all quests command.

  @param started
  @text Started Command Name
  @default Started
  @desc The name to use for the started quests command.

  @param complete
  @text Complete Command Name
  @default Complete
  @desc The name to use for the completeed quests command.

  @param failed
  @text Failed Command Name
  @default Failed
  @desc The name to use for the failed quests command.

  @param cancel
  @text Cancel Command Name
  @default Cancel
  @desc The name to use for the cancel command.
*/
/*~struct~CommandIcons:
  @param all
  @text All Command Icon
  @type number
  @default 0
  @desc The icon to use for the all command.

  @param started
  @text Started Command Icon
  @type number
  @default 0
  @desc The icon to use for the started command.

  @param complete
  @text Complete Command Icon
  @type number
  @default 0
  @desc The icon to use for the complete command.

  @param failed
  @text Failed Command Icon
  @type number
  @default 0
  @desc The icon to use for the failed command.

  @param cancel
  @text Cancel Command Icon
  @type number
  @default 0
  @desc The icon to use for the cancel command.
*/
/*~struct~ColorStates:
  @param active
  @text Active Color
  @type number
  @default 16
  @desc The color of the quests font when the quest is active.

  @param started
  @text Started Color
  @type number
  @default 0
  @desc The color of the quests font when the quest has started.

  @param complete
  @text Complete Color
  @type number
  @default 3
  @desc The color of the quests font when the quest has been complete.

  @param failed
  @text Failed Color
  @type number
  @default 18
  @desc The color of the quests font when the quest has failed.
*/
/*~struct~ElementSettings:
  @param titleText
  @text Title Text
  @default Title Here
  @desc The text of the the title element.

  @param titleSize
  @text Title Font Size
  @type number
  @default 28
  @desc The font size of the title text element.

  @param titleColor
  @text Title Font Color
  @type number
  @default 14
  @desc The color of the title text element.

  @param descSize
  @text Description Font Size
  @type number
  @default 16
  @desc The font size of the description contents, associated with the title element.

  @param descColor
  @text Description Font Color
  @type number
  @default 0
  @desc The font color of the description contents.

  @param align
  @text Text Alignement
  @default left
  @desc The alignment of the title text element.

  @param disable
  @text Disable Block Element
  @default false
  @desc This will hide the entire block element.
*/
/*:
 @plugindesc v 1.2.0 A quest journal, highly customizable and easy to use.
<LTN_QuestJournal>
@author LTN Games (https://ltngames.net)

@param  General

@param Quest State Colors
@parent General
@type struct<ColorStates>
@desc The color the quest name font should change to when status has changed.
@default {"active":"16","started":"0","complete":"3","failed":"18"}

@param Objective State Colors
@parent General
@type struct<ColorStates>
@desc The color the objective name font should change to when status has changed.
@default {"active":"16","started":"0","complete":"3","failed":"18"}

@param Reward Icons
@parent General
@type note
@desc The icon you want to use when you have a 'gold' or 'exp' reward.
@default "gold: 208\nexp: 126"

@param Auto Complete Quests
@parent General
@type boolean
@desc Choose to auto complete quests when a quests last objective completes.
@default true

@param Main Menu Command
@parent General
@type note
@desc The name of the Journal command in main menu and it's visibility.
@default "name: Journal\nvisible: true"

@param Journal Command Options

@param Commands Type
@parent Journal Command Options
@type select
@desc Choose to use text, icons or both text and icons for the quest commands.
@option Text Only
@value text
@option Icons Only
@value icon
@option Icons & Text
@value both
@default text

@param Command Icons
@parent Journal Command Options
@type struct<CommandIcons>
@desc The icons you want to use for each quest command.
@default "all: 229\ncomplete: 233\nfailed: 231\nstarted: 232\ncancel: 74"

@param Command Names
@parent Journal Command Options
@type struct<CommandNames>
@desc The icons you want to use for each quest command.
@default "started: Active\ncomplete: Complete\nfailed: Failed\nall: All\ncancel: Back"

@param Command Font Size
@parent Journal Command Options
@type number
@desc The font size for each command.
@default 18

@param Command Columns
@parent Journal Command Options
@type number
@desc How many commands to appear per row.
@default 1

@param Command Rows
@parent Journal Command Options
@type number
@desc How many commands to appear per column.
@default 1

@param  Quest Scene Options

@param Background Image
@parent Quest Scene Options
@type file
@dir img/
@desc Use a background image instead of default

@param All Windows Opacity
@parent Quest Scene Options
@type number
@max 255
@min 0
@desc Change opacity of all windows in Journal scene.
@default 255

@param Use Categories
@parent Quest Scene Options
@desc Disable or enable categories.
@default true

@param Auto Select Active Quest
@parent Quest Scene Options
@desc Will auto select active quest, by expanding category it's contained in and selecting it.
@default true

@param Category Color
@parent Quest Scene Options
@type number
@desc What color should the category title text be?
@default 14

@param More Options Names
@parent Quest Scene Options
@type struct<ExtraCommandNames>
@desc When selecting a quest a more options window will open. These are the command names.
@default "setActive: Set Active\nmoreInfo: More Info\ncancel: Back"

@param Objective Bullet Icon
@parent Quest Scene Options
@type number
@desc The icon that appears as a bullet for each objective
@default 87

@param Horizontal Line Color
@parent Quest Scene Options
@type number
@desc What color should the horizontal lines be?
@default 14

@param Title Settings
@parent Quest Scene Options
@type struct<ElementSettings>
@desc The quest title block contains the quest title.
@default {"titleText":"Location","titleSize":"28","titleColor":"14","descSize":"16","descColor":"0","align":"left","disable":"false"}

@param Location Settings
@parent Quest Scene Options
@type struct<ElementSettings>
@desc The location text block contains the quest location name.
@default {"titleText":"Location","titleSize":"22","titleColor":"14","descSize":"22","descColor":"0","align":"left","disable":"false"}

@param Giver Name Settings
@parent Quest Scene Options
@type struct<ElementSettings>
@desc The quest giver name block contains the quest's giver name.
@default {"titleText":"Giver","titleSize":"22","titleColor":"14","descSize":"22","descColor":"0","align":"left","disable":"false"}

@param Description Settings
@parent Quest Scene Options
@type struct<ElementSettings>
@desc The description block contains the quest description
@default {"titleText":"Description","titleSize":"28","titleColor":"14","descSize":"16","descColor":"0","align":"left","disable":"false"}

@param Objective Settings
@parent Quest Scene Options
@type struct<ElementSettings>
@desc The objectives block contains the quests objectives
@default {"titleText":"Objectives","titleSize":"28","titleColor":"14","descSize":"16","descColor":"0","align":"left","disable":"false"}

@param Reward Settings
@parent Quest Scene Options
@type struct<ElementSettings>
@desc The rewards block contains the quests rewards.
@default {"titleText":"Rewards","titleSize":"28","titleColor":"14","descSize":"16","descColor":"0","align":"left","disable":"true"}

@param Quest Track Options

@param Use Tracker
@parent Quest Track Options
@type boolean
@desc Turn the quest tracker on and off.
@default true

@param Background
@parent Quest Track Options
@type file
@dir /img
@desc The filename to background image (leave blank for no image)
@default

@param Window Options
@parent Quest Track Options
@type note
@desc Appearance options of the tracker window on map.
@default "x: 0\ny:0\nwidth: 330\nheight: 125\nopacity: 0"

@param Window Contents
@parent Quest Track Options
@type note
@desc Appearance options of the tracker window's contents. False will hide the element.
@default "title: true\nobjective: true\nobjectiveName: Objective\nicon: true"

@param Content Sizes
@parent Quest Track Options
@type note
@desc The font size of each content section
@default "title: 22\nobjective: 18\nbody: 14"

@help
================================================================================
▼ TERMS OF USE
================================================================================
Credit must be given to: LTN Games

Exclusive to https://ltngames.net, please don't share anywhere else unless given strict
permission by the author of the plugin.

The plugin may be used in  non-commerical products, for a commercial license
please visit http://ltngames.net.

Credit must be given!

Please report all bugs to http://ltngames.net/Support
===============================================================================
▼ DEPENDENCIES
===============================================================================
Requires LTN Core.
Requires LTN Quest Editor

===============================================================================
▼ INFORMATION
===============================================================================
This Quest Journal plugin gives you the ability to create, and track your quests.
You will have a new scene in the menu which will show you all the currently
unlocked and active quests.

You may also track a quest by using plugin commands or selecting a quest in the
Journal scene.

===============================================================================
▼ INSTRUCTIONS
===============================================================================
Simply place this file in your project's js/plugins folder
Start the quest editor and select a directory and start creating quests.

Be sure to setup all your quests in the quest editor, and take note of the Id
the quests you're creating has, this will help you use the plugin commands
more effectivly.

============================================================
PLUGIN COMMANDS:
============================================================
QUEST - Is the keyword for this plugin, it is used before
using any of the plugin commands.

--------------
QUEST Start questId

Start - Lets the plugin know you want to start a quest.
QuestId - The id of the quest you would like to start.

----------------
QUEST Advance QuestId Next/Prev

Advance - Let's the plugin know you want to advance the current
quest by 1 step.
QuestId - Same as above, this let's the plugin know the quest you
want to advance.
Next/Prev - You can choose either Next or Prev. Next will advance
the quest 1 step.
Prev will make the quest go back 1 step.

-------------
QUEST Fail QuestId

Fail - Let's the plugin know you want to fail a quest.
QuestId - The Id of the quest you want to fail.

------------
QUEST Complete QuestId

Complete - Let's the plugin know you want to complete the quest.
questId - The id of the quest you want to complete.

Completing a quest will make it inactive and mark the quuest as
complete in the Journal Scene.

-----------
QUEST Track QuestId

This allows you to see the current quests and it's current objective
while on the map, in it's own window.

Track - Let's the plugin know you want to track the quest.
QuestId - The Id of the quest you want to track.

------------
QUEST OpenQuestJournal

This plugin command will open the Quest Journal scene.

------------
QUEST HideTracker

This plugin command will hide the quest tracker window.

------------
QUEST ShowTracker

This plugin command will show the quest tracker window.

============================================================
SCRIPT CALLS:
============================================================
QUEST.isStepComplete(questId, step)
Will return true if the quests step is complete

QUEST.isStepActive(questId, step)
Will return true if the quests step is currently active.

QUEST.isQuestComplete(questId)
This will return true if the quest is complete.

QUEST.isQuestStarted(questId)
This will return true if the quest has started. this will also
return true if the quest is complete as well.

QUEST.getQuests(type)
This is for the more advance user, it will retrieve an object of
all quests in the quest type.

'all' - Will retrieve all quests
'started' - Will retrieve all quest that have started.
'complete' - Will retrieve all quests that have been complete.
'failed' - Will retrieve all quest that have failed.

QUEST.startQuest(questId)
This is another way of starting a quests instead of using the
plugin command.

QUEST.failQuest(questId)
This is another way of failing a quests instead of using the
plugin command.

QUEST.completeQuest(questId)
This is another way of completing a quests instead of using the
plugin command.

QUEST.tracker.hide()
Hide the quest tracker window.

QUEST.tracker.show()
Show the quest tracker window.

QUEST.tracker.isVisible()
Checks if the quest tracker window is visible. Returns true if it visible.

 */
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
  LTN.PluginRegistrar.registerPlugin('QuestJournal', '1.2.0', 'LTNGames');
}

/**
 * @property {object} Quest - Script call global, for plugin user.
 */
var QUEST = null;

(function ($) {
  // Require Utility functions
  var _Utils = LTN.Utilities;

  $.Parameters = PluginManager.getPluginParameters('LTN_QuestJournal');
  $.Param = $.Param || {};

  $.Param.questStateColors = _Utils.toObj($.Parameters['Quest State Colors']);
  $.Param.stepStateColors = _Utils.toObj($.Parameters['Objective State Colors']);
  $.Param.rewardIcons = _Utils.toObj($.Parameters['Reward Icons']);
  $.Param.autoComplete = _Utils.toBool($.Parameters['Auto Complete Quests']);
  $.Param.mainMenu = _Utils.toObj($.Parameters['Main Menu Command']);

  $.Param.commandNames = _Utils.toObj($.Parameters['Command Names']);
  $.Param.commandIcons = _Utils.toObj($.Parameters['Command Icons']);
  $.Param.maxCols = Number($.Parameters['Command Columns']) || 4;
  $.Param.maxRows = Number($.Parameters['Command Rows']) || 1;
  $.Param.commandsType = $.Parameters['Commands Type'] || 'text';
  $.Param.commandFontSize = Number($.Parameters['Command Font Size']) || 28;
  $.Param.moreOptions = _Utils.toObj($.Parameters['More Options Names']);

  $.Param.sceneBg = $.Parameters['Background Image'];
  $.Param.sceneOpacity = Number($.Parameters['All Windows Opacity']);
  $.Param.useCategories = _Utils.toBool($.Parameters['Use Categories'] || true);
  $.Param.autoSelect = _Utils.toBool($.Parameters['Auto Select Active Quest'] || true);
  $.Param.categoryColor = Number($.Parameters['Category Color']);
  $.Param.objectiveIcon = Number($.Parameters['Objective Bullet Icon']);
  $.Param.titleSettings = _Utils.toObj($.Parameters['Title Settings']);
  $.Param.locationSettings = _Utils.toObj($.Parameters['Location Settings']);
  $.Param.giverNameSettings = _Utils.toObj($.Parameters['Giver Name Settings']);
  $.Param.descSettings = _Utils.toObj($.Parameters['Description Settings']);
  $.Param.stepSettings = _Utils.toObj($.Parameters['Objective Settings']);
  $.Param.rewardSettings = _Utils.toObj($.Parameters['Reward Settings']) || 29;

  $.Param.useTracker = _Utils.toBool($.Parameters['Use Tracker']);
  $.Param.trackerBg = $.Parameters['Background'];
  $.Param.trackerWinOptions = _Utils.toObj($.Parameters['Window Options']);
  $.Param.trackerWinContents = _Utils.toObj($.Parameters['Window Contents']);
  $.Param.trackerSizes = _Utils.toObj($.Parameters['Content Sizes']);
  $.Param.trackerNames = _Utils.toObj($.Parameters['Content Names']);

  /** -----------------------------------------------------------------------
  * Quest Managment Module >>
  *
  *
  ------------------------------------------------------------------------ */

  /**
   * Quest Managment Module (Singleton) Handles all quest JSON data and the quests game object.
   *
   * @class QuestManager
   */

  var QuestManager = function () {
    function QuestManager() {
      _classCallCheck(this, QuestManager);

      /**
       * @property {object} QuestsData - Will hold all Quest data retrieved from JSON when script is loaded.
       */
      this._data = {};

      /**
       * @property {array} Quests - [Game Object] Will contain all quests data and extra properties when new game has started.
       */
      this._quests = [];

      /**
       * @property {array} Active - The current active quest, used for tracking quest objectives.
       */
      this._active = null;
    }

    /**
     * This function loads the JSON contianing all quests
     *
     *
     * @memberOf QuestManager
     */


    _createClass(QuestManager, [{
      key: 'loadAllQuests',
      value: function loadAllQuests() {
        var path = 'data/quests';
        LTN.FileIO.loadJSON(path, this.setupAllQuests, this.onQuestLoadError, this);
      }

      /**
       * This function sets up quests from the JSON and into a new object with extra properties
       * to determine the quests current state.
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'setupAllQuests',
      value: function setupAllQuests(response) {
        var data = response;
        var dataMax = data.length;
        for (var i = 0; i < dataMax; i++) {
          var dataQuest = data[i];
          var quest = {};

          /**
           * @property {array} id - The quests unique id created from array length
           */
          quest.id = dataQuest.id;

          /**
           * @property {array} name - The quests name
           */
          quest.name = dataQuest.name;

          /**
           * @property {array} iconid - The quests icon id.
           */
          quest.iconid = dataQuest.iconid || 0;

          /**
           * @property {array} giverNAme - The quest givers name
           */

          quest.giverName = dataQuest.giverName || '';

          /**
           * @property {array} location - The location the quest was given
           */
          quest.location = dataQuest.location || '';

          /**
           * @property {array} description - The quests description.
           */
          quest.description = dataQuest.description;

          /**
           * @property {array} category - The quests category.
           */
          quest.category = dataQuest.category;

          /**
           * @property {array} steps - The quests steps or objective, an array of strings
           */
          quest.steps = dataQuest.steps || [];

          /**
           * @property {array} rewards - The quests rewards array of objects
           */
          quest.rewards = dataQuest.rewards || [];

          /**
           * @property {boolean} started - Flag to know if quest has failed
           */
          quest.started = false;

          /**
           * @property {boolean} Complete - Flag to know if quest has failed
           */
          quest.complete = false;

          /**
           * @property {boolean} failed - Flag to know if quest has failed
           */
          quest.failed = false;

          /**
           * @property {boolean} active - Flag to know if quest is active
           */
          quest.active = false;

          /**
           * @property {function} onActive - Callback when the quest has become Active.
           */
          quest.onActive = null;

          /**
           * @property {function} onFail - Callback when the quest has failed.
           */
          quest.onFail = null;

          /**
           * @property {function} onStart - Callback when the quest has started.
           */
          quest.onStart = dataQuest.onStart || null;

          /**
           * @property {function} onComplete - Callback when the quest has completed.
           */
          quest.onComplete = dataQuest.onComplete || null;

          quest.step = 0;
          /* Push current quest to global Quests array */
          if (this._quests[quest.id]) {
            continue;
          }
          this._quests[quest.id] = quest;
        }
      }

      /**
       * Retrieves all quests that have started, failed or completed.
       *
       * @param {String} type - The type of quests to retrieve. 'all', 'failed' etc
       * @returns {Array} - result - An array of all quests matching critera
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'getQuests',
      value: function getQuests(type) {
        var quests = this._quests;
        return quests.filter(function (quest) {
          return quest !== null;
        }).filter(function (quest) {
          return type === 'all' ? quest.started || quest.failed || quest.complete : quest[type] === true;
        });
      }

      /**
       * Retrieves the categories available by getting each category from Quests array.
       *
       * @returns {Array} - The array of categories
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'getCategories',
      value: function getCategories() {
        var quests = this._quests;
        return quests.filter(function (quest) {
          return quest !== null;
        }).map(function (quest) {
          return quest.category;
        }).filter(function (category, index, array) {
          return array.indexOf(category) === index;
        }, []);
      }

      /**
       * Returns the current step of the quest id given in the argument
       *
       * @param {any} questId - The quest id of the quest you want to retrieve it's step
       * @returns {Number}
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'getCurrentStep',
      value: function getCurrentStep(questId) {
        if (typeof this._quests[questId] !== 'undefined') {
          return this._quests[questId].step;
        }
      }

      /**
       * Returns the state of the quests step completion flag
       *
       * @param {any} questId - The quest id of the quest you want to check
       * @param {any} step - the step id of the step you want to check
       * @returns {Boolean}
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'isStepComplete',
      value: function isStepComplete(questId, step) {
        return this._quests[questId].steps[step - 1].complete;
      }

      /**
       * Determines if the quests step given is the current active step.
       *
       * @param {any} questId - The quest id of the quest you want to check
       * @param {any} step - the step id of the step you want to check
       * @returns {Boolean}
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'isStepActive',
      value: function isStepActive(questId, step) {
        var currentStep = this.getCurrentStep(questId);
        return currentStep === step;
      }

      /**
       * Determines if the quest given has started
       *
       * @param {any} questId
       * @returns {Boolean}
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'isQuestStarted',
      value: function isQuestStarted(questId) {
        if (this._quests[questId]) {
          return this._quests[questId].started;
        }
      }

      /**
       * Checks if the quest id is the current active quest
       * @param {Number} questId  - The quest id
       * @returns {Boolean}
       */

    }, {
      key: 'isActiveQuest',
      value: function isActiveQuest(questId) {
        if (!this.activeQuest()) {
          return false;
        }
        return questId === this.activeQuest().id;
      }

      /**
       * Determines if the quest given is complete
       *
       * @param {any} questId
       * @returns
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'isQuestComplete',
      value: function isQuestComplete(questId) {
        if (this._quests[questId]) {
          return this._quests[questId].complete;
        }
      }

      /**
       * Determines if the quest given has failed
       *
       * @param {any} questId
       * @returns
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'isQuestFailed',
      value: function isQuestFailed(questId) {
        if (this._quests[questId]) {
          return this._quests[questId].failed;
        }
      }

      /**
       * Returns the active quest. Used for quest tracker
       *
       * @returns {Number}
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'activeQuest',
      value: function activeQuest() {
        return this._active;
      }

      /**
       * Sets the quest given as the active quest
       *
       * @param {Object} quest - The quest object to set as active
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'setActiveQuest',
      value: function setActiveQuest(quest) {
        /* Set current active quest to false to ensure only one quest is ever active */
        if (this._active) {
          this._active.active = false;
        }
        /* Advance quest once if current step is 0 */
        if (quest.step === 0) {
          this.advanceQuest(quest.id, 'next');
        }
        this._active = quest;
        quest.active = true;
        /* If tracker window is available, we need to set it's active quest as well */
        if (typeof $._questTracker !== 'undefined') {
          $._questTracker.setActiveQuest(quest);
        }
      }

      /**
       * Starts the quest with the id given in the argument
       *
       * @param {Number} questId - the quest id of the quest you want to start
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'startQuest',
      value: function startQuest(questId) {
        if (!this.questExists(questId)) {
          throw new Error(`Quest does not exist! Are you sure ${questId} is the correct quest id?`);
        }
        /* Return, you can't start a quest which has completed or is already started */
        if (this.isQuestStarted(questId) || this.isQuestComplete(questId)) {
          return;
        }
        this.runOnStart(questId);
        this._quests[questId].started = true;
        /* Advance the quest if first step is not hidden */
        if (!this._quests[questId].steps[0].hidden) {
          this.advanceQuest(questId, 'next');
        }
      }

      /**
       * Advances a step or goes back a step
       *
       * @param {Number} questId - The quest's id you want to advance
       * @param {any} step - Number or String, 'next', 'prev', or step number
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'advanceQuest',
      value: function advanceQuest(questId, step) {
        var quest = this._quests[questId];
        var currentStepId = this.getCurrentStep(questId);
        var index = currentStepId;
        var currentStep = quest.steps[index];

        var maxSteps = quest.steps.length;
        var lastStep = quest.steps[maxSteps - 1];
        var previousStep = quest.steps[index - 1];

        /* If Previous step exists, complete it before proceeding */
        if (_Utils.isDefined(previousStep)) {
          previousStep.complete = true;
        }
        /* If auto complete is on, we need to complete the quest */
        if (this.isLastStep(questId, currentStepId) && $.Param.autoComplete) {
          lastStep.complete = true;
          this.completeQuest(questId);
          return;
          /* If auto complete is off then complete last step */
        } else if (quest.complete || this.isLastStep(questId, currentStepId)) {
          lastStep.complete = true;
          return;
        }
        /* If step argument is a number set quest step directly */
        if (!isNaN(step)) {
          quest.step = Number(step);
          currentStep.hidden = false;
          /* If step argument  is 'Next' or 'Prev' */
        } else if (typeof step === 'string') {
          switch (step.toLowerCase()) {
            case 'next':
              quest.step = currentStepId + 1;
              currentStep.hidden = false;
              break;

            case 'prev':
              quest.step = currentStepId - 1;
              break;

            default:
              throw new Error(`Unable to advance the quest, are you sure the step argument [${step}] is correct?`);
          }
        }
        if (typeof $._questTracker !== 'undefined') {
          $._questTracker.requestRefresh();
        }
      }
    }, {
      key: 'completeQuest',
      value: function completeQuest(questId) {
        if (!this.questExists(questId)) {
          throw new Error(`Quest does not exist! Are you sure [${questId}] is the correct quest id?`);
        }
        /* Return, you can't complete a quest which has failed or is already complete */
        if (this.isQuestFailed(questId) || this.isQuestComplete(questId)) {
          return;
        }
        this._quests[questId].started = false;
        this._quests[questId].complete = true;
        this._quests[questId].active = false;
        this.applyRewards(questId);
        this.runOnComplete(questId);
      }
    }, {
      key: 'failQuest',
      value: function failQuest(questId) {
        if (this.isQuestFailed(questId)) {
          return;
        }
        this.runOnFail(questId);
        this._quests[questId].failed = true;
      }
    }, {
      key: 'runOnComplete',
      value: function runOnComplete(questId) {
        var onComplete = this._quests[questId].onComplete;
        if (_Utils.isFunction(onComplete)) {
          onComplete();
        } else if (!isNaN(onComplete)) {
          $gameTemp.reserveCommonEvent(onComplete);
          $gameMap.requestRefresh();
        }
      }
    }, {
      key: 'runOnStart',
      value: function runOnStart(questId) {
        var onStart = this._quests[questId].onStart;
        if (_Utils.isFunction(onStart)) {
          onStart();
        } else if (!isNaN(onStart)) {
          $gameTemp.reserveCommonEvent(onStart);
          $gameMap.requestRefresh();
        }
      }
    }, {
      key: 'runOnFail',
      value: function runOnFail(questId) {
        var onFail = this._quests[questId].onFail;
        if (_Utils.isFunction(onFail)) {
          onFail();
        } else if (!isNaN(onFail)) {
          $gameTemp.reserveCommonEvent(onFail);
          $gameMap.requestRefresh();
        }
      }
    }, {
      key: 'applyRewards',
      value: function applyRewards(questId) {
        var rewards = this._quests[questId].rewards;
        var item = null;
        var max = rewards.length;
        for (var i = 0; i < max; i++) {
          var reward = rewards[i];
          var amount = Number(reward.amount);
          reward.hidden = false;
          switch (reward.type) {
            case 'item':
              item = $dataItems[reward.id];
              $gameParty.gainItem(item, amount);
              break;

            case 'armor':
              item = $dataArmors[reward.id];
              $gameParty.gainItem(item, amount);
              break;

            case 'weapon':
              item = $dataWeapons[reward.id];
              $gameParty.gainItem(item, amount);
              break;
            case 'gold':
              $gameParty.gainGold(amount);
              break;

            case 'exp':
              if (!reward.leaderOnly) {
                for (var actor in $gameParty.allMembers()) {
                  if ($gameParty.allMembers().hasOwnProperty(actor)) {
                    if (!$gameActors.actor(actor)) {
                      continue;
                    }
                    $gameActors.actor(actor).gainExp(amount);
                  }
                }
              } else {
                $gameParty.leader().gainExp(amount);
              }
              break;
            default:
              break;
          }
        }
      }
    }, {
      key: 'onQuestLoadError',
      value: function onQuestLoadError(err) {
        console.log('Error Loading Quest', err);
      }

      /**
       * Checks if the quest exists in this._quests main array.
       *
       * @param {any} questId - The quest id of the quest you would like to check.
       * @returns {Boolean} True if the quest does exist
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'questExists',
      value: function questExists(questId) {
        return typeof this._quests[questId] !== 'undefined';
      }

      /**
       * Checks if the step given is the last step in the quest
       *
       * @param {any} questId
       * @param {any} currentStep
       * @returns
       *
       * @memberOf QuestManager
       */

    }, {
      key: 'isLastStep',
      value: function isLastStep(questId, currentStep) {
        var quest = this._quests[questId];
        var maxSteps = quest.steps.length;
        return maxSteps === currentStep;
      }
    }, {
      key: 'startAllQuests',
      value: function startAllQuests() {
        var max = this._quests.length;
        for (var i = 1; i < max; i++) {
          var quest = this._quests[i];
          var steps = quest.steps;
          quest.started = true;
          for (var j = 0; j < steps.length; j++) {
            var step = steps[j];
            step.hidden = false;
          }
        }
      }
    }]);

    return QuestManager;
  }();

  /** -----------------------------------------------------------------------
  * Quest Tracker Window >>
  *
  *
  ------------------------------------------------------------------------ */

  /**
   * A window for displaying the current active quests objectives or steps
   *
   * @class Window_QuestTrack
   * @extends {Window_Base}
   */


  var Window_QuestTrack = function (_Window_Base) {
    _inherits(Window_QuestTrack, _Window_Base);

    function Window_QuestTrack(x, y) {
      _classCallCheck(this, Window_QuestTrack);

      var _this = _possibleConstructorReturn(this, (Window_QuestTrack.__proto__ || Object.getPrototypeOf(Window_QuestTrack)).call(this));

      var options = $.Param.trackerWinOptions;
      var width = options.width || 350;
      var height = options.height || 125;
      _get(Window_QuestTrack.prototype.__proto__ || Object.getPrototypeOf(Window_QuestTrack.prototype), 'initialize', _this).call(_this, x, y, width, height);
      /* Set Properties */
      _this._refreshRequested = false;
      _this._currentTime = window.performance.now();
      _this.activeQuest = QUEST.activeQuest() || null;
      _this.visible = _this.activeQuest !== null;
      _this.opacity = options.opacity;
      _this.createBackground();
      _this.requestRefresh();
      return _this;
    }

    _createClass(Window_QuestTrack, [{
      key: 'createBackground',
      value: function createBackground() {
        this._background = new Sprite();
        this._background.bitmap = ImageManager.loadPicture($.Param.trackerBg);
        this._background.x = this.x;
        this._background.y = this.y;
        this.addChildToBack(this._background);
      }
    }, {
      key: 'update',
      value: function update() {
        if (SceneManager.isScene(Scene_Map) && this.activeQuest && this.visible) {
          this.updateForVariable();
          _get(Window_QuestTrack.prototype.__proto__ || Object.getPrototypeOf(Window_QuestTrack.prototype), 'update', this).call(this);
          if (!this.activeQuest) {
            return;
          }
          if (this.activeQuest.complete) {
            this.visible = false;
          }
        }
      }
    }, {
      key: 'requestRefresh',
      value: function requestRefresh() {
        if (SceneManager.isScene(Scene_Map) && !this._refreshRequested) {
          this._refreshRequested = true;
          this.refresh();
        }
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        if (this.activeQuest === null) {
          this._refreshRequested = false;
          return;
        }
        if (this._refreshRequested) {
          this.contents.clear();
          this.drawTitle();
          this.drawSteps();
          this._refreshRequested = false;
        }
      }

      /**
       * Request a refresh every 2 seconds when objective contains a variable
       * to keep track of.
       *
       * @memberOf Window_QuestTrack
       */

    }, {
      key: 'updateForVariable',
      value: function updateForVariable() {
        var now = window.performance.now();
        var elapsed = now - this._currentTime;
        if (elapsed > 1000 && this.activeVariable() > 0) {
          this._currentTime = now;
          this.requestRefresh();
        }
      }
    }, {
      key: 'drawTitle',
      value: function drawTitle() {
        var fontSizes = $.Param.trackerSizes;
        var contentOptions = $.Param.trackerWinContents;
        var text = this.activeQuest.name;
        var icon = this.activeQuest.iconid;

        if (contentOptions.title === true) {
          this.drawIcon(icon, 0, 0);
          this.contents.fontSize = fontSizes.title;
          this.drawText(text, 0 + Window_Base._iconWidth, 0, this.width, 'left');
        }
      }
    }, {
      key: 'drawSteps',
      value: function drawSteps() {
        var options = { font: $.Param.trackerSizes, content: $.Param.trackerWinContents };
        var quest = this.activeQuest;
        var stepIcon = $.Param.objectiveIcon;
        var step = this.activeStep();
        var variable = $gameVariables.value(this.activeVariable());

        var amountToCollect = step.amountToCollect;
        var collectText = ` ${variable} / ${amountToCollect}`;
        var fullText = step.variable && variable <= amountToCollect ? step.desc + collectText : step.desc;
        var text = fullText;
        var x = 0;
        var y = options.content.title === true ? this.lineHeight() - 6 : 0;
        /**
         * Draw Step/Objective title
         */
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = options.font.objective;
        if (options.content.objective) {
          this.drawText(options.content.objectiveName, 0, y, this.width, 'left');
        }
        /**
         * Draw objective description
         */
        this.resetFontSettings();
        this.contents.fontSize = options.font.body;
        if (QUEST.isStepActive(quest.id, step.id) && QUEST.isActiveQuest(quest.id)) {
          x = Window_Base._iconWidth;
          y += this.lineHeight();
          if (options.content.icon) {
            this.drawIcon(stepIcon, 0, y);
          }
          this.drawTextAutoWrap(text, x, y);
        }
      }

      /* The Active quest which will show up in the window */

    }, {
      key: 'setActiveQuest',
      value: function setActiveQuest() {
        var options = $.Param.trackerWinOptions;
        this.activeQuest = QUEST.activeQuest();
        this.visible = true;
        this.opacity = options.opacity;
        this.requestRefresh();
      }
    }, {
      key: 'activeStep',
      value: function activeStep() {
        var currentStepId = QUEST.getCurrentStep(this.activeQuest.id);
        var index = currentStepId - 1;
        return this.activeQuest.steps[index];
      }
    }, {
      key: 'activeVariable',
      value: function activeVariable() {
        return this.activeStep().variable;
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.visible = this.visible === true;
      }
    }, {
      key: 'show',
      value: function show() {
        this.visible = true;
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.visible = false;
      }
    }, {
      key: 'isVisible',
      value: function isVisible() {
        return this.visible;
      }
      /* End Of Tracker Window CLass */

    }]);

    return Window_QuestTrack;
  }(Window_Base);

  /** -----------------------------------------------------------------------
  * Quest Commands Window >>
  *
  *
  ------------------------------------------------------------------------ */

  /**
   *  Window for displaying all the quest commands (failed, compelte, all)
   *
   * @class Window_QuestCommands
   * @extends {Window_Command}
   */


  var Window_QuestCommands = function (_Window_HorzCommand) {
    _inherits(Window_QuestCommands, _Window_HorzCommand);

    function Window_QuestCommands(x, y) {
      _classCallCheck(this, Window_QuestCommands);

      var _this2 = _possibleConstructorReturn(this, (Window_QuestCommands.__proto__ || Object.getPrototypeOf(Window_QuestCommands)).call(this));

      _this2.initialize(x, y);
      return _this2;
    }

    _createClass(Window_QuestCommands, [{
      key: 'initialize',
      value: function initialize(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _get(Window_QuestCommands.prototype.__proto__ || Object.getPrototypeOf(Window_QuestCommands.prototype), 'initialize', this).call(this, x, y, width, height);
      }
    }, {
      key: 'update',
      value: function update() {
        _get(Window_QuestCommands.prototype.__proto__ || Object.getPrototypeOf(Window_QuestCommands.prototype), 'update', this).call(this);
      }
    }, {
      key: 'addItemCommands',
      value: function addItemCommands() {
        var commandNames = $.Param.commandNames;
        var icons = $.Param.commandIcons;

        for (var command in commandNames) {
          if (commandNames.hasOwnProperty(command)) {
            var name = commandNames[command];
            var symbol = command;
            var icon = icons[command];
            /* Because im pulling command names from parameters, only add ones with letters in the name, otherwise presume it's empty and user don't want to add it as a command */
            if (/^[a-zA-Z]+$/.test(name)) {
              this.addCommand(icon, name, symbol, true);
            }
          }
        }
      }
    }, {
      key: 'drawCommand',
      value: function drawCommand(icon, text, rect) {
        var type = $.Param.commandsType;
        switch (type) {
          case 'icons':
            this.drawIcon(icon, rect.x, rect.y / 2);
            break;
          case 'both':
            this.drawIcon(icon, rect.x, rect.y);
            this.contents.fontSize = $.Param.commandFontSize;
            this.drawText(text, rect.x + Window_Base._iconWidth, rect.y);
            break;
          default:
            this.contents.fontSize = $.Param.commandFontSize;
            this.drawText(text, rect.x, rect.y / 2, 'center');
            break;
        }
      }
    }, {
      key: 'drawItem',
      value: function drawItem(index) {
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawCommand(this.commandIcon(index), this.commandName(index), rect);
      }
    }, {
      key: 'addCommand',
      value: function addCommand(icon, name, symbol, enabled, ext) {
        if (typeof enabled === 'undefined') {
          enabled = true;
        }
        if (typeof ext === 'undefined') {
          ext = null;
        }

        if (typeof icon === 'undefined') {
          icon = 0;
        }
        this._list.push({ icon: icon, name: name, symbol: symbol, enabled: enabled, ext: ext });
      }
    }, {
      key: 'setCategory',
      value: function setCategory(symbol) {
        if (this._categorySymbol === symbol) {
          return;
        }
        this._categorySymbol = symbol;
        this.refresh();
      }
    }, {
      key: 'commandIcon',
      value: function commandIcon(index) {
        return this._list[index].icon;
      }
    }, {
      key: 'windowWidth',
      value: function windowWidth() {
        return Graphics.width / 3;
      }
    }, {
      key: 'windowHeight',
      value: function windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
      }
    }, {
      key: 'numVisibleRows',
      value: function numVisibleRows() {
        return $.Param.maxRows;
      }
    }, {
      key: 'maxCols',
      value: function maxCols() {
        return $.Param.maxCols;
      }
    }, {
      key: 'makeCommandList',
      value: function makeCommandList() {
        this.addItemCommands();
      }
    }]);

    return Window_QuestCommands;
  }(Window_HorzCommand);
  /** -----------------------------------------------------------------------
  * Quest Log Window >>
  *
  *
  ------------------------------------------------------------------------ */
  /**
   * @class
   * @desc A window for displaying all quests and detailed information.
   */

  var Window_QuestLog = function (_Window_Selectable) {
    _inherits(Window_QuestLog, _Window_Selectable);

    function Window_QuestLog(cmd, infoWin, x, y) {
      _classCallCheck(this, Window_QuestLog);

      var _this3 = _possibleConstructorReturn(this, (Window_QuestLog.__proto__ || Object.getPrototypeOf(Window_QuestLog)).call(this));

      _this3.initialize(cmd, infoWin, x, y);
      return _this3;
    }

    _createClass(Window_QuestLog, [{
      key: 'initialize',
      value: function initialize(cmd, infoWin, x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _get(Window_QuestLog.prototype.__proto__ || Object.getPrototypeOf(Window_QuestLog.prototype), 'initialize', this).call(this, x, y, width, height);
        this._commandWindow = cmd;
        this._infoWindow = infoWin;
        this._refreshCategories = true;
        this._data = [];
        this._categories = QUEST.getCategories();
        this._quests = QUEST;
        this._category = 'none';
      }
    }, {
      key: 'update',
      value: function update() {
        _get(Window_QuestLog.prototype.__proto__ || Object.getPrototypeOf(Window_QuestLog.prototype), 'update', this).call(this);
        if (this._commandWindow) {
          this.setCategory(this._commandWindow.currentSymbol());
        }
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.contents.clear();
        if (this._refreshCategories) {
          this.makeItemList();
        }
        this.createContents();
        this.drawAllItems();
      }
    }, {
      key: 'drawItem',
      value: function drawItem(index) {
        var item = this._data[index];
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();

        if (_Utils.isDefined(item.expanded)) {
          this.drawCategory(item, rect.x, rect.y, rect.width);
        } else {
          this.drawQuest(item, rect.x, rect.y, rect.width);
        }
      }
    }, {
      key: 'drawCategory',
      value: function drawCategory(item, x, y, width) {
        var color = $.Param.categoryColor;
        var category = item.name;
        var text = `${category} (${item.amount})`;
        this.changeTextColor(this.textColor(color));
        this.drawText(text, x, y, width);
      }
    }, {
      key: 'drawQuest',
      value: function drawQuest(quest, x, y, width) {
        if (!quest) {
          return;
        }
        var text = quest.name;
        var icon = quest.iconid;
        this.resetTextColor();
        this.drawIcon(icon, x, y);
        this.changeQuestTextColor(quest);
        this.contents.fontSize = $.Param.commandFontSize;
        this.drawText(text, x + Window_Base._iconWidth + 2, y, width);
        this.contents.fontItalic = false;
      }
    }, {
      key: 'changeQuestTextColor',
      value: function changeQuestTextColor(quest) {
        var colors = $.Param.questStateColors;
        if (quest.complete) {
          this.changeTextColor(this.textColor(colors.complete));
        } else if (quest.failed) {
          this.changeTextColor(this.textColor(colors.failed));
        } else if (quest.active) {
          this.changeTextColor(this.textColor(colors.active));
        } else if (quest.started) {
          this.changeTextColor(this.textColor(colors.started));
        }
      }
    }, {
      key: 'makeItemList',
      value: function makeItemList() {
        var useCategories = $.Param.useCategories;
        var cateogry = this._commandWindow.currentSymbol();
        this._data = useCategories ? this.buildByCategory(cateogry) : this._quests.getQuests(cateogry);
      }
    }, {
      key: 'buildByCategory',
      value: function buildByCategory(questType) {
        var list = [];
        var questList = this._quests.getQuests(questType);
        var allCategories = this._categories;
        // Build Categories
        allCategories.filter(function (category) {
          return typeof category !== 'undefined';
        }).forEach(function (category) {
          var item = {
            name: category,
            expanded: false,
            amount: 0,
            quests: []
          };
          list.push(item);
        });
        /* Build Quests */
        questList.forEach(function (quest) {
          list.filter(function (category) {
            return category.name === quest.category;
          }).forEach(function (category) {
            category.amount++;
            category.quests.push(quest);
          });
        });
        return list;
      }
    }, {
      key: 'expandCategory',
      value: function expandCategory(name) {
        for (var i = 0; i < this._data.length; i++) {
          var category = this._data[i];
          var quests = category.quests;

          if (category.name === name && !category.expanded) {
            var index = i;
            category.expanded = true;

            for (var j = 0; j < quests.length; j++) {
              index++;
              this._data.splice(index, 0, quests[j]);
            }
          }
        }
        this.refresh();
        this.activate();
      }
    }, {
      key: 'collapseCategory',
      value: function collapseCategory(name) {
        for (var i = 0; i < this._data.length; i++) {
          var category = this._data[i];
          var quests = category.quests;

          if (!category.hasOwnProperty('expanded')) {
            continue;
          }

          if (category.name === name && category.expanded) {
            var index = i + 1;
            category.expanded = false;
            this._data.splice(index, quests.length);
          }
        }
        this.refresh();
        this.activate();
      }
    }, {
      key: 'item',
      value: function item() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
      }
    }, {
      key: 'maxItems',
      value: function maxItems() {
        return this._data ? this._data.length : 1;
      }
    }, {
      key: 'callUpdateHelp',
      value: function callUpdateHelp() {
        if (this.active && this._infoWindow) {
          this._infoWindow.setItem(this.item());
        }
      }
    }, {
      key: 'setCategory',
      value: function setCategory(symbol) {
        if (this._categorySymbol === symbol) {
          return;
        }
        this._categorySymbol = symbol;
        this.refresh();
      }
    }, {
      key: 'isEnabled',
      value: function isEnabled() {
        return this.item().started || _Utils.isDefined(this.item().expanded);
      }
    }, {
      key: 'isCurrentItemEnabled',
      value: function isCurrentItemEnabled() {
        return this.isEnabled(this.item());
      }
    }, {
      key: 'selectLast',
      value: function selectLast() {
        var index = this.index();
        this.select(index >= 0 ? index : 0);
      }
    }, {
      key: 'updateInfo',
      value: function updateInfo() {
        this.setHelpWindowItem(this.item());
      }
    }, {
      key: 'maxCols',
      value: function maxCols() {
        return 1;
      }
    }, {
      key: 'spacing',
      value: function spacing() {
        return 48;
      }
    }, {
      key: 'windowWidth',
      value: function windowWidth() {
        return Graphics.width / 3;
      }
    }, {
      key: 'updateWindowHeight',
      value: function updateWindowHeight() {
        this.height = this.windowHeight() - this._commandWindow.height;
      }
    }, {
      key: 'windowHeight',
      value: function windowHeight() {
        return Graphics.height;
      }
    }]);

    return Window_QuestLog;
  }(Window_Selectable);
  /** -----------------------------------------------------------------------
  * Quest Info Window >>
  *
  *
  ------------------------------------------------------------------------ */
  /**
   * @class
   * @desc A window for displaying all quests detailed information.
   */

  var Window_QuestInfo = function (_Window_Command) {
    _inherits(Window_QuestInfo, _Window_Command);

    function Window_QuestInfo(x, y) {
      _classCallCheck(this, Window_QuestInfo);

      var _this4 = _possibleConstructorReturn(this, (Window_QuestInfo.__proto__ || Object.getPrototypeOf(Window_QuestInfo)).call(this));

      _this4.initialize(x, y);
      return _this4;
    }

    _createClass(Window_QuestInfo, [{
      key: 'initialize',
      value: function initialize(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _get(Window_QuestInfo.prototype.__proto__ || Object.getPrototypeOf(Window_QuestInfo.prototype), 'initialize', this).call(this, x, y, width, height);
        this._quest = null;
        this._scrollY = 0;
        this.deactivate();
      }
    }, {
      key: 'update',
      value: function update() {
        _get(Window_QuestInfo.prototype.__proto__ || Object.getPrototypeOf(Window_QuestInfo.prototype), 'update', this).call(this);
        this.cursorUp();
        this.cursorDown();
        this.processWheel();
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.contents.clear();
        if (!this._quest || _Utils.isDefined(this._quest.expanded)) {
          return;
        }
        this.drawTitle();
        this.drawQuestGiverName();
        this.drawLocation();
        this.drawDescription();
        this._needsRefresh = false;
      }
    }, {
      key: 'drawTitle',
      value: function drawTitle() {
        var options = $.Param.titleSettings;
        if (options.disable) {
          return;
        }
        var x = 0;
        var y = 0 + this._scrollY;
        var align = options.align;
        var text = this._quest.name;
        this.contents.fontSize = options.titleSize;
        this.changeTextColor(this.textColor(options.titleColor));
        if (align === 'center') {
          x += this.width / 2 - (this.textWidth(text) - this.escapeCodeWidth(text)) / 2;
        } else if (align === 'right') {
          x = this.width - (this.textWidth(text) - this.escapeCodeWidth(text));
        }
        this.drawIcon(this._quest.iconid, x - (Window_Base._iconWidth + this.standardPadding()), y);
        this.drawTextExQuest(text, x, y);
      }
    }, {
      key: 'drawLocation',
      value: function drawLocation() {
        var options = $.Param.locationSettings;
        if (options.disable) {
          return;
        }
        var title = options.titleText;
        var location = this._quest.location || '????';
        var x = 0;
        var y = this.lineHeight() * 1.5 + this._scrollY;
        this.resetFontSettings();
        this.contents.fontSize = options.titleSize;
        var textWidth = this.textWidth(title + ' ');
        this.changeTextColor(this.textColor(options.titleColor));
        this.drawTextExQuest(title, x, y);
        this.resetFontSettings();
        this.contents.fontSize = options.descSize;
        this.drawTextExQuest(location, x + textWidth, y);
      }
    }, {
      key: 'drawQuestGiverName',
      value: function drawQuestGiverName() {
        var options = $.Param.giverNameSettings;
        if (options.disable) {
          return;
        }
        var title = options.titleText;
        var giver = this._quest.giverName || '????';
        var textWidth = this.textWidth(title) + this.textWidth(giver);
        var x = this.width - (textWidth + this.standardPadding() + this.textWidth(giver));
        var y = this.lineHeight() * 1.5 + this._scrollY;
        this.resetFontSettings();
        this.contents.fontSize = options.titleSize;
        this.changeTextColor(this.textColor(options.titleColor));
        this.drawTextExQuest(title, x, y);
        this.resetFontSettings();
        this.contents.fontSize = options.descSize;
        this.drawTextExQuest(giver, x + this.textWidth(title), y);
      }
    }, {
      key: 'drawQuestGiverFace',
      value: function drawQuestGiverFace() {}
    }, {
      key: 'drawDescription',
      value: function drawDescription() {
        var y = this.lineHeight() * 3 + this._scrollY;
        var x = 0;
        var options = $.Param.descSettings;
        if (options.disable) {
          return;
        }
        var text = this._quest.description;
        this.changeTextColor(this.textColor(options.titleColor));
        this.contents.fontSize = options.titleSize;
        this.drawTextWithLine(this.systemColor(), options.titleText, 0, y + this._scrollY, this.width, 'left');
        y += this.lineHeight();
        this.resetFontSettings();
        this.contents.fontSize = options.descSize;
        this.drawTextAutoWrap(text, x, y, this.drawSteps.bind(this));
      }
    }, {
      key: 'drawSteps',
      value: function drawSteps(x, y) {
        var _this5 = this;

        var stepIcon = $.Param.objectiveIcon;
        var options = $.Param.stepSettings;
        if (options.disable) {
          return;
        }
        var visibleSteps = this._quest.steps.filter(function (step) {
          return step.hidden === false;
        });
        var x2 = 0;

        this.changeTextColor(this.textColor(options.titleColor));
        this.contents.fontSize = options.titleSize;
        this.drawTextWithLine(this.systemColor(), options.titleText, 0, y += this.lineHeight(), this.width, 'left');

        visibleSteps.forEach(function (step) {
          var variable = $gameVariables.value(step.variable);
          var amountToCollect = step.amountToCollect;
          var collectText = ` ${variable} / ${amountToCollect}`;
          var fullText = step.variable && variable <= amountToCollect ? step.desc + collectText : step.desc;

          _this5.resetFontSettings();
          _this5.contents.fontSize = options.descSize;
          _this5.changeStepTextColor(step);

          x2 = Window_Base._iconWidth;
          y += _this5.lineHeight();
          _this5.drawIcon(stepIcon, 0, y);
          _this5.drawTextAutoWrap(fullText, x2, y);
        });
        this.drawRewards(0, y);
      }
    }, {
      key: 'drawRewards',
      value: function drawRewards(x, y) {
        var _this6 = this;

        var options = $.Param.rewardSettings;
        if (options.disable) {
          return;
        }
        var icons = $.Param.rewardIcons;
        var rewards = this._quest.rewards;
        /* Rewards Title */
        this.changeTextColor(this.textColor(options.titleColor));
        this.contents.fontSize = options.titleSize;
        this.drawTextWithLine(this.systemColor(), options.titleText, 0, y += this.lineHeight(), this.width, 'left');

        this.resetFontSettings();
        this.contents.fontSize = options.descSize;

        rewards.filter(function (reward) {
          return reward.hidden === false;
        }).forEach(function (visibleReward) {
          /* New Line For Each Reward */
          y += _this6.lineHeight();
          var type = visibleReward.type;
          var item = _this6.getItemData(type, visibleReward);
          var icon = type === 'gold' ? icons.gold : type === 'exp' ? icons.exp : item.iconIndex;
          var text = `${item.name} x ${visibleReward.amount}`;

          if (type === 'gold') {
            text = visibleReward.amount + ' ' + TextManager.currencyUnit;
          } else if (type === 'exp') {
            text = visibleReward.amount + ' ' + TextManager.expA;
          }

          _this6.drawIcon(icon, x, y);
          _this6.drawTextExQuest(text, x + Window_Base._iconWidth, y);
        });
      }

      /**
       * Retrieves the itme information from $data[Class]
       * @param {String} type - The type of item category [item, armor, weapon, gold, exp]
       * @param {*} reward - The quests reward object
       */

    }, {
      key: 'getItemData',
      value: function getItemData(type, reward) {
        var t = type;
        var r = reward;
        return t === 'item' ? $dataItems[r.id] : t === 'weapon' ? $dataWeapons[r.id] : t === 'armor' ? $dataArmors[r.id] : r.amount;
      }
    }, {
      key: 'changeStepTextColor',
      value: function changeStepTextColor(step) {
        var colors = $.Param.stepStateColors;
        if (step.complete) {
          this.changeTextColor(this.textColor(colors.complete));
        }
        /* Set step to active color only if step is active and not complete */
        if (QUEST.isStepActive(this._quest.id, step.id) && !this._quest.complete && QUEST.isActiveQuest(this._quest.id)) {
          this.changeTextColor(this.textColor(colors.active));
        }
      }
    }, {
      key: 'cursorUp',
      value: function cursorUp() {
        if (this.isScrollUp()) {
          if (this._scrollY === 0) {
            return;
          }
          SoundManager.playCursor();
          this._scrollY += Number(this.lineHeight()) * 1;
          this.refresh();
        }
      }
    }, {
      key: 'cursorDown',
      value: function cursorDown() {
        if (this.isScrollDown()) {
          this._scrollY -= Number(this.lineHeight()) * 1;
          SoundManager.playCursor();
          this.refresh();
        }
      }
    }, {
      key: 'processWheel',
      value: function processWheel() {
        if (this.isOpenAndActive()) {
          var threshold = 20;

          if (TouchInput.wheelY >= threshold) {
            SoundManager.playCursor();
            this._scrollY -= Number(this.lineHeight()) * 1;
            this.refresh();
          }

          if (TouchInput.wheelY <= -threshold) {
            if (this._scrollY === 0) {
              return;
            }
            SoundManager.playCursor();
            this._scrollY += Number(this.lineHeight()) * 1;
            this.refresh();
          }
        }
      }
    }, {
      key: 'isScrollDown',
      value: function isScrollDown() {
        return (Input.isRepeated('pagedown') || Input.isRepeated('down')) && this.isScrollReady();
      }
    }, {
      key: 'isScrollUp',
      value: function isScrollUp() {
        return (Input.isRepeated('pageup') || Input.isRepeated('up')) && this.isScrollReady();
      }
    }, {
      key: 'isScrollReady',
      value: function isScrollReady() {
        return this.isOpen() && this.active;
      }
    }, {
      key: 'updateCursor',
      value: function updateCursor() {
        if (this.isScrollReady()) {
          this.setCursorRect(0, 0, this.contents.width, this.contents.height);
        } else {
          this.setCursorRect(0, 0, 0, 0);
        }
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.select(-1);
        this.active = false;
        this.contents.clearRect(0, 0, this.contents.width, this.contents.height);
        this._scrollY = 0;
      }
    }, {
      key: 'setItem',
      value: function setItem(item) {
        this._quest = item;
        this.refresh();
      }
    }, {
      key: 'windowWidth',
      value: function windowWidth() {
        return Graphics.width - Graphics.width / 3;
      }
    }, {
      key: 'windowHeight',
      value: function windowHeight() {
        return Graphics.height;
      }
    }]);

    return Window_QuestInfo;
  }(Window_Command);
  /** -----------------------------------------------------------------------
  * Window_QuestOptions >>
  *
  *
  ------------------------------------------------------------------------ */
  /**
   * @class
   * @desc A window for displaying a confirmation to set quest active or not.
   */


  var Window_QuestOptions = function (_Window_Command2) {
    _inherits(Window_QuestOptions, _Window_Command2);

    function Window_QuestOptions(cmdWindow, x, y) {
      _classCallCheck(this, Window_QuestOptions);

      var _this7 = _possibleConstructorReturn(this, (Window_QuestOptions.__proto__ || Object.getPrototypeOf(Window_QuestOptions)).call(this));

      _this7.initialize(cmdWindow, x, y);
      return _this7;
    }

    _createClass(Window_QuestOptions, [{
      key: 'initialize',
      value: function initialize(cmdWindow, x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _get(Window_QuestOptions.prototype.__proto__ || Object.getPrototypeOf(Window_QuestOptions.prototype), 'initialize', this).call(this, x, y, width, height);
        this._commandWindow = cmdWindow;
        this.visible = false;
        this._category = 'setActive';
        this.refresh();
      }
    }, {
      key: 'update',
      value: function update() {
        _get(Window_QuestOptions.prototype.__proto__ || Object.getPrototypeOf(Window_QuestOptions.prototype), 'update', this).call(this);
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        _get(Window_QuestOptions.prototype.__proto__ || Object.getPrototypeOf(Window_QuestOptions.prototype), 'refresh', this).call(this);
      }
    }, {
      key: 'makeCommandList',
      value: function makeCommandList() {
        this.addItemCommands();
      }
    }, {
      key: 'addItemCommands',
      value: function addItemCommands() {
        var names = $.Param.moreOptions;
        this.addCommand(names.setActive, 'setActive', true);
        this.addCommand(names.moreInfo, 'moreInfo', true);
        this.addCommand(names.cancel, 'cancel', true);
      }
    }, {
      key: 'windowWidth',
      value: function windowWidth() {
        return Graphics.width / 3;
      }
    }, {
      key: 'updateWindowHeight',
      value: function updateWindowHeight() {
        this.height = this.windowHeight() - this._commandWindow.height;
      }
    }, {
      key: 'windowHeight',
      value: function windowHeight() {
        return Graphics.height;
      }
    }]);

    return Window_QuestOptions;
  }(Window_Command);

  /** -----------------------------------------------------------------------
  * Quest Jounral Scene >>
  *
  *
  ------------------------------------------------------------------------ */

  /**
   * The scene for displaying all quest related windows.
   *
   * @class Scene_QuestJournal
   * @extends {Scene_MenuBase}
   */


  var Scene_QuestJournal = function (_Scene_MenuBase) {
    _inherits(Scene_QuestJournal, _Scene_MenuBase);

    function Scene_QuestJournal() {
      _classCallCheck(this, Scene_QuestJournal);

      var _this8 = _possibleConstructorReturn(this, (Scene_QuestJournal.__proto__ || Object.getPrototypeOf(Scene_QuestJournal)).call(this));

      _this8.initialize();
      return _this8;
    }

    _createClass(Scene_QuestJournal, [{
      key: 'initialize',
      value: function initialize() {
        _get(Scene_QuestJournal.prototype.__proto__ || Object.getPrototypeOf(Scene_QuestJournal.prototype), 'initialize', this).call(this);
        this._activeQuest = QUEST.activeQuest() || null;
      }
    }, {
      key: 'start',
      value: function start() {
        _get(Scene_QuestJournal.prototype.__proto__ || Object.getPrototypeOf(Scene_QuestJournal.prototype), 'start', this).call(this);
      }
    }, {
      key: 'create',
      value: function create() {
        _get(Scene_QuestJournal.prototype.__proto__ || Object.getPrototypeOf(Scene_QuestJournal.prototype), 'create', this).call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createWindows();
        this.setOpacityForAllWindows();
        this.autoSelectActiveQuest();
      }
    }, {
      key: 'setOpacityForAllWindows',
      value: function setOpacityForAllWindows() {
        var children = this._windowLayer.children;
        /* Check if it's a window, in case of adding sprites to window layer */
        var windows = children.filter(function (child) {
          return child instanceof Window_Base;
        });
        windows.forEach(function (child) {
          child.opacity = Number($.Param.sceneOpacity);
        });
      }
    }, {
      key: 'terminate',
      value: function terminate() {
        _get(Scene_QuestJournal.prototype.__proto__ || Object.getPrototypeOf(Scene_QuestJournal.prototype), 'terminate', this).call(this);
        this.removeChildren();
      }
    }, {
      key: 'update',
      value: function update() {
        _get(Scene_QuestJournal.prototype.__proto__ || Object.getPrototypeOf(Scene_QuestJournal.prototype), 'update', this).call(this);
      }
    }, {
      key: 'createBackground',
      value: function createBackground() {
        var background = null;
        if ($.Param.sceneBg) {
          background = ImageManager.loadPicture($.Param.sceneBg);
        }
        this._background = new Sprite();
        this._background.bitmap = background || SceneManager.backgroundBitmap();
        this.addChild(this._background);
      }
    }, {
      key: 'createWindows',
      value: function createWindows() {
        this.createCommandWindow();
        this.createInfoWindow();
        this.createLogWindow();
        this.createOptionsWindow();
      }
    }, {
      key: 'createCommandWindow',
      value: function createCommandWindow() {
        this._commandWindow = new Window_QuestCommands(0, 0);
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this._commandWindow.setHandler('ok', this.onCategoryOk.bind(this));
        this.addWindow(this._commandWindow);
      }
    }, {
      key: 'createInfoWindow',
      value: function createInfoWindow() {
        var x = this._commandWindow.width;
        this._infoWindow = new Window_QuestInfo(x, 0);
        this._infoWindow.setHandler('cancel', this.onInfoCancel.bind(this));
        this._infoWindow.deactivate();
        this.addWindow(this._infoWindow);
      }
    }, {
      key: 'createLogWindow',
      value: function createLogWindow() {
        var y = this._commandWindow.height;
        var cmd = this._commandWindow;
        var infoWindow = this._infoWindow;
        this._logWindow = new Window_QuestLog(cmd, infoWindow, 0, y);
        this._logWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._logWindow.setHandler('ok', this.onItemOk.bind(this));
        this._logWindow.updateWindowHeight();
        this._logWindow.deselect();
        this.addWindow(this._logWindow);
      }
    }, {
      key: 'createOptionsWindow',
      value: function createOptionsWindow() {
        var x = this._logWindow.x;
        var y = this._logWindow.y;
        var commandWindow = this._commandWindow;
        this._questOptions = new Window_QuestOptions(commandWindow, x, y);
        this._questOptions.setHandler('cancel', this.onOptionsCancel.bind(this));
        this._questOptions.setHandler('setActive', this.onSetActive.bind(this));
        this._questOptions.setHandler('moreInfo', this.onMoreInfo.bind(this));
        this._questOptions.updateWindowHeight();
        this._questOptions.deactivate();
        this.addWindow(this._questOptions);
      }
    }, {
      key: 'onCategoryOk',
      value: function onCategoryOk() {
        this._logWindow._refreshCategories = false;
        this._logWindow.refresh();
        this._logWindow.activate();
        this._logWindow.selectLast();
      }
    }, {
      key: 'onItemCancel',
      value: function onItemCancel() {
        this._logWindow.deselect();
        this._logWindow._refreshCategories = true;
        this._logWindow.refresh();
        this._commandWindow.activate();
      }
    }, {
      key: 'onItemOk',
      value: function onItemOk() {
        var item = this._logWindow.item();
        if (_Utils.isDefined(item.expanded)) {
          if (!item.expanded) {
            this._logWindow.expandCategory(item.name);
          } else {
            this._logWindow.collapseCategory(item.name);
          }
        } else {
          this._logWindow.visible = false;
          this._questOptions.visible = true;
          this._questOptions.activate();
          this._questOptions.select(0);
        }
      }
    }, {
      key: 'onSetActive',
      value: function onSetActive() {
        var quest = this._logWindow.item();
        if (quest.complete || quest.failed || quest.active) {
          SoundManager.playBuzzer();
          this._questOptions.activate();
        } else {
          this._questOptions.deselect();
          this._questOptions.visible = false;
          SoundManager.playOk();
          QUEST.setActiveQuest(quest);
          this._logWindow.visible = true;
          this._logWindow.activate();
          this._logWindow.selectLast();
          this._logWindow.refresh();
        }
      }
    }, {
      key: 'onOptionsCancel',
      value: function onOptionsCancel() {
        this._questOptions.deselect();
        this._questOptions.visible = false;
        this._logWindow.visible = true;
        this._logWindow.activate();
        this._logWindow.selectLast();
      }
    }, {
      key: 'onMoreInfo',
      value: function onMoreInfo() {
        this._questOptions.deselect();
        this._questOptions.visible = false;
        this._logWindow.visible = true;
        this._infoWindow.activate();
      }
    }, {
      key: 'onInfoCancel',
      value: function onInfoCancel() {
        this._infoWindow.deactivate();
        this._logWindow.visible = true;
        this._logWindow.activate();
        this._logWindow.selectLast();
      }
    }, {
      key: 'autoSelectActiveQuest',
      value: function autoSelectActiveQuest() {
        if ($.Param.autoSelect && this._activeQuest !== null) {
          var category = QUEST.activeQuest().category;
          this._commandWindow.selectSymbol('started');
          this._logWindow.setCategory('started');
          this._logWindow._refreshCategories = false;
          this._commandWindow.deactivate();
          this._logWindow.refresh();
          this._logWindow.activate();
          this._logWindow.expandCategory(category);
          this.selectActiveQuest();
          this._logWindow.refresh();
        }
      }
    }, {
      key: 'selectActiveQuest',
      value: function selectActiveQuest() {
        var quest = QUEST.activeQuest();
        var items = this._logWindow._data;
        var item = items.filter(function (item) {
          return item.id === quest.id;
        })[0];
        var index = items.indexOf(item);
        if (index >= 0) {
          this._logWindow.select(index);
        }
      }
      /* End Of Scene Quest Journal Class */

    }]);

    return Scene_QuestJournal;
  }(Scene_MenuBase);

  if ($.Param.useTracker) {
    $.Alias.createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
      $.Alias.createAllWindows.call(this);
      $._questTracker = null;
      var contentOptions = $.Param.trackerWinOptions;
      this._questTracker = new Window_QuestTrack();
      this._questTracker.x = contentOptions.x;
      this._questTracker.y = contentOptions.y;
      $._questTracker = this._questTracker;
      QUEST.tracker = $._questTracker;
      this.addWindow(this._questTracker);
    };
  }

  /** -----------------------------------------------------------------------
  * Add To Main Menu >>
  *
  *
  ------------------------------------------------------------------------ */
  if ($.Param.mainMenu.visible) {
    //  Setup the Menu scene to contain the Quest Journal command.
    $.Alias.Window_Command_addOrigCmds = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
      $.Alias.Window_Command_addOrigCmds.call(this);
      this.addCommand($.Param.mainMenu.name, 'quest', $.Param.mainMenu.visible);
    };

    $.Alias.SceneMenu_createCmdWin = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
      $.Alias.SceneMenu_createCmdWin.call(this);
      this._commandWindow.setHandler('quest', this.commandQuest.bind(this));
    };

    Scene_Menu.prototype.commandQuest = function () {
      SceneManager.push($.scene_QJ);
    };
  }

  /** -----------------------------------------------------------------------
  * Window_Base Additions >>
  *
  * Borrowed from LTN_WindowCore(Unreleased)
  ------------------------------------------------------------------------ */
  Window_Base.prototype.drawTextWithLine = function (color, text, x, y, maxWidth, align) {
    var tw = this.textWidth(text);
    this.drawRect(x + tw, y + this.standardFontSize() / 2 + 4, maxWidth - tw, 3, color);
    this.drawText(text, x, y, maxWidth, align);
  };

  /* @TODO - Investigate this method further. What's the reason for this again? lol, pretty sure
  draw rect is a default function, either in contents(bitmap) or a Window_Base.
   */
  Window_Base.prototype.drawRect = function (x, y, width, height, color) {
    color = color || this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(x, y, width, height, color);
    this.changePaintOpacity(true);
  };

  Window_Base.prototype.escapeCodeWidth = function (text) {
    var codes = '';
    var escapeCodes = text.match(/(\\[CNVG]\[\d*\])/g);
    if (!escapeCodes) return 0;
    escapeCodes.forEach(function (code) {
      codes += code;
    });
    return this.textWidth(codes);
  };

  Window_Base.prototype.drawTextAutoWrap = function (text, x, y, action) {
    var _this9 = this;

    var words = text.split(' ');
    var x2 = x;
    var y2 = y;
    words.forEach(function (word) {
      word = _this9.convertEscapeCharacters(word);
      var width = _this9.textWidth(word + ' ');
      if (word === '\x1b' + 'n') {
        y2 += _this9.lineHeight();
        x2 = 0;
        return;
      }
      if (x2 + width >= _this9.contents.width) {
        y2 += _this9.lineHeight();
        x2 = 0;
      }
      _this9.drawTextExQuest(word + ' ', x2, y2);
      x2 += width - _this9.escapeCodeWidth(word);
    });
    if (action) {
      action(x2, y2);
    }
  };

  /* Copy of Window_Base original method but with resetFontSettings removed */
  Window_Base.prototype.drawTextExQuest = function (text, x, y) {
    if (text) {
      var textState = { index: 0, x: x, y: y, left: x };
      textState.text = this.convertEscapeCharacters(text);
      textState.height = this.calcTextHeight(textState, false);
      while (textState.index < textState.text.length) {
        this.processCharacter(textState);
      }
      return textState.x - x;
    } else {
      return 0;
    }
  };

  Window_Base.prototype.drawDarkRect = function (x, y, width, height) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(x, y, width, height, color);
    this.changePaintOpacity(true);
  };

  /** ----------------------------------------------------
   * Plugin Commands >>
   *
   * Contain time control plugin commands.
   *
   ------------------------------------------------------- */
  $.Alias.GameInterp_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    if (command === 'QUEST') {
      var quest = null;
      switch (String(args[0]).toLowerCase()) {
        case 'openquestjournal':
          SceneManager.push($.scene_QJ);
          break;

        case 'track':
          quest = QUEST._quests[args[1]];
          QUEST.setActiveQuest(quest);
          break;

        case 'start':
          QUEST.startQuest(args[1]);
          break;

        case 'advance':
          QUEST.advanceQuest(args[1], args[2]);
          break;

        case 'complete':
          QUEST.completeQuest(args[1]);
          break;

        case 'fail':
          QUEST.failQuest(args[1]);
          break;
        case 'hidetracker':
          QUEST.tracker.hide();
          break;
        case 'showtracker':
          QUEST.tracker.show();
          break;
        default:
          throw new Error(`Can't detrmine the QUEST command: ${args[0]}, are you sure this is a proper command ?`);
      }
      if (typeof $._questTracker !== 'undefined') {
        $._questTracker.requestRefresh();
      }
    } else {
      $.Alias.GameInterp_pluginCommand.call(this, command, args);
    }
  };
  /** -----------------------------------------------------------------------
   * Save And Load Core Signals >>
   ------------------------------------------------------------------------ */
  LTN.CoreSignals.add('new-game', function () {
    $.QUEST = new QuestManager();
    QUEST = $.QUEST;
    QUEST.loadAllQuests();
  });

  LTN.CoreSignals.add('game-load-success', function (contents) {
    if (typeof QUEST._active !== 'undefined') {
      QUEST.setActiveQuest(QUEST._active);
    }
  });

  LTN.CoreSignals.add('game-save', function (contents) {
    $.SaveData = {
      QUEST: {
        _quests: $.QUEST._quests,
        _active: $.QUEST._active
      }
    };
  });
  /** -----------------------------------------------------------------------
   * Export For Add-Ons >>
   ------------------------------------------------------------------------ */
  $.scene_QJ = Scene_QuestJournal;
  $.questTrackerWindow = Window_QuestTrack;
})(LTN.PluginRegistrar.requirePlugin(false, 'QuestJournal'));