/**
 * 地图类
 */
/**
 *
 * @param oParent  父级对象即创建的对象添加到的目标对象
 * @param oRight  //
 * @param level   关卡等级
 * @constructor
 */
function Map(oParent, oRight, level) {
    this.oParent = oParent;
    this.oRight = oRight;
    this.level = level;

    this.eMapLevel = []; //地图数组
    this.eMapLength = 0; //地图数组的长度
    this.mapEnemyType = []; // 保存敌方坦克的出场顺序
    this.lairEnclosure = []; //保存老巢的围墙
    this.obstacle = []; //保存所有障碍物
}

/**
 * 封装创建元素
 * @param{sElem} 创建元素的tag名
 * @param{sClass} 创建元素的class名
 * @param{sId} 创建元素的id名
 * return{oElem} 返回创建的对象
 */
Map.prototype.createElem = function(sElem, sClass, sId) { // 封装创建元素
    var oElem = document.createElement(sElem);
    if (sClass) {
        oElem.className = sClass;
    }
    if (sId) {
        oElem.id = sId;
    }
    return oElem;
}

/**
 * 初始化
 */
Map.prototype.initMap = function() {

    this.initLevel();
    this.initLeftMap();
};

/**
 * 根据关卡等级获取地图数据
 */
Map.prototype.initLevel = function() {
    // 当前关卡
    switch (this.level) {
        case 1:
            // 获取第一关障碍物数组
            this.eMapLevel = eMap.level_1.obstacles;
            // 获取第一关障碍物数组个数
            this.eMapLength = eMap.level_1.obstacles.length;
            // 获取第一关敌方坦克出场顺序
            this.mapEnemyType = eMap.level_1.enemyType;
            break;
        case 2:
            this.eMapLevel = eMap.level_2.obstacles;
            this.eMapLength = eMap.level_2.obstacles.length;
            this.mapEnemyType = eMap.level_2.enemyType;
            break;
        case 3:
            this.eMapLevel = eMap.level_3.obstacles;
            this.eMapLength = eMap.level_3.obstacles.length;
            this.mapEnemyType = eMap.level_3.enemyType;
            break;
        default:
            this.eMapLevel = eMap.level_1.obstacles;
            this.eMapLength = eMap.level_1.obstacles.length;
            this.mapEnemyType = eMap.level_1.enemyType;
            break;
    }
};

/**
 * 初始化左侧游戏地图
 */
Map.prototype.initLeftMap = function() {
    // 创建文档碎片节点 用来创建一个虚拟的节点对象，或者说，是用来创建文档碎片节点。它可以包含各种类型的节点，在创建之初是空的。
    var oFrag = document.createDocumentFragment();

    // 循环当前障碍物数组个数
    for (var i = 0; i < this.eMapLength; i++) {
        // 循环当前障碍物数组中每一个障碍物
        for (var j = 0; j < this.eMapLevel[i].length; j++) {
            // 判断当前障碍物类型
            switch (this.eMapLevel[i][j]) {
                case 0: //道路
                    var oBare = this.createElem(DIV, BARE);
                    oBare.material = 0; //用以分辨类型
                    oFrag.appendChild(oBare);
                    break;

                case 1: //墙
                    var oWall = this.createElem(DIV, WALL);
                    oWall.material = 1; //用以分辨类型
                    oFrag.appendChild(oWall);
                    break;

                case 2: //铁（石头）
                    var oIron = this.createElem(DIV, IRON);
                    oIron.material = 2; //用以分辨类型
                    oFrag.appendChild(oIron);
                    break;

                case 3: //花
                    var oFlower = this.createElem(DIV, FLOWER);
                    oFlower.material = 3; //用以分辨类型
                    oFrag.appendChild(oFlower);
                    break;

                case 7: //墙(老巢周围的墙)
                    var oWall = this.createElem(DIV, WALL);
                    oWall.material = 7; //用以分辨类型
                    oFrag.appendChild(oWall);
                    break;

                case 9: //老巢
                    var oBare = this.createElem(DIV, BARE);
                    oBare.material = 0;
                    oFrag.appendChild(oBare);

                    var oLair = this.createElem(DIV, LAIR, LAIR);
                    //这个时候设置老巢为绝对定位，使其不在原来的位置不影响div的排列
                    oLair.style.position = POSITION;
                    oLair.material = 9;
                    oFrag.appendChild(oLair);
                    break;

                default:
                    break;
            }
        }
    }

    this.oParent.appendChild(oFrag);

    var oElem = this.oParent.getElementsByTagName(DIV);
    var iElemLen = oElem.length;
    var index = 0;

    // 需要对每一个方块进行绝对定位，
    // 所以要计算每一个相对于左上角的偏移量就是每一个div的offsetLeft
    for (var i = 0; i < iElemLen; i++) {
        if (oElem[i].id !== LAIR) { //不是老巢
            oElem[i].style.left = oElem[i].offsetLeft + PX;
            oElem[i].style.top = oElem[i].offsetTop + PX;
        }
    }

    //给每一个元素进行绝对定位
    for (var i = 0; i < iElemLen; i++) {
        if (oElem[i].id != LAIR) { //不是老巢
            oElem[i].style.position = POSITION;
            if (oElem[i].material == 7) { //老巢周围的墙
                oElem[i].id = index++;
                // 保存老巢的围墙
                this.lairEnclosure.push(oElem[i]);
                // 保存所有障碍物
                this.obstacle.push(oElem[i]);
            } else if (oElem[i].material == 1 || oElem[i].material == 2) {
                //如果是墙或者是铁（石头），保存到障碍物数组中
                this.obstacle.push(oElem[i]);
            }
        }
    }

    //获取老巢节点
    var oLair = $(LAIR);
    //设置老巢节点的偏移量与和它上一个同级的的位置相同
    oLair.style.top = oLair.previousSibling.offsetTop + PX;
    oLair.style.left = oLair.previousSibling.offsetLeft + PX;
    oLair.style.zIndex = 6;
};