import { Store, Observer } from 'le5le-store';
import { Options } from './options';
import { Node } from './models/node';
import { Lock } from './models/status';
import { images, PenType } from './models/pen';
import { Layer } from './layer';
import { find } from './utils';

let videos: { [key: string]: { player: HTMLElement; current: HTMLElement; media: HTMLMediaElement; }; } = {};

export class DivLayer extends Layer {
  canvas = document.createElement('div');
  player = document.createElement('div');
  curNode: Node;
  playBtn: HTMLElement;
  currentTime: HTMLElement;
  progressCurrent: HTMLElement;
  progress: HTMLElement;
  loop: HTMLElement;
  media: HTMLMediaElement;
  audios: { [key: string]: { player: HTMLElement; current: HTMLElement; media: HTMLMediaElement; }; } = {};
  iframes: { [key: string]: HTMLIFrameElement; } = {};
  elements: { [key: string]: HTMLElement; } = {};
  gifs: { [key: string]: HTMLImageElement; } = {};

  private subcribeDiv: Observer;
  private subcribePlay: Observer;
  private subcribeNode: Observer;
  constructor(public parentElem: HTMLElement, public options: Options = {}, TID: string) {
    super(TID);
    if (!this.options.playIcon) {
      this.options.playIcon = 't-icon t-play';
    }
    if (!this.options.pauseIcon) {
      this.options.pauseIcon = 't-icon t-pause';
    }
    if (!this.options.fullScreenIcon) {
      this.options.fullScreenIcon = 't-icon t-full-screen';
    }
    if (!this.options.loopIcon) {
      this.options.loopIcon = 't-icon t-loop';
    }

    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    this.canvas.style.outline = 'none';
    this.canvas.style.background = 'transparent';
    parentElem.appendChild(this.canvas);
    parentElem.appendChild(this.player);
    this.createPlayer();
    this.subcribeDiv = Store.subscribe(this.generateStoreKey('LT:addDiv'), this.addDiv);
    this.subcribeDiv = Store.subscribe(this.generateStoreKey('LT:removeDiv'), this.removeDiv);
    this.subcribePlay = Store.subscribe(this.generateStoreKey('LT:play'), (e: { pen: Node; pause?: boolean; }) => {
      this.playOne(e.pen, e.pause);
    });

    this.subcribeNode = Store.subscribe(this.generateStoreKey('LT:activeNode'), (node: Node) => {
      if (!node || (!node.video && !node.audio)) {
        this.player.style.top = '-99999px';
        return;
      }

      if (node.audio && this.audios[node.id]) {
        this.media = this.audios[node.id].media;
      } else if (node.video && videos[node.id]) {
        this.media = videos[node.id].media;
      } else {
        return;
      }

      this.curNode = node;
      const rect = this.parentElem.getBoundingClientRect();
      this.player.style.top = rect.top + this.parentElem.clientHeight - 40 + 'px';
      this.player.style.left = rect.left + 'px';
      this.player.style.width = this.parentElem.clientWidth + 'px';
      this.getMediaCurrent();
      if (this.media.paused) {
        this.playBtn.className = this.options.playIcon;
      } else {
        this.playBtn.className = this.options.pauseIcon;
      }
    });

    document.addEventListener('fullscreenchange', (e) => {
      if (!this.media) {
        return;
      }
      if (document.fullscreen) {
        this.media.controls = true;
        this.media.style.userSelect = 'initial';
        this.media.style.pointerEvents = 'initial';
      } else {
        this.media.style.userSelect = 'none';
        this.media.style.pointerEvents = 'none';
        this.media.controls = false;
      }
    });
  }

  addDiv = (node: Node) => {
    if (node.audio) {
      if (this.audios[node.id] && this.audios[node.id].media.src !== node.audio) {
        this.audios[node.id].media.src = node.audio;
      }
      setTimeout(() => {
        this.setElemPosition(node, (this.audios[node.id] && this.audios[node.id].player) || this.addMedia(node, 'audio'));
      });
    }
    if (node.video) {
      if (videos[node.id] && videos[node.id].media.src !== node.video) {
        videos[node.id].media.src = node.video;
      }
      setTimeout(() => {
        this.setElemPosition(node, (videos[node.id] && videos[node.id].player) || this.addMedia(node, 'video'));
      });
    }

    if (node.iframe) {
      if (!this.iframes[node.id]) {
        this.addIframe(node);
        setTimeout(() => {
          this.addDiv(node);
        });
      } else {
        if (this.iframes[node.id].src !== node.iframe) {
          this.iframes[node.id].src = node.iframe;
        }
        this.setElemPosition(node, this.iframes[node.id]);
      }
    }

    if (node.elementId) {
      if (!this.elements[node.id]) {
        this.elements[node.id] = document.getElementById(node.elementId);

        if (this.elements[node.id]) {
          this.canvas.appendChild(this.elements[node.id]);
        }
      }

      this.setElemPosition(node, this.elements[node.id]);
    }

    if (node.gif) {
      if (node.image.indexOf('.gif') < 0) {
        node.gif = false;
        this.canvas.removeChild(this.gifs[node.id]);
        this.gifs[node.id] = undefined;
      } else if (node.img) {
        if (this.gifs[node.id] && this.gifs[node.id].src !== node.image) {
          this.gifs[node.id].src = node.image;
        }
        this.setElemPosition(node, this.gifs[node.id] || this.addGif(node));
      }
    }

    if (node.children) {
      for (const child of node.children) {
        if (child.type === PenType.Line) {
          continue;
        }
        this.addDiv(child as Node);
      }
    }
  };

  createPlayer = () => {
    this.player.style.position = 'fixed';
    this.player.style.outline = 'none';
    this.player.style.top = '-99999px';
    this.player.style.height = '40px';
    this.player.style.padding = '10px 15px';
    this.player.style.background = 'rgba(200,200,200,.1)';
    this.player.style.display = 'flex';
    this.player.style.alignItems = 'center';
    this.player.style.userSelect = 'initial';
    this.player.style.pointerEvents = 'initial';
    this.player.style.zIndex = '1';

    this.playBtn = document.createElement('i');
    this.currentTime = document.createElement('span');
    this.progress = document.createElement('div');
    this.progressCurrent = document.createElement('div');
    this.loop = document.createElement('i');
    const fullScreen = document.createElement('i');

    this.playBtn.className = this.options.playIcon;
    this.playBtn.style.fontSize = '18px';
    this.playBtn.style.lineHeight = '20px';
    this.playBtn.style.cursor = 'pointer';
    this.currentTime.style.padding = '0 10px';
    this.currentTime.innerText = '0 / 0';
    this.progress.style.position = 'relative';
    this.progress.style.flexGrow = '1';
    this.progress.style.top = '0';
    this.progress.style.height = '4px';
    this.progress.style.background = '#ccc';
    this.progress.style.borderRadius = '2px';
    this.progress.style.overflow = 'hidden';
    this.progress.style.cursor = 'pointer';
    this.progressCurrent.style.position = 'absolute';
    this.progressCurrent.style.left = '0';
    this.progressCurrent.style.top = '0';
    this.progressCurrent.style.bottom = '0';
    this.progressCurrent.style.width = '0';
    this.progressCurrent.style.background = '#52c41a';
    this.loop.style.margin = '0 10px';
    this.loop.style.padding = '2px 5px';
    this.loop.style.borderRadius = '2px';
    this.loop.className = this.options.loopIcon;
    this.loop.style.fontSize = '18px';
    this.loop.style.lineHeight = '20px';
    this.loop.style.cursor = 'pointer';
    fullScreen.className = this.options.fullScreenIcon;
    fullScreen.style.fontSize = '17px';
    fullScreen.style.lineHeight = '20px';
    fullScreen.style.cursor = 'pointer';

    this.player.appendChild(this.playBtn);
    this.player.appendChild(this.currentTime);
    this.player.appendChild(this.progress);
    this.progress.appendChild(this.progressCurrent);
    this.player.appendChild(this.loop);
    this.player.appendChild(fullScreen);

    this.playBtn.onclick = () => {
      if (this.media.paused) {
        this.media.play();
        this.playBtn.className = this.options.pauseIcon;
      } else {
        this.media.pause();
        this.playBtn.className = this.options.playIcon;
      }
    };

    this.progress.onclick = (e: MouseEvent) => {
      this.media.currentTime = (e.offsetX / this.progress.clientWidth) * this.media.duration;
    };

    this.loop.onclick = () => {
      this.media.loop = !this.media.loop;
      this.curNode.playLoop = this.media.loop;
      if (this.media.loop) {
        this.loop.style.background = '#ddd';
      } else {
        this.loop.style.background = 'none';
      }
    };

    fullScreen.onclick = () => {
      this.media.requestFullscreen();
    };
  };

  getMediaCurrent = () => {
    if (!this.media) {
      return;
    }
    this.currentTime.innerText =
      this.formatSeconds(this.media.currentTime) + ' / ' + this.formatSeconds(this.media.duration);
    this.progressCurrent.style.width =
      (this.media.currentTime / this.media.duration) * this.progress.clientWidth + 'px';
  };

  addMedia = (node: Node, type: string) => {
    const player = document.createElement('div');
    const current = document.createElement('div');
    const media = document.createElement(type) as HTMLMediaElement;

    player.id = node.id;
    current.style.position = 'absolute';
    current.style.outline = 'none';
    current.style.left = '0';
    current.style.bottom = '0';
    current.style.height = '2px';
    current.style.background = '#52c41a';

    media.style.position = 'absolute';
    media.style.outline = 'none';
    media.style.left = '0';
    media.style.right = '0';
    media.style.top = '0';
    media.style.bottom = '0';
    if (type === 'video') {
      media.style.width = node.rect.width + 'px';
      media.style.height = node.rect.height + 'px';
    }

    player.style.background = 'transparent';

    if (node.playType === 1) {
      media.autoplay = true;
    }
    media.loop = node.playLoop;
    media.ontimeupdate = () => {
      current.style.width = (media.currentTime / media.duration) * node.rect.width + 'px';
      this.getMediaCurrent();
      if (this.media === media) {
        if (node.playLoop) {
          media.loop = true;
          this.loop.style.background = '#ddd';
        } else {
          media.loop = false;
          this.loop.style.background = 'none';
        }
      }
    };
    media.onended = () => {
      Store.set(this.generateStoreKey('mediaEnd'), node);

      if (this.media === media) {
        this.playBtn.className = this.options.playIcon;
      }
      this.play(node.nextPlay);
    };
    media.onloadedmetadata = () => {
      this.getMediaCurrent();
    };

    media.src = node[type];

    player.appendChild(media);
    player.appendChild(current);
    if (type === 'video') {
      videos[node.id] = {
        player,
        current,
        media,
      };
    } else {
      this.audios[node.id] = {
        player,
        current,
        media,
      };
    }
    this.canvas.appendChild(player);

    return player;
  };

  play(idOrTag: any, pause?: boolean) {
    if (!idOrTag) {
      return;
    }

    const pens = find(idOrTag, this.data.pens);
    pens.forEach((item: Node) => {
      this.playOne(item, pause);
    });
  }

  playOne(item: Node, pause?: boolean) {
    if (item.audio && this.audios[item.id] && this.audios[item.id].media) {
      if (pause) {
        this.audios[item.id].media.pause();
      } else if (this.audios[item.id].media.paused) {
        this.audios[item.id].media.play();
      }
    } else if (item.video && videos[item.id].media) {
      if (pause) {
        videos[item.id].media.pause();
      } else if (videos[item.id].media.paused) {
        videos[item.id].media.play();
      }
    }
  }

  addIframe(node: Node) {
    const iframe = document.createElement('iframe');
    iframe.scrolling = 'no';
    iframe.frameBorder = '0';
    iframe.src = node.iframe;
    this.iframes[node.id] = iframe;
    this.canvas.appendChild(iframe);
    return iframe;
  }

  addGif(node: Node) {
    this.gifs[node.id] = node.img;
    this.canvas.appendChild(node.img);
    return node.img;
  }

  setElemPosition = (node: Node, elem: HTMLElement) => {
    if (!elem) {
      return;
    }
    elem.style.position = 'absolute';
    elem.style.outline = 'none';
    elem.style.left = node.rect.x + this.data.x + 'px';
    elem.style.top = node.rect.y + this.data.y + 'px';
    elem.style.width = node.rect.width + 'px';
    elem.style.height = node.rect.height + 'px';
    elem.style.display = node.visible ? 'inline' : 'none';   // 是否隐藏元素
    if (node.rotate || node.offsetRotate) {
      elem.style.transform = `rotate(${node.rotate + node.offsetRotate}deg)`;
    }
    if (node.video && videos[node.id] && videos[node.id].media) {
      videos[node.id].media.style.width = '100%';
      videos[node.id].media.style.height = '100%';
    }
    if (this.data.locked > Lock.None || node.locked > Lock.None) {
      elem.style.userSelect = 'initial';
      elem.style.pointerEvents = 'initial';
    } else {
      elem.style.userSelect = 'none';
      elem.style.pointerEvents = 'none';
    }
  };

  removeDiv = (item: Node) => {
    if (this.curNode && item.id === this.curNode.id) {
      this.curNode = undefined;
      this.media = undefined;
      this.player.style.top = '-99999px';
    }
    if (item.audio) {
      this.canvas.removeChild(this.audios[item.id].player);
      this.audios[item.id] = undefined;
    }
    if (item.video) {
      this.canvas.removeChild(videos[item.id].player);
      videos[item.id] = undefined;
    }
    if (item.iframe) {
      this.canvas.removeChild(this.iframes[item.id]);
      this.iframes[item.id] = undefined;
    }
    if (item.elementId) {
      this.canvas.removeChild(this.elements[item.id]);
      this.elements[item.id] = undefined;
      item.elementId = '';
    }
    if (item.gif) {
      this.canvas.removeChild(this.gifs[item.id]);
      this.gifs[item.id] = undefined;
    }

    if (item.children) {
      for (const child of item.children) {
        if (child.type === PenType.Line) {
          continue;
        }
        this.removeDiv(child as Node);
      }
    }
  };

  clear(shallow?: boolean) {
    this.canvas.innerHTML = '';
    this.audios = {};
    videos = {};
    this.iframes = {};
    this.elements = {};
    this.gifs = {};

    if (!shallow) {
      // tslint:disable-next-line:forin
      for (const key in images) {
        delete images[key];
      }
    }

    this.player.style.top = '-99999px';
  }

  formatSeconds(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds / 60) % 60;
    const s = Math.floor(seconds % 60);

    let txt = s + '';
    if (m) {
      txt = m + ':' + s;
    } else {
      txt = '0:' + s;
    }
    if (h) {
      txt = h + ':' + m + ':' + s;
    }

    return txt;
  }

  resize(size?: { width: number; height: number; }) {
    if (size) {
      this.canvas.style.width = size.width + 'px';
      this.canvas.style.height = size.height + 'px';
    } else {
      if (this.options.width && this.options.width !== 'auto') {
        this.canvas.style.width = this.options.width + 'px';
      } else {
        this.canvas.style.width = this.parentElem.clientWidth + 'px';
      }
      if (this.options.height && this.options.height !== 'auto') {
        this.canvas.style.height = this.options.height + 'px';
      } else {
        this.canvas.style.height = this.parentElem.clientHeight - 8 + 'px';
      }
    }
  }

  render() {
    for (const item of this.data.pens) {
      if (!item.getTID()) {
        item.setTID(this.TID);
      }
      this.addDiv(item as Node);
    }
  }

  destroy() {
    super.destroy();
    this.clear();
    this.subcribeDiv.unsubscribe();
    this.subcribeNode.unsubscribe();
    this.subcribePlay.unsubscribe();
  }
}
