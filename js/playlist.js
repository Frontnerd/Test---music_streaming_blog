
// Apply the waveform
function applyWaveform( theAddress ){
  var address = theAddress;    
  $('.audiojs').find('.loaded').css({'background':'url("'+address+'.png") no-repeat 0 0 transparent'})
  $('.audiojs').find('.progress').css({'background':'url("'+address+'-play.png") no-repeat 0 0 transparent'});  
}

// create download button in the player
function downloadButton( theAddress ){
  var downloadButton = '<a href="'+theAddress.attr('data-src')+'" target="_blank" title="right click Save Link As.." class="download">download '+theAddress.text()+'.mp3</a>';
  $('.download').remove();
  $('#memero-player .audiojs').append( downloadButton );
}

// removing playing class
function removePlayingClass( element ){
  $('li.playing').removeClass('playing');
  element.addClass('playing');    
}

$(function() {

  // add empty <audio>
  $('#memero-player h1').after('<audio preload></audio>');
  var navigationShortCuts = '<div id="shortcuts"> <div> <h4>Keyboard shortcuts:</h4> <p><em>&rarr;</em> Next track</p> <p><em>&larr;</em> Previous track</p> <p><em>Space</em> Play/pause</p> </div> </div>';
        
  // switch href to data attribute [remove downlad functionality in links]
  $('ol li').each(function( i ){
    var link = $(this).find('a'),
        audioLink = link.attr('href');        
    link.attr('data-src', audioLink);
    link.attr('href', "#");
    link.text( link.text().slice(0,-4) );
  });        
    
  // Setup the player to autoplay the next track
  var a = audiojs.createAll({
    trackEnded: function() {
      var next = $('ol li.playing').next();
      if (!next.length) next = $('ol li').first();
      removePlayingClass( next );
      audio.load($('a', next).attr('data-src'));
      applyWaveform( $('a', next).attr('data-src').slice(0,-4) ); ///**/
      downloadButton( $('a', next) ); 
      audio.play();
    }
  });
  
  // Load in the first track
  var audio = a[0];
//      first = $('ol a').attr('data-src');
//  $('ol li').first().addClass('playing');
//  applyWaveform( $('ol a').attr('data-src').slice(0,-4) ); ///**/
//  downloadButton( $('ol li.playing a') );
//  audio.load(first);

  // Load in a track on click
  $('ol li').click(function(e) {
    e.preventDefault();
    removePlayingClass( $(this) );   
    audio.load($('a', this).attr('data-src'));
    applyWaveform( $('a', this).attr('data-src').slice(0,-4) ); ///**/
    downloadButton( $('a', this) );
    audio.play();
  });
  
  // test the shit out (audio format support)
  var a = document.createElement('audio'),
    formatMessage = '',
    //aF = ['audio/mpeg;', 'audio/ogg; codecs="vorbis"', 'audio/wav; codecs="1"', 'audio/mp4; codecs="mp4a.40.2"'];
    aF = ['audio/mpeg;'];
    $.each(aF, function( i, c ){
      if( a.canPlayType && a.canPlayType( c ).replace(/no/, '') ){
        //formatMessage = c +' is supported, <strong class="support-audio">Html5 Audio</strong>';
        formatMessage = 'You are using: <strong class="support-audio">Html5 Audio</strong>';
        $('#memero-player .audiojs ').append( '<div id="info">'+formatMessage+'</div>' );          
      }else{
        //formatMessage =  c + ' is not supported, <strong class="support-flash">Flash<strong>';
        formatMessage =  'You are using: <strong class="support-flash">Flash<strong>';
        $('#memero-player .audiojs').append( '<div id="info">'+formatMessage+'</div>' );
      };              
    });  
      
  // Keyboard shortcuts
  $(document).keydown(function(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
       // right arrow
    if (unicode == 40) {
      var next = $('li.playing').next();
      if (!next.length) next = $('ol li').first();
      next.click();
      // back arrow
    } else if (unicode == 38) {
      var prev = $('li.playing').prev();
      if (!prev.length) prev = $('ol li').last();
      prev.click();
      // spacebar
    } else if (unicode == 32) {
      audio.playPause();
    }
  });
  
  
  
});
