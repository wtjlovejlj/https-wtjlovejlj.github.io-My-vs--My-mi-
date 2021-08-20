// 设置表头右边的效果
var fade = document.getElementById("fade");
setInterval(function(){
    fade.innerHTML="25元专属券限时领！"
    fade.className="fadeUp2";
},1000)
setInterval(() => {
    fade.innerHTML="限时领取免费课程"
    fade.className="fadeUp";
}, 2000);