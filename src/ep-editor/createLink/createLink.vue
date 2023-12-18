<template>
  <ep-modal v-model="createLinkModal"
            :before-close="closeCreateLinkModal"
            width="840px"
            title="编辑链接"
            :wrap-close="true"
            append-to-body
  >
    <div class="body-containter">
      <div class="left-container">
        <ul>
          <li v-for="(item,index) in tabs">
            <button class="li-btn" @click="changeActiveLi(index)" :class="activeIndex == index? 'selected':''">{{ item }}</button>
          </li>
        </ul>
      </div>
      <div class="right-container">
        <div v-if="activeIndex == 0" style="height: 451px;">
          <div class="search-container">
            <div style="display: flex">
              <ep-input style="width: 300px;" v-model="page.psLike_title"></ep-input>
              <ep-button type="primary" style="margin-left: 25px;" @click="searchJournal">搜索</ep-button>
            </div>
          </div>
          <div class="table-container">
            <ep-table :data="journalList"  size="small">
              <ep-table-item column="title" title="标题" width="300">
                <template slot-scope="props">
                  <ep-tag type="primary">{{props.row.id}}</ep-tag>
                  <a style="color: #3572b0;padding-left:7px" @click="fillLinkName(props.row)">{{props.row.title}}</a>
                </template>
              </ep-table-item>
              <ep-table-item column="owner" title="创建人"></ep-table-item>
              <ep-table-item column="createTime" title="创建时间">
                <template slot-scope="props">
                  {{props.row.createTime == null? '':props.row.createTime.substring(0,10)}}
                </template>
              </ep-table-item>
            </ep-table>
          </div>
          <div style="height: 35px">
            <ep-pager style="float: right" :total-num="page.totalNum" layout="pager" @change="handleChange"></ep-pager>
          </div>
          <div class="meta-link">
            <div style="display: flex; position: absolute;bottom: 10px;left: 115px;">
              <div style="padding: 5px">
                链接文字
              </div>
              <div style="width: 300px">
                <ep-input v-model="linkName">

                </ep-input>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeIndex == 1">
          <ep-form>
            <ep-col :col="20">
              <ep-form-item label="地址">
                <ep-input v-model="linkUrl"></ep-input>
                <div class="web-link-desc description">Web、email 或其他互联网地址</div>
              </ep-form-item>
            </ep-col>

            <ep-col :col="20">
              <ep-form-item label="链接文字">
                <ep-input v-model="linkName"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-form>
        </div>
      </div>
    </div>
    <div class="meta">
      <div class="dialog-tip" title="提示: 在编辑器中输入 &quot;[&quot;后，出现建议的页面，然后插入链接。">提示: 在编辑器中输入 "|"后，出现建议的页面，然后插入链接。</div>
      <div class="meta-btn-container">
        <ep-button size="small" type="primary" @click="doCreateLink">确定</ep-button>
        <ep-button size="small" @click="cancelCreateLink">取消</ep-button>
      </div>
    </div>
  </ep-modal>
</template>

<script>

export default {
  name: "createLink",
  props:['createLinkModal'],

  data(){
    return{
      activeIndex:0,
      tabs:['亿墨文章','Web链接'],
      journalList:[],
      page:{
        orderBy:'id,desc',
        psLike_title:'',
        totalNum:100,
        limit:10,
        offset:1
      },

      linkName:'',
      linkUrl:'www.google.com'
    }
  },

  methods:{
    searchAttachment(){

    },
    doCreateLink(){
      let data = {
        linkName:this.linkName,
        linkUrl:this.linkUrl
      }
      this.$emit('insertLink',data)
      this.closeCreateLinkModal()
    },
    cancelCreateLink(){
      this.linkName = ''
      this.linkUrl  = ''
      this.closeCreateLinkModal()
    },
    handleChange(val){
      this.page.offset = val
      this.searchJournal()
    },
    closeCreateLinkModal(){
      this.$emit('closeCreateLinkModal')
    },
    changeActiveLi(index){
      this.activeIndex = index
      if (this.activeIndex == 0){
        this.page.limit  = 10
        this.page.offset = 1
        this.searchJournal()
      }
    },
    searchJournal(){
      // getJournalPage(this.page).then(json=>{
      //   this.journalList = json.data.rows
      //   this.page.totalNum = json.data.total
      // })
    },
    fillLinkName(val){
      this.linkName = val.title
      this.linkUrl  = global.EPCMS+`/preViewJournal/`+val.id
    },
    fillAttachmentLinkName(val){
      this.linkName = val.name
      this.linkUrl  = val.source
    }
  },
  created() {
    this.searchJournal()
  }
}
</script>

<style scoped lang="less">
  .right-container{
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
    padding: 10px 10px 20px 10px;
    width: 75%;

    & div .table-container{
      height: 415px;
      overflow: auto;
    }
  }

  .field-group{
    box-sizing: border-box;
    clear: both;
    padding: 4px 0 4px 145px;
    position: relative;
    margin: 1px 0;
    width: 100%;
  }

  .li-btn{
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
    &.selected{
      color: black;
      font-weight: bold;
    }
  }

  .left-container{
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

  .body-containter{
    height: 550px;
    border-top: 1px solid #ccc;
    display: block;
  }

  .meta{
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

  .meta-btn-container{
    float: right;
    margin-right: 10px;
  }

  .meta-link{
    border-top: 1px solid #ccc;
    font-size: 13px;
  }
</style>
