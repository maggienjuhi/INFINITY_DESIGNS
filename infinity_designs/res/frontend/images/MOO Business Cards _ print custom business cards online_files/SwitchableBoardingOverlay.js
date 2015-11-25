/*global require, window, document, URI, dataLayer */

define(function (require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        defaults = {
            mode: "full",
            preselect: ""
        },
        pdpLinkMap = {
            base: "/(moo-size-)?business-cards",
            businesscard: "/moo-size-business-cards",
            businesscard_us: "/standard-size-business-cards"
        },

        SwitchableBoardingOverlay;

    SwitchableBoardingOverlay = function ($element, options) {
        this._settings = $.extend(defaults, options);
        this._initialised = false;
        this._$el = $element;

        this._initialise();
    };

    _.extend(SwitchableBoardingOverlay.prototype, {
        _initialise: function () {
            if (this._settings.mode === "compact") {
                $(".comparison-header, .comparison-body", this._$el).hide();
                this._enable();
            }

            this._bindTrigger();
        },

        _bindTrigger: function () {
            var self = this,
                $selector,
                $triggers = $(".switchableBoardingOverlayTrigger"),
                productTypeName;

            $triggers.on("click", function (event) {
                event.preventDefault();

                if (!self._initialised) {
                    if (self._settings.preselect) {
                        $selector = $(".comparison-size-selectors .panel[data-product-type-name=\"" + self._settings.preselect + "\"]");
                        if ($selector.length) {
                            $selector.removeClass("inactive").addClass("active");
                            self._enable();
                            self._bindLinks($(event.target), $selector.data("product-type-name"), $selector.data("product-type-alias-name"));
                        }
                    }

                    self._$el.mooOverlay({ fixed: false, closeOnClick: false, load: false });
                    self._initialised = true;
                }

                self._$el.overlay().load();
                self._trackBoarding();

                if ($(event.target).hasClass("boardingOverlayTriggerOverride")) {
                    productTypeName = self._parseParam($(this).attr("href"), "productTypeName");
                    $selector = $(".comparison-size-selectors .panel[data-product-type-name=\"" + productTypeName + "\"]");
                    $(".comparison-size-selectors .panel", self._$el).removeClass("active").addClass("inactive");
                    $selector.removeClass("inactive").addClass("active");
                    self._enable();
                } else {
                    $selector = $(".comparison-size-selectors .panel.active");
                }

                if ($selector.length) {
                    self._bindLinks($(event.target), $selector.data("product-type-name"), $selector.data("product-type-alias-name"));
                    $selector = $(".panel-default").not(".active").addClass("inactive");
                }

                self._bindSelectors($(event.target));
            });
        },

        _bindSelectors: function ($trigger) {
            var self = this;

            $(".comparison-size-selectors .panel", this._$el).off().on("click", function (event) {
                var $selector = $(event.delegateTarget); // The panel where the click happened

                $(".comparison-size-selectors .panel", self._$el).removeClass("active").addClass("inactive");
                $selector.removeClass("inactive").addClass("active");
                self._enable();
                self._bindLinks($trigger, $selector.data("product-type-name"), $selector.data("product-type-alias-name"));
            });
        },

        _bindLinks: function ($trigger, productTypeName, productTypeAliasName) {
            var self = this,
                href,
                $boardingLinks = $(".boardingLinks");

            [".chooseDesign a", ".buildYourOwn a", ".completeDesign a"].forEach(function (cta, index) {
                href = $(cta, $boardingLinks).attr("href");

                if (cta === ".chooseDesign a") {
                    href = self._replacePath(href, productTypeName);
                } else {
                    href = self._replaceParam(href, "productTypeName", productTypeName);
                    href = self._replaceParam(href, "productTypeAliasName", productTypeAliasName);
                }

                // Set footer links
                $(".comparison-footer .col-4:nth-child(" + (index + 1) + ") a", self._$el)
                    .attr({
                        "href": href,
                        "rel": $(cta, $boardingLinks).attr("rel") || ""
                    });
            });
        },

        _enable: function () {
            $(".comparison-footer", this._$el).removeClass("disabled");
        },

        _replaceParam: function (href, param, value) {
            return URI(href).removeQuery(param).addQuery(param, value).toString();
        },

        _replacePath: function (href, productTypeName) {
            var pathname = URI(href).pathname(),
                re = new RegExp(pdpLinkMap.base, "g");

            return URI(href).pathname(pathname.replace(re, pdpLinkMap[productTypeName])).toString();
        },

        _parseParam: function (href, param) {
            return URI(href).search(true)[param];
        },

        _trackBoarding: function () {
            var pageUrl = '/customPageView/flow/board';

            if (pageUrl !== null && dataLayer) {
                dataLayer.push({
                    'event': 'trackPageview',
                    'pageviewUrl': pageUrl
                });
            }
        }
    });

    return SwitchableBoardingOverlay;
});
