$(function (){
    var APPLICATION_ID = "CFB392F9-C9EE-EDE6-FF13-DBDE9A6D3200",
        SECRET_KEY = "357AB610-BB9F-7786-FF85-E14D4FF57400",
        VERSION = "v1";
        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    $(document).on('click', '.add-list2', function(){
        var addListScript = $("#add-list-template").html();
        var addListTemplate = Handlebars.compile(addListScript);
        
        $('.main.container').html(addListTemplate);
        tinymce.init({selector: 'textarea', plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste"
        ],
        toolbar: "insertfile undo redo | stylesheet | bold italic | alignleft aligncenter alignright alignjustify | bulllist numlist outdent indent | link image"
    });
}); 
$(document).on('submit', '.form-add-list', function(event){
    event.preventDefault();
    var x;
    x = document.getElementById("title").value;
    var y;
    y = document.getElementById("content").value;
    if(x == ""){
        Materialize.toast('Title field cannot be empty', 4000, 'rounded');
        return false;
    }
    if(y == ""){
        Materialize.toast('Content field cannot be empty', 4000, 'rounded');
        return false;
    }
    else {
        var data = $(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            
        var dataStore = Backendless.Persistence.of(List);
        
        var listObject = new  List({
            title: title,
            content: content
        });
        
        dataStore.save(listObject);
        
        this.title.value = "";
        this.content.value = "";
    }
});

    $(document).on('click', '.logout', function() {
        Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
        
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
    });
});

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    }