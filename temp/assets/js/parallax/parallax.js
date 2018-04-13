function parallax(){
    var areas=document.getElementsByClassName("parallax-area");
    for(var i=0;i<areas.length;i++){
        var x=areas[i];
        var off=x.getBoundingClientRect().top;
        var layers=x.getElementsByClassName("parallax-element");
        for(var j=0;j<layers.length;j++){
            var e=layers[j];
            e.style.top=Number(e.getAttribute("data-parallax"))*(off)+"px";
        }
    }
}
