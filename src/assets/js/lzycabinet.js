
var self;
var lzycabinet = function(root, initStorage = {}){
  self = this;
  this.root = root || 'lzysettings';
  this.storage = initStorage;
};
lzycabinet.prototype.set = function(key, value){
  this.storage[key] = value;
  return this;
};
lzycabinet.prototype.read = function(key, callback = (v)=>{return v}, filterOn = false){
  let backValue = this.storage[key];
  if(filterOn) return callback(backValue);
  callback(backValue);
  return backValue;
}
lzycabinet.prototype.delete = function(key){
  this.storage[key] = undefined;
  return this;
}
lzycabinet.prototype.save = function(){
  window.localStorage.setItem(this.root, JSON.stringify(this.storage));
  return this;
}
lzycabinet.prototype.load = function(){
  let temp = JSON.parse(window.localStorage.getItem(this.root));
  if(!!temp)
    Object.assign(this.storage,temp);
  else console.error("设置项读取失败！");
  return this;
}
lzycabinet.prototype.clear = function(){
  window.localStorage.removeItem(this.root);
  return this;
}
lzycabinet.prototype.storage = function(){return this.storage};

export default lzycabinet;
