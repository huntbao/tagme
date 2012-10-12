//@huntbao
(function($, undefined){
    $.fn.tagme = function(options){
        if(typeof options === 'object' || options === undefined){
            options = $.extend($.fn.tagme.defaultOptions, options);
            return this.each(function(){
                var t = this,
                tagUL = $(t);
                if(!tagUL.is('ul')) return true;
                var tagInput = null,
                existTags = [];
                addTags(options, tagUL, existTags);
                if(!options.readOnly){
                    var checkAddTagValue = function(value){
                        var checkTagResult = addTagCheck(value, existTags, options);
                        if(checkTagResult === 0){
                            //can add
                            var onAddResult = true;
                            if($.isFunction(options.onAdd)){
                                onAddResult = options.onAdd.call(this, value);
                            }
                            if(onAddResult){
                                addNewTag(tagInput, value, existTags, options);
                            }
                            if($.isFunction(options.afterAdd)){
                                options.afterAdd.call(this, value);
                            }
                        }else if(checkTagResult === 1){
                            //tag exist
                            if($.isFunction(options.onExist)){
                                options.onExist.call(this, value);
                            }
                        }else if(checkTagResult === 2){
                            //tag unavailable
                            if($.isFunction(options.onUnAvailable)){
                                options.onUnAvailable.call(this, value);
                            }
                        }else if(checkTagResult === 3){
                            //max tag number reached
                            if($.isFunction(options.onMaxTag)){
                                options.onMaxTag.call(this, value);
                            }
                        }else if(checkTagResult === 4){
                            //chars length unmatch
                            if($.isFunction(options.onErrorCharsLength)){
                                options.onErrorCharsLength.call(this, value);
                            }
                        }
                    },
                    checkRemoveTag = function(tag){
                        var onDeleteResult = true;
                        if($.isFunction(options.onDelete)){
                            onDeleteResult = onDeleteResult = options.onDelete.call(this, tag.text());
                        }
                        if(onDeleteResult){
                            removeTag(tag, existTags, tagInput, options);
                        }
                        if($.isFunction(options.afterDelete)){
                            options.afterDelete.call(this, tag.text());
                        }
                    }
                    tagInput = $('<input>', {class: 'tagme-input'}).keydown(function(e){
                        var code = e.which,
                        ti = $(this);
                        if(code === 13 || code === 188 || code === options.addKey.charCodeAt(0)){
                            checkAddTagValue($.trim(ti.val()));
                        }else if(code === 8 && ti.val() === ''){
                            checkRemoveTag(ti.parent().prev());
                        }
                    });
                    tagUL.append($('<li>', {class: 'tagme-inputwrap'}).append(tagInput));
                    if(options.autocomplete && $.isFunction($.fn.autocomplete)){
                        options.autocompleteTagsList = mergeArrayUnique(options.autocompleteTagsList, options.initTags).sort();
                        tagInput.autocomplete({
                            source: options.autocompleteTagsList,
                            select: function(event, ui){
                                if(event.which === 13) return false;
                                checkAddTagValue($.trim(ui.item.value));
                                return false;
                            },
                            minLength: options.autocompleteMinChars
                        }).focus(function (){
                            if($(this).val() === ''){
                                $(this).autocomplete('search', '');
                            }
                        });
                    }
                    tagUL.delegate('.tagme-item', 'click', function(e){
                        checkRemoveTag($(this));
                    }).click(function(e){
                        tagInput && tagInput.focus();
                    }).mouseenter(function(){
                        if($.isFunction(options.onMouseenter)){
                            options.onMouseenter.call(this);
                        }
                    }).mouseleave(function(){
                        if($.isFunction(options.onMouseleave)){
                            options.onMouseleave.call(this);
                        }
                    });
                }
                
            });
        }else if(typeof options === 'string' && publicMethod[options]) {
            return publicMethod[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
    $.fn.tagme.defaultOptions = {
        readOnly: false,
        addKey: '，',
        initTags: [],
        availableTags: true,
        charsLength: '0-0',
        maxTags: 0,
        autocomplete: false,
        autocompleteTagsList: [],
        autocompleteMinChars: 0
        //onDelete: function(){},
        //afterDelete: function(){},
        //onAdd: function(){},
        //afterAdd: function(){},
        //onExist: function(){},
        //onUnAvailable: function(){},
        //onMaxTag: function(){},
        //onErrorCharsLength: function(){},
        //onMouseenter: function(){},
        //onMouseleave: function(){}
    }
    //publicMethods
    var publicMethod = {
        serializedTags: function(){
            var currentTags = [];
            $(this).find('li.tagme-item').each(function(idx, e){
                currentTags.push($(e).text());
            });
            return currentTags.join(',');
        },
        getTags: function(){
            var currentTags = [];
            $(this).find('li.tagme-item').each(function(idx, e){
                currentTags.push($(e).text());
            });
            return currentTags;
        },
        clearTags: function(){
            $(this).find('li.tagme-item').remove();
            return true;
        },
        version: function(){
            return '1.0.0';
        }
    }
    if(typeof Array.prototype.indexOf !== 'function'){
        Array.prototype.indexOf = function(elem, fromIndex){
            fromIndex = fromIndex || 0;
            for (var i = fromIndex, len = this.length; i < len; i++) {
                if (this[i] === elem) {
                    return i;
                }
            }
            return -1;
        }
    }
    if(typeof Array.prototype.remove != 'function'){
        Array.prototype.remove = function(elem){
            var i = this.indexOf(elem);
            if (i !== -1) {
                this.splice(i, 1);
                return true;
            }
            else {
                return false;
            }
        }
    }
    if(typeof Array.prototype.unique != 'function'){
        Array.prototype.unique = function(){
            var a = this.concat();
            for(var i = 0; i < a.length; ++i){
                for(var j = i + 1; j < a.length; ++j){
                    if(a[i] === a[j]){
                        a.splice(j, 1);
                    }
                }
            }
            return a;
        }
    }
    function mergeArrayUnique(arr1, arr2){
        return arr1.concat(arr2).unique();
    }
    function checkLength(tagValue, options){
        if(options.charsLength !== '0-0'){
            var chars = options.charsLength.split('-'),
            minChars = parseInt(chars[0]),
            maxChars = parseInt(chars[1]);
            if(minChars <= maxChars){
                if(minChars !== 0 && tagValue.length < minChars || maxChars !== 0 && tagValue.length > maxChars){
                    return false;
                }
            }
        }
        return true;
    }
    function addTags(options, tagUL, existTags){
        if(!$.isArray(options.initTags)) return;
        $.each(options.initTags, function(idx, tagValue){
            if((options.maxTags === 0 || options.maxTags > existTags.length) && checkLength(tagValue, options)){
                if(options.availableTags === true || $.isArray(options.availableTags) && options.availableTags.indexOf(tagValue) !== -1){
                    tagUL.append($('<li>', {class: 'tagme-item', text: tagValue}));
                    existTags.push(tagValue);
                }
            }
        });
    }
    function addNewTag(tagInput, tagValue, existTags, options){
        $('<li>', {class: 'tagme-item', text: tagValue}).insertBefore(tagInput.val('').parent());
        existTags.push(tagValue);
        if(options.autocomplete && $.isFunction($.fn.autocomplete)){
            if(options.autocompleteTagsList.indexOf(tagValue) === -1){
                options.autocompleteTagsList.push(tagValue);
                tagInput.autocomplete('option', 'source', options.autocompleteTagsList.sort());
            }
        }
        tagInput.focus();
    }
    function removeTag(tagEl, existTags, tagInput, options){
        if(tagEl.length > 0){
            tagEl.remove();
            existTags.remove($.trim(tagEl.text()));
            tagInput.focus();
        }
    }
    function addTagCheck(newTagValue, existTags, options){
        function checkExist(){
            var exist = existTags.indexOf(newTagValue);
            return exist === -1 ? false : true;
        }
        if(newTagValue === ''){
            return 2;//empty string is always unvailable
        }
        if(options.maxTags !== 0 && options.maxTags <= existTags.length){
            return 3;//exceed max allowed tag number
        }
        if(checkLength(newTagValue, options) === false){
            return 4;
        }
        if(options.availableTags === true){
            var exist = checkExist();
            return exist ? 1 : 0;
        }
        if($.isArray(options.availableTags)){
            var available = options.availableTags.indexOf(newTagValue);
            if(available !== -1){
                var exist = checkExist();
                return exist ? 1 : 0;
            }else{
                return 2;
            }
        }
        return false;
    }
})(jQuery);