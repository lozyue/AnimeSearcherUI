/**
 * Utils.js
 * Practical static functions for javascript language programing.
 */

import { DEBUG } from './const';

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
 */
export function objectSupplement(target: Object, supplement: Object) {
  let current = null;
  for (let item in supplement) {
    current = target[item];
    if (is_Defined(current))
      continue;
    target[item] = supplement[item];
  }
  return target;
}

/**
 * Just assign the item in supplement which not defined in target.
 * If you don't want to override the value of origin Object, supplement is the high performance choice.
 * Deep mode by iterate each inner Object.
 * @param {*} target 
 * @param {*} supplement 
 */
export function deepSupplement(target: Object|null, supplement: Object) {
  let current :null | Object= null;
  if(!target) return supplement;
  for (let item in supplement) {
    current = target[item];
    if (is_Defined(current)) {
      if (!is_PlainObject(current)) continue;
      deepSupplement(current, supplement[item]); // The `current` is a reference which could be assigned.
    }
    else
      // current = supplement[item];
      target[item] = supplement[item];
  }
  return target;
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
export function once(func){
  let called = false;
  return function () {
    if (!called) {
      called = true;
      func.apply(this, arguments);
    }
  }
}

/**
 * Simple deepClone with optional Function clone
 */
export function deepClone(val: any, substituteObj :Object = Object.create(null), cloneFunc: Function|Boolean = true) {
  if (is_Array(val)) {
    return val.slice()
  } else if(cloneFunc && is_Function(val)){
    return Object.create(val.prototype).constructor;
  } else if(val instanceof Date){
    return new Date().setTime(val.getTime());
  // lag to improve performance.
  } else if (is_PlainObject(val)) {
    var res = substituteObj;
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
 * @param  {...any} inputs 
 * @returns { Array } returns the wrapped array.
 */
export function arbitraryWrap<T> (...inputs: Array<Array<T>|T>): Array<T>{
  const backArray: Array<any> = [];
  let item;
  for(let index=0; index<inputs.length; index++){
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
export var creatArray = <T>(len:number, value:T|null = null):Array<T> => {
  let initArr = new Array(len); // 初始化轨道 
  // 初始化成轨道为空数组
  if( (Array as any).fill)
    initArr.fill(value);
  else
    for(let i=0;i<len;i++) initArr[i] = value; // 兼容ES6以下
  return initArr;
}

/*
 * Delete the Item in an Array, returning the new Array.
 */
export var removeArrayItem = <T>(arr:Array<T>, item:T)=>{
  if (arr.length) { 
    let index = arr.indexOf(item); 
    if (index > -1) { 
      return arr.splice(index, 1); 
    } 
  } 
}

/**
 * 
 * @param {any} value  
 */
export var is_Number = (value :any)=>{
  return value!=='' && value!=null && !isNaN(value);
  // let is_weakType = (value==1) || (value==0);
  // return !(is_weakType) || (value===1 || value ===0);
}

/**
 * Transform the Array similar Object to real Array with high performance.(remove the keys);
 * @param arraySimilar_Object 
 */
export var toTrueArray:(a:{[propName:number]: any})=>Array<any> = (arraySimilar_Object)=>{
  return Array.prototype.slice.call(arraySimilar_Object);
}

export const is_Defined = (v: any):Boolean => (v !== undefined && v !== null);
export const is_Array = (obj: Object):Boolean => (Array.isArray && Array.isArray(obj) || (typeof obj === 'object') && obj.constructor == Array);
export const is_String = (str: Object):Boolean => ((typeof str === 'string') && str.constructor == String);
export const is_Function = (obj: Object):Boolean => (obj instanceof Function || obj.constructor == Function );
export const is_PlainObject = (obj: null|Object):Boolean => (Object.prototype.toString.call(obj) === '[object Object]');
export const is_RegExp = (obj: Object):Boolean => (obj.constructor === RegExp);
export const is_Promise = (val: any):Boolean => {
  return (
    is_Defined(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
};

// whether the value is of primitive or not
export const isPrimitive = (value: any):Boolean => {
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
 *  - Number => !0
 *  - Object => !{} // by Enumerable property length
 *  - Array => ![]
 *  - Boolean => !false
 *  - string => !''
 *  - isDefined
 * @param val 
 */
export const is_Empty = (val: any)=>{
  if(!val) return true;
  if(is_Array(val)){
    return !val.length;
  }else{
    return !Object.keys(val).length;
  }
}
