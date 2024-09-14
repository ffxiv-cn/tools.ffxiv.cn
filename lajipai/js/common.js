$(function () {
    $("#overlay").click(function () {
        $("#overlay").fadeOut();
    });
    // html生成
    $('#top').append(
        '<a class="top_left" href="./index.html" onfocus="this.blur();">素素辣鸡排</a>&nbsp;&nbsp;&nbsp;&nbsp;'
        , '<a class="top_right" href="https://5p.nbbjack.com" target="_blank" onfocus="this.blur();">配方计算器</a>'
        , '<a class="top_right" href="https://caiji.ffxiv.cn/" target="_blank" onfocus="this.blur();">采集时钟</a>'
        , '<a class="top_right" href="https://www.ffxiv.cn" target="_blank" onfocus="this.blur();">攻略站</a>'
    );
    $('#buttom').append(
        '本网页上的会社名・道具名・系统名等均为各公司的注册商标。<br>'
        , 'Copyright 2016-2024 FFXIV.CN&FFSUSU.COM & 黄芪 & 垫小引 All rights reserved.<br>'
        , 'FINAL FANTASY XIV 2010 - 2024 SQUARE ENIX CO., LTD. All Rights Reserved.<br>'
    );
});

function load() {
    $('#item').append(
        //<li style="margin-right: 500px;"><a onclick="check()"><img src="image/更新速览.png"><div><p class="buff" style="color: white;">New!!</p></div></a><p>更新速览</p></li>'
        '<li style="margin-right: 500px;"><a onclick="check()"><img style="filter: grayscale(100%)" src="image/000033.tex.png"><div><p class="buff" style="color: white;">New!!</p></div></a><p>有待开发</p></li>'
        , '<li><a onclick="aether()"><img style="animation-delay:0.6s;" src="image/风脉.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>风脉</p></li>'
        , '<li style="margin-right: 400px;"><a onclick="explore()"><img style="animation-delay:0.7s;" src="image/探索笔记.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>探索笔记</p></li>'
        , '<li><a onclick="pets()"><img style="animation-delay:0.7s;" src="image/宠物.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>宠物一览</p></li>'
        , '<li><a onclick="mounts()"><img style="animation-delay:0.8s;" src="image/坐骑.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>坐骑一览</p></li>'
        , '<li style="margin-right: 300px;"><a onclick="emote()"><img style="animation-delay:0.9s;" src="image/表情一览.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>情感动作</p></li>'
        , '<li><a onclick="music()"><img style="animation-delay:0.8s;" src="image/乐谱.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>乐谱</p></li>'
        , '<li ><a onclick="fashion()"><img style="animation-delay:0.9s;" src="image/时尚配件.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>时尚配件</p></li>'
        , '<li><a onclick="dig()"><img style="animation-delay:1.0s;" src="image/藏宝图.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>藏宝图</p></li>'
        //        , '<li style="margin-right: 200px;"><a onclick="newdig()"><img style="animation-delay:1.1s;" src="image/Routing.png"><div><p class="buff" style="color: white;">New!!</p></div></a><p>宝图路线规划</p></li>'
        , '<li style="margin-right: 200px;"><a onclick="newdig()"><img style="animation-delay:1.1s;filter: grayscale(100%)" src="image/000033.tex.png"><div><p class="buff" style="color: white;">New!!</p></div></a><p>有待开发</p></li>'
        , '<li><a onclick="niaojia()"><img style="animation-delay:0.9s;" src="image/鸟甲.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>鸟甲一览</p></li>'
        , '<li><a onclick="fateshop()"><img style="animation-delay:1.0s;" src="image/危命商人.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>危命商人</p></li>'
        , '<li><a onclick="hunt()"><img style="animation-delay:1.1s;" src="image/狩猎.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>狩猎</p></li>'
        , '<li><a onclick="jobtask()"><img style="animation-delay:1.2s;" src="image/职业任务.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>职业任务</p></li>'
        , '<li style="margin-right: 100px;"><a onclick="dungeons()"><img style="animation-delay:1.3s;" src="image/副本开启.png"><div><p class="buff" style="color: orange;">Update</p></div></a><p>副本开启</p></li>'
        //   , '<li><a onclick="bluemagic()"><img style="animation-delay:0.9s;" src="image/青魔.png"><div></div></a><p>青魔法书</p></li>'
        , '<li><a onclick="dye()"><img style="animation-delay:1.0s;" src="image/染料一览.png"><div></div></a><p>染料一览</p></li>'
        //   蛮族兑换、蛮族兑换.png
        , '<li><a><img style="animation-delay:1.1s;filter: grayscale(100%)" src="image/000033.tex.png"><div></div></a><p>有待开发</p></li>'
        //   异闻路线、image/000091.tex.png"
        , '<li><a><img style="animation-delay:1.2s;filter: grayscale(100%)" src="image/000033.tex.png"><div></div></a><p>有待开发</p></li>'
        , '<li><a><img style="animation-delay:1.3s;filter: grayscale(100%)" src="image/000033.tex.png"><div></div></a><p>有待开发</p></li>'
        , '<li><a><img style="animation-delay:1.4s;filter: grayscale(100%)" src="image/000033.tex.png"><div></div></a><p>有待开发</p></li>'
        , '<li style="margin-right: 0px;"><a><img style="animation-delay:1.5s;filter: grayscale(100%)" src="image/000033.tex.png"><div></div></a><p>有待开发</p></li>'
        // , '<li style="width: 600px;height:20px;"><p style="text-align:center">以下广告来自谷歌推荐。<a style="width: auto;height:auto;" href="https://www.ffxiv.cn/detail/article/534" target="_blank">广告屏蔽方法与说明♂(←点击)</a></p></li>'
        // , '<li style="width: auto;height:auto;"><ins class="adsbygoogle"        style="display:block;min-height: 280px;min-width: 600px;"        data-ad-client="ca-pub-7347679321798304"        data-ad-slot="8881145961"        data-ad-format="auto"        data-full-width-responsive="true"></ins></li>'
        // , '<li style="width: 600px;height:40px;"></li>'
    );

    setTimeout(function () {
        try {
            (window['adsbygoogle'] = window['adsbygoogle'] || []).push({})
        } catch (e) {
            console.error(e)
        }
    }, 500)

    $('#notice_title').append(
        '<b>公告</b>'
    );
    $('#update_title').append(
        '<b>更新记录</b><a href="https://www.ffxiv.cn/show/282" target="_black"><p>免责声明</p></a>'
    );
    $.ajax({
        url: './txt/gonggao.txt?ver=' + window._ver,
        dataType: 'text',
        success: function (data) {
            $('#notice').append(data);
        }
    });
    var csvList;
    $.ajax({
        url: './csv/gonggao.csv?' + window._ver,
        success: function (data) {
            csvList = $.csv()(data);
            for (var i = csvList.length - 1; i > 0; i--) {
                $('#update_log').append(
                    '<p>' + csvList[i][0] + '</p><p>' + csvList[i][1] + '</p><br>'
                );
            }
        }
    });
}

function image(obj) {
    $(obj).css('animation', 'fadeInDown 0.5s ease forwards');
}
function Windowsopen(name) {
    $('#' + name).css('animation', 'zoomIn 0.5s ease forwards');
}
function Windowsclose(name) {
    $('#' + name).css('animation', 'disappear 0.5s ease forwards');
    $('#' + name).empty();
}