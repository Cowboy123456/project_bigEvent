$(function () {
    // 目标：修改用户信息
    // 第一步：获取用户基本信息，并渲染到表单
    

    initUserInfo()
    // 获取基本信息函数
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: 'my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                // 获取成功后，运用layui中的form内置方法快速为表单赋值
                layui.form.val('setValue', res.data);

            }
        })
    }
})