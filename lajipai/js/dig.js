function dig() {
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
            , '<ul id="page_check" style="height:200px;"><div style="padding-left:50px;padding-top: 10px;overflow: auto;height: 190px;position: relative;width: 200px;" id="pagenum"></div><ul style="padding-left: 20px;padding-top: 10px;top:0px;position: absolute;width: 797px;left: 190px;" id="aether"></ul></ul>'
            , '<ul id="page_item" style="min-height:560px;"><li style="padding-right: 160px; padding-left: 160px;padding-top: 20px;position: relative;"></li></ul>'
        );
        $('#page_itemtop').append(
            '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
            , '<li style="width: 140px;"><a><img src="image/藏宝图.png"><div></div></a><p>藏宝图</p></li>'
        );
        $.ajax({
            url: './csv/G10-瞪羚革.csv?' + window._ver,
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[3] = "";
                infolist[4] = "";
                infolist[5] = "";
                infolist[6] = "";
                infolist[7] = "";
                for (i = 1; i < 7; i++) {
                    infolist[1] += '<li><a class="btn" onclick="digexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 6) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                }
                for (i = 1; i < 5; i++) {
                    infolist[2] += '<li><a class="btn" onclick="digexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 8) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                }
                for (i = 1; i < 7; i++) {
                    infolist[3] += '<li><a class="btn" onclick="digexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 12) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                }
                for (i = 1; i < 5; i++) {
                    infolist[4] += '<li><a class="btn" onclick="digexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 18) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                }
                for (i = 5; i < 6; i++) {
                    infolist[4] += '<li><a class="btn" onclick="digexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 19) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                }
                infolist[5] += '<li><a class="btn" onclick="digexplain(this,1)" target="_blank"><img src="image/dig/23.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                for (i = 1; i < 6; i++) {
                    infolist[6] += '<li><a class="btn" onclick="digexplain2(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 24) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                }
                infolist[7] += '<li><a class="btn" onclick="digexplain2(this,1)" target="_blank"><img src="image/dig/30.png"><div style="background-image: url(""); class="bd"></div></a></li>';
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
            insert += '<a style="float:left;width:140px;" class="off">G18-卡冈图亚革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G17-狞豹革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G16-银狼革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G15-蛇牛革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G14-金毗罗鳄革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G13-赛加羚羊革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G12-缠尾蛟革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G11-绿飘龙革</a>';
            insert += '<a style="float:left;width:140px;" class="off">绿图-深层传送</a>';
            insert += '<a style="float:left;width:140px;" class="off">G10-瞪羚革</a>';
            insert += '<a style="float:left;width:140px;" class="off">G9-迦迦纳怪鸟</a>';
            $("#pagenum").append(insert);
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return diva.innerHTML;
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
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "G9-迦迦纳怪鸟") { pg = "1"; }
            else if (pg == "G10-瞪羚革") { pg = "1"; }
            else if (pg == "绿图-深层传送") { pg = "2"; }
            else if (pg == "G12-缠尾蛟革") { pg = "3"; }
            else if (pg == "G11-绿飘龙革") { pg = "3"; }
            else if (pg == "G13-赛加羚羊革") { pg = "4"; }
            else if (pg == "G14-金毗罗鳄革") { pg = "4"; }
            else if (pg == "G15-蛇牛革") { pg = "5"; }
            else if (pg == "G16-银狼革") { pg = "6"; }
            else if (pg == "G17-狞豹革") { pg = "6"; }
            else if (pg == "G18-卡冈图亚革") { pg = "7"; }
            $("#page_item li").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function digexplain(obj, i) {
    var csvList;
    var pgn = $('a.on').text();
    var insert = '';
    var target = '#page_item li';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item li").empty();
    $.ajax({
        url: './csv/' + pgn + '.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);

            insert += '<img onclick="bigger(this)" style="float:left;width:390px;"src="image/dig/' + pgn + '/' + csvList[i][0] + '.jpeg" onerror=this.style="display:none;">';
            for (var n = 1; n <= csvList[i][1]; n++) {
                insert += '<div style="float:left;width:130px;height:110px;text-align:center;"><img onclick="bigger(this)" style="width:110px;"src="image/dig/' + pgn + '/' + csvList[i][0] + n + '.jpeg" onerror=this.style="display:none;">';
                csvList[i][0] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: -2px;left: 114px;width: 18px;border-radius: 10px;background-color: #af0000;">' + n + '</p></div>';
            }

            $(target).append(insert);
        }

    });
}
function digexplain2(obj, i) {
    var csvList;
    var pgn = $('a.on').text();
    var insert = '';
    var target = '#page_item li';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item li").empty();
    $.ajax({
        url: './csv/' + pgn + '.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img onclick="bigger(this)" style="float:left;width:390px;"src="image/dig/' + pgn + '/' + csvList[i][0] + '.jpg" onerror=this.style="display:none;">';
            for (var n = 1; n <= csvList[i][1]; n++) {
                insert += '<div style="float:left;width:130px;height:110px;text-align:center;"><img onclick="bigger(this)" style="width:110px;"src="image/dig/' + pgn + '/' + csvList[i][0] + n + '.jpg" onerror=this.style="display:none;">';
                csvList[i][0] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: -2px;left: 114px;width: 18px;border-radius: 10px;background-color: #af0000;">' + n + '</p></div>';
            }

            $(target).append(insert);
        }

    });
}