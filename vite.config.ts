import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.join(__dirname, './src'),
			'@views': path.join(__dirname, './src/views'),
			'@components': path.join(__dirname, './src/components'),
			'@utils': path.join(__dirname, './src/utils'),
			'@public': path.join(__dirname, './src/public')
		}
	},
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
		jsxInject: "import { h } from 'vue';"
	},
	build: {
		chunkSizeWarningLimit: 500,
		minify: 'terser',
		cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
		terserOptions: {
			compress: {
				drop_console: true, //打包时删除console
				drop_debugger: true, //打包时删除 debugger
				pure_funcs: ['console.log']
			}
		},
		rollupOptions: {
			output: {
				manualChunks: {
					// 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
					vue: ['vue', 'vue-router', 'vuex'],
					'ant-design-vue': ['ant-design-vue']
				}
			}
		},
		brotliSize: false
	},
	plugins: [
		vue(),
		vueJsx(),
		styleImport({
			libs: [
				{
					libraryName: 'ant-design-vue',
					esModule: true,
					resolveStyle: name => {
						return `ant-design-vue/es/${name}/style/index`
					}
				}
			]
		}),
		// 打包压缩，主要是本地gzip，如果服务器配置压缩也可以
		viteCompression()
	],
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import "${path.resolve(__dirname, 'src/public/css/variables.less')}";`,
				javascriptEnabled: true
			}
		}
	},
	server: {
		host: '0.0.0.0',
		port: 4000, // 设置服务启动端口号
		open: false, // 设置服务启动时是否自动打开浏览器
		https: false,
		cors: true, // 允许跨域

		// 设置代理，根据我们项目实际情况配置
		proxy: {
			'/dbd-authority': {
				target: 'http://192.168.1.11:9000/dbd-authority',
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace('/dbd-authority/', '')
			}
		}
	}
})
