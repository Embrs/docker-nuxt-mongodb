<script setup lang="ts">
import { ElButton } from 'element-plus';

// Home 請填寫功能描述👈

// 資料 --------------------------------------------------------------------------------------------
const storeEnv = StoreEnv();
const params = ref({
  name: '',
  email: ''
});

const pageParams = ref({
  page: 1,
  size: 5
});

const tableInfo = ref<{list:{name: string, email: string}[], total: number}>({
  list: [],
  total: 0
});

const userId = ref('');

const ClickClear = () => {
  params.value.name = '';
  params.value.email = '';
  userId.value = '';
};

const test = ref('');
// 接收事件 -----------------------------------------------------------------------------------------
const ClickTableRow = (row: any) => {
  if (!row.id) return;
  userId.value = row.id;
  ApiGet();
};

const OnPageChange = (page: number) => {
  ApiGetList();
};

// Api ---------------------------------------------------------------------------------------------

const ApiGetList = async () => {
  const res:any = await $fetch('/nuxt/demo/users', { method: 'get', query: pageParams.value });
  if (res.status.is_success && res.data) {
    tableInfo.value.list = res.data.list;
    tableInfo.value.total = res.data.total;
    return;
  }
  ElMessage.error(res.status.message);
};

const ApiPost = async () => {
  const res: any = await $fetch('/nuxt/demo/user', { method: 'post', body: params.value });
  if (res.status.is_success) {
    ElMessage({ message: '新增成功', type: 'success' });
    userId.value = res.data?.id || '';
    ApiGetList();
    return;
  }
  ElMessage.error(res.status.message);
};

const ApiGet = async () => {
  if (!userId.value) return;
  const res:any = await $fetch(`/nuxt/demo/user/${userId.value}`, { method: 'get' });
  if (res.status.is_success) {
    params.value.name = res.data.name;
    params.value.email = res.data.email;
    ElMessage({ message: '取得成功', type: 'success' });
    ApiGetList();
    return;
  }
  ElMessage.error(res.status.message);
};

const ApiPut = async () => {
  if (!userId.value) return;
  const res: any = await $fetch(`/nuxt/demo/user/${userId.value}`, { method: 'put', body: params.value });
  if (res.status.is_success) {
    ElMessage({ message: '更新成功', type: 'success' });
    ApiGetList();
    return;
  }
  ElMessage.error(res.status.message);
};

const ApiDel = async () => {
  if (!userId.value) return;
  const res:any = await $fetch(`/nuxt/demo/user/${userId.value}`, { method: 'delete' });
  if (res.status.is_success) {
    ElMessage({ message: '刪除成功', type: 'success' });
    ApiGetList();
    return;
  }
  ElMessage.error(res.status.message);
};

// 生命週期 -----------------------------------------------------------------------------------------
onMounted(() => {
  ApiGetList();
  test.value = storeEnv.env;
});

</script>

<template lang="pug">
#Home
  .box
    .left-area
      p Home123
      NuxtLink(to="https://pjchender.dev/database/mongo-mongoose/" target="_blank")
        ElButton 參考連結
      .row-item
        ElButton(@click="ClickClear") 清除參數
      .row-item
        label name
        ElInput(v-model="params.name" type="text")
      .row-item
        label email
        ElInput(v-model="params.email" type="email")
      .row-item
        ElButton(type="primary" @click="ApiPost") Post新增
      .row-item
        label id
        ElInput(v-model="userId" type="email")
      .row-item
        ElButton(type="primary" @click="ApiGet") Get取得
        ElButton(type="primary" @click="ApiPut") Put更新
        ElButton(type="primary" @click="ApiDel") Del刪除
    //-----------------------------------------------------------------------------------------------
    .right-area
      .row-item
        ElButton(type="primary" @click="ApiGetList") List列表
      .row-item
        ElTable(
          ref="elElTable"
          :data="tableInfo.list"
          style="width: 100%; height:400px"
          border
          @row-click="ClickTableRow"
        )
          ElTableColumn(prop="id" label="id" width="120")
          ElTableColumn(prop="name" label="name" width="120")
          ElTableColumn(prop="email" label="email" width="120")
      .row-item
        ElPagination(
          v-model:current-page="pageParams.page"
          :page-size="pageParams.size"
          :total="tableInfo.total"
          background
          layout="prev, pager, next, total"
          @current-change="OnPageChange"
        )
  pre {{ test }}
</template>

<style lang="scss" scoped>
// 佈局 ----
#Home {
  .box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    .left-area {
      @include col(10px);
    }
    .right-area {
      @include col(10px);
    }
  }
}

// 組件 ----
.row-item {
  @include row(10px);
}

</style>
