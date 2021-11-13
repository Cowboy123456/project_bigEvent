$(function () {
    // 第一步：完成表单验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';// 表单验证本身就有弹出层，所以不需要再使用layer.msg()方法了
            }
        }

    })
    // 第二步：发起请求获取用户的基本信息并赋给表单
    getUserInfo();
    // 第三步：完成“重置”按钮的操作，当用户不想修改信息时，点击此按钮，表单中的信息还原
    $('#resetBtn').on('click', function (e) {
        // console.log(111);
        // 点击重置按钮后先阻止其默认的清空表单操作
        e.preventDefault();
        // 再次发起请求获取数据并赋值给表单，
        getUserInfo();
    });
    // 第四步：完成"提交修改"按钮功能，当用户要修改表单中的基本信息时，点击该按钮发起ajax请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();  // 不能忘记阻止默认提交
        $.ajax({
            method: 'POST',
            url: 'my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                // 当点击了提交按钮成功修改信息后，还有一个功能需要完善，就是后台主页的头像和用户名需要重新获取数据并渲染，此时因为本页面是写在主页的一个iframe标签中，我们可以将其理解为主页的子页面，这样的话，只要在iframe页面中调用其父页面主页的获取数据的函数getUserInfo();就可以了，代码如下：其中的widow代表iframe页面的窗口，parent代表其父页面主页面的窗口
                window.parent.getUserInfo();
            }
        })
    })








})
// 封装用户的基本信息，即将用户已有信息填充到表单中
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "my/userinfo",

        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户基本信息失败');
            }
            // 快速给表单赋值，使用layui下的表单内置属性form.val(参数一，参数2),参数一是一个字符串，与我们要操作的表单form中的lay-filter="setValue"的值一致，参数二是一个对象，其中的键值对，键是表单元素的name属性值，值是我们要赋给表单的值,例如：
            /* layui.form.val('setValue', {
                "logname": res.data.username,
                "unickname": res.data.nickname,
                "uemail":res.data.email
            }) */
            // 因为此处服务器返回的数据中的data对象，就是我们要为表单赋的值，所以第二个参数可以这样写：如果这样写，我们给表单设置的name属性值必须和data中的一致
            layui.form.val('setValue', res.data)
            // 但此处有一个问题，当我们获取到用户基本信息并给表单赋值后，下一步当用户更改了基本信息后，我们还需要向服务器提交这些信息，经查看文档我们发现，在发送请求时，除了要携带用户昵称和邮箱以外，还需要携带id参数，为了能取到id参数，我们应该给表单中新增一个表单来获取id，但这个表单又不可以在页面中显示出来，这时我们可以用表单的隐藏域表单类型，如：<input type="hidden" name="id"/>;,隐藏域与普通表单的区别在于在页面中不可见  




        }
    })



}