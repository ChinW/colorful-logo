System.register('chin/colorful-logo/components/HeaderPrimary', ['flarum/app', 'flarum/Component', 'flarum/components/IndexPage', 'flarum/components/DiscussionHero', 'flarum/extend', 'flarum/tags/utils/sortTags'], function (_export) {
    'use strict';

    var app, Component, IndexPage, DiscussionHero, extend, sortTags, HeaderPrimary;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage['default'];
        }, function (_flarumComponentsDiscussionHero) {
            DiscussionHero = _flarumComponentsDiscussionHero['default'];
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags['default'];
        }],
        execute: function () {
            HeaderPrimary = (function (_Component) {
                babelHelpers.inherits(HeaderPrimary, _Component);

                function HeaderPrimary() {
                    babelHelpers.classCallCheck(this, HeaderPrimary);
                    babelHelpers.get(Object.getPrototypeOf(HeaderPrimary.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(HeaderPrimary, [{
                    key: 'init',
                    value: function init() {
                        this.imageSrc = app.forum.attribute('chin.colorful-logo.imageUrl');
                        console.log(this.imageSrc);
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        // const imageSrc = app.forum.attribute('chin.colorful-logo.imageUrl') ? app.forum.attribute('chin.colorful-logo.imageUrl') : '/';

                        return m('object', { id: 'colorful-logo', 'class': 'colorful-logo', data: this.imageSrc, type: 'image/svg+xml' });
                    }
                }, {
                    key: 'config',
                    value: function config() {

                        var changeColor = this.changeColor;

                        extend(DiscussionHero.prototype, 'view', function (view) {
                            var tags = sortTags(this.props.discussion.tags());

                            if (tags && tags.length) {
                                var color = tags[0].color();
                                if (color) {
                                    changeColor(color);
                                }
                            }
                        });

                        extend(IndexPage.prototype, "hero", function () {
                            var tag = this.currentTag();
                            if (tag) {
                                changeColor(tag.color());
                                // return TagHero.component({tag});
                            } else {
                                    // debugger;
                                    changeColor(null);
                                }
                        });

                        extend(IndexPage.prototype, "sidebarItems", function () {
                            var tag = this.currentTag();
                            if (tag) {
                                changeColor(tag.color());
                            } else {
                                // debugger;
                                changeColor(null);
                            }
                        });
                    }
                }, {
                    key: 'changeColor',
                    value: function changeColor(color) {
                        var doc = document.getElementById("colorful-logo").getSVGDocument();
                        // console.log("in changeColor");
                        if (doc) {
                            // console.log("in doc")
                            var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>
                            if (color) {
                                // console.log(rect)
                                rect[0].setAttribute("style", "fill:" + color + " !important");
                                rect[1].setAttribute("style", "fill:" + color + " !important");
                            } else {
                                rect[0].setAttribute("style", "");
                                rect[1].setAttribute("style", "");
                            }
                        }
                    }
                }]);
                return HeaderPrimary;
            })(Component);

            _export('default', HeaderPrimary);
        }
    };
});;
System.register('chin/colorful-logo/main', ['flarum/components/IndexPage', 'flarum/components/DiscussionHero', 'flarum/extend', 'flarum/app', 'flarum/components/HeaderPrimary', 'flarum/tags/utils/sortTags'], function (_export) {
    'use strict';

    var IndexPage, DiscussionHero, extend, app, HeaderPrimary, sortTags;
    return {
        setters: [function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage['default'];
        }, function (_flarumComponentsDiscussionHero) {
            DiscussionHero = _flarumComponentsDiscussionHero['default'];
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsHeaderPrimary) {
            HeaderPrimary = _flarumComponentsHeaderPrimary['default'];
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags['default'];
        }],
        execute: function () {

            app.initializers.add('chin/colorful-logo', function () {

                extend(HeaderPrimary.prototype, 'init', function () {

                    var imageSrc = app.forum.attribute('chin.colorful-logo.imageUrl');

                    //if hostname is equal to local/192.1/127.0,
                    //use another image address for develop purpose
                    if (inArray(window.location.hostname.substr(0, 5), ["local", "192.1", "127.0"])) {
                        imageSrc = app.forum.attribute('chin.colorful-logo.imageUrl_development') || imageSrc;
                    }

                    document.getElementById("home-link").innerHTML = '<object id="colorful-logo" class="colorful-logo" data="' + imageSrc + '" type="image/svg+xml"></object>';
                });

                extend(DiscussionHero.prototype, 'view', function (view) {
                    var tags = sortTags(undefined.props.discussion.tags());

                    if (tags && tags.length) {
                        var color = tags[0].color();
                        if (color) {
                            changeColor(color);
                        }
                    }
                });

                extend(IndexPage.prototype, "hero", function () {
                    var tag = undefined.currentTag();
                    if (tag) {
                        changeColor(tag.color());
                        // return TagHero.component({tag});
                    } else {
                            // debugger;
                            changeColor(null);
                        }
                });

                extend(IndexPage.prototype, "sidebarItems", function () {
                    var tag = undefined.currentTag();
                    if (tag) {
                        changeColor(tag.color());
                    } else {
                        // debugger;
                        changeColor(null);
                    }
                });

                function changeColor(color) {
                    var doc = document.getElementById("colorful-logo").getSVGDocument();
                    // console.log("in changeColor");
                    if (doc) {
                        // console.log("in doc")
                        var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>

                        if (color && rect.length) {
                            for (var i = 0; i < rect.length; i++) {
                                rect[i].setAttribute("style", "fill:" + color + " !important");
                            }
                        } else {
                            for (var i = 0; i < rect.length; i++) {
                                rect[i].setAttribute("style", "");
                            }
                        }
                    }
                }

                function inArray(needle, haystack) {
                    var length = haystack.length;
                    for (var i = 0; i < length; i++) {
                        if (haystack[i] == needle) return true;
                    }
                    return false;
                }
            });
        }
    };
});