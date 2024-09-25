function explore() {
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
            , '<ul id="page_explain"></ul>'
            , '<ul id="page_item"><li style="width:560px;" id="page_item_left"><div style="width: 100%;" id="pagenum"></div><ul style="top:0px;" id="pets"></ul></li><li style="padding-left: 10px;padding-top: 10px;width:430px;" id="page_item_right"></li></ul>'
        );
        $('#page_itemtop').append(
            '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
            , '<li style="width: 150px;"><a><img src="image/探索笔记.png"><div></div></a><p>探索笔记</p></li>'
        );
        $.ajax({
            url: './txt/explore.txt?ver=' + window._ver,
            dataType: 'text',
            success: function (data) {
                $('#page_explain').append(data);
            }
        });
        var csvList;
        var insert = '';
        $.ajax({
            url: './csv/explore.csv?' + window._ver,
            success: function (data) {

                csvList = $.csv()(data);
                for (var i = 1; i < csvList.length; i++) {
                    if (i == 81 || i == 143 || i == 205 || i == 250 || i == 296) { insert = '<li><a class="btn" onclick="exploreexplain(this,' + i + ')" target="_blank"><img src="image/explore/' + csvList[i][0] + '.png" onload="image(this)"><div class="bd"></div></a></li>'; }
                    else { insert += '<li><a class="btn" onclick="exploreexplain(this,' + i + ')" target="_blank"><img src="image/explore/' + csvList[i][0] + '.png" onload="image(this)"><div class="bd"></div></a></li>'; }
                    if (i == 80) { infolist[1] = insert; }
                    else if (i == 142) { infolist[2] = insert; }
                    else if (i == 204) { infolist[3] = insert; }
                    else if (i == 249) { infolist[4] = insert; }
                    else if (i == 295) { infolist[5] = insert; }
                    else if (i == 340) { infolist[6] = insert; }
                }
                Page.arr = csvList.length - 1;
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
        defaultPerPageNum: 100,
        arr: null,
        setTotalPageNums: function () {
            var pp = Page.defaultPerPageNum;
            var pnums = 6;
            var div = document.getElementById('pagenum');
            div.innerHTML = "";
            for (var i = 0; i < pnums; i++) {
                var a = document.createElement('a');
                a.innerHTML = i + 1;
                a.setAttribute('class', 'off');
                div.appendChild(a);
            }
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
            var target = '#pets';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function exploreexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '#page_item_right';
    $("#page_item_right").empty();
    $('div.bd.Selected').removeClass('Selected');
    $(obj).find('.bd').addClass('Selected');
    $.ajax({
        url: './csv/explore.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img style="float:left;width:410px;height:266px;padding: 20px 0px 0px 0px;" src=image/explore/' + csvList[i][1] + '.png onload="image(this)">';
            insert += '<p style="font-size: 19px;">' + csvList[i][4] + ('000' + csvList[i][2]).slice(-3) + csvList[i][3] + '</p>';
            insert += '<p style="font-size: 11px;">' + csvList[i][14] + '</p>';
            insert += '<p style="font-size: 13px;padding:8px 0 0 0;">' + csvList[i][5] + '(X<font color="#ff912f">' + csvList[i][6] + '</font>,Y<font color="#ff912f">' + csvList[i][7] + '</font>)</p>';
            csvList[i][10] == "" ? insert += '<p style="font-size: 13px;">特殊要求：无</p>' : insert += '<p style="font-size: 13px;">' + csvList[i][10] + '<img style="width:32px;height:32px;margin: 0px 0px -10px 0;opacity:1;" src=image/weather/' + csvList[i][9] + '.png onerror=this.style.display="none"><font color="#ff912f">' + csvList[i][8] + '</font></p>';
            insert += '<img onclick="bigger(this)" style="float:right;width:112px;height:63px;" src=' + suffix('image/explore/' + csvList[i][16]) + ' onload="image(this)">';
            insert += '<img onclick="bigger(this)" style="margin-right: 10px;float:right;width:112px;height:63px;right:10px;" src=' + suffix('image/explore/' + csvList[i][15]) + ' onload="image(this)"></p>';
            insert += '<img style="float:left;width:40px;height:40px;opacity:1;" src=image/action/' + csvList[i][13] + '.png>' + '<p style="font-size: 13px;">' + csvList[i][11] + '</p>' + '<p style="font-size: 13px;"><font color="#ff912f">' + csvList[i][12] + '</font></p>';
            $(target).append(insert);
        }
    });
}