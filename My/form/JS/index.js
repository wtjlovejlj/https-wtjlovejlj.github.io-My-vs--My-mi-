var email = document.getElementById("email");
var mi_ma = document.getElementById("mi-ma");
var number = document.getElementById("number");
var ID = document.getElementById("ID");
var myp = document.getElementsByTagName("p");
var email_p_1 = myp[0];
var email_p_2 = myp[1];
var email_p_3 = myp[2];
var email_p_4 = myp[3];
email.onfocus = function(){
    email_p_1.style.display="block";
}
email.onblur = function(){
    var emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    if(email.value ==""){
        email_p_1.innerHTML ="输入的值不能为空";
        email_p_1.style.color = "red";
    }else if(!emailReg.test(email.value)){
        email_p_1.innerHTML ="你输入的邮箱格式不正确";
        email_p_1.style.color = "red";
    }else{
        email_p_1.innerHTML ="正确";
        email_p_1.style.color = "green";
    }
}
mi_ma.onfocus = function(){
    email_p_2.style.display="block";
}
mi_ma.onblur = function(){
    var Reg_1 = /^[0-9]{6,18}$/;
    var Reg_2 = /^[A-z]{6,18}$/;
    var Reg_3 = /^[0-9A-z]{6,18}$/;
    var Reg_4 = /^[0-9A-Za-z\W]{6,18}$/;
    if(mi_ma.value ==""){
        email_p_2.innerHTML ="输入的值不能为空";
        email_p_2.style.color = "red";
        email_p_2.parentNode.style.backgroundColor="";
    }else if(Reg_1.test(mi_ma.value)||Reg_2.test(mi_ma.value)){
        email_p_2.innerHTML="密码安全等级:低";
        email_p_2.style.color = "black";
        email_p_2.parentNode.style.backgroundColor="red";
    }else if(Reg_3.test(mi_ma.value)){
        email_p_2.innerHTML="密码安全等级:中";
        email_p_2.style.color = "black";
        email_p_2.parentNode.style.backgroundColor="yellow";
    }else if(Reg_4.test(mi_ma.value)){
        email_p_2.innerHTML="密码安全等级:高";
        email_p_2.style.color = "black";
        email_p_2.parentNode.style.backgroundColor="green";
    }else{
        email_p_2.innerHTML ="您输入的格式错误";
        email_p_2.style.color = "red";
        email_p_2.parentNode.style.backgroundColor="";
    }
}
number.onfocus = function(){
    email_p_3.style.display="block";
}
number.onblur =function(){
    var numberReg = /^1[3-9][0-9]{9}$/;
    if(number.value ==""){
        email_p_3.innerHTML ="输入的值不能为空";
        email_p_3.style.color = "red";
    }else if(!numberReg.test(number.value)){
        email_p_3.innerHTML ="你输入的手机号格式不正确";
        email_p_3.style.color = "red";
    }else{
        email_p_3.innerHTML ="正确";
        email_p_3.style.color = "green";
    }
}
ID.onfocus = function(){
    email_p_4.style.display="block";
}
ID.onblur = function(){
    var IDReg = /^[\u4e00-\u9fa5]{1,10}$/;
    if(ID.value ==""){
        email_p_4.innerHTML ="输入的值不能为空";
        email_p_4.style.color = "red";
    }else if(!IDReg.test(ID.value)){
        email_p_4.innerHTML ="你输入的网名必须是中文且长度一定";
        email_p_4.style.color = "red";
    }else{
        email_p_4.innerHTML ="正确";
        email_p_4.style.color = "green";
    }
}

var agree = document.getElementById("agree");
var but = document.getElementById("but");
agree.onclick = function(){
    if (agree.checked==false){
        but.disabled = true;
        but.style.opacity = ".4";
    }else{
        but.disabled = false;
        but.style.opacity = "1";
    }
}
