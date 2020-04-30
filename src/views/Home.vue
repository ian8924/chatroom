<template>
  <div class="home">

    <div class="flex-top">
        <div>稱號</div>
        <input type="text" v-model="name" >
    </div>
    <div class="chatroom" id="chatroom1">
    <div v-for="(item,index) in districts" :key="index"  :class="{anotherOne:item.name!==name,isMe:item.name===name}">
      <div style="color:green" v-if="item.name!==name">
        {{item.name}}
      </div>
      <span style="color:red">
        {{changeFormat(item.time)}}
      </span>
      <span class="messageBox">
        {{item.message}}
      </span>
    </div>
    </div>
    <div class="flex-bottom">
      <input type="text" v-model="inputValue" class="input-1" >
      <button @click="sendMessage" class="btn-1" >send</button>
    </div>

  </div>
</template>

<script>
import { db } from '../firebase'
import moment from 'moment'
const chineseRef = db.ref('messages')
export default {
  data () {
    return {
      districts: [],
      inputValue: '',
      name: ''
    }
  },
  mounted () {
    chineseRef.on('value', snapshot => {
      var data = snapshot.val()
      const messageData = data
        ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
        : null
      this.districts = Object.assign(messageData)
      const objDiv = document.querySelector('#chatroom1')
      objDiv.scrollTop = objDiv.scrollHeight + 100
    })
  },
  methods: {
    // 傳送訊息
    sendMessage () {
      if (!this.name) {
        alert('請輸入稱號')
        return
      }
      if (!this.inputValue) {
        return
      }
      const req = {
        message: this.inputValue,
        name: this.name,
        time: moment().valueOf()
      }
      chineseRef.push(req)
      this.inputValue = ''
    },
    // 轉換時間格式
    changeFormat (val) {
      return moment(val).format('HH:mm:ss')
    }
  }
}
</script>
<style scope>
.home{
  min-height: 100vh;
}
.anotherOne{
  text-align: left;
  margin-top:10px
}
.isMe{
  text-align: right;
  margin-top:30px
}
.messageBox{
  color: black;
  background: rgb(224, 221, 221);
  border-radius: 10px;
  border: solid gray 1px;
  padding: 3px;
  margin: 10px 0 5px 0;
  justify-content: right;
}
.flex-bottom{
  width: 100%;
  position: fixed;
  bottom: 0;
 }
 .flex-top{
  width: 100%;
  position: fixed;
  top: 0;
 }
 .input-1{
   height: 5vh;
   width: 80%
 }
 .btn-1{
   width:5vh;
   height: 30px;
   background:rgb(153, 151, 151)
 }
 .chatroom{
  background-color: #fff;
  height: 95vh;
  padding-bottom: 20vh;
  overflow-y: auto;
  overflow-x: hidden;
 }
 /* #chatroom1{ */

 /* } */
</style>
