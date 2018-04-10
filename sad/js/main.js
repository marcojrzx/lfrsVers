/**
 * Created by interdemilan on 30/01/15.
 */
$(function() {

    /*$('.misimagenes').magnificPopup({
        type:'ajax',
        gallery: {
            enabled: true
        }
    });
    $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true
    });*/

    $('.abrepopup').magnificPopup({
        type: 'ajax',
        closeOnContentClick: false,
        closeOnBgClick: true,
        gallery: {
            enabled: false
        },
        
    });
});