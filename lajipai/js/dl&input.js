function localStorageDownload()
{
    function exportRaw(name, data) 
    {
        var urlObject = window.URL || window.webkitURL || window;
        var export_blob = new Blob([data]);
        var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(ev);
        window.URL.revokeObjectURL(save_link.href);
    }
    var saveArray = JSON.parse(window.localStorage.getItem('p&msaveData'));
    exportRaw('Pet&MountData.txt',saveArray);
    //alert("1");
}
function localStorageInput()
{
    let file = event.target.files[0];
    if (file != undefined && file.name == "Pet&MountData.txt")
    {
        let file_reader = new FileReader();
        file_reader.onload = () => {
            let fc = file_reader.result;
            console.log(fc); // 打印文件文本内容
            window.localStorage.setItem('p&msaveData', '['+fc+']');
            pets();
            alert("导入完成");
        };
    file_reader.readAsText(file, 'UTF-8');
    }
    else{alert("请确认文件");}
}