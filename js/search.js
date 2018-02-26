//搜索框事件
write.onkeypress = function(e){
    e.stopPropagation()
    baidu.onclick = function(){
        window.open('http://www.baidu.com/s?wd=' + write.value, '_blank')
    }
}