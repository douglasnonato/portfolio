// Prevent to scrolling during splash screen

$("body").css({ height: "100%", overflow: "hidden" });

setTimeout(function(){
    $("body").css({ height: "unset", overflow: "unset" });
},8000);