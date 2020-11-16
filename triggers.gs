function onEditwatcher(e){
  Logger.log("INFO - Edited: " + e);
  let n = _this.sName_ || 'Config';
  if (e.range.getSheet().getName() === n){
    CacheService.getScriptCache().put("updated", 1);
  };
};
function deleteTrigger(){
  let tid = CacheService.getScriptCache().get("triggerId");
  let st = ScriptApp.getUserTriggers(SpreadsheetApp.openById(CacheService.getScriptCache().put("sId")));
  if(st){
    st.forEach((t) =>{ if((t.getUniqueId() === tid) || (t.getHandlerFunction() === 'deleteTrigger_') || (t.getHandlerFunction() === 'onEditwatcher_')) ScriptApp.deleteTrigger(t);});
    CacheService.getScriptCache().remove("triggerId");
    _this.triggerId_ = undefined;
  };
};
function setDeleteTrigger_(){
  Logger.log("INFO - Setting up trigger to delete watcher trigger");
  let t = ScriptApp.newTrigger('deleteTrigger').timeBased().after(10 * 60 * 10000).create();
};

function setWatcherTrigger_(){
  Logger.log("INFO - Setting up trigger watcher");
  let t = ScriptApp.newTrigger('onEditwatcher').forSpreadsheet(_this.ss_).onEdit().create();
  _this.setDeleteTrigger_();
  return t.getUniqueId();
};
