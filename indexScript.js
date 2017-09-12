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
        $('#intro').show();
        $('.container').show();
    }

    function onAuthStateChanged(user){
        if(user){
            userObj = user
            //set global var userObj to user
            $("#display-name").text("Welcome, " + user.displayName + ".");

            $("#newbg").show();

            $('#logOut').show();

            $('#intro').hide();

            $('.container').hide();
        }
        else{
            uiRefresh();
        }

    }

    // info for uploading images

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');

    // Listen for file selection
    fileButton.addEventListener('change', function(e){

        var file = e.target.files[0];

        //Get File
            var storageRef = firebase.storage().ref('artsy_photos/' + file.name)
        //Create a Storage Ref
            var task = storageRef.put(file);
        // Upload file

        //Update Progress Bar
            task.on('state_changed',
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                    //TODO change the storage rule to if request.auth != null later
                },

                function error(err){

                },

                function complete(){
                    var newFile = firebase.database().ref('artsy_photos/' + file.name)
                    addImage(newFile);
                }

            );
    });

    function addImage(file){
        var img = document.createElement("img");
        img.src= file;
        img.id = "picture"
        var grid = document.getElementById("photoGrid")
        grid.appendChild(img);
    }

})