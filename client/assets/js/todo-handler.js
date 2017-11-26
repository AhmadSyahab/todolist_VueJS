new Vue({
  el: '#app',
  data: {
  	currentView : 'todo-show',
  	userId : '',
  	todos : '',
  	token : '',
  	name : '',
  	taskId : '',
  	developer : 'Ahmad',
  	picture : ''
  },
  methods: {
  	changeView: function(payload){
  		console.log(payload)
  		this.userId = payload.userId
		this.taskId = payload.taskId  			
  		this.currentView = payload.currentView
  		return
  	},
	getUser : function(){
      this.token = localStorage.getItem("token")
      this.userid = localStorage.getItem("userId")
      this.name = localStorage.getItem("name")
      if(!this.token){
      	window.location.replace('/index.html')
      }
      axios.get('http://localhost:3000/task',{
        'headers' : {
          'token' : this.token,
          'userid': this.userid,
          'name' : this.name
        }
      })
      .then(response => {
        this.todos = response.data.task;
      })
      .catch(err => {
        console.log(err);
      })
    },
    logout : function(){
      localStorage.clear()
      location.reload()
    },
    getPicture : function(){
    	this.picture = localStorage.getItem("picture");
    }  	
  },
  created() {
    this.getUser();
    this.getPicture()
  }  
})