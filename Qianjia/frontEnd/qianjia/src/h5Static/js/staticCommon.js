$(function(){
    $('#backId').click(function(){
      window.history.back();
  })
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    }


  var isWap = getUrlParam('isWap');
  if(isWap){

      $('.isWap').css('display','none');
      $('.lys_content_remove').removeClass('paddingTop')
      //console.log($('.lys_content_remove'));
  }else{
      $('.isWap').css('display','block');
  }

var isPc = getUrlParam('isPc');

if(isPc){

    $('.isPc').css('display','none');
    $('.lys_content_remove').removeClass('paddingTop')
    //console.log($('.lys_content_remove'));
}




    //console.log(isWap);
})
