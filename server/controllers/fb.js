 window.fbAsyncInit = function() {
  FB.init({
    appId            : '832496193595326',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.11'
  });

  FB.getLoginStatus(function(response) {
        // console.log(response)
        if(response.status == "connected"){
          document.getElementById('loginFB').innerHTML='Ok you are connected';
        }else if(response.status == 'not_authorized'){
          document.getElementById('loginFB').innerHTML='You are not connected';
        }else {
          document.getElementById('loginFB').innerHTML='You are not logged into any facebook';
        };  
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

function login(){
  FB.login(function(response){
    if(response.status == "connected"){
      document.getElementById('loginFB').innerHTML='Ok you are connected';

      axios.post('http://localhost:3000/signIn/facebook', {
        accessToken : response.authResponse.accessToken,
        fbId : response.authResponse.userID 
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        console.log(response);
      })
      .catch(function (error) {

        console.log(error);
      });

    }else if(response.status == 'not_authorized'){
      document.getElementById('loginFB').innerHTML='You are not connected';
    }else {
      document.getElementById('loginFB').innerHTML='You are not logged into any facebook';
    };  
  }, {scope: 'publish_actions,email'});
}