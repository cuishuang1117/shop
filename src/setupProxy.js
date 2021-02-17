const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
	app.use(
		createProxyMiddleware('/api',{ //遇见/api前缀的请求，就会触发该代理配置
			target:'http://localhost:5000/', //请求转发给谁
			changeOrigin: true,
			pathRewrite: {'^/api' : ''}
		})
	)
}