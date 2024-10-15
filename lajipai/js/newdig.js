function newdig() {
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
            , '<ul id="page_check" style="height: 50px;"><div style="padding-left:50px;padding-top: 10px;display: flex;" id="pagenum"></div></ul>'
            , '<ul id="page_item" style="min-height:560px;"><li style="width:450px;" id="page_item_left"></li><li id="page_item_right" style="padding-right: 0px; padding-left: 25px;padding-top: 80px;position: relative;"></li></ul>'
        );
        $('#page_check').append(
            '<div id="shuoming" class="on" onclick="shuomingswitch()">?</div>'
        );
        $('#page_item_left').append(
            '<ul id="dig_check"></ul><ul id="dig_text"><div id="shuru"><ul id="shuru-l"></ul><ul id="shuru-r"></ul></div><div id="guihua"></div></ul>'
        );
        $('#page_item_right').append(
            '<canvas id="canvas" width="500" height="500"></canvas>'
        );
        $('#dig_check').append(
            '<li onclick="digcheck(1)"><p>自动识别</p></li>'
            , '<li onclick="digcheck(2)"><p>手动输入</p></li>'
            // , '<li onclick="digcheck(3)"><p>路线规划</p></li>'
            , '<li id="check-item"></li>'
        );

        $('#page_itemtop').append(
            '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
            , '<li style="width: 198px;"><a><img src="image/Routing.png"><div></div></a><p>宝图路线规划</p></li>'
        );
        $.ajax({
            url: './csv/金毗罗鳄革.csv?' + window._ver,
            success: function () {
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
                $('#pagenum a:first').click();
                digguihua();
                // digcheck(1);
                digloadcsdlist();
                digcanvasshuoming();
            }
        });
        Windowsopen("page");
    });
    //分页
    var Page = {
        //每页内容数目   
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:100px;flex-shrink: 0;" class="off">狞豹革</a>';
            // insert += '<a style="float:left;width:100px;flex-shrink: 0;" class="off">金毗罗鳄革</a>';
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
            //设置初始被选项
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            //数据初始化
            var saveArray = [];
            for (var i = 0; i < 8; i++) {
                saveArray[i] = "";
            };
            var G = $('#pagenum a.on').text();
            digloadmaplist(G);
            window.localStorage.setItem('digsaveData', JSON.stringify(saveArray));
            window.localStorage.setItem('digsavetxt', JSON.stringify(""));
            window.localStorage.setItem('digshibietxt', JSON.stringify(""));
            if ($('#dig_check li').eq(1).hasClass('on')) {
                for (var i = 1; i < 9; i++) {
                    digclear(i);
                }
            }
        }
    };
}
function digcheck(i) {
    if (i == 1) {
        $('#dig_check li').removeClass("on");
        $('#dig_check li').eq(i - 1).addClass("on");
        $("#shuru-l").css("left", "0px");
        $("#shuru-r").css("left", "0px");
        digloadtxt2();
        $("#check-item").css("left", "5px");
    }
    else if (i == 2) {
        $('#dig_check li').removeClass("on");
        $('#dig_check li').eq(i - 1).addClass("on");
        $("#shuru-l").css("left", "-430px");
        $("#shuru-r").css("left", "-430px");
        digloadData();
        $("#check-item").css("left", "145px");
    }
    else if (i == 3) {
        $('#dig_check li').removeClass("on");
        $('#dig_check li').eq(i - 1).addClass("on");
        digcanvas2(order);
        digloadtxt();
        $("#check-item").css("left", "285px");
    }
}
function digguihua() {
    $('#dig_text #shuru-l').append(
        '<li><textarea style="height:242px;" placeholder="复制粘贴游戏内聊天框中的信息来自动识别\n示例：\n[19:28](大妈) 高脚孤丘 ( 8.7  , 11.2 )\n[19:28](大妈) 遗产之地 ( 16.0  , 12.8 )\n[19:28](大妈) 奥阔帕恰山 (15.8, 30.6)"></textarea></li>'
        , '<li id="shibie"style="background-color: #444;" onclick="digtxtcheck()"><p>识别</p></li>'
    );
    $('#dig_text #shuru-l li').children('textarea').on('input propertychange', function () {
        txtchange2();
    });
    for (var i = 1; i < 9; i++) {
        $('#dig_text #shuru-r').append(
            '<li><div><p>' + i + '</p></div><input onkeyup="value=value.replace(/[\,\']/,\'\')" onpaste="value=value.replace(/[\,\']/,\'\')" oncontextmenu = "value=value.replace(/[\,\']/,\'\')" type="text" placeholder="光之战士' + i + '" value="" maxlength="6"><a class="zuobiao" onclick="digzuobiao(this)"><p>坐标</p></a><a onclick="digclear(' + i + ')"><img src="image/newdig/lajitong.png"></a></li>'
        );
    }
    $('#dig_text #shuru-r li').children('input').on('input propertychange', function () {
        $(this).addClass("tar");
        txtchange();
    });
    $('#dig_text #guihua').append(
        '<li id="digitemnum"></li>'
        , '<li id="digitem"></li>'
        , '<li><textarea style="height:200px;"></textarea><div id="fuzhi" onclick="digfuzhi()"><img src="image/newdig/fuzhi.png"></div></li>'
    );
    for (var i = 1; i < 9; i++) {
        $('#digitem').append(
            '<li class="digitem" onclick="digitemchange(' + i + ')"><p>空</p></li>'
        );
        // $('#digitemnum').append(
        //     '<li>' + i + '</li>'
        // );
    }
    $('#digitem').append(
        '<li class="guihuamark"><p>路线规划</p></li>'
    );
}
function guihuaitem() {
    for (var i = 0; i < 8; i++) {
        $("#digitem .digitem").eq(i - 1).removeClass("on");
        $("#digitem .digitem").eq(i - 1).children('p').text("空");
    }
    var order = digorder();
    if (order.length > 0) {
        for (var i = 0; i < order.length; i++) {
            $("#digitem .digitem").eq(i).addClass("on");
            $("#digitem .digitem").eq(i).children('p').text(order[i][0]);
        }
    }
}
function digzuobiao(obj) {
    var infolist = [];
    $(obj).addClass("tar")
    $("#bigger").empty();
    $("#bigger").css("background-image", "url(' ')");
    $("#overlay").off("click"); // 移除点击事件
    var pg = $('#pagenum a.on').text();
    $.ajax({
        url: './csv/' + pg + '.csv?' + window._ver,
        success: function (data) {
            infolist[1] = "";
            infolist[2] = "";
            infolist[3] = "";
            infolist[4] = "";
            infolist[5] = "";
            infolist[6] = "";
            for (i = 1; i < 7; i++) {
                infolist[1] += '<li><a class="btn" onclick="digzuobiaoexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 6) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
            }
            for (i = 1; i < 5; i++) {
                infolist[2] += '<li><a class="btn" onclick="digzuobiaoexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 8) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
            }
            for (i = 1; i < 7; i++) {
                infolist[3] += '<li><a class="btn" onclick="digzuobiaoexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 12) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
            }
            for (i = 1; i < 5; i++) {
                infolist[4] += '<li><a class="btn" onclick="digzuobiaoexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 18) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
            }
            for (i = 5; i < 6; i++) {
                infolist[4] += '<li><a class="btn" onclick="digzuobiaoexplain(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 19) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
            }
            infolist[5] += '<li><a class="btn" onclick="digzuobiaoexplain(this,1)" target="_blank"><img src="image/dig/23.png"><div style="background-image: url(""); class="bd"></div></a></li>';
            for (i = 1; i < 6; i++) {
                infolist[6] += '<li><a class="btn" onclick="digzuobiaoexplain2(this,' + i + ')" target="_blank"><img src="image/dig/' + (i + 24) + '.png"><div style="background-image: url(""); class="bd"></div></a></li>';
            }
            if (pg == "迦迦纳革") { pg = "1"; }
            else if (pg == "瞪羚革") { pg = "1"; }
            else if (pg == "深层绿图") { pg = "2"; }
            else if (pg == "缠尾蛟革") { pg = "3"; }
            else if (pg == "绿飘龙革") { pg = "3"; }
            else if (pg == "高鼻羚羊革") { pg = "4"; }
            else if (pg == "金毗罗鳄革") { pg = "4"; }
            else if (pg == "蛇牛革") { pg = "5"; }
            else if (pg == "奥阔银狼革") { pg = "6"; }
            else if (pg == "狞豹革") { pg = "6"; }
            $("#bigger").append(
                '<ul id="aether" style="width:708px;"></ul>'
                , '<ul id="down" style="width:708px;"></ul>'
                , '<ul id="close" onclick="diginfoclose()" style="width:60px;height:30px;">关闭</ul>'
            );
            $("#bigger #aether").append(infolist[pg]);
            $("#overlay").fadeIn();
            var t = window.innerWidth
                , e = window.innerHeight - 70
                , s = 708
                , n = 784
                , o = t > s ? (t - s) / 2 : 0
                , i = e > n ? (e - n) / 2 + 70 : 70;
            $("#bigger").css({
                left: o + "px"
            }),
                $("#bigger").css({
                    top: i + "px"
                });
            $('#bigger #aether a.btn:first').click();
            $('#bigger #aether a.btn:first').find('.bd').addClass('Selected');
        }
    });
}
function digzuobiaoexplain(obj, i) {
    var csvList;
    var pgn = $('#pagenum a.on').text();
    var insert = '';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#bigger #down").empty();
    $.ajax({
        url: './csv/newdig/' + pgn + '.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            $("#bigger #down").append('<img style="float:left;width:420px;"src="image/newdig/' + csvList[i * 8 - 7][1] + '100.jpeg" onerror=this.style="display:none;">');
            for (var n = 1; n <= 8; n++) {
                insert += '<div style="float:left;width:144px;height:110px;text-align:center;"><img onclick="diginfo(\'' + csvList[i * 8 - 7 + n][1] + '\',' + n + ')" style="width:110px;"src="image/dig/' + pgn + '/' + csvList[i * 8 - 7 + n][1] + n + '.jpeg" onerror=this.style="display:none;">';
                csvList[i * 8 - 7 + n][1] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: -2px;left: 121px;width: 18px;border-radius: 10px;background-color: #af0000;">' + n + '</p></div>';
            }
            $("#bigger #down").append(insert);
        }
    });
}
function digzuobiaoexplain2(obj, i) {
    var csvList;
    var pgn = $('#pagenum a.on').text();
    var insert = '';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#bigger #down").empty();
    $.ajax({
        url: './csv/newdig/' + pgn + '.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            $("#bigger #down").append('<img style="float:left;width:420px;"src="image/newdig/' + csvList[i * 8 - 7][1] + '100.jpg" onerror=this.style="display:none;">');
            for (var n = 1; n <= 8; n++) {
                insert += '<div style="left:' + numcal1(csvList[i * 8 - 8 + n][3]) + 'px;top:' + numcal2(csvList[i * 8 - 8 + n][4]) + 'px;" class="point" onclick="diginfo(\'' + csvList[i * 8 - 8 + n][1] + '\',' + n + ')">';
                insert += '<p style="">' + n + '</p></div>';
            }
            for (var n = 1; n <= 8; n++) {
                insert += '<div style="float:left;width:144px;height:110px;text-align:center;"><img onclick="diginfo(\'' + csvList[i * 8 - 8 + n][1] + '\',' + n + ')" style="width:110px;"src="image/dig/' + pgn + '/' + csvList[i * 8 - 8 + n][1] + n + '.jpg" onerror=this.style="display:none;">';
                csvList[i * 8 - 8 + n][1] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: -2px;left: 121px;width: 18px;border-radius: 10px;background-color: #af0000;">' + n + '</p></div>';
            }
            $("#bigger #down").append(insert);
        }
    });
}
function diginfo(str, i) {
    var csvList;
    var G = $('#pagenum a.on').text();
    $("#overlay").on("click", function () {
        $("#overlay").fadeOut();
    }); // 重新添加点击事件
    $.ajax({
        url: './csv/newdig/' + G + '.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            var saveArray = [];
            var c = 0;
            var tar = 0;
            for (var n = 0; n < 8; n++) {
                if ($('#shuru-r li').eq(n).children('a.zuobiao').hasClass("tar")) {
                    tar = n;
                }
                else {
                    saveArray[n] = "";
                }
            };
            var txt = $('#shuru-r li').eq(tar).children('input').val();
            var txt2 = "";
            if (txt == "") { txt = "光之战士" + (tar + 1); }
            for (var n = 1; n < csvList.length; n++) {
                if (csvList[n][1] == str && csvList[n][2] == i) {
                    saveArray[tar] = txt + "," + csvList[n][1] + "," + csvList[n][2] + "," + csvList[n][3] + "," + csvList[n][4];
                    txt2 = "(" + csvList[n][3].slice(0, -1) + "." + csvList[n][3].slice(-1) + ", " + csvList[n][4].slice(0, -1) + "." + csvList[n][4].slice(-1) + ")"
                }
                else if (csvList[n][1] == str && csvList[n][0] == 1) {
                    saveArray[c + 8] = "," + csvList[n][1] + "," + csvList[n][2] + "," + csvList[n][3] + "," + csvList[n][4];
                    c++;
                }
            }
            $("a.zuobiao.tar p").text(mapnamechange(str) + txt2);
            $("a.zuobiao.tar").removeClass("tar");
            digsaveData(saveArray);
            var order = digorder();
            digcanvas2(order);
            digloadtxt();
            digloadtxt2();
            guihuaitem();
        }
    });
}
function diginfoclose() {
    $("#overlay").on("click", function () {
        $("#overlay").fadeOut();
    }); // 重新添加点击事件
}
function digclear(i) {
    $('#shuru-r li').eq(i - 1).empty();
    $('#shuru-r li').eq(i - 1).append(
        '<div><p>' + i + '</p></div><input onkeyup="value=value.replace(/[\,\']/,\'\')" onpaste="value=value.replace(/[\,\']/,\'\')" oncontextmenu = "value=value.replace(/[\,\']/,\'\')" type="text" placeholder="光之战士' + i + '" value="" maxlength="12"><a class="zuobiao" onclick="digzuobiao(this)"><p>坐标</p></a><a onclick="digclear(' + i + ')"><img src="image/newdig/lajitong.png"></a>'
    );
    $('#shuru-r li').eq(i - 1).children('input').on('input propertychange', function () {
        $(this).addClass("tar");
        txtchange();
    });
    digclearData(i);
    var order = digorder();
    digcanvas2(order);
    digloadtxt();
    digloadtxt2();
    guihuaitem();
}
function digitemchange(i) {
    if ($("#digitem .digitem").eq(i - 1).children('p').text() != "空") {
        if ($("#digitem .digitem").eq(i - 1).hasClass("on")) {
            $("#digitem .digitem").eq(i - 1).removeClass("on");
        }
        else { $("#digitem .digitem").eq(i - 1).addClass("on"); }
        var order = digorder();
        var num = 0;
        var order2 = [];
        for (var n = 0; n < 8; n++) {
            if ($("#digitem .digitem").eq(n).hasClass("on")) {
                order2[num] = order[n]; num++;
            }
        }
        digcanvas2(order2);
    }

}
function digitemclear(i) {
    digclearData(i);
    var order = digorder();
    digcanvas2(order);
    $("#digitem .digitem").eq(i - 1).removeClass("on");
    $("#digitem .digitem").eq(i - 1).text("");
}
function digorder() {
    var info = window.localStorage.getItem('digsaveData');
    var saveArray = JSON.parse(info);
    var info2 = window.localStorage.getItem('digmaplist');
    var str = [];
    var G = $('#pagenum a.on').text();
    var map = [];
    var maplist = JSON.parse(info2);
    var order = [];
    var mapb = "";
    for (var i = 0; i < saveArray.length; i++) {
        str[i] = saveArray[i].split(",");
    }
    for (var i = 0; i < 8; i++) {
        if (saveArray[i] != "") {
            map[i] = str[i][1];
        }
        else {
            map[i] = "";
        };
    };
    for (var i = 1; i < maplist.length; i++) {
        if (itemsame(map, maplist[i]) && mapb == "") {
            mapb = maplist[i];
        }
    }
    if (mapb == "") {
        mapb = maplist[1];
    }
    order = routing(str, maplist);
    return order;
}
function digcanvas2(arr) {
    var G = $('#pagenum a.on').text();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var order = [];
    order = arr;
    var img = new Image();
    if (arr.length > 0) { img.src = 'image/newdig/' + order[0][1] + '100.jpg'; }
    else {
        var info2 = window.localStorage.getItem('digmaplist');
        var maplist = JSON.parse(info2);
        img.src = 'image/newdig/' + maplist[1] + '100.jpg';
    }
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制大图片
        if (order.length > 0) {
            order = findmd4(order);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(numcal(order[0][3]), numcal(order[0][4]));
            for (var i = 1; i < order.length; i++) {
                if (order[i][1] == order[0][1]) {
                    ctx.lineTo(numcal(order[i][3]), numcal(order[i][4]));
                }
            }
            ctx.stroke();
        }
        for (var i = 0; i < order.length; i++) {
            if (order[i][1] == order[0][1]) {
                const radius = 8; // 圆的半径
                ctx.beginPath();
                ctx.arc(numcal(order[i][3]), numcal(order[i][4]), radius, 0, Math.PI * 2);
                ctx.fillStyle = '#af0000'; // 设置颜色
                ctx.fill(); // 填充颜色
                var txt = i + 1;
                ctx.font = '15px "Trebuchet MS", arial'; // 设置字体和大小
                ctx.fillStyle = '#fff'; // 设置文字颜色
                ctx.fillText(txt, numcal(order[i][3]) - 4, numcal(order[i][4]) + 5); // 在指定位置绘制文字
            }
        }
    }
    if ($("#shuoming").hasClass("on")) {
        $("#shuoming").removeClass("on");
        $("#shuoming").addClass("off");        
    }
}
function digcanvasshuoming() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = 'image/newdig/shuoming.png';
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制大图片
    }
    if ($("#shuoming").hasClass("off")) {
        $("#shuoming").removeClass("off");
        $("#shuoming").addClass("on");        
    }
}
function shuomingswitch() {
    if ($("#shuoming").hasClass("off")) {        
        digcanvasshuoming();
    }
    else if ($("#shuoming").hasClass("on")) {       
        var order = digorder();
        digcanvas2(order);
    }
}
function digfuzhi() {
    var text = $('#guihua li textarea').val();
    navigator.clipboard.writeText(text).then(function () {
        console.log('Text copied to clipboard: ' + text);
        alert("复制成功");
    }, function (err) {
        console.error('Error copying text to clipboard: ', err);
        alert("复制失败");
    });
}