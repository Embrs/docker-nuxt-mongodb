<script setup lang="ts">
// DialogDemo
// 資料 --------------------------------------------------------------------------------------------
const storeTool = StoreTool();

const props = defineProps({
  params: {
    type: Object as () => DialogDemo,
    required: true
  }
});

const visible = ref(true);
const isChange = ref(false);
const isWaiting = ref(false);
const demoText = ref('');
// const elStaffForm = ref();

// 標題
const title = computed(() => {
  return 'demo';
});

// 接收事件 -----------------------------------------------------------------------------------------
const OnHandleClose = (done: () => void) => {
  if (!isChange.value) return done();
  ElMessageBox.confirm(
    '有變動尚未完成，確定是否要關閉？',
    '關閉詢問',
    {
      confirmButtonText: '關閉',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => done());
};

// 參數變化
const OnChnage = () => {
  isChange.value = true;
};

const OnComplete = () => {
  ReloadPage();
  isChange.value = false;
  visible.value = false;
};

const ClickCreateBtn = lodash.debounce(async () => {
  // if (isWaiting.value) return;
  // isWaiting.value = true;
  // await elStaffForm.value.CreateFlow();
  // isWaiting.value = false;
}, 400, { leading: true, trailing: false });

// 流程 --------------------------------------------------------------------------------------------

// 函式 --------------------------------------------------------------------------------------------

// Api ---------------------------------------------------------------------------------------------

// 生命週期 -----------------------------------------------------------------------------------------
// onMounted(()=>{}); useAsnycData

// 對外事件 -----------------------------------------------------------------------------------------
const emit = defineEmits(['on-hide']);

// 重加載頁面
const ReloadPage = () => {
  mitt.emit('reload-page');
};

const EmitHideDialog = () => {
  emit('on-hide');
};

</script>

<template lang="pug">
ElDialog(
  v-model="visible"
  :title="title"
  :width="storeTool.isMobile ? '95%':'800px'"
  :before-close="OnHandleClose"
  :destroy-on-close="true"
  @closed="EmitHideDialog"
)
  #DialogDemo
    Loading
      div
        p {{ props.params.demoText }}
        p 嘗試輸入後關閉
        ElInput(v-model="demoText" aria-placeholder="輸入文字" @change="OnChnage")
      //- StaffForm(
      //-   ref="elStaffForm"
      //-   actionType="create"
      //-   :apiParams="createParams"
      //-   @on-change="OnChnage"
      //-   @on-complete="OnComplete"
      //- )
  template(#footer)
    #DialogDemoFooter
      elButton(
        type="primary"
        :loading="isWaiting"
        @click="ClickCreateBtn"
      ) 新增
</template>

<style lang="scss" scoped>
// 佈局 ----
#DialogDemo {
  height: 100%;
}
#DialogDemoFooter {
  @include row-end;
  height: 100%;
}
// 組件 ----
</style>
