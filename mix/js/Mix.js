/* jshint maxlen:false */
(function( window, undefined ) {

bower_components/jquery/jquery.js not found
bower_components/lodash/lodash.js not found
bower_components/mustache/mustache.js not found
bower_components/backbone/backbone.js not found
bower_components/backbone.marionette/lib/backbone.marionette.js not found

  (function() {
  
    'use strict';
  
    // create the Marionette application
    var App = window.App = new Backbone.Marionette.Application();
  
    // use mustache
    var tmplCache = Backbone.Marionette.TemplateCache;
    tmplCache.prototype.compileTemplate = function( rawTemplate ) {
      return Mustache.compile(rawTemplate);
    };
  
    function bindEvents() {
      $(document).on('keyup', function( ev ) {
        var playing = App.mix.get('playing'),
          position = App.mix.get('position');
        switch ( ev.keyCode ) {
          // spacebar
          case 32:
            if ( !playing ) {
              App.mix.play();
            } else {
              App.mix.pause();
            }
            break;
          // r
          case 82:
            App.mix.play(0);
            if ( !playing ) {
              App.mix.pause();
            }
            break;
          // left arrow
          case 37:
            if ( playing ) {
              App.mix.play(position - 10);
            }
            break;
          case 39:
            if ( playing ) {
              App.mix.play(position + 10);
            }
            break;
        }
      });
      $(window).on('mousemove touchmove', function( ev ) {
        App.vent.trigger('mixer-mousemove', ev);
        if ( ev.type === 'touchmove' ) {
          ev.preventDefault();
        }
      });
      $(window).on('mouseup touchend', function( ev ) {
        App.vent.trigger('mixer-mouseup', ev);
      });
      $('#master .fader').on( 'mousedown touchstart', App.enableDrag );
      $('#master .fader').on( 'dblclick', App.resetFader );
      App.vent.on('mixer-mouseup', App.disableDrag );
      App.vent.on('mixer-mousemove', App.dragHandler );
    }
  
    // config
    App.tracks = 0;
    App.loaded = 0;
    App.ready = false;
  
    App.vuLeftData = [];
    App.vuRightData = [];
  
    // add an AudioContext
    App.ac = (function( w ) {
      var Ac = w.AudioContext || w.webkitAudioContext || w.mozAudioContext;
      return new Ac();
    }(window));
  
    // wait for all tracks to be loaded
    App.vent.on('loaded', function() {
      var top;
      if ( ++App.loaded === App.tracks ) {
        App.ready = true;
        App.vent.trigger('ready');
        top = App.util.scale( App.mix.get('gain'), 0, 1.5, 314, 0 );
        $('#master .fader').css( 'top', top + 'px' );
      }
    });
  
    // Build tracks collection view
    App.vent.on('ready', function() {
      App.trackViews = new App.Views.Tracks({
        collection: App.mix.attributes.tracks
      });
      App.controlsView = new App.Views.Controls({
        model: App.mix
      });
      App.vuLeft = $('.needle.left');
      App.vuRight = $('.needle.right');
      App.trackViews.render();
      bindEvents();
      if ( !('ontouchstart' in window) ) {
        App.mix.play();
      }
    });
  
    // rAF loop for meters
    App.vent.on('anim-tick', function() {
      var left, right;
      if ( !App.vuLeft || !App.vuRight || window.innerWidth <= 1200 ) {
        return;
      }
      App.mix.levels();
      left = App.mix.get('dBFSLeft');
      right = App.mix.get('dBFSRight');
      left = Math.max( -20, App.util.scale(left + 20, -20, 0, 0, 60 ) );
      right = Math.max( -20, App.util.scale(right + 20, -20, 0, 0, 60 ) );
  
      App.vuLeftData.unshift( left );
      App.vuRightData.unshift( right );
  
      if ( App.vuLeftData.length >= 18 ) {
        App.vuLeftData.length = 18;
      }
  
      if ( App.vuRightData.length > 18 ) {
        App.vuRightData.length = 18;
      }
  
      left = App.vuLeftData.reduce(function( sum, curr ) {
        return sum + curr;
      }, 0 ) / App.vuLeftData.length;
  
      right = App.vuRightData.reduce(function( sum, curr ) {
        return sum + curr;
      }, 0 ) / App.vuRightData.length;
  
      App.vuLeft.css('transform', 'rotate(' + left + 'deg)');
      App.vuRight.css('transform', 'rotate(' + right + 'deg)');
    });
  
    App.dragState = {
      x: null,
      y: null,
      px: null,
      prop: null,
      $target: null
    };
  
    App.enableDrag = function( ev ) {
      var $elem = $( ev.currentTarget ), deg, touch;
      if ( $elem.hasClass('fader') ) {
        App.faderCanDrag = true;
        App.dragState.px = parseInt( $elem.css('top'), 10 );
      }
      if ( ev.type === 'touchstart' && ev.originalEvent.changedTouches ) {
        touch = ev.originalEvent.changedTouches[ 0 ];
        App.dragState.x = touch.pageX;
        App.dragState.y = touch.pageY;
      } else {
        App.dragState.x = ev.pageX;
        App.dragState.y = ev.pageY;
      }
      App.dragState.$target = $elem;
    };
  
    App.disableDrag = function() {
      if ( App.faderCanDrag ) {
        App.faderCanDrag = false;
      }
    };
  
    App.dragHandler = function( ev ) {
      if ( !App.faderCanDrag ) {
        return;
      }
  
      var touch = ev.type === 'touchmove' && ev.originalEvent.changedTouches,
        pos = touch && touch[ 0 ] ? touch[ 0 ].pageY : ev.pageY,
        state = App.dragState.y,
        delta = pos - state,
        css = App.dragState.px + delta;
      css = Math.min( 314, css );
      css = Math.max( 0, css );
      App.dragState.$target.css('top', css + 'px');
      App.mix.set( 'gain', App.util.scale( css, 0, 314, 1.5, 0 ) );
    };
  
    App.resetFader = function() {
      var top = App.util.scale( 1, 0, 1.5, 314, 0 );
      $('#master .fader').css( 'top', top + 'px' );
      App.mix.set( 'gain', 1 );
    };
  
    // create the mix and start the app on DOM ready
    $(function() {
      var hash = location.hash.substr(1), blob, url;
      App.mix = new App.Models.Mix();
      function startup() {
        App.mix.fetch();
        App.start();
      }
      if ( location.hash ) {
        $.ajax({
          url: 'http://api.myjson.com/bins/' + hash,
          type: 'GET',
          dataType: 'json',
          success: function( json ) {
            try {
              blob = new Blob([JSON.stringify(json)]);
              url = window.URL.createObjectURL(blob);
              App.mix.url = url;
            } catch ( e ) {}
            startup();
          },
          error: startup
        });
      } else {
        startup();
      }
    });
  
  }());
  
  App.module('Loader', function( Loader, App, Backbone, Marionette, $, _ ) {
  
    'use strict';
  
    var $elem, $bar, init, bindEvents, updatePercent;
  
    init = function() {
      $elem = $('#loader');
      $bar = $elem.find('.loader-bar');
      bindEvents();
    };
  
    bindEvents = function() {
      App.vent.on('loaded', updatePercent);
      App.vent.on('ready', function(){
        $elem.hide();
      });
    };
  
    updatePercent = function() {
      var percent = ( ( App.loaded + 1 ) / App.tracks ) * 100;
      percent = Math.min(percent, 100);
      $bar.css('width', percent + '%');
    };
  
    init();
  
  });
  
  App.module('util', function( util, App, Backbone, Marionette, $, _ ) {
  
    'use strict';
  
    // convert a value from one scale to another
    // e.g. App.util.scale(-96, -192, 0, 0, 100) to convert
    // -96 from dB (-192 - 0) to percentage (0 - 100)
    util.scale = function( val, f0, f1, t0, t1 ) {
      return (val - f0) * (t1 - t0) / (f1 - f0) + t0;
    };
  
    // convert dBFS to a percentage
    util.dBToPercent = function( dB ) {
      return util.scale(dB, -192, 0, 0, 100);
    };
  
    // convert percentage to dBFS
    util.percentTodB = function( percent ) {
      return util.scale(percent, 0, 100, -192, 0);
    };
  
    // convert samples to seconds
    util.samplesToSeconds = function( samples ) {
      return samples / App.ac.sampleRate;
    };
  
    // convert seconds to samples
    util.secondsToSamples = function( time, sampleRate ) {
      return time * App.ac.sampleRate;
    };
  
    // clone a Float32Array
    util.cloneFloat32Array = function( ab ) {
      var f32 = new Float32Array(ab.length);
      f32.set(ab);
      return f32;
    };
  
    // create an AudioBuffer from an ArrayBuffer
    // requires one or more ArrayBuffers
    util.createAudioBuffer = function() {
      var args = _.toArray(arguments),
        sr = App.ac.sampleRate,
        channels = args.length,
        len = Math.max.apply(Math, _.map(args, function( ab ) {
          return ab.length;
        })),
        buf = App.ac.createBuffer(channels, len, sr);
      while ( channels-- ) {
        buf.getChannelData(channels).set(args[channels]);
      }
      return buf;
    };
  
    // clone an AudioBuffer instance
    // requires an AudioBuffer
    // optionally accepts from and to (both integers) for slicing
    util.cloneAudioBuffer = function( ab, from, to ) {
      var channels = ab.numberOfChannels,
        sr = App.ac.sampleRate,
        start = from || 0,
        end = to || ab.length,
        len = end - start,
        buf = App.ac.createBuffer(channels, len, sr),
        clone;
      while ( channels-- ) {
        clone = ab.getChannelData(channels).subarray(from, to);
        buf.getChannelData(channels).set(clone);
      }
      return buf;
    };
  
    // create a new BufferSource from an AudioBuffer instance
    // requires an AudioBuffer
    util.createBufferSource = function( ab ) {
      var src = App.ac.createBufferSource();
      src.buffer = ab;
      return src;
    };
  
    // fetch and decode an audio asset, then pass the AudioBuffer
    // to the supplied callback
    util.fetchAudioAsset = function( path, callback ) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);
      xhr.responseType = 'arraybuffer';
      xhr.addEventListener('load', function() {
        App.ac.decodeAudioData(xhr.response, function( buffer ){
          callback(buffer);
        });
      }, false);
      xhr.send();
    };
  
    // calculate the dBFS value of an ArrayBuffer
    util.dBFS = function( buffer ) {
      var len = buffer.length,
        total = 0,
        i = 0,
        rms,
        db;
  
      while ( i < len ) {
        total += ( buffer[i] * buffer[i++] );
      }
  
      rms = Math.sqrt( total / len );
      db  = 20 * ( Math.log(rms) / Math.LN10 );
      return Math.max(-192, db);
    };
  
    // format seconds as 00:00:00
    util.formatTime = function( seconds ) {
      var ms = Math.floor( ( seconds * 1000 ) % 1000 ),
        s = Math.floor( seconds % 60 ),
        m = Math.floor( ( seconds * 1000 / ( 1000 * 60 ) ) % 60 ),
        str = '';
      s = s < 10 ? '0' + s : s;
      m = m < 10 ? '0' + m : m;
      ms = ms < 10  ? '0' + ms : ms;
      str += ( m + ':' );
      str += ( s + ':');
      str += ms.toString().slice(0,2);
      return str;
    };
  
  });
  
  App.module('Models', function( Models, App, Backbone, Marionette, $, _ ) {
  
    'use strict';
  
    var Mix = Models.Mix = Backbone.Model.extend({
  
      url: 'mix.json',
  
      defaults: {
        // mix name
        name      : 'Mix',
        // master gain (0 - 1)
        gain      : 1,
        // playback position (in seconds)
        position  : 0,
        // minimum allowed playback position
        minTime   : 0,
        // maximum allowed playback position
        maxTime   : Infinity,
        // internal value for playback scheduling
        startTime : 0,
        // are we currently playing?
        playing   : false,
        // internal value for VU meters
        dBFSLeft   : -48,
        // internal value for VU meters
        dBFSRight  : -48,
        // internally calculated song duration
        duration  : Infinity
      },
  
      initialize: function() {
        this.nodes = {};
        this.createNodes();
        this.setGain();
        this.updatePosition();
        App.vent.on('solo', this.soloMute.bind(this));
        App.vent.on('unsolo', this.soloMute.bind(this));
        App.vent.on('anim-tick', this.updatePosition.bind(this));
        this.on('change:gain', this.setGain, this);
        this.on('change:gain', this.persist, this);
      },
  
      // create audio nodes
      createNodes: function() {
        this.fftSize = 2048;
        this.timeDataL = new Uint8Array(this.fftSize);
        this.timeDataR = new Uint8Array(this.fftSize);
        this.nodes.gain = App.ac.createGain();
        this.nodes.splitter = App.ac.createChannelSplitter(2);
        this.nodes.analyserL = App.ac.createAnalyser();
        this.nodes.analyserR = App.ac.createAnalyser();
        this.nodes.gain.connect(this.nodes.splitter);
        this.nodes.splitter.connect(this.nodes.analyserL, 0, 0);
        this.nodes.splitter.connect(this.nodes.analyserR, 1, 0);
        this.nodes.gain.connect(App.ac.destination);
        this.nodes.analyserL.smoothingTimeConstant = 1;
        this.nodes.analyserR.smoothingTimeConstant = 1;
        return this;
      },
  
      // set gain
      setGain: function() {
        this.nodes.gain.gain.value = this.get('gain');
        return this;
      },
  
      // begin playback of all tracks
      // optionally accepts a playback position in seconds
      play: function( pos ) {
        var now = App.ac.currentTime,
          time = this.get('position'),
          max = this.get('tracks').maxLength();
        if ( !App.ready ) {
          throw new Error('Cannot play before App.ready');
        }
        if ( typeof pos === 'number' ) {
          this.set('position', time = Math.max(pos, this.get('minTime')));
        }
        this.set({startTime: now - time, playing: true, duration: max});
        this.get('tracks').play(time);
        return this;
      },
  
      // pause all tracks
      pause: function() {
        this.get('tracks').pause();
        this.set('playing', false);
        App.vent.trigger('mix-pause');
        return this;
      },
  
      // get the exact, up-to-date playback position
      exactTime: function(){
        var now = App.ac.currentTime,
          playing = this.get('playing'),
          start = this.get('startTime'),
          position = this.get('position'),
          delta = now - start;
        return playing ? delta : position;
      },
  
      // periodically update the position attribute (for UI)
      updatePosition: function(){
        var position = this.exactTime(),
          playing = this.get('playing');
        if ( position > Math.min(this.get('maxTime'), this.get('duration')) ) {
          this.play(0).pause();
        } else {
          this.set('position', position, {silent: true});
        }
        return this;
      },
  
      // selectively apply/remove mutes depending on which tracks
      // are soloed and unsoloed
      soloMute: function() {
        var unsoloed, soloed, _muted;
        if ( this.get('tracks') ) {
          unsoloed = this.get('tracks').where({soloed: false});
          soloed = this.get('tracks').where({soloed: true});
          _muted = this.get('tracks').where({_muted: true});
          // apply _mute to non-soloed tracks
          if ( soloed.length ){
            unsoloed.forEach(function( track ){
              track._mute();
            });
          }
          // remove _mute when nothing is soloed
          if ( !soloed.length ) {
            _muted.forEach(function( track ) {
              track._unmute();
            });
          }
        }
        return this;
      },
  
      // get dBFS values
      levels: function( e ) {
        var playing = this.get('playing'),
          len = this.timeDataL.length,
          right = new Array(len),
          left = new Array(len),
          i = 0;
        this.nodes.analyserL.getByteTimeDomainData(this.timeDataL);
        this.nodes.analyserR.getByteTimeDomainData(this.timeDataR);
        for ( ; i < len; ++i ) {
          left[i] = ( this.timeDataL[i] * 2 / 255 ) - 1;
          right[i] = ( this.timeDataR[i] * 2 / 255 ) - 1;
        }
        left = App.util.dBFS(left);
        right = App.util.dBFS(right);
        this.set({
          dBFSLeft: playing ? left : -192,
          dBFSRight: playing ? right : -192
        });
        return this;
      },
  
      // override default parsing to create `tracks` collection
      parse: function( data ) {
        data.tracks = new App.Collections.Tracks(data.tracks);
        data.position = data.position || data.minTime || 0;
        App.tracks = data.tracks.length;
        return _.extend({}, data);
      },
  
      toJSON: function() {
        var out = _.extend({}, this.attributes),
          tracks = _.map(this.get('tracks').models, function( track ) {
            return track.toJSON();
          });
        out.tracks = tracks;
        delete out.dBFSLeft;
        delete out.dBFSRight;
        delete out.startTime;
        delete out.binURI;
        return out;
      },
  
      persist: _.debounce(function() {
        var self = App.mix,
          data = self.toJSON(),
          binURI = self.get('binURI');
        delete data.position;
        delete data.playing;
        delete data.duration;
        delete data.binURI;
        data = JSON.stringify(data);
        $.ajax({
          type: binURI ? 'PUT' : 'POST',
          url: binURI || 'http://api.myjson.com/bins',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: data,
          success: function( response ) {
            if ( response.uri ) {
              self.set('binURI', response.uri, {silent: true});
              location.hash = response.uri.split('/').pop();
            }
          }
        });
      }, 500)
  
    });
  
  });
  
  App.module('Models', function( Models, App, Backbone, Marionette, $, _ ) {
  
    'use strict';
  
    var Track = Models.Track = Backbone.Model.extend({
  
      defaults: {
        // track name
        name     : 'Track',
        // track gain (0 - 1)
        gain     : 1,
        // track pan (-1 - 1, left to right)
        pan      : 0,
        // user muted
        muted    : false,
        // muted because another track is soloed (internal)
        _muted   : false,
        // soloed
        soloed   : false,
        // internal dBFS value
        dBFS     : -48,
        // after-fader listen
        afl      : true,
        // internally calculated track duration
        duration : Infinity
      },
  
      initialize: function() {
        this.nodes = {};
        this.createNodes();
        this.setValues();
        this.fetchAudio();
        this.fftSize = 2048;
        this.timeData = new Uint8Array(this.fftSize);
        this.on('change:gain', this.setGain, this);
        this.on('change:pan', this.setPanning, this);
        this.on('change:gain change:pan change:soloed change:muted change:afl',
          App.mix.persist, App.mix
        );
      },
  
      // create gain/pan/mute/solo nodes
      createNodes: function() {
        // user mute
        this.nodes.mute = App.ac.createGain();
        // auto mute (caused by other tracks being soloed)
        this.nodes._mute = App.ac.createGain();
        // left channel gain
        this.nodes.panLeft = App.ac.createGain();
        // right channel gain
        this.nodes.panRight = App.ac.createGain();
        // channel merger
        this.nodes.merger = App.ac.createChannelMerger(2);
        // analyser
        this.nodes.analyser = App.ac.createAnalyser();
        // track gain
        this.nodes.gain = App.ac.createGain();
        // make connections
        this.nodes._mute.connect(this.nodes.mute);
        this.nodes.mute.connect(this.nodes.panLeft);
        this.nodes.mute.connect(this.nodes.panRight);
        this.nodes.panLeft.connect(this.nodes.merger, 0, 0);
        this.nodes.panRight.connect(this.nodes.merger, 0, 1);
        this.nodes.merger.connect(this.nodes.analyser);
        this.nodes.merger.connect(this.nodes.gain);
        this.nodes.gain.connect(App.mix.nodes.gain);
        this.nodes.analyser.smoothingTimeConstant = 1;
        return this;
      },
  
      // set track params
      setValues: function() {
        this.setGain();
        this.setPanning();
        if ( this.get('muted') ) {
          this.mute();
        }
        if ( this.get('_muted') ) {
          this._mute();
        }
        if ( this.get('soloed') ) {
          this.solo();
        }
        return this;
      },
  
      // set gain
      setGain: function() {
        this.nodes.gain.gain.value = this.get('gain');
        return this;
      },
  
      // set panning
      setPanning: function() {
        this.nodes.panLeft.gain.value = ( this.get('pan') * -0.5 ) + 0.5;
        this.nodes.panRight.gain.value = ( this.get('pan') * 0.5 ) + 0.5;
        return this;
      },
  
      // fetch audio assets, then trigger a 'loaded' event on the app
      fetchAudio: function() {
        App.util.fetchAudioAsset(this.get('path'), function( buffer ) {
          this.buffer = buffer;
          this.set('duration', buffer.duration);
          App.vent.trigger('loaded');
        }.bind(this));
        return this;
      },
  
      // create a new bufferSource and connect it
      connect: function() {
        this.nodes.source = App.util.createBufferSource(this.buffer);
        this.nodes.source.connect(this.nodes._mute);
        return this;
      },
  
      // start playback
      play: function( time ) {
        this.pause().connect();
        this.nodes.source.start(App.ac.currentTime, time);
        return this;
      },
  
      // pause playback
      pause: function() {
        if ( this.nodes.source ) {
          this.nodes.source.stop(0);
          this.nodes.source = null;
        }
        return this;
      },
  
      // mute the track (user-initiated)
      mute: function() {
        this.nodes.mute.gain.value = 0;
        this.set('muted', true);
        if ( this.get('soloed') ) {
          this.unsolo();
        }
        return this;
      },
  
      // unmute the track (user-initiated)
      unmute: function(){
        this.nodes.mute.gain.value = 1;
        this.set('muted', false);
        return this;
      },
  
      // mute the track (initiated by mix.soloMute)
      _mute: function(){
        this.nodes._mute.gain.value = 0;
        this.set('_muted', true);
        return this;
      },
  
      // unmute the track (initiated by mix.soloMute)
      _unmute: function(){
        this.nodes._mute.gain.value = 1;
        this.set('_muted', false);
        return this;
      },
  
      // solo the track
      solo: function(){
        this.unmute();
        this._unmute();
        this.set('soloed', true);
        App.vent.trigger('solo');
        return this;
      },
  
      // unsolo the track
      unsolo: function(){
        this.set('soloed', false);
        App.vent.trigger('unsolo');
        return this;
      },
  
      levels: function( e ) {
        var playing = App.mix.get('playing'),
          len = this.timeData.length,
          floats = new Array(len),
          i = 0, dBFS;
        this.nodes.analyser.getByteTimeDomainData(this.timeData);
        for ( ; i < len; ++i ) {
          floats[i] = ( this.timeData[i] * 2 / 255 ) - 1;
        }
        dBFS = App.util.dBFS(floats);
        this.set('dBFS', playing ? dBFS : this.get('dBFS') - 0.8);
        return this;
      },
  
      toJSON: function() {
        var out = _.extend({}, this.attributes);
        delete out.dBFS;
        return out;
      }
  
    });
  
  });
  
  App.module('Collections', function( Collections, App, Backbone,
    Marionette, $, _ ) {
  
    'use strict';
  
    var Tracks = Collections.Tracks = Backbone.Collection.extend({
  
      model: App.Models.Track,
  
      // begin playback of all tracks
      play: function( time ) {
        this.each(function( track ) {
          track.play(time);
        });
        return this;
      },
  
      // pause all tracks
      pause: function() {
        this.each(function( track ) {
          track.pause();
        });
        return this;
      },
  
      // get max track duration (essentially song length)
      maxLength: function() {
        var durations = App.mix.get('tracks').map(function( track ) {
          return track.get('duration');
        });
        return Math.max.apply(Math, durations);
      }
  
    });
  
  });
  
  App.module('Views', function( Views, App, Backbone, Marionette, $, _ ) {
  
    'use strict';
  
    var Track = Views.Track = Marionette.ItemView.extend({
      template: '#tmpl-track',
  
      events: {
        'mousedown .fader'   : 'enableDrag',
        'touchstart .fader'  : 'enableDrag',
        'dblclick .fader'    : 'resetFader',
        'mousedown .panner'  : 'enableDrag',
        'touchstart .panner' : 'enableDrag',
        'dblclick .panner'   : 'resetPanner',
        'click .mute'        : 'mute',
        'touchstart .mute'   : 'mute',
        'click .solo'        : 'solo',
        'touchstart .solo'   : 'solo',
        'click .afl'         : 'afl',
        'touchstart .afl'    : 'afl'
      },
  
      ui: {
        canvas: '.meter'
      },
  
      modelEvents: {
        'change:muted': 'render',
        'change:soloed': 'render',
        'change:afl': 'render'
      },
  
      initialize: function() {
        App.vent.on('mixer-mouseup', this.disableDrag.bind(this));
        App.vent.on('mixer-mousemove', this.dragHandler.bind(this));
        App.vent.on('anim-tick', this.drawMeter.bind(this));
        App.vent.on('mix-pause', function() {
          setTimeout(function(){
            this.drawMeter();
          }.bind(this), 50);
        }.bind(this));
      },
  
      onBeforeRender: function() {
        this.$el.addClass('channel');
      },
  
      onRender: function() {
        var canvas = this.ui.canvas[0],
          height = canvas.height,
          width = canvas.width,
          hue = 180,
          i = 0,
          ctx;
        this.offscreen = document.createElement('canvas');
        this.offscreen.width = canvas.width;
        this.offscreen.height = canvas.height;
        ctx = this.offscreen.getContext('2d');
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 40%)';
        while ( i < height ) {
          hue += ( ( 1 - i / height ) * 0.6 );
          ctx.fillStyle = 'hsl(' + hue + ', 100%, 40%)';
          ctx.fillRect(0, height - i, width, 2);
          i += 3;
        }
      },
  
      serializeData: function() {
        var data = this.model.toJSON();
        data.gain = App.util.scale(Math.sqrt(data.gain), 0, 1.15, 220, 0);
        data.pan = App.util.scale(data.pan, -1, 1, -150, 150);
        data.muted = data.muted ? 'active' : '';
        data.soloed = data.soloed ? 'active' : '';
        data.afl = data.afl ? '' : 'active';
        return data;
      },
  
      faderCanDrag: false,
  
      pannerCanDrag: false,
  
      dragState: {
        x: null,
        y: null,
        px: null,
        prop: null,
        $target: null
      },
  
      enableDrag: function( ev ) {
        var $elem = $(ev.currentTarget), deg, touch;
        if ( $elem.hasClass('fader') ) {
          this.faderCanDrag = true;
          this.dragState.px = parseInt($elem.css('top'), 10);
        } else if ( $elem.hasClass('panner') ) {
          this.pannerCanDrag = true;
          this.dragState.width = parseInt($elem.width());
          this.dragState.height = parseInt($elem.height());
          this.dragState.offset = $elem.offset();
        }
        if ( ev.type === 'touchstart' && ev.originalEvent.changedTouches ) {
          touch = ev.originalEvent.changedTouches[0];
          this.dragState.x = touch.pageX;
          this.dragState.y = touch.pageY;
        } else {
          this.dragState.x = ev.pageX;
          this.dragState.y = ev.pageY;
        }
        this.dragState.$target = $elem;
      },
  
      disableDrag: function( ev ) {
        if ( this.faderCanDrag || this.pannerCanDrag ) {
          this.faderCanDrag = false;
          this.pannerCanDrag = false;
        }
      },
  
      dragFader: function( ev, max ) {
        var touch = ev.type === 'touchmove' && ev.originalEvent.changedTouches,
          pos = touch && touch[0] ? touch[0].pageY : ev.pageY,
          state = this.dragState.y,
          delta = pos - state,
          css = this.dragState.px + delta;
        css = Math.min(max, css);
        css = Math.max(0, css);
        this.dragState.$target.css('top', css + 'px');
        this.model.set('gain', Math.pow(App.util.scale(css, 0, 220, 1.15, 0), 2));
      },
  
      dragPanner: function( ev ) {
        var touch = ev.type === 'touchmove' && ev.originalEvent.changedTouches,
          width = this.dragState.width,
          height = this.dragState.height,
          offset = this.dragState.offset,
          top = touch && touch[0] ? touch[0].pageY : ev.pageY,
          left = touch && touch[0] ? touch[0].pageX : ev.pageX,
          a = offset.left + ( width / 2 ) - left,
          b = offset.top + ( height / 2 ) - top,
          deg = -1 * Math.atan2( a, b ) * ( 180 / Math.PI );
        if ( deg >= -150 && deg <= 150 ) {
          this.dragState.$target.css('transform', 'rotate(' + deg + 'deg)');
          this.model.set('pan', App.util.scale(deg, -150, 150, -1, 1));
        }
      },
  
      dragHandler: function( ev ) {
        if ( this.faderCanDrag ) {
          this.dragFader(ev, 220);
        } else if ( this.pannerCanDrag ) {
          this.dragPanner(ev);
        }
      },
  
      resetFader: function() {
        var top = App.util.scale(1, 0, 1.15, 220, 0);
        this.$el.find('.fader').css('top', top + 'px');
        this.model.set('gain', 1);
      },
  
      resetPanner: function() {
        this.$el.find('.panner').css('transform', 'rotate(0deg)');
        this.model.set('pan', 0);
      },
  
      mute: function( ev ) {
        var muted;
        if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
          return;
        }
        muted = this.model.get('muted');
        if ( muted ) {
          this.model.unmute();
        } else {
          this.model.mute();
        }
      },
  
      solo: function( ev ) {
        var soloed;
        if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
          return;
        }
        soloed = this.model.get('soloed');
        if ( soloed ) {
          this.model.unsolo();
        } else {
          this.model.solo();
        }
      },
  
      afl: function( ev ) {
        if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
          return;
        }
        this.model.set('afl', !this.model.get('afl'));
      },
  
      drawMeter: function() {
        if ( typeof this.ui.canvas !== 'string' ) {
          this.model.levels();
          var canvas = this.ui.canvas[0],
            ctx = canvas.getContext('2d'),
            dBFS = this.model.attributes.dBFS,
            gain = this.model.attributes.gain,
            afl = this.model.attributes.afl,
            height = this.cHeight || ( this.cHeight = canvas.height ),
            width = this.cWidth || ( this.cWidth = canvas.width ),
            scaled = App.util.scale(-dBFS, 48, 0, 0, height),
            now = Date.now(),
            peakTime = this.peakTime || -Infinity,
            peak = this.peak || 0,
            timeDiff = now - peakTime,
            freshness;
          if ( afl ) {
            scaled = scaled * gain;
          }
          scaled = Math.max(0, scaled - ( scaled % 3 ));
          if ( this.dirty ) {
            ctx.clearRect(0, 0, width, height);
            this.dirty = false;
          }
          if ( scaled >= 3 ) {
            ctx.drawImage(this.offscreen, 0, height - scaled, width, scaled,
              0, height - scaled, width, scaled
            );
            this.dirty = true;
          }
          // save new peak
          if ( scaled >= peak ) {
            peak = this.peak = scaled;
            this.peakTime = now;
            timeDiff = 0;
          }
          // draw existing peak
          if ( timeDiff < 1000 && peak >= 1 ) {
            // for first 650 ms, use full alpha, then fade out
            freshness = timeDiff < 650 ? 1 : 1 - ( ( timeDiff - 650 ) / 350 );
            ctx.fillStyle = 'rgba(238,119,85,' + freshness + ')';
            ctx.fillRect(0, height - peak - 1, width, 1);
            this.dirty = true;
          // clear peak
          } else {
            this.peak = 0;
            this.peakTime = now;
          }
        }
      }
  
    });
  
  });
  
  App.module('Views', function( Views, App, Backbone, Marionette, $, _ ) {
  
    'use strict';
  
    var Tracks = Views.Tracks = Marionette.CollectionView.extend({
      itemView: Views.Track,
  
      el: '#mixer',
  
      initialize: function() {
        this.animTick();
        this.unhide();
      },
  
      animTick: function() {
        App.vent.trigger('anim-tick');
        window.requestAnimationFrame(this.animTick.bind(this));
      },
  
      unhide: function() {
        this.$el.css('visibility', 'visible');
      }
  
    });
  
  });
  
  App.module('Views', function( Views, App, Backbone, Marionette, $, _ ) {
  
    'use strict';
  
    var Controls = Views.Controls = Marionette.ItemView.extend({
      template: '#tmpl-controls',
  
      el: '#controls',
  
      events: {
        'click .play'       : 'toggle',
        'touchstart .play'  : 'toggle',
        'click .start'      : 'start',
        'touchstart .start' : 'start',
        'click .rw'         : 'rewind',
        'touchstart .rw'    : 'rewind',
        'click .ff'         : 'fastForward',
        'touchstart .ff'    : 'fastForward'
      },
  
      ui: {
        clock : '.clock'
      },
  
      modelEvents: {
        'change:playing': 'render'
      },
  
      initialize: function() {
        this.unhide();
        App.vent.on('anim-tick', function() {
          this.updatePosition();
        }.bind(this));
        this.render();
      },
  
      serializeData: function() {
        var data = this.model.toJSON();
        data.playing = data.playing ? '' : 'paused';
        return data;
      },
  
      toggle: function( ev ) {
        if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
          return;
        }
        if ( this.model.get('playing') ) {
          this.model.pause();
        } else {
          this.model.play();
        }
      },
  
      start: function( ev ) {
        if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
          return;
        }
        this.model.play(0);
        if ( !this.model.get('playing') ) {
          this.model.pause();
        }
      },
  
      rewind: function( ev ) {
        var pos;
        if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
          return;
        }
        pos = this.model.get('position');
        if ( this.model.get('playing') ) {
          this.model.play(pos - 10);
        }  else {
          this.model.set('position', pos - 10);
        }
      },
  
      fastForward: function( ev ) {
        var pos;
        if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
          return;
        }
        pos = this.model.get('position');
        if ( this.model.get('playing') ) {
          this.model.play(pos + 10);
        }  else {
          this.model.set('position', pos + 10);
        }
      },
  
      updatePosition: function() {
        var canvas = this.ui.clock[0],
          ctx = canvas.getContext('2d'),
          pos = this.model.attributes.position,
          str = App.util.formatTime(pos),
          ghost = ['8', '8', ':', '8', '8', ':', '8', '8'],
          arr = str.split(''),
          i = 0,
          x = 78;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '76px "digital-7"';
        ctx.textAlign = 'right';
        // draw ghost 7-segment
        // faster to loop twice than to keep changing fillStyle
        ctx.fillStyle = 'hsla(215, 77%, 76%, 0.085)';
        while ( i < 8 ) {
          ctx.fillText(ghost[i], x, 88);
          x += ( ghost[++i] === ':' ? 20 : 40 );
        }
        i = 0;
        x = 78;
        // draw actual position
        ctx.fillStyle = 'hsl(215, 77%, 76%)';
        while ( i < 8 ) {
          ctx.fillText(arr[i], x, 88);
          x += ( arr[++i] === ':' ? 20 : 40 );
        }
      },
  
      unhide: function() {
        this.$el.show();
      }
  
    });
  
  });
  

}(this));
