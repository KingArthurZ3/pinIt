$(document).ready(function(){
    var logBtn = document.querySelector("#logBtn");
    var logOutBtn = document.querySelector("#logOut");
    $("#newbg").hide();

    logBtn.addEventListener('click', function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    })

    var userObj = "";

    $(logOutBtn).click(function(){
        firebase.auth().signOut();
    })

    firebase.auth().onAuthStateChanged(onAuthStateChanged);

    function uiRefresh(){
        $("#newbg").hide();
        $('#logOut').hide();
    }

    function onAuthStateChanged(user){
        if(user){
            userObj = user
            //set global var userObj to user
            $("#display-name").text("Logged in: " + user.displayName);

            $("#newbg").show();

            $('#logOut').show();
        }
        else{
            uiRefresh();
        }

    }
})