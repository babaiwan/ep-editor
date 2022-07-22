/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, Gaudenz Alder
 *
 * Usage: DiagramEditor.editElement(elt) where elt is an img or object with
 * a data URI src or data attribute or an svg node with a content attribute.
 *
 * See https://jgraph.github.io/drawio-integration/javascript.html
 */
/**
 * Static method to edit the diagram in the given img or object.
 */
export function initDiagramEditor () {
  function DiagramEditor (config, ui, done, initialized, urlParams) {
    this.config = (config != null) ? config : this.config
    this.ui = (ui != null) ? ui : this.ui
    this.done = (done != null) ? done : this.done
    this.initialized = (initialized != null) ? initialized : this.initialized
    this.urlParams = urlParams
    console.log('构造原型')
    console.log(this)

    var self = this

    this.handleMessageEvent = function (evt) {
      if (self.frame != null && evt.source === self.frame.contentWindow && evt.data.length > 0) {
        try {
          var msg = JSON.parse(evt.data)

          if (msg != null) {
            console.log('msg is')
            console.log(msg)
            self.handleMessage(msg)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
  };

  DiagramEditor.editElement = function (elt, config, ui, done, urlParams) {
    console.log('editing !')
    console.log(elt)
    if (!elt.diagramEditorStarting) {
      elt.diagramEditorStarting = true
      return new DiagramEditor(config, ui, done, function () {
        delete elt.diagramEditorStarting
      }, urlParams).editElement(elt)
    }
  }

  /**
   * Global configuration.
   */
  DiagramEditor.prototype.config = null

  /**
   * Protocol and domain to use.
   */
  DiagramEditor.prototype.drawDomain = 'https://embed.diagrams.net/'

  /**
   * UI theme to be use.
   */
  DiagramEditor.prototype.ui = 'min'

  /**
   * Contains XML for pending image export.
   */
  DiagramEditor.prototype.xml = null

  /**
   * Format to use.
   */
  DiagramEditor.prototype.format = 'xml'

  /**
   * Specifies if libraries should be enabled.
   */
  DiagramEditor.prototype.libraries = true

  /**
   * CSS style for the iframe.
   */
  DiagramEditor.prototype.frameStyle = 'position:absolute;border:0;width:100%;height:700px;'

  /**
   * Adds the iframe and starts editing.
   */
  DiagramEditor.prototype.editElement = function (elem, base64String) {
    var src = base64String === undefined ? this.getElementData(elem) : base64String
    this.startElement = elem
    var fmt = this.format

    if (src.substring(0, 15) === 'data:image/png;') {
      fmt = 'xmlpng'
    } else if (src.substring(0, 19) === 'data:image/svg+xml;' ||
      elem.nodeName.toLowerCase() === 'svg') {
      fmt = 'xmlsvg'
    }
    this.startEditing(src, fmt)
    return this
  }

  DiagramEditor.prototype.helloWorld = function (elem) {
    console.log('hello world')
    return elem
  }

  /**
   * Adds the iframe and starts editing.
   */
  DiagramEditor.prototype.getElementData = function (elem) {
    var name = elem.nodeName.toLowerCase()

    return elem.getAttribute((name === 'svg') ? 'content'
      : ((name === 'img') ? 'src' : 'data'))
  }

  /**
   * Adds the iframe and starts editing.
   */
  DiagramEditor.prototype.setElementData = function (elem, data) {
    var name = elem.nodeName.toLowerCase()

    if (name === 'svg') {
      elem.outerHTML = atob(data.substring(data.indexOf(',') + 1))
    } else {
      elem.setAttribute((name === 'img') ? 'src' : 'data', data)
    }

    return elem
  }

  /**
   * Starts the editor for the given data.
   */
  DiagramEditor.prototype.startEditing = function (data, format, title) {
    if (this.frame == null) {
      console.log('frame is null,creating frame')
      window.addEventListener('message', this.handleMessageEvent)
      this.format = (format != null) ? format : this.format
      this.title = (title != null) ? title : this.title
      this.data = data

      this.frame = this.createFrame(
        this.getFrameUrl(),
        this.getFrameStyle())
      document.getElementById('drawIoContainer').appendChild(this.frame)
      this.setWaiting(true)
    } else {
      console.log('frame is not null')
    }
  }

  /**
   * Updates the waiting cursor.
   */
  DiagramEditor.prototype.setWaiting = function (waiting) {
    if (this.startElement != null) {
      // Redirect cursor to parent for SVG and object
      var elt = this.startElement
      var name = elt.nodeName.toLowerCase()

      if (name === 'svg' || name === 'object') {
        elt = elt.parentNode
      }

      if (elt != null) {
        if (waiting) {
          this.frame.style.pointerEvents = 'none'
          this.previousCursor = elt.style.cursor
          elt.style.cursor = 'wait'
        } else {
          elt.style.cursor = this.previousCursor
          this.frame.style.pointerEvents = ''
        }
      }
    }
  }

  /**
   * Updates the waiting cursor.
   */
  DiagramEditor.prototype.setActive = function (active) {
    if (active) {
      this.previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = this.previousOverflow
    }
  }
  /**
   * Removes the iframe.
   */
  DiagramEditor.prototype.stopEditing = function () {
    if (this.frame != null) {
      window.removeEventListener('message', this.handleMessageEvent)
      document.body.removeChild(this.frame)
      this.setActive(false)
      this.frame = null
    }
  }

  /**
   * Send the given message to the iframe.
   */
  DiagramEditor.prototype.postMessage = function (msg) {
    console.log('发信息')
    console.log(this.frame)
    if (this.frame != null) {
      console.log(msg)
      if (msg.action === 'status') {
        this.frame.contentWindow.postMessage(JSON.stringify(msg), '*')
      } else {
        this.frame.contentWindow.postMessage(JSON.stringify(msg), '*')
      }
    }
  }

  /**
   * Returns the diagram data.
   */
  DiagramEditor.prototype.getData = function () {
    return this.data
  }

  /**
   * Returns the title for the editor.
   */
  DiagramEditor.prototype.getTitle = function () {
    return this.title
  }

  /**
   * Returns the CSS style for the iframe.
   */
  DiagramEditor.prototype.getFrameStyle = function () {
    var style = this.frameStyle + ';left:' +
      document.body.scrollLeft + 'px;top:' +
      document.body.scrollTop + 'px;'
    console.log('style is')
    console.log(style)
    return style
  }

  /**
   * Returns the URL for the iframe.
   */
  DiagramEditor.prototype.getFrameUrl = function () {
    var url = this.drawDomain + '?proto=json&spin=1'

    if (this.ui != null) {
      url += '&ui=' + this.ui
    }

    if (this.libraries != null) {
      url += '&libraries=1'
    }

    if (this.config != null) {
      url += '&configure=1'
    }

    if (this.urlParams != null) {
      url += '&' + this.urlParams.join('&')
    }
    url += '&lang=zh'// 默认中文显示

    console.log('url is')
    console.log(url) // 'http://192.168.8.3:8080?proto=json&spin=1&ui=min&libraries=1&lang=zh'
    return url
  }

  /**
   * Creates the iframe.
   */
  DiagramEditor.prototype.createFrame = function (url, style) {
    console.log('creating Frame')
    var frame = document.createElement('iframe')
    frame.setAttribute('frameborder', '0')
    frame.setAttribute('style', style)
    frame.setAttribute('src', url)

    return frame
  }

  /**
   * Sets the status of the editor.
   */
  DiagramEditor.prototype.setStatus = function (messageKey, modified) {
    this.postMessage({action: 'status', messageKey: messageKey, modified: modified})
  }

  /**
   * Handles the given message.
   */
  DiagramEditor.prototype.handleMessage = function (msg) {
    console.log('msg is:' + msg.event)
    if (msg.event === 'configure') {
      this.configureEditor()
    } else if (msg.event === 'init') {
      this.initializeEditor()
    } else if (msg.event === 'autosave') {
      this.save(msg.xml, true, this.startElement)
    } else if (msg.event === 'export') {
      this.setElementData(this.startElement, msg.data)
      this.stopEditing()
      this.xml = null
    } else if (msg.event === 'save') {
      this.save(msg.xml, false, this.startElement)
      this.xml = msg.xml

      if (msg.exit) {
        msg.event = 'exit'
      } else {
        this.setStatus('allChangesSaved', false)
      }
    }

    if (msg.event === 'exit') {
      if (this.format !== 'xml') {
        if (this.xml != null) {
          this.postMessage({
            action: 'export',
            format: this.format,
            xml: this.xml,
            spinKey: 'export'
          })
        } else {
          this.stopEditing(msg)
        }
      } else {
        if (msg.modified == null || msg.modified) {
          this.save(msg.xml, false, this.startElement)
        }

        this.stopEditing(msg)
      }
    }
  }

  /**
   * Posts configure message to editor.
   */
  DiagramEditor.prototype.configureEditor = function () {
    this.postMessage({action: 'configure', config: this.config})
  }

  /**
   * Posts load message to editor.
   */
  DiagramEditor.prototype.initializeEditor = function () {
    console.log('initializeEditor')
    this.postMessage({
      action: 'load',
      autosave: 1,
      saveAndExit: '1',
      modified: 'unsavedChanges',
      xml: this.getData(),
      title: this.getTitle()
    })
    this.setWaiting(false)
    this.setActive(true)
    this.initialized()
  }

  /**
   * Saves the given data.
   */
  DiagramEditor.prototype.save = function (data, draft, elt) {
    // 上传图片至服务器的钩子 用外部的回调函数
    console.log('saving data')
    // this.postMessage({action:'export',format:'png'})
    this.done(data, draft, elt)
  }

  /**
   * Invoked after save.
   */
  DiagramEditor.prototype.done = function () {
    // hook for subclassers(钩子)
    // 插入到文本编辑器中
  }

  /**
   * Invoked after the editor has sent the init message.
   */
  DiagramEditor.prototype.initialized = function () {
    // hook for subclassers
  }

  return DiagramEditor
}
