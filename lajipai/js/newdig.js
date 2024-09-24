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
            , '<ul id="page_item" style="min-height:560px;"><li style="width:450px;" id="page_item_left"></li><li id="page_item_right" style="padding-right: 0px; padding-left: 25px;position: relative;"></li></ul>'
        );
        $('#page_item_left').append(
            '<ul id="dig_check"></ul><ul id="dig_text"></ul>'
        );
        $('#page_item_right').append(
            '<canvas id="canvas" width="500" height="500"></canvas>'
        );
        $('#dig_check').append(
            '<li onclick="digcheck(1)"><p>自动识别</p></li>'
            , '<li onclick="digcheck(2)"><p>手动输入</p></li>'
            , '<li onclick="digcheck(3)"><p>路线规划</p></li>'
        );

        $('#page_itemtop').append(
            '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
            , '<li style="width: 160px;"><a><img src="image/藏宝图.png"><div></div></a><p>路线规划</p></li>'
        );
        $.ajax({
            url: './csv/金毗罗鳄革.csv?' + window._ver,
            success: function () {
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
            var target = '#aether';
            //设置初始被选项
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "迦迦纳革") { pg = "1"; }
            else if (pg == "瞪羚革") { pg = "1"; }
            else if (pg == "深层绿图") { pg = "2"; }
            else if (pg == "缠尾蛟革") { pg = "3"; }
            else if (pg == "绿飘龙革") { pg = "3"; }
            else if (pg == "高鼻羚羊革") { pg = "4"; }
            else if (pg == "金毗罗鳄革") { pg = "4"; }
            else if (pg == "蛇牛革") { pg = "5"; }
            // $("#page_item li").empty();
            // $(target).empty();
            // $(target).append(infolist[pg]);
            // $('a.btn:first').click();
            // $('a.btn:first').find('.bd').addClass('Selected');
            //数据初始化
            var saveArray = [];
            for (var i = 0; i < 8; i++) {
                saveArray[i] = "";
            };
            window.localStorage.setItem('digsaveData', JSON.stringify(saveArray));
            window.localStorage.setItem('digsavetxt', JSON.stringify(""));
            if ($('#dig_check li').eq(1).hasClass('on')) {
                for (var i = 1; i < 9; i++) {
                    digclear(i);
                }
            }
        }
    };
}
function digcheck(i) {
    $('#dig_text').empty();
    if (i == 1) {
        $('#dig_check li').removeClass("on");
        $('#dig_check li').eq(i - 1).addClass("on");
        $('#dig_text').append(
            '<li><p>复制游戏内聊天框中的信息来自动识别</p></li>'
            , '<li><textarea style="height:300px;"></textarea></li>'
            , '<li style="background-color: #555;" onclick="digtxtcheck"><p>识别</p></li>'
        );
    }
    else if (i == 2) {
        $('#dig_check li').removeClass("on");
        $('#dig_check li').eq(i - 1).addClass("on");
        for (var i = 1; i < 9; i++) {
            $('#dig_text').append(
                '<li><input onkeyup="value=value.replace(/[^0-9]/g,\'\')" onpaste="value=value.replace(/[^0-9]/g,\'\')" oncontextmenu = "value=value.replace(/[^0-9]/g,\'\')" type="text" id="txt-member' + i + '" placeholder="光之战士' + i + '" value=""><a class="zuobiao" onclick="digzuobiao(this)">坐标</a><a onclick="digclear(' + i + ')">清除</a></li>'
            );
        }
        $('#dig_text li').children('input').on('input propertychange', function () {
            $(this).addClass("tar");
            txtchange();
        });
        digloadData();
    }
    else if (i == 3) {
        $('#dig_check li').removeClass("on");
        $('#dig_check li').eq(i - 1).addClass("on");
        $('#dig_text').append(
            '<li><textarea style="height:400px;"></textarea></li>'
        );
        digloadtxt();
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
            );
            $("#bigger #aether").append(infolist[pg]);
            $("#overlay").fadeIn();
            var t = window.innerWidth
                , e = window.innerHeight
                , s = 708
                , n = 784
                , o = t > s ? (t - s) / 2 : 0
                , i = e > n ? (e - n) / 2 : 0;
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
        url: './csv/' + pgn + '.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            $("#bigger #down").append('<img style="float:left;width:420px;"src="image/dig/' + pgn + '/' + csvList[i][0] + '.jpeg" onerror=this.style="display:none;">');
            for (var n = 1; n <= csvList[i][1]; n++) {
                insert += '<div style="float:left;width:144px;height:110px;text-align:center;"><img onclick="diginfo(\'' + csvList[i][0] + '\',' + n + ')" style="width:110px;"src="image/dig/' + pgn + '/' + csvList[i][0] + n + '.jpeg" onerror=this.style="display:none;">';
                csvList[i][0] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: 0px;left: 20px;width: 18px;border-radius: 10px;background-color: #66ccff;">' + n + '</p></div>';
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
        url: './csv/' + pgn + '.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            $("#bigger #down").append('<img style="float:left;width:420px;"src="image/dig/' + pgn + '/' + csvList[i][0] + '.jpg" onerror=this.style="display:none;">');
            for (var n = 1; n <= csvList[i][1]; n++) {
                insert += '<div style="float:left;width:144px;height:110px;text-align:center;"><img onclick="diginfo(\'' + csvList[i][0] + '\',' + n + ')" style="width:110px;"src="image/dig/' + pgn + '/' + csvList[i][0] + n + '.jpg" onerror=this.style="display:none;">';
                csvList[i][0] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: 0px;left: 20px;width: 18px;border-radius: 10px;background-color: #66ccff;">' + n + '</p></div>';
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
                if ($('#dig_text li').eq(n).children('a.zuobiao').hasClass("tar")) {
                    tar = n;
                }
                else {
                    saveArray[n] = "";
                }
            };
            var txt = $('#dig_text li').eq(tar).children('input').val();
            if (txt == "") { txt = "光之战士" + (tar + 1); }
            for (var n = 1; n < csvList.length; n++) {
                if (csvList[n][1] == str && csvList[n][2] == i && csvList[n][0] == 0) {
                    saveArray[tar] = txt + "," + csvList[n][1] + "," + csvList[n][2] + "," + csvList[n][3] + "," + csvList[n][4];
                }
                else if (csvList[n][1] == str && csvList[n][0] == 1) {
                    saveArray[c + 8] = "," + csvList[n][1] + "," + csvList[n][2] + "," + csvList[n][3] + "," + csvList[n][4];
                    c++;
                }
            }
            $("a.zuobiao.tar").text(str + i);
            $("a.zuobiao.tar").removeClass("tar");
            digsaveData(saveArray);
            digcanvas();
        }
    });
}
function digclear(i) {
    $('#dig_text li').eq(i - 1).empty();
    $('#dig_text li').eq(i - 1).append(
        '<input type="text" onkeyup="value=value.replace(/[^0-9]/g,\'\')" onpaste="value=value.replace(/[^0-9]/g,\'\')" oncontextmenu = "value=value.replace(/[^0-9]/g,\'\')" id="txt-member' + i + '" placeholder="光之战士' + i + '"><a class="zuobiao" onclick="digzuobiao(this)">坐标</a><a onclick="digclear(' + i + ')">清除</a>'
    );
    $('#dig_text li').eq(i - 1).children('input').on('input propertychange', function () {
        $(this).addClass("tar");
        txtchange();
    });
    digclearData(i);
    digcanvas();
}
function txtchange() {
    for (var n = 0; n < 8; n++) {
        if ($('#dig_text li').eq(n).children('input').hasClass("tar")) {
            if ($('#dig_text li').eq(n).children('a.zuobiao').text() != "坐标") {
                var txt = $('#dig_text li').eq(n).children('input').val();
                var info = window.localStorage.getItem('digsaveData');
                var saveArray = JSON.parse(info);
                var arr = [];
                for (var i = 0; i < saveArray.length; i++) {
                    arr[i] = saveArray[i].split(",");
                }
                saveArray[n] = txt + "," + arr[n][1] + "," + arr[n][2] + "," + arr[n][3] + "," + arr[n][4];
                window.localStorage.setItem('digsaveData', JSON.stringify(saveArray));
            }
            $('#dig_text li').eq(n).children('input').removeClass("tar");
        }
    };
}
//保存记录
function digsaveData(arr) {
    //读取已存记录
    var info = window.localStorage.getItem('digsaveData');
    var saveArray = JSON.parse(info);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            saveArray[i] = arr[i];
        }
    };
    window.localStorage.setItem('digsaveData', JSON.stringify(saveArray));
}
function digsavetxt(arr) {
    
    var str = ""
    for (var i = 0; i < arr.length; i++) {
        str += "/p " + (i + 1) + "." + arr[i][0] + " " + arr[i][1] + " (" + arr[i][3].slice(0, -1) + "." + arr[i][3].slice(-1) + ", " + arr[i][4].slice(0, -1) + "." + arr[i][4].slice(-1) + ")\n"
    };
    window.localStorage.setItem('digsavetxt', JSON.stringify(str));
}
//清除记录
function digclearData(i) {
    //读取已存记录
    var info = window.localStorage.getItem('digsaveData');
    var saveArray = JSON.parse(info);
    saveArray[i - 1] = "";
    window.localStorage.setItem('digsaveData', JSON.stringify(saveArray));
}
//读取记录
function digloadData() {
    //读取已存记录
    var info = window.localStorage.getItem('digsaveData');
    var saveArray = JSON.parse(info);
    var str = [];
    for (var i = 0; i < 8; i++) {
        if (saveArray[i] != "") {
            str = saveArray[i].split(",");
            if (str[0] == "光之战士" + (i + 1)) { $('#dig_text li').eq(i).children('input').val(""); }
            else { $('#dig_text li').eq(i).children('input').val(str[0]); }
            $('#dig_text li').eq(i).children('a.zuobiao').text(str[1] + str[2]);
        };
    };
}
function digloadtxt() {
    //读取已存记录
    var info = window.localStorage.getItem('digsavetxt');
    var saveArray = JSON.parse(info);
    $('#dig_text li textarea').val(saveArray);
}
function digcanvas() {
    var info = window.localStorage.getItem('digsaveData');
    var saveArray = JSON.parse(info);
    var str = [];
    var G = $('#pagenum a.on').text();
    var map = [];
    var maplist = [];    
    var order = [];
    var mapb = "";
    var csvList;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for (var i = 0; i < saveArray.length; i++) {
        str[i] = saveArray[i].split(",");
    }
    $.ajax({
        url: './csv/' + G + '.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            for (var i = 1; i < csvList.length; i++) {
                maplist[i] = csvList[i][0];
            }
            for (var i = 0; i < 8; i++) {
                if (saveArray[i] != "") {
                    map[i] = str[i][1];
                }
                else {
                    map[i] = "";
                };
            };
            for (var i = 1; i < csvList.length; i++) {
                if (itemsame(map, maplist[i]) && mapb == "") {
                    mapb = maplist[i];
                }
            }
            if (mapb == "") {
                mapb = maplist[1];
            }            
            order = routing(str, maplist);
            var img = new Image();
            img.src = 'image/dig/' + G + '/' + mapb + '.jpg';
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制大图片
                if (order.length > 1) {
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(numcal(order[0][3]), numcal(order[0][4]));
                    for (var i = 1; i < order.length; i++) {
                        if(order[i][1]==mapb){
                            ctx.lineTo(numcal(order[i][3]), numcal(order[i][4]));
                        }                        
                    }
                    ctx.stroke();
                }
                for (var i = 0; i < order.length; i++) {
                    if(order[i][1]==mapb){
                    const radius = 8; // 圆的半径
                    ctx.beginPath();                    
                    ctx.arc(numcal(order[i][3]), numcal(order[i][4]), radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#66ccff'; // 设置颜色
                    ctx.fill(); // 填充颜色
                    }
                }
            }
        }
    });
}
function itemsame(arr, str) {
    var result = false;
    $.each(arr, function (index, value) {
        if (arr[index] == str) {
            result = true;
        }
    });
    return result;
}
function numcal(str) {
    var result;
    var num = parseInt(str, 10);
    result = parseInt((num - 10) / 410 * 500);
    return result;
}
function distance(x1, y1, x2, y2) {
    var result = Math.hypot(
        x1 - x2,
        y1 - y2
    );
    return result;
}
function findmd(arr, num) {
    var min = 250000;
    var result = -1;
    for (var i = 0; i < arr.length; i++) {
        if (i != num) {
            var d = distance(parseInt(arr[num][3]), parseInt(arr[num][4]), parseInt(arr[i][3]), parseInt(arr[num][4]));
            if (d < min) { min = d; result = i; }
        }
    }
    return result;
}
function findmd2(arr, num1, num2, arr2) {
    var min = 250000;
    var result = -1;
    var num = -1
    for (var i = 0; i < arr.length; i++) {
        if (!arr2.includes(i)) {
            var d1 = distance(arr[num1][3], arr[num1][4], arr[i][3], arr[i][4])
            if (d1 < min) { min = d1; num = i; result = 0; }
            var d2 = distance(arr[num2][3], arr[num2][4], arr[i][3], arr[i][4])
            if (d2 < min) { min = d2; num = i; result = 1; }
        }
    }
    if (result == 0) {
        for (var i = arr2.length; i > 0; i--) {
            arr2[i] = arr2[i - 1];
        }
        arr2[0] = num;
    }
    else if (result == 1) {
        arr2[arr2.length] = num;
    }
    return arr2;
}
function maxnum(arr) {
    var max = 0;
    var num = -1;
    for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) { max = arr[i]; num = i }
    }
    return num;
}
function routing(arr, maplist) {
    var order = [];
    var map1 = [];
    var map2 = [];
    var map3 = [];
    var map4 = [];
    var map5 = [];
    var n1 = 0;
    var n2 = 0;
    var n3 = 0;
    var n4 = 0;
    var n5 = 0;
    for (var i = 0; i < 8; i++) {

        switch (arr[i][1]) {
            case maplist[1]:
                map1[n1] = arr[i];
                n1++;
                break;
            case maplist[2]:
                map2[n2] = arr[i];
                n2++;
                break;
            case maplist[3]:
                map3[n3] = arr[i];
                n3++;
                break;
            case maplist[4]:
                map4[n4] = arr[i];
                n4++;
                break;
            case maplist[5]:
                map5[n5] = arr[i];
                n5++;
                break;
            default:
                break;
        }
    }
    if (map1.length != 0) {
        map1 = posorder(map1);
    }
    if (map2.length != 0) {
        map2 = posorder(map2);
    }
    if (map3.length != 0) {
        map3 = posorder(map3);
    }
    if (map4.length != 0) {
        map4 = posorder(map4);
    }
    if (map5.length != 0) {
        map5 = posorder(map5);
    }
    var n=0;
    for(var i=0;i<map1.length;i++){
        order[n]=map1[i];
        n++;
    }
    for(var i=0;i<map2.length;i++){
        order[n]=map2[i];
        n++;
    }
    for(var i=0;i<map3.length;i++){
        order[n]=map3[i];
        n++;
    }
    for(var i=0;i<map4.length;i++){
        order[n]=map4[i];
        n++;
    }
    for(var i=0;i<map5.length;i++){
        order[n]=map5[i];
        n++;
    }    
    digsavetxt(order);
    return order;
}
function posorder(arr) {
    var arry = [];
    var order = [];
    var sarr = [];
    if (arr.length == 1) { order[0] = 0; }
    else if (arr.length == 2) { order[0] = 0; order[1] = 1; }
    else if (arr.length > 2) {
        for (var i = 0; i < arr.length; i++) {
            arry[i] = arr[i][4];
        }
        var num0 = maxnum(arry);
        order[0] = num0;
        var num1 = findmd(arr, num0);
        order[1] = num1;
        for (var i = 0; i < arr.length - 2; i++) {
            order = findmd2(arr, num0, num1, order);
            num0 = order[0];
            num1 = order[order.length - 1];
        }
    }
    for (var i = 0; i < order.length; i++) {
        sarr[i] = arr[order[i]];
    }
    return sarr;
}
function digtxtcheck(){

}