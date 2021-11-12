$(function () {

    // 第一步：搭建好结构后，先完成登录表单和注册表单间的切换

    // 给登录区的链接添加点击事件
    $('.login a').on('click', function () {
        $('.login').hide()
        $('.reg').show();
    });
    // 给注册区的链接添加点击事件
    $('.reg a').on('click', function () {
        $('.reg').hide()
        $('.login').show();
    })
    /* $('#link_login').on('click', function () {
        $('.login').hide();
        $('.reg').show();
    });
    $('#link_reg').on('click', function () {
        $('.login').show();
        $('.reg').hide();
    })
 */


    // 第二步：先完成注册表单的交互，（先完成表单验证，再监听表单提交事件，发起post请求，完成用户注册功能，同时完成注册成功与失败的弹出提示，并再注册成功自动跳到登录页面

    // 给表单设置正则，验证表单（包括登录表单和注册表单）
    // 结合layui自定义表单验证规则
    var form = layui.form; // 此处的layui类似于jq中的$，只要layui的js文件一引入，就会自动生成该顶级对象，接下来我们就可以使用layui下的form.verity()方法了,其中可用数组也可用函数，具体可查layui文档
    form.verify({
        // 自定义密码验证规则pass，将其作为lay-verify的属性值添加到对应表单元素，多个属性值之间用竖杠隔开
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            // value是确认密码表单的值，
            // 再获取到输入密码表单的值，两者对比，是否相同，不相同return错误提示
            var pasw = $('.reg [name=password]').val(); // 此处运用表单的属性即属性名获取到表单，注意属性值不加引号，中括号前边要有空格隔开
            if (value !== pasw) {
                return "两次密码输入不一致"
            }
        }
    });


    var layer = layui.layer; // 此处的layer是layui下的内置对象：弹出层独立组件，专门用来作弹出层效果，我们可以使用layui下的layer的方法
    // 监听注册表单的提交事件，发起ajax请求
    $('#regBox').on('submit', function (e) {
        // console.log(111);
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'api/reguser',
            data: {
                username: $('#reg_uname').val(),
                password: $('#reg_psw').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // 此处直接运用layui下的内置对象：弹出层组件layer
                    return layer.msg(res.message); // 不要忘记return
                }
                layer.msg('注册成功');
                // 注册成功后模拟人的点击“去登陆事件”，完成从注册表单自动跳转到登陆表单
                $('#link_reg').click(); // 获取到“去登陆”链接，并调用click()
            }
        })
    });

    // 第三步，完成登录表单功能
    // 监听登录表单的submit事件

    // serialize()是jq下的方法用于快速获取表单数据
    $('#loginBox').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize(); // 获取的值是查询字符串格式
        // console.log(data);
        $.post('api/login',
            data,
            function (res) {
                if (res.status !== 0) {

                    layer.msg('该账号不存在，请你注册');
                    return $('#link_login').click();
                }
                // console.log(res);  // 登录成功后获取的数据中的token属性值，用于设置访问后续有访问权限接口的请求头header中的Authoriation属性，

                layer.msg('登陆成功'); // 注意此处进行测试时，用户名不要输入汉字，因为还需要解码，不解码浏览器识别不了
               
                localStorage.setItem('token',res.token); // 因为要经常使用所以将登陆成功后返回的token属性值保存到本地存储中,用到的时候去本地中取
                // 如果登录成功跳转到主页index.html
                location.href = './index.html' // 跳转到与login页面同级的index.html
            }
        )
    })

    // ！！！！！ 到此时登录和注册页面的交互功能就设置完成了，此时不要忘记将修改后的文件提交到git仓库，并将login分支推送到远程仓库，再将login分支合并到main主分支上，到此整个登录和注册页面算是完成了
    // !!!!!!!!! 接下来该开发首页功能了，首先要做的是在git终端中创建index分支，并切换到index分支上，准备开发index页面，先搭建结构实现样式，再进行交互的实现

    
    












})