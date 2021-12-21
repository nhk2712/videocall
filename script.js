const vm = new Vue({
  el:'#app',
  data:{
    vueMessage:'hello world',
    userToken:'',
    roomId:'',
    roomToken:'',
    room:undefined,
    client:undefined
  },
  mounted(){
    api.setRestToken()
  },
  methods:{
    login: async function(){
      const userId = (Math.random()*10000).toFixed(0)
      const userToken = await api.getUserToken(userId)
      this.userToken = userToken
      
      const client = new StringeeClient()
      client.on('authen',(result)=>{
        console.log('on authen',result)
      })
      client.connect(userToken)
      this.client = client
    },
    createRoom: async function(){
      console.log('create')
      const room = await api.createRoom()
      const roomToken = await api.getRoomToken(room.roomId)
      
      this.roomId = room.roomId
      this.roomToken = roomToken
    },
    joinRoom: async function(){
      console.log('join')
      const roomId = prompt('Nhập ID phòng:')
      if (!roomId) return
      
      const roomToken = await api.getRoomToken(roomId)
      this.roomId = roomId
      this.roomToken = roomToken
    }
  }
})