import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function (id,mainData) {
      // var title = this.htmlTitle
     var title =  'Fact Find for '+ mainData.name +' as of ' + mainData.time;

      html2Canvas(document.querySelector('#pdfDom'), {
        // allowTaint: false
        allowTaint: true,
        useCORS:true,
      }).then(function (canvas) {

      let pageData = new Image();
                //设置图片跨域访问
      pageData.setAttribute('crossOrigin', 'anonymous');
      var shareContent = document.querySelector('#pdfDom')
      var width = shareContent.offsetWidth / 4
      var height = shareContent.offsetHeight / 4
      window.setTimeout(() => {
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      var img = new Image()
      canvas.width = img.width * 4; // 关键代码: canvas的width、height属性用于管理画布尺寸
      canvas.height = img.height * 4; // 关键代码
            img.src = pageData
            img.onload = function () {
              
  
                // 获取dom高度、宽度
                img.width = img.width / 2
                img.height = img.height / 2
                img.style.transform = 'scale(0.5)'
                if (width > height) {
                    // 此可以根据打印的大小进行自动调节
                    // eslint-disable-next-line
                    var pdf = new JsPDF('l', 'mm', [
                        width * 0.505,
                        height * 0.545
                    ])
                } else {
                    // eslint-disable-next-line
                    var pdf = new JsPDF('p', 'mm', [
                        width * 0.505,
                        height * 0.545
                    ])
                }
                pdf.addImage(
                    pageData,
                    'jpeg',
                    0,
                    0,
                    width * 0.505,
                    height * 0.545
                )
                console.log(mainData.path,'mainData.path')
                pdf.setFontSize(10);
                if(mainData.path){
                  pdf.textWithLink('Download All Files',8,height * 0.545-10,{url:encodeURI(mainData.path)})
                }
                console.log(333)
                pdf.save(title + '.pdf')
            }
            // pdf.save(title+'.pdf');
      }, 1000);
      }
      )
    }
  }
}