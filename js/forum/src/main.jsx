import TextEditor from 'flarum/components/TextEditor';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionHero from 'flarum/components/DiscussionHero';
import Button from 'flarum/components/Button';
import {extend} from "flarum/extend";

import sortTags from 'flarum/tags/utils/sortTags';

app.initializers.add('chin-colorful-logo', function() {
  // alert('Hello, world!sss');
    document.getElementById("home-link").innerHTML = "<object id='colorful-logo' class='colorful-logo' data='/JSnowBBS/assets/Logo.svg' type='image/svg+xml'></object>"
    
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

    extend(TextEditor.prototype, "controlItems", function(items){
        // console.log(this.currentTag())   
        // items.add("header",
        //     Button.component({
        //         icon: "header",
        //         className: "Button Button--icon",
        //         onclick: sayHello
        //     })
        // )

        // items.add("Bold",
        //     Button.component({
        //         icon: "bold",
        //         className: "Button Button--icon",
        //         onclick: this.props.preview
        //     })
        // )
    })

    function sayHello(){
        // $('textarea').wysihtml5({
        //     toolbar: {
        //         "font-styles": false, //Font styling, e.g. h1, h2, etc. Default true
        //         "emphasis": true, //Italics, bold, etc. Default true
        //         "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
        //         "html": false, //Button which allows you to edit the generated HTML. Default false
        //         "link": false, //Button to insert a link. Default true
        //         "image": true, //Button to insert an image. Default true,
        //         "color": false, //Button to change color of font
        //         "blockquote": true, //Blockquote
        //         "size": "xs" //default: none, other options are xs, sm, lg
        //     },
        // });
        console.log("Hello")
    }
});