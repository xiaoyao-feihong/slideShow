
class SlideShow {
    constructor(obj) {
        //获取父元素
        this.parentNode = document.getElementById(obj.id)
        //获取图片路径
        this.srcArr = obj.srcArr
        this.length = obj.srcArr.length
        //滚动方向
        this.direction = obj.direction || 'right'
        //父元素宽高
        this.height = this.getStyle(this.parentNode, 'height')
        this.width = this.getStyle(this.parentNode, 'width')
        //轮播时间
        this.time = obj.time || 2500
        this.currentPage = 0
        //对按钮的处理
        this.cx_btn = null
        //自动轮播的定时器
        this.timer = null
        //对链接的处理
        if (obj.hrefArr) {
            this.hrefArr = obj.hrefArr
        } else {
            this.hrefArr = []
            for (let i = 0; i < this.length; i++) {
                this.hrefArr.push('javascript:;')
            }
        }
        this.initial(obj)
    }
    //初始化函数
    initial(obj) {
        //初始化ul
        let ulHead = '<ul class="cx-slideshow">'
        let ulTail = '</ul>'
        this.hrefArr.forEach((elem, index) => {
            ulHead += `<li><a href="${elem}"><img src="${this.srcArr[index]}"></img></a></li>`
        })
        let ulStr = ulHead + ulTail + '<div class="cx-btn"><span class="icon-arrow-left"></span><span class="icon-arrow-right"></span></div>'
        this.parentNode.innerHTML = ulStr
        let liArr = Array.prototype.slice.call(document.querySelectorAll('.cx-slideshow li'), 0)
        let imgArr = Array.prototype.slice.call(document.querySelectorAll('.cx-slideshow li a img'), 0)
        liArr.forEach((elem, index) => {
            elem.style.height = this.height
            elem.style.width = this.width
            imgArr[index].style.width = this.width
            imgArr[index].style.height = this.height
        })
        this.ulElem = document.getElementsByClassName('cx-slideshow')[0]
        this.ulElem.style.height = this.height
        let cloneFir = this.ulElem.children[0].cloneNode(true)
        this.ulElem.style.width = parseInt(this.width) * (this.length + 1) + 'px'
        this.ulElem.appendChild(cloneFir)
        this.autoPlay()
        //处理按钮的样式函数执行
        this.handleBtn(obj)
    }
    //处理按钮的样式函数
    handleBtn(obj) {
        this.cx_btn = document.getElementsByClassName('cx-btn')[0]
        this.cx_btn.style.height = obj.btnHeight ? obj.btnHeight + 'px' : '80px'
        this.cx_btn.style.display = 'none'
        this.cx_btn.style.width = this.width
        let h = this.cx_btn.style.height
        Array.prototype.slice.call(this.cx_btn.children, 0).forEach(elem => {
            elem.style.height = h
            elem.style.lineHeight = h
            elem.style.width = obj.btnWidth ? obj.btnWidth + 'px' : '80px'
            elem.style.textAlign = 'center'
            elem.style.fontSize = obj.btnSize ? obj.btnSize + 'px' : '30px'
            elem.style.color = obj.btnColor || 'white'
            elem.style.backgroundColor = obj.btnBgcolor || 'rgba(1,1,1,.7)'
        })
        //给div绑定鼠标进入事件
        this.parentNode.onmouseenter = (e) => {
            clearInterval(this.timer)
            this.cx_btn.style.display = 'block'
        }
        this.parentNode.onmouseleave = (e) => {
            this.autoPlay()
            this.cx_btn.style.display = 'none'
        }
        //给按钮绑定点击事件 
        this.cx_btn.children[0].onclick = () => {
            if (this.currentPage === 0) {
                this.ulElem.style.left = -(this.length) * parseInt(this.width) + 'px'
                this.currentPage = this.length
            }
            this.currentPage--
            this.easeIn(-this.currentPage * parseInt(this.width))
        }
        this.cx_btn.children[1].onclick = () => {
            if (this.currentPage === this.length) {
                this.ulElem.style.left = '0px'
                this.currentPage = 0
            }
            this.currentPage++
            this.easeIn(-this.currentPage * parseInt(this.width))
        }
    }
    //运动函数
    easeIn(target) {
        clearInterval(this.ulElem.timer)
        this.ulElem.timer = setInterval(() => {
            let starLeft = parseInt(this.getStyle(this.ulElem, 'left'))
            let speed = (target - starLeft) / 10
            speed = (target - starLeft) > 0 ? Math.ceil(speed) : Math.floor(speed)
            if (Math.abs(target - starLeft) <= Math.abs(speed)) {
                clearInterval(this.ulElem.timer)
                this.ulElem.style.left = target + 'px'
                return;
            } else {
                this.ulElem.style.left = starLeft + speed + 'px'
            }
        }, 50);
    }
    //获取样式
    getStyle(obj, prop) {
        return getComputedStyle(obj, null)[prop]
    }
    //自动轮播
    autoPlay() {
        if (this.direction === 'left') {
            this.timer = setInterval(() => {
                this.cx_btn.children[0].click()
            }, this.time)
        } else {
            this.timer = setInterval(() => {
                this.cx_btn.children[1].click()
            }, this.time)
        }
    }
}