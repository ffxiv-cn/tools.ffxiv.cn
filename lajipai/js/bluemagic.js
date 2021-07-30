function bluemagic() {
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
        , '<ul id="page_item"><li style="width:560px;" id="page_item_left"><div style="width: 100%;" id="pagenum"></div><ul style="top:0px;" id="bluemagic"></ul></li><li style="padding-left: 10px;padding-top: 10px;width:430px;" id="page_item_right"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li style="width: 160px;"><a><img src="image/青魔.png"><div></div></a><p>青魔法书</p></li>'
    );
//        $.ajax({
//            url: './txt/pets.txt?ver=' + window._ver,
//            dataType: 'text',
//            success: function (data) {
//                $('#page_explain').append(data);
//            }
//        });
        var csvList;
        var insert = '';
        $.ajax({
            url: './csv/qm.csv?' + window._ver,
            success: function (data) {

                csvList = $.csv()(data);
                var n = (csvList.length - 1) / 100 > parseInt((csvList.length - 1) / 100) ? parseInt((csvList.length - 1) / 100) + 1 : ((csvList.length - 1) / 100);
                for (var i = 1; i < n; i++) {
                    infolist[i] = "";
                }
                for (var i = 1; i < csvList.length; i++) {
                    if (i % 100 == 1) {
                        insert = '<li><a class="btn" onclick="bluemagicexplain(' + i + ')" target="_blank"><img src="image/qingmo-ui/' + csvList[i][1] + '.png" onerror=this.src="image/qingmo-ui/003250.tex.png" onload="image(this)"><div class="bd"></div></a></li>';
                    }
                    else {
                        insert += '<li><a class="btn" onclick="bluemagicexplain(' + i + ')" target="_blank"><img src="image/qingmo-ui/' + csvList[i][1] + '.png" onerror=this.src="image/qingmo-ui/003250.tex.png" onload="image(this)"><div class="bd"></div></a></li>';
                    }
                    if (i % 100 == 0)
                    { infolist[i / 100] = insert; }
                    else if (i == csvList.length - 1)
                    { infolist[Math.ceil(i / 100)] = insert; }
                }
                Page.arr = csvList.length - 1;
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
        defaultPerPageNum: 100,
        arr: 0,
        setTotalPageNums: function () {
            var pp = Page.defaultPerPageNum;
            var pnums = Page.arr / pp > parseInt(Page.arr / pp) ? parseInt(Page.arr / pp) + 1 : Page.arr / pp;
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
            var target = '#bluemagic';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3            
            $('a.btn').find('.bd').removeClass('Selected');
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function bluemagicexplain(i) {
    var csvList;
    var insert = '';
    var target = '#page_item_right';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item_right").empty();
    $.ajax({
        url: './csv/qm.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<p style="width: 50px;background-color: rgba(81,81,83,1);float: left;text-align: center;color: #FFC125;font-weight: bold;">NO.' + csvList[i][0] + '</p>' + '<p style="width:120px;text-align: center;color: #FFC125;font-weight: bold;">' + csvList[i][3] + '</p>';
            insert += '<img style="float:left;width:128px;height:128px;margin-top: 10px;" src=image/qingmo-ui/' + csvList[i][2] + '.png onerror=this.src="image/qingmo-ui/003250.tex.png" onload="image(this)">';
            insert += '<p style="float:left;margin-top: 86px;">攻击类型：</p><p style="color: #FFC125;font-weight: bold;margin-top: 86px;">' + csvList[i][4] + '</p>';
            insert += '<p style="float:left;">攻击属性：</p><p style="color: #FFC125;font-weight: bold;">' + csvList[i][5] + '</p>';
            insert += '<p style="float:left;">稀有度：</p><p style="color: #FFC125;font-weight: bold;margin-bottom: 10px;">' + csvList[i][6] + '</p>';
            insert += '<p style="height: 140px;">' + csvList[i][9] + '</p>';
            insert += '<p style="color: #FFC125;font-weight: bold;">主要习得方法</p>';
            if (csvList[i][8] == 1) {
                insert += '<div style="float:left;width:22px;height:22px;background: url(./image/qingmo.png) -96px -61px;"></div>';
            }
            else if (csvList[i][8] == 2) {
                insert += '<div style="float:left;width:22px;height:22px;background: url(./image/qingmo.png) -57px -133px;"></div>';
            }
            else if (csvList[i][8] == 3) {
                insert += '<div style="float:left;width:22px;height:22px;background: url(./image/qingmo.png) -74px -86px;"></div>';
            }
            insert += '<p style="margin-top: 4px;">' + csvList[i][7] + '</p>';
            //            csvList[i][0] == "*" ? insert += '<p style="margin: 4px 0px 0px 0px;">Patch--</p><br>' : insert += '<p style="margin: 4px 0px 0px 0px;">Patch' + csvList[i][0] + '</p><br>';            
            $(target).append(insert);
        }

    });
}