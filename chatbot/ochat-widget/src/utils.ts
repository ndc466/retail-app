/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 * @author Yuri Panshin
 */

export class Utils {
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    linkify(inputText: string, embeddedVideo: boolean) {
        let replacedText, replacePattern1, replacePattern2, replacePattern3;

        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

        replacedText = inputText.replace(replacePattern1, (match, $1, $2) => {
            let id = embeddedVideo ? this.getYouTubeVideoId($1) : null;
            if (id) {
                return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>'
            } else {
                return '<a href="' + $1 + '" target="_blank">' + $1 + '</a>';
            }
        });

        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        replacedText = replacedText.replace(replacePattern2, (match, $1, $2) => {
            let id = embeddedVideo ? this.getYouTubeVideoId('http://' + $2) : null;
            if (id) {
                return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>'
            } else {
                return $1 + '<a href="http://' + $2 + '" target="_blank">' + $2 + '</a>';
            }
        });

        return replacedText;
    }

    getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return null;
        }
    }

}
