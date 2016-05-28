import TextEditor from 'flarum/components/TextEditor';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionHero from 'flarum/components/DiscussionHero';
import Button from 'flarum/components/Button';
import {extend} from "flarum/extend";

import sortTags from 'flarum/tags/utils/sortTags';

app.initializers.add('chin-colorful-logo', function() {
    
    function inArray(needle, haystack) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    }
    
    var imageSrc = "/assets/Logo.svg",
        hostname = window.location.hostname.substr(0, 5);

    //if hostname is eqaul to local/192.1/127.0,
    //use another image address for develop purpose
    if(inArray(hostname, ["local", "192.1", "127.0"])){
        imageSrc = "/JSnowBBS/assets/Logo.svg"
    }

    document.getElementById("home-link").innerHTML = "<object id='colorful-logo' class='colorful-logo' data='"+imageSrc+"' type='image/svg+xml'></object>"
    
    function changeColor(color){
        var doc = document.getElementById("colorful-logo").getSVGDocument();
        console.log("in changeColor");
        if(doc){
            // console.log("in doc")
          var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>
          if(color){
            // console.log(rect)
            rect[0].setAttribute("style", "fill:"+color+" !important");
            rect[1].setAttribute("style", "fill:"+color+" !important");
          }else{
            rect[0].setAttribute("style", "");
            rect[1].setAttribute("style", "");
          }
        }
    }

    extend(DiscussionHero.prototype, 'view', function(view) {
        const tags = sortTags(this.props.discussion.tags());

        if (tags && tags.length) {
          const color = tags[0].color();
          if (color) {
            changeColor(color);
          }
        }
    });

    extend(IndexPage.prototype, "hero", function(){
        const tag = this.currentTag();
        if (tag) {
          changeColor(tag.color())
          // return TagHero.component({tag});
        }else{
            // debugger;
            changeColor(null)
        }
    });

    extend(IndexPage.prototype, "sidebarItems", function(){
        const tag = this.currentTag();
        if (tag) {
            changeColor(tag.color())
        }else{
            // debugger;
            changeColor(null)
        }
    });
});