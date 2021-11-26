<template>
  <a-form-model layout="inline" :model="formInline">
    <a-form-model-item>
      <a-input v-model="formInline.author" placeholder="请输入作者名" allow-clear>
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="formInline.keyword" placeholder="请输入内容关键字" allow-clear>
        <a-icon slot="prefix" type="key" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        :params="params"
        @click="keywordQuery"
      >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
    export default {
        props: ['query','params'],
        data() {
            return {
                formInline: {
                    author: '',
                    keyword: '',
                },
            }
        },
        methods:{
            keywordQuery(){
                this.params.author= this.formInline.author;
                this.params.keyword= this.formInline.keyword;
                this.$emit('query',this.params)
            }
        },
        created() {
        }

    }
</script>
