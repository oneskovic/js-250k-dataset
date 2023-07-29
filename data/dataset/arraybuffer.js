"use strict";


var WaveformDataArrayBufferAdapter = module.exports = function WaveformDataArrayBufferAdapter(response_data){
  this.data = response_data;
};


WaveformDataArrayBufferAdapter.isCompatible = function isCompatible(data){
  return data && typeof data === "object" && "byteLength" in data;
};

/**
 * Setup factory to create an adapter based on heterogeneous input formats.
 *
 * It is the preferred way to build an adapter instance.
 *
 * ```javascript
 * var arrayBufferAdapter = WaveformData.adapters.arraybuffer;
 * var xhr = new XMLHttpRequest();
 *
 * // .dat file generated by audiowaveform program
 * xhr.open("GET", "http://example.com/waveforms/track.dat");
 * xhr.responseType = "arraybuffer";
 * xhr.addEventListener("load", function onResponse(progressEvent){
 *  var responseData = progressEvent.target.response;
 *
 *  // doing stuff with the raw data ...
 *  // you only have access to WaveformDataArrayBufferAdapter API
 *  var adapter = arrayBufferAdapter.fromResponseData(responseData);
 *
 *  // or making things easy by using WaveformData ...
 *  // you have access WaveformData API
 *  var waveform = new WaveformData(responseData, arrayBufferAdapter);
 * });
 *
 * xhr.send();
 * ```

 * @static
 * @param {ArrayBuffer} response_data
 * @return {WaveformDataArrayBufferAdapter}
 */
WaveformDataArrayBufferAdapter.fromResponseData = function fromArrayBufferResponseData(response_data){
  return new WaveformDataArrayBufferAdapter(new DataView(response_data));
};

/**
 * @namespace WaveformDataArrayBufferAdapter
 */
WaveformDataArrayBufferAdapter.prototype = {
  /**
   * Returns the data format version number.
   *
   * @return {Integer} Version number of the consumed data format.
   */
  get version(){
    return this.data.getInt32(0, true);
  },
  /**
   * Indicates if the response body is encoded in 8bits.
   *
   * **Notice**: currently the adapter only deals with 8bits encoded data.
   * You should favor that too because of the smaller data network fingerprint.
   *
   * @return {boolean} True if data are declared to be 8bits encoded.
   */
  get is_8_bit(){
    return !!this.data.getUint32(4, true);
  },
  /**
   * Indicates if the response body is encoded in 16bits.
   *
   * @return {boolean} True if data are declared to be 16bits encoded.
   */
  get is_16_bit(){
    return !this.is_8_bit;
  },
  /**
   * Returns the number of samples per second.
   *
   * @return {Integer} Number of samples per second.
   */
  get sample_rate(){
    return this.data.getInt32(8, true);
  },
  /**
   * Returns the scale (number of samples per pixel).
   *
   * @return {Integer} Number of samples per pixel.
   */
  get scale(){
    return this.data.getInt32(12, true);
  },
  /**
   * Returns the length of the waveform data (number of data points).
   *
   * @return {Integer} Length of the waveform data.
   */
  get length(){
    return this.data.getUint32(16, true);
  },
  /**
   * Returns a value at a specific offset.
   *
   * @param {Integer} index
   * @return {number} waveform value
   */
  at: function at_sample(index){
    return Math.round(this.data.getInt8(20 + index));
  }
};
