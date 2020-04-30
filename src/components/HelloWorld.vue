<template>
  <div>
    <div>稱號</div>
    <input type="text" v-model="name" >
    <div v-for="(item,index) in districts" :key="index"  :class="{anotherOne:item.name!==name,isMe:item.name===name}">
      <span style="color:green">
        {{item.name}}:
      </span>
      <span style="color:red">
        {{changeFormat(item.time)}}
      </span>
      <span class="messageBox">
        {{item.message}}
      </span>
    </div>
    <div class="flex-bottom">
      <input type="text" v-model="inputValue">
      <button @click="sendMessage">send</button>
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
    })
  },
  methods: {
    // 傳送訊息
    sendMessage () {
      if (!this.name) {
        alert('請輸入稱號')
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
.anotherOne{
  text-align: left;
  margin-top:10px
}
.isMe{
  text-align: right;
  margin-top:10px
}
.messageBox{
  border: solid gray 1px;
  margin: 10px 0 5px 0;
  justify-content: right;
}
.flex-bottom{
  display: flex;
  position: bottom;
}
</style>
