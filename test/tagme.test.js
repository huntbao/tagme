//@huntbao @mknote
//All right reserved
(function(){
    $('#tagwrap').tagme({
        initTags: ['aaaa', '新浪微博'],
        autocompleteTagsList: ["豆瓣评论","新浪微博","jQuery UI","网络笔记","订票","css","CSS","源代码","电影","JavaScript"],
        onDelete: function(){
            result.html(result.html() + '<br />' + 'onDelete');
            return true;
        },
        afterDelete: function(){
            result.html(result.html() + '<br />' + 'afterDelete');
            return true;
        },
        onAdd: function(){
            result.html(result.html() + '<br />' + 'onAdd');
            return true;
        },
        afterAdd: function(){
            result.html(result.html() + '<br />' + 'afterAdd');
            return true;
        },
        onExist: function(){
            result.html(result.html() + '<br />' + 'onExist');
            return true;
        },
        onUnAvailable: function(){
            result.html(result.html() + '<br />' + 'onUnAvailable');
            return true;
        },
        onMaxTag: function(){
            result.html(result.html() + '<br />' + 'onMaxTag');
            return true;
        },
        onErrorCharsLength: function(){
            result.html(result.html() + '<br />' + 'onErrorCharsLength');
            return true;
        },
        charsLength: '2-8',
        readOnly: true
    });
    var result = $('#result');
    $('#gettags').click(function(e){
        result.html($('#tagwrap').tagme('getTags').toString());
    });
    $('#serializedTags').click(function(e){
        result.html($('#tagwrap').tagme('serializedTags').toString());
    });
    $('#clearTags').click(function(e){
        $('#tagwrap').tagme('clearTags');
        result.html('tag is cleared');
    });
    $('#version').click(function(e){
        result.html($('#tagwrap').tagme('version'));
    });
})();