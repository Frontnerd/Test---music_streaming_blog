/*
* for all my archive.org releases, load the json file and retreive infos
*
*
*/


var releases = {
  jsonUrls: [
    'https://archive.org/details/MemeroMidRage',
    'https://archive.org/details/MemeroMemero-Hardware-Softcore-Live-Set',
    'https://archive.org/details/Memero_Squarewave_Injection',
    'https://archive.org/details/MemeroCopperSea',
    'https://archive.org/details/MemeroAnthemEp',
    'https://archive.org/details/MemeroIdmGameboyBerlin',
    'https://archive.org/details/MemeroGameboyLsdjBreakcoreBerlinRavePartyTekno'
  ]
}



$(function(){
  
    $.each(releases.jsonUrls, function(i, albums) {
      var jsonUrl = albums+'&output=json&callback=?';
        
      $.getJSON( jsonUrl , function( data ){

          var albumName = data.metadata.title[0];
          var myUrl = data.server+data.dir;
          var myTrack = data.files;
          $('#parser').append('<div>'+albumName+'</div>');
          
          $.each(data.files, function(item) {
            
            if (this.format == "VBR MP3") {
              $('.link-to-track').append('<p><a href="http://'+myUrl+item+'">'+item+'</a></p>');
            }
            if (this.format == "PNG") {
              console.log(this);
              $('.track-imgs').append('<img src="http://'+myUrl+this+' alt='+this+'/>');
            }
          });

      });
    });
  
});


