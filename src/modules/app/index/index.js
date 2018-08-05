const $ = require('jquery');
const artT = require('art-template');

const Game = require('../../components/game/game.js');
const Utils = require('../../lib/utils.js');

require('./index.less');

!(() => {
  console.log('%clink -----→ game', `
    background: #cacaca;
    padding: 0 5px;
    border-radius: 50px;
    font-size: 14px;
    color: #fff;
  `);
  console.log('%c ✔ supported by dkplus.', `
    font-size: 12px;
    color: #777;
  `);

  let data = {
    title: 'link-game'
  };

  function render() {
    const tpl = require('./index.tpl')();
    const tplRender = artT.compile(tpl);
    $('#root').html(tplRender(data));
  }

  render();
  Game.init();
})();