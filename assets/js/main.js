var currency = ["USD", "JPY", "DKK", "EUR", "GBP", "NOK"];



function jsondata($base){
  var requestURL = `https://api.exchangerate.host/latest?base=${$base}`; 
  var request = new XMLHttpRequest(); 
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    var response = request.response;
    $("#"+$base+" .cur-value").text(response.rates["TRY"].toFixed(4));
  }
}

function excdata(){

  var base = $("#curtype").val();
  var value = $("#curexc").val();

  console.log(base,value);
  $("#curexc").val();
  var requestURL = `https://api.exchangerate.host/convert?from=${base}&to=TRY&amount=${value}`; 
  var request = new XMLHttpRequest(); 
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    var response = request.response;
    $(".excvalue").html(response.result+"<span> TL </span>");
  }
}

$(document).ready(function () {
  $.each(currency, function (index, value) { 
    jsondata(value);
  });

  $("#curtype").change(function (e) { 
    excdata();
  });
  $("#curexc").change(function (e) { 
    excdata();
  });
});