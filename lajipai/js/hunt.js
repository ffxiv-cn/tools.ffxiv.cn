function hunt() {
    var infolist = [];
    //读取
    $(function () {
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
        , '<ul id="page_check" style="height:200px;"><div style="padding-left:80px;" id="pagenum"></div><ul style="top:0px;" id="aether"></ul></ul>'
        , '<ul id="page_item" style="min-height: 400px;"><li style="left: 300px;position: relative;"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li><a><img src="image/狩猎.png"><div></div></a><p>狩猎</p></li>'
    ); 
        $.ajax({
            url: './csv/aether.csv?' + window._ver,
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[3] = "";
                infolist[4] = "";
                for (i = 1; i < 7; i++) {
                    infolist[1] += '<li><a class="btn" onclick="huntexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 7; i < 13; i++) {
                    infolist[2] += '<li><a class="btn" onclick="huntexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 13; i < 19; i++) {
                    infolist[3] += '<li><a class="btn" onclick="huntexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 19; i < 25; i++) {
                    infolist[4] += '<li><a class="btn" onclick="huntexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
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
            insert += '<a style="float:left;width:50px;" class="off">3.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">4.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">5.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">6.0</a>';
            $("#pagenum").append(insert);
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return parseFloat(diva.innerHTML);
        },
        setClickPageNum: function () {
            var divx = document.getElementById('pagenum');
            var a = divx.children;
            var len = a.length;
            for (var i = 0; i < len; i++) {
                a[i].onclick = function () {
                    for (var i = 0; i < len; i++) { a[i].className = "off"; }
                    this.className = "on";
                    Page.allContent(this);
                };
            }
        },
        allContent: function (divb) {
            var target = '#aether';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[3];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "3.0") { pg = "1"; }
            else if (pg == "4.0") { pg = "2"; }
            else if (pg == "5.0") { pg = "3"; }
            else if (pg == "6.0") { pg = "4"; }
            $("#page_item li").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}

function huntexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '#page_item li';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item li").empty();
    $.ajax({
        url: './csv/aether.csv?' + window._ver,
        success: function (data) {
            insert += '<img onclick="bigger(this)" style="width:390px;"src="image/hunt/' + i + '.jpg">';
            $(target).append(insert);
        }
    });
}