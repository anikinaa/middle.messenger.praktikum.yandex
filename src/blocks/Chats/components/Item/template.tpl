<a href="{{href}}" class="chat-item_link">
    {{{avatar}}}
    <div class="chat-item_text">
        <div class="chat-item_text_title">{{title}}</div>
        <div class="chat-item_text_msg">{{lastMessage.content}}</div>
    </div>

    <div class="chat-item_info">
        <div class="chat-item_info_date">{{last_message.time}}</div>
        {{@if unreadCount}}<div class="chat-item_info_count">{{unreadCount}}</div>{{/if}}
    </div>
</a>
