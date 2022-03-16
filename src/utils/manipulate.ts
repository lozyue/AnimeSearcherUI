/**
 * Some particular JavaScript handles for this projects.
 * Functions in this file would Not be supplied to the interfaces.
 */

import { is_Array, is_PlainObject, objectSupplement } from './util';

/**
 * A class for cancelable asynchronized manipulations. 
 * new CancelableAction();
 * #Methods:   
 *  asyncInvoke
 *  addAction
 */
import md5 from './modules/md5.js';
import { GetCancelableAction } from './modules/cancelable-action';
import { LatencyLoader } from './modules/latency-loader';
import { statistics } from './modules/statics';

/**
 * The custom merge process for Lycabinet's option `customMerge`.
 * Set this to auto merge arrays includes Object-Array with De-duplicate merge.
 * The sort of merge result is origin first and in-place update.
 */
export const getCustomMergeConfig = (ObjArrMergeKey: string|string[])=>{
  return (source, target)=>{
    if(
      Array.isArray(source) // && source.length 
      && Array.isArray(target)
    ){
      // Found Object-Array
      if( is_PlainObject(source[0]) ){
        // De-duplicate merge as key prop setted on ObjArrMergeKey like: `name`;
        let item;
        for(let index=0;index<target.length;index++){
          item = target[index];
          let find = 0;
          let origin;
          for(; find<source.length; find++){
            origin = source[find];
            // Check redundant.
            if(is_Array(ObjArrMergeKey) ){
              let onMatch = false;
              for(let index=0; index<ObjArrMergeKey.length; index++){
                if(origin[ObjArrMergeKey[index] ] === item[ObjArrMergeKey[index] ]){
                  onMatch = true;
                  break;
                }
              }
              if(onMatch) break;
            }
            else if(origin[ObjArrMergeKey as string] === item[ObjArrMergeKey as string])
              break;
          }
          source[find] = item;
        }
        return source;
      }else{
        // De-duplicate merge as normal data-type;
        let item;
        for(let index=0;index<target.length;index++){
          item = target[index];
          let find = 0;
          for(; find<source.length; find++){
            // Check redundant.
            if(source[find] === item)
              break;
          }
          if(source.length===find)
            source[find] = item;
        }
        return source;
      }
    }else
      return target;
  };
}

/**
 * To apply actions once document visibility change 
 */
type VisibilityChangeOptions = {
  onHidden: Function,
  onResume: Function,
};
export const addVisibilityChangeAction = (function(){
  let hiddenProp, visibilityChangeEvent;
  if (typeof document.hidden !== 'undefined') {
    hiddenProp = 'hidden';
    visibilityChangeEvent = 'visibilitychange';
  } else if (typeof document["msHidden"] !== 'undefined') {
    hiddenProp = 'msHidden';
    visibilityChangeEvent = 'msvisibilitychange';
  } else if (typeof document["webkitHidden"] !== 'undefined') {
    hiddenProp = 'webkitHidden';
    visibilityChangeEvent = 'webkitvisibilitychange';
  }

  const hiddenQueue: Function[] = [];
  const resumeQueue: Function[] = [];

  document.addEventListener(visibilityChangeEvent, () => {
    if (document[hiddenProp]) {
      hiddenQueue.forEach((action)=>{
        action();
      });
    } else {
      // Execute asynchronously to prevent animation redundant. 
      setTimeout(()=>{
        resumeQueue.forEach( (action)=>{
          action();
        })
      }, 0);
    }
  }, false);

  return (options: VisibilityChangeOptions)=>{
    if(options.onHidden){
      hiddenQueue.push(options.onHidden);
    }
    if(options.onResume){
      resumeQueue.push(options.onResume);
    }
  };
})();

/**
 * Add mobile screen lock support
 * see: https://www.w3.org/TR/screen-orientation/#dom-orientationlocktype-portrait
 *      https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/orientation
 */
export function addScreenLockSupport(onFull:(subs:Function)=>any, onCancel:(subs:Function)=>any, animeTemp){
  // check support first
  if(!screen || !screen.orientation|| !screen.orientation.lock){
    console.error("`window.screen` is not supported!");
    return false;
  }
  const orientation = (screen.orientation || {}).type || (screen as any).mozOrientation || (screen as any).msOrientation;
  let locked = false;

  const lockHandle = ()=>{
    try{
      // Lock the orientation both landscape-primary and landscape-secondary.
      screen.orientation.lock("landscape").then(()=>{
        locked = true;
      }).catch((err)=>{
        console.error(err);
      });
    } catch (err){
      console.error(err);
    }
  }
  const unlockHandle = ()=>{
    try{
      if(locked && (animeTemp["isMobile"]|| animeTemp["isTablet"]) ){
        screen.orientation.unlock();
        locked = false;
      }
    } catch (err){
      console.warn(err);
    }
  };
  onFull(lockHandle);
  onCancel(unlockHandle);
  return {lockHandle, unlockHandle};
}


/**
 * Use setTimeout to countdown in repeating the working
 */
type CountDownOptions = {
  count: number, // The numbers to countdown.
  basement: number, // The countdown rate. Unit is ms. default: 1000
  action: (count:number, cancel:Function)=>any,
  done: Function
}
export function countDown(options: Partial<CountDownOptions>){
  objectSupplement(options, {
    count: 3, // The numbers to countdown.
    basement: 1000, // The countdown rate. Unit is ms. default: 1000
    action: new Function(),
    done: new Function(),
  });
  options.count = ~~(options.count as any);
  let { count, basement, action, done } = options as CountDownOptions;
  const repeat = ()=>{
    count--;
    action(count, ()=>{
      clearTimeout(handle);
    });
    if(count === 0){
      done();
    }else
      handle = setTimeout(repeat, basement);
  }
  let handle = setTimeout(repeat, basement);
}


/**
 * Return whether target is latest than current (target > current).
 * @param currentVersion the version currently in publicInfos
 * @param targetVersion the latest versions get from cloud  
 * IF the dot splitted version weight is the same，this function will compare the length of non-numerical chars.
 *  the shorter is considered the latest:
 * 1.3.1 > 1.1.1, 1.3.1beta > 1.3.1alpha, 1.13.1-beta2 > 1.13.1-alpha3 
 * if the length of non-numerical chars is equal, the next will consider there summary of the numerical chars.
 * 1.3.1-beta2 > 1.3.1-beta1, 1.3.1alpha>1.3.1alpha1
 *  // warning: 1.3.1-beta3 < 1.3.1-beta11 // already fixed!
 */
export function checkVersion(currentVersion:String, targetVersion:String){
  // tag_name:'1.0.0beta',
    
  // 倒序按照.的个数权重来相加 只支持.分割符  一个 . 后接一个或多个有效数字字符
  function weightSum(countStr){
    var mark = 0;
    countStr.replace(/[·-\s]/g, '').split('.').forEach(function(v,i,arr){
      mark += parseInt(v) * Math.pow(10, arr.length - i); // reverse sumary.
    });
    return mark;
  }
  // consistent 设置为True时 遇到其他字符后面就全部舍弃,类似parseInt
  function getInsertedNumbers(mixedTargetStr, consistent=true, sum=false){
    var result;
    mixedTargetStr=mixedTargetStr.replace(/\s/g,''); // 删除空格
    if(sum) result=0;
    else result='';
    for(let i=0;i<mixedTargetStr.length;i++){
      if(sum){
        result=result + 10 * (!isNaN(mixedTargetStr[i]) ? parseInt(mixedTargetStr[i]) : 0) ;
        continue;
      }
      if( !isNaN(mixedTargetStr[i]) || mixedTargetStr[i]==='·' || mixedTargetStr[i]===".") result+=mixedTargetStr[i];// 是 数字 . · 就加上去
      else if(consistent) break; // 
    }
    return result;
  };

  // Compare the main version
  var currentMainMark = weightSum( getInsertedNumbers(currentVersion, true, false) ),
      targetMainMark = weightSum( getInsertedNumbers(targetVersion, true, false) );
  // Main version diffs
  if(currentMainMark!==targetMainMark){
    return targetMainMark > currentMainMark;
  }
  // compare the string length
  const CurrentLenMark = targetVersion.replace(/[.\s·-\d]+/g,'').length,
    TargetLenMark = currentVersion.replace(/[.\s·-\d]+/g,'').length;
  if(CurrentLenMark !== TargetLenMark)
    return CurrentLenMark < TargetLenMark; // the shorter the latest.
  // compare the minor version
  const CurrentMinorMark = getInsertedNumbers(currentVersion,false,true),
      TargetMinorMark = getInsertedNumbers(targetVersion,false,true)
  if(CurrentMinorMark !== TargetMinorMark){
    return TargetMinorMark > CurrentMinorMark;
  }
  else {
    return false;
  }
};

/**
 * Deep Object.assign a source to a target.
 * You can add filter by including and excluding params.
 * The assign is deep, but the filter work only on surface!
 * @param target
 * @param source
 * @param include A list of key name of the including source property. Null is all include.
 * @param exclude A list of key name of the excluding source property. Vacant Array means no excludings
 */
export function filterAssign(target: Object, source: Object, include:null|Array<string>=null, exclude: string[]=[]){ 
  const filter = (item)=>{
    let isInclude = true, isExclude = false;
    if(include){
      isInclude = include.indexOf(item) > -1;
    }
    isExclude = exclude.indexOf(item) > -1;
    return isExclude || !isInclude;
  }
  for(let item in source){ // Reflect.has(source, item);
    if(!(target[item] && is_PlainObject(target[item])) ){
      if( filter(item) )
        continue;
      target[item] = source[item];
    }else{
      filterAssign(target[item], source[item]);
    }
  }
  return target;
}

/**
 * Segment an number to get a random middle side range.
 * For example: (60, 0.8) => 48 ~ 12 ; // random
 */
export var segmentNumber = (num :number, rangeTop: number)=>{
  return num/2 + (rangeTop-0.5) *(num *(Math.random()-0.5));
}




/**
 * Get the brower type and check it.
 */
export function browserChecker(){}

/**
 * Parse the URL and get back the whole param or certain param value by key.
 * @param sUrl 
 * @param sKey optional
 */
export var getUrlParam:(a:string, b:string)=>{}|string = (sUrl, sKey='')=>{
  var result = {};
  sUrl.replace(/(\w+)=(\w+)(?=[&|#])/g, (ele, key, val)=>{
    if (!result[key]) {
      result[key] = val;
    } else {
      var temp = result[key];
      result[key] = [].concat(temp, val);
    }
    return val; // no changes
  })
  if (!sKey) {
    return result;
  } else {
    return result[sKey] || '';
  }
}

/**
 * Accept a file size of bytes and return a readable view string.
 * @param number 
 */
export function viewFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

/**
 * Transform the Float second time to read-friendly `xx:xx` type string
 * 将时间点 转化为 00:00:00 的格式，用于视频时间长度转化
 */
export const formatDurationTime = (currentTime)=>{
  currentTime = ~~currentTime;
  let seconds = currentTime%60,
      minutes = ~~(currentTime/60)%60,
      hours = ~~(currentTime/3600);
  return `${currentTime>3600 
    ? (hours<10? ('0'+hours): hours) + ':' : ''}${minutes<10
      ?('0'+minutes): minutes}:${seconds<10?
        ('0'+seconds): seconds}`;
};


/**
 * Get a list of path string by provide the relative path with provided relativeRoot path.
 * The first element in the `pathes` Array is root path. 
 * Support '../', './', '/' token.
 * And also you can set the default relative path as root.
 * @param pathes 
 */
export function resolve_path(...pathes: Array<string>){
  var rootPath = strip(pathes[0], '/', 2);
  // arrange path to array
  const pathSegmentList = [rootPath];
  let len = 0;
  pathes.forEach( (item, index)=>{
    // Jump the first one
    // if(index===0) return true;
    item = unstrip(item, '/', 2); // amend the end of the string
    len = item.length;
    let buffer = '', 
        tag = -1; // tag:0 => '/'; tag:1 => './'; tag:2 => '../'; tag:3 => '\w+'
    for(let i = 0; i<len; i++){
      switch(item[i]){
        case '.':
          tag += 1;
          buffer += '.';
          break;
        case '/':
          tag += 0;
          buffer += '/';

          // end case
          if(tag !== 3){ // the slash is the beginning of a path. 
            pathSegmentList.splice(1); // reset to root path.
          }
          pathSegmentList.push(buffer);
          buffer = ''; tag = -1;
          
          break;
        default :
          tag = 3;
          buffer += item[i];
          break;
      }
    }; // for parser end.
  }); // forEach loop end.

  // combine the path
  const initialCumulation = [pathSegmentList[0] ];
  // let preCumulation = initialCumulation; // save the pre loop value.
  let resolved = pathSegmentList.reduce((cumulation, current, index, arr)=>{
    if(index===0) return cumulation;
    switch(current){
      case './':
        // cumulation += '';
        break;
      case '../':
        cumulation.pop();
        break;
      default :
        cumulation.push(current);
        break;
    }
    // preCumulation = cumulation;
    return cumulation;
  }, initialCumulation).join('');
  // Keep the status of the post-slash in last path.
  return pathes[pathes.length -1].slice(-1)==='/'? resolved: strip(resolved, '/', 2);
}


/**
 * Receive a list of pathes with absolute path `/[path]` or relative path `./[path]`
 * Connect one by one. 
 * Do not support back `../` terms
 * The first param is considered as root path with pre-slash preserved
 * @param  {Array<string>} paths 
 */
export function conjunct_path(...paths :Array<string>){
  var rootPath = strip(paths[0], '/', 2);
  const RearIndex = paths.length - 1;
  return paths.reduce((cumulation, current, index, arr)=>{
    if(index===0) return cumulation; // jump out
    // conjunct by sequence
    if(current.slice(0, 2)==='./'){
      current = current.slice(1); // remove dot '.'
      cumulation += strip(current, '/', !paths[0]? 0: 2);
    }
    // reset to the root path
    else if(current.slice(0, 1) === '/'){
      cumulation = rootPath + strip(current, '/', !paths[0]? 0: 2);
    }
    // conjunct by sequence
    else{
      // Preserve the slash of last path.
      cumulation += (cumulation?'/':'') + (index===RearIndex? current: strip(current,'/',2) );
    }
    return cumulation;
  }, rootPath);
}

/**
 * Reduce the chars located in the head and the tail of the string
 * @param {string} str 
 * @param {string} quote A string which length should be shorten than `str`.
 * @param {int} mode  0: head & tail, 1: only head, 2: only tail
 */
export function strip(str :string, quote =' ', mode :Number=0) :string{
  let len = quote.length;
  // rail
  if(mode !== 1 && str.slice( -len ) === quote){
    str = str.slice(0, str.length - len);
  }
  // head
  if(mode !== 2 && str.slice(0, len) === quote){
    str = str.slice(len);
  }
  return str;
}

/**
 * Complement the chars located in the head and the tail of the string if it is not matched.
 * @param {string} str 
 * @param {string} quote A string which length should be shorten than `str`.
 * @param {int} mode  0: head & tail, 1: only head, 2: only tail
 */
export function unstrip(str :string, quote =' ', mode :Number=0) :string{
  let len = quote.length;
  // rail
  if(mode !== 1 && str.slice( -len ) !== quote){
    str += quote;
  }
  // head
  if(mode !== 2 && str.slice(0, len) !== quote){
    str = quote + str;
  }
  return str;
}

/**
 * Compute the hash number of a string.
 * @param str 
 */
export var hash:(a:string)=>number = (str)=>{ 
  var hash = 5381; 
  var i = str.length; 
  while (i) { 
    hash = (hash * 33) ^ str.charCodeAt(--i); 
  }
  return hash >>> 0; 
};

// module transport
export {
  GetCancelableAction, 
  LatencyLoader,
  statistics,
};

export var sign_md5:(a:string)=>string = md5;
