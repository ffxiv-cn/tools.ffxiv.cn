$(function () {

    // 自動JSON化を有効に
    $.cookie.json = true;

    //保存クッキーの展開
//    if ($.cookie("saveData")) {
//        var saveArray = $.cookie("saveData");
//        var countData = saveArray.length;
//        for (var i = 0; i < countData; i++) {
//            if (saveArray[i] == '1') {
//                $('#music').find('li').find('a').eq(i).addClass('completed');
//            };
//        };
//        var compCount = $('#music').find('a.completed').length;
//        $('#count_comp').text(compCount);
//    }    
//    function saveData() {
//        var countcheck = $('#music').find('li').find('a').length;
//        var saveArray = [];       
//        for (var i = 0; i < countcheck; i++) {
//            //            var id = ('000' + (i + 1)).slice(-3);
//            if ($('#music').find('li').find('a')[i].hasClass('completed')) {
//                saveArray.push(1);
//            } else {
//                saveArray.push(0);
//            };
//        };
//        $.cookie("saveData", saveArray, { expires: 365, path: "/" });
//    }

//    $('#music').find('li').find('a').click(function () {

//        if ($(this).hasClass('completed')) {
//            $(this).removeClass('completed');
//        } else {
//            $(this).addClass('completed');
//        }

//        var compCount = $('#music').find('a.completed').length;
//        $('#count_comp').text(compCount);

//        saveData()
//    })    

//    $('.uncomp_show_btn').click(function () {

//        if ($(this).hasClass('current')) {
//            $(this).removeClass('current');
//            $('#music').find('li').find('a').show();

//        } else {
//            $(this).addClass('current');

//            var countcheck = $('#music').find('li').find('a').length;
//            for (var i = 0; i < countcheck; i++) {
//                if ($('#music').find('li').find('a').eq(i).hasClass('completed')) {
//                    $('#music').find('li').find('a').eq(i).hide();
//                }
//            }

//        }

//    })

});
//function saveData() {
//    var countcheck = $('#music').find('li').find('a').length;
//    var saveArray = [];
//    for (var i = 0; i < countcheck; i++) {
//        //            var id = ('000' + (i + 1)).slice(-3);
//        if ($('#music').find('li').find('a').eq(i).hasClass('completed')) {
//            saveArray.push(1);
//        } else {
//            saveArray.push(0);
//        };
//    };
//    $.cookie("saveData", saveArray, { expires: 365, path: "/" });
//}