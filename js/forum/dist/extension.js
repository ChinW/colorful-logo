System.register('chin/colorful-logo/main', ['flarum/components/TextEditor', 'flarum/components/IndexPage', 'flarum/components/DiscussionHero', 'flarum/components/Button', 'flarum/extend', 'flarum/tags/utils/sortTags'], function (_export) {
    'use strict';

    var TextEditor, IndexPage, DiscussionHero, Button, extend, sortTags;
    return {
        setters: [function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor['default'];
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage['default'];
        }, function (_flarumComponentsDiscussionHero) {
            DiscussionHero = _flarumComponentsDiscussionHero['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags['default'];
        }],
        execute: function () {

            app.initializers.add('chin-colorful-logo', function () {

                function inArray(needle, haystack) {
                    var length = haystack.length;
                    for (var i = 0; i < length; i++) {
                        if (haystack[i] == needle) return true;
                    }
                    return false;
                }

                var imageSrc = "/assets/Logo.svg",
                    hostname = window.location.hostname.substr(0, 5);

                //if hostname is eqaul to local/192.1/127.0,
                //use another image address for develop purpose
                if (inArray(hostname, ["local", "192.1", "127.0"])) {
                    imageSrc = "/JSnowBBS/assets/Logo.svg";
                }

                document.getElementById("home-link").innerHTML = "<object id='colorful-logo' class='colorful-logo' data='" + imageSrc + "' type='image/svg+xml'></object>";

                function changeColor(color) {
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
            });
        }
    };
});