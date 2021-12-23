<template>
  <div>

<!--  <NuxtLogo/>-->
  <a-menu
    theme="light"
    mode="horizontal"
    :selected-keys="[current]"
    :style="{ lineHeight: '64px' }"
  >
    <template v-for="item in list">
      <a-menu-item :key="item.value">
        <NuxtLink to="/author" v-if="item.value==1">{{item.name}}</NuxtLink>
        <NuxtLink :to="{ path: '/', query: { category: item.value }}" v-if="item.value!=1 && item.value!=5">{{item.name}}</NuxtLink>
        <NuxtLink :to="{ path: '/english', query: { category: item.value }}" v-if="item.value==5">{{item.name}}</NuxtLink>
      </a-menu-item>
    </template>
  </a-menu>
  </div>
</template>
<script>
    export default {
        props: ['current'],
        data() {
            return {
                list: [],
            }
        },
        methods:{
            async fetch() {
                let result = await fetch(
                    'http://localhost:7001/menu/list'
                ).then(res => res.json())
                this.list=result.data;
            },
        },
        created() {
            this.fetch();
        }

    }
</script>
