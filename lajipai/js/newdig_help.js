function txtchange() {
    for (var n = 0; n < 8; n++) {
        if ($('#dig_text li').eq(n).children('input').hasClass("tar")) {
            if ($('#dig_text li').eq(n).children('a.zuobiao').children('p').text() != "坐标") {
                var txt = $('#dig_text li').eq(n).children('input').val().replace(/[\,\']/, '');
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
function txtchange2() {
    var txt = $('#dig_text li').children('textarea').val();
    window.localStorage.setItem('digshibietxt', JSON.stringify(txt));
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
function digloadmaplist(G) {
    var csvList;
    var maplist = [];
    $.ajax({
        url: './csv/' + G + '.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            for (var i = 1; i < csvList.length; i++) {
                maplist[i] = csvList[i][0];
            }
            window.localStorage.setItem('digmaplist', JSON.stringify(maplist));
        }
    });
}
function digloadcsdlist() {
    var csvList;
    $.ajax({
        url: './csv/newdig/传送点位.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            window.localStorage.setItem('digcsdlist', JSON.stringify(csvList));
        }
    });
}
function digsavetxt(arr) {
    var str1 = "/p "
    var str2 = ""
    for (var i = 0; i < arr.length; i++) {
        str1 += + (i + 1) + "." + arr[i][0] + "→";
        str2 += "/p " + (i + 1) + "." + arr[i][0] + " " + mapnamechange(arr[i][1]) + " (" + arr[i][3].slice(0, -1) + "." + arr[i][3].slice(-1) + ", " + arr[i][4].slice(0, -1) + "." + arr[i][4].slice(-1) + ")\n"
    };
    str1 = str1.slice(0, -1) + "\n";
    window.localStorage.setItem('digsavetxt', JSON.stringify(str1 + str2));
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
            var txt = "(" + str[3].slice(0, -1) + "." + str[3].slice(-1) + ", " + str[4].slice(0, -1) + "." + str[4].slice(-1) + ")";
            $('#dig_text li').eq(i).children('a.zuobiao').children('p').text(mapnamechange(str[1]) + txt);
        };
    };
}
function digloadtxt() {
    //读取已存记录
    var info = window.localStorage.getItem('digsavetxt');
    var saveArray = JSON.parse(info);
    $('#dig_text li textarea').val(saveArray);
}
function digloadtxt2() {
    //读取已存记录
    var info = window.localStorage.getItem('digshibietxt');
    var saveArray = JSON.parse(info);
    $('#dig_text li textarea').val(saveArray);
}
function digtxtcheck() {
    var txt = $("#dig_text li textarea").val();
    var list = [];
    var list0 = [];
    var list1 = [];
    var list2 = [];
    var info = window.localStorage.getItem('digmaplist');
    var maplist = JSON.parse(info);
    list = txt.split('\n');
    for (var i = 0; i < list.length; i++) {
        list0[i] = list[i].split(/[( ),]/).filter(Boolean);
        var str = ""
        for (var n = 0; n < list0[i].length; n++) {
            if (list0[i][n].slice(0, 1) == "[" && list0[i][n].slice(-1) == "]") { }
            else { str += "," + list0[i][n]; }
        }
        list1[i] = str.split(',').filter(Boolean);
        list1[i][1] = mapnamechange(list1[i][1]);
        var str2 = list1[i][2].split('.');
        list1[i][2] = str2[0] + str2[1];
        str2 = list1[i][3].split('.');
        list1[i][3] = str2[0] + str2[1];
    }
    var csvList;
    var G = $('#pagenum a.on').text();
    $.ajax({
        url: './csv/newdig/' + G + '.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            for (var i = 0; i < list1.length; i++) {
                if (itemsame(maplist, list1[i][1])) {
                    list2[i] = "";
                    for (var n = 0; n < csvList.length; n++) {
                        if (csvList[n][1] == list1[i][1] && Math.abs(csvList[n][3] - list1[i][2]) < 11 && Math.abs(csvList[n][4] - list1[i][3]) < 11) {
                            list2[i] = list1[i][0] + "," + csvList[n][1] + "," + csvList[n][2] + "," + csvList[n][3] + "," + csvList[n][4];
                        }
                    }
                }
                else { list2[i] = ""; }
            }
            if (list2.length < 8) {
                for (var i = list2.length; i < 8; i++) {
                    list2[i] = "";
                }
            }
            // //读取已存记录
            // var info = window.localStorage.getItem('digsaveData');
            // var saveArray = JSON.parse(info);
            // for (var i = 0; i < arr.length; i++) {
            //     if (arr[i] != "") {
            //         saveArray[i] = arr[i];
            //     }
            // };
            window.localStorage.setItem('digsaveData', JSON.stringify(list2));
            var order = digorder();
            digcanvas2(order);
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
function findmd3(arr) {
    var min = 250000;
    var result = -1;
    var num = -1;
    var csd = [];
    var arr2 = [];
    var n = 0;
    //读取已存记录
    var info = window.localStorage.getItem('digcsdlist');
    var saveArray = JSON.parse(info);
    for (var i = 0; i < saveArray.length; i++) {
        if (saveArray[i][1] == arr[0][1]) {
            csd[n] = saveArray[i]; n++;
        }
    }
    for (var i = 0; i < csd.length; i++) {
        var d1 = distance(arr[0][3], arr[0][4], csd[i][3], csd[i][4])
        if (d1 < min) { min = d1; num = i; result = 0; }
        var d2 = distance(arr[arr.length - 1][3], arr[arr.length - 1][4], csd[i][3], csd[i][4])
        if (d2 < min) { min = d2; num = i; result = 1; }
    }
    if (result == 0) {
        arr2 = arr;
    }
    else if (result == 1) {
        for (var i = 0; i < arr.length; i++) {
            arr2[i] = arr[arr.length - i - 1];
        }
    }
    return arr2;
}
function findmd4(arr) {
    var min = 250000;
    var num = -1;
    var csd = [];
    var arr2 = [];
    var n = 0;
    //读取已存记录
    var info = window.localStorage.getItem('digcsdlist');
    var saveArray = JSON.parse(info);
    for (var i = 0; i < saveArray.length; i++) {
        if (saveArray[i][1] == arr[0][1]) {
            csd[n] = saveArray[i]; n++;
        }
    }
    for (var i = 0; i < csd.length; i++) {
        var d1 = distance(arr[0][3], arr[0][4], csd[i][3], csd[i][4])
        if (d1 < min) { min = d1; num = i; }
    }
    for (var i = arr.length; i > 0; i--) {
        arr2[i] = arr[i - 1];
    }
    arr2[0] = csd[num];
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
    var n = 0;
    for (var i = 0; i < map1.length; i++) {
        order[n] = map1[i];
        n++;
    }
    for (var i = 0; i < map2.length; i++) {
        order[n] = map2[i];
        n++;
    }
    for (var i = 0; i < map3.length; i++) {
        order[n] = map3[i];
        n++;
    }
    for (var i = 0; i < map4.length; i++) {
        order[n] = map4[i];
        n++;
    }
    for (var i = 0; i < map5.length; i++) {
        order[n] = map5[i];
        n++;
    }
    digsavetxt(order);
    return order;
}
function posorder(arr) {
    var arry = [];
    var order = [];
    var sarr = [];
    var sarr2 = [];
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
    sarr2 = findmd3(sarr);
    return sarr2;

}
function mapnamechange(str) {
    switch (str) {
        case "aokuo":
            str = "奥阔帕恰山";
            break;
        case "shidi":
            str = "克扎玛乌卡湿地";
            break;
        case "shuhai":
            str = "亚克特尔树海";
            break;
        case "huangye":
            str = "夏劳尼荒野";
            break;
        case "yichan":
            str = "遗产之地";
            break;
        case "奥阔帕恰山":
            str = "aokuo";
            break;
        case "克扎玛乌卡湿地":
            str = "shidi";
            break;
        case "亚克特尔树海":
            str = "shuhai";
            break;
        case "夏劳尼荒野":
            str = "huangye";
            break;
        case "遗产之地":
            str = "yichan";
            break;
        default:
            break;
    }
    return str;
}