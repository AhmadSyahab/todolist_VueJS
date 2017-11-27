Vue.component('login-show', {
  template: `
  <div id="login" class="container">    
            <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div class="panel panel-info" >
                    <div class="panel-heading">
                        <div class="panel-title">Sign In</div>
                    </div>     

                    <div style="padding-top:30px" class="panel-body" >

                        <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>

                        <form id="loginform" class="form-horizontal" role="form">

                            <div style="margin-bottom: 25px" class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input v-model="username" id="login-username" type="text" class="form-control" name="username" value="" placeholder="username">                                        
                            </div>

                            <div style="margin-bottom: 25px" class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input v-model="password" id="login-password" type="password" class="form-control" name="password" placeholder="password">
                            </div>


                            <div style="margin-top:10px" class="form-group">
                                <!-- Button -->

                                <div class="col-sm-12 controls">
                                  <a @click="loginProcess" id="btn-login" href="#" class="btn btn-success">Login  </a>
                                  <a @click="loginFB" id="btn-fblogin" href="#" class="btn btn-primary">Login with Facebook</a>

                              </div>
                          </div>


                          <div class="form-group">
                            <div class="col-md-12 control">
                                <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%" >
                                    Don't have an account! 
                                    <a href="#" onClick="$('#loginbox').hide(); $('#signupbox').show()">
                                        Sign Up Here
                                    </a>
                                </div>
                            </div>
                        </div>    
                    </form>     

                </div>                     
            </div>  
        </div>
        <div id="signupbox" style="display:none; margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title">Sign Up</div>
                    <div style="float:right; font-size: 85%; position: relative; top:-10px"><a id="signinlink" href="#" onclick="$('#signupbox').hide(); $('#loginbox').show()">Sign In</a></div>
                </div>  
                <div class="panel-body" >
                    <form method="POST" id="signupform" class="form-horizontal" role="form">

                        <div id="signupalert" style="display:none" class="alert alert-danger">
                            <p>Error:</p>
                            <span></span>
                        </div>
                        <div class="form-group">
                            <label for="email" class="col-md-3 control-label">Email</label>
                            <div class="col-md-9">
                                <input v-model="email" type="text" class="form-control" name="email" placeholder="Email Address">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="name" class="col-md-3 control-label">Name</label>
                            <div class="col-md-9">
                                <input v-model="name" type="text" class="form-control" name="name" placeholder="Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="username" class="col-md-3 control-label">Username</label>
                            <div class="col-md-9">
                                <input v-model="username" type="text" class="form-control" name="username" placeholder="Username">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-md-3 control-label">Password</label>
                            <div class="col-md-9">
                                <input v-model="password" type="password" class="form-control" name="passwd" placeholder="Password">
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- Button -->                                        
                            <div class="col-md-offset-3 col-md-9">
                                <button  @click="submitform" id="btn-signup" type="button" class="btn btn-info"><i class="icon-hand-right"></i> &nbsp Sign Up</button> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>
  `,
  data : function(){
    return{
      name : '',
      username : '',
      password : '',
      email : '' 
    }   
  },
  methods : {
    loginProcess: function(){
      // axios.post('http://api.amartodo.ga/signin', {
        axios.post('http://localhost:3010/signin', {
        username : this.username,
        password : this.password
      })
      .then(response => {
        alert("Login Success")
        // console.log("masukkkkkkkkkkkkkkkkkk",response)
        // console.log(response.data)
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('userId', response.data.user._id); 
        localStorage.setItem('name', response.data.user.name); 
        // $('#login').hide()
        window.location.replace('/todo.html')
        // this.$emit('todo-show', 'currentView')
        // this.$emit('change-view', {
        //   currentView : 'todo-show'
        // })
      })
      .catch(err => {
        alert(err);
        location.reload();
      })
    },
    loginFB : function(){
      window.fbAsyncInit = function() {
        FB.init({
          appId            : '832496193595326',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.11'
        });

        FB.getLoginStatus(function(response) {
            FB.login(function(response){
              // console.log(response)
              if(response.status == "connected"){
                // console.log("masuk ga")
                // axios.post('http://api.amartodo.ga/signIn/facebook', {
                  axios.post('http://localhost:3010/signIn/facebook', {
                  accessToken : response.authResponse.accessToken,
                  fbId : response.authResponse.userID 
                })
                .then(function (response) {
                  // console.log(response)
                  localStorage.setItem("picture", response.data.response.picture.data.url);
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("userId", response.data.userId);
                  localStorage.setItem("name", response.data.response.name);
                  window.location.replace('/todo.html')
                })
                .catch(function (error) {
                  console.log(error);
                });
              }else{
                window.location.replace('/index.html')
              }
            }, {scope: 'publish_actions,email'});
        });
        FB.AppEvents.logPageView();
      };

      (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    },
    submitform: function() {
      // axios.post('http://api.amartodo.ga/signup', {
        axios.post('http://localhost:3010/signup', {
        name : this.name,
        username : this.username,
        password : this.password,
        email : this.email
      })
      .then(response => {
        // console.log(response);
        alert('signup success');
        location.reload();
      })
      .catch(err => {
        // console.log(err);
          alert('signup failed');
      })
    }
  }
})

new Vue({
  el: '#app',
  data: {
  },
})
