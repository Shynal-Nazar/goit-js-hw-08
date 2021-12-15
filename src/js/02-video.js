import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURENTTIME = 'videoplayerCurrentTime';

const iframeEl = document.querySelector('iframe');
const player = new Vimeo.Player(iframeEl);
const timeData = localStorage.getItem(CURENTTIME);

if (timeData) {
  player.setCurrentTime(timeData);
}

player.on('timeupdate', throttle(savedTime, 1000));
function savedTime(data) {
  localStorage.setItem(CURENTTIME, data.seconds);
}
