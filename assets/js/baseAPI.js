//  在发起$.ajax(),$.get(),$.post(),请求之前调用$.ajaxPrefilter()方法，它可以自动接收到我们给ajax请求设置的配置选项，如url，data等数据，并利用其回调函数对这些参数进行修改
// 此案例中我们用他来统一拼接ajax请求的请求路径    根路径和具体的接口的拼接，这样我们就不需要发起一次请求手动拼接一次请求路径了
//    注意：该文件引入html时，要放在jq文件之后，我们自己的js文件之前

$.ajaxPrefilter(function (options) {
    // console.log(options);    //此处的options就可以直接获取到我们给$.ajax(),$.get(),$.post()请求设置的配置选项

    // console.log(options.url);

    // 1.在发起真正的ajax请求之前，统一拼接请求的路径
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url

    // console.log(options.url);  // 重新拼接之后的options.url就是我们需要的完整的请求路径了

    // 2. 统一为有访问权限的请求设置请求头headers属性
     //判断，如果在请求路径中，该字符串'/my/'的indexOf值不为-1，说明在请求路径中存在该字符串，此时才给ajax请求设置请求头，否则不需要设置请求头，因为接口文档中告诉我们只有接口中有/my/的为有请求权限接口
    if (options.url.indexOf('/my/') !== -1) { 
        options.headers = {
             // 访问有权限的接口时，必须请求的配置中添加headers请求头属性，并设置其中的Authorizations属性，其属性值在用户注册或登录的时候已发起ajax请求就会存储到本地存储，此时我们只需将其从本地取出即可
            Authorization: localStorage.getItem('token') || ''
        }  
    }

    // 3、全局统一挂载complte函数
    
    // 此时我们可以用ajax请求配置的属性complete函数，这个函数无论请求成功还是失败都会执行
    options.complete =  function (res) {
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