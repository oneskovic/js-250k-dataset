// Sounds ----------------------------------------------------------------------
// -----------------------------------------------------------------------------
function SoundPlayer(max, dir, sounds) {
    var that = this;
    
    // IE9 doesn't expose the Audio object... idiots...
    if (typeof Audio === 'undefined') {  
        window.Audio = function() {
            return document.createElement('audio');
        };
    }
    
    // Sounds 
    this.enabled = true;
    this.soundType = (new Audio()).canPlayType('audio/mp3') ? 'mp3' : 'ogg';
    this.soundFiles = sounds;
    this.soundDirectory = dir;
    this.soundMax = max;
    
    // Preload
    this.sounds = {};
    for(var i = 0; i < this.soundFiles.length; i++) {
        this.sounds[this.soundFiles[i]] = [];
        this.Sound(this.soundFiles[i], 0.0);
    }
}

SoundPlayer.prototype.play = function(snd) {
    if (!this.enabled) {
        return;
    }
    
    var sounds = this.sounds[snd];
    for(var i = 0; i < sounds.length; i++) {
        if (sounds[i]._isReady && !sounds[i]._isPlaying) {
            sounds[i]._isPlaying = true;
            sounds[i].volume = 0.5;
            sounds[i].play();
            return true;
        }
    }
    if (sounds.length < this.soundMax) {
        this.Sound(snd, 0.5);
    }
};

SoundPlayer.prototype.Sound = function(snd, volume) {
    var a = new Audio();
    a._isReady = false;
    a._isPlaying = false;
    
    a.addEventListener('ended', function() {
        this._isPlaying = false;
    }, false);
    
    a.addEventListener('error', function() {
        this._isPlaying = false;
    }, false);
    
    a.addEventListener('empty', function() {
        this._isPlaying = false;
    }, false);
    
    a.volume = volume;
    a.addEventListener('canplay', function() {
        this._isReady = true;
        if (this.volume > 0.0) {
            this._isPlaying = true;
            a.play();
        }
    }, false);
    a.src = this.soundDirectory + '/' + snd + '.' + this.soundType;
    this.sounds[snd].push(a);
};

