/**
 * Helper.js
 * Some helpful functions for Dom and Bom operation.
 */

import { DEBUG } from './const';
import { 
  arbitraryFree, deepSupplement, 
  is_Array, is_Defined, is_Function, 
  objectSupplement, once, removeArrayItem 
} from './util';
import { lyscrollTo } from './modules/lyscroll-to';
import { unstrip } from './manipulate';

export const isInIframe = function(){
  return (window.frames.length !== parent.frames.length)
    || (self.frameElement && self.frameElement.tagName === "IFRAME")
    || ( (top && self) && top.location !== window.location && top!==self)
}

export const toggleClass = function(ele: HTMLElement, className: string){
  if(ele.classList.toggle){
    ele.classList.toggle(className);
  }
  // capability.
  else if(ele.classList.contains(className))
    ele.classList.remove(className);
  else
    ele.classList.add(className);
}


/**
 * Revoke the action on receiving click event happened on BODY Element.
 * Here is a global proxy to elevate the performance.
 */
export const clickToAction = (function(mount:HTMLElement){
  const invokeQueue:Array<Function> = [];
  mount.addEventListener('click', (event)=>{
    invokeQueue.forEach(func=>{
      func(event);
    });
  }, false); // on event bubbled.
  return (invoke: Function, remove = false)=>{
    if(remove) 
      removeArrayItem(invokeQueue, invoke);
    else invokeQueue.push(invoke);
  }
})(document.body);

/**
 * Export the data as a file to user's disk.
 * Referer: https://github.com/kennethjiang/js-file-download
 * MimeType: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 * @param data 
 * @param filename Custome the target filename
 * @param mime Optional.
 * @param bom Optional
 */
export function fileExport(data :unknown, filename :string, mime :string, bom:unknown = null) {
  var blobData = (is_Defined(bom) ? [bom, data] : [data]) as BlobPart[];
  var blob = new Blob(blobData, { type: mime || 'application/octet-stream' });
  if (typeof (window.navigator as any).msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    (window.navigator as any).msSaveBlob(blob, filename);
  }
  else {
    var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    // Fixes "webkit blob resource error 1"
    setTimeout(function () {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 196);
  }
}

/**
 * Return a closure function to get the justified element boundingClientRect with high performance.
 * Usage:
 *   var rectRest = getBoundRect(); // initialize. Get the closure.
 *   var rectObj = rectRest(); // Get an object. Every time reset the window.
 * simplely, you can only do calling the `rectRest(true)` function. The `rectValue` which is called by reference will be auto updated.  
 */
export var getBoundRect = function ($el: HTMLElement) {
  var boundingRect = Object.create(null);
  return (preventCache = false) => {
    if (preventCache) {
      // Object.assign(boundingRect, $el.getBoundingClientRect()); // Object.keys($el.getBoundingClientRect()) => {}
      let clientRect = $el.getBoundingClientRect();
      for (let key in clientRect) {
        if (!is_Function(clientRect[key]))
          boundingRect[key] = clientRect[key];
      }
    }
    return boundingRect;
  }
};


/**
 * To connect URL query Object to the specified URL.
 * @param { string } url 
 * @param { Object } paramObj
 * @returns { string }
 */
export const addURLModifier = (url: string, paramObj: Object)=>{
  let params = '', index = 0;
  for(let item in paramObj){
    if(paramObj[item]===null|| paramObj[item]==='') continue;

    if(index!==0){
      params += '&';
    }
    params += `${encodeURIComponent(item)}=${encodeURIComponent(paramObj[item])}`;

    index++;
  }
  // Encode URL
  url = encodeURI(url);
  const questionPosi = url.lastIndexOf("?");
  const slashPosi = url.lastIndexOf("/");

  if(!params.length) return url; // raw
  if(questionPosi > slashPosi){
    // end with '?'
    if(questionPosi===url.length - 1) 
      return url + params; 
    return unstrip(url, '&', 2) + params;
  }
  // Not include ?
  else{
    return url + '?' + params;
  }
}
DEBUG&& (window["addURLModifier"] = addURLModifier);


/**
 * Get the host name of specific URL
 * @param target 
 * @returns 
 */
export function getHostName(target = document.URL, withPrefix=false){
  let index = target.indexOf("://");
  if(index>-1)
    target = target.slice(index+3);
  else return target;

  index = target.indexOf("/");
  if(index>-1){
    target = target.slice(0, index);
  } else return target;

  if(withPrefix) return target;
  index = target.indexOf(".");
  if(index>-1)
    target = target.slice(index+ 1);
  return target;
}

/**
 * Parse the target URL and return its query as key-value Object
 * @param { string } url
 */
export function getURLQueries(url: string){
  // Split
  url = url.slice( url.lastIndexOf("/") );
  let check = url.indexOf("?") + 1;
  if(check <= 0) return null;
  url = url.slice( check );
  const queriesList = url.split("&");

  const queries = {};
  queriesList.map((item)=>{
    const itemCheck = item.indexOf("=");
    if(itemCheck < 0) return;
    let key = item.slice(0, itemCheck);
    if(!key) return;
    queries[key] = decodeURIComponent(item.slice(itemCheck+1) );
  });
  return queries as any;
}

/**
 * Get the hash path of current URL
 * For example: 
 *  http://localhost/#/user/space/like?s=aaa
 *  => '/user/space/like?s=aaa'
 * Set withQuery false to remove the query str.
 */
export function getHashPath(target = document.URL, withQuery = true){
  let valid = target.indexOf("#/");
  let path = '';
  if (valid > -1){
    // if find, sub next the find. or return the raw string.
    const subIfFindLast = (target, search)=>{
      return target.slice( (target.lastIndexOf(search)+ target.length+1)% target.length );
    }
    if(!withQuery){
      // not completely. ignored the current path.
      const subToLastSlash = subIfFindLast(target, "/");
      const queryStart = (subToLastSlash.indexOf("?") + subToLastSlash.length + 1)% (subToLastSlash.length+2);
      path = target.substring(valid + 1, queryStart + 1 + (target.length - subToLastSlash.length));
    }
    else{
      path = target.slice(valid + 1);
    }
  }
  return path;
}

/**
 * Get current page addressed
 * It was like neither the dominate nor url
 * Test its result in file: protocol and you will see.
 */
export const getCurrentAddress = ()=>{
  const loc = window.location;
  let start = loc.href.lastIndexOf(loc.host + loc.pathname);
  if(start<0) return '';
  return loc.href.slice(0, start + loc.host.length + loc.pathname.length - 1);
}

/**
 * Test current page protocal is file:/// or not. 
 */
export var isFileProtocol: () => Boolean = () => {
  return window.location.protocol.indexOf('file:') > -1;
}

/**
 * JS and CSS insert helper
 * to dynamicly execute css by add tag
 */
export function inject_style(text: string, url = '', props = {}, append = false) {
  var styleTag = url ? 'link' : "style";
  var styles = document.getElementsByTagName(styleTag)[0];
  var newStyle = document.createElement(styleTag);
  if (url){
    objectSupplement(props, {
      rel: "stylesheet",
    });
    newStyle.setAttribute('href', url);
  }
  else
    newStyle.textContent = text;
  for (let k in props)
    newStyle.setAttribute(k, props[k]);
  if (styles){ // `?.` ts optional chains
    if(append)
      styles.parentNode?.append(newStyle);
    else
      styles.parentNode?.insertBefore(newStyle, styles);
  }
  else
    document.head.appendChild(newStyle);
  return newStyle;
}

export function inject_script(text: string, url = '', props = {}, append = false) {
  var scripts = document.getElementsByTagName("script")[0];
  var newScript = document.createElement("script");
  if (url) newScript.src = url;
  else
    newScript.textContent = text;
  for (let k in props)
    newScript.setAttribute(k, props[k]);
  if (scripts){
    if(append)
      scripts.parentNode?.append(newScript);
    else
      scripts.parentNode?.insertBefore(newScript, scripts);
  }
  else
    document.body.appendChild(newScript);
  return newScript;
}

/**
 * Add a scroll event listener and wrapper the event Object on callback with `upward` & `downward` indicator.
 *  And the passive modifier is setted to true on default.
 * @param $el The element to listening the scroll event.
 * @param scrollFunc The callback function.
 * @returns {Function} handle  For removeMouseScrollListener; 
 */
const WheelSupport = "onwheel" in document.createElement("div") ? "wheel" : // Modern browser
document.onmousewheel !== undefined ? "mousewheel" : // Webkit、IE
  "DOMMouseScroll" // Old Version of firefox.
;
type WrappedEvent = {
  upward: Boolean,
} & Event;
export function addMouseScrollListener($el: Window|HTMLElement, scrollFunc: (eve:WrappedEvent)=>unknown, onCatcheMode=false, passive=true, once=false) {
  var wrapperHandle = (eve: Event) => {
    eve = eve || window.event;
    const eveCopper = eve as any;
    if(eveCopper.deltaY){
      if(eveCopper.deltaY > 0)
        eve['upward'] = false;
      else
        eve['upward'] = true; // add a property.
    }
    else if (eveCopper.wheelDelta) {
      if (eveCopper.wheelDelta > 0)
        eve['upward'] = true; // add a property.
      else
        eve['upward'] = false;
    } else if (eveCopper.detail) {
      if (eveCopper.detail < 0)
        eve['upward'] = true; // add a property.
      else
        eve['upward'] = false;
    }
    return scrollFunc.call(this, eve as WrappedEvent);
  };
  $el.addEventListener(WheelSupport, wrapperHandle, {
    capture: onCatcheMode, // 改为捕获方式传递，使盒子 wrap 层子元素得到响应。（最先触发事件都是wrap层）
    passive: passive, // If default true, meanwhile the prevent Default should be disabled.
    once: once,
  });
  ($el as any).onmousewheel = wrapperHandle;
  return wrapperHandle; // This is the handler
}

export function removeMouseScrollListener($el: Window|HTMLElement, handle: any, onCatcheMode = false) {
  $el.removeEventListener(WheelSupport, handle, onCatcheMode);
  $el["onmousewheel"] = null;
}

export function addScrollListener($el: Window|HTMLElement, scrollFunc: (eve:Event)=>unknown, onCatcheMode=false, passive=true, once=false) {
  $el.addEventListener('scroll', scrollFunc, {
    capture: onCatcheMode, // 改为捕获方式传递，使盒子 wrap 层子元素得到响应。（最先触发事件都是wrap层）
    passive: passive, // If default true, meanwhile the prevent Default should be disabled.
    once: once,
  });
  return scrollFunc; // This is the handler
}

export function removeScrollListener($el: Window|HTMLElement, handle: any, onCatcheMode = false) {
  $el.removeEventListener('scroll', handle, onCatcheMode);
}
/**
 * Fullscreen helper
 * Maybe to do :
 * Providing with two modes:
 *     Web fullscreen: Just take up all the window views.
 *     Browser fullscreen: Real fullscreen, take up all the screens.
 * Use asserts to fix the property access in `Document`.  (document as any)
 */
export function toggle_fullscreen(ele: HTMLElement, mode = 'browser') {
  if (isFullScreen(ele)) {
    cancel_fullscreen(ele);
  } else {
    request_fullscreen(ele, mode);
  }
}
function isFullScreen(ele: HTMLElement | null = null) {
  const BROWSER_FULL = document.fullscreenElement || (document as any).mozFullScreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement;
  const WEB_FULL = ele && ele.classList.contains('ly-browser-fulled');
  return BROWSER_FULL || WEB_FULL;
}
function request_fullscreen(ele: HTMLElement, mode = 'browser') {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if ((ele as any).mozRequestFullScreen) {
    (ele as any).mozRequestFullScreen();
  } else if ((ele as any).webkitRequestFullscreen) {
    (ele as any).webkitRequestFullscreen();
  } else if ((ele as any).webkitEnterFullscreen) {
    // Safari for iOS
    (ele as any).webkitEnterFullscreen();
  } else if ((ele as any).webkitEnterFullScreen) {
    (ele as any).webkitEnterFullScreen();
  } else if ((ele as any).msRequestFullscreen) {
    (ele as any).msRequestFullscreen();
  }
  ele.classList.add('lybrowser-fulled');
}
function cancel_fullscreen(ele: HTMLElement) {

  if ((document as any).cancelFullScreen) {
    (document as any).cancelFullScreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitCancelFullScreen) {
    (document as any).webkitCancelFullScreen();
  } else if ((document as any).webkitCancelFullscreen) {
    (document as any).webkitCancelFullscreen();
  } else if ((document as any).msCancelFullScreen) {
    (document as any).msCancelFullScreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
  ele.classList.remove('lybrowser-fulled');
}

export function onceClassAnimation(animeClasses: string|string[], target: HTMLElement, delegate: HTMLElement|null=null, autoRemove = true){
  let handle = function(eve){
    arbitraryFree(animeClasses, (aClass)=>{
      eve.target.classList.remove(aClass);
    });
    if(autoRemove){
      (delegate|| target).removeEventListener('animationend', handle);
    }
  };
  (delegate|| target).addEventListener('animationend', handle);
  arbitraryFree(animeClasses, (aClass)=>{
    (delegate|| target).classList.add(aClass);
  });
}


/**
 * A multi invoke animation with reset controll.
 *  For vue director.
 * @param animeClasses 
 * @param target 
 * @param delegate 
 * @param autoRemove 
 * @param withReset 
 * @returns A closure function for later invoke.
 */
export function multiClassAnimation(animeClasses: string|string[], target: HTMLElement, withReset = false){
  let handle = function(eve, isRemove=true){
    arbitraryFree(animeClasses, (aClass)=>{
      if(isRemove)
        eve.target.classList.remove(aClass);
      else
        target.classList.add(aClass);
    });
    // if(allowRemove && autoRemove){
    //   (delegate|| target).removeEventListener('animationend', handle);
    // }
  };
  
  // Add it!
  (target).addEventListener('animationend', handle);
  
  // arbitraryFree(animeClasses, (aClass)=>{
  //   (target).classList.add(aClass);
  // });

  return function($eve){
    if(withReset){
      // Reset the animation
      handle({target:(target)}, true);
    }
    handle({target:(target)}, false);
  }
}


/**
 * Document ready functions with compatibility.
 */
export var documentReady = (function () { // use js closure to return `whenReady` function
  var funcs: Function[] = [];
  var ready = false;
  function handler(e) {
    if (ready)
      return;
    if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
      return;
    }

    for (var i = 0; i < funcs.length; i++) {
      funcs[i].call(document);
    }
    ready = true;
    funcs = [];
  }
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false);
    document.addEventListener('readystatechange', handler, false); //IE9+
    window.addEventListener('load', handler, false);
  } else if ((document as any).attachEvent) {
    (document as any).attachEvent('onreadystatechange', handler);
    (window as any).attachEvent('onload', handler);
  }
  return function whenReady(fn) {
    if (ready) {
      fn.call((document as any));
    }
    else {
      funcs.push(fn);
    }
  }
})();

// Preparation for `getEventDelegate` and `traceTopMatch`.
const matchFunc = (target: HTMLElement|Node&ParentNode, matchPattern: string|Function, ...params)=>{
  if(is_Function(matchPattern)){
    return (matchPattern as Function)(target, ...params);
  }
  else if(target["matches"])
    return (target as HTMLElement).matches(matchPattern as string);
  else if(target === document)
    return false;
  else
    throw new Error(`[traceTopMatch]: the node ${target} without "matches" method is not distinguished \n Whose nodetype is ${target.nodeType}`);
};
/**
 * The match multi situation at once.
 * This is the upgrated version of tranceTopMatch.
 *  Except of the uncustomizable `match` params. (can be only string)
 *  And the searchDepth cannot be appointed respectively.
 * That's for utility consideration. 
 *  You should apply it with suitable and optimismed Dom structures
 *    and with increasing sequence.
 * It will invoke all the notMatch callback before it matched!
 * @param {Boolean} findAll It will stop at the first match when it is false. 
 */
export const traceMultiTopMatch = (targetEle: HTMLElement|Node&ParentNode, matchParcel: Record<string, MatchInvoke | [MatchInvoke, MatchInvoke]>, maxSearchDepth = 0, findAll = false)=>{
  for(let matchStr in matchParcel){
    var matched, notMatched: null| MatchInvoke = null;
    if(is_Array (matchParcel[matchStr])){
      [matched, notMatched] = matchParcel[matchStr] as [MatchInvoke, MatchInvoke];
    } else{
      matched = matchParcel[matchStr];
    }
    let tempElement = targetEle;
    for(let times=0; (!maxSearchDepth || times<maxSearchDepth); times++){
      if(matchFunc(tempElement, matchStr)){
        // no `this` pointer in invoke function.
        matched(tempElement as HTMLElement);
        if(!findAll)
          return;
        else
          break;
      }
      // `this` is appointed to the wrapper Element. When it is in vue, this is the vue instances.
      if(!tempElement.parentNode){
        DEBUG && console.warn("[traceTopMatch]: The target Element has no parentNode. Search was terminated! \nLimit the maxSearchDepth can prevent and help with performance!", tempElement);
        // invoke the not match
        if(notMatched){
          notMatched(tempElement as HTMLElement);
        }
        return;
      }
      tempElement = tempElement.parentNode;
    } // for loop end.
    if(notMatched){
      notMatched(tempElement as HTMLElement);
    }
  } // for loop end.
}

/**
 * Simply like the `getEventDelegate` function.
 * But it is a process which only cares target Element and won't keep the pointer `this`.
 * Which is not provided by user.
 * Besides it has the return value.
 * @param {number} maxSearchDepth The maximum limit times of trace search. 0 equal no limitation.
 * @returns {null | unknown} return the callback value. And default is null.
 */
type MatchInvoke = (el:HTMLElement)=>unknown;
type MatchPattern = string | ((target: HTMLElement, times?: number)=>Boolean);
export const traceTopMatch = (targetEle: HTMLElement|Node&ParentNode, invoke: MatchInvoke | [MatchInvoke, MatchInvoke], matchPattern: MatchPattern, maxSearchDepth = 0)=>{
  let matched, notMatched: null| MatchInvoke = null;
  if(is_Array (invoke)){
    [matched, notMatched] = invoke as [MatchInvoke, MatchInvoke];
  } else{
    matched = invoke;
  }

  for(let times=0; (!maxSearchDepth || times<maxSearchDepth); times++){
    if(matchFunc(targetEle, matchPattern, times)){
      // no `this` pointer in invoke function.
      return matched(targetEle as HTMLElement);
    }
    // `this` is appointed to the wrapper Element. When it is in vue, this is the vue instances.
    if(!targetEle.parentNode || targetEle.parentNode===document.body){
      false && DEBUG && console.warn("[traceTopMatch]: The target Element has no parentNode. Search was terminated! \nLimit the maxSearchDepth can prevent this and help with performance!", targetEle);
      // invoke the not match
      return notMatched && notMatched(targetEle as HTMLElement);
    }
    targetEle = targetEle.parentElement|| targetEle.parentNode;
  } // for loop end.
  // default failed！
  return notMatched && notMatched(targetEle as HTMLElement);
}

/**
 * For element Event delegation.
 * @returns A closure function for delegate event listener.
 * @param invoke The actions to do when matched; Use the [match, notMatched] array for complex needs.
 * @param matchPattern The manually Boolean match function or a css query string.
 * @param maxSearchDepth If target source of current Event is not matched, it will try to matched its parent.
 *  The iterate counts is setted by this param.
 */
type WhenInvoke = (target: Event, el:HTMLElement, ...params)=>unknown;
export function getEventDelegate(invoke: WhenInvoke | [WhenInvoke, WhenInvoke], matchPattern: MatchPattern, maxSearchDepth = 0){
  let matched, notMatched: null| WhenInvoke = null;
  if(is_Array (invoke)){
    [matched, notMatched] = invoke as [WhenInvoke, WhenInvoke];
  } else{
    matched = invoke;
  }
  // Back an closure which could have the this pointer.
  return function($event: Event, ...params){
    // 兼容性处理
    var eve = $event || window.event;
    var targetEle: HTMLElement|Node&ParentNode = (eve.target || eve.srcElement) as HTMLElement;

    for(let times=0; (!maxSearchDepth || times<maxSearchDepth); times++){
      if(matchFunc(targetEle, matchPattern, times)){
        // The inner this is pointed to the matched targetEle.
        // invoke.call(targetEle, eve);
        // If it was used in vue, the this will pointed to the instance
        return matched.call(this, eve, targetEle as HTMLElement, ...params);
      }
      // `this` is appointed to the wrapper Element. When it is in vue, this is the vue instances.
      if(!targetEle.parentNode || (this && (this===targetEle || this.el===targetEle ) ) ){
        DEBUG && console.warn("[getEventDelegate]: The target Element has no parentNode. Search was terminated! \nLimit the maxSearchDepth can prevent and help with performance!", targetEle);
        // invoke the not match
        return notMatched && notMatched.call(this, eve, targetEle as HTMLElement, ...params );
      }
      targetEle = targetEle.parentNode;
    } // for loop end.
    // when it has a collision to maxSearchDepth, it was failed with no return.
    return notMatched && notMatched.call(this, eve, targetEle as HTMLElement, ...params);
  }
}

/**
 * Copper Interceptor
 * semi-manufactured function. shows how to transform to upper.
 * @param ele HTMLELENT
 * refer: https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html
 */
export function copyInterceptor(ele: HTMLElement) {
  ele.addEventListener('copy', (event) => {
    const selection = document.getSelection() || '';
    if (!event.clipboardData) return;
    event.clipboardData.setData('text/plain', selection.toString().toUpperCase());
    event.preventDefault();
  });
}

/**
 * Copy to the clipboard for modern browser.
 * Only text type support.
 */
export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error(`Failed to copy ${text} to clipboard.`, err);
  }
}

export async function copyToClipboard(options: { type: string, value: any }) {
  if (!(navigator.clipboard as any).write) {
    console.warn("[write] method is not supported in current browser.");
  }
  try {
    await (navigator.clipboard as any).write(options.value);
  } catch (err) {
    console.error(`Failed to copy ${options.value} to clipboard.`, err);
  }
}

/**
 * Copy to the clipboard for compatible browser.
 * 
 */
export function copyToClipboard_compatible(value: string) {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', value);
  document.body.appendChild(input);
  input.setSelectionRange(0, input.value.length);
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    DEBUG && console.log('复制成功');
  }
  document.body.removeChild(input);
}

export {
  lyscrollTo,
}
