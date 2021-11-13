$(function () {

    // 第一步，创建初始化的裁剪区域
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比 , 指定裁剪框的比例如 1/1, 4/3, 16/9
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)



    // 第二步，完成点击“上传”选择图片的功能
    // 因为“上传”按钮要实现点击后弹出像点击上传文件的表单后那样的对话框
    // 所以思路是：新增一个file类型的input表单，将其隐藏不显示，然后给“上传”按钮绑定点击事件，当点击时调用file表单内置的点击事件
    $('#btn_file').on('click', function () {
        // console.log(111);
        $('#file').click();
    })



    // 第三步，更换裁剪区图片的功能
    // 为file表单绑change事件，只要选择的文件发生了变化就会触发change事件,
    $('#file').on('change', function (e) {
        // console.log(e);
        // change事件的内置对象e,下的target属性下的files属性就是用户选择的图片集合，是个伪数组，有索引有有长度
        // 获取用户选择的文件
        var imgList = e.target.files;
        // 1.拿到用户选择的文件
        var selectImg = e.target.files[0]
        // console.log(imgList);
        if (imgList.length === 0) {
            return layui.layer.msg('请选择图片')
        }
        // 2.根据户选择的文件，创建一个url地址
        var selectImgUrl = URL.createObjectURL(selectImg);
        // 3.先销毁旧的裁剪区域，再重新设置.image盒子的src路径，之后再创建裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', selectImgUrl)
            .cropper(options)
    });


    // 第四步 裁剪图像并上传到服务器
    // 为“确定”按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        // 1.拿到用户裁剪的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2.发送请求上传到服务器
        $.ajax({
            method: 'POST',
            url: 'my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更换头像失败')
                }
                layui.layer.msg('更换头像成功');
                // 获取成功后，重新渲染侧边栏的头像
                // iframe作为子页面调用父页面的方法
                window.parent.getUserInfo();

            }
        })










    })










})