function check() {
    //读取
    var infolist = [];
    $(function () {
        var csvList;
        $('#left').remove();
        $('#right').remove();
        $('#main').append(
            '<div id="page" style="opacity: 0;"></div>'
        );
        if (document.documentElement.clientWidth - 1009 > 0) {
            $("#page").css("left", (document.documentElement.clientWidth - 1009) / 2);
        }
        else { $("#page").css("left", 0); }
        $("#page").empty();
        $('#page').append(
            '<ul id="page_itemtop"></ul>'
            , '<ul id="page_explain" style="height:100px;"><div id="pagenum" class="pagenum" style="width: 900px;"></div></ul>'
            , '<ul id="page_check" style="height:50px;"><div id="vernum" class="vernum" style="width: 900px;margin-left: 45px;"></div></ul>'
            , '<ul id="page_item" style="min-height: 540px;display: flex;overflow: hidden;"></ul>'
        );
        $('#page_item').css("height", document.documentElement.clientHeight - 400);
        $('#page_itemtop').append(
            '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
            , '<li style="width: 160px;"><a><img src="image/更新速览.png"><div></div></a><p>更新速览</p></li>'
        );
        $.ajax({
            url: './csv/check7.0.csv?' + window._ver,
            success: function () {
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
            }
        });
        Windowsopen("page");
    });
    //分页
    var Page = {
        //每页内容数目    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:200px;height: 54px;background-image: url(image/dungeons/7.0.jpg);margin-right: 20px;margin-left: 20px;" class="off" onclick="checkver(this,7)"><div class="bd"></div></a>';
            $("#pagenum").append(insert);
            $("#pagenum a:first").click();
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return parseFloat(diva.innerHTML);
        },
        setClickPageNum: function () {
            // var divx = document.getElementById('pagenum');
            // var a = divx.children;
            // var len = a.length;
            // for (var i = 0; i < len; i++) {
            //     a[i].onclick = function () {
            //         for (var i = 0; i < len; i++) { a[i].className = "off"; }
            //         this.className = "on";                    
            //     };
            // }
            Page.allContent(this);
        },
        allContent: function (divb) {
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
                divb = document.getElementById('vernum').children[0];
                divb.className = "on";
            }
        }
    };
}
function checkver(obj, i) {
    $("#pagenum a").removeClass();
    $("#pagenum a").addClass('off');
    $(obj).removeClass();
    $(obj).addClass('on');
    var insert = '';
    if (i == 7) {
        insert += '<a style="float:left;width:50px;" class="off" onclick="checkinfo(this)">7.0</a>';
        insert += '<a style="float:left;width:50px;" class="off" onclick="">7.1</a>';
        insert += '<a style="float:left;width:50px;" class="off" onclick="">7.2</a>';
        insert += '<a style="float:left;width:50px;" class="off" onclick="">7.3</a>';
        insert += '<a style="float:left;width:50px;" class="off" onclick="">7.4</a>';
        insert += '<a style="float:left;width:50px;" class="off" onclick="">7.5</a>';
    }
    $('#vernum').empty();
    $('#vernum').append(insert);
    $("#vernum a:first").click();
}
function checkinfo(obj) {
    $("#vernum a").removeClass();
    $("#vernum a").addClass('off');
    $(obj).removeClass();
    $(obj).addClass('on');
    var csvList;
    var ver = $(obj).text();
    var insert = '';
    $.ajax({
        url: './csv/check' + ver + '.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            $('#page_item').empty();
            $('#page_item').append('<ul class="level1" style=""></ul><ul class="level234" style=""></ul>');
            var insert = "";
            for (var i = 1; i < csvList.length; i++) {
                if (csvList[i][0] == 1) {
                    $('#page_item .level1').append("<li><p>" + csvList[i][1] + "</p></li>");
                }
                else if (csvList[i][0] == 2) {
                    $('#page_item .level234').append("<li class='level2 nosel'><p style=''>" + csvList[i][1] + "</p><b class='marka'></b><div></div></li>");
                }
                else if ((csvList[i][0] == 3 && i == csvList.length - 1) || (csvList[i][0] == 3 && csvList[i + 1][0] != 4)) {
                    insert = "<li class='level3'><b class='mark3b'></b><img onerror=this.style='display:none;'>";
                    insert += "<p>" + csvList[i][1] + "</p></li>";
                    $('#page_item .level234 .level2:last div:first').append(insert);
                }
                else if (csvList[i][0] == 3) {
                    insert = "<li class='level3'><b class='mark3b'></b><img onerror=this.style='display:none;'>";
                    insert += "<p>" + csvList[i][1] + "</p><b class='marka'></b><div></div></li>";
                    $('#page_item .level234 .level2:last div:first').append(insert);
                }
                else if ((csvList[i][0] == 4 && i == csvList.length - 1) || (csvList[i][0] == 4 && csvList[i + 1][0] != 5)) {
                    insert = "<li class='level4'><b class='mark4b'></b><img onerror=this.style='display:none;'>";
                    csvList[i][4] != "" ? insert += "<span data-ck-item-name='" + csvList[i][4] + "'>" + csvList[i][1] + "</span>" : insert += "<p>" + csvList[i][1] + "</p></li>";
                    $('#page_item .level234 .level3:last div:first').append(insert);
                }
                else if (csvList[i][0] == 4) {
                    insert = "<li class='level4'><b class='mark4b'></b><img onerror=this.style='display:none;'>";
                    insert += "<p>" + csvList[i][1] + "</p><b class='marka'></b><div></div></li>";
                    $('#page_item .level234 .level3:last div:first').append(insert);
                }
                else if (csvList[i][0] == 5) {
                    insert = "<li class='level5'><b class='mark5b'></b><img onerror=this.style='display:none;'>";
                    csvList[i][4] != "" ? insert += "<span data-ck-item-name='" + csvList[i][4] + "'>" + csvList[i][1] + "</span>" : insert += "<p>" + csvList[i][1] + "</p></li>";
                    $('#page_item .level234 .level4:last div:first').append(insert);
                }
                if (csvList[i][2] != "") {
                    $('#page_item .level234 img:last').attr("src", "image/check/" + csvList[i][2]);
                }
                if (csvList[i][2] == "" && csvList[i][0] != 2) {
                    $('#page_item .level234 img:last').attr("src", "image/check/未选中.png");
                    $('#page_item .level234 img:last').bind('click', function () { checksel(this) });
                    $('#page_item .level234 img:last').parent().addClass("nosel");
                }
                if (csvList[i][3] != "") {
                    $('#page_item .level234 p:last').addClass(csvList[i][3]);
                    $('#page_item .level234 p:last').css("text-decoration", "underline");
                    $('#page_item .level234 p:last').css("color", "rgb(102 155 255)");
                    $('#page_item .level234 p:last').bind('click', function () { bigmap(this.className) });
                }
            }
        }
    });
}
function checksel(obj) {
    if ($(obj).parent().hasClass("nosel")) {
        $(obj).parent().removeClass("nosel");
        $(obj).parent().addClass("sel");
        $(obj).attr("src", "image/check/选中.png");
        if ($(obj).parent().parent().children(".nosel").length > 0) { }
        else {
            $(obj).parent().parent().parent().removeClass("nosel");
            $(obj).parent().parent().parent().addClass("sel");
            if ($(obj).parent().parent().parent().has("img")) {
                $(obj).parent().parent().parent().children("img").attr("src", "image/check/选中.png");
            }
        }
        if ($(obj).parent().children("div").children(".nosel").length > 0) {
            $(obj).parent().children("div").children(".nosel").children("img").attr("src", "image/check/选中.png");
            $(obj).parent().children("div").children(".nosel").addClass("sel");
            $(obj).parent().children("div").children(".nosel").removeClass("nosel");
        }
    }
    else if ($(obj).parent().hasClass("sel")) {
        $(obj).parent().removeClass("sel");
        $(obj).parent().addClass("nosel");
        $(obj).attr("src", "image/check/未选中.png");
        if ($(obj).parent().parent().parent().hasClass("sel")) {
            $(obj).parent().parent().parent().removeClass("sel");
            $(obj).parent().parent().parent().addClass("nosel");
            $(obj).parent().parent().parent().children("img").attr("src", "image/check/未选中.png");
        }
        if ($(obj).parent().children("div").children(".sel").length > 0) {
            $(obj).parent().children("div").children(".sel").children("img").attr("src", "image/check/未选中.png");
            $(obj).parent().children("div").children(".sel").addClass("nosel");
            $(obj).parent().children("div").children(".sel").removeClass("sel");
        }
    }
}