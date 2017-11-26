Vue.component('edit-todo', {
  template :`
    <div class="container">
    <table class="table table-bordered table-striped taskwhite">
     <thead>
          <tr>
              <th style="text-align:center;" class="">User Owner</th>
              <th style="text-align:center;" class="">Taskname</th>
              <th style="text-align:center;" class="">Created At</th>
              <th style="text-align:center;" class="">Finished Date</th>
              <th style="text-align:center;" class="">Status</th>
              <th style="text-align:center;" class="">Edit</th>
          </tr>
      </thead>
      <tbody>
          <tr id="bordwhite" v-for="task in tasks">
              <td style="text-align:center;" class="" v-if="task.userId.name == undefined">{{ name }}</td>
              <td style="text-align:center;" class="" v-else="task.userId.name != undefined">{{task.userId.name}}</td>

              <td style="text-align:center;" v-if="task.userId.name == undefined"> {{ task.taskname }}</td>
              <td style="text-align:center;" v-else="task.userId.name != undefined"> <input id="inputTaskname" v-model="taskname" type="text" v-bind:placeholder="task.taskname"> </td>

              <td style="text-align:center;" class="">{{task.createdAt}}</td>
              <td style="text-align:center;" class="">{{task.finishDate}}</td>

              <td style="text-align:center;" class=""v-if="task.status == true"> Done </td>
              <td style="text-align:center;" class=""v-else="task.status == false"> Not Done </td>

              <td style="text-align:center;" v-if="task.userId.name == undefined">
                  <button @click="editSelected(task._id)" type="button" class="btn btn-success btn-xs">Edit</button>
              </td>              
              <td style="text-align:center;" v-else="task.userId.name != undefined">
                  <button @click="editTask(task._id)" type="button" class="btn btn-success btn-xs">Edit</button>
              </td>
          </tr>
      </tbody>
  </table>
    <button @click="back" type="button" class="btn btn-info btn-xs">Back</button>
    </div>
  `,
props : ['edittaskid', 'edituserid', 'todos','token'],
  data : function(){
    return{
      tasks : [],
      userid : '',
      name : '',
      taskname : ''
    }   
  },
methods: {
    getTaskUser : function(){
      // this.token = localStorage.getItem("token")
      // this.userid = localStorage.getItem("userId")

      if(this.edittaskid != undefined){
        this.name = localStorage.getItem("name")
        axios.get(`http://localhost:3000/task/${this.edittaskid}`,{
          'headers' : {
            'token' : this.token,
            'userid': this.edituserid,
            'name' : this.name
          }
        })
        .then(response => {
          console.log(response)
          this.tasks = response.data
          console.log(this.tasks)
        })
        .catch(err => {
          console.log(err);
        })
      }else{
        // task.userId.name = localStorage.getItem("name");
        this.name = localStorage.getItem("name")
        axios.get(`http://localhost:3000/task/`,{
          'headers' : {
            'token' : this.token,
            'userid': this.edituserid,
            'name' : this.name
          }
        })
        .then(response => {
          console.log(response.data)
          this.tasks = response.data.task
          console.log(this.tasks)
        })
        .catch(err => {
          console.log(err);
        })

      }
    },

    editSelected : function(idTask){
      this.edittaskid = idTask
      this.getTaskUser();
    },

    editTask : function(idTask){
      axios.put(`http://localhost:3000/task/${idTask}`,{
          'token' : this.token,
          'taskId': idTask,
          'taskname' : this.taskname
      })
      .then(response => {
        console.log(response);
        location.reload();
      })
      .catch(err => {
        console.log(err)
      })
    },
    back : function(){
      location.reload()
    }
  },
  created () {
    this.getTaskUser()
  }

})