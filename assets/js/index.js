$(function () {
    getUserInfo();

    // 退出按钮功能
    $('#quit').on('click', function () {
        // console.log(111);
        // 此处用到layui的弹出层组件中的内置对象layer.confirm(),询问框    
        layui.layer.confirm('确定退出吗', { icon: 3, title: '提示' }, function (index) {

            /*  确定退出要做两件事：
            1.清空本地存储中的token
            2.跳转到初始的登陆页面 */
            localStorage.removeItem('token');   
            location.href = './login.html';

            // 关闭询问框
            layui.layer.close(index);

        });

    
    });

})





// 封装获取用户信息请求
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: "my/userinfo",

        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            renderUserAvatar(res);
        },
        // 因为用户不登陆我们不能让其登录到后台主页，所以我们需要控制用户的访问权限，如果不控制，当用户在搜索地址框直接输入后台主页的地址时也能访问到后台主页，此时就会触发后台主页获取用户信息的ajax请求，提示弹出框会提示获取数据失败，因为没有登陆没有获得token值，调试器中也可以查看到获取失败的返回消息

        // 此时我们可以用ajax请求配置的属性complete函数，这个函数无论请求成功还是失败都会执行
        complete: function (res) {
            console.log(res);  // 在complete回调函数中的responseJSON属性可以拿到获取数据失败的后服务器返回来的数据，我们可以基于这些数据进行判断
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 做两件事
                // 1.强制清空token
                localStorage.removeItem('token');
                // 2.强制停留在login页面
                location.href = './login.html';   
            }
          
            
        }

    })
}

// 封装渲染数据函数
function renderUserAvatar(res) {
    // console.log(res.data.username.substr(0,1).toUpperCase());
    // 渲染用户名时注意：如果用户有nickname就优先渲染昵称，如果没有再渲染登陆用的用户名,所以先获取用户名，有两种写法
    // var uname = res.data.nickname || res.data.username;
    var uname = res.data.nickname ? res.data.nickname : res.data.username;

    // 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + uname);

    // 渲染用户头像时，也是要先判断，如果用户有自己的图片头像，即返回数据中的user_pic属性有对应的图篇地址值，如果没有值，则渲染用户的文本头像，即用户名首字母大写的文本

    // 疑问，此处判断条件写为res.data.user_pic可以吗
    if (res.data.user_pic !== null) {
        $('.layui-nav-img')
            .prop('src', res.data.user_pic)
            .show()
            .siblings('.text_avatar')
            .hide();
    } else {
        // 用户名有可能是汉字也有可能是英文,如果是汉字取得就是第一个汉字，英文就是首字母的大写
        // console.log(uname[0]);
        var firstLetter = uname[0].toUpperCase();
        //uname.substr(0, 1).toUpperCase()
        $('.text_avatar')
            .html(firstLetter)
            .show()
            .siblings('.layui-nav-img')
            .hide();
    }

}