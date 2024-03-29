function mounts() {
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
            , '<ul id="page_item"><li style="width:560px;" id="page_item_left"><div style="width: 100%;" id="pagenum"></div><ul style="top:0px;" id="mounts"></ul></li><li style="padding-left: 10px;padding-top: 10px;width:430px;" id="page_item_right"></li></ul>'
        );
        $('#page_itemtop').append(
            '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
            , '<li><a><img src="image/坐骑.png"><div></div></a><p>坐骑</p></li>'
        );
        $.ajax({
            url: './txt/pets.txt?ver=' + window._ver,
            dataType: 'text',
            success: function (data) {
                $('#page_explain').append(data);
                $('#page_explain').append(
                    '<li><div class="switch-box is-info"></div></li>'
                );
                $('div.switch-box').append(
                    '<label for="info" class="switch-box-label" style="margin-right: 15px;">查看</label>',
                    '<input id="info" class="switch-box-input" type="checkbox"/>',
                    '<label for="info" class="switch-box-slider"></label>',
                    '<label for="info" class="switch-box-label">勾选</label>'
                );
            }
        });
        var csvList;
        var insert = '';
        $.ajax({
            url: './csv/mounts.csv?' + window._ver,
            success: function (data) {

                csvList = $.csv()(data);
                for (var i = 1; i < csvList.length; i++) {
                    if (i % 100 == 1) {
                        insert = '<li><a id="' + csvList[i][1].slice(3,6).replace(/\b(0+)/gi,"") + '" class="btn" onclick="mountexplain(this,' + i + ')" target="_blank"><img src="image/chongwuzuoqi-ui/' + csvList[i][1] + '.png" onload="image(this)">';
                        csvList[i][8] == "0" ? insert += '<div class="bd"></div></a></li>' : insert += '<div class="bd"><img src="image/logo/lv' + csvList[i][8] + '.png"></div></a></li>';
                    }
                    else {
                        insert += '<li><a id="' + csvList[i][1].slice(3,6).replace(/\b(0+)/gi,"") + '" class="btn" onclick="mountexplain(this,' + i + ')" target="_blank"><img src="image/chongwuzuoqi-ui/' + csvList[i][1] + '.png" onload="image(this)">';
                        csvList[i][8] == "0" ? insert += '<div class="bd"></div></a></li>' : insert += '<div class="bd"><img src="image/logo/lv' + csvList[i][8] + '.png"></div></a></li>';
                    }
                    if (i % 100 == 0) { infolist[i / 100] = insert; }
                    else if (i == csvList.length - 1) { infolist[Math.ceil(i / 100)] = insert; }
                }
                Page.arr = csvList.length - 1;
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
                Page.allContent("null");
                var info3 = window.localStorage.getItem('p&msaveData');
                var countData = 0;
                //无数据时制作空的cookie                
                if (info3 == null) {
                    var saveArray = [];
                    for (var i = 1; i < 1000; i++) { saveArray.push(0); }                    
                    window.localStorage.setItem('p&msaveData', JSON.stringify(saveArray));
                    info3 = '"'+saveArray+'"';
                }               
                //给saveArray赋值
                if (info3 !== null) {
                    var saveArray = JSON.parse(info3);
                    //统计已获得数目
                    //新方法
                    for (var i = 0; i < 400; i++) {                    
                        if (saveArray[i] == '1') {
                            countData++;
                        };
                    };
                    //刷新计数统计的数据
                    $('#pagenum').find('li').find('p').eq(1).text("/" + (csvList.length-1));
                }
                $('#pagenum').find('li').find('b').eq(0).text(countData);
            }
        });
        Windowsopen("page");
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
            $('#pagenum').append(
                '<li style="position: relative;padding-right: 30px;float: right;"><p style="float: left;">统计：</p><b style="float: left;color: #f80;">999</b><p style="float: left;">/1000</p></li>',
                '<li style="position: relative;float: right;height: 20px;padding-right: 10px;"><a style="height: 20px;top: -5px;" onclick="localStorageDownload()"><img style="width: 20px;" src="image/导出.png"></a><span style="position: relative;display: inline-block;overflow: hidden;"><span><img style="height: 20px;" src="image/导入.png"></span><input type="file" id="file" accept=".txt" style="position: absolute;right: 0px;top: 0px;" onchange="localStorageInput(mounts)" "></input></span></li>'
            );
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
            var target = '#mounts';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            $('a.btn').find('.bd').removeClass('Selected');
            $(target).empty();
            $(target).append(infolist[pg]);
            //            $('a.btn:first').click();
            //            $('a.btn:first').find('.bd').addClass('Selected');
            //保存クッキーの展開
            //新方法的判断            
            if (window.localStorage.getItem("p&msaveData")) {                
                //新方法按编号来存的数组
                var saveArray = JSON.parse(window.localStorage.getItem('p&msaveData'));
                for (var i = 1; i < saveArray.length + 1; i++) {
                    //新方法按编号来
                    if(saveArray[i]=="1"){
                        $('#'+i+'').addClass('completed')
                    } 
                };
            }
        }
    };
}
function mountexplain(obj, i) {
    var info=document.getElementById("info").checked;
    if(info==true){
    //点击时变更状态
    var num = $(obj).attr('id');
    var saveArray = JSON.parse(window.localStorage.getItem('p&msaveData'));    
    if ($(obj).hasClass('completed')) { $(obj).removeClass('completed'); saveArray[num] = 0; }
    else { $(obj).addClass('completed'); saveArray[num] = 1; }    
    window.localStorage.setItem('p&msaveData', JSON.stringify(saveArray))
    //统计已获得数目
    var countData = 0;
    for (var n = 0; n < 400; n++) {
        if (saveArray[n] == '1') { countData++; };
    };
    //更新计数统计
    $('#pagenum').find('li').find('b').eq(0).text(countData);
    }
    else{
    var csvList;
    var insert = '';
    var target = '#page_item_right';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item_right").empty();
    $.ajax({
        url: './csv/mounts.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img style="float:left;width:192px;height:192px;margin-right: 210px;" src=image/chongwuzuoqi/' + csvList[i][0] + '.png onerror=this.src="image/chongwuzuoqi/068400.tex.png" onload="image(this)">';
            insert += '<p style="font-size: 19px;float:left;">' + csvList[i][4] + '</p>';
            csvList[i][3] == "1" ? insert += '<img style="float:left;width:24px;height:25px;opacity:1;" src=image/logo/飞行.png>' : insert += "";
            insert += '<p style="margin: 4px 0px 0px 0px;">Patch' + csvList[i][2] + '</p><br>';
            csvList[i][5] == "" ? insert += '<p>目前不明</p><br>' : insert += '<p>' + csvList[i][5] + '</p><br>';
            csvList[i][7] == "" ? insert += '<p>目前不明</p>' : insert += '<p style="color:#696969;font-size: 15px;">' + csvList[i][7] + '</p>';
            $(target).append(insert);
        }

    });
    }
    
}
