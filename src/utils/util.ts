/**
 * Utils.js
 * Practical static functions for javascript language programing.
 */

import { DEBUG } from './const';
import { getCasualMode, CasualMode } from './modules/casual-list';


/**
 * Assign the target item whose key has been defined in the source.
 * Not deep mode.
 * @param {*} source 
 * @param {*} target 
 */
export function objectRefresh<R extends Object, T extends Object> (source: R, target: T|null) {
  if(!is_Object(target) ) return source;
  
  let current: unknown = null;
  for (let item in source) {
    current = (target as unknown as R)[item];
    // // Set origin data as null to disable refresh?
    // if (is_Defined(source[item]) && current!==void 0){
    if (current!==void 0){
      source[item] = (target as unknown as R)[item];
    }
  }
  return source;
}

/**
 * Deep type of objectRefresh source to target.
 * @param target
 * @param source
 */
 export function deepRefresh(...objs:Array<Object>){
  let merged; 
  objs.reduce((source, target)=>{
    if(!is_Object(target) ) return source;

    for(let item in source){
      if(target[item]!==void 0) {
        if(is_PlainObject(source[item]) && is_PlainObject(target[item])){
          deepRefresh(source[item], target[item]);
        }else{
          source[item] = target[item];
        }
      }
    }
    merged = source;
    return source;
  }, objs[0]); // The third param is to set default value.
  return merged;
}


/**
 * Heigh Efficiency Array contact (Changes were made on the long Array)
 * Fits data of thousands scale.
 * @param {Array<T>} arrOne 
 * @param {Array<S>} arrTwo 
 * @returns Contacted Array. (The Ref from one of the source Array)
 */
 export const mergeArray = <T,S>(arrOne: Array<T>, arrTwo: Array<S>)=>{
  let Destiny, Obsolete;
  if(arrOne.length < arrTwo.length){
    Destiny = arrTwo;
    Obsolete = arrOne;
  } else {
    Destiny = arrOne;
    Obsolete = arrTwo;
  }
  const originLen = Destiny.length-1;
  const targetLen = originLen+Obsolete.length;
  for(let i = originLen; i<targetLen; i++){
    Destiny[i] = Obsolete[i];
  }
  return Destiny as Array<T|S>;
}


/**
 * Randomly return a item from the source Array.
 * @param arr 
 */
export const randomItem = <T>(arr:T[])=>{
  return arr[~~(Math.random()*arr.length)];
};

/**
 * Fisher-Yates Shuffles.
 * Make the Array changed.
 * @param source 
 * @param objPathes 
 */
export const arrayShuffle = <T>(arr:Array<T>)=>{
  for (let i = arr.length - 1; i > 0; i--) {
    const j = ~~(Math.random()* (i + 1) );
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Get the target curve path value of the source Object.
 * The curve path is a sequenced array
 * @param source 
 * @param objPathes 
 */
export function curveGet(source: Object, objPathes: (string|number)[]){
  let interim = source, item;
  for(let index=0; index<objPathes.length; index++){
    item = objPathes[index];
    interim = interim && interim[item]
    if(interim === void 0 ){
      return void 0;
    };
  }
  return interim as unknown | undefined;
}

/**
 * Set the consistent even curve path of the source Object 
 * The curve path is a sequenced array // dot split strings.
 * @param source 
 * @param objPathes 
 * @param {unknown|Function} value The value assign for the curve object target. Support callback that if target value is a function you should set it in call back.
 * @returns { number|true } The number indicator the failed position of the conflict path.
 */
export function curveSet(source: Object, objPathes: (string|number)[], value: ((target: Object, name: string)=>any)| unknown= null){
  let interim = source, item;
  // not the last one.
  let index=0;
  for(; index<objPathes.length-1; index++){
    item = objPathes[index];
    // existed.
    if(is_Defined(interim[item]) ){
      if(is_Object(interim[item])){
        interim = interim[item];
      // Refined Array path.
      // } else if(is_Array(interim[item])){
      //   interim = interim[parseInt(item)];
      } else {
        // Unexpected non-object value.
        DEBUG&& console.warn("[curveSet]: Unexpected non-object value of path:", item);
        return index;
      }
    // non existed.
    } else 
      interim = interim[item] = {};
  };
  // the last
  item = objPathes[index];
  // assign the value.
  if(is_Function(value))
    (value as Function)(interim, item);
  else
    interim[item] = value;
  return true;
}


/**
 * Get the pretty date Object of particular time.
 *  
 */
export const getPrettyTime = (...particularTime:unknown[])=>{
  // const nowTime = !is_Empty(particularTime)? new Date(...(particularTime) ): new Date();
  const nowTime = new Date();
  return {
    year: nowTime.getFullYear(),
    month: nowTime.getMonth()+ 1,
    date: nowTime.getDate(),
    hour: nowTime.getHours(),
    minute: nowTime.getMinutes(),
    second: nowTime.getSeconds(),
  }
};

export const dateFormatter = function(formatter:string, time = new Date() ) {
  // Match consistent letters
  return formatter.replace(/([a-z]+)/ig, function ($1) {
    var temp: number|string = '';
    switch($1){
      case "yyyy": 
        temp = time.getFullYear();
        break;
      case "yy": 
        temp = ("" + time.getFullYear()).slice(-2);
        break;
      case "M": 
        temp = time.getMonth() + 1;
        break;
      case "MM": 
        temp = ("0" + (time.getMonth() + 1)).slice(-2);
        break;
      case "d": 
        temp = time.getDate();
        break;
      case "dd": 
        temp = ("0" + time.getDate()).slice(-2);
        break;
      case "H": 
        temp = time.getHours();
        break;
      case "HH": 
        temp = ("0" + time.getHours()).slice(-2);
        break;
      case "h": 
        temp = time.getHours() % 12;
        break;
      case "hh": 
        temp = ("0" + time.getHours() % 12).slice(-2);
        break;
      case "m": 
        temp = time.getMinutes();
        break;
      case "mm": 
        temp = ("0" + time.getMinutes()).slice(-2);
        break;
      case "s": 
        temp = time.getSeconds();
        break;
      case "ss": 
        temp = ("0" + time.getSeconds()).slice(-2);
        break;
      case "w": 
        temp = ['日', '一', '二', '三', '四', '五', '六'][time.getDay()];
        break;
    }
    return (temp+'');
  });
}

/**
 * Deep Object.assign source to target.
 * @param target
 * @param source
 */
export function deepAssign(...objs:Array<Object>){
  let merged; 
  objs.reduce((target, source)=>{
    for(let item in source){
      if(!(target[item] && is_PlainObject(target[item])) ){
        target[item] = source[item];
      }else{
        deepAssign(target[item], source[item]);
      }
    }
    merged = target;
    return target;
  }, objs[0]); // The third param is to set default value.
  return merged;
}

/**
 * Just assign the item in supplement which not defined in target.
 * If you don't want to override the value of origin Object, supplement is the high performance choice.
 * Not deep mode.
 * @param {*} target 
 * @param {*} supplement 
 * @param {Boolean} strict if counts the null as undefined?
 */
export function objectSupplement<R extends Object, T extends Object> (target: R|null, supplement: T, strict=false) {
  if(!target) return supplement;
  let current: unknown = null;
  for (let item in supplement) {
    current = (target as unknown as T)[item];
    if (strict? current!==undefined: is_Defined(current) )
      continue;
    (target as unknown as T)[item] = supplement[item];
  }
  return target as (R & T);
}

/**
 * Just assign the item in supplement which not defined in target.
 * If you don't want to override the value of origin Object, supplement is the high performance choice.
 * Deep mode by iterate each inner Object.
 * @param {*} target 
 * @param {*} supplement 
 */
export function deepSupplement<R extends Object, T extends Object> (target: R|null, supplement: T) {
  if(!target) return supplement;
  let current: unknown = null;
  for (let item in supplement) {
    current = (target as unknown as T)[item];
    if (is_Defined(current)) {
      if (!is_PlainObject(current as Object)|| !is_PlainObject(supplement[item] as Object)) continue;
      deepSupplement(current as Object, supplement[item]); // The `current` is a reference which could be assigned.
    }
    else
      // current = supplement[item];
      (target as unknown as T)[item] = supplement[item];
  }
  return target as (R & T);
}

/**
 * Assign a method to an object which has not same constructor without change the inner pointer `this`.
 * @param target
 * @param name 
 * @param method 
 */
export function getExportMethod(source:Object, methodName:string){
  DEBUG && false && console.log("getExportMethod:", source, methodName);
  return (...params)=>{
    DEBUG && false && console.log("Execute getExportMethod:", source, methodName);
    return source[methodName](...params);
  }
}

/**
 * Wrap a constructor function into Singleton Mode.
 * Return a closure function which returns the instance.
 * @param func 
 */
export function getSingleton(func){
  var result;
  return function () {
    if (!result) {
      result = new func(arguments);
    }
    return result;
  }
};

/**
 * Throttle methods
 * Return a closure function
 * @param {number} wait the ms time to throttle (Not very precise)
 */ 
export function throttle(handler:Function, wait :number){
  var lastTime = 0;
  return function () {
      var nowTime = new Date().getTime();
      if (nowTime - lastTime > wait) {
        lastTime = nowTime;
        handler.apply(this, arguments);
      }
  }
}

/**
 * Debounce methods
 * Return a closure function
 * @param {number} delay the ms time to throttle
 */ 
export function debounce(handle:Function, delay :number) {
  var timer:number = 0;
  return function () {
      var _self = this,
          _args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
          handle.apply(_self, _args)
      }, delay)
  }
}

/**
 * Advance implementation with both throttle and debounce virtue.
 * Comparing to throttle, if the invoking of function stopped among a period, it will invoke once same at the last invoking like debounce.
 * Here is a flaw that the complemented debounce also have a period lag.
 * If you want a better performance. I recommend you Laction.js: github.com/lozyue/laction.js 
 * @param handle 
 * @param period 
 */
export function throttBounce(handle:Function, period :number){
  var lastTime = 0;
  var timer:number = 0;
  return function () {
      var nowTime = new Date().getTime();
      clearTimeout(timer); // prevent diploid invoke.
      if (nowTime - lastTime > period) {
        lastTime = nowTime;
        handle.apply(this, arguments);
      }else{
        timer = setTimeout(function () {
          handle.apply(this, arguments)
        }, period)
      }
  }
}


/**
 * Just call a function once.
 * Return a closure.
 */
export function once<T extends (...args: [unknown])=>ReturnType<T> > (func: T): T{
  let called = false;
  let value:null| ReturnType<T> = null;
  return function (...params: [unknown]){
    if (!called) {
      called = true;
      return (value = func.apply(this, params) );
    }else
      return value as unknown as ReturnType<T>;
  } as unknown as T;
}

/**
 * Simple deepClone with optional Function clone
 * @param val 
 * @param substituteObj The substitute Object for contact the value while disconnect the reference.
 * @param options
 */
type DeepCloneOptions = {
  cloneFunc: Boolean, // false,
  unpackArray: Boolean, // false,
  substituteObj: Object,
};
export function deepClone(val: any, options: Partial<DeepCloneOptions>= {}) {
  if (is_Array(val)) {
    let interim = val.slice();
    if(options.unpackArray){
      const len = interim.length;
      for(let index=0; index<len; index++){
        interim[index] = deepClone(interim[index], objectSupplement({
          substituteObj: Object.create(null),
        }, options));
      }
    }
    return interim;
  } else if(options.cloneFunc && is_Function(val)){
    return Object.create(val.prototype).constructor;
  } else if(val instanceof Date){
    return new Date().setTime(val.getTime());
  // lag to improve performance.
  } else if (is_PlainObject(val)) {
    var res = options.substituteObj || Object.create(null);
    for (var key in val) {
      res[key] = deepClone(val[key]);
    }
    return res;
  } 
  else{
    return val;
  }
}

/**
 * Provide with a processor accept a list of stuff or single stuff
 * Give it the action to its inner iterator.
 * The original Stuff can not be an Array!
 */
export function arbitraryFree<T> (input: Array<T>|T, func: (a:T, b:number)=>any): Array<any>|any{
  if(is_Array(input) ){
    return (input as Array<T>).map(func);
  } else{
    // callback(item, index)...
    return func((input as T), 0);
  }
}

/**
 * Wrap the stuff with inputs, accepting Array or Non-Array input. 
 * A list of arguments with truth check for condition logical supplement. 
 * Amend on 2021-10-07: Add chief reference protection of the wrappered input.
 *  !!! Warning: The later stuffs will lost its reference. 
 * @param  {...any} inputs 
 * @returns { Array } returns the wrapped array.
 */
export function arbitraryWrap<T> (...inputs: Array<Array<T>|T>): Array<T>{
  const backArray: Array<T> = (is_Array(inputs[0])? inputs[0]: [inputs[0] ]) as T[];
  let item;
  for(let index=1; index<inputs.length; index++){
    item = inputs[index];
    if(!is_Defined(item) ){
      continue;
    }
    if(is_Array(item) ){
      // for(let i=0;i<item.length;i++)
      //   backArray.push(item[i]);
      backArray.splice(backArray.length-1, 0, ...item);
    } else {
      backArray.push(item);
    }
  };
  return backArray;
}

/**
 * Creat an Array with assigned value and the assigned length.
 * @param len 
 * @param value 
 */
export var createArray = <T>(len:number, value:T|null = null):Array<T> => {
  let initArr = new Array(len); // 初始化轨道 
  // 初始化成轨道为空数组
  if( (Array as any).fill)
    initArr.fill(value);
  else
    for(let i=0;i<len;i++) initArr[i] = value; // 兼容ES6以下
  return initArr;
}

/*
 * Delete the Item in an Array, returning the removed item.
 */
export var removeArrayItem = <T>(arr:Array<T>, item:T)=>{
  if (arr.length) { 
    let index = arr.indexOf(item); 
    if (index > -1) { 
      return arr.splice(index, 1)[0]; 
    } 
  } 
  return void 0;
}

/**
 * Move the item in array from raw index to any available target Index.
 * @param arr 
 * @param rawIndex 
 * @param targetIndex 
 * @returns The raw ref of the array.
 */
export var moveArrayItem = <T>(arr:T[], rawIndex: number, targetIndex: number)=>{
  const len = arr.length;
  // Check
  rawIndex = (rawIndex + len)% len;
  targetIndex = Math.abs( (targetIndex + len)% len );

  const item = arr[rawIndex];
  const isBehind = rawIndex <= targetIndex;
  let index=rawIndex;
  if(isBehind){
    for(; index!==targetIndex; index++){
      // move
      arr[index] = arr[index+1];
    }
  } else {
    for(; index!==targetIndex; index--){
      // move
      arr[index] = arr[index-1];
    }
  }
  arr[index] = item;
  return arr;
}

/**
 * 
 * @param {any} value  
 */
export var is_Number = (value :any)=>{
  return value!=='' && value!=null && !isNaN(value);
}

/**
 * Transform the Array similar Object to real Array with high performance.(remove the keys);
 * @param arraySimilar_Object 
 */
export var toTrueArray:(a:{[propName:number]: any})=>Array<any> = (arraySimilar_Object)=>{
  return Array.prototype.slice.call(arraySimilar_Object);
}

export const is_Defined = (v: unknown):Boolean => (v !== undefined && v !== null);
export const is_Array = (obj: unknown):Boolean => (Array.isArray && Array.isArray(obj) || obj instanceof Array || (typeof obj === 'object') && Object.prototype.toString.call(obj).slice(-6,-1)=== 'Array' );
export const is_String = (str: unknown):Boolean => ((typeof str === 'string') && str.constructor == String);
export const is_Function = (obj: unknown):Boolean => (obj instanceof Function);
export const is_Object = (obj: unknown):Boolean => (obj!==null &&(obj instanceof Object || typeof obj === "object"));
export const is_PlainObject = (obj: unknown):Boolean => (Object.prototype.toString.call(obj) === '[object Object]');
export const is_RegExp = (obj: unknown):Boolean => (!!obj && (<Object>obj).constructor === RegExp);
export const is_Promise = (val: unknown):Boolean => {
  return (
    is_Defined(val) &&
    typeof (val as Object)["then"] === "function" &&
    typeof (val as Object)["catch"] === "function"
  );
};

// whether the value is of primitive or not (not a reference type)
export const is_Primitive = (value: any):Boolean => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line 
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

/**
 * Check the below list of variable type to judge empty
 *  - Number => !0 & !NaN
 *  - Object => !{} // by Enumerable property length
 *  - Array => ![]
 *  - Boolean => !false
 *  - string => !''
 *  - isDefined
 * @param val 
 */
export const is_Empty = (val: unknown)=>{
  if(!val) return true;
  if(is_Array(val)){
    return !(val as Array<unknown>).length;
  }else{
    return !Object.keys((val) as Object).length;
  }
}

export {
  getCasualMode, CasualMode,
}
