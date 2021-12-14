import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('iframe');
const player = new Vimeo.Player(iframeEl);
const timeData = localStorage.getItem('videoplayerCurrentTime');

if (timeData >= 0) {
  player.setCurrentTime(timeData);
}

player.on('timeupdate', throttle(savedTime, 1000));
function savedTime(data) {
  localStorage.setItem('videoplayerCurrentTime', data.seconds);
}
