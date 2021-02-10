<template>
  <v-row justify="center" v-if="show">
    <v-dialog
      v-model="show"
      :persistent="clickOutside"
      max-width="350"
    >
      <v-card 
        min-width="200"
        class="lzydialog"
      >
        <v-card-title class="headline">
          {{view.headline||"Tips:"}}
        </v-card-title>
        <v-card-text 
          class="pb-2"
          v-html="view.content || '确定要继续吗？'"
        >
        </v-card-text>
        <v-card-actions class="pb-3">
          <v-btn
            v-show="view.cancelBtn"
            color="green darken-1"
            text
            @click="cancelClicked"
          >
            {{view.cancelBtn || "Cancel"}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="pink darken-1"
            text
            @click="confirmClicked"
          >
            {{view.confirmBtn || "Sure"}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    name:'lzydialog',
    data:()=>({
        id: 0.00,
        show: false,
        clickOutside: false,
        view:{
          title:'',
          headline: '',
          content:'',
          confirmBtn:'',
          cancelBtn:'',
        },
        confirmAction:[],
        cancelAction:[],
    }),
    methods:{
      /*** 
       * @param confirm 点击OK后的回调函数 默认动作关闭弹窗
       * @param cancel  点击取消后的回调函数 默认动作关闭弹窗
       * @param options 设置弹窗内容和样式的对象，开放的设置项有：
       * {title: , content: , keep:{confirmAction:false,cancelAction:false}} 
       * keep项控制点击回调状态。
       * 可以在父组件中通过refs一键调用这个函数进行内容设置，并promise式写法控制用户点击取消或者确定后的回调
       **/
      lzydialog:function(confirm,cancel,{...options}){
        this.view = Object.assign(this.view, options);
      
        if(confirm && options.keep&&options.keep.confirmAction){
          this.confirmAction.push(confirm);
        }else if(confirm){
          this.confirmAction = [confirm];
          this.confirmAction.push( ()=>{this.show = false;} );
        }
        
        if(cancel && options.keep&& options.keep.cancelAction){
          this.cancelAction.push(cancel)
        }else if(cancel){
          this.cancelAction = [cancel];
          this.cancelAction.push( ()=>{this.show = false;} );
        }
        this.id = Math.random()+1;
        this.show = true;
      },
      cancelClicked(){
        this.cancelAction.forEach(function(v,i){
          v.apply(this,arguments);
        });
      },
      confirmClicked(){
        this.confirmAction.forEach((action)=>{
          action();
        });
      },
    },
    created(){
      this.cancelAction.push( ()=>{this.show = false;} );
      this.confirmAction.push( ()=>{this.show = false;} );
    },
    computed:{
      updateView:()=>{
        this.show = true;
        return this.id;
      }
    }
}
</script>

<style scoped>
.lzydialog{
  display: block;
  margin: 0 auto;
}

</style>
