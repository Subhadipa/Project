const isValidReqBody = function(reqBody)
{ 
    return Object.keys(reqBody).length > 0 ;     
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}



module.exports={isValidReqBody,isValid}