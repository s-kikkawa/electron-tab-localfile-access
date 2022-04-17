const fs = require('fs');
const path = require('path');

// ローカルファイルを読んでアラートを表示させる。
// 処理は非同期なためグローバル変数に入れても他のjsファイルから読めない可能性があるので注意。
// また、本ファイルはmain.jsから呼ばれる（requireを使うため。）
window.addEventListener('DOMContentLoaded', function (){
    fs.readFile(path.join(__dirname, 'local_file.txt'), (error, data) => {
        if (error != null) {
            alert("file open error.");
            return;
        }
        alert(data.toString());
    })
});
