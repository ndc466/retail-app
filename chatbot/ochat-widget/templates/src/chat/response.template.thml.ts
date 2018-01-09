export const responseTemplate = ''+
'<div>'+
'    <img class="ochat-profile-pic ochat-left" src="{profile-pic}"/>'+
'    <div class="ochat-chat-bubble ochat-left">'+
'        <div class="ochat-message">{message}</div>'+
'        <div class="ochat-message-detail">'+
'            <!--<span ng-click="viewProfile(message)" class="bold">{{users[item.userId].username}}</span>,-->'+
'            <span am-time-ago="item.date"></span>'+
'        </div>'+
'    </div>'+
'</div>'+
'';