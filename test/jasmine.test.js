//test case #
describe('tagme test', function(){
    var ul = $('<ul>').tagme();
    it('test getSerializedTags', function(){
        expect(ul.tagme('getSerializedTags')).toBe('');
    });
    it('test getTags', function(){
        expect(ul.tagme('getTags')).toEqual(jasmine.any(Array));
        expect(ul.tagme('getTags').length).toBe(0);
    });
});
//test case #
describe('tagme test', function(){
    var ul = $('<ul>').tagme({
        readOnly: true
    });
    it('test getSerializedTags', function(){
        expect(ul.find('input.tagme-input').length).toBe(0);
    });
});
//test case #
describe('tagme test', function(){
    var ul = $('<ul>').tagme({
        initTags: ['aa']
    });
    it('test getSerializedTags', function(){
        expect(ul.tagme('getSerializedTags')).toBe('aa');
    });
    it('test getTags', function(){
        expect(ul.tagme('getTags')).toEqual(jasmine.any(Array));
        expect(ul.tagme('getTags')).toContain('aa');
        expect(ul.tagme('getTags').length).toBe(1);
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        onUnAvailable: function(){
            errMsg = 'tag onunavailable';
        }
    });
    ul.tagme('setTags', ['']);
    it('test onUnAvailable', function(){
        expect(errMsg).toBe('tag onunavailable');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        availableTags: ['aa'],
        onUnAvailable: function(){
            errMsg = 'tag onunavailable';
        }
    });
    ul.tagme('setTags', ['bb']);
    it('test onUnAvailable', function(){
        expect(errMsg).toBe('tag onunavailable');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        availableTags: ['aa'],
        onUnAvailable: function(){
            errMsg = 'tag onunavailable';
        }
    });
    ul.tagme('setTags', ['aa']);
    it('test onUnAvailable', function(){
        expect(errMsg).toBe('');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        availableTags: ['aa'],
        onUnAvailable: function(){
            errMsg = 'tag onunavailable';
        }
    });
    ul.tagme('setTags', ['']);
    it('test onUnAvailable', function(){
        expect(errMsg).toBe('tag onunavailable');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        availableTags: ['aa'],
        onUnAvailable: function(){
            errMsg = 'tag onunavailable';
        }
    });
    ul.tagme('setTags', ['aa']);
    it('test onUnAvailable', function(){
        expect(errMsg).toBe('');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        charsLength: '3-8',
        onErrorCharsLength: function(){
            errMsg = 'wrong length';
        }
    });
    ul.tagme('setTags', ['bb']);
    it('test charsLength', function(){
        expect(errMsg).toBe('wrong length');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        charsLength: '3-8',
        onErrorCharsLength: function(){
            errMsg = 'wrong length';
        }
    });
    ul.tagme('setTags', ['bbbbbbbbb']);
    it('test charsLength', function(){
        expect(errMsg).toBe('wrong length');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        charsLength: '3-8',
        onErrorCharsLength: function(){
            errMsg = 'wrong length';
        }
    });
    ul.tagme('setTags', ['aaaa']);
    it('test charsLength', function(){
        expect(errMsg).toBe('');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        maxTags: 3,
        onMaxTag: function(){
            errMsg = 'exceed max number';
        }
    });
    ul.tagme('setTags', ['aa', 'bb', 'cc', 'dd']);
    it('test maxTags', function(){
        expect(errMsg).toBe('exceed max number');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        maxTags: 3,
        onMaxTag: function(){
            errMsg = 'exceed max number';
        }
    });
    ul.tagme('setTags', ['aa', 'bb', 'cc']);
    it('test maxTags', function(){
        expect(errMsg).toBe('');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        maxTags: 3,
        onMaxTag: function(){
            errMsg = 'exceed max number';
        }
    });
    ul.tagme('setTags', ['aa', 'bb']);
    it('test maxTags', function(){
        expect(errMsg).toBe('');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        maxTags: 0,
        onMaxTag: function(){
            errMsg = 'exceed max number';
        }
    });
    ul.tagme('setTags', ['aa', 'bb', 'cc', 'dd']);
    it('test maxTags', function(){
        expect(errMsg).toBe('');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        onExist: function(){
            errMsg = 'tag exist';
        }
    });
    ul.tagme('setTags', ['aa']);
    ul.tagme('setTags', ['aa']);
    it('test onExist', function(){
        expect(errMsg).toBe('tag exist');
    });
});
//test case #
describe('tagme test', function(){
    var errMsg = '';
    var ul = $('<ul>').tagme({
        onExist: function(){
            errMsg = 'tag exist';
        }
    });
    ul.tagme('setTags', ['aa']);
    it('test onExist', function(){
        expect(errMsg).toBe('');
    });
});
//test case #
describe('tagme test', function(){
    var ul = $('<ul>').tagme();
    ul.tagme('setTags', ['aa', 'bb']);
    it('test getSerializedTags', function(){
        expect(ul.tagme('getSerializedTags')).toBe('aa,bb');
    });
    it('test getTags', function(){
        expect(ul.tagme('getTags')).toEqual(jasmine.any(Array));
        expect(ul.tagme('getTags')).toContain('aa');
        expect(ul.tagme('getTags')).toContain('bb');
        expect(ul.tagme('getTags').length).toBe(2);
    });
});
//test case #
describe('tagme test', function(){
    var ul = $('<ul>').tagme({
        initTags: ['aa']
    });
    ul.tagme('setTags', ['bb', 'cc'], true);
    it('test getSerializedTags', function(){
        expect(ul.tagme('getSerializedTags')).toBe('bb,cc');
    });
    it('test getTags', function(){
        expect(ul.tagme('getTags')).toEqual(jasmine.any(Array));
        expect(ul.tagme('getTags')).toContain('bb');
        expect(ul.tagme('getTags')).toContain('cc');
        expect(ul.tagme('getTags').length).toBe(2);
    });
});
//test case #
describe('tagme test', function(){
    var ul = $('<ul>').tagme({
        initTags: ['aa']
    });
    ul.tagme('setTags', ['bb', 'cc']);
    it('test getSerializedTags', function(){
        expect(ul.tagme('getSerializedTags')).toBe('aa,bb,cc');
    });
    it('test getTags', function(){
        expect(ul.tagme('getTags')).toEqual(jasmine.any(Array));
        expect(ul.tagme('getTags')).toContain('aa');
        expect(ul.tagme('getTags')).toContain('bb');
        expect(ul.tagme('getTags')).toContain('cc');
        expect(ul.tagme('getTags').length).toBe(3);
    });
});
