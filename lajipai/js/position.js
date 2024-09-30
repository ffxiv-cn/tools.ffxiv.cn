window.onload = function () {
    if (document.documentElement.clientWidth - 1014 > 40) {
        $("#right").css("width", 327);
        $("#right").css("visibility", "visible");
        $(".top_right").css("visibility", "visible");
        $("#left").css("left", (document.documentElement.clientWidth - 1014) / 2);
        $("#right").css("left", (document.documentElement.clientWidth - 1014) / 2 + 10);
        $(".top_left").css("left", (document.documentElement.clientWidth - 1014) / 2);
        $(".top_right").css("right", (document.documentElement.clientWidth - 1014) / 2);
        //当浏览器页面发生改变时，DIV随着页面的改变居中。
    }
    else if (document.documentElement.clientWidth - 1004 < 40 && document.documentElement.clientWidth - 677 > 40) {
        $("#right").css("visibility", "hidden");
        $("#right").css("width", 0);
        $(".top_right").css("visibility", "hidden");
        $("#left").css("left", (document.documentElement.clientWidth - 677) / 2);
        $(".top_left").css("left", (document.documentElement.clientWidth - 677) / 2);
    }
    else if (document.documentElement.clientWidth - 677 < 40) {
        $("#right").css("visibility", "hidden");
        $("#right").css("width", 0);
        $(".top_right").css("visibility", "hidden");
        $("#left").css("left", 0);
        $(".top_left").css("left", 0);
    }
    if ((document.documentElement.clientWidth - 1009) / 2 < 300) {
        $("#gg_l").css("display", "none");
        $("#gg_r").css("display", "none");
    }
    else {
        $("#gg_l").css("display", "block");
        $("#gg_r").css("display", "block");
    }
}
$(window).resize(function () {
    if (document.documentElement.clientWidth - 1004 > 40) {
        $("#right").css("width", 327);
        $("#right").css("visibility", "visible");
        $(".top_right").css("visibility", "visible");
        $("#left").css("left", (document.documentElement.clientWidth - 1014) / 2);
        $("#right").css("left", (document.documentElement.clientWidth - 1014) / 2 + 10);
        $(".top_left").css("left", (document.documentElement.clientWidth - 1014) / 2);
        $(".top_right").css("right", (document.documentElement.clientWidth - 1014) / 2);
        //当浏览器页面发生改变时，DIV随着页面的改变居中。
    }
    else if (document.documentElement.clientWidth - 1004 < 40 && document.documentElement.clientWidth - 677 > 40) {
        $("#right").css("visibility", "hidden");
        $("#right").css("width", 0);
        $(".top_right").css("visibility", "hidden");
        $("#left").css("left", (document.documentElement.clientWidth - 677) / 2);
        $(".top_left").css("left", (document.documentElement.clientWidth - 677) / 2);

    }
    else if (document.documentElement.clientWidth - 677 < 40) {
        $("#right").css("visibility", "hidden");
        $("#right").css("width", 0);
        $(".top_right").css("visibility", "hidden");
        $("#left").css("left", 0);
        $(".top_left").css("left", 0);
    }
    if (document.documentElement.clientWidth - 1009 > 10) {
        $("#page").css("left", (document.documentElement.clientWidth - 1009) / 2);
        $(".top_left").css("left", (document.documentElement.clientWidth - 1009) / 2);
        $(".top_right").css("right", (document.documentElement.clientWidth - 1009) / 2);
        //当浏览器页面发生改变时，DIV随着页面的改变居中。
    }
    else if (document.documentElement.clientWidth - 1009 < 10) {
        $("#page").css("left", 0);
        $(".top_right").css("visibility", "hidden");
        $(".top_left").css("left", 0);
    }
    //当浏览器页面发生改变时，DIV随着页面的改变居中。
    if ($("#page_itemtop").children("li:last-child").children("p").text() == "更新速览") {
        $('#page_item').css("height", document.documentElement.clientHeight - 400);
    }
    if ((document.documentElement.clientWidth - 1009) / 2 < 300) {
        $("#gg_l").css("display", "none");
        $("#gg_r").css("display", "none");
    }
    else {
        $("#gg_l").css("display", "block");
        $("#gg_r").css("display", "block");
    }
});
function back() {
    $('#page').remove();
    guanggao();
    $('#main').append(
        '<div id="left" style="opacity: 0;height: auto;"><ul style="padding-top: 30px;" id="item"></ul></div>'
        , '<div id="right" style="opacity: 0;height: auto;"><ul id="notice_title"></ul><ul id="notice" style="height:203px;"></ul><ul id="update_title"></ul><ul id="update_log"></ul></div>'
    );
    testgg();
    if (document.documentElement.clientWidth - 1004 > 40) {
        $("#right").css("width", 327);
        $("#right").css("visibility", "visible");
        $(".top_right").css("visibility", "visible");
        $("#left").css("left", (document.documentElement.clientWidth - 1014) / 2);
        $("#right").css("left", (document.documentElement.clientWidth - 1014) / 2 + 10);
        $(".top_left").css("left", (document.documentElement.clientWidth - 1014) / 2);
        $(".top_right").css("right", (document.documentElement.clientWidth - 1014) / 2);
        //当浏览器页面发生改变时，DIV随着页面的改变居中。
    }
    else if (document.documentElement.clientWidth - 1004 < 40 && document.documentElement.clientWidth - 677 > 40) {
        $("#right").css("visibility", "hidden");
        $("#right").css("width", 0);
        $(".top_right").css("visibility", "hidden");
        $("#left").css("left", (document.documentElement.clientWidth - 677) / 2);
        $(".top_left").css("left", (document.documentElement.clientWidth - 677) / 2);

    }
    else if (document.documentElement.clientWidth - 677 < 40) {
        $("#right").css("visibility", "hidden");
        $("#right").css("width", 0);
        $(".top_right").css("visibility", "hidden");
        $("#left").css("left", 0);
        $(".top_left").css("left", 0);
    }
    Windowsopen("left");
    Windowsopen("right");
    load();
}