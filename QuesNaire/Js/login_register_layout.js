﻿//判断手机号和邮箱是否正确
function Judge(obj) {

    //判断手机号
    if (obj.id == "reg_input_phone") {
        var phone = document.getElementById("reg_input_phone").value;
        var phone_error = document.getElementById("phone_error");
        //手机号为空
        if (phone == "" || phone == null) {
            phone_error.innerHTML = "手机号不能为空!";
            phone_error.style.display = "block";
            return;
        }
        //手机号格式不对
        if (!(/^1[3456789]\d{9}$/.test(phone)) && phone != "") {
            var phone_error = document.getElementById("phone_error");
            phone_error.innerHTML = "手机号格式有误,请输入正确的手机号！";
            phone_error.style.display = "block";
            return;
        }
    }
    //判断邮箱
    if (obj.id == "reg_input_email") {
        var email = document.getElementById("reg_input_email").value;
        var email_error = document.getElementById("email_error");
        //手机号为空
        if (email == "" || email == null) {
            email_error.innerHTML = "邮箱不能为空!";
            email_error.style.display = "block";
            return;
        }

        //邮箱格式不对
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!(myreg.test(email)) && email != "") {
            var email_error = document.getElementById("email_error");
            email_error.innerHTML = "邮箱格式有误,请输入正确的邮箱！";
            email_error.style.display = "block";
            return;

        }
    }

}

//清除错误提示
function ClearError(obj) {

    var id = obj.parentNode.parentNode.id;
    if (id == "login") {
         var error_message = document.getElementById("error_message");
        if (error_message.innerText == "账号或密码错误!") {
            error_message.innerHTML = "";
            error_message.style.display = "none";
        }
    }
    if (obj.id == "reg_input_name") {
        var name_error = document.getElementById("name_error");
        name_error.innerHTML = "";
        name_error.style.display = "none";
    }
    if (obj.id == "reg_input_phone") {
        var phone_error = document.getElementById("phone_error");
        phone_error.innerHTML = "";
        phone_error.style.display = "none";
    }
    if (obj.id == "reg_input_email") {
        var email_error = document.getElementById("email_error");
        email_error.innerHTML = "";
        email_error.style.display = "none";
    }
    if (obj.id == "reg_input_password") {
        var error_password_ag = document.getElementById("error_password_ag");
        var error_password = document.getElementById("error_password");
        error_password.innerHTML = "";
        error_password.style.display = "none";
    }
    if (obj.id == "reg_input_password_ag") {
        var error_password_ag = document.getElementById("error_password_ag");
        error_password_ag.innerHTML = "";
        error_password_ag.style.display = "none";
    }

}

//改变是否接受协议状态
function ChangeSelect(obj) {
    var error_message = document.getElementById("error_message");
    var select = obj.getAttribute("Is-select");
    if (select == "false") {
        error_message.style.display = "none";
        obj.setAttribute("Is-select", "true");
    }
    if (select == "true") {
        obj.setAttribute("Is-select", "false");
    }

}
//判断密码是否一致
function JudgeSame(obj) {
    var error_password_ag = document.getElementById("error_password_ag");

    var password = document.getElementById("reg_input_password").value;
    var password_ag = document.getElementById("reg_input_password_ag").value;
    if (obj.id == "reg_input_password_ag") {
        if (password != password_ag) {
            error_password_ag.innerHTML = "输入的两次密码不一致，请重新输入！";
            error_password_ag.style.display = "block";
        }
        else {
            error_password_ag.style.display = "none";
        }
    }
    if (obj.id == "reg_input_password" && password_ag!="") {
        if (password != password_ag) {
            error_password_ag.innerHTML = "输入的两次密码不一致，请重新输入！";
            error_password_ag.style.display = "block";
        }
        else {
            error_password_ag.style.display = "none";
        }
    }


}

//判断
function JudgmentExist(obj) {
    var name_error = document.getElementById("name_error");
    var phone_error = document.getElementById("phone_error");
    var email_error = document.getElementById("email_error");


    var type;
    var input = obj.value;

    if (obj.id == "reg_input_name" && input=="") {
        name_error.innerHTML = "用户名为空！";
        name_error.style.display = "block";
    }

    if (obj.id == "reg_input_name") {
        type = "name";
        if (name_error.style.display == "block") {
            return;
        }
    }
    if (obj.id == "reg_input_phone") {
        type = "phone";
        if (phone_error.style.display == "block") {
            return;
        }
    }
    if (obj.id == "reg_input_email") {
        type = "email";
        if (email_error.style.display == "block") {
            return;
        }
    }
    if (input == "" || input == null) {
        return;
    }
    axios.post('../Register/JudgmentExists', {
        type:type,
        input: input
        
    })
        .then(function (response) {
            console.log(response.data);
            var index = response.data;
            switch (index) {
                case 1:
                    name_error.innerHTML = "用户名已存在！";
                    name_error.style.display = "block";
                    break;
                case 2:
                    phone_error.innerHTML = "手机号已经注册，请直接登录！";
                    phone_error.style.display = "block";
                    break;
                case 3:
                    email_error.innerHTML = "邮箱已经注册，请直接登录！";
                    email_error.style.display = "block";
                    break;
                default:
                    break;
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}