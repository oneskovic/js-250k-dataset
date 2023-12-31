(function(Application, Window, GUI, Dialogs, VFS) {
  'use strict';

  /////////////////////////////////////////////////////////////////////////////
  // LOCALES
  /////////////////////////////////////////////////////////////////////////////

  var _Locales = {
    no_NO : {
      'Playlist' : 'Spilleliste',
      'Playback aborted' : 'Avspilling avbrutt',
      'Network or communication error' : 'Nettverks- eller kommunikasjonsfeil',
      'Decoding failed. Corruption or unsupported media' : 'Dekoding feilet. Korrupt eller ustøttet media',
      'Media source not supported' : 'Media-kilde ikke støttet',
      'Failed to play file' : 'Klarte ikke spille av fil',
      'Artist' : 'Artist',
      'Album' : 'Album',
      'Track' : 'Låt',
      'Time' : 'Tid',
      'Media information query failed' : 'Media-informasjon forespursel feil',
      'seek unavailable in format' : 'spoling utilgjenglig i format',
      'The audio type is not supported: {0}' : 'Denne lyd-typen er ikke støttet: {0}',
    },
    pl_PL : {
      'Playlist' : 'Playlista',
      'Playback aborted' : 'Odtwarzanie Przerwane',
      'Network or communication error' : 'Błąd Sieci lub Komunikacji',
      'Decoding failed. Corruption or unsupported media' : 'Dekodowanie nie powiodło się. Uszkodzony lub nieobsługiwany plik',
      'Media source not supported' : 'Plik nie jest wspierany',
      'Failed to play file' : 'Nie można odtworzyć pliku',
      'Artist' : 'Artysta',
      'Album' : 'Album',
      'Track' : 'Ścieżka',
      'Time' : 'Czas',
      'Media information query failed' : 'Brak informacji',
      'seek unavailable in format' : 'Przewijanie nie jest obsługiwane w tym formacie',
      'The audio type is not supported: {0}' : 'Ten typ audio nie jest obsługiwany: {0}',
    },
    de_DE : {
      'Playlist' : 'Wiedergabeliste',
      'Playback aborted' : 'Wiedergabe abgebrochen',
      'Network or communication error' : 'Netzwerk Kommunikationsfehler',
      'Decoding failed. Corruption or unsupported media' : 'Dekodierung gescheitert. Fehlerhafte oder nicht unterstützte Datei',
      'Media source not supported' : 'Medienquelle nicht unterstützt',
      'Failed to play file' : 'Wiedergabe der Datei gescheitert',
      'Artist' : 'Künstler',
      'Album' : 'Album',
      'Track' : 'Titel',
      'Time' : 'Zeit',
      'Media information query failed' : 'Media Informationssuche gescheitert',
      'seek unavailable in format' : 'Spulen im Format nicht verfügbar',
      'The audio type is not supported: {0}' : 'Der Audio-Typ {0} ist nicht unterstützt',
    },
    fr_FR : {
    },
    ru_RU : {
      'Playlist' : 'Список воспроизведения',
      'Playback aborted' : 'Воспроизведение прервано',
      'Network or communication error' : 'Ошибка соединения',
      'Decoding failed. Corruption or unsupported media' : 'Не удалось декодировать файл. Файл поврежден или данынй формат не поддерживается',
      'Media source not supported' : 'Медиа этого типа не поддерживается',
      'Failed to play file' : 'Ошибка воспроизведения',
      'Artist' : 'Артист',
      'Album' : 'Альбом',
      'Track' : 'Трек',
      'Time' : 'Время',
      'Media information query failed' : 'Ошибка в запросе медиа-информации',
      'seek unavailable in format' : 'Перемотка недоступна в этом формате',
      'The audio type is not supported: {0}' : 'Тип аудио не поддерживается: {0}'
    },
    nl_NL : {
      'Playlist' : 'Afspeel lijst',
      'Playback aborted' : 'Spelen onderbroken',
      'Network or communication error' : 'Netwerk communicatie fout',
      'Decoding failed. Corruption or unsupported media' : 'Dekoderen lukt niet: bestandstype wordt niet ondersteund',
      'Media source not supported' : 'Media bron wordt niet ondersteund',
      'Failed to play file' : 'Afspelen lukt niet',
      'Artist' : 'Artiest',
      'Album' : 'Album',
      'Track' : 'Naam',
      'Time' : 'Tijd',
      'Media information query failed' : 'Zoeken naar media is niet gelukt',
      'seek unavailable in format' : 'Voor/acteruit spoelen is niet beschikbaar in dit formaat',
      'The audio type is not supported: {0}' : 'Audio type {0} wordt niet ondersteund',
    }
  };

  function _() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift(_Locales);
    return OSjs.API.__.apply(this, args);
  }

  /////////////////////////////////////////////////////////////////////////////
  // EXPORTS
  /////////////////////////////////////////////////////////////////////////////

  OSjs.Applications = OSjs.Applications || {};
  OSjs.Applications.ApplicationMusicPlayer = OSjs.Applications.ApplicationMusicPlayer || {};
  OSjs.Applications.ApplicationMusicPlayer._ = _;

})(OSjs.Core.Application, OSjs.Core.Window, OSjs.GUI, OSjs.Dialogs, OSjs.VFS);
