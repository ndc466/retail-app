export const messageTemplate = ''+
'<div>'+
'    <img class="ochat-profile-pic ochat-right" src="{profile-pic}"/>'+
'    <div class="ochat-chat-bubble ochat-right">'+
'        <div class="ochat-message">{message}</div>'+
'        <div class="ochat-message-detail">'+
'            <!--<span ng-click="viewProfile(message)" class="bold">{{user.username}}</span>,-->'+
'            <span am-time-ago="item.date"></span>'+
'        </div>'+
'    </div>'+
'</div>'+
'';