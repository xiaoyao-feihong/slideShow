# SlideShow Plugin
**提示：** 用es6语法写的轮播图插件,可以使用<font color='red'>Babel</font>进行语言降级后使用。
##### 1、HTML引入
```html
<script src="./slideshow.js"></script>
```
##### 2、引入slideshow.js和公共样式，使用字体图标arrow-right,arrow-left，下载地址：<font color='skyblue'>https://icomoon.io</font>
```css
/* 父元素样式 */
#slideshow {
    height: 400px;
    width: 600px;
    margin: 100px auto;
    /* border: 1px solid red; */
    /* 必须填写 */
    position: relative;
    overflow: hidden;
}

/* ul样式 */
ul li {
    list-style: none;
}

.cx-slideshow {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.cx-slideshow li {
    height: 100%;
    float: left;
}

.cx-slideshow li a > img {
    height: 100%;
    width: 100%;
}

.cx-slideshow li a {
    display: block;
}

.cx-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.cx-btn > span:first-of-type {
    float: left;
}

.cx-btn > span:last-of-type {
    float: right;
}

/* 因为左右按钮采用的字体图标，所以需要引入字体图表样式 */
/* 字体图标样式 */
@font-face {
    font-family: 'icomoon';
    src:  url('fonts/icomoon.eot?hd8xq4');
    src:  url('fonts/icomoon.eot?hd8xq4#iefix') format('embedded-opentype'),
      url('fonts/icomoon.ttf?hd8xq4') format('truetype'),
      url('fonts/icomoon.woff?hd8xq4') format('woff'),
      url('fonts/icomoon.svg?hd8xq4#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  
  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  //使用到的字体图标样式
  .icon-arrow-right:before {
    content: "\ea34";
  }
  
  .icon-arrow-left:before {
    content: "\ea38";
  }
```
##### 3、页面中html与字体图标的fonts文件夹同级使用
     
##### 4、使用
```js
let slide1 = new Slide({
    //需要插入轮播图的元素（必填）
    id: 'slideshow',
    //需要插入的图片及其路径（必填）
    srcArr: [],
    //默认轮播方向（选填）
    direction: 'left/right',
    //给图片设置链接（最好一一对应）（选填）
    hrefArr: [],
    //轮播时间，最好色设置为2500以上（选填）
    time: 2500,
    //设置按钮高度（选填）
    btnHeight: 80,
    //设置按钮宽度（选填）
    btnWidth: 80,
    //设置按钮大小（选填）
    btnSize: 30,
    //按钮中箭头颜色（选填）
    btnColor: 'white',
    //按钮背景色
    btnBgcolor: 'rgba(1,1,1,.7)'
})
```
