jQuery(function ($) {
    //lets find all the video box trigger images and make them on click replace the image with a player

    $('.video-trigger-link').click(function (event) {
        var image, width, height, videoHtml, matches, videoUrl, classString;

        videoRegex = /^(?:https?:)?\/\/player\.vimeo\.com\/video\/([0-9]+)$/;
        videoUrl = $(this).attr('href');
        matches = videoRegex.exec(videoUrl);

        if (matches != null && matches[1] != null) {

            image = $(this).children('img').eq(0);
            if (image) {
                //get the width
                width = image.width();
                height = image.height();
                classString = image.attr('class') !== undefined ? "class=\"" + image.attr('class') + "\"" : '';

                videoHtml = "<iframe id=\"vimeo-player\" " + classString +
                    " src=\"https://player.vimeo.com/video/" + matches[1] +
                    "?api=1&amp;autoplay=1&amp;player_id=vimeo-player\" width=\"" +
                    width + "\" height=\"" + height + "\" frameborder=\"0\"></iframe>";

                $(this).replaceWith(videoHtml);

            }

        }

        videoRegex = /^(?:https?:)?\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+).*$/;
        videoUrl = $(this).attr('href');
        matches = videoRegex.exec(videoUrl);
        if (matches != null && matches[1] != null) {
            image = $(this).children('img').eq(0);
            if (image) {
                //get the width
                width = image.width();
                height = image.height();
                classString = image.attr('class') !== undefined ? "class=\"" + image.attr('class') + "\"" : '';

                videoHtml = "<object " + classString + " width=\"" + width + "\" height=\"" + height + "\">" +
                    "<param name=\"movie\" value=\"http://www.youtube.com/v/" + matches[1] + "&amp;fs=1&amp;autoplay=1&amp;hd=1\"></param>" +
                    "<param name=\"allowFullScreen\" value=\"true\"></param>" +
                    "<param name=\"allowscriptaccess\" value=\"always\"></param>" +
                    "<embed src=\"https://www.youtube.com/v/" + matches[1] + "&amp;fs=1&amp;autoplay=1&amp;hd=1\" " +
                    "type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\"" +
                    "width=\"" + width + "\" height=\"" + height + "\"></embed></object>";

                $(this).replaceWith(videoHtml);
            }

        }
        return false;

    });


    var getOverlayEmbedHtml = function (videoUrl, videoTitle, w, h) {
        var videoRegex = /^(?:https?:)?\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+).*$/,
            width = typeof w === 'number' ? w : 640,
            height = typeof h === 'number' ? h : 385,
            videoKey,
            videoHtml,
            matches;

        matches = videoRegex.exec(videoUrl);
        if (matches != null && matches[1] != null) {
            videoKey = matches[1];
            document.createElement("div");
            videoHtml = "<h2 class=\"underline-dotted\">" + videoTitle + "</h2>" +
                "<object width=\"" + width + "\" height=\"" + height + "\">" +
                "<param name=\"movie\" value=\"http://www.youtube.com/v/" + videoKey + "?fs=1&amp;hl=en_US&autoplay=1\"></param>" +
                "<param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param>" +
                "<embed src=\"https://www.youtube.com/v/" + videoKey + "?fs=1&amp;hl=en_US&autoplay=1\"" +
                " type=\"application/x-shockwave-flash\"" +
                " allowscriptaccess=\"always\"" +
                " allowfullscreen=\"true\"" +
                " width=\"" + width + "\" height=\"" + (height - 25) + "\">" +
                "</embed>" +
                "</object>";
            return videoHtml;

        } else {

            videoRegex = /^(?:https?:)?\/\/player\.vimeo\.com\/video\/([0-9]+)$/;
            matches = videoRegex.exec(videoUrl);

            if (matches != null && matches[1] != null) {
                videoKey = matches[1];
                document.createElement("div");

                videoHtml = "<iframe id=\"vimeo-player\" src=\"https://player.vimeo.com/video/" + videoKey +
                    "?api=1&amp;autoplay=1&amp;player_id=vimeo-player\" width=\"" + width +
                    "\" height=\"" + (height - 25) +
                    "\" frameborder=\"0\"></iframe>";

                return videoHtml;
            } else {

                return "";
            }
        }
    };

    var overlay, $overlay;
    $('.video-overlay-link').click(function (e) {
        var videoUrl = $(this).attr('href'),
            videoTitle = $(this).attr('title'),
            width = $(this).find('.video-attributes').data('width'),
            height = $(this).find('.video-attributes').data('height');
        e.preventDefault();

        if (!overlay) {
            $overlay = $('<div />').addClass('moo-overlay-container');
            overlay = $overlay.mooOverlay({
                fixed: true,
                load: false,
                onClose: function () {
                    $overlay.find('iframe').remove();
                }
            }).overlay();
        }

        $overlay.append(getOverlayEmbedHtml(videoUrl, videoTitle, width, height));
        overlay.load();
    });
});