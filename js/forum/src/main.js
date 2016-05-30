import IndexPage from 'flarum/components/IndexPage';
import DiscussionHero from 'flarum/components/DiscussionHero';
import {extend} from 'flarum/extend';
import app from 'flarum/app';

import HeaderPrimary from 'flarum/components/HeaderPrimary';

import sortTags from 'flarum/tags/utils/sortTags';

app.initializers.add('chin/colorful-logo', () => {

    extend(HeaderPrimary.prototype, 'init', () => {

        let imageSrc = app.forum.attribute('chin.colorful-logo.imageUrl');

        //if hostname is equal to local/192.1/127.0,
        //use another image address for develop purpose
        if (inArray(window.location.hostname.substr(0, 5), ["local", "192.1", "127.0"])) {
            imageSrc = app.forum.attribute('chin.colorful-logo.imageUrl_development') || imageSrc;
        }

        document.getElementById("home-link").innerHTML = '<object id="colorful-logo" class="colorful-logo" data="' + imageSrc + '" type="image/svg+xml"></object>';

    });

    extend(DiscussionHero.prototype, 'view', function (view) {
        const tags = sortTags(this.props.discussion.tags());

        if (tags && tags.length) {
            const color = tags[0].color();
            if (color) {
                changeColor(color);
            }
        }
    });

    extend(IndexPage.prototype, "hero", function () {
        const tag = this.currentTag();
        if (tag) {
            changeColor(tag.color())
            // return TagHero.component({tag});
        }else{
            // debugger;
            changeColor(null)
        }
    });

    extend(IndexPage.prototype, "init", function () {
        const tag = this.currentTag();
        if (tag) {
            changeColor(tag.color())
        }else{
            // debugger;
            changeColor(null)
        }
    });

    extend(IndexPage.prototype, "sidebarItems", function () {
        const tag = this.currentTag();
        if (tag) {
            changeColor(tag.color())
        }else{
            // debugger;
            changeColor(null)
        }
    });

    function changeColor(color) {
        var doc = document.getElementById("colorful-logo").getSVGDocument();
        // console.log("in changeColor");
        if (doc) {
            // console.log("in doc")
            var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>

            if (color && rect.length) {
                for (let i = 0; i < rect.length; i++) {
                    if (rect[i]) rect[i].setAttribute("style", "fill:"+color+" !important");
                }
            } else {
                for (let i = 0; i < rect.length; i++) {
                    if (rect[i]) rect[i].setAttribute("style", "");
                }
            }
        }
    }

    function inArray(needle, haystack) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    }

});
