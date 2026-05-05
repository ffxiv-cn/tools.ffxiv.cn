function manzushop() {
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
        , '<ul id="page_check" style="height:200px;"><div id="pagenum"></div><ul style="top:0px;" id="aether"></ul></ul>'
         , '<ul id="page_item"  style="min-height: 540px;"><li id="page_item_left" style="width: 670px;"><ul style="top:0px;min-height: 400px;padding-left: 65px;" id="fateitem"></ul></li><li style="padding-top: 20px;float: left;padding-left: 0px;" id="page_item_right"><ul  id="fateshop"></ul></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li style="width: 160px;"><a><img src="image/蛮族兑换.png"><div></div></a><p>蛮族兑换</p></li>'
    );
        $.ajax({
            url: './csv/SpecialShop.csv?' + window._ver,
            success: function (data) {
                infolist[1] = "";//2.0
                infolist[2] = "";//3.0
                infolist[3] = "";//4.0
                infolist[4] = "";//5.0
                infolist[5] = "";//6.0
                infolist[6] = "";//7.0
                for (i = 1; i < 6; i++) {
                    infolist[1] += '<li style="width:180px;text-align: center;"><a class="btn" onclick="fateshopexplain(' + i + ')" target="_blank"><img style="width:74px;" src="image/manzu/' + i + '.png"><div style="width:76px;left: 0px;background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 6; i < 9; i++) {
                    infolist[2] += '<li style="width:180px;text-align: center;"><a class="btn" onclick="fateshopexplain(' + i + ')" target="_blank"><img style="width:74px;" src="image/manzu/' + i + '.png"><div style="width:76px;left: 0px;background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 9; i < 12; i++) {
                    infolist[3] += '<li style="width:180px;text-align: center;"><a class="btn" onclick="fateshopexplain(' + i + ')" target="_blank"><img style="width:74px;" src="image/manzu/' + i + '.png"><div style="width:76px;left: 0px;background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 12; i < 15; i++) {
                    infolist[4] += '<li style="width:180px;text-align: center;"><a class="btn" onclick="fateshopexplain(' + i + ')" target="_blank"><img style="width:74px;" src="image/manzu/' + i + '.png"><div style="width:76px;left: 0px;background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 15; i < 18; i++) {
                    infolist[5] += '<li style="width:180px;text-align: center;"><a class="btn" onclick="fateshopexplain(' + i + ')" target="_blank"><img style="width:74px;" src="image/manzu/' + i + '.png"><div style="width:76px;left: 0px;background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 18; i < 21; i++) {
                    infolist[6] += '<li style="width:180px;text-align: center;"><a class="btn" onclick="fateshopexplain(' + i + ')" target="_blank"><img style="width:74px;" src="image/manzu/' + i + '.png"><div style="width:76px;left: 0px;background-image: url("");" class="bd"></div></a></li>';
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
            insert += '<a style="float:left;width:50px;" class="off">7.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">6.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">5.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">4.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">3.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">2.0</a>';
            /* insert += '<a style="width:150px;" class="off">雷克兰德</a>';
            insert += '<a style="width:150px;" class="off">安穆·艾兰</a>';
            insert += '<a style="width:150px;" class="off">伊尔美格</a>';
            insert += '<a style="width:150px;" class="off">拉凯提卡大森林</a>';
            insert += '<a style="width:150px;" class="off">珂露西亚岛</a>';
            insert += '<a style="width:150px;" class="off">黑风海</a>';
            insert += '<a style="width:150px;" class="off">水晶都</a>';
            insert += '<a style="width:150px;" class="off">游末邦</a>'; */
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
            if (pg == "2.0") { pg = "1"; }            
            else if (pg == "3.0") { pg = "2"; }
            else if (pg == "4.0") { pg = "3"; }
            else if (pg == "5.0") { pg = "4"; }            
            else if (pg == "6.0") { pg = "5"; }
            else if (pg == "7.0") { pg = "6"; }
            $("#aether").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $("#fateshop").empty();
            $("#fateitem").empty();
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function fateshopexplain(num) {
    var name="";
    if(num==1){name="65054";}
    else if (num==2){name="65050";}
    else if (num==3){name="65051";}
    else if (num==4){name="65052";}
    else if (num==5){name="65053";}
    else if (num==6){name="65055";}
    else if (num==7){name="65056";}
    else if (num==8){name="65057";}
    else if (num==9){name="65058";}
    else if (num==10){name="65061";}
    else if (num==11){name="65064";}
    else if (num==12){name="65074";}
    else if (num==13){name="65077";}
    else if (num==14){name="65080";}
    else if (num==15){name="65091";}
    else if (num==16){name="65095";}
    else if (num==17){name="65100";}
    else if (num==18){name="65111";}
    else if (num==19){name="65116";}
    else if (num==20){name="65132";}
    // else if (num==21){name="";}
    // else if (num==22){name="";}
    // else if (num==23){name="";}
    // else if (num==24){name="";}
    var csvList;
    var insert1 = '';
    var insert2 = '<ul style="top:0px;"><li style="width:250px;">物品</li><li style="width:100px;">等级</li><li style="width:100px;">交换数量</li><li style="width:100px;">货币</li></ul>';
    var target1 = '#fateshop';
    var target2 = '#fateitem';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $.ajax({
        url: './csv/SpecialShop.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            for (var i = 1; i < csvList.length; i++) {
                // if (csvList[i][0] == name && csvList[i][2] != "") {
                //     insert1 += '<p style="font-size: 13px;">' + csvList[i][1] + '</p>';
                //     insert1 += '<iframe src="https://www.ffxiv.cn/assets/map/index.html?' + csvList[i][2] + '" style="width: 380px;height: 300px;"></iframe>';
                //     $(target1).empty();
                //     $(target1).append(insert1);
                // }
                if (csvList[i][0] == name) {
                    insert2 += '<ul style="top:0px;"><li style="width:250px;"><span data-ck-item-name>' + csvList[i][3] + '</span></li><li style="width:100px;">' + csvList[i][4] + '</li><li style="width:100px;">' + csvList[i][5] + '</li><li style="width:100px;"><img alt="" src="image/manzu/icon/0'+csvList[i][0]+'.png" style="width: 20px; height: 20px;opacity: 1;vertical-align: middle;" />' + csvList[i][6] + '</li></ul>';
                }
            }
            $(target2).empty();
            $(target2).append(insert2);
        }

    });
}