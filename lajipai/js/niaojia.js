function niaojia() {
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
        , '<ul id="page_item"  style="min-height: 540px;"><li id="page_item_left" style="border-right: 1px solid rgba(42,42,41,1);box-shadow: 1px 1px 0px rgba(67,67,67,1);"><ul style="padding-left: 40px;top:0px;min-height: 400px;"></ul></li><li style="padding-top: 20px;float: left;padding-left: 0px;" id="page_item_right"><ul id="niaojiaexplain" style="top:7px;padding-left: 20px;"></ul></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li style="width: 160px;"><a><img src="image/鸟甲.png"><div></div></a><p>鸟甲一览</p></li>'
    );
        $.ajax({
            url: './csv/鸟甲.csv?' + window._ver,
            success: function (data) {

                csvList = $.csv()(data);
                var insert = '';
                insert += '<ul style="top:0px;"><li style="width:50px;padding: 6px;">图标</li><li style="width:120px;">名称</li><li style="width:280px;">获得方法</li></ul>';
                for (var i = csvList.length-1; i > 0; i--) {
                    insert += '<ul style="top:0px;"><li style="width:50px;height:57px;padding: 6px;"><a class="btn" onclick="niaojiaexplain(' + i + ')" target="_blank"><img alt="" src="image/niaojia/' + csvList[i][0] + '.png" onload="image(this)"><div class="bd"></div></a></li><li style="width:120px;">' + csvList[i][1] + '</li><li style="width:280px;">' + csvList[i][3] + '</li>';
                }
                $('#page_item_left ul').append(insert);
            }
        });
        Windowsopen("page");
    });    
}
function niaojiaexplain(num) {
    var csvList;
    var insert = '';
    var target = '#page_item_right ul';
    $(target).empty();
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $.ajax({
        url: './csv/鸟甲.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            csvList[num][6] == "" ? insert += '' : insert += '<p style="font-size: 13px;">位置：' + csvList[num][4] + '</p>';
            csvList[num][6] == "" ? insert += '' : insert += '<p style="font-size: 13px;">Npc：' + csvList[num][5] + '</p>';
            insert += '<p style="font-size: 13px;word-break: break-word;white-space: break-spaces;width: 400px;">介绍：' + csvList[num][2] + '</p>';
            csvList[num][6] == "" ? insert += '' : insert += '<iframe src="https://www.ffxiv.cn/assets/map/index.html?' + csvList[num][6] + '" style="width: 380px;height: 300px;"></iframe>'; ;
            $(target).append(insert);
        }

    });
    $('#main').scroll(function () {
        $("#niaojiaexplain").css("top", ($('#main').scrollTop() + 7));
    });
}
