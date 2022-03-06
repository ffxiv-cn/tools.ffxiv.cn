function checklist() {    
    //��ȡ
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
        , '<ul id="page_explain3"></ul>'
        , '<ul id="page_explain"><li class="checklist_title" style="padding-top: 0px;padding-left: 0px;" align="center"></li></ul>'
        , '<ul id="page_explain2"></ul>'
        , '<ul id="page_item"></ul>'
        );        
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li style="width: 150px;"><a><img src="image/成就称号.png"><div></div></a><p>准备列表</p></li>'
    );
        $.ajax({
            url: './txt/checklisttop.txt?ver=' + window._ver,
            dataType: 'text',
            success: function (data) {
                $('#page_explain3').append(data);
            }
        });
        $('#page_explain2').append('<li><strong><span style="color:#DD7907;">※请注意可能会存在剧透的情况，介意慎用</span></strong></li>');
        checklistload("checklist4.5");
        Windowsopen("page");
    });
}
function checklistload(patch) {
    var infolist = [];
    var csvList;
    $("#page_explain li").empty();    
    $("#page_item").empty();
    $.ajax({
        url: './txt/' + patch + '.txt?ver=' + window._ver,
        dataType: 'text',
        success: function (data) {
            $('#page_explain li').append(data);            
        }
    });
    $.ajax({
        url: './csv/' + patch + '.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            infolist[0] = "";            
            for (var i = 2; i < csvList.length; i++) {
                infolist[0] += '<div class="checklist_item" style="background-image:url(./image/checklist/' + csvList[i][6] + '.png);">'
                    + '<li class="checklist_item_type"><b>' + csvList[i][0] + '</b></li>'
                    + '<li class="checklist_item_requirement"><b>' + csvList[i][1] + '</b><p style="color: red;">' + csvList[i][5] + '</p><p>' + csvList[i][2] + '</p><p>' + csvList[i][3] + '</p><p>' + csvList[i][4] + '</p></li></div>';
            }
            var target = '#page_item';
            $(target).append(infolist[0]);
        }
    });    
}