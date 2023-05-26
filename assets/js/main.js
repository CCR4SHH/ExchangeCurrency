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

function allcurrency() {
  var requestURL = 'https://api.exchangerate.host/symbols'; 
  var request = new XMLHttpRequest(); 
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    var response = request.response;

    $.each(response.symbols, function(key, value) {
      allCurrencyValue(value.code, value.description);
    });
  }
}

function allCurrencyValue(symbol, desc) {
  var requestURL = `https://api.exchangerate.host/latest?base=${symbol}`; 
      var request = new XMLHttpRequest(); 
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();
    
      request.onload = function() {
        var response = request.response;
        curHtml(symbol, desc, response.rates["TRY"]);
      }
}

function curHtml(code, desc, rate){
  rate = rate.toFixed(4);
  $("#allcurrency .column").append(`
                    <div class="currency">
                        <img src="assets/images/flags/${code}.png" alt="">
                        <div class="cur-name">
                            <span class="code">${code}</span>
                            <span class="name">${desc}</span>
                        </div>
                        <div class="cur-buy">
                            <span class="buy-sell">ALIŞ</span>
                            <span class="cur-value">${rate}</span>
                        </div>
                        <div class="cur-sell">
                            <span class="buy-sell">SATIŞ</span>
                            <span class="cur-value">${rate}</span>
                        </div>
                    </div>
                    `);
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

  $(".btn-all").click(function (e) { 
    allcurrency();
  });
});
