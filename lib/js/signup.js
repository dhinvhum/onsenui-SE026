
if (page.id === 'register') {
    console.log("signup");

    $("#signupbtn").click(function () {

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak');

        } else {
          alert(errorMessage);
          content.load('login.html');
        }
        console.log(error);

      });


    });

    
  }