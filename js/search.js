//搜索框事件
write.onkeypress = function(e){
    e.stopPropagation()
    baidu.onclick = function(){
        window.open('//www.baidu.com/s?wd=' + write.value, '_blank')
    }
    google.onclick = function(){
        window.open('//www.google.com/search?q=' + write.value, '_blank')
    }
}