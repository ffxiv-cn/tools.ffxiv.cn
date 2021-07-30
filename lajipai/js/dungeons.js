function dungeons() {
    var infolist = [];    
    //读取
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
        , '<ul id="page_check" style="height:100px;"><div id="pagenum" class="pagenum" style="width: 900px;"></div></ul>'
        , '<ul id="page_item"><li id="page_item_left" style="min-height: 560px;width: 500px;border-right: 1px solid rgba(42,42,41,1);box-shadow: 1px 1px 0px rgba(67,67,67,1);"><ul style="width: 500px;top:0px;text-align: center;" id="dungeonstype"></ul><ul style="width: 500px;top:0px;padding-top: 20px;" id="music"></ul></li><li id="page_item_right" style="width: 450px;"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li style="width: 150px;"><a><img src="image/副本开启.png"><div></div></a><p>副本开启</p></li>'
    );
        $.ajax({
            url: './csv/dungeons.csv?' + window._ver,
            success: function (data) {

                csvList = $.csv()(data);
                infolist[21] = "";
                infolist[31] = "";
                infolist[41] = "";
                infolist[51] = "";
                infolist[22] = "";
                infolist[32] = "";
                infolist[42] = "";
                infolist[52] = "";
                infolist[23] = "";
                infolist[33] = "";
                infolist[43] = "";
                infolist[53] = "";
                for (var i = 1; i < csvList.length; i++) {
                    var num = csvList[i][9] + csvList[i][10];
                    infolist[num] += '<li><a class="btn" onclick="dungeonsexplain(this,' + i + ')" target="_blank"><p>' + csvList[i][2] + '</p></a></li>';
                }
                $('#dungeonstype').append(
                '<li><a style="float:left;width:32px;height: 32px;background-image: url(image/dungeons/迷宫挑战.png);margin-right: 20px;margin-left: 10px;" onclick="dungeons(1)" class="on"><div class="bd"></div></a></li>'
                , '<li><a style="float:left;width:32px;height: 32px;background-image: url(image/dungeons/讨伐歼灭战.png);margin-right: 20px;" onclick="dungeons(2)" class="off"><div class="bd"></div></a></li>'
                , '<li><a style="float:left;width:32px;height: 32px;background-image: url(image/dungeons/大型任务.png);margin-right: 20px;" onclick="dungeons(3)" class="off"><div class="bd"></div></a></li>'
                );
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
            }
        });
        open("page");
    });

    //分页
    var Page = {
        //每页内容数目    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:200px;height: 54px;background-image: url(image/dungeons/5.0.jpg);margin-right: 20px;margin-left: 10px;" class="off"><p style="top: 55px;position: relative;">5.0<p><div class="bd"></div></a>';
            insert += '<a style="float:left;width:200px;height: 54px;background-image: url(image/dungeons/4.0.jpg);margin-right: 20px;" class="off"><p style="top: 55px;position: relative;">4.0<p><div class="bd"></div></a>';
            insert += '<a style="float:left;width:200px;height: 54px;background-image: url(image/dungeons/3.0.jpg);margin-right: 20px;" class="off"><p style="top: 55px;position: relative;">3.0<p><div class="bd"></div></a>';
            insert += '<a style="float:left;width:200px;height: 54px;background-image: url(image/dungeons/2.0.jpg);margin-right: 20px;" class="off"><p style="top: 55px;position: relative;">2.0<p><div class="bd"></div></a>';
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
            var target = '#music';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = $('#pagenum a.on').text(); // 1 2 3
            if (pg == "5.0") { pg = "5"; }
            else if (pg == "4.0") { pg = "4"; }
            else if (pg == "3.0") { pg = "3"; }
            else if (pg == "2.0") { pg = "2"; }
            dungeons(1);
            //        $('a.btn:first').click();
            //        $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
    dungeons = function (i) {
        var target = '#music';
        var pg = $('#pagenum a.on').text();
        if (pg == "5.0") { pg = "5"; }
        else if (pg == "4.0") { pg = "4"; }
        else if (pg == "3.0") { pg = "3"; }
        else if (pg == "2.0") { pg = "2"; }
        var num = pg + i;
        var sel = i - 1;
        $('#dungeonstype a:not(' + sel + ')').removeClass();
        $('#dungeonstype a:not(' + sel + ')').addClass("off");
        $('#dungeonstype a:eq(' + sel + ')').removeClass();
        $('#dungeonstype a:eq(' + sel + ')').addClass("on");        
        $(target).empty();
        $(target).append(infolist[num]);
    }
}

function dungeonsexplain(obj, i) {
    var csvList;
    var insert = '';

    var target = '#page_item_right';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item_right").empty();
    $.ajax({
        url: './csv/dungeons.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);            
            insert += '<img style="float:left;width:376px;height:120px;margin-top: 10px;" src=image/dungeons/' + csvList[i][0] + '.png onload="image(this)">';
            insert += '<p style="float:left;">副本：</p><p style="color: #FFC125;font-weight: bold;">' + csvList[i][2] + '</p>';
            insert += '<p style="float:left;">等级：</p><p style="color: #FFC125;font-weight: bold;">' + csvList[i][8] + '</p>';
            insert += '<p style="float:left;">装等：</p><p style="color: #FFC125;font-weight: bold;">' + csvList[i][7] + '</p>';
            insert += '<p style="float:left;">任务：</p><p style="color: #FFC125;font-weight: bold;">' + csvList[i][3] + '</p>';
            csvList[i][4] == "" ? insert += '' : insert += '<p style="float:left;">位置：</p><p style="color: #FFC125;font-weight: bold;">' + csvList[i][4] + '</p>';
            csvList[i][5] == "" ? insert += '' : insert += '<p style="float:left;">NPC：</p><p style="color: #FFC125;font-weight: bold;margin-bottom: 10px;">' + csvList[i][5] + '</p>';
            csvList[i][6] == "" ? insert += '' : insert += '<iframe src="https://www.ffxiv.cn/assets/map/index.html?' + csvList[i][6] + '" style="width: 380px;height: 280px;"></iframe>';
            $(target).append(insert);
        }

    });
}