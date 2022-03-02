function music() {
    var infolist = [];
    var infonum = [];
    for (var i = 0; i < 10; i++) {
        infonum[i] = 0;
    }    
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
        , '<ul id="page_explain"></ul>'
        , '<ul id="page_check" style="width: 1000px;"><li style="position: absolute;margin-top: 21px;margin-left: 126px;"><div class="switch-box is-info"></div></li><li style="position: absolute;margin-left: 30px;margin-top: 45px;"><p style="float: left;">统计：</p><b style="float: left;color: #f80;">999</b><p style="float: left;">/1000</p></li><div id="typenum" class="typenum"></div></ul>'
        , '<ul id="page_item"><li id="page_item_left"><ul style="top:0px;" id="music"></ul></li><li id="page_item_right"><ul id="musicplayer"></ul></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li><a><img src="image/乐谱.png"><div></div></a><p>乐谱</p></li>'
        );
        $('div.switch-box').append(
            '<label for="info" class="switch-box-label" style="margin-right: 15px;">查看</label>',
            '<input id="info" class="switch-box-input" type="checkbox"/>',
            '<label for="info" class="switch-box-slider"></label>',
            '<label for="info" class="switch-box-label">勾选</label>'
        );
        $.ajax({
            url: './txt/music.txt?ver=' + window._ver,
            dataType: 'text',
            success: function (data) {
                $('#page_explain').append('<li><p>' + data + '</p></li>');
            }
        });
        $("#musicplayer").empty();
        $.ajax({
            url: './csv/music.csv?' + window._ver,
            success: function (data) {

                csvList = $.csv()(data);
                for (var i = 1; i < 11; i++) {
                    infolist[i] = "";
                }
                var music = [];
                for(var i=1;i<11;i++){
                    music[i]=[];
                    for(var n=1;n<100;n++){
                        music[i][n]="";
                    }
                }
                for (var i = 1; i < csvList.length; i++) {
                    csvList[i][1].length>=17
                    ? music[csvList[i][4]][csvList[i][3]] += '<li><a id="' + i + '" class=" " onclick="musicexplain(this,' + i + ')" target="_blank"><p class="loop">' + ('000' + csvList[i][3]).slice(-3) + '-' + csvList[i][1] + '</p></a></li>'
                    : music[csvList[i][4]][csvList[i][3]] += '<li><a id="' + i + '" class=" " onclick="musicexplain(this,' + i + ')" target="_blank"><p>' + ('000' + csvList[i][3]).slice(-3) + '-' + csvList[i][1] + '</p></a></li>';
                    infonum[csvList[i][4]]++;
                }
                for(var i=1;i<11;i++){                    
                    for(var n=1;n<100;n++){
                        music[i][n]!=""?infolist[i]+=music[i][n]:infolist[i]=infolist[i];
                    }
                }
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
                var info = $.cookie("musicsaveData");
                var countData = 0;
                //无数据时制作空的cookie
                if ($.cookie("musicsaveData") == undefined) {
                    var saveArray = [];
                    for (var i = 1; i < csvList.length; i++) { saveArray.push(0); }
                    $.cookie("musicsaveData", saveArray, { expires: 365, path: "/" });
                }
                //统计已获得数目
                if ($.cookie("musicsaveData")) {
                    var saveArray = $.cookie("musicsaveData");
                    for (var i = 0; i < csvList.length; i++) {
                        if (saveArray[i] == '1') {
                            countData++;
                        };
                    };
                }
                //刷新计数统计的数据
                $('#page_check').find('li').find('b').eq(0).text(countData);
                $('#page_check').find('li').find('p').eq(1).text("/" + saveArray.length);
            }
        });
        open("page");
    });

    //分页
    var Page = {
        //每页内容数目    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;background: url(./image/music/082022.png) -6px -6px no-repeat;" class="off">1<div class="bd"><p style="width: 55px;">区域场景I</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082023.png) -6px -6px no-repeat;" class="off">2<div class="bd"><p style="width: 55px;">区域场景II</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082024.png) -6px -6px no-repeat;" class="off">3<div class="bd"><p>迷宫挑战</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082027.png) -6px -6px no-repeat;" class="off">4<div class="bd"><p>讨伐歼灭</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082025.png) -6px -6px no-repeat;" class="off">5<div class="bd"><p style="width: 55px;">大型任务I</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082026.png) -6px -6px no-repeat;" class="off">6<div class="bd"><p style="width: 55px;">大型任务II</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082028.png) -6px -6px no-repeat;" class="off">7<div class="bd"><p>环境音</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082029.png) -6px -6px no-repeat;" class="off">8<div class="bd"><p>其他</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082031.png) -6px -6px no-repeat;" class="off">9<div class="bd"><p>季节活动</p></div></a>';
            insert += '<a style="float:left;background: url(./image/music/082021.png) -6px -6px no-repeat;" class="off">10<div class="bd"><p>商城购买</p></div></a>';
            $("#typenum").append(insert);
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return parseFloat(diva.innerHTML);
        },
        setClickPageNum: function () {
            var divx = document.getElementById('typenum');
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
                divb = document.getElementById('typenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3        
            $("#musicplayer").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            var pgnum = 0;
            for (var i = 0; i < pg; i++) {
                pgnum = pgnum + infonum[i];
            }
            //保存クッキーの展開
            if ($.cookie("musicsaveData")) {
                var saveArray = $.cookie("musicsaveData");
                var countData = $('#music').find('li').find('a').length;                
                for (var i = 1; i < saveArray.length + 1; i++) {
                    if (saveArray[i - 1] == '1') {
                        //遍历全元素按id对特定id的元素进行变化
                        $('#music').find('li').find('a').filter('#' + i + '').addClass('completed');
                    };
                };
            }
            //        $('a.btn:first').click();
            //        $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}

function musicexplain(obj, i) {
    var info=document.getElementById("info").checked;
    if(info==true){
    //点击时变更状态
    var saveArray = $.cookie("musicsaveData");
    if ($(obj).hasClass('completed')) { $(obj).removeClass('completed'); saveArray[i - 1] = 0; }
    else { $(obj).addClass('completed'); saveArray[i - 1] = 1; }
    $.cookie("musicsaveData", saveArray, { expires: 365, path: "/" });
    //统计已获得数目
    var countData = 0;
    for (var n = 0; n < saveArray.length; n++) {
        if (saveArray[n] == '1') {
            countData++;
        };
    };
    //更新计数统计
    $('#page_check').find('li').find('b').eq(0).text(countData);
    }
    else{
    var csvList;
    var insert = '';
    var target = '#musicplayer';
    $("#musicplayer").empty();
    $.ajax({
        url: './csv/music.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<p style="font-size: 19px;">' + ('000' + csvList[i][3]).slice(-3) + '-' + csvList[i][1] + '</p>';
            csvList[i][6] == "" ? insert += '<p style="font-size: 13px;">暂无试听</p>' : insert += '<iframe style="float:left;" id="BGML" frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=110 src="//music.163.com/outchain/player?type=' + csvList[i][6] + '&id=' + csvList[i][5] + '&auto=0&height=90"></iframe>';
            insert += '<p>获得方法:</p>';
            csvList[i][2] == "" ? insert += '<p style="font-size: 13px;">暂无</p>' : insert += '<p style="font-size: 13px;">' + csvList[i][2] + '</p>';
            $(target).append(insert);
        }

    });
    }
}
//保存cookie
function musicsaveData() {
    var countcheck = $('#music').find('li').find('a').length;
    var saveArray = [];
    for (var i = 0; i < countcheck; i++) {
        //            var id = ('000' + (i + 1)).slice(-3);
        if ($('#music').find('li').find('a').eq(i).hasClass('completed')) {
            saveArray.push(1);
        } else {
            saveArray.push(0);
        };
    };
    $.cookie("musicsaveData", saveArray, { expires: 365, path: "/" });
}