const isValidReqBody = function(reqBody)
{ 
    return Object.keys(reqBody).length > 0 ;     
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

/*const validUrl=function(value)
{
    
    regx=(/(ftp|http|https|HTTP|HTTPS):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/)
    let res = value.match(regx)
    return (res !== null)
    //return !!pattern.test(value);
}*/

module.exports={isValidReqBody,isValid}