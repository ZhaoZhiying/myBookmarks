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
        '2':['z','x','c','v','b','n','m','~'],
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

function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem('newHash') || 'null')
 }
 
 function createSpan(textContent){
     var span = document.createElement('span')
     span.textContent = textContent
     span.className = 'text'
     return span
 }
 
 function createButton(id){
     var button = document.createElement('button')
         button.textContent = 'E'
         button.id = id
         button.className = 'button'
         button.onclick = function(buttonPressed){
             var newButton = buttonPressed.target
             var newImg = newButton.previousSibling
                
             var key = newButton.id
             var userType = prompt('请输入新网址')
             //hash 变更
             hash[key] = userType 
             newImg.src = 'http://' + userType + '/favicon.ico'
             newImg.onerror = function(e){
                 e.target.src = '//i.loli.net/2018/02/25/5a92b5ffd699d.png'
             }
             //只要 hash 变了，就将新 hash 存到 newHash 里
             localStorage.setItem('newHash', JSON.stringify(hash))
         }
         return button
 }
 
 function createImage(domain){
     var img = document.createElement('img')
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

 function generateKeyboard(keys, hash){
    for(var i=0; i<keys.length; i += 1){
        var div = document.createElement('div')
        div.className = 'row'
    
        wrapper.appendChild(div)
    
        var row = keys[i]
        for(var j = 0; j<row.length; j += 1){
            
            var span = createSpan(row[j])
            
            var button = createButton(row[j])
    
            var img = createImage(hash[row[j]])
    
            var kbd = document.createElement('kbd')
            kbd.className = 'key'
            
            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)
            div.appendChild(kbd)   

            //鼠标点击事件
            kbd.id = row[j]
            kbd.addEventListener('click', function(kbdClick){
                console.log(kbdClick)
                var website = hash[kbdClick.target.id]
                window.open("http://" + website, "_blank")
            })
        }
    }
}

 function listenToKeyboard(hash){
    return document.onkeypress = function(keyPressed){
        console.log(keyPressed)
        var key = keyPressed['key'] //q w e
        var website = hash[key] 
        window.open('http://' + website, '_blank')
    }
}