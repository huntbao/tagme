//@huntbao @mknote
//All right reserved
(function(){
    $('#tagwrap').tagme();
    var result = $('#result');
    $('#gettags').click(function(e){
        result.html($('#tagwrap').tagme('getTags').toString());
    });
    $('#serializedTags').click(function(e){
        result.html($('#tagwrap').tagme('getSerializedTags').toString());
    });
    $('#clearTags').click(function(e){
        $('#tagwrap').tagme('clearTags');
        result.html('tag is cleared');
    });
    $('#setTags').click(function(e){
        $('#tagwrap').tagme('setTags', ['aaaaaa', 'bbbbbbbbbbbbb'], true);
    });
    $('#destroy').click(function(e){
        $('#tagwrap').tagme('destroy');
    });
    $('#version').click(function(e){
        result.html($('#tagwrap').tagme('version'));
    });
})();