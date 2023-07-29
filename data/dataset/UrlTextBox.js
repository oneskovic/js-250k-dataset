// Function to build the validation for text box
validateUrlTextBox= function(/*String*/ id){
  isValidUrlTextBox(id);
  var required = document.getElementById(id).getAttribute("required");
  if (required == "true") isMissingUrlTextBox(id);
}

isValidUrlTextBox= function(/*String*/ id){
  var isValid = this.isValidUrl(document.getElementById(id).value);
  var element = document.getElementById(id+"invalidSpan");
  if (isValid)
    element.style.display="none";
  else
    element.style.display="";
}

isMissingUrlTextBox= function(/*String*/ id){
  var isMissing = document.getElementById(id).value.length == 0;
  var element = document.getElementById(id+"missingSpan");
  if (isMissing)
    element.style.display="";
  else
    element.style.display="none";
}

isValidUrl = function(/*String*/str_url) {
  if (str_url.length == 0) return true;
// url parsing and formatting routimes. modify them if you wish other url format
  var re_date = /^([https?|ftp|file])+\:\/\/\/?(([A-Za-z0-9]+)(\.)?(\-)?)+((\/)([A-Za-z0-9\-\_]*(\.)?[A-Za-z0-9\-\_]*))*$/;
  if (!re_date.exec(str_url))
    return false;
  return (true);
}
