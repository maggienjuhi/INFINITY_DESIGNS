/**
 * {javascript src="/javascript/jquery/jquery.moo.moosletter-overlay.js"}
 *
 * Exposes function for Optimizely to call to show the lightbox
 *
 * Dependencies:
 *  js:  /javascript/jquery/jquery.moo.iframeWirings.js
 */
window.showMoosLetter = function () {
    'use strict';
    require(['jquery'], function ($) {
        $.fn.moosletterOverlay();
        $(function () {
            $('body').bind('onbeforeload.mooIframeOverlay', function (event, data) {
                var $container;

                if (data.type === 'newsletterOverlay') {
                    $container = $("#mooIframeOverlayContainer");
                    $container.addClass('newsletter-iframe-container');
                    $container.find('a.close').attr('data-webdriver-automation-id', 'newsletter-overlay-close-link');
                }
            });
        });
    });
};