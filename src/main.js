//完整引入
// import 'core-js'
// 手动按需引入
// import 'core-js/es/promise'

import count from "./js/count";
// import sum from "./js/sum";
import './css/index.css'
import './less/index.less'
import './sass/index.sass'
import './stylus/index.styl'
 
console.log(count(2,3))
// console.log(sum(2,3,4,5))
let a = 1
console.log(a)
document.getElementById('btn').onclick = function () {
  // eslint 不识别import
  // /*webpackChunkName:"math"*/魔法命名
  import(/*webpackChunkName:"math"*/ './js/sum').then(res=>{
    console.log(res.de)
  })
}
// 热更新某个模块
// if(module.hot){
//   module.hot.accept("./js/count")
//   module.hot.accept("./js/sum")
// }
new Promise((resolve)=>{
  setTimeout(()=>{
    resolve()
  },1000)
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}