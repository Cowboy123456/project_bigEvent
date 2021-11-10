//  在发起$.ajax(),$.get(),$.post(),请求之前调用$.ajaxPrefilter()方法，它可以自动接收到我们给ajax请求设置的配置选项，如url，data等数据，并利用其回调函数对这些参数进行修改
// 此案例中我们用他来统一拼接ajax请求的请求路径    根路径和具体的接口的拼接，这样我们就不需要发起一次请求手动拼接一次请求路径了
//    注意：该文件引入html时，要放在jq文件之后，我们自己的js文件之前

$.ajaxPrefilter(function (options) {
    // console.log(options);    //此处的options就可以直接获取到我们给$.ajax(),$.get(),$.post()请求设置的配置选项

    // console.log(options.url);

    // 在发起真正的ajax请求之前，统一拼接请求的路径
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url

    // console.log(options.url);  // 重新拼接之后的options.url就是我们需要的完整的请求路径了
}) 