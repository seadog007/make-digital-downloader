cheerio = require("cheerio");
var http = require("http");
var subid = "EE1j6Jc1k6a2a";



//================================================================================

  for (var i = 1; i <= 41; i++) {
  var vol = i;
  //console.log(gfu(vol, subid));
  download(gfu(vol, "1410237435000"), function(data, subid, vol) {
    if (data) {
          var $ = cheerio.load(data);
          console.log(subid + ": " + vol + ": " + "http://www.make-digital.com" + $('a').attr('href'));
    }
  },
    subid,
    vol);
  };


//================================================================================


function download(path, callback, subid, vol) {
  http.get({
       hostname:"www.make-digital.com",
       port: 80,
       path: path,
       headers:{
          Cookie:"subscriber_id=" + subid + ";"
       }
    }, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data, subid, vol);
    });
  }).on("error", function() {
    callback(null);
  });
}


function gfu(vol, lm) {
  if(vol>=39){
    var path = "/make/volume_" + vol + "/Download_submit.action?pgs=all&lm=" + lm;
  }else{
    if(vol<10){
      var path = "/make/vol0" + vol + "/Download_submit.action?pgs=all&lm=" + lm;
    }else{
      var path = "/make/vol" + vol + "/Download_submit.action?pgs=all&lm=" + lm;
    }
  }
  return(path);
}
