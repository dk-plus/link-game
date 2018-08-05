const $ = require('jquery');
const artT = require('art-template');

require('./game.less');

const Game = (() => {

  // 该模块
  const _e = {};

  // 全局操作数据
  const _g = {
    // 操作dom
    ele: {
      root: '#game-wrapper',
      game: '#game',
      line: '#game .line',
      item: '.img-item',
      element: {
        size: 50,
        paddingSide: 40,
      },
      data: {
        x: 5,
        y: 6,
        l: 1,
        z: 6,
        arrMap: []
      },
      level: [
        { x: 5, y: 6, l: 1, z: 6 },
        { x: 6, y: 7, l: 1, z: 6 },
        { x: 7, y: 8, l: 1, z: 8 },
        { x: 8, y: 9, l: 1, z: 8 },
        { x: 9, y: 10, l: 1, z: 10 },
      ],
      curLevel: 1,
      winCallback: () => {},
      music: {
        connectClick: '',
      }
    },
    // 渲染数据
    data: {
      title: 'game'
    },
  }

  let $game;
  let $line;

  // 开发配置
  const config = {
    mockMode: true,
  }

  // 初始化
  _e.init = () => {
    render();
  }

  _e.initWinCallback = (callback) => {
    _g.winCallback = callback;
  }

  _e.nextHard = () => {
    if (_g.curMode < _g.hardMode.length) {
      _g.curMode++;
    }else {
      alert('已经通关');
      return false;
    }
    _e.startGame(_g.curMode);
  }

  _e.startGame = (mode) => {
    _g.curMode = mode;
    $(_g.ele.game).html('');
    _e.initHard(mode);
    initGame();
    gameControl();
  }

  _e.replay = () => {
    _e.startGame(_g.curMode);
  }

  _e.initHard = (mode) => {
    $.extend(_g.data, _g.hardMode[mode-1]);
  }

  function initGame() {
    initElement();
    let eleSize = _g.ele.element.size;
    $game = $(_g.ele.game);

    $game.css({
      width: _g.data.x * eleSize,
      height: _g.data.y * eleSize,
    });
    gameArrMap();
    renderDom();
    $(_g.ele.item).css({
      width: eleSize,
      height: eleSize,
      lineHeight: `${eleSize}px`,
    });
  }

  function gameArrMap() {
    let {
      x,y,l,z
    } = _g.data;

    let arrMap = [];
    for (let i = 0; i<y+2; i++) {
      arrMap[i] = [];
      for (let j = 0; j<x+2; j++) {
        arrMap[i][j] = 0;
      }
    }

    let arrBase = [];
    let max = x*y*l/z;
    for (let i = 0; i<z; i++) {
      for (let j = 0; j<max; j++) {
        arrBase[j + i*max] = j+1;
      }
    }

    let arrOrder = [];
    let arrTemp = [];
    for (let i = 0; i<x*y; i++) {
      arrTemp[i] = i;
    }
    for (let j = 0; j<x*y; j++) {
      let temp = Math.floor(Math.random() * arrTemp.length);
      arrOrder.push(arrTemp.splice(temp, 1)[0]);
    }

    for (let i = 0; i < arrBase.length; i++) {
      arrMap[Math.floor(arrOrder[i]/x + 1)][(arrOrder[i]%x + 1)] = arrBase[i];
    }

    console.log(`
      基础数据：${arrBase},
      位置乱序：${arrOrder}
    `)
    drawArr(arrMap);

    _g.data.arrMap = arrMap;
  }

  function initElement() {
    let paddingSide = _g.ele.element.paddingSide;
    let x = _g.data.x;

    let screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let gameWidth = screenWidth - paddingSide * 2;

    let eleSize = gameWidth / x;

    _g.ele.element.size = eleSize;
  }

  function renderDom() {
    let {
      x,y,l,z,arrMap
    } = _g.data;

    for (let i = 0; i<y; i++) {
      for (let j = 0; j<x; j++) {
        $game.append(`
          <li class='img-item list${arrMap[i+1][j+1]}'></li>
        `)
      }
    }
    $game.append(`
      <li class="line"></li>
      <li class="line"></li>
      <li class="line"></li>
    `);
  }

  function drawArr(arr) {
    let i = arr.length;
    let j = arr[0].length;
    let data = '';
    for (let a = 0; a<i; a++) {
      for (let b = 0; b<j; b++) {
        data += `${arr[a][b]}\t`;
      }
      data += '\n';
    }
    console.log(data);
  }

  function gameControl() {
    let curr = null;
    $game.find('li').bind('click', (e) => {
      let target = e.target;
      if (curr === nul) {
        $(target).addClass('active');
        curr = $(target);
      }else if (curr.index() !== $(target).index()) {
        if (getConnect(curr, $(target))) {
          curr.removeAttr('class').addClass('list0').unbind('click');
          $(target).removeAttr('class').addClass
        }
      }
    })
  }

  // 渲染函数
  function render() {
    const tpl = require('./game.tpl')();
    const tplRender = artT.compile(tpl);

    $(_g.ele.root).html(tplRender(_g.data));
  }

  return _e;

})();

module.exports = Game;
