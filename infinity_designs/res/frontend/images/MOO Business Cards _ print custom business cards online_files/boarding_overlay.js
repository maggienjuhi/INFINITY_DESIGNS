/*global require, window, dataLayer */

require(['jquery'], function ($) {
    "use strict";

    $(document).ready(function () {
        var $overlay = $('.boardingOverlay'),
            initialised = false,
            trackBoarding;

        // google analytics, track opening of boarding
        trackBoarding = function () {
            var pageUrl = '/customPageView/flow/board';

            if (pageUrl !== null && dataLayer) {
                dataLayer.push({
                    'event' : 'trackPageview',
                    'pageviewUrl' : pageUrl
                });
            }

        };

        $(document).on('click', '.boardingOverlayTriggerPdp', function (event) {
            // does the same as the other Boarding Overlay Trigger but puts in the links to the design templates pages.
            event.preventDefault();

            if (!initialised) {
                $overlay.mooOverlay({ fixed: false, closeOnClick: false, load: false });
                initialised = true;
            }

            // Set the correct links for the chosen product, they are stored near the trigger button
            var $links = $(this).parent().parent().find('.boardingLinksPdp');
            $overlay.find('.buildYourOwn a').attr('href', $links.find('.buildYourOwn a').attr('href'));
            $overlay.find('.buildYourOwn a').attr('rel', $links.find('.buildYourOwn a').attr('rel') || "");
            $overlay.find('.completeDesign a').attr('href', $links.find('.completeDesign a').attr('href'));
            $overlay.find('.completeDesign a').attr('rel', $links.find('.completeDesign a').attr('rel') || "");
            $overlay.find('.button3 a').attr('href', $links.find('.button3 a').attr('href'));
            $overlay.find('.button3 a').attr('rel', $links.find('.button3 a').attr('rel') || "");
            $overlay.find('.button4 a').attr('href', $links.find('.button4 a').attr('href'));
            $overlay.find('.button4 a').attr('rel', $links.find('.button4 a').attr('rel') || "");
            $overlay.find('.button5 a').attr('href', $links.find('.button5 a').attr('href'));
            $overlay.find('.button5 a').attr('rel', $links.find('.button5 a').attr('rel') || "");

            $overlay.overlay().load();
            trackBoarding();
        });

        $(document).on('click', '.boardingOverlayTrigger', function (event) {
            event.preventDefault();
            if (!initialised) {
                $overlay.mooOverlay({ fixed: false, closeOnClick: false, load: false });
                initialised = true;
            }

            // Set the correct links for the chosen product, they are stored near the trigger button
            var $links = $(this).parent().parent().find('.boardingLinks');
            $overlay.find('.buildYourOwn a').attr('href', $links.find('.buildYourOwn a').attr('href'));
            $overlay.find('.buildYourOwn a').attr('rel', $links.find('.buildYourOwn a').attr('rel') || "");
            $overlay.find('.completeDesign a').attr('href', $links.find('.completeDesign a').attr('href'));
            $overlay.find('.completeDesign a').attr('rel', $links.find('.completeDesign a').attr('rel') || "");
            $overlay.find('.button3 a').attr('href', $links.find('.button3 a').attr('href'));
            $overlay.find('.button3 a').attr('rel', $links.find('.button3 a').attr('rel') || "");
            $overlay.find('.button4 a').attr('href', $links.find('.button4 a').attr('href'));
            $overlay.find('.button4 a').attr('rel', $links.find('.button4 a').attr('rel') || "");
            $overlay.find('.button5 a').attr('href', $links.find('.button5 a').attr('href'));
            $overlay.find('.button5 a').attr('rel', $links.find('.button5 a').attr('rel') || "");

            $overlay.overlay().load();
            trackBoarding();
        });
    });
});