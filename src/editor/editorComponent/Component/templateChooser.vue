<template>
  <ep-modal v-model="templateModal" :before-close="closeTemplateModal" width="840px">
    <div class="body-containter">
      <div class="left-container">
        <ul style="list-style: none">
          <li v-for="(item,index) in tabs">
            <button class="li-btn" :class="activeIndex == index? 'selected':''" @click="changeActive(index)">{{ item }}
            </button>
          </li>
        </ul>
      </div>
      <div class="right-container">
        <div v-if="activeIndex == 0" style="padding: 8px">
          <code-editor language="html" ref="htmlEditor"
                       :init-format="true"
                       :min-height="510" :max-height="510"
                       :codes="htmlContent"
                       @update:codes="handleUpdate">
          </code-editor>
        </div>
        <div v-if="activeIndex == 1" style="height: 451px;">
          <div class="search-container">
          </div>
          <div class="table-container">
            <div v-for="item in templateData" style="display: inline-block;float: left">
              <ep-advance-card style="width: 150px;min-height: 170px;margin-top: 50px;margin-right: 15px;"
                               @click.native="insertHtmlBlock(item)">
                <div style="transform:scale(0.5,0.5);" v-html="item"></div>
              </ep-advance-card>
            </div>
          </div>
          <div class="meta-link">
            <ep-pager style="float: right" :total-num="templateData.length" layout="pager"
                      @change="handleChange"></ep-pager>
          </div>
        </div>
      </div>
    </div>
    <div class="meta">
      <div class="dialog-tip" title="提示: 在编辑器中输入 &quot;[&quot;后，出现建议的页面，然后插入链接。">提示: 在编辑器中输入 "|"后，出现建议的页面，然后插入链接。</div>
      <div class="meta-btn-container">
        <ep-button size="small" type="primary" @click="doInsertHtml">确定</ep-button>
        <ep-button size="small" @click="closeTemplateModal">取消</ep-button>
      </div>
    </div>
  </ep-modal>
</template>

<script>
import CodeEditor from "./code-editor";

export default {
  name: 'templateChooser',
  components: {CodeEditor},
  props: ['templateModal'],
  data() {
    return {
      tabs: ['自定义html', 'html模板'],
      activeIndex: 0,

      page: {
        orderBy: 'id,desc',
        psLike_title: '',
        totalNum: 100,
        limit: 10,
        offset: 1
      },
      activeTemplate: {},
      htmlContent: '<div>\n' +
          '\n' +
          '</div>',
      templateData: [
        '<div style="display: flex">\n' +
        '      <label title="姓名"\n' +
        '        style="width: 100px;\n' +
        '        text-align: right;\n' +
        '        vertical-align: middle;\n' +
        '        float: left;\n' +
        '        font-size: 14px;\n' +
        '        padding-right: 12px;\n' +
        '        line-height: 32px;\n' +
        '        box-sizing: border-box;\n' +
        '        -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);\n' +
        '        transition: color .2s cubic-bezier(.645,.045,.355,1);color: initial;">\n' +
        '        姓名\n' +
        '      </label>\n' +
        '      <div\n' +
        '          style="margin-left: 0px;\n' +
        '    min-height: 32px;\n' +
        '    line-height: 9px;\n' +
        '    position: relative;\n' +
        '    font-size: 14px;">\n' +
        '        <div class="ep-input">\n' +
        '          <input type="text" autocomplete="off"\n' +
        '            style="-webkit-appearance: none;\n' +
        '            -moz-appearance: none;\n' +
        '            appearance: none;\n' +
        '            border: 1px solid #ddd;\n' +
        '            border-radius: 2px;\n' +
        '            box-sizing: border-box;\n' +
        '            color: #212121;\n' +
        '            display: block;\n' +
        '            font-size: inherit;\n' +
        '            font-family: inherit;\n' +
        '            height: 32px;\n' +
        '            line-height: 1;\n' +
        '            outline: 0;\n' +
        '            padding: 5px 6px;\n' +
        '            -webkit-transition: all .3s cubic-bezier(.25,.8,.25,1);\n' +
        '            transition: all .3s cubic-bezier(.25,.8,.25,1);\n' +
        '            width: 100%;\n' +
        '            background: initial;">\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>',
        '<div style="display: flex">\n' +
        '      <label title="手机号"\n' +
        '        style="width: 120px;\n' +
        '        text-align: right;\n' +
        '        vertical-align: middle;\n' +
        '        float: left;\n' +
        '        font-size: 14px;\n' +
        '        padding-right: 12px;\n' +
        '        line-height: 32px;\n' +
        '        box-sizing: border-box;\n' +
        '        -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);\n' +
        '        transition: color .2s cubic-bezier(.645,.045,.355,1);color: initial;">\n' +
        '        手机号\n' +
        '      </label>\n' +
        '      <div\n' +
        '          style="margin-left: 0px;\n' +
        '    min-height: 32px;\n' +
        '    line-height: 9px;\n' +
        '    position: relative;\n' +
        '    font-size: 14px;">\n' +
        '        <div class="ep-input">\n' +
        '          <input type="text" autocomplete="off"\n' +
        '            style="-webkit-appearance: none;\n' +
        '            -moz-appearance: none;\n' +
        '            appearance: none;\n' +
        '            border: 1px solid #ddd;\n' +
        '            border-radius: 2px;\n' +
        '            box-sizing: border-box;\n' +
        '            color: #212121;\n' +
        '            display: block;\n' +
        '            font-size: inherit;\n' +
        '            font-family: inherit;\n' +
        '            height: 32px;\n' +
        '            line-height: 1;\n' +
        '            outline: 0;\n' +
        '            padding: 5px 6px;\n' +
        '            -webkit-transition: all .3s cubic-bezier(.25,.8,.25,1);\n' +
        '            transition: all .3s cubic-bezier(.25,.8,.25,1);\n' +
        '            width: 100%;\n' +
        '            background: initial;">\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>'
      ]
    }
  },
  methods: {
    handleUpdate(val) {
      this.htmlContent = val
    },
    changeActive(index) {
      this.activeIndex = index
    },
    closeTemplateModal() {
      this.htmlContent = '<div>\n' + '\n' + '</div>'
      this.$emit('closeTemplateModal')
    },
    doInsertHtml() {
      if (this.activeIndex == 0) {
        this.$emit('insertHtmlBlock', this.htmlContent)
      } else if (this.activeIndex == 1) {
        this.$emit('insertHtmlBlock', this.activeTemplate)
      }
      this.closeTemplateModal()
    },
    handleChange() {

    },
    insertHtmlBlock(html) {
      this.activeTemplate = html
    }
  }
}
</script>

<style scoped lang="less">
.right-container {
  position: relative;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
  height: 100%;
  list-style: none;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0px 10px 0px 10px;
  width: 75%;
}

.table-container {
  height: 500px;
  overflow: auto;
}

.field-group {
  box-sizing: border-box;
  clear: both;
  padding: 4px 0 4px 145px;
  position: relative;
  margin: 1px 0;
  width: 100%;
}

.li-btn {
  background: none;
  border: 0;
  color: #3572b0;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.1428;
  padding: 7px 10px;
  margin: 0;
  text-align: left;
  text-decoration: none;
  width: 100%;

  &
  .selected {
    color: black;
    font-weight: bold;
  }

}

.left-container {
  background: #fff;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  float: left;
  height: 100%;
  list-style: none;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 10px 20px 10px;
  width: 25%;
}

.body-containter {
  height: 550px;
  border-top: 1px solid #ccc;
  display: block;
}

.meta {
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  clear: both;
  height: 51px;
  overflow: hidden;
  padding: 10px;
  text-align: right;
  width: 100%;
}

.dialog-tip {
  float: left;
  line-height: 30px;
  color: #707070;
  text-align: left;
  font-size: 13px;
}

.meta-btn-container {
  float: right;
  margin-right: 10px;
}

.meta-link {
  border-top: 1px solid #ccc;
  font-size: 13px;
  height: 34px;
  padding: 5px 8px;
}

.li-btn {
  background: none;
  border: 0;
  color: #3572b0;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.1428;
  padding: 7px 10px;
  margin: 0;
  text-align: left;
  text-decoration: none;
  width: 100%;
}

.li-btn.selected {
  color: black;
  font-weight: bold;
}
</style>
