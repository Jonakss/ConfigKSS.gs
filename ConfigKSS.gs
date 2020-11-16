///**
//*  Load config from Config sheet
//*
//*  @autor Jonathan Correa Paiva
//*/

var _this = this;

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
  Logger.log("INFO - loadConfig");
  _this.v_ = {}; //Cleaning object, just in case we reload the configuration
  
  if(_this.watcher_){
    if(CacheService.getScriptCache().get("updated") === 1){ 
      clearCacheService_();
    };
  }
  
  if(_this.sId_) _this.ss_ = SpreadsheetApp.openById(_this.sId_);
  else _this.ss_ = SpreadsheetApp.getActiveSpreadsheet();
    
  if(_this.sName_) sc_ = ss_.getSheetByName(_this.sName_);
  else sc_ = ss_.getSheetByName('Config');
  
  CacheService.getScriptCache().put("sId", _this.ss_.getId());
  CacheService.getScriptCache().put("sName", _this.sName || 'Config' );
  
  //let rsc_ = sc_.getRange(pps_.rStart,pps_.rStart,pps_.rows,pps_.columns).getValues();
  if (_this.sc_){
    let rsc_ = _this.sc_.getRange(1,1,2,2).getValues(); 
        
    for(let i = 0; i < rsc_.length; i++){
      _this.v_[rsc_[i][0]]=rsc_[i][1];
    };
    
    if(_this.watcher_)if(!CacheService.getScriptCache().get("triggerId")) _this.setWatcherTrigger_();
  }else Logger.log("ERROR - ConfigKSS - While loading Config sheet");
  //CacheService.getScriptCache().remove("updated");
};

function get(value){
  if(CacheService.getScriptCache().get("updated") === 1){ loadConfig_(); Logger.log("INFO - ConfigKSS - Config reloaded");};
  if (_this.v_ === undefined || Object.keys(_this.v_).length === 0) loadConfig_();
  let v = _this.v_[value];
  if(!v) Logger.log("WARNIN - ConfigKSS - Key not found.");
  return v===null? undefined : v;
};

function setSpreadsheet(ss){
  _this.ss_ = ss;
  //CacheService.getScriptCache().put("updated",1)
  return _this;
};

function getSpreadsheet(){
  return _this.ss_;
};

function setSheet(s){
  let ts = typeof(s);
  if(ts === 'string'){
    _this.sc_ = ss_.getSheetByName(s);
    _this.sName_ = s;
  }else if(ts === typeof({}))
    _this.sc_ = s;
  //CacheService.getScriptCache().put("updated",1)
  return _this;
};

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

function getValues(){
  return _this.v_;
};

function reload(){
  return _this.loadConfig_();
};

function setSheetID(id){
  _this.sId_ = id;
  CacheService.getScriptCache().put("updated",1)
  return _this.loadConfig_();
};

function clearCacheService_(){
  CacheService.getScriptCache().remove("triggerId");
  CacheService.getScriptCache().remove("updated");
  CacheService.getScriptCache().remove("sId");  
  CacheService.getScriptCache().remove("sName");
};
