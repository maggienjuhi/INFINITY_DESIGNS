var LUMPS = {"moo-core":["moo\/_ravenReporter","moo\/log","moo-core","underscore","moo\/async","moo\/strict","moo\/onLoadEvents","mustache","templating\/templating","basilisk","moo\/environment","service\/environment","service\/releaseKey","cms\/splat","cms\/cms","service\/cms","templating\/force-fail","service\/templating","templating\/templating-jquery","moo\/link","moo\/data","moo\/side","moo\/pack","moo\/pack\/json","moo\/measurement\/measurement","moo\/measurement\/json","moo\/measurement\/measurementService","moo\/measurement","URI","moo\/api","moo\/pack\/derive","domReady","backbone"],"jquery-ui":["jquery-ui","jquery.ui.mouse","jquery.ui.position","jquery.ui.widget","jquery.ui.draggable","jquery.ui.droppable"],"integrations\/integrations":["integrations\/components","image-library\/source","integrations\/etsy","integrations\/facebook","integrations\/flickr","integrations\/picasa","integrations\/qrcodes","integrations\/smugmug","swfupload","image-library\/swfUploader","integrations\/uploader","integrations\/instagram","integrations\/integrations","image-library\/imageBasketItemValidator","image-library\/imageBasketComponent","image-library\/imageLibraryControls","image-library\/guidelines","image-library\/dragManager","image-library\/imageLibrary","image-library\/ImageLibraryBootstrap","image-library\/ImageLibraryAPI"],"app\/canvas\/externalInterface":["app\/canvas\/externalInterface"],"checkout\/checkout":["checkout\/DiscountOverlay","checkout\/checkout"],"checkout\/shipping-address":["postcode-anywhere\/captureplus-2.30","checkout\/postcode-anywhere","checkout\/postcode-anywhere-addresses","checkout\/shipping-address"]};
/* global LUMPS */
var lumps = (typeof LUMPS !== 'undefined') ? LUMPS : {},
    paths = {
        'jquery': '/javascript/compiled/jquery',
        'jquery.moo.signInSignUp': '/javascript/compiled/signin',
        'jquery.moo.iframeWirings': '/javascript/compiled/signin',
        'jquery.moo.validation': '/javascript/jquery/jquery.moo.validation',
        'jquery.cookie': '/javascript/jquery/jquery.cookie',
        'react': '/bower_components/react/react-with-addons.min',
        'scrollspy': '/bower_components/moo-toolkit/dist/javascript/shims/bootstrap-scrollspy/scrollspy',
        'jquery.scrollTo': '/bower_components/jquery.scrollTo/jquery.scrollTo'
    },
    k,
    i,
    qtagUrl = '',
    matches;

for (k in lumps) {
    if (lumps.hasOwnProperty(k)) {
        for (i = 0; i < lumps[k].length; i += 1) {
            paths[lumps[k][i]] = k;
        }
    }
}

if (typeof $ !== 'undefined') {
    if (($('script[src*="?q="]').first().attr('src'))) {
        matches = ($('script[src*="?q="]').first().attr('src')).match(/q=(.*)$/);
        if (matches) {
            qtagUrl = 'q=' + matches[1];
        }
    }
}

require.config({
    baseUrl: "/libjs/",
    paths: paths,

    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            deps: [],
            exports: '_'
        },
        'json2': {
            deps: [],
            exports: 'JSON'
        },
        'jquery.moo.signInSignUp': ['jquery', 'jquery.moo.iframeWirings'],
        'jquery.moo.iframeWirings': ['jquery'],
        'jquery-plugins/jquery.chosen': {
            deps: ['jquery'],
            exports: '$.fn.chosen'
        },
        'ui-core/jquery.ui.mooFancySelect': {
            deps: ['jquery'],
            exports: '$.fn.fancySelect'
        },
        'postcode-anywhere/captureplus-2.30': {
            exports: 'pca'
        }
    },

    waitSeconds: 20,
    urlArgs: qtagUrl
});
