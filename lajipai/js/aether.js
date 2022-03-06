function aether() {
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
        , '<ul id="page_item"><li style="width:560px;" id="page_item_left"></li><li style="padding-left: 10px;padding-top: 10px;" id="page_item_right"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li><a><img src="image/风脉.png"><div></div></a><p>风脉</p></li>'
    );
        var insert2 = '';
        insert2 += '<p style="font-size: 19px;">使用说明</p><ul style="width:420px;height:480px;top: 0px;">';
        insert2 += '<img alt="" src="image/aether/nothing/shuoming.jpg" style="width: 193px; height: 59px;opacity: 1;" /><br />'
        insert2 += '<p class="explain-main">风脉小图对应1-10，具体可看编号</p>';
        insert2 += '<p class="explain-main">风脉支线任务大图上的编码非1-5顺序</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q：什么是风脉？</span></p>';
        insert2 += '<p class="explain-main">A：风脉是野外地图飞行的必要条件之一</p>';
        insert2 += '<p class="explain-main">10个分布在该地图各个角落的[风脉泉]</p>';
        insert2 += '<p class="explain-main">　　-3.0~5.0地图只有5个[风脉泉]</p>';
        insert2 += '<p class="explain-main">4个完成该地图指定的支线任务送的[风脉泉]</p>';
        insert2 += '<p class="explain-main">1个指定主线任务送的[风脉泉]</p>';
        insert2 += '<p class="explain-main">完成以上累积15个[风脉泉]就可以飞该张图了</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q：怎么飞? </span></p>';
        insert2 += '<p class="explain-main">完成15个[风脉泉]后，要确保该坐骑是飞行坐骑<img alt="" src="image/logo/飞行.png" style="width: 20px; height: 20px;opacity: 1;" /></p>';
        insert2 += '<p class="explain-main">陆行鸟系列坐骑，需要去完成「我心飞翔」才可飞行</p>';
        insert2 += '<p class="explain-main">「我心飞翔」伊修加德基础层 圣大鸟房 阿尔努兰(X:7 Y:11)</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q：如何查看风脉</span></p>';
        insert2 += '<p class="explain-main">A：右下角的快捷指令-任务情报-重要物品-找到「风脉仪」，使用它可以查询风脉的位置</p>';
        insert2 += '<p class="explain-main">或按P，快捷指令-地图&amp;移动，点开风脉泉，可以查看你现在开启的风脉情况</p>';
        $.ajax({
            url: './csv/aether.csv?' + window._ver,
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[3] = "";
                infolist[4] = "";
                for (i = 1; i < 7; i++) {
                    infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 7; i < 13; i++) {
                    infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 13; i < 19; i++) {
                    infolist[3] += '<li><a class="btn" onclick="aetherexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 19; i < 25; i++) {
                    infolist[4] += '<li><a class="btn" onclick="aetherexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
                $("#page_item_right").append(insert2);
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
            $("#aether").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            //            $('a.btn:first').click();
            //            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}

function aetherexplain(obj, i) {
    var csvList;
    var insert = '';    
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item_left").empty();
    $.ajax({
        url: './csv/aether.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            csvList[i][0] == "" ? insert += '<p style="font-size: 19px;">全部由主线触发</p>' : insert += '<img onclick="bigger(this)" style="float:left;width:340px;"src="image/aether/' + csvList[i][0] + '.jpeg" onerror=this.style="display:none;">';
            insert += '<ul style="top:0px;">';
            if (csvList[i][0] != ""){
                for (var n = 1; n < 11; n++) {
                insert += '<div style="float:left;width:100px;height:70px;text-align:center;"><img onclick="bigger(this)" style="width:80px;"src="image/aether/' + csvList[i][0] + n + '.jpg" onerror=this.style="display:none;">';
                csvList[i][0] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: 0px;left: 20px;width: 18px;border-radius: 10px;background-color: #66ccff;">' + n + '</p></div>';
                }
            }
            insert += '</ul><ul>';
            csvList[i][12] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][12] + '</p>';
            csvList[i][13] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][13] + '</p>';
            csvList[i][14] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][14] + '</p>';
            csvList[i][15] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][15] + '</p>';
            insert += '</ul>';
            $('#page_item_left').append(insert);
        }

    });
}