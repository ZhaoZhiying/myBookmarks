//1.初始化数据
var obj = init()
var keys = obj['keys']
var hash = obj['hash'] 

//2.生成键盘
generateKeyboard(keys, hash)

//3.监听用户动作
listenToKeyboard(hash)

//封装函数
function init(){
    var keys = {
        '0':['q','w','e','r','t','y','u','i','o','p'], //'0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
        '1':['a','s','d','f','g','h','j','k','l'],
        '2':['z','x','c','v','b','n','m','<'],
        length: 3
    }
    var hash = {
        'q': 'qq.com',
        'w': 'weibo.com', 
        'e': 'ele.me', 
        'r': 'rapdb.dna.affrc.go.jp',
        't': 'tv.cctv.com', 
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
        '~': 'zhaozhiying.github.io/myWeb/',
    }
    //取出 localStorage 中的 newHash 对应的 hash
    var hashInLocalStorage = getFromLocalStorage('newHash')
    if(hashInLocalStorage){
        hash = hashInLocalStorage
    }
    //hash 套 hash
    return {
        'keys': keys,
        'hash': hash
    }
}

function generateKeyboard(keys, hash){
    for(var index=0; index<keys.length; index += 1){
        var div = tag('div')
        div.className = 'row'
    
        wrapper.appendChild(div)
    
        var row = keys[index]
    
        for(var index2 = 0; index2<row.length; index2 += 1){
            var span = createSpan(row[index2])
    
            var button = createButton(row[index2])
    
            var img = createImage(hash[row[index2]])
    
            var kbd = tag('kbd')
            kbd.className = 'key'
    
            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)
            div.appendChild(kbd)   
        }
    }
}

function listenToKeyboard(hash){
     return document.onkeypress = function(keyPressed){
        var key = keyPressed['key'] 
        var website = hash[key] 
        window.open('http://' + website, '_blank')
    }
}

function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem('newHash') || 'null')
 }
 
 function tag(tagName, attributes){
     return document.createElement(tagName)
 }
 
 function createSpan(textContent){
     var span = tag('span')
     span.textContent = textContent
     span.className = 'text'
     return span
 }
 
 function createButton(id){
     var button = tag('button')
         button.textContent = 'e'
         button.id = id
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
                 e.target.src = '//i.loli.net/2018/02/25/5a92b5ffd699d.png'
             }
             //只要 hash 变了，就将新 hash 存到 newHash 里
             localStorage.setItem('newHash', JSON.stringify(hash))
         }
         return button
 }
 
 function createImage(domain){
     var img = tag('img')
         if(domain){
             img.src = 'http://' + domain + '/favicon.ico'
         }else{
             img.src = '//i.loli.net/2018/02/25/5a92b5ffd699d.png'
         }
         img.onerror = function(e){
             e.target.src = '//i.loli.net/2018/02/25/5a92b5ffd699d.png'
         }
         return img
 }