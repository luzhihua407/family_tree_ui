<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',background: '#FFFFFF' }">
      <Menu :current="this.selectedKey"/>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 200px', marginTop: '64px' }">

      <Search @query="listArticle" :params="params"/>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <a-table :columns="columns" :data-source="data"
                 :pagination="pagination"
                 :loading="loading" @change="handleTableChange" rowKey='id' >
          <p slot="name" slot-scope="text" v-html="text"></p>
        </a-table>
      </div>
    </a-layout-content>
    <Footer/>
  </a-layout>
</template>

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
                list: [],
                data: [],
                pagination: {defaultPageSize:15,total:0},
                selectedKey: 0,
                loading: false,
                columns : [
                    {
                        title: '标题',
                        dataIndex: 'title',
                        key: 'title',
                        width:'200px'
                    },
                    {
                        title: '内容',
                        dataIndex: 'body',
                        key: 'body',
                        scopedSlots: { customRender: 'name' }, // scopedSlots 这个属性很关键
                    },
                    {
                        title: '作者',
                        dataIndex: 'author',
                        key: 'author',
                        width:'100px'
                    }]
            }
        },
        methods:{
            async fetch() {
                let result = await fetch(
                    'http://localhost:7001/menu/list'
                ).then(res => res.json())
                this.list=result.data;
            },
            handleTableChange(pagination, filters, sorter) {
                const pageNumber = pagination.current-1;
                this.params.pageNumber=pageNumber;
                this.listArticle(this.params);
            },
            async listArticle(params) {
                this.$axios.$post('http://localhost:7001/article/list', params).then(response => {
                    this.data=response.data.data;
                    const pageSize=response.data.pageSize;
                    const total=response.data.total;
                    const pagination = { ...this.pagination };
                    pagination.total = total;
                    pagination.current = this.params.pageNumber+1;
                    pagination.defaultPageSize = pageSize;
                    this.pagination = pagination;
                })
            },
        },
        created() {
            const category=this.$route.query.category
            this.params.category=category;
            this.selectedKey=category;
            this.listArticle(this.params)
        },
        watch: {
            '$route': function() {
                const category=this.$route.query.category
                this.params.category=category;
                this.listArticle(this.params)
            console.log(22)
            }
        },



    }
</script>
