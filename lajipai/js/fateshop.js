function fateshop() {
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
        , '<ul id="page_check" style="height:80px;"><div style="padding-left:50px;width:650px;" id="pagenum"></div></ul>'
         , '<ul id="page_item"  style="min-height: 540px;"><li id="page_item_left"><ul style="top:0px;min-height: 400px;" id="fateitem"></ul></li><li style="padding-top: 20px;float: left;padding-left: 0px;" id="page_item_right"><ul  id="fateshop"></ul></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li style="width: 160px;"><a><img src="image/危命商人.png"><div></div></a><p>危命商人</p></li>'
    );
        $.ajax({
            url: './csv/危命商人.csv?' + window._ver,
            success: function (data) {
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
            insert += '<a style="width:150px;" class="off">雷克兰德</a>';
            insert += '<a style="width:150px;" class="off">安穆·艾兰</a>';
            insert += '<a style="width:150px;" class="off">伊尔美格</a>';
            insert += '<a style="width:150px;" class="off">拉凯提卡大森林</a>';
            insert += '<a style="width:150px;" class="off">珂露西亚岛</a>';
            insert += '<a style="width:150px;" class="off">黑风海</a>';
            insert += '<a style="width:150px;" class="off">水晶都</a>';
            insert += '<a style="width:150px;" class="off">游末邦</a>';
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
//            var target = '#aether';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            $("#fateshop").empty();
            $("#fateitem").empty();
            fateshopexplain(pg);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function fateshopexplain(name) {
    var csvList;
    var insert1 = '';
    var insert2 = '<ul style="top:0px;"><li style="width:250px;">物品</li><li style="width:100px;">等级</li><li style="width:100px;">货币</li></ul>';
    var target1 = '#fateshop';
    var target2 = '#fateitem';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $.ajax({
        url: './csv/危命商人.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            for (var i = 1; i < csvList.length; i++) {
                if (csvList[i][0] == name && csvList[i][2] != "") {
                    insert1 += '<p style="font-size: 13px;">' + csvList[i][1] + '</p>';
                    insert1 += '<iframe src="https://www.ffxiv.cn/assets/map/index.html?' + csvList[i][2] + '" style="width: 380px;height: 300px;"></iframe>';
                    $(target1).append(insert1);
                }
                if (csvList[i][0] == name && csvList[i][2] == "") {
                    insert2 += '<ul style="top:0px;"><li style="width:250px;">' + csvList[i][1] + '</li><li style="width:100px;">' + csvList[i][4] + '</li><li style="width:100px;">' + csvList[i][3] + '<img alt="" src="image/logo/065071.tex.png" style="width: 20px; height: 20px;opacity: 1;" /></li></ul>';
                }
            }
            $(target2).append(insert2);
        }

    });
}