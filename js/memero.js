// Apply the waveform
function applyWaveform( theAddress ){
  var address = theAddress;    
  $('.audiojs').css({'background':'url("'+address+'.png") no-repeat 0 20px #171717'}).addClass('bg-size');  
  $('.audiojs').find('.progress').html('<div class="progress-wrapper"><img src="'+address+'-play.png"></div>');  
}

// create download button in the player
function downloadButton( theAddress ){
  var downloadButton = '<a href="'+theAddress.attr('data-src')+'" target="_blank" title="right click Save Link As to download the mp3.." class="download">'+theAddress.find('.title').text()+'.mp3</a>';
  $('.download').remove();
  $('.time').before( downloadButton );
}

// removing playing class
function removePlayingClass( element ){
  $('li.playing').removeClass('playing');
  element.addClass('playing');    
}





$(function() {

  // add empty <audio>
  $('.site > header').append('<audio preload></audio>');
  var navigationShortCuts = '<div id="shortcuts"> <div> <h4>Keyboard shortcuts:</h4> <p><em>&rarr;</em> Next track</p> <p><em>&larr;</em> Previous track</p> <p><em>Space</em> Play/pause</p> </div> </div>';
        
  // switch href to data attribute [remove downlad functionality in links]
  $('.music li').each(function( i ){
    var link = $(this).find('a'),
        audioLink = link.attr('href');        
    link.attr('data-src', audioLink);
    link.attr('href', " ");
    link.attr('title', 'listen '+$(this).find('.title').text()+'')
  });        
    
  // Setup the player to autoplay the next track
  var a = audiojs.createAll({
    trackEnded: function() {
      var next = $('.music li.playing').next();
      if (!next.length) next = $('.music li').first();
      removePlayingClass( next );
      audio.load($('a', next).attr('data-src'));
      applyWaveform( $('a', next).attr('data-src').slice(0,-4) ); ///**/
      downloadButton( $('a', next) ); 
      audio.play();
    }
  });
  
  // Load in the first track
  var audio = a[0];

  // Load in a track on click
  $('.music li').on('click', function(e) {
    e.preventDefault();
    removePlayingClass( $(this) );   
    audio.load($('a', this).attr('data-src'));
    applyWaveform( $('a', this).attr('data-src').slice(0,-4) ); ///**/
    downloadButton( $('a', this) );
    audio.play();
    $('.audiojs, .scrubber, .progress-wrapper, .progress-wrapper img, .loaded').css({'max-width': $('.container').width() });
    $('.audiojs').removeClass('closed');
  });
  
  // test the shit out (audio format support)
  var a = document.createElement('audio'),
    formatMessage = '',
    //aF = ['audio/mpeg;', 'audio/ogg; codecs="vorbis"', 'audio/wav; codecs="1"', 'audio/mp4; codecs="mp4a.40.2"'];
    aF = ['audio/mpeg;'];
  $.each(aF, function( i, c ){
    if( a.canPlayType && a.canPlayType( c ).replace(/no/, '') ){
      //formatMessage = c +' is supported, <strong class="support-audio">Html5 Audio</strong>';
      formatMessage = '<strong class="support-audio" title="you are using html5 audio">Html5 Audio</strong>';
      $('.audiojs ').append( '<div id="info">'+formatMessage+'</div>' );          
    }else{
      //formatMessage =  c + ' is not supported, <strong class="support-flash">Flash<strong>';
      formatMessage =  '<strong class="support-flash" title="you are using flash plugin">Flash<strong>';
      $('.audiojs').append( '<div id="info">'+formatMessage+'</div>' );
    };              
  });  
  
  // make the player follow the user scrolling
  var $player    = $('.audiojs'), 
      $window    = $(window),
      offset     = $player.offset(),
      height     = $player.height(),
      topPadding = 0;

  $window.scroll(function() {
    if ($window.scrollTop() > 650) {
      $player.addClass('fixed');
      $('.site > header > ul').css({'padding-bottom': height });      
    } else {
      $player.removeClass('fixed');
      $('.site > header > ul').css({'padding-bottom': '0' });
    }
  });
  
  // scroll to internal links  
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();
    var target = this.hash,
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      window.location.hash = target;
    });  
  });
  
  // openclose the player
  $player.append('<span class="switch" title="open/close the wave">toggle</span>');
  $player.addClass('closed');
  $('.switch').on('click', function(){    
    $(this).parent().toggleClass('closed');
  });  
  
  
  // resize on window resize
  window.addEventListener('resize', function(event){
    $('.audiojs, .scrubber, .progress-wrapper, .progress-wrapper img, .loaded').css({'max-width': $('.container').width() });
  });
       
});





