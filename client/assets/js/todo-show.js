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
                          <li v-for="task in tasks" v-if="task.status == false" class="ui-state-default">
                              <div class="checkbox taskwhite">
                                  <label>                                    
                                      <li v-on:click="changeStatus(task._id,task.status)">{{task.taskname}} </li></label>
                                      <button  v-on:click="removeTodo(task._id)" class="remove-item btn btn-default btn-xs pull-right listbut"><span class="glyphicon glyphicon-remove"></span></button>
                                      <button  v-on:click="editTask(task._id,task.userId)" class="edit-item btn btn-default btn-xs pull-right listbut"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                              </div>
                          </li>
                        </ul>                      
                </div>
            </div>
            <div class="col-md-6 listdone">
                <div class="todolist taskwhite">
                 <h1>Already Done</h1>
                    <div class="checkbox taskwhite">
                      <ul v-for="task in tasks" v-if="task.status == true"id="done-items" class="list-unstyled">  
                         <label> <li v-on:click="changeStatus(task._id,task.status)"> {{ task.taskname }} Done at {{ task.finishDate }} </li> </label> <button @click="removeTodo(task._id)" class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button>
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
  computed: {
    tasks: function(){
      return this.todos
    }
  },
methods: {
    changeStatus : function(taskStatus,status){
      if(status == false){
        // axios.put(`http://api.amartodo.ga/checklist/${taskStatus}`,{
          axios.put(`http://localhost:3010/checklist/${taskStatus}`,{
          'token' : this.token,
          'taskId': taskStatus
        })
        .then(response => {
          console.log(taskStatus)   
          console.log(response)
          response.data.task;

          this.$emit('get-task', {
            todos : response.data.task,
          })   

          // location.reload()
        })       
        .catch(err => {
          console.log(err);
        })        
      }
      if(status == true){
        // axios.put(`http://api.amartodo.ga/unchecklist/${taskStatus}`,{
          axios.put(`http://localhost:3010/unchecklist/${taskStatus}`,{
          'token' : this.token,
          'taskId': taskStatus
        })
        .then(response => {
          
         this.$emit('get-task', {
            todos : response.data.task,
          })             
          // location.reload()
        })       
        .catch(err => {
          console.log(err);
        })                
      }    
    },
    addTodo : function(){     
      // console.log(this.todos)
      console.log("initoken", this.token)
      // axios.post('http://api.amartodo.ga/task',{
        axios.post('http://localhost:3010/task',{
        token : this.token,      
        taskname : this.task
      })
      .then(response => {
        console.log(response.data);
         this.$emit('get-task', {
            newTask : response.data
          })
          this.task = '';                 
        // location.reload();
      })
      .catch(err => {
        console.log(err);
      })
    },
    removeTodo : function(taskDelete){
      // axios.delete(`http://api.amartodo.ga/task/${taskDelete}`,{
        axios.delete(`http://localhost:3010/task/${taskDelete}`,{
        'headers' : {
          'token' : this.token,
          'taskId': taskDelete,
          'name' : this.name
        }
      })
      .then(response => {
        console.log(response);

        this.$emit('get-task', {
          remove : response.data._id
        })

        // location.reload();
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
  },
})