/**
 * @file ext-imagelib.js
 *
 * @license MIT
 *
 * @copyright 2010 Alexis Deveria
 *
 */

const loadExtensionTranslation = async function (lang) {
  let translationModule;
  try {
    translationModule = await import(`./locale/${encodeURIComponent(lang)}.js`);
  } catch (_error) {
    // eslint-disable-next-line no-console
    console.error(`Missing translation (${lang}) - using 'en'`);
    translationModule = await import(`./locale/en.js`);
  }
  return translationModule.default;
};

export default {
  name: 'imagelib',
  async init ({$, decode64, dropXMLInternalSubset}) {
    const svgEditor = this;
    const imagelibStrings = await loadExtensionTranslation(svgEditor.curPrefs.lang);

    const {uiStrings, canvas: svgCanvas} = svgEditor;

    const allowedImageLibOrigins = imagelibStrings.imgLibs.map(({url}) => {
      try {
        return new URL(url).origin;
      } catch (err) {
        return location.origin;
      }
    });

    /**
    *
    * @returns {void}
    */
    function closeBrowser () {
      $('#imgbrowse_holder').hide();
      document.activeElement.blur(); // make sure focus is the body to correct issue #417
    }

    /**
    * @param {string} url
    * @returns {void}
    */
    function importImage (url) {
      const newImage = svgCanvas.addSVGElementFromJson({
        element: 'image',
        attr: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          id: svgCanvas.getNextId(),
          style: 'pointer-events:inherit'
        }
      });
      svgCanvas.clearSelection();
      svgCanvas.addToSelection([newImage]);
      svgCanvas.setImageURL(url);
    }

    const pending = {};

    let mode = 's';
    let multiArr = [];
    let transferStopped = false;
    let preview, submit;

    /**
     * Contains the SVG to insert.
     * @typedef {PlainObject} ImageLibMessage
     * @property {"imagelib"} namespace Required to distinguish from any other messages of app.
     * @property {string} href Set to same value as previous `ImageLibMetaMessage` `id`.
     * @property {string} data The response (as an SVG string or URL)
    */

    /**
     * Used for setting meta-data before images are retrieved.
     * @typedef {PlainObject} ImageLibMetaMessage
     * @property {"imagelib"} namespace Required to distinguish from any other messages of app.
     * @property {string} name If the subsequent response is an SVG string or if `preview_url`
     *   is present, will be used as the title for the preview image. When an
     *   SVG string is present, will default to the first `<title>`'s contents or
     *   "(SVG #<Length of response>)" if none is present. Otherwise, if `preview_url`
     *   is present, will default to the empty string. Though `name` may be falsy,
     *   it is always expected to be present for meta messages.
     * @property {string} id Identifier (the expected `href` for a subsequent response message);
     * used for ensuring the subsequent response can be tied to this `ImageLibMetaMessage` object.
     * @property {string} [preview_url] When import mode is multiple, used to set an image
     * source along with the name/title. If the subsequent response is an SVG string
     * and there is no `preview_url`, the default will just be to show the
     * name/title. If the response is not an SVG string, the default will be to
     * show that response (i.e., the URL).
     * @property {string} entry Set automatically with div holding retrieving
     * message (until ready to delete)
     * @todo Should use a separate Map instead of `entry`
    */

    /**
     * @param {PlainObject} cfg
     * @param {string} cfg.origin
     * @param {ImageLibMetaMessage|ImageLibMessage|string} cfg.data String is deprecated when parsed to JSON `ImageLibMessage`
     * @returns {void}
     */
    async function onMessage ({origin, data: response}) { // eslint-disable-line no-shadow
      if (!response || !['string', 'object'].includes(typeof response)) {
        // Do nothing
        return;
      }
      let id;
      let type;
      try {
        // Todo: This block can be removed (and the above check changed to
        //   insist on an object) if embedAPI moves away from a string to
        //   an object (if IE9 support not needed)
        response = typeof response === 'object' ? response : JSON.parse(response);
        if (response.namespace !== 'imagelib') {
          return;
        }
        if (!allowedImageLibOrigins.includes('*') && !allowedImageLibOrigins.includes(origin)) {
          // Todo: Surface this error to user?
          console.log(`Origin ${origin} not whitelisted for posting to ${window.origin}`); // eslint-disable-line no-console
          return;
        }
        const hasName = 'name' in response;
        const hasHref = 'href' in response;

        if (!hasName && transferStopped) {
          transferStopped = false;
          return;
        }

        if (hasHref) {
          id = response.href;
          response = response.data;
        }

        // Hide possible transfer dialog box
        $('#dialog_box').hide();
        type = hasName
          ? 'meta'
          : response.charAt(0);
      } catch (e) {
        // This block is for backward compatibility (for IAN and Openclipart);
        //   should otherwise return
        if (typeof response === 'string') {
          const char1 = response.charAt(0);

          if (char1 !== '{' && transferStopped) {
            transferStopped = false;
            return;
          }

          if (char1 === '|') {
            const secondpos = response.indexOf('|', 1);
            id = response.substr(1, secondpos - 1);
            response = response.substr(secondpos + 1);
            type = response.charAt(0);
          }
        }
      }

      let entry, curMeta, svgStr, imgStr;
      switch (type) {
      case 'meta': {
        // Metadata
        transferStopped = false;
        curMeta = response;

        // Should be safe to add dynamic property as passed metadata
        pending[curMeta.id] = curMeta; // lgtm [js/remote-property-injection]

        const name = (curMeta.name || 'file');

        const message = uiStrings.notification.retrieving.replace('%s', name);

        if (mode !== 'm') {
          await $.process_cancel(message);
          transferStopped = true;
          // Should a message be sent back to the frame?

          $('#dialog_box').hide();
        } else {
          entry = $('<div>').text(message).data('id', curMeta.id);
          preview.append(entry);
          curMeta.entry = entry;
        }

        return;
      }
      case '<':
        svgStr = true;
        break;
      case 'd': {
        if (response.startsWith('data:image/svg+xml')) {
          const pre = 'data:image/svg+xml;base64,';
          const src = response.substring(pre.length);
          response = decode64(src);
          svgStr = true;
          break;
        } else if (response.startsWith('data:image/')) {
          imgStr = true;
          break;
        }
      }
      // Else fall through
      default:
        // TODO: See if there's a way to base64 encode the binary data stream
        // const str = 'data:;base64,' + svgedit.utilities.encode64(response, true);

        // Assume it's raw image data
        // importImage(str);

        // Don't give warning as postMessage may have been used by something else
        if (mode !== 'm') {
          closeBrowser();
        } else {
          pending[id].entry.remove();
        }
        // await $.alert('Unexpected data was returned: ' + response, function() {
        //   if (mode !== 'm') {
        //     closeBrowser();
        //   } else {
        //     pending[id].entry.remove();
        //   }
        // });
        return;
      }

      switch (mode) {
      case 's':
        // Import one
        if (svgStr) {
          svgCanvas.importSvgString(response);
        } else if (imgStr) {
          importImage(response);
        }
        closeBrowser();
        break;
      case 'm': {
        // Import multiple
        multiArr.push([(svgStr ? 'svg' : 'img'), response]);
        curMeta = pending[id];
        let title;
        if (svgStr) {
          if (curMeta && curMeta.name) {
            title = curMeta.name;
          } else {
            // Try to find a title
            // `dropXMLInternalSubset` is to help prevent the billion laughs attack
            const xml = new DOMParser().parseFromString(dropXMLInternalSubset(response), 'text/xml').documentElement; // lgtm [js/xml-bomb]
            title = $(xml).children('title').first().text() || '(SVG #' + response.length + ')';
          }
          if (curMeta) {
            preview.children().each(function () {
              if ($(this).data('id') === id) {
                if (curMeta.preview_url) {
                  $(this).html(
                    $('<span>').append(
                      $('<img>').attr('src', curMeta.preview_url),
                      title
                    )
                  );
                } else {
                  $(this).text(title);
                }
                submit.removeAttr('disabled');
              }
            });
          } else {
            preview.append(
              $('<div>').text(title)
            );
            submit.removeAttr('disabled');
          }
        } else {
          if (curMeta && curMeta.preview_url) {
            title = curMeta.name || '';
            entry = $('<span>').append(
              $('<img>').attr('src', curMeta.preview_url),
              title
            );
          } else {
            entry = $('<img>').attr('src', response);
          }

          if (curMeta) {
            preview.children().each(function () {
              if ($(this).data('id') === id) {
                $(this).html(entry);
                submit.removeAttr('disabled');
              }
            });
          } else {
            preview.append($('<div>').append(entry));
            submit.removeAttr('disabled');
          }
        }
        break;
      } case 'o': {
        // Open
        if (!svgStr) { break; }
        closeBrowser();
        const ok = await svgEditor.openPrep();
        if (!ok) { return; }
        svgCanvas.clear();
        svgCanvas.setSvgString(response);
        // updateCanvas();
        break;
      }
      }
    }

    // Receive `postMessage` data
    window.addEventListener('message', onMessage, true);

    /**
    * @param {boolean} show
    * @returns {void}
    */
    function toggleMulti (show) {
      $('#lib_framewrap, #imglib_opts').css({right: (show ? 200 : 10)});
      if (!preview) {
        preview = $('<div id=imglib_preview>').css({
          position: 'absolute',
          top: 45,
          right: 10,
          width: 180,
          bottom: 45,
          background: '#fff',
          overflow: 'auto'
        }).insertAfter('#lib_framewrap');

        submit = $('<button disabled>Import selected</button>')
          .appendTo('#imgbrowse')
          .on('click touchend', function () {
            $.each(multiArr, function (i) {
              const type = this[0];
              const data = this[1];
              if (type === 'svg') {
                svgCanvas.importSvgString(data);
              } else {
                importImage(data);
              }
              svgCanvas.moveSelectedElements(i * 20, i * 20, false);
            });
            preview.empty();
            multiArr = [];
            $('#imgbrowse_holder').hide();
          }).css({
            position: 'absolute',
            bottom: 10,
            right: -10
          });
      }

      preview.toggle(show);
      submit.toggle(show);
    }

    /**
    *
    * @returns {void}
    */
    function showBrowser () {
      let browser = $('#imgbrowse');
      if (!browser.length) {
        $('<div id=imgbrowse_holder><div id=imgbrowse class=toolbar_button>' +
        '</div></div>').insertAfter('#svg_docprops');
        browser = $('#imgbrowse');

        const allLibs = imagelibStrings.select_lib;

        const libOpts = $('<ul id=imglib_opts>').appendTo(browser);
        const frame = $('<iframe src="javascript:0"/>').prependTo(browser).hide().wrap('<div id=lib_framewrap>');

        const header = $('<h1>').prependTo(browser).text(allLibs).css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        });

        const cancel = $('<button>' + uiStrings.common.cancel + '</button>')
          .appendTo(browser)
          .on('click touchend', function () {
            $('#imgbrowse_holder').hide();
          }).css({
            position: 'absolute',
            top: 5,
            right: -10
          });

        const leftBlock = $('<span>').css({position: 'absolute', top: 5, left: 10}).appendTo(browser);

        const back = $('<button hidden>' + imagelibStrings.show_list + '</button>')
          .appendTo(leftBlock)
          .on('click touchend', function () {
            frame.attr('src', 'about:blank').hide();
            libOpts.show();
            header.text(allLibs);
            back.hide();
          }).css({
            'margin-right': 5
          }).hide();

        /* const type = */ $('<select><option value=s>' +
          imagelibStrings.import_single + '</option><option value=m>' +
          imagelibStrings.import_multi + '</option><option value=o>' +
          imagelibStrings.open + '</option></select>').appendTo(leftBlock).change(function () {
          mode = $(this).val();
          switch (mode) {
          case 's':
          case 'o':
            toggleMulti(false);
            break;

          case 'm':
            // Import multiple
            toggleMulti(true);
            break;
          }
        }).css({
          'margin-top': 10
        });

        cancel.prepend($.getSvgIcon('cancel', true));
        back.prepend($.getSvgIcon('tool_imagelib', true));

        imagelibStrings.imgLibs.forEach(function ({name, url, description}) {
          $('<li>')
            .appendTo(libOpts)
            .text(name)
            .on('click touchend', function () {
              frame.attr(
                'src',
                url
              ).show();
              header.text(name);
              libOpts.hide();
              back.show();
            }).append(`<span>${description}</span>`);
        });
      } else {
        $('#imgbrowse_holder').show();
      }
    }

    const buttons = [{
      id: 'tool_imagelib',
      type: 'app_menu', // _flyout
      icon: 'imagelib.png',
      position: 4,
      events: {
        mouseup: showBrowser
      }
    }];

    return {
      svgicons: 'ext-imagelib.xml',
      buttons: imagelibStrings.buttons.map((button, i) => {
        return Object.assign(buttons[i], button);
      }),
      callback () {
        $('<style>').text(
          '#imgbrowse_holder {' +
            'position: absolute;' +
            'top: 0;' +
            'left: 0;' +
            'width: 100%;' +
            'height: 100%;' +
            'background-color: rgba(0, 0, 0, .5);' +
            'z-index: 5;' +
          '}' +
          '#imgbrowse {' +
            'position: absolute;' +
            'top: 25px;' +
            'left: 25px;' +
            'right: 25px;' +
            'bottom: 25px;' +
            'min-width: 300px;' +
            'min-height: 200px;' +
            'background: #B0B0B0;' +
            'border: 1px outset #777;' +
          '}' +
          '#imgbrowse h1 {' +
            'font-size: 20px;' +
            'margin: .4em;' +
            'text-align: center;' +
          '}' +
          '#lib_framewrap,' +
          '#imgbrowse > ul {' +
            'position: absolute;' +
            'top: 45px;' +
            'left: 10px;' +
            'right: 10px;' +
            'bottom: 10px;' +
            'background: white;' +
            'margin: 0;' +
            'padding: 0;' +
          '}' +
          '#imgbrowse > ul {' +
            'overflow: auto;' +
          '}' +
          '#imgbrowse > div {' +
            'border: 1px solid #666;' +
          '}' +
          '#imglib_preview > div {' +
            'padding: 5px;' +
            'font-size: 12px;' +
          '}' +
          '#imglib_preview img {' +
            'display: block;' +
            'margin: 0 auto;' +
            'max-height: 100px;' +
          '}' +
          '#imgbrowse li {' +
            'list-style: none;' +
            'padding: .5em;' +
            'background: #E8E8E8;' +
            'border-bottom: 1px solid #B0B0B0;' +
            'line-height: 1.2em;' +
            'font-style: sans-serif;' +
            '}' +
          '#imgbrowse li > span {' +
            'color: #666;' +
            'font-size: 15px;' +
            'display: block;' +
            '}' +
          '#imgbrowse li:hover {' +
            'background: #FFC;' +
            'cursor: pointer;' +
            '}' +
          '#imgbrowse iframe {' +
            'width: 100%;' +
            'height: 100%;' +
            'border: 0;' +
          '}'
        ).appendTo('head');
      }
    };
  }
};
