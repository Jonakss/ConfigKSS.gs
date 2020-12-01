///**
//*  Load config from Config sheet
//*
//*  @autor Jonathan Correa Paiva
//*/

var _this = {};

_this.triggerId = undefined;

_this.sId_ = undefined;
_this.sName_ = undefined;
_this.ss_ = undefined; //Spreadsheet
_this.sc_ = undefined; // Config Sheet
_this.v_ = {}; // Values
_this.watcher_ = false;
_this.pps_ = {
  "rStart":1,
  "cStart":1,
  "rows":-1,
  "columns":2,
};

function loadConfig_() {  
  log_('INFO', 'Loanding parameters');
  
//  if(_this.watcher_){
//    if(CacheService.getScriptCache().get("updated") === 1){ 
//      clearCacheService_();
//    };
//  }
  
  if(_this.sId_) _this.ss_ = SpreadsheetApp.openById(_this.sId_);
  else _this.ss_ = SpreadsheetApp.getActiveSpreadsheet();
  
  let e = true;
  
  let tt = ScriptApp.getProjectTriggers();
  if(tt.length > 0) {
   if(tt.reduce((acc, t) => {t.getHandlerFunction()==='watcher'?1:0})>0) e =false;
  };

  if(e){
    tt.forEach(t => { if(t.getHandlerFunction() === 'watcher') ScriptApp.deleteTrigger(t);})
    ScriptApp.newTrigger('watcher')
    .forSpreadsheet(_this.ss_)
    .onEdit()
    .create(); 
  };

  SpreadsheetApp.flush();
  
  if(_this.sName_) _this.sc_ = _this.ss_.getSheetByName(_this.sName_);
  else _this.sc_ = _this.ss_.getSheetByName('Config');
  
  
//  CacheService.getScriptCache().put("sId", _this.ss_.getId());
//  CacheService.getScriptCache().put("sName", _this.sName || 'Config' );
  
  //let rsc_ = sc_.getRange(pps_.rStart,pps_.rStart,pps_.rows,pps_.columns).getValues();
  if (_this.sc_){
    let rsc_ = _this.sc_.getRange(1,1,_this.sc_.getLastRow(),2).getValues(); 
    
    for(let i = 0; i < rsc_.length; i++){
      _this.v_[rsc_[i][0]]=rsc_[i][1];
    };
    
//    if(_this.watcher_)if(!CacheService.getScriptCache().get("triggerId")) _this.setWatcherTrigger_();
  }else Logger.log("ERROR - ConfigKSS - While loading Config sheet");
  //CacheService.getScriptCache().remove("updated");
return this;
};


/**
 * Get the key in the Spreadsheet, returning the value.
 *
 * @param {string} key - Key to be find in the Config Sheet
 * @return {string}
 */
function get(key){
  if(CacheService.getScriptCache().get("updated") === 1){ reload(); Logger.log("INFO - ConfigKSS - Config reloaded");};
  if (_this.v_ === undefined || Object.keys(_this.v_).length === 0) loadConfig_();
  let v = _this.v_[key];
  if(!v){log_('WARNING', 'Key not found.'); return undefined;}
  return v;
};

/**
 * Set Spreadsheet to be used.
 *
 * @param {Spreadsheet} ss
 * @return {ConfigKSS}
 */
function setSpreadsheet(ss){
  _this.ss_ = ss;
  //CacheService.getScriptCache().put("updated",1)
  return reload()
};

/**
 * Get the Spreadsheet used by ConfigKSS
 *
 * @return {Spreadsheet}
 */
function getSpreadsheet(){
  return _this.ss_;
};

/**
 * Set the Sheet used by ConfigKSS
 *
 * @param {string | Object} s
 * @return {ConfigKSS}
 */
function setConfigSheet(s){
  let ts = typeof(s);
  if(ts === 'string'){
    _this.sc_ = _this.ss_.getSheetByName(s);
    _this.sName_ = s;
  }else if(ts === typeof({}))
    _this.sc_ = s;
  //CacheService.getScriptCache().put("updated",1)
  return reload();
};

/**
 * Get the Sheet used by ConfigKSS to load the keys
 *
 * @return {Sheet}
 */
function getSheet(){
  return _this.cs_;
};

function setProperties(args){
  switch(typeof(args)){
    case typeof({}):
      break;
    case typeof([]):
      break;
    default:
      break;
  };
};

function getProperties(){ return this.pps_; };

/**
 * Get the Sheet used by ConfigKSS to load the keys
 *
 * @return {Array<string>}
 */
function getValues(){
  return _this.v_;
};

/**
 * Reload all the keys and his values
 *
 * @return {ConfigKSS}
 */
function reload(){
  _this.v_ = {}; //Cleaning object, just in case we reload the configuration
  return loadConfig_();
};

/**
 * Set the ID of the Spreadsheet to use. If there is no SpreadsheetID would be used getActiveSpreadsheet
 *
 * @param {string}  id - Spreadsheet ID
 * @return {ConfigKSS} the result of the exponential calculation
 */
function setSpreadsheetID(id){
  if(typeof(id) === 'string'){ 
    _this.sId_ = id;
    CacheService.getScriptCache().put("updated", 1);
    return reload();
  }else log_('ERROR', 'id Must be a valid id of Spreadshet [String] you provided' + typeof(id));
  return this;
};

function clearCacheService_(){
  CacheService.getScriptCache().remove("triggerId");
  CacheService.getScriptCache().remove("updated");
  CacheService.getScriptCache().remove("sId");  
  CacheService.getScriptCache().remove("sName");
};

function log_ (t, m){
  Logger.log("ConfigKSS - ", t , " - ", m);
};
