var base64 = require('./base64').base64;

function btwoc(i)
{
  if(i.charCodeAt(0) > 127)
  {
    return String.fromCharCode(0) + i;
  }
  return i;
}

function unbtwoc(i)
{
  if(i[0] === String.fromCharCode(0))
  {
    return i.substr(1);
  }

  return i;
}

exports.btwoc = btwoc;
exports.unbtwoc = unbtwoc;
exports.base64 = base64;
