export  function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
    };
    for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
    let str = o[k] + '';
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
    }
    return fmt;
};
export  function newDate(strDate) {
  return new Date(strDate.replace(/\-/g,"/"));
}
export function toMMMDDYYYY(strDate) {
  if (!strDate) {
    return '';
  }
  var arr = strDate.split('-');
  var day = arr[2].substr(0, 2);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var month = months[parseInt(arr[1])-1];
  return month + ' ' + day + ', ' + arr[0];
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};
