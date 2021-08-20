// 动画工具

// obj 要执行动画的对象
// attr 要执行动画的样式
// speed 移动的速度
// target 执行动画的目标位置
// callback 回调函数，这个函数将会在动画执行完毕以后执行
function move(obj, attr, target, speed, callback) {
    // 关闭上一个定时器
    clearInterval(obj.timer);

    var current = parseInt(getStyle(obj, attr));
    // 判断speed的正负值
    // 如果从0向800移动，则speed为正
    // 如果从800向0移动，则speed为负
    if (current > target) {
        speed = -speed;
    }

    // 开启一个定时器，用来执行动画效果
    obj.timer = setInterval(function () {
        // 获取box1的原来的left值
        var oldValue = parseInt(getStyle(obj, attr));
        // 在旧值的基础上增加
        var newValue = oldValue + speed;

        // 判断newValue是否大于800
        // 从800向0移动
        // 向左移动时，需要判断newValue是否小于target
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }

        // 将新值设置给box1
        obj.style[attr] = newValue + "px";

        // 当元素移动到0px是，使其停止执行动画
        if (newValue == target) {
            // 达到目标，关闭定时器
            clearInterval(obj.timer);

            // 动画执行完毕
            callback && callback();
        }
    }, 30);
};
function getStyle(obj, name) {
    return getComputedStyle(obj, null)[name];

    return obj.currentStyle[name];
};

// 类
// 定义一个函数，用来向一个元素中添加指定的class属性值
//  参数：
//       obj  要添加class属性的元素
//        cn  要添加的class值

function addClass(obj,cn){
    // 检查obj中是否含有cn
    if(!hasClass(obj,cn)){
        obj.className += " "+cn;
    }
}

// 判断一个元素中是否含有指定的class属性值
// 如果有该class  则返回true  没有则返回false

function hasClass(obj,cn){
    // 判断obj中有没有 cn  class
    // 创建一个正则表达式
    var reg = new RegExp("\\b"+cn+"\\b");

    return reg.test(obj.className);
}

// 删除一个元素中的指定的class 属性

function removeClass(obj,cn){
    // 创建一个正则表达式
    var reg = new RegExp("\\b"+cn+"\\b");

    // 删除class
    obj.className = obj.className.replace(reg,"");
}

// toggleClass 可以用来切换一个类
// 如果元素中具有该类，则删除
// 如果元素中没有该类，则添加

function toggleClass(obj,cn){
    // 判断obj中是否含有cn
    if(hasClass(obj,cn)){
        // 有 则删除
        removeClass(obj,cn);
    }else{
        // 没有 则添加
        addClass(obj,cn);
    }
}