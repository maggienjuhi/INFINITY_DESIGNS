jQuery(function ($) {
    $('.widget-tabs').each(function () {
        var height = 0;
        var startFrom = 0;
        $(this).find('.tabs .tabs-navigation li').each(function (index) {
            if ($(this).hasClass('active')) {
                startFrom = index;
                $(this).removeClass('active');
            }
            height = Math.max(height, $(this).height());
        });
        $(this).find('.tabs .tabs-navigation li').css('height', height);

        $(this).find('.tabs .tabs-navigation').tabs(
            $(this).find('.tabs .tabs-content-panes .tabs-content-pane'), {
                initialIndex:startFrom,
                tabs:'li'
            }
        );

    });
});
