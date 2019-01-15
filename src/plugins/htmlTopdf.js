// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import $ from 'jquery'
export default{
  install (Vue, options) {
    Vue.getpdf = Vue.prototype.$getPdf = function (id, title) {
      // var title = this.htmlTitle
      let parent = $('#vippreviewchild').children()
      let ps = 20 // 顶部的padding
      for (var i = 0; i < parent.length; i++) {
        $(parent[i]).css({ 'margin': '0px' })
        let he = $(parent[i]).outerHeight(true)
        ps += he
        // 将元素累加高度缩放后，A4也高比较，如果小于继续累加，如果大于，计算本元素距离上边距距离
        if (ps * (592.28 / 841.89) > 841.89) {
          // 最后加180为偏差，具体为什么为180时多次测出，并不准确，暂时没有找到真正的偏差原因
          $(parent[i]).css({ 'margin-top': (841.89 - (ps - he) * (592.28 / 841.89)) * 841.89 / 592.28 + 'px' })
          ps = he
        }
      }
      html2Canvas(document.querySelector(`#${id}`), {
        allowTaint: true
      }).then(function (canvas) {
        // var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        // window.location.href= imgUri; // 下载图片
        let contentWidth = canvas.width
        let contentHeight = canvas.height

        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
              i++
            }
          }
        }
        PDF.save(title + '.pdf')
      })
      setTimeout(() => {
        for (var i = 0; i < parent.length; i++) {
          $(parent[i]).css({ 'margin-top': '0px' })
        }
      }, 100)
    }
  }
}
