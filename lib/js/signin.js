document.addEventListener('init', function(event) {

    const page = event.target;

    if (page.id === 'login') {
        console.log("signin");

        $("#loginbtn").click(function () {
            var email = $("#email").val();
            var password = $("#password").val();
            firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
              content.load('menu.html');
            })
              .catch(function (error) {
               
                console.log(error.message);
              });
          })

    }
    
});