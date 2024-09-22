function yiwen() {
    //读取
    var infolist = [];
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
            , '<ul id="page_check" style="height:100px;"><div id="pagenum" class="pagenum" style="width: 900px;display: flex;"></div></ul>'
            , '<ul id="page_explain" style="width: 900px;"></ul>'
            , '<ul id="page_item" style="display: flex;overflow: hidden;"></ul>'
        );
        $('#page_item').css("height", document.documentElement.clientHeight - 400);
        $('#page_itemtop').append(
            '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
            , '<li style="width: 160px;"><a><img src="image/000091.tex.png"><div></div></a><p>异闻路线</p></li>'
        );
        $.ajax({
            url: './csv/yiwen1.csv?' + window._ver,
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
            insert += '<a style="float:left;width:188px;height: 60px;background-image: url(image/yiwen/1.png);margin-right: 20px;margin-left: 20px;" class="off" onclick="yiweninfo(this,1)"><div class="bd"></div></a>';
            insert += '<a style="float:left;width:188px;height: 60px;background-image: url(image/yiwen/2.png);margin-right: 20px;margin-left: 20px;" class="off" onclick="yiweninfo(this,2)"><div class="bd"></div></a>';
            insert += '<a style="float:left;width:188px;height: 60px;background-image: url(image/yiwen/3.png);margin-right: 20px;margin-left: 20px;" class="off" onclick="yiweninfo(this,3)"><div class="bd"></div></a>';
            insert += '<a style="float:left;width:188px;height: 60px;background-image: url(image/yiwen/4.png);margin-right: 20px;margin-left: 20px;" class="off" onclick="yiweninfo(this,4)"><div class="bd"></div></a>';
            $("#pagenum").append(insert);
            $("#pagenum a:first").click();
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return parseFloat(diva.innerHTML);
        },
        setClickPageNum: function () {
            // var divx = document.getElementById('pagenum');
            // var a = divx.children;
            // var len = a.length;
            // for (var i = 0; i < len; i++) {
            //     a[i].onclick = function () {
            //         for (var i = 0; i < len; i++) { a[i].className = "off"; }
            //         this.className = "on";                    
            //     };
            // }
            Page.allContent(this);
        },
        allContent: function (divb) {
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
        }
    };
}
function yiweninfo(obj, i) {
    $("#pagenum a").removeClass();
    $("#pagenum a").addClass('off');
    $(obj).removeClass();
    $(obj).addClass('on');
    var csvList;
    $.ajax({
        url: './txt/yiwen' + i + '.txt?ver=' + window._ver,
        dataType: 'text',
        success: function (data) {
            $('#page_explain').empty();
            $('#page_explain').append(data);
        }
    });
    $.ajax({
        url: './csv/yiwen' + i + '.csv?' + window._ver,
        success: function (data) {

            csvList = $.csv()(data);
            $('#page_item').empty();
            // $('#page_item').append('<ul class="level1" style=""></ul><ul class="level234" style=""></ul>');
            $('#page_item').append('<ul class="level234" style=""></ul>');
            var insert = "";
            for (var i = 1; i < csvList.length; i++) {
                /* if (csvList[i][0] == 1) {
                    $('#page_item .level1').append("<li><p>" + csvList[i][1] + "</p></li>");
                }
                else */ if (csvList[i][0] == 2) {
                    $('#page_item .level234').append("<li class='level2 mc nosel'><p style=''>" + csvList[i][1] + "</p><b class='marka'></b><div></div></li>");
                }
                else if ((csvList[i][0] == 3 && i == csvList.length - 1) || (csvList[i][0] == 3 && csvList[i + 1][0] != 4)) {
                    insert = "<li class='level3'><b class='mark3b'></b><img onerror=this.style='display:none;'>";
                    insert += "<p>" + csvList[i][1] + "</p></li>";
                    $('#page_item .level234 .level2:last div:first').append(insert);
                }
                else if (csvList[i][0] == 3) {
                    insert = "<li class='level3'><b class='mark3b'></b><img onerror=this.style='display:none;'>";
                    insert += "<p>" + csvList[i][1] + "</p><b class='marka'></b><div></div></li>";
                    $('#page_item .level234 .level2:last div:first').append(insert);
                }
                else if ((csvList[i][0] == 4 && i == csvList.length - 1) || (csvList[i][0] == 4 && csvList[i + 1][0] != 5)) {
                    insert = "<li class='level4'><b class='mark4b'></b><img onerror=this.style='display:none;'>";
                    if (csvList[i][4] != "") { insert += "<span data-ck-item-name='" + csvList[i][4] + "'>" + csvList[i][1] + "</span>"; }
                    else if (csvList[i][5] != "") { insert += "<a href=" + csvList[i][5] + " target='_blank' onfocus='this.blur();'>" + csvList[i][1] + "</a>"; }
                    else { insert += "<p>" + csvList[i][1] + "</p></li>"; }
                    $('#page_item .level234 .level3:last div:first').append(insert);
                }
                else if (csvList[i][0] == 4) {
                    insert = "<li class='level4'><b class='mark4b'></b><img onerror=this.style='display:none;'>";
                    insert += "<p>" + csvList[i][1] + "</p><b class='marka'></b><div></div></li>";
                    $('#page_item .level234 .level3:last div:first').append(insert);
                }
                else if (csvList[i][0] == 5) {
                    insert = "<li class='level5'><b class='mark5b'></b><img onerror=this.style='display:none;'>";
                    if (csvList[i][4] != "") { insert += "<span data-ck-item-name='" + csvList[i][4] + "'>" + csvList[i][1] + "</span>"; }
                    else if (csvList[i][5] != "") { insert += "<a href=" + csvList[i][5] + " target='_blank' onfocus='this.blur();'>" + csvList[i][1] + "</a>"; }
                    else { insert += "<p>" + csvList[i][1] + "</p></li>"; }
                    $('#page_item .level234 .level4:last div:first').append(insert);
                }
                // if (csvList[i][2] != "") {
                //     $('#page_item .level234 img:last').attr("src", "image/check/" + csvList[i][2]);
                // }
                // if (csvList[i][2] == "" && csvList[i][0] != 2 && csvList[i][0] != 1) {
                //     $('#page_item .level234 img:last').attr("src", "image/check/未选中.png");
                //     $('#page_item .level234 img:last').bind('click', function () { checksel(this) });
                //     csvList[i][4] == "" ? $('#page_item .level234 p:last').bind('click', function () { checkselp(this) }) : "";
                //     $('#page_item .level234 img:last').parent().addClass("nosel");
                //     $('#page_item .level234 img:last').parent().addClass("mc");
                // }
                // if (csvList[i][3] != "") {
                //     $('#page_item .level234 p:last').addClass(csvList[i][3]);
                //     $('#page_item .level234 p:last').parent().addClass("zuobiao");
                //     $('#page_item .level234 p:last').bind('click', function () { bigmap(this.className) });
                // }
            }
            var w = $('#page_item .level234').width();
            $('#page_item .level234').css("padding", "0px "+(993-w)/2+ "px");
            $('#page_item .level234').css("padding-top", "40px");
        }
    });
}