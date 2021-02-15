let  validatorReg = {
      Number:{type:/^[0-9]*$/,msg:'err_msg_int'},
      China:{type:/[\u4E00-\u9FA5]/,msg:'account_name'},
      LengthTwo:{type:/^.{2}$/,msg:'err_msg_length'},
      MM_YYYY:{type:/^((0[1-9])|(1[0-2]))\/\d{4}$/,msg:'err_msg_date'},
      maxleng:{type:/^\d{1,2}$/,msg:'account_name'},
      Http:{type:/^$|^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,msg:'err_msg_website'},
      noNull:{type:/(^\s*)|(\s*$)/,msg:'err_msg_require' },
      Email:{type:/^$|[\w.~!@#$%^&*()]+@[\w.]+[\w]+/,msg:'err_msg_email'},
      phoneNumber:{type:/^[0-9|\+]{0,1}([0-9]|\s+)*$/,msg:'err_msg_phonenumber'},
      folatNumber:{type:/^$|^\d+(\.\d{1,2})?$/,msg:'err_msg_num'},
      // ^([1-9]{1}[0-9]{0,1}|0|100)(.d{1,2}){0,1}%$
      percent:{type:/^$|^(100|[1-9]\d|\d)(.\d{1,2})?%$/,msg:'err_msg_num'},
      noArr:{type:'',msg:'err_msg_require' }
    }

let allvalidator = function allvalidator(validatorSave,formData){
  
  let flag = false
  for (var key in validatorSave) {
    if(validator(validatorSave,formData,key)){
      flag = true
    }
  }
  return flag
}

let validator = function (validatorSave,formData,key){
  let flg = false
  validatorSave[key].vaid.forEach(element => {
    if(element !='noNull'){
      var re = new RegExp(validatorReg[element].type)
      if(!re.test(formData[key]==null?'':formData[key])){
        flg = true
        validatorSave[key].msg =validatorReg[element].msg;
        return
      }
    }
    if(element=='noNull'){
      if(typeof  formData[key] == 'string'){
        formData[key] = formData[key].replace(/(^\s*)|(\s*$)/g, ""); 
      }
      if(formData[key] === ''|| formData[key] === null || typeof formData[key] == 'undefined'){
        flg = true
        validatorSave[key].msg =validatorReg[element].msg;
      }
    }
    if (element=='noArr') {
      if (formData[key].length===0||formData[key].length<0) {
      flg = true
      validatorSave[key].msg =validatorReg[element].msg;
      }
    }
  });
  validatorSave[key].flg =flg;
  return flg
}
export { validatorReg as validatorReg, validator as validator, allvalidator as allvalidator }
