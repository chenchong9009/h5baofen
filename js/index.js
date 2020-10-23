
$(function(){
  

    //initialize swiper when document ready  

    var mySwiper = new Swiper ('.swiper-container', {
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      loop: true,
      speed:1000,
      autoplay: 3000,
      autoplayDisableOnInteraction:false,
      calculateHeight : false,
      preventLinks : false,
      pagination: '.swiper-pagination',
      paginationClickable :true,
     
     

      }) 

   

});