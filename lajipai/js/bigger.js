function bigger(obj) {
    $("#bigger").css("background-image", "url(" + obj.src + ")");
    $("#overlay").fadeIn();
    var img = new Image();
    img.src = obj.src;
    var t = window.innerWidth
          , e = window.innerHeight
          , s = img.width
          , n = img.height
          , o = t > s ? (t - s) / 2 : 0
          , i = e > n ? (e - n) / 2 : 0;
    $("#bigger").css({
        left: o + "px"
    }),
    $("#bigger").css({
        top: i + "px"
    });
    $("#bigger").css("background-size", "auto");
    if (t < s || e < n) {
        $("#bigger").css("background-size", "contain");
    }
}
$(window).resize(function () {
    var img = new Image();
    //img.src = $("#bigger").css("background-image").split("\"")[1];
    var t = window.innerWidth
          , e = window.innerHeight
          , s = img.width
          , n = img.height
          , o = t > s ? (t - s) / 2 : 0
          , i = e > n ? (e - n) / 2 : 0;
    $("#bigger").css({
        left: o + "px"
    }),
    $("#bigger").css({
        top: i + "px"
    });
    $("#bigger").css("background-size", "auto");
    if (t < s || e < n) {
        $("#bigger").css("background-size", "contain");
    }
    var Box = document.getElementById('top');
    var L = Box.offsetWidth;
    $("#top").css("left", (document.documentElement.clientWidth - L) / 2);
    //当浏览器页面发生改变时，DIV随着页面的改变居中。
});
