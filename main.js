var keys = {
    '0':['q','w','e','r','t','y','u','i','o','p'], //'0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
    '1':['a','s','d','f','g','h','j','k','l'],
    '2':['z','x','c','v','b','n','m'],
    length: 3
}
var hash = {
    'q': 'qq.com',
    'w': 'weibo.com', 
    'e': 'ele.me', 
    'r': 'rapdb.dna.affrc.go.jp',
    't': 'tencent.com', 
    'y': 'youtube.com', 
    'u': 'ui.cn', 
    'i': 'iqiyi.com', 
    'o': 'opera.com', 
    'p': 'peise.net',
    'a': 'amazon.cn', 
    's': 'sohu.com', 
    'd': 'douban.com', 
    'f': 'facebook.com', 
    'g': 'gome.com.cn',
    'h': 'hongshu.com', 
    'j': 'javascript.ruanyifeng.com',
    'k': 'kuwo.cn', 
    'l': 'lol.qq.com', 
    'z': 'zhihu.com', 
    's': 'suning.com', 
    'x': 'xiami.com',
    'c': 'cnr.cn', 
    'v': 'vivo.com.cn', 
    'b': 'bilibili.com',
    'n': 'newcger.com', 
    'm': 'mi.com', 
}
//取出 localStorage 中的 newHash 对应的 hash
var hashInLocalStorage = JSON.parse(localStorage.getItem('newHash') || 'null')
if(hashInLocalStorage){
    hash = hashInLocalStorage
}

var index = 0
while(index<keys.length){
    var div = document.createElement('div')
    div.className = 'row'

    main.appendChild(div)

    var row = keys[index]
    var index2 = 0
    while(index2<row.length){
        var span = document.createElement('span')
        span.textContent = row[index2]
        span.className = 'text'

        var button = document.createElement('button')
        button.textContent = '编辑'
        button.id = row[index2]
        button.className = 'button'
        button.onclick = function(butonPressed){
            var button2 = butonPressed.target
            var img2 = button2.previousSibling
            var key = button2.id
            var userType = prompt('请输入新网址')
            //hash 变更
            hash[key] = userType 
            img2.src = 'http://' + userType + '/favicon.ico'
            img2.onerror = function(e){
                e.target.src = '//i.loli.net/2018/02/24/5a9176127f204.png'
            }
            //只要 hash 变了，就将新 hash 存到 newHash 里
            localStorage.setItem('newHash', JSON.stringify(hash))
        }

        var img = document.createElement('img')
        if(hash[row[index2]]){
            img.src = 'http://' + hash[row[index2]] + '/favicon.ico'
        }else{
            img.src = '//i.loli.net/2018/02/24/5a9176127f204.png'//自己设置默认icon
        }
        img.onerror = function(e){
            e.target.src = '//i.loli.net/2018/02/24/5a9176127f204.png'//自己设置默认icon
        }
        
        var kbd = document.createElement('kbd')
        kbd.className = 'key'
        kbd.appendChild(button)
        kbd.appendChild(span)
        kbd.appendChild(img)
        div.appendChild(kbd)
        index2 += 1
    }
    index += 1
}

document.onkeypress = function(keyPressed){
    var key = keyPressed['key'] 
    var website = hash[key] 
    window.open('http://' + website, '_blank')
}