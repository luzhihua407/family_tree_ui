<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <Menu/>
    </a-layout-header>
      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <Search @query="listArticle" :params="params"/>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <a-row>
          <a-col :span="18">
            <a-list item-layout="horizontal" :data-source="data" >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                >
                  <p slot="title" href="#?">{{ item.title }}</p>
                  <p slot="description" v-html="item.body"></p>
                </a-list-item-meta>
                  <div>{{ item.author }}</div>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :span="6">
            <template v-for="item in content">
              <a-card :title="item.firstLetter" :bordered="false" style="width: 300px" size="small">
                <template v-for="name in item.authors">
                  <a-checkable-tag  @change="listArticle({'author':name},checked)">
                    {{name}}
                  </a-checkable-tag>
                </template>
              </a-card>
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
                    category: 1,
                    keyword: '',
                    author: '',
                    pageNumber: 0,
                },
                content: [],
                data: [],
                loading: false,
            }
        },
        methods:{
            async listArticle(params) {
                this.$axios.$post('http://localhost:7001/article/list', params).then(response => {
                    this.data=response.data.data;
                    const pageSize=response.data.pageSize;
                    const total=response.data.total;
                    const pagination = { ...this.pagination };
                    pagination.total = total;
                    pagination.current = pageNumber+1;
                    pagination.defaultPageSize = pageSize;
                    this.pagination = pagination;
                    console.log(this.total)
                })
            },
            async getAuthorList() {
                this.$axios.$get('http://localhost:7001/article/getAuthorList').then(response => {
                    this.content=response.data.content;
                })
            }
        },

        created() {
            this.getAuthorList();
        }

    }
</script>
