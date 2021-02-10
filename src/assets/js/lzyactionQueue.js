/**
 * lazy队列消息控制类
 * 目前基于定时器和time实现
 * Direction:
 * [使用消息队列] : register -> addHook -> run
 * 特别附带的沉浸模式[immerse mode]
 * 沉浸状态由`immerse.behavior`的`indicator`字段===0?决定
 * 所有钩子函数的上下文均被设置成当前`lzyactionQueue`对象,定义函数中可直接使用this来访问对象属性
 */

var self;
var is_Array = (obj)=>{return (typeof obj==='object')&&obj.constructor==Array};
var in_array = function(search,array){ for(var i in array){ if(array[i]==search){ return i; } } return -1;};
var lzyactionQueue = function(){
    self = this;
    this.settings = {
        period: 4999,
        immerseDetect: true,
        periodHandle: 0,
    };
    this.monitor = {
        onscroll:()=>{
            if(self.settings.immerseDetect){
                self.onscrollRequest();
            }else{
                self.onscrollRequestCancel();
            }
        },
    };
    this.immerse = {
        DEADLINE : 23,
        END : 0,
        behavior:{
            offsetTop: 0,
            direction: 'none',
            same: 0,
            indicator: 240,
            active: true,
        },
        immersingHook:{
            basic: [],
            divorceImmerse: [],
            nearImmerse: [],
        },
        scrollAnimationID: 0,
        immerseActions: [],
    }
    
    this.messageQueue = [];
    this.hooks = {};
    this.actions = [];
    this._did_queue = {};
};
lzyactionQueue.prototype.run = function({...options}){
    self.immerse.immersingHook = {
        basic : options.basic ? [options.basic] :  [],
        nearImmerse :options.nearImmerse ? [options.nearImmerse] :  [],
        divorceImmerse :options.divorceImmerse ? [options.divorceImmerse] :  [],
    };
    self.register(
        {
            message:"immerse_invoke",
            once: true,
            actions: ()=>{self.immerseAction();} 
        },
    );

    self.settings.periodHandle = window.setInterval(()=>{
        self.settings.immerseDetect = options.immerseModeOn();
        self.everyAction();
    }, self.settings.period);
    window.addEventListener("scroll",self.monitor.onscroll);
}
lzyactionQueue.prototype.stop = function(){
    window.clearInterval(self.settings.periodHandle);
    window.removeEventListener('scroll',self.monitor.onscroll);
}
lzyactionQueue.prototype.bubble = function(strOrArr){
    self.messageQueue.push(strOrArr);
}
lzyactionQueue.prototype.isImmersed = ()=>{return self.immerse.behavior.indicator<=self.immerse.END};
lzyactionQueue.prototype.getIndicator = ()=>{return self.immerse.behavior.indicator};
lzyactionQueue.prototype.indicatorAdjust = (value)=>{self.immerse.behavior.indicator+=value; return self.immerse.behavior.indicator;}
lzyactionQueue.prototype.isFocused = ()=>{return self.immerse.behavior.active};
lzyactionQueue.prototype.immerseDetect = ()=>{self.settings.immerseDetect = true};
lzyactionQueue.prototype.immerseDetectOff = ()=>{self.settings.immerseDetect = false};
lzyactionQueue.prototype.register = function(...hooks){
    hooks.forEach((item,i)=>{
        self.hooks[item.message] = {
            once: item.once,
            actions: is_Array(item.actions)?item.actions:[item.actions],
        }
    });
};
lzyactionQueue.prototype.addHook = function(message, ...hookActions){
    switch(message){
        case 'immerse_addAction':{
            hookActions.forEach((item)=>{
                self.immerse.immerseActions.push({
                    once: item.once || false,
                    key: item.key || Math.random().toString(16).slice(-5),
                    action: item.action,
                });
            });
            break;
        }
        case 'immerse_removeAction':{
            var temp=[];
            if(hookActions.length===0) self.immerse.immerseActions = temp;
            for(let index=0; index<self.immerse.immerseActions.length;index++){
                if( in_array(self.immerse.immerseActions[index].key, hookActions) > -1 )
                    temp.push(self.immerse.immerseActions[index]);
            };
            self.immerse.immerseActions = temp;
            break;
        }
        case 'immersing_addHook':{
            let key = hookActions.shift();
            hookActions.forEach( (item)=>{
                if(!self.immerse.immersingHook[item.hook]) return console.warn("[lzyactionQueue.immersing_addHook]: unkown key -> ", item);
                self.immerse.immersingHook[item.hook].push(item.action);
            });
            break;
        }
        default:
            if(!self.hooks[message]) return false;
            self.hooks[message].actions = self.hooks[message].actions.concat(hookActions);
    }
    return true;
};
lzyactionQueue.prototype.everyAction = function(){
    self._did_queue = {};
    let exeTime = self.messageQueue.length;
    for(let i=0;i<exeTime;i++){
        let currentMsg = self.messageQueue.shift(),
            hookArguments = [];
        if(typeof currentMsg==="object" && currentMsg.constructor===String){
            let realMsg = currentMsg.shift();
            hookArguments = currentMsg;
            currentMsg = realMsg;
        }
        self.eventsRecorder.recordEvents(currentMsg);
        if(!!self.hooks[currentMsg]){
            if(self.hooks[currentMsg].once && self.eventsRecorder.isHappened(currentMsg)) continue;
            self.hooks[currentMsg].actions.forEach(element => {
                element.apply(self,hookArguments);
            });
        }
    }
    if(self.settings.immerseDetect){
        if(self.immerse.behavior.indicator > self.immerse.DEADLINE){
            self.immerse.behavior.active=true, self.immerse.behavior.indicator -= ~~(self.immerse.behavior.indicator/2 - Math.log(self.immerse.behavior.indicator+1));
            self.immerse.immersingHook.divorceImmerse.forEach((action)=>{
                action.call(self, self.immerse);
            });
        }else {
            self.immerse.behavior.active=false;
            self.immerse.immersingHook.nearImmerse.forEach((action)=>{
                action.call(self, self.immerse);
            });
        }
        self.immerse.immersingHook.basic.forEach((action)=>{
            action.call(self,self.immerse,self);
        });
        if(!self.isImmersed()) self.immerse.behavior.indicator--;
        else{
            self.immerseAction();
        };
    }
}
lzyactionQueue.prototype.immerseAction = function(){
    var temp = [],
        _self = self;
    self.immerse.immerseActions.forEach(function(v,i){
        v.action.call(self, self.immerse.behavior, self.immerse.scrollAnimationID, self.immerse.immerseActions);
        if(!!self.immerse.once) return;
        temp.push(v);
    });
    self.immerse.immerseActions = temp;
}
lzyactionQueue.prototype.onscrollRequest = function(){
    self.immerse.scrollAnimationID = window.requestAnimationFrame(function(){
        
        var last = self.immerse.behavior.direction,
            offset = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        self.immerse.behavior.indicator++;
        
        if(self.immerse.behavior.offsetTop < offset) self.immerse.behavior.direction='down';
        else self.immerse.behavior.direction='up';
        if('down' === self.immerse.behavior.direction) self.immerse.behavior.same>20?self.immerse.behavior.same++:self.immerse.behavior.same+=2;
        else if(self.immerse.behavior.same >= 3) self.immerse.behavior.same-=3,self.immerse.behavior.active = true;;
        if(self.immerse.behavior.same>36){
            self.immerse.behavior.indicator++;
            self.immerse.behavior.active = true;
        }
        self.immerse.behavior.offsetTop = offset;
    });
}
lzyactionQueue.prototype.onscrollRequestCancel = function(){
    window.cancelAnimationFrame(self.immerse.scrollAnimationID);
}
lzyactionQueue.prototype.eventsRecorder = {
    recordEvents: function (currentMsg){
      self._did_queue[currentMsg] = self._did_queue[currentMsg]>=0 ? ++self._did_queue[currentMsg] : 0;
    },
    isHappened: function (msg){
      return !!self._did_queue[msg];
    },
    debounce: function (msg,callback=function(){}){
      if(!self.eventsRecorder.isHappened(msg)) self.messageQueue.push(msg);
      return callback.apply(self,arguments);
    }
}


export default lzyactionQueue;
