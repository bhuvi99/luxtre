var io = require('socket.io-client')
var socket_url = 'wss://streamer.cryptocompare.com'
var socket = io(socket_url)

socket.on('connect', () => {
  console.log('Socket connected')
})

socket.on('disconnect', (e) => {
  console.log('Socket disconnected:', e)
})

socket.on('error', err => {
  console.log('socket error', err)
})

socket.on('m', (e) => {

})

export default {
  subscribeBars: function(symbolInfo, resolution, updateCb, uid, resetCache) {
    const channelString = createChannelString(symbolInfo);
    socket.emit('SubAdd', {subs: [channelString]});
  
    var newSub = {
      channelString,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.name].lastBar,
      listener: updateCb,
    };
    _subs.push(newSub);
  },

  unsubscribeBars: function(uid) {
    var subIndex = _subs.findIndex(e => e.uid === uid);
    if (subIndex === -1) return;
    var sub = _subs[subIndex];
    socket.emit('SubRemove', {subs: [sub.channelString]});
    _subs.splice(subIndex, 1);
  }
}

function createChannelString(symbolInfo) {
  var channel = symbolInfo.name.split(/[:/]/);
  const exchange = channel[0] === 'GDAX' ? 'Cryptopia' : channel[0];
  const to = channel[2];
  const from = channel[1];
  return `0~${exchange}~${from}~${to}`;
}
