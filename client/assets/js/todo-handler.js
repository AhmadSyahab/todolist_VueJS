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
  	picture : '',
    tasks : ''
  },
  methods: {
  	changeView: function(payload){
  		console.log(payload)
      if(payload.todos){

      }
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
      // axios.get('http://api.amartodo.ga/task',{
        axios.get('http://localhost:3010/task',{
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
    },
    updateTask : function(payload){
        // console.log(payload)
        if(payload.remove){
          console.log(this.todos[0])
          this.todos.forEach((todo,index) => {
            if(todo._id == payload.remove){
              this.todos.splice(index,1)
            }
          })
        }
        if(payload.newTask){
          this.todos.push(payload.newTask)
        }
        if(payload.todos){
          this.todos = payload.todos
        }
    }  	
  },
  created() {
    this.getUser();
    this.getPicture()
  }  
})