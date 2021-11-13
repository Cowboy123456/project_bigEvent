$(function () {
    // 第一步。完成表单验证
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/,
            '密码必须是6 ~ 12位的非空格字符'
        ],
        //   注意此处是做新旧密码的验证，条件是新旧密码不能一致
        isSame: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！';
            }
        },
        confPass: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致';
            }
        }
    })

    // 第二步，监听表单的提交事件发起请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('密码更改失败')
                }
                layui.layer.msg('密码更改成功');
                // 密码修改成功后置空表单，调用表单的方法reset(),是原生js方法，所以必须获取表单的dom对象
                $('.layui-form')[0].reset();
            }

            
    
        })
            

    })
    
    

    
})

