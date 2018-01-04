export const widgetStyle = ''+
'<style>'+
'    .ochat-widget{'+
'        background-color: #fff;'+
'        font-family: "Roboto", "Helvetica Neue", sans-serif;'+
'        font-size: 18px;'+
'        position: fixed;'+
'        z-index: 10;'+
'        display: block;'+
'        width: 300px;'+
'        height: 400px;'+
'        border: 1px solid #ddd;'+
'        border-radius: 4px;'+
'        box-shadow(0 1px 1px rgba(0,0,0,.05));'+
'        box-sizing: border-box;'+
'        -webkit-tap-highlight-color: transparent;'+
'        -webkit-touch-callout: none;'+
'        -webkit-transition: height .5s linear;'+
'        -moz-transition: height .5s linear;'+
'        -ms-transition: height .5s linear;'+
'        -o-transition: height .5s linear;'+
'        transition: height .5s linear;'+
'    }'+
'    .ochat-widget.ochat-widget-mini{'+
'        height: 50px;'+
'    }'+
''+
'    #ochat_loading{'+
'        display: none;'+
'        z-index: 10001;'+
'        position: absolute;'+
'        top: 0;'+
'        right: 0;'+
'        bottom: 0;'+
'        left: 0;'+
'        display: -webkit-flex;'+
'        display: -ms-flexbox;'+
'        display: flex;'+
'        -webkit-align-items: center;'+
'        -ms-flex-align: center;'+
'        align-items: center;'+
'        -webkit-justify-content: center;'+
'        -ms-flex-pack: center;'+
'        justify-content: center;'+
'        contain: strict;'+
'    }'+
'    .ochat-backdrop{'+
'        opacity: 0.5;'+
'        position: absolute;'+
'        top: 0;'+
'        left: 0;'+
'        z-index: 2;'+
'        display: block;'+
'        width: 100%;'+
'        height: 100%;'+
'        background-color: #000;'+
'        -webkit-transform: translateZ(0);'+
'        transform: translateZ(0);'+
'    }'+
'    .ochat-loading-wrapper{'+
'        padding: 15px;'+
'        max-width: 280px;'+
'        max-height: 90%;'+
'        border-radius: 2px;'+
'        color: rgba(0, 0, 0, 0.5);'+
'        background: #fafafa;'+
'        box-shadow: 0 16px 20px rgba(0, 0, 0, 0.4);'+
'        z-index: 10;'+
'        display: -webkit-flex;'+
'        display: -ms-flexbox;'+
'        display: flex;'+
'        -webkit-align-items: center;'+
'        -ms-flex-align: center;'+
'        align-items: center;'+
'    }'+
'    #ochat_loading_content{'+
'        margin-left: 16px;'+
'    }'+
'    .ochat-spinner{'+
'        position: relative;'+
'        display: inline-block;'+
'        width: 28px;'+
'        height: 28px;'+
'    }'+
'    .ochat-spinner svg{'+
'        animation-duration: 750ms;'+
'        -webkit-animation: spinner-rotate 1s linear infinite;'+
'        animation: spinner-rotate 1s linear infinite;'+
'        overflow: hidden;'+
'        position: absolute;'+
'        top: 0;'+
'        left: 0;'+
'        width: 100%;'+
'        height: 100%;'+
'        -webkit-transform: translateZ(0);'+
'        transform: translateZ(0);'+
'    }'+
'    .ochat-spinner circle{'+
'        stroke: #387ef5;'+
'        fill: transparent;'+
'        stroke-width: 4px;'+
'        stroke-dasharray: 128px;'+
'        stroke-dashoffset: 82px;'+
'    }'+
''+
'    @-webkit-keyframes spinner-rotate {'+
'        0% {'+
'            -webkit-transform: rotate(0deg);'+
'            transform: rotate(0deg);'+
'        }'+
'        100% {'+
'            -webkit-transform: rotate(360deg);'+
'            transform: rotate(360deg);'+
'        }'+
'    }'+
'    @keyframes spinner-rotate {'+
'        0% {'+
'            -webkit-transform: rotate(0deg);'+
'            transform: rotate(0deg);'+
'        }'+
'        100% {'+
'            -webkit-transform: rotate(360deg);'+
'            transform: rotate(360deg);'+
'        }'+
'    }'+
''+
'    .ochat-header{'+
'        position: absolute;'+
'        top: 0;'+
'        left: 0;'+
'        z-index: 10;'+
'        display: block;'+
'        width: 100%;'+
'        background: #f8f8f8;'+
'        height: 50px;'+
'    }'+
'    .ochat-header-title{'+
'        padding: 0 12px;'+
'        font-weight: 500;'+
'        color: #424242;'+
'        display: block;'+
'        overflow: hidden;'+
'        width: 100%;'+
'        text-overflow: ellipsis;'+
'        white-space: nowrap;'+
'        text-align: center;'+
'        line-height: 50px;'+
'    }'+
'    .ochat-header::after,'+
'    .ochat-footer::before{'+
'        position: absolute;'+
'        bottom: -5px;'+
'        left: 0;'+
'        width: 100%;'+
'        height: 5px;'+
'        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);'+
'        background-repeat: repeat-x;'+
'        background-position: 0 -2px;'+
'        content: "";'+
'    }'+
'    .ochat-footer::before{'+
'        top: -2px;'+
'        bottom: auto;'+
'        height: 2px;'+
'        background-position: 0 0;'+
'    }'+
'    .ochat_chat{'+
'        position: absolute;'+
'        color: #000;'+
'        background-color: #fff;'+
'        top: 0;'+
'        left: 0;'+
'        display: block;'+
'        width: 100%;'+
'        height: 100%;'+
'        contain: layout size style;'+
'    }'+
'    .ochat-chat-scroll-content{'+
'        margin-top: 50px;'+
'        position: absolute;'+
'        top: 0;'+
'        right: 0;'+
'        bottom: 0;'+
'        left: 0;'+
'        z-index: 1;'+
'        display: block;'+
'        contain: size style layout;'+
'        height: 296px;'+
'        overflow-x: hidden;'+
'        overflow-y: scroll;'+
'        -webkit-overflow-scrolling: auto;'+
'        will-change: initial;'+
'    }'+
'    .ochat-footer {'+
'        position: absolute;'+
'        bottom: 0;'+
'        left: 0;'+
'        z-index: 10;'+
'        display: block;'+
'        width: 100%;'+
'        background: #f8f8f8;'+
'    }'+
'    .ochat-toolbar{'+
'        padding: 4px;'+
'        min-height: 45px;'+
'        display: -webkit-flex;'+
'        display: -ms-flexbox;'+
'        display: flex;'+
'        overflow: hidden;'+
'        -webkit-flex-direction: row;'+
'        -ms-flex-direction: row;'+
'        flex-direction: row;'+
'        -webkit-align-items: center;'+
'        -ms-flex-align: center;'+
'        align-items: center;'+
'        -webkit-justify-content: space-between;'+
'        -ms-flex-pack: justify;'+
'        justify-content: space-between;'+
'        width: 100%;'+
'        contain: content;'+
'        position: relative;'+
'        z-index: 10;'+
'    }'+
''+
'    .ochat-button{'+
'        line-height: 13px;'+
'        padding: 10px;'+
'        margin-left: 0;'+
'        border: none;'+
'        background: transparent;'+
'    }'+
'    .ochat-button[disabled]{'+
'        cursor: default;'+
'        opacity: .4;'+
'        pointer-events: none;'+
'    }'+
'    .ochat-header .ochat-button{'+
'        top: 0;'+
'        padding: 15px;'+
'        position: absolute;'+
'    }'+
'    .ochat-header .ochat-button.ochat-right{'+
'        right: 0;'+
'    }'+
'    .ochat-icon{'+
'        padding: 0;'+
'        pointer-events: none;'+
'        display: inline-block;'+
'        background-size: 20px 20px;'+
'        width: 20px;'+
'        height: 20px;'+
'    }'+
''+
'    .ochat-chat-message-input{'+
'        -moz-appearance: none;'+
'        -ms-appearance: none;'+
'        -webkit-appearance: none;'+
'        appearance: none;'+
'        display: block;'+
'        width: 100%;'+
'        border: 0;'+
'        font-family: inherit;'+
'        padding: 6px;'+
'        height: auto;'+
'        border-radius: 2px;'+
'        font-weight: 400;'+
'        line-height: 3rem;'+
'        color: #141414;'+
'        background-position: 8px center;'+
'        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);'+
'        background-color: #f4f4f4;'+
'    }'+
'    .ochat-button:active,.ochat-button:focus,'+
'    .ochat-chat-message-input:active,.ochat-chat-message-input:focus{'+
'        outline: none;'+
'    }'+
''+
'    .ochat-message-wrapper {'+
'        position: relative;'+
'    }'+
''+
'    .ochat-message-wrapper:last-child {'+
'        margin-bottom: 10px;'+
'    }'+
''+
'    .ochat-chat-bubble {'+
'        border-radius: 5px;'+
'        display: inline-block;'+
'        padding: 10px 18px;'+
'        position: relative;'+
'        margin: 10px;'+
'        max-width: 80%;'+
'    }'+
''+
'    .ochat-chat-bubble:before {'+
'        content: "";'+
'        display: block;'+
'        height: 16px;'+
'        width: 9px;'+
'        position: absolute;'+
'        bottom: -7.5px;'+
'    }'+
''+
'    .ochat-chat-bubble.ochat-left {'+
'        background-color: #e6e5eb;'+
'        float: left;'+
'        margin-left: 55px;'+
'    }'+
''+
'    .ochat-chat-bubble.ochat-left:before {'+
'        background-color: #e6e5eb;'+
'        left: 10px;'+
'        -webkit-transform: rotate(70deg) skew(5deg);'+
'    }'+
''+
'    .ochat-chat-bubble.ochat-right {'+
'        background-color: #158ffe;'+
'        color: #fff;'+
'        float: right;'+
'        margin-right: 55px;'+
'    }'+
''+
'    .ochat-chat-bubble.ochat-right:before {'+
'        background-color: #158ffe;'+
'        right: 10px;'+
'        -webkit-transform: rotate(118deg) skew(-5deg);'+
'    }'+
'    .ochat-cf {'+
'        clear: both !important;'+
'    }'+
'    .ochat-profile-pic{'+
'        display: inline-block;'+
'        width: 45px;'+
'        height: 45px;'+
'        border-radius: 50%;'+
'        position: absolute;'+
'        bottom: 6px;'+
'    }'+
'    .ochat-profile-pic.ochat-left{'+
'        left: 10px;'+
'    }'+
'    .ochat-profile-pic.ochat-right{'+
'        right: 10px;'+
'    }'+
'    .ochat_blank_message{'+
'        display: inline-block;'+
'        height: 60px;'+
'    }'+
''+
'    .ochat-card{'+
'        margin: 10px 10px 10px 10px;'+
'        width: calc(100% - 20px);'+
'        border-radius: 2px;'+
'        background: #fff;'+
'        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);'+
'        display: block;'+
'        overflow: hidden;'+
'        padding: 13px 16px 13px 16px;'+
'    }'+
'    .ochat-choices-list a{'+
'        border-bottom: 1px solid #e6e5eb;'+
'        padding-bottom: 5px;'+
'        display: block;'+
'        margin: 5px;'+
'        text-decoration: none;'+
'        color: #000;'+
'        cursor: pointer;'+
'    }'+
'    .ochat-choices-list a:hover{'+
'        text-decoration: none;'+
'    }'+
'    .ochat-choices-list a:last-child{'+
'        border-bottom: 0;'+
'        margin-bottom: 0;'+
'    }'+
'</style>'+
'';