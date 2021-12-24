<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',background: '#FFFFFF' }">
      <Menu :current="this.selectedKey"/>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 200px', marginTop: '64px'}">
      <a-form-model layout="inline" :model="params">
        <a-form-model-item>
          <a-input v-model="params.word" placeholder="请输入单词" allow-clear>
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="params.chinese" placeholder="请输入中文" allow-clear>
            <a-icon slot="prefix" type="key" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
                  type="primary"
                  html-type="submit"
                  @click="keywordQuery"
          >
            搜索
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <a-row :gutter="16">
          <a-col :span="16">
            <a-list item-layout="horizontal" :data-source="this.data" :pagination="pagination">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                >
                  <p slot="title" v-html="item.word"></p>
                  <p slot="description">{{item.pronunciation}}/{{item.partOfSpeech}}/{{item.chinese}}</p>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :span="8">
            <template v-for="item in roots">
              <a-checkable-tag  @change="queryByRoot(item.root,checked)">
                {{item.root}}-{{item.chinese}}
              </a-checkable-tag>
            </template>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
    <Footer/>
  </a-layout>
</template>
<style>
</style>
<script>
  export default {
    data() {
      return {
        params: {
          category: 4,
          word: '',
          chinese: '',
          pageNumber: 0,
        },
          selectedKey: 0,
          content: [],
          data: [],
          roots: [],
          loading: false,
          pagination: {
            onChange: page => {
              const pageNumber = page-1;
              this.params.pageNumber=pageNumber;
              this.listEnglish(this.params);
            }
          },
      }
    },
    methods:{
      async keywordQuery() {
        this.listEnglish(this.params);
      },
      async queryByRoot(root) {
        this.params.word=root;
        this.listEnglish(this.params);
      },
      async listEnglish(params) {
        this.$axios.$post('http://localhost:7001/english/list', params).then(response => {
          this.data=response.data.data;
          const pageSize=response.data.pageSize;
          const total=response.data.total;
          const pagination = { ...this.pagination };
          pagination.total = total;
          pagination.current = params.pageNumber+1;
          pagination.defaultPageSize = pageSize;
          pagination.pageSize = pageSize;
          this.pagination = pagination;
        })
      },
      async listWordRoot() {
        this.$axios.$get('http://localhost:7001/wordRoot/list').then(response => {
          this.roots=response.data;
        })
      },
    },

    created() {
        const category=this.$route.query.category
        this.selectedKey=category;
        this.listWordRoot();
        this.listEnglish(this.params);
    }

  }
</script>
