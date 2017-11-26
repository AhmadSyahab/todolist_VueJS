 Vue.component('todo-show', {
  template: `        
    <div class="container showtodo">
          <div class="row">
          <div class="col-md-6">
              <input v-model="task" type="text" class="form-control add-todo" placeholder="Add your task here">
           </div>   
           <div class="col-md-6">
              <button v-on:click="addTodo" class="btn btn-success"> add task </button>
              <button v-on:click="showAll" class="btn btn-info"> Show all Task</button> 
           </div>           
      </div>  
        <div class="row">       
            <div class="col-md-6 listtask">           
                <div class="todolist not-done taskwhite">
                 <h1>Todos</h1>
                        <ul id="sortable" class="list-unstyled">
                          <li v-for="todo in todos" v-if="todo.status == false" class="ui-state-default">
                              <div class="checkbox taskwhite">
                                  <label>                                    
                                      <li v-on:click="changeStatus(todo._id,todo.status)">{{todo.taskname}} </li></label>
                                      <button  v-on:click="removeTodo(todo._id)" class="remove-item btn btn-default btn-xs pull-right listbut"><span class="glyphicon glyphicon-remove"></span></button>
                                      <button  v-on:click="editTask(todo._id,todo.userId)" class="edit-item btn btn-default btn-xs pull-right listbut"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                              </div>
                          </li>
                        </ul>                      
                </div>
            </div>
            <div class="col-md-6 listdone">
                <div class="todolist taskwhite">
                 <h1>Already Done</h1>
                    <div class="checkbox taskwhite">
                      <ul v-for="todo in todos" v-if="todo.status == true"id="done-items" class="list-unstyled">  
                         <label> <li v-on:click="changeStatus(todo._id,todo.status)"> {{ todo.taskname }} Done at {{ todo.finishDate }} </li> </label> <button @click="removeTodo(todo._id)" class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button>
                      </ul>
                    </div>  
                </div>
            </div>
        </div>
    </div>
  `,
  props : ['todos','token'],
  data : function(){
    return{
      task : '',
      userid : '',
      name : ''
    }   
  },
methods: {
    // getUser : function(){
    //   this.token = localStorage.getItem("token")
    //   this.userid = localStorage.getItem("userId")
    //   this.name = localStorage.getItem("name")
    //   axios.get('http://localhost:3000/task',{
    //     'headers' : {
    //       'token' : this.token,
    //       'userid': this.userid,
    //       'name' : this.name
    //     }
    //   })
    //   .then(response => {
    //     this.todos = response.data.task;
    //     console.log(this.todos)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // },
    changeStatus : function(taskStatus,status){
      if(status == false){
        axios.put(`http://localhost:3000/checklist/${taskStatus}`,{
          'token' : this.token,
          'taskId': taskStatus
        })
        .then(response => {
          console.log("false", response.data.status);
          location.reload()
        })       
        .catch(err => {
          console.log(err);
        })        
      }
      if(status == true){
        axios.put(`http://localhost:3000/unchecklist/${taskStatus}`,{
          'token' : this.token,
          'taskId': taskStatus
        })
        .then(response => {
          console.log("false", response.data.status);
          location.reload()
        })       
        .catch(err => {
          console.log(err);
        })                
      }    
    },
    addTodo : function(){     
      // console.log(this.todos)
      console.log("initoken", this.token)
      axios.post('http://localhost:3000/task',{
        token : this.token,      
        taskname : this.task
      })
      .then(response => {
        console.log(response);

        location.reload();
      })
      .catch(err => {
        console.log(err);
      })
    },
    removeTodo : function(taskDelete){
      axios.delete(`http://localhost:3000/task/${taskDelete}`,{
        'headers' : {
          'token' : this.token,
          'taskId': taskDelete,
          'name' : this.name
        }
      })
      .then(response => {
        console.log("masuk",response);
        location.reload();
      })      
      .catch(err => {
        console.log(err);
      })
    },
    editTask : function(idTask, idUser){
      console.log(idTask,idUser)
        this.$emit('change-view', {
          currentView : 'edit-todo',
          taskId : idTask,
          userId : idUser
        })      
    },
    showAll : function(){
      this.userid = localStorage.getItem("userId")
      this.$emit('change-view', {
        currentView : 'edit-todo',
        userId : this.userid
      })
    }
  }
})