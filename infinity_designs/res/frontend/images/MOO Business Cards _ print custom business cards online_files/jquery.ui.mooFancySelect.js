/**
 * MOO Fancy Select
 *
 * This jQuery UI widget takes a normal, bog-standard, plain and boring select element and transforms it into
 * something beautiful and oh-so fancy.
 *
 * Note that the underlying select drives what the widget displays, including updates.
 * When a user selects an option from within the widget, the corresponding option on the original select is marked as
 * the selected option and the change event is fired. The widget is bound to the change event, and is updated to
 * represent the newly selected item. This should maintain sync between the select and the widget at all times.
 *
 ** Usage
 *
 * jQuery Widget API - create:
 *  To create a new widget
 *    $(mySelector).fancySelect(options);
 *  E.g.
 *    $('select.paperType').fancySelect({flyoutStyle: bubble});
 *
 ** Methods:
 *
 *  jQuery Widget API provides several methods:
 *
 *  - enable
  *    $(mySelector).fancySelect("enable");
 *
 *  - disable
 *    $(mySelector).fancySelect("disable");
 *
 *  - destroy
 *    $(mySelector).fancySelect("destroy");
 *
 ** General Options:
 *
 * - fixedWidth:boolean if the button expands to the width of the widest option (default true)
 * - icon:boolean       if an empty .icon element should be inserted into each option
 *
 * Note: classes on the <option> element will be copied to the pretty div that represents it. In combination with the
 * icon option, you can easily apply sprite-based images to each item.
 *
 ** Style Options:
 *
 * - flyoutStyle: the look and feel of the dropdown or flyout part of the control
 *      - standard (default)    - standard drop down, like a normal select
 *      - bubble                - looks like a thought bubble or tooltip with an arrow and rounded corners
 */
define(function (require) {
    'use strict';

    var $ = require('jquery'),

        uuid = 0,
        // static constants
        FLYOUT_POSITION_SETTINGS,
        ANCHOR_POSITION_SETTINGS,
        CLASS_MAP;

    require('jquery-ui');

    FLYOUT_POSITION_SETTINGS = {
        standard:   {
            my: 'middle top',
            at: 'middle bottom',
            collision: 'none'
        },
        bubble:     {
            my: 'left top',
            at: 'left-34 bottom+18',
            collision: 'none'
        }
    };

    ANCHOR_POSITION_SETTINGS = {
        top: {
            at: 'left bottom+8'
        },
        bottom: {
            at: 'left top-19'
        }
    };

    // static map of options to classes
    CLASS_MAP = {
        flyoutStyle: {
            standard:   'flyout-standard',
            bubble:     'flyout-bubble'
        }
    };

    $.widget("ui.fancySelect", {

        $select: null,
        $el: null,
        isShown: false,

        // default options
        options: {
            // core
            disabled: false,

            icon: false,
            fixedWidth: true,
            flyoutStyle:  'standard',

            // animation
            duration: 10
        },

        /**
         * @private
         */
        _create: function () {
            // check we do have a select element
            if (!this.element.is('select')) {
                throw "fancySelect requires a select element";
            }

            // initial element setup
            this.$select = this.element;
            this.$el = $('<div />').attr('id', 'fancy-select-id-' + uuid++).attr('class', this.$select.data('class'));
            this.$select.after(this.$el);
            this.$select.css({
                'position': 'absolute',
                'opacity': 0
            });

            // now render the main control
            this._render();

            // and bind events
            this._bind();
        },

        /**
         * @private
         */
        _render: function () {
            this.$el.addClass('fancy-select');
            this.$el.append(this._renderButton());
            this.$el.append(this._renderFlyout());

            this._syncSelectedItem();

            this._positionFlyout();
            this._renderSize();
        },

        /**
         * Fiddle with the size. Useful to call regularly, incase it initialises with the wrong values.
         * @private
         */
        _renderSize: function () {
            if (this.options.fixedWidth) {
                var width = this.$el.find('li > a:first').width(),
                    $selectedItem = this.$el.find('.selected-item'),
                    currentMinWidth = parseInt($selectedItem.css('min-width'), 10) || 0;
                if (!currentMinWidth || width > currentMinWidth) {
                    $selectedItem.css('min-width', width + 'px');
                }
            }
        },

        /**
         * Draw the button.
         * @private
         */
        _renderButton: function () {
            var $button = $('<div />').addClass('fancy-button'),
                $selectedItem = $('<div />').addClass('selected-item'),
                $handle = $('<span />').addClass('handle');

            return $button.append($selectedItem, $handle);
        },

        /**
         * Render the flyout.
         * @private
         */
        _renderFlyout: function () {
            var $flyout = $('<div />').addClass('flyout').addClass(CLASS_MAP.flyoutStyle[this.options.flyoutStyle]),
                $anchor;

            if (this.options.flyoutStyle === "bubble") {
                $anchor = $('<span />').addClass('flyout-anchor');
                $flyout.append($anchor);
            }

            return $flyout.append(this._renderOptionList());
        },

        /**
         * Render the options inside the flyout.
         * @private
         */
        _renderOptionList: function () {
            var $list = $('<ul />').addClass('options'),
                self = this,
                options = this.$select.find('option');

            options.each(function (i, option) {
                $list.append(self._renderOption($(option), i, options.length));
            });

            return $list;
        },

        /**
         * Render each individual item.
         * @param {element} $option
         * @param {int} i position in list
         * @param {int} totalItems total number of options
         * @return {*}
         * @private
         */
        _renderOption: function ($option, i, totalItems) {
            var $item = $('<li />'),
                $link = $('<a />').attr({
                    href: '#',
                    title: $option.text()
                });

            if (i === 0) {
                $item.addClass('first-option');
            }

            if (i === totalItems - 1) {
                $item.addClass('last-option');
            }

            $link.append(this._renderContent($option));

            return $item.data('value', $option.val()).append($link);
        },

        /**
         * Build the content for an option.
         * @param $option the option to get data from
         * @return {*}
         * @private
         */
        _renderContent: function ($option) {
            var $content = $('<div />'),
                $text = $('<span />').addClass('content-text');

            $content.attr('class', $option.attr('class')).addClass('content-wrapper');

            if (this.options.icon) {
                $('<span>&nbsp</span>').addClass('icon').appendTo($content);
            }

            $text.append($option.text());
            return $content.append($text);
        },

        /**
         * Trigger the flyout on or off.
         * @private
         */
        _toggleFlyout: function () {
            if (!this.isShown) {
                this._renderSize();
                this._showFlyout();
            } else {
                this._hideFlyout();
            }
        },

        /**
         * Show the flyout.
         * @private
         */
        _showFlyout: function () {
            var $flyout = this.$el.find('.flyout');

            if (!this.isShown) {
                this._positionFlyout();

                $flyout.css({
                    visibility: 'visible'
                });
                this.isShown = true;

                $(document).on('mousedown', $.proxy(this._checkExternalClick, this));
            }
        },

        /**
         * Hide the flyout.
         * @private
         */
        _hideFlyout: function () {
            var $flyout = this.$el.find('.flyout');

            if (this.isShown) {
                $flyout.css({
                    visibility: 'hidden'
                });
                this.isShown = false;

                $(document).off('mousedown', $.proxy(this._checkExternalClick, this));
            }
        },

        /**
         * Put the flyout in the correct position.
         * @private
         */
        _positionFlyout: function () {
            var $of,
                $flyout = this.$el.find('.flyout'),
                $anchor = $flyout.find('.flyout-anchor'),
                settings,
                anchorSettings;

            if (this.options.flyoutStyle === 'bubble') {
                $of = this.$el.find('.handle');
            } else {
                $of = this.$el.find('.fancy-button');
            }

            settings = $.extend({}, FLYOUT_POSITION_SETTINGS[this.options.flyoutStyle], {
                of: $of
            });

            $flyout.css({
                visibility: 'hidden'
            });

            $flyout.position(settings);

            if ($anchor[0]) {
                // set the anchor class as up or down
                if ($flyout.position().top >= 0) {
                    $anchor.removeClass('flyout-anchor-bottom');
                    $anchor.addClass('flyout-anchor-top');
                    anchorSettings = $.extend({}, settings, ANCHOR_POSITION_SETTINGS.top);

                } else {
                    $anchor.removeClass('flyout-anchor-top');
                    $anchor.addClass('flyout-anchor-bottom');
                    anchorSettings = $.extend({}, settings, ANCHOR_POSITION_SETTINGS.bottom);
                }
            }

            $anchor.position(anchorSettings);
        },

        // SYNC METHODS

        /**
         * Read the selected item from the select & apply it to our widget
         * @private
         */
        _syncSelectedItem: function () {
            var $selectedOption = this.$select.find(':selected') || this.$select.find(':first');

            // set the selected option as the fancy button
            this.$el.find('.selected-item').html(this._renderContent($selectedOption, true));

            // remove the selected class from the list
            this.$el.find('.flyout li').removeClass('selected');
            this.$el.find('.flyout .selected-marker').remove();
            // set the selected class on the list item which has the correct value
            this.$el.find('.flyout li').filter(function (i, e) {
                return $(e).data('value') === $selectedOption.val();
            }).addClass('selected').append($('<span />').addClass('selected-marker'));
        },

        /**
         * @param e
         * @private
         */
        _onButtonClick: function (e) {
            e.preventDefault();
            this._toggleFlyout();
        },

        /**
         * @param e
         * @private
         */
        _onOptionClick: function (e) {
            e.preventDefault();
            var selectedItem;

            // close the flyout
            this._hideFlyout();

            // find the option that was chosen
            selectedItem = $(e.target).is('li') ? $(e.target) : $(e.target).parents('li');

            // unset the currently selected item in the original select
            this.$select.find('option').prop('selected', false);

            // set the new option as chosen on the original select
            this.$select.find('option').filter(function (i, e) {
                //may want to use $.trim in here
                return $(e).val() === selectedItem.data('value');
            }).prop('selected', true);
            // fire change on select so that sync happens
            this.$select.trigger('change');
        },

        /**
         * @private
         */
        _bind: function () {
            // $(document).on('mousedown', $.proxy(this._checkExternalClick, this));

            // button bindings
            this.$el.find('.fancy-button').on('click',        $.proxy(this._onButtonClick, this));

            // flyout option bindings
            this.$el.find('.flyout ul li').on('click',        $.proxy(this._onOptionClick, this));

            $(window).on("orientationchange", $.proxy(this._hideFlyout, this));
            // TODO - keyboard

            // bind to the underlying select, this drives the widget and keeps the widget up to date
            this.$select.on('change', $.proxy(this._syncSelectedItem, this));
        },

        /**
         * @private
         */
        _unbind: function () {
            // button bindings
            this.$el.find('.fancy-button').off('click',        $.proxy(this._onButtonClick, this));

            // flyout option bindings
            this.$el.find('.flyout ul li').off('click',        $.proxy(this._onOptionClick, this));

            $(window).off("orientationchange", $.proxy(this._hideFlyout, this));
            // TODO - keyboard

            // bind to the underlying select, this drives the widget and keeps the widget up to date
            this.$select.off('change', $.proxy(this._syncSelectedItem, this));
        },

        // check the click is external and we are shown
        _checkExternalClick: function (e) {
            var $parentFancy = $(e.target).parents('.fancy-select');

            if (this.isShown && (!$parentFancy[0] || this.$el.attr('id') !== $parentFancy.attr('id'))) {
                this._hideFlyout();
            }
        },

        // WIDGET API METHODS
        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this, arguments);
            // remove classes
            this.$el.removeClass('fancy-select');

            // unbind
            this._unbind();

            // remove
            this.$el.remove();
            this.$select.show();
        },

        disable: function () {
            $.Widget.prototype.disable.call(this, arguments);
            // unbind
            this._unbind();
        },

        enable: function () {
            $.Widget.prototype.enable.call(this, arguments);
            // bind
            this._bind();
        }
    });
});