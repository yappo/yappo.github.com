// S6
// SSSSSS created by amachang

if (typeof window.s6 != 'undefined') {
    delete window.s6;
}
var s6 = {};


// ���֥�������̾: uai ���֥�������
// �ʲ��� uai ���֥������Ȥϰʲ��Υ����Ȥ� UAIdentifier ���˺�äƤ��ޤ���
// ���꤬����ж����Ƥ���������
// http://homepage2.nifty.com/magicant/sjavascript/uai-spec.html
s6.uai = new function() {

    var ua = navigator.userAgent;

    if (typeof(RegExp) == "undefined") {
        if (ua.indexOf("Opera") >= 0) {
            this.opera = true;
        } else if (ua.indexOf("Netscape") >= 0) {
            this.netscape = true;
        } else if (ua.indexOf("Mozilla/") == 0) {
            this.mozilla = true;
        } else {
            this.unknown = slide
        }
        
        if (ua.indexOf("Gecko/") >= 0) {
            this.gecko = true;
        }
        
        if (ua.indexOf("Win") >= 0) {
            this.windows = true;
        } else if (ua.indexOf("Mac") >= 0) {
            this.mac = true;
        } else if (ua.indexOf("Linux") >= 0) {
            this.linux = true;
        } else if (ua.indexOf("BSD") >= 0) {
            this.bsd = true;
        } else if (ua.indexOf("SunOS") >= 0) {
            this.sunos = true;
        }
    }
    else {
    
        /* for Trident/Tasman */
        /*@cc_on
        @if (@_jscript)
            function jscriptVersion() {
                switch (@_jscript_version) {
                    case 3.0:  return "4.0";
                    case 5.0:  return "5.0";
                    case 5.1:  return "5.01";
                    case 5.5:  return "5.5";
                    case 5.6:
                        if ("XMLHttpRequest" in window) return "7.0";
                        return "6.0";
                    case 5.7:
                        return "7.0";
                    default:   return true;
                }
            }
            if (@_win16 || @_win32 || @_win64) {
                this.windows = true;
                this.trident = jscriptVersion();
            } else if (@_mac || navigator.platform.indexOf("Mac") >= 0) {
                // '@_mac' may be 'NaN' even if the platform is Mac,
                // so we check 'navigator.platform', too.
                this.mac = true;
                this.tasman = jscriptVersion();
            }
            if (match = ua.match("MSIE ?(\\d+\\.\\d+)b?;")) {
                this.ie = match[1];
            }
        @else @*/
        
        /* for AppleWebKit */
        if (match = ua.match("AppleWebKit/(\\d+(\\.\\d+)*)")) {
            this.applewebkit = match[1];
        }
        
        /* for Gecko */
        else if (typeof(Components) == "object") {
            if (match = ua.match("Gecko/(\\d{8})")) {
                this.gecko = match[1];
            } else if (navigator.product == "Gecko"
                    && (match = navigator.productSub.match("^(\\d{8})$"))) {
                this.gecko = match[1];
            }
        }
        
        /*@end @*/
        
        if (typeof(opera) == "object" && typeof(opera.version) == "function") {
            this.opera = opera.version();
        } else if (typeof(opera) == "object"
                && (match = ua.match("Opera[/ ](\\d+\\.\\d+)"))) {
            this.opera = match[1];
        } else if (this.ie) {
        } else if (match = ua.match("Safari/(\\d+(\\.\\d+)*)")) {
            this.safari = match[1];
        } else if (match = ua.match("Konqueror/(\\d+(\\.\\d+)*)")) {
            this.konqueror = match[1];
        } else if (ua.indexOf("(compatible;") < 0
                && (match = ua.match("^Mozilla/(\\d+\\.\\d+)"))) {
            this.mozilla = match[1];
            if (match = ua.match("\\([^(]*rv:(\\d+(\\.\\d+)*).*?\\)"))
                this.mozillarv = match[1];
            if (match = ua.match("Firefox/(\\d+(\\.\\d+)*)")) {
                this.firefox = match[1];
            } else if (match = ua.match("Netscape\\d?/(\\d+(\\.\\d+)*)")) {
                this.netscape = match[1];
            }
        } else {
            this.unknown = true;
        }
        
        if (ua.indexOf("Win 9x 4.90") >= 0) {
            this.windows = "ME";
        } else if (match = ua.match("Win(dows)? ?(NT ?(\\d+\\.\\d+)?|\\d+|XP|ME|Vista)")) {
            this.windows = match[2];
            if (match[3]) {
                this.winnt = match[3];
            } else switch (match[2]) {
                case "2000":   this.winnt = "5.0";  break;
                case "XP":     this.winnt = "5.1";  break;
                case "Vista":  this.winnt = "6.0";  break;
            }
        } else if (ua.indexOf("Mac") >= 0) {
            this.mac = true;
        } else if (ua.indexOf("Linux") >= 0) {
            this.linux = true;
        } else if (match = ua.match("\\w*BSD")) {
            this.bsd = match[0];
        } else if (ua.indexOf("SunOS") >= 0) {
            this.sunos = true;
        }
    }

};


// ���֥�������̾: emptyHash �ؿ�
// �ϥå���(���֥�������)�����Ǥ��뤫(for in ���Ʋ��⸡�Ф���ʤ���)��Ĵ�٤�
s6.emptyHash = function(hash) {
    var check;
    for (var n in hash) {
        return false;
    }
    return true;
};

// ���֥�������̾: overArgs �ؿ�
// ���ꤷ���Ŀ��ʹߤΰ���������Ȥ����֤���
s6.overArgs = function(number, args) {
    var results = [];
    for (var i = number, l = args.length; i < l; i ++) {
        results.push(args[i]);
    }
    return results;
};

// ���֥�������̾: overArgs �ؿ�
// ���ꤷ���Ŀ��ʹߤΰ���������Ȥ����֤���
s6.toArray = function(enm) {
    var results = [];
    results.push.apply(results, enm);
    return results;
};

// ���֥�������̾: opts �ؿ�
// �ǽ������� options ��Ȥ��褦�ʾ��˰����򤦤ޤ��ޡ������Ƥ���롣
s6.opts = function(options, defaults) {
    if (!options) {
        return defaults;
    }
    for (var n in defaults) {
        if (!(n in options)) {
            options[n] = defaults[n];
        }
    }
    return options;
};

// ���֥�������̾: delClass �ؿ�
// ���Ǥ��饯�饹��������
// ̵����в��⤷�ʤ�
s6.delClass = function(element, className) {
    if (s6.hasClass(element, className)) {
        var cache = element.__s6ClassNames__;
        for (var i = 0, l = cache.length; i < l; i ++) {
            if (cache[i] == className) {
                cache.splice(i, 1);
                element.__s6ClassName__ = element.className = cache.join(' ');
                break;
            }
        }
    }
};

// ���֥�������̾: hasClass �ؿ�
// ���Ǥ˥��饹���ɲä���
// ̵������ɲä�����ɲä��ʤ�
s6.addClass = function(element, className) {
    if (!s6.hasClass(element, className)) {
        var cache = element.__s6ClassNames__;
        cache.push(className);
        element.__s6ClassName__ = element.className = cache.join(' ');
    }
}

// ���֥�������̾: hasClass �ؿ�
// ���Ǥ˥��饹̾�����뤫�ɤ�����Ĵ�٤�
s6.hasClass = function(element, className) {
    var elmClassName = element.className;
    if (element.__s6ClassName__ != elmClassName || !element.__s6ClassNames__) {
        element.__s6ClassName__ = elmClassName;
        element.__s6ClassNames__ = elmClassName.split(/\s+/);
    }
    var classNames = element.__s6ClassNames__;
    for (var i = 0, l = classNames.length; i < l; i ++) {
        if (classNames[i] == className) {
            return true;
        }
    }
    return false;
};

// ���֥�������̾: IncrementalObject ���󥹥ȥ饯��
// �ͤ�ɾ�����뤿�Ӥ��ͤ������Ƥ������֥�������
// ����ͤ� 1 
s6.IncrementalObject = function(gain) {
    this.value = 0;
    if (typeof gain == 'undefined') {
        gain = 1 / 7;
    }
    else if (gain > 1) {
        gain = 1;
    }
    this.gain = gain;
};
s6.IncrementalObject.prototype = {
    valueOf: function() {
        var value = this.value;
        this.value += this.gain;
        return value;
    }
};


if (!s6.uai.ie || s6.uai.ie >= 7) {
    s6.defaultStyles = {
    
        '.s6': {
            position: 'absolute',
            margin: 0,
            padding: 0,
            border: 0,
            overflow: 'hidden'
        },
    
        '.s6.mac': {
            fontFamily: "'�ҥ饮�γѥ� Pro W3','Hiragino Kaku Gothic Pro',sans-serif"
        },
    
        '.s6.win': {
            fontFamily: "'�ᥤ�ꥪ',Meiryo,'�ͣ� �Х����å�',sans-serif"
        },
    
        '.s6 .page': {
            position: 'absolute',
            height: '100%',
            width: '100%',
            margin: 0,
            padding: 0,
            border: 0,
            overflow: 'hidden',
            lineHeight: 1
        },

        '.s6 .page.default > *': {
            lineHeight: '1.5',
            position: 'relative',
            zIndex: '100'
        },
    
        '.s6 .page.default > h1': {
            margin: '20% 5% 5% 5%',
            fontSize: '110%'
        },
    
        '.s6 .page.default > h2': {
            margin: '5%'
        },
    
        '.s6 .page.default > h3': {
            margin: '2% 5% 2% 5%'
        },
    
        '.s6 .page.default > h4': {
            margin: '2% 5% 2% 5%'
        },

        '.s6 .page.default > ul': {
            margin: '5% 5% 5% 10%',
            fontSize: '80%'
        },
    
        '.s6 .page.default > p': {
            margin: '5%',
            fontSize: '80%'
        },
    
        '.s6 .page.default > address': {
            margin: '10% 5% 5% 5%',
            fontSize: '60%',
            textAlign: 'right'
        },
    
        '.s6 .page.default > pre': {
            fontSize: '50%',
            padding: '1%',
            borderTop: '0.6em solid',
            borderBottom: '0.6em solid'
        },
    
        '.s6 .page.takahashi > * > a:focus': {
            outline: 'none'
        },
    
        '.s6 .page.takahashi > *': {
            position: 'absolute',
            zIndex: '100',
            whiteSpace: 'nowrap',
            width: '100%',
            textAlign: 'center',
            top: '45%'
        },
    
        '.s6 .page.custom > *': {
            position: 'absolute',
            zIndex: '100',
            whiteSpace: 'nowrap'
        },
    
        '.s6 .index.page > .inner.s6': {
            height: '100%',
            width: '100%',
            margin: '1.875% 2.5%',
            overflow: 'visible'
        },
    
        '.s6 .index.page > .inner.s6 > .page > .wrapper': {
            fontSize: '19%',
            height: '19%',
            width: '19%',
            float: 'left',
            position: 'relative'
        },
    
        '.s6 .index.page > .inner.s6 > .page > .wrapper > .page': {
            top: '4%',
            left: '4%',
            width: '92%',
            height: '92%'
        },
    
        '.s6 .page *': {
            fontSize: '100%',
            fontWeight: 'normal',
            fontStyle: 'normal',
            margin: 0,
            padding: 0,
            border: 0
        },
    
    
        // color thema
        '.s6.dark ': {
            backgroundColor: 'black',
            color: 'white'
        },
    
        '.s6.dark a': {
            color: 'yellow'
        },
    
        '.s6.dark .page': {
            background: '#4C5469 url(img/background.png) repeat-x'
        },
    
        '.s6.dark .page.default > pre': {
            borderTopColor: '#666',
            borderBottomColor: '#666',
            backgroundColor: 'black'
        },
    
        '.s6.dark .page.default > pre > strong': {
            color: 'yellow'
        },

        '.s6.dark .index.page > .inner.s6': {
            background: 'transparent'
        },

        '.s6.dark .index.page > .inner.s6 > .page': {
            background: 'transparent'
        },

        '.s6.dark .index.page > .inner.s6 > .page > .wrapper.selected': {
            background: 'gray'
        }
    };
}
else {
    s6.defaultStyles = {
    
        '.s6': {
            position: 'absolute',
            margin: 0,
            padding: 0,
            border: 0,
            overflow: 'hidden'
        },
    
        '.s6.mac': {
            fontFamily: "'�ҥ饮�γѥ� Pro W3','Hiragino Kaku Gothic Pro',sans-serif"
        },
    
        '.s6.win': {
            fontFamily: "'�ᥤ�ꥪ',Meiryo,'�ͣ� �Х����å�',sans-serif"
        },
    
        '.s6 .page': {
            position: 'absolute',
            height: '100%',
            width: '100%',
            margin: 0,
            padding: 0,
            border: 0,
            overflow: 'hidden',
            lineHeight: '1.2'
        },
    
        '.s6 .page.default *.element': {
            lineHeight: '1.5',
            position: 'relative',
            zIndex: '100'
        },
    
        '.s6 .page.default h1.element': {
            margin: '20% 5% 5% 5%',
            fontSize: '110%'
        },
    
        '.s6 .page.default h2.element': {
            margin: '5%'
        },
    
        '.s6 .page.default h3.element': {
            margin: '2% 5% 2% 5%'
        },
    
        '.s6 .page.default h4.element': {
            margin: '2% 5% 2% 5%'
        },

        '.s6 .page.default ul.element': {
            margin: '5% 5% 5% 10%',
            fontSize: '80%'
        },
    
        '.s6 .page.default p.element': {
            margin: '5%',
            fontSize: '80%'
        },
    
        '.s6 .page.default address.element': {
            margin: '10% 5% 5% 5%',
            fontSize: '60%',
            textAlign: 'right'
        },
    
        '.s6 .page.default pre.element': {
            fontSize: '50%',
            padding: '1%',
            borderTop: '0.6em solid',
            borderBottom: '0.6em solid'
        },
    
        '.s6 .page.takahashi *.elmement a:focus': {
            outline: 'none'
        },
    
        '.s6 .page.takahashi *.element': {
            position: 'absolute',
            zIndex: '100',
            whiteSpace: 'nowrap',
            width: '100%',
            textAlign: 'center',
            top: '45%'
        },
    
        '.s6 .page.custom *.element': {
            position: 'absolute',
            zIndex: '100',
            whiteSpace: 'nowrap'
        },
    
        '.s6 .index.page .inner.s6': {
            height: '100%',
            width: '100%',
            margin: '1.875% 2.5%',
            overflow: 'visible'
        },
    
        '.s6 .index.page .inner.s6 .page .wrapper': {
            fontSize: '19%',
            height: '19%',
            width: '19%',
            float: 'left',
            position: 'relative'
        },

        '.s6 .index.page .inner.s6 .page .wrapper .page': {
            top: '4%',
            left: '4%',
            width: '92%',
            height: '92%'
        },
    
        '.s6 .page *': {
            fontSize: '100%',
            fontWeight: 'normal',
            fontStyle: 'normal',
            margin: 0,
            padding: 0,
            border: 0
        },
    
    
        // color thema
        '.s6.dark ': {
            backgroundColor: 'black',
            color: 'white'
        },
    
        '.s6.dark a': {
            color: 'yellow'
        },
    
        '.s6.dark .page': {
            background: '#4C5469 url(img/background.png) repeat-x'
        },
    
        '.s6.dark .page.default pre': {
            borderTopColor: '#666',
            borderBottomColor: '#666',
            backgroundColor: 'black'
        },
    
        '.s6.dark .page.default pre strong': {
            color: 'yellow'
        },
    
        '.s6.dark .page.takahashi * a': {
            color: 'yellow'
        },
        
        '.s6.dark .index.page .inner.s6 ': {
            background: 'transparent'
        },

        '.s6.dark .index.page .inner.s6 .page': {
            background: 'transparent'
        },

        '.s6.dark .index.page .inner.s6 .page .wrapper.selected': {
            background: 'gray'
        },

        '.s6.dark .index.page .inner.s6 .page .wrapper .page': {
            background: '#4C5469 url(img/background.png) repeat-x'
        }
    
    };
}


s6.transitions = {

    sinoidal: {
        // y = 0.5 - cos(��x)/2
        asc: function(x) {
            return 0.5 - Math.cos(x * Math.PI) / 2;
        },
        // y = 0.5 + cos(��x)/2
        desc: function(x) {
            return 0.5 + Math.cos(x * Math.PI) / 2;
        }
    },

    lenear: {
        // y = x
        asc: function(x) {
            return x;
        },

        // y = 1 - x
        desc: function(x) {
            return 1 - x;
        }
    }
};


s6.PageEffectSlideConstructor = function(from) {
    this.from = from;
    switch(from) {
        case 'right' : this.to = 'left';   break;
        case 'left'  : this.to = 'right';  break;
        case 'top'   : this.to = 'bottom'; break;
        case 'bottom': this.to = 'top';    break;
    }
};
s6.PageEffectSlideConstructor.prototype = {
    setup: function ___slideSetup(
        pageEffect, x, data,
        toPage, toElement, toStyle,
        fromPage, fromElement, fromStyle
    ) {
    },
    update: function ___slideUpdate(
        pageEffect, x, data,
        toPage, toElement, toStyle,
        fromPage, fromElement, fromStyle
    ) {
        toStyle[pageEffect.to] = (1 - x) * 100 + '%';
        fromStyle[pageEffect.from] = x * 100 + '%';
    },
    teardown: function ___slideTeardown(
        pageEffect, x, data,
        toPage, toElement, toStyle,
        fromPage, fromElement, fromStyle
    ) {
        toStyle[pageEffect.to] = '';
        fromStyle[pageEffect.from] = '';
    }
};

// this �ϥץ쥼��ơ�����󥪥֥������ȤȤʤ�
s6.pageEffects = {
    slide: new s6.PageEffectSlideConstructor('right'),
    fade: {
        setup: function ___fadeSetup(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            toStyle.zIndex = '100';
            fromStyle.zIndex = '200';
        },
        update: function ___fadeUpdate(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            if (s6.uai.ie) {
                fromStyle.filter = 'alpha(opacity=' + (1 - x) * 100 + ')';
            }
            else {
                fromStyle.opacity = 1 - x;
            }
        },
        teardown: function ___fadeTeardown(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            toStyle.zIndex = '';
            fromStyle.zIndex = '';
            if (s6.uai.ie) {
                fromStyle.filter = '';
            }
            else {
                fromStyle.opacity = '';
            }
        }
    },
    fadeScaleFromUp: {
        setup: function ___fadeScaleFromUpSetup(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            toStyle.zIndex = '200';
            fromStyle.zIndex = '100';
            if (!s6.uai.ie && !s6.uai.opera) {
                toStyle.height = this.height / this.fontSize + 'em';
                toStyle.width = this.width / this.fontSize + 'em';
            }
        },
        update: function ___fadeScaleFromUpUpdate(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            
            if (s6.uai.ie || s6.uai.opera) {
                toStyle.width = (1 + (1 - x)) * 100 + '%';
                toStyle.height = (1 + (1 - x)) * 100 + '%';
            }
            toStyle.fontSize = (1 + (1 - x)) * 100 + '%';
            toStyle.top = - 50 + 50 * x + '%';
            toStyle.left = - 50 + 50 * x + '%';
            if (s6.uai.ie) {
                toStyle.filter = 'alpha(opacity=' + x * 100 + ')';
            }
            else {
                toStyle.opacity = x;
            }
        },
        teardown: function ___fadeScaleFromUpTeardown(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            toStyle.zIndex = '';
            fromStyle.zIndex = '';
            toStyle.height = '';
            toStyle.width = '';
            toStyle.fontSize = '';
            toStyle.top = '';
            toStyle.left = '';
            if (s6.uai.ie) {
                toStyle.filter = '';
            }
            else {
                toStyle.opacity = '';
            }
        }
    },
    fadeScale: {
        setup: function ___fadeScaleSetup(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            toStyle.zIndex = '100';
            fromStyle.zIndex = '200';
            fromStyle.height = this.height / this.fontSize + 'em';
            fromStyle.width = this.width / this.fontSize  + 'em';
        },
        update: function ___fadeScaleUpdate(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            var dx = 1 - x;
            var dw = (1 - dx) / 2;
            var px = dx * 100;
            var sx = px + '%';
            var sw = dw * 100 + '%';
            fromStyle.fontSize = sx;
            fromStyle.left = sw;
            fromStyle.top = sw; 
            if (s6.uai.ie) {
                fromStyle.filter = 'alpha(opacity=' + px + ')';
            }
            else {
                fromStyle.opacity = dx;
            }
        },
        teardown: function ___fadeScaleTeardown(
            pageEffect, x, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle
        ) {
            toStyle.zIndex = '';
            fromStyle.zIndex = '';
            fromStyle.height = '';
            fromStyle.width = '';
            fromStyle.left = '';
            fromStyle.top = '';
            fromStyle.fontSize = '';
            if (s6.uai.ie) {
                fromStyle.filter = '';
            }
            else {
                fromStyle.opacity = '';
            }
        }
    }
};

// TODO 2007/9/13 �Ȥꤢ������ Shibuya.JS �Τ�����ɲ�
// ���ȤǾä��������Ⱥ��ľ��
s6.pageEffects.fadeScaleFromUpTransparent = {
    setup: function(
        pageEffect, x, data,
        toPage, toElement, toStyle,
        fromPage, fromElement, fromStyle
    ) {
        s6.pageEffects.fadeScaleFromUp.setup.apply(this, arguments);
        fromPage.setDisplay(true);
        toStyle.background = 'transparent';
    },
    update: s6.pageEffects.fadeScaleFromUp.update,
    teardown: function(
        pageEffect, x, data,
        toPage, toElement, toStyle,
        fromPage, fromElement, fromStyle
    ) {
        toStyle.background = '';
        s6.pageEffects.fadeScaleFromUp.teardown.apply(this, arguments);
    }
};


// this �� Action ���֥�������
s6.actionEffects = {
    fade: {
        changeArgs_in: function(args) {
            args[1] = 0;
            args[2] = 1;
            return args;
        },
        changeArgs_out: function(args) {
            args[1] = 1;
            args[2] = 0;
            return args
        },
        snapshot: function(cache, elements, styles, length) {
            for (var i = 0; i < length; i ++) {
                var c = cache[i] = {};
                var style = styles[i];
                c.display = style.display;
                if (s6.uai.ie) {
                    c.filter = style.filter;
                }
                else {
                    c.opacity = style.opacity;
                }
            }
        },
        update: function(actionEffect, x, data, args, elements, styles, length) {
            var opacity = args[1] + (args[2] - args[1]) * x;

            for (var i = 0; i < length;i++) {
                var style = styles[i];
                if (s6.uai.ie) {
                    if (opacity < 0.01) {
                        data.display = style.display = 'none';
                        style.filter = '';
                    }
                    else if (opacity >= 0.99) {
                        if (!('display' in data) || data.display != '') {
                            data.display = style.display = '';
                        }
                        style.filter = '';
                    }
                    else {
                        data.dispaly = style.display = '';
                        style.filter = 'alpha(opacity=' + opacity * 100 + ')';
                    }
                }
                else {
                    if (opacity < 0.01) {
                        data.display= style.display = 'none';
                        style.opacity = '';
                    }
                    else if (opacity >= 0.99) {
                        if (!('display' in data) || data.display != '') {
                            data.display = style.display = '';
                        }
                        style.opacity = '';
                    }
                    else {
                        data.display = style.display = '';
                        style.opacity = opacity;
                    }
                } 
            }
        },
        reset: function(cache, elements, styles, length) {
            for (var i = 0; i < length; i ++) {
                var c = cache[i];
                var style = styles[i];
                style.display = c.display;
                if (s6.uai.ie) {
                    style.filter = c.filter;
                }
                else {
                    style.opacity = c.opacity;
                }
            }
        }
    },
    move: {
        snapshot: function(cache, elements, styles, length) {
            for (var i = 0; i < length; i ++) {
                var c = cache[i] = {};
                var style = styles[i];
                c.left = style.left;
                c.top = style.top;
            }
        },
        update: function(actionEffect, x, data, args, elements, styles, length) {
            var startX = args[1][0];
            var startY = args[1][1];
            var endX = args[2][0];
            var endY = args[2][1];
            for (var i = 0; i < length; i++) {
                var style = styles[i];
                style.left = startX + (endX - startX) * x + '%';
                style.top = startY + (endY - startY) * x + '%';
            }
        },
        reset: function(cache, elements, styles, length) {
            for (var i = 0; i < length; i ++) {
                var c = cache[i];
                var style = styles[i];
                style.left = c.left;
                style.top = c.top;
            }
        }
    }
};


// ���֥�������̾: keyIdentifier �ؿ�
// ���٥�Ȥ������äƥ��٥�Ȥ� keyIdentifier ��̵������ղä��Ƥ��
// see also http://www.w3.org/TR/DOM-Level-3-Events/keyset.html
// �ޤ������������Ƥʤ��� Left/Right/Up/Down ����
s6.keyIdentifier = function(event) {
    var type, keyCode, keyIdentifier, shiftKey, ctrlKey, altKey, result;

    shiftKey = event.shiftKey;
    keyIdentifier = event.keyIdentifier;

    if (keyIdentifier) {
        if (result = keyIdentifier.match(/^U\+00([0-9A-Fa-f]{4})$/)) {
            event.keyIdentifier = 'U+' + result[1];
            keyCode = parseInt('0x' + result[1]);
            if (!shiftKey) {
                keyCode += 32;
            }
            event._character = String.fromCharCode(keyCode);
        }
        return event;
    }

    type = event.type;
    ctrlKey = event.ctrlKey || event.metaKey;

    keyCode = event.which || event.keyCode;

    if (keyCode >= 97 && keyCode <= 122) {
        keyCode -= 32;
    }

    if (shiftKey && keyCode >= 65 && keyCode <= 90) {
        event._character = String.fromCharCode(keyCode);
    }
    else {
        event._character = String.fromCharCode(keyCode + 32);
    }

    keyIdentifier = s6._keyIdentifierMap[keyCode];
    if (keyIdentifier) {
        event.keyIdentifier = keyIdentifier;
    }
    else {
        event.keyIdentifier = s6._num2keyId(keyCode);
    }
    return event;
};
s6._num2keyId = function(num) {
    var keyId = num.toString(16).toUpperCase();
    switch (keyId.length) {
        case 1:
            keyId = '0' + keyId;
        case 2:
            keyId = '0' + keyId;
        case 3:
            keyId = '0' + keyId;
        case 4:
            break;
        case 5:
            keyId = '0' + keyId;
        case 6:
            break;
    }
    return 'U+' + keyId;
};
s6._keyIdentifierMap = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', 'Clear', 'Enter', '', '', 'Shift', 'Control', 'Alt', 'Pause',
    'CapsLock', '', '', '', '', '', '', '', '', '',
    '', '', '', 'PageUp', 'PageDown', 'End', 'Home', 'Left', 'Up', 'Right',
    'Down', '', '', '', 'PrintScreen', 'Insert', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
    'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18',
    'F19', 'F20', 'F21', 'F22', 'F23', 'F24', '', '', '', '',
    '', '', '', '', '', 'Scroll', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', ''
];

// ���֥�������̾: attach �ؿ�
// ���٥�Ȥγ�����Ԥ������٥�ȥϥ�ɥ� ID ���������롣
// ���٥�ȥϥ�ɥ� ID �ϡ����٥�Ȥβ���ǻȤ�
s6.attach = function(element, type, handler, priority, self) {
    // �Ǹ�β������� args �������
    var args = s6.overArgs(5, arguments);

    if (typeof type == 'object') {
        var types = type;
        var ids = [];
        for (var i = 0, l = types.length; i < l; i ++) {
            var args2 = [element, types[i], handler, priority, self].concat(args);
            ids.push(s6.attach.apply(s6, args2));
        }
        return ids;
    }

    if (typeof handler == 'string') {
        args.unshift(handler);
        handler = s6._methodHandler;
    }

    var result = type.match(/^keypress\s+(.+)$/);
    if (result) {
        var type = 'keypress';
        var keys = result[1].split(/\|/);
        args.unshift(handler, keys);
        handler = s6._keypressHandler;
    }

    if (s6.uai.ie && type == 'keypress') {
        type = 'keydown';
    }

    if (!element['on' + type]) {
        element['on' + type] = this._handleEvent;
        // debug 
        // �ʲ��򥳥��Ȳ񤦤Ȥ���� Firebug Console ��ǥ��٥�ȤΥ�˥����Ǥ���褦�ˤʤ�ޤ���
        // var s = this;
        // element['on' + type] = function() {
        //     var result = s._handleEvent.apply(this, arguments);
        //     console.log('%s.on%s() = %o', this, arguments[0].type, result);
        //     return result;
        // };
    }
    var events = element.__s6events__;
    if (!events) {
        events = element.__s6events__ = {};
    }
    var priorities = events[type];
    if (!priorities) {
        priorities = events[type] = {};
    }
    priority = priority || 0;
    var handlers = priorities[priority];
    if (!handlers) {
        handlers = priorities[priority] = [];
    }

    var handlerInfo = [handler, self, args];
    handlers.push([handler, self, args]);
    var handlerId = this._eventCount++;
    this._events[handlerId] = {
        element: element,
        type: type,
        priority: priority,
        handler: handlerInfo
    };
    return handlerId;
};
s6._methodHandler = function(event, handler) {
    var args = s6.overArgs(3, arguments);
    args.unshift(event);
    return this[handler].apply(this, args);
};
s6._keypressHandler = function(event, handler, keys) {
    var args = s6.overArgs(3, arguments);
    args.unshift(event);
    var eCtrl = event.ctrlKey;
    var eAlt = event.altKey;
    var eShift = event.shiftKey;
    var eChar = event._character;
    var eKey = event.keyIdentifier;

    for (var i = 0, l = keys.length; i < l; i ++) {
        var key = keys[i], ctrl = false, alt = false, shift = false;

        if (key.match(/Control-/) && !eCtrl || key.match(/Alt-/) && !eAlt) {
            continue;
        }

        if (key.match(/Shift-/)) {
            shift = true;
        }

        var keySplit = key.split(/-/);
        var plainKey = keySplit[keySplit.length-1];

        if (plainKey == eKey && shift == eShift) {
            return handler.apply(this, args);
        }

        if (plainKey == eChar) {
            return handler.apply(this, args);
        }

    }
    return true;
};
s6._eventCount = 0;
s6._events = [];
s6._handleEvent = function(event) {

    var priorityList, events, priorities;

    event = event || window.event;

    if (event.type == 'keypress' || s6.uai.ie && event.type == 'keydown') {
        s6.keyIdentifier(event);
    }

    if (s6.uai.ie && !event.target) {
        event.target = event.srcElement;
    }
    events = this.__s6events__;
    priorities = events[event.type];
    priorityList = [];
    for (var n in priorities) {
        priorityList.push(+n);
    }
    priorityList = priorityList.sort(s6._sortPriority);
    for (var i = 0, l0 = priorityList.length; i < l0; i ++) {
        priority = priorityList[i];
        var handlers = priorities[priority]
        for (var j = 0, l1 = handlers.length; j < l1; j ++) {
            var handlerInfo = handlers[j];
            var handler = handlerInfo[0];
            var self = handlerInfo[1];
            var args = handlerInfo[2];
            args = [event].concat(args);
            var result = handler.apply(self || this, args);
            if (result === false) {
                s6._stopEvent(event);
                return false;
            }
        }
    }
    return true;
};
s6._sortPriority = function(a, b) {
    return b - a;
};
s6._stopEvent = function(event) {
    if (s6.uai.ie) {
        event.returnValue = false;
        event.cancelBubble = true;
    }
    else {
        event.preventDefault();
        event.stopPropagation();
    }
};

// ���֥�������̾: detach �ؿ�
// ���٥�ȥϥ�ɥ� ID ��Ȥäƥ��٥�Ȥβ����Ԥ�
s6.detach = function(handlerId) {
    var eventInfo = this._events[handlerId];
    this._detach(eventInfo.element, eventInfo.type, eventInfo.handler, eventInfo.priority);
    this._events[handlerId] = null;
};
s6._detach = function(element, type, handlerInfo, priority) {
    var events = element.__s6events__;
    var priorities = events[type];

    if (!priorities) {
        return;
    }

    var handlers = priorities[priority];

    if (!handlers) {
        return;
    }

    for (var i = 0, l0 = handlers.length; i < l0; i ++) {
        var handler = handlers[i];

        for (var j = 0, l1 = handlerInfo.length; j < l1; j ++) {
            if (handler[j] != handlerInfo[j]) {
                break;
            }
        }
        if (handlerInfo.length == j) {
            handlers.splice(i, 1);
            break;
        }
    }

    // ������� priority �ˤ���ʾ奤�٥�Ȥ���Ͽ����Ƥ��ʤ�����
    // priority ����
    if (handlers.length == 0) {
        delete priorities[priority];
    }

    // ������� type �ˤ���ʾ奤�٥�Ȥ���Ͽ����Ƥ��ʤ�����
    // type ���� onxxx �ؿ����� 
    if(s6.emptyHash(priorities)) {
        delete events[type];
        element['on' + type] = null;
    }

    // �⤦���٤Ƥ� type �Υ��٥�Ȥ�������줿���� __s6events__ ����
    if (s6.emptyHash(events)) {
        element.__s6events__ = null;
    }
}

// ���֥�������̾: detachAll �ؿ�
// ���٤ƤΥ��٥�Ȥ��������
s6.detachAll = function() {
    for (var i = 0; i < this._events.length; i ++) {
        var eventInfo = this._events[i];
        if (eventInfo) {
            this._detach(eventInfo.element, eventInfo.type, eventInfo.handler, eventInfo.priority);
            this._events[i] = null;
        }
    }
};
// �Ǹ�����ƤΥ��֥������Ȥ��������ʥ���꡼���к���
s6.attach(window, 'unload', function(e) {
    s6.detachAll();
    s6.extervalAll();
});

// ���֥�������̾: fire �ؿ�
// �ƥ��Ȥʤɤ˻Ȥ������٥�Ȥ��¹Ԥ��줿���֤ˤ��ʤ�ᤤ���֤���Ф���
s6._keyModifierTypes = {
    altKey: 'Alt',
    altGraphKey: 'AltGraph',
    ctrlKey: 'Control',
    metaKey: 'Meta',
    shiftKey: 'Shift'
};
s6.fire = function(element, type, options) {

    // ���٥�Ȥμ��̤ˤ�äƿ���ʬ���ƽ������Ԥ�
    switch (type) {

        // Keyboard �ϤΥ��٥��
        case 'keypress':
        case 'keydown':
        case 'keyup':
            var event = this._keyboardEvent(element, type, options);
            break;

        // Mouse �ϤΥ��٥��
        case 'click':
        case 'mousemove':
        case 'mouseover':
        case 'mouseout':
        case 'contextmenu':
            var event = this._mouseEvent(element, type, options);
            break;

        // ����¾�Υ��٥��
        default:
            var event = this.opts(options, {
                type: type,
                target: element,
                srcElement: element
            });
    }

    // stopPropagation ��ϥ�ɥ�󥰤��뤿��˾��
    event.stopPropagation = function() {
        this.cancelBubbles = true;
    }
    // preventDefault ��ϥ�ɥ�󥰤��뤿��˾��
    event.preventDefault = function() {
        this.returnValue = false;
    }
    // �Ĥä��ץ�ѥƥ���ޡ���
    // �ºݤ˥��٥�Ȥ�ȯ�Х��ߥ�졼����󤹤�
    if (!event.bubbles) {
        return element['on' + event.type](event);
    }
    else {
        do {
            if (element['on' + event.type]) {
                element['on' + event.type](event);
            }
        } while (!event.cancelBubbles && (element = element.parentNode));

        if (!event.cancelBubbles && element != view) {
            var view = this._view(element);
            if (view['on' + event.type]) {
                view['on' + event.type](event);
            }
        }
        if (event.cancelBubbles) {
            return false;
        }
    }
};
s6._keyboardEvent = function(element, type, options) {
    options = this.opts(options, {
        target: element,
        type: type,
        bubbles: true,
        cancelable: true,
        view: this._view(element),
        detail: 1,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        keyCode: 0,
        charCode: 0,
        which: undefined,
        // Safari
        altGraphKey: undefined,
        // IE
        srcElement: element,
        ctrlLeft: undefined,
        altLeft: undefined,
        shiftLeft: undefined,
        // DOM 3 Events
        keyIdentifier: undefined,
        keyLocation: undefined
    });

    if (s6.uai.ie && options.type == 'keypress') {
        options.type = 'keydown'
    }

    // modifiersList ������Ȥ�������
    var modifiersList = [];
    var modifierTypes = this._keyModifierTypes;
    for (var n in modifierTypes) {
        if (options[n]) {
            modifiersList.push(modifierTypes[n]);
        }
    }
    // options �ȥޡ�������
    options = this.opts(options, { modifiersList: modifiersList.join(' ') });

    return options;
};
s6._mouseEvent = function(element, type, options) {
    return this.opts(options, {
        target: element,
        type: type,
        bubbles: true,
        cancelable: true,
        view: this._view(element),
        detail: 1,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        keyCode: 0,
        charCode: 0,
        which: undefined,
        button: 0, // ������å��ξ��� 3
        relatedTarget: element,
        // Safari
        altGraphKey: undefined,
        // IE
        offsetX: 0,
        offsetY: 0,
        x: 0,
        y: 0,
        srcElement: element,
        ctrlLeft: undefined,
        altLeft: undefined,
        shiftLeft: undefined
    });
};
s6._view = function(element) {
    var doc, view;
    if (!element) {
        return window;
    }
    else if (element.window == element) { // defaultView �Ǥ��뤫
        return element;
    }
    else if (element.nodeType == 9 && (view = element.defaultView)) { // document �Ǥ��뤫
        return view;
    }
    else if ((doc = element.ownerDocument) && (view = doc.defaultView)) { // ���ǤǤ����
        return view;
    }
    else {
        return window;
    }
};


// ���֥�������̾: Command ���󥹥ȥ饯��
// ���ޥ�ɤ��ۤ��롣
// ���ޥ�ɤȤϡ���ǽ�������ӤĤ������򤹤륪�֥������Ȥǡ�
// handle ���뤳�Ȥǽ������ɲäǤ��롣
// fire ���뤳�Ȥǽ�����¹ԤǤ��롣
// attach ���뤳�Ȥǥ��٥�Ȥ���Ͽ�Ǥ��롣
// attach �ξ��� handle ����ؿ��˥��٥�ȥ��֥������Ȥ��Ϥ����ȤϤǤ��ʤ���
// ����ϡ����ޥ�ɤ�����Υ��٥�Ȥ˰�¸���ʤ�������߷פǤ��롣
// attach �Ǥϡ��軰�����˾����Ϥ����Ȥǥ��٥�Ȥκ٤��ʼ���Ǽ¹��Լ¹Ԥ�����Ǥ��롣
// ���Ȥ��С� command.attach(element, 'click', function(e) { return e.button == 3 }); 
// �Τ褦�ˤ���С�������å��ΤȤ��� handle ����ؿ���¹Ԥ��뤳�Ȥ��Ǥ��롣
// interval ���뤳�Ȥ�����¹Ԥ��뤳�Ȥ��Ǥ��롡
// �ޤ��� handle ����Ȥ��� fire, attach, interval ����Ȥ���������Ϥ����Ȥ��Ǥ��롣
// ���ξ��ΰ����� handle ����Ȥ����Ϥ��줿��ΤΤ��Ȥˡ�����¾��³�������ˤʤ롣
// ���Ȥ��С�
// command.handle(handler, hoge, fuga, muga);
// command.fire(piyo, puyo);
// �Ȥ�����硢 handler �� handler.apply(hoge, [fuga, muga, piyo, puyo]);
// �ȸƤӽФ��줿��Ʊ�ͤˤʤ롣
s6.Command = function() {
    var self = function() { return self.fire.apply(self, arguments) };
    var prototype = s6.Command.prototype;
    for (var n in prototype) {
        self[n] = prototype[n]
    };
    self.handlers = {};
    self.counter = 1;
    return self;
};

s6.Command.prototype = {
    unhandle: function(id) {
        s6.detach(id);
    },
    handle: function(handler, priority, self) {
        var args = s6.overArgs(3, arguments);
        return s6.attach(this, 'exec', this._handleCommand, priority, self, handler, args);
    },
    _handleCommand: function(e, handler, args) {
        return handler.apply(this, args.concat(e.args));
    },
    fire: function() {
        return s6.fire(this, 'exec', { args: s6.toArray(arguments) });
    },

    // �軰�����Ͼ�ά��ǽ
    // command.attach(document, 'click', arg1, arg2, arg3);
    // command.attach(document, 'click', function(e) { return e.button == 0 }, arg1, arg2, arg3);
    attach: function(receiver, type, func) {
        var length = 2;
        if (typeof func == 'function') {
            var checker = func;
            var length = 3;
        }
        var args = s6.overArgs(length, arguments);
        return s6.attach(receiver, type, this._attach, 0, this, checker, args);
    },
    _attach: function(e, checker, args) {
        if (!checker || checker(e)) {
            return this.fire.apply(this, args);
        }
        return true
    },
    detach: function(id) {
        s6.detach(id);
    },

    // ��������Ϸ����֤���̵ͭ(setTimeout �� setInterval �ΰ㤤)
    // �������Ϸ����֤��ߥ��ÿ�
    // command.interval(1000, true);  // ���ä����˼¹�
    // command.interval(1000, false); // ���ø�˰��ټ¹�
    interval: function(ms, loop) {
        var args = s6.overArgs(2, arguments);
        return s6.timeInterval(this._interval, ms, loop, this, args);
    },
    _interval: function(args) {
        return this.fire.apply(this, args);
    },
    exterval: function(id) {
        s6.exterval(id);
    }
};

// ���֥�������̾: commandize �ؿ�
s6.mixinCommands = function(klass) {
    var proto = klass.prototype;
    var commandNames = s6.overArgs(1, arguments);

    // �ǽ�ΰ������¹�
    if (!proto._mixinedCommand) {
        proto.commandNames = [];
        var methodNames = ['handle', 'unhandle', 'attach', 'detach'];
        for (var i = 0, l = methodNames.length; i < l; i ++) {
           var methodName = methodNames[i];
            proto[methodName] = s6['_' + methodName + 'Command'];
        }
        proto.createCommands = s6._createCommands;

        proto._mixinedCommand = true;
    }

    for (var i = 0, l = commandNames.length; i < l; i ++) {
        var commandName = commandNames[i];
        proto['_' + commandName] = proto[commandName];
        var f = proto[commandName] = function() {
            var command = this.commands[arguments.callee.commandName];
            return command.fire.apply(command, arguments);
        };
        f.commandName = commandName;
        proto.commandNames.push(commandName);
    }
};

s6._createCommands = function() {
    var commandNames = this.commandNames;
    for (var i = 0, l = commandNames.length; i < l; i ++) {
        var commandName = commandNames[i];
        this.handle(commandName, this['_' + commandName], 0, this);
    }
};

s6._handleCommand = function(commandType, handler, priority, self) {
    var args = s6.overArgs(1, arguments);

    // priority �Υǥե�����ͤ� 0
    args[1] = args[1] || 0;

    // ���ޥ�����󤬤ʤ������ɲ�
    if (!this.commands) {
        this.commands = {};
    }
    var command = this.commands[commandType];
    if (!command) {
        var command = this.commands[commandType] = new s6.Command();
    }
    return commandType + '|' + command.handle.apply(command, args);
};

s6._unhandleCommand = function(id) {
    var commandTypeAndId = id.split('|');
    var commandType = commandTypeAndId[0];
    id = + commandTypeAndId[1];

    if (!this.commands) {
        return;
    }
    var command = this.commands[commandType];
    if (!command) {
        return;
    }
    command.unhandle(id);
};

// ���ޥ�ɤ����������Ƥ�
// �����ϰʲ��� 4 �ѥ�����
// �Ĥä��������ɲð����Ȥ����Ϥ����
// obj.attach(
//     'click',
//     'step');
// obj.attach(
//     'click',
//     function(e) { return e.button == 0 }, 
//     'step');
// obj.attach(
//     elm,
//     'click',
//     'step');
// obj.attach(
//     elm,
//     'click',
//     function(e) { return e.button == 0 }, 
//     'step');
s6._attachCommand = function() {
    
    args = s6.toArray(arguments);

    if (typeof args[0] == 'string') {
        if (this.getElement) {
            var element = this.getElement();
        }
        else if (this.element) {
            var element = this.element;
        }
        args.unshift(element);
    }

    if (typeof args[2] == 'function') {
        var commandType = args.splice(3, 1);
    }
    else {
        var commandType = args.splice(2, 1);
    }

    if (!this.commands) {
        this.commands = {};
    }
    var command = this.commands[commandType];
    // ���ޥ�ɤ�̵�����Ͽ����˥��ޥ�ɤ��ɲ�
    if (!command) {
        var command = this.commands[commandType] = new s6.Command();
    }

    return command.attach.apply(command, args);
};

s6._detachCommand = function(id) {
    return s6.detach(id);
};


// ���֥�������̾: load �ؿ�
// DOM �����ۤ�������褵���ľ���˼¹Ԥ����Ϥ��δؿ�
// ��������ʬ�� jQuery �Υ������򻲹ͤˤ��ޤ�����
// �������꤬����к�Ԥޤ�Ϣ���Ƥ���������
// http://code.jquery.com/jquery-latest.js
s6.load = function(e) {
    // ����ܰʹ�̵�뤹�� or body �����ۤ���Ƥ��ʤ����
    // �¹Ԥ��ʤ�
    if (s6._loaded || !document.body) {
        return;
    }
    s6._loaded = true;

    // s6.attach(s6, 'ready', function(){}); 
    // �Ȥ����褦����Ͽ���뤳�ȤǼ¹ԤǤ��롣
    s6.fire(s6, 'ready');

    // ����ܸƤФ줿���Ϥ��٤ƤΥ��٥�Ȥ��˴�����
    // s6._loaded �ե饰�򤿤Ƥ�
    var self = arguments.callee;
    if (s6.uai.ie) {
        window.detachEvent('onload', self);
    }
    else {
        if (s6.uai.gecko || s6.uai.opera) {
            document.removeEventListener('DOMContentLoaded', self, false);
        }
        else if (s6.uai.webkit && s6._webkitInitTimer) {
            clearInterval(s6._webkitInitTimer);
            s6._webkitInitTimer = null;
        }
        window.removeEventListener('load', self, false);
    }
};
// DOMContentLoaded ���٥�Ȥ��Ȥ�����
if (s6.uai.gecko || s6.uai.opera) {
    document.addEventListener('DOMContentLoaded', s6.load, false);
    window.addEventListener('load', s6.load, false);
}
// IE �ξ��� defer �� script ���ɤޤ�륿���ߥ󥰤�
else if (s6.uai.ie) {
    document.write('<script id="__s6_init" defer="true" src="//:"></script>');
    document.getElementById('__s6_init').onreadystatechange = function() {
        if (this.readyState != 'complete') {
            return;
        }
        this.parentNode.removeChild(this);
        s6.load();
    };
    window.attachEvent('onload', s6.load);
}
// WebKit �ξ��� setInterval �Ǽ¹ԤǤ���褦�ˤʤ�ޤ��Ԥġ�
else if (s6.uai.applewebkit) {
    s6._webkitInitTimer = setInterval(function(){
        if (document.readyState == "loaded" || document.readyState == "complete" ) {

            clearInterval(s6._webkitInitTimer);
            s6._webkitInitTimer = null;

            s6.load();
        }
    }, 10); 
    window.addEventListener('load', s6.load, false);
}
else {
    window.addEventListener('load', s6.load, false);
}
s6.load();


// ���֥�������̾: cstyle �ؿ�
// ComputedStyle �� currentStyle ���������
// IE �ξ�� currentStyle �ϰʲ��Τ褦������������Τ����
//  - �����Ǽ��Τ��Ѥ����Ѥ��Τ����
//  - DOM �ĥ꡼�˷Ҥ��äƤ��ʤ����� null �Ȥʤ�
s6.cstyle = function(element) {
    var doc = element.ownerDocument;
    var view = doc.defaultView;
    if (view) {
        return view.getComputedStyle(element, '');
    }
    else {
        return element.currentStyle;
    }
};

// ���֥�������̾: css �ؿ�
// ���쥯���˻��ꤷ�����������Ŭ�Ѥ��ޤ���
s6.css = function(selector, props, options) {
    options = this.opts(options, {
        doc: document
    });
    var uai = this.uai;

    if (typeof selector == 'string') {
    
        // �ǽ�ΰ������� styleSheet ���������
        var sheet = this._cssSheet;
        if (!sheet) {
            var doc = options.doc;
    
            // IE �ξ��� createStyleSheet �ؿ��ǰ�ȯ
            if (uai.ie) {
                var sheet = doc.createStyleSheet();
                this._cssSheet = sheet;
                this._cssRules = sheet.rules;
            }
            else {
                // ���ֺǽ�� styleSheet ��ȤäƤߤ롣
                var sheet = this._cssSheet = document.styleSheets[0];
    
                // ��Ĥ� styleSheets ��̵������ style ���Ǥ���������
                // ��¸�� styleSheets �����äƤ��������٤�� 10 �ܤΥ����ȤȤʤ�
                if (!sheet) {
                    var styleElm = doc.createElement('style');
                    if (uai.applewebkit) {
                        styleElm.appendChild(document.createTextNode(''));
                    }
                    var heads = doc.getElementsByTagName('head');
                    if (heads) {
                        var parent = heads[0];
                    }
                    if (!parent) {
                        parent = doc.body;
                    }
                    parent.appendChild(styleElm);
                    sheet = this._cssSheet = styleElm.sheet;
                }
                this._cssRules = sheet.cssRules;
            }
            this._cssLength = this._cssRules.length;
        }
        rules = this._cssRules;
    
        if (selector in this._cssStyles) {
            var style = this._cssStyles[selector];
        }

        // selector ��̵����� insertRule or addRule �ˤ�äƶ��Υ롼�����������
        // ���Υ롼��� style ���֥������Ȥ���Ф�
        else {
            if (uai.ie) {
                sheet.addRule(selector, 'dummy:0');
                this._cssLength ++;
                var addedRule = rules[this._cssLength - 1];
                var style = addedRule.style;
            }
            else {
                // �����Ƭ������
                sheet.insertRule(selector + '{}', this._cssLength);
                this._cssLength ++;
    
                // Safari
                if (uai.applewebkit) {
                    rules = this._cssRules = sheet.cssRules;
                    this._cssLength = rules.length;
                }
               
                // �����Ƭ����� 
                var addedRule = rules[this._cssLength - 1]; 
                var style = addedRule.style;
            }
            this._cssStyles[selector] = style;
        }
    }
    else {
        var style = selector;
    }

    if (s6.uai.ie) {
        if ('opacity' in props) {
            props.filter = 'alpha(opacity=' + props.opacity * 100 + ')';
            delete props.opacity;
        }
        if ('float' in props) {
            props.styleFloat = props.float;
            delete props.float;
        }
    }
    else {
        if ('float' in props) {
            props.cssFloat = props.float;
            delete props.float;
        }
    }

    for (var n in props) {
        style[n] = props[n];
    }
};
s6._cssStyles = {};


s6.intervalTime = 40;

// ���֥�������̾: interval �ؿ�
// interval ������Ԥ��ؿ�����Ͽ���롣
// ��Ͽ���줿�ؿ��� 40ms ���Ȥ˰��ƤӽФ���롣
s6.interval = function(callback, self) {
    var callbacks = this._intervalCallbacks;
    var selfs = this._intervalSelfs;
    var args = this._intervalArguments;
    var uai = s6.uai;
    this._intervalCounter ++;

    var arg = s6.overArgs(2, arguments);
    callbacks[this._intervalCounter] = callback;
    selfs[this._intervalCounter] = self;
    args[this._intervalCounter] = arg;

    if (!this._intervalId) {
        for (var i in callbacks) { 
            if (uai.ie) {
                this._intervalId = setInterval(this._handleIntervalIefix, s6.intervalTime);
            }
            else {
                this._intervalId = setInterval(this._handleInterval, s6.intervalTime, callbacks, selfs, args);
            }
            break;
        }
    }
    return this._intervalCounter;
};

// ���֥�������̾: exterval �ؿ�
// interval �ؿ��ˤ�ä���Ͽ���줿�ؿ���������
s6.exterval = function(id) {
    delete this._intervalCallbacks[id];
    delete this._intervalSelfs[id];

    if (this._intervalId && this.emptyHash(this._intervalCallbacks)) {
        clearInterval(this._intervalId);
        this._intervalId = null;
    }
};
s6._intervalCounter = 0;
s6._intervalCallbacks = {};
s6._intervalSelfs = {};
s6._intervalArguments = {};
s6._handleIntervalIefix = function() {
    var cbs = s6._intervalCallbacks;
    var selfs = s6._intervalSelfs;
    var args = s6._intervalArguments;
    for (var i in cbs) cbs[i].apply(selfs[i], args[i]);
};
s6._handleInterval = function(cbs, selfs, args) {
    for (var i in cbs) cbs[i].apply(selfs[i], args[i]);
};

// ���֥�������̾: extervalAll �ؿ�
// interval �ˤ�ä���Ͽ����Ƥ���ؿ��򤹤٤��˴����ޤ���
s6.extervalAll = function() {
    var callbacks = this._intervalCallbacks;
    for (var i in callbacks) {
        this.exterval(i);
    }
};

// ���֥�������̾: timeInterval
// ��������ǻ��֤���ꤷ�ơ��軰�����Ƿ����֤���̵ͭ���Ϥ��ޤ���
// s6.interval �Υ�åѡ��Ȥ��Ƽ�������Ƥ���Τǲ������Ȥ��� s6.exterval ��Ȥ��ޤ���
s6.timeInterval = function(callback, time, loop, self) {
    var args = s6.overArgs(4, arguments);
    var obj = {
        callback: callback,
        time: time,
        count: time,
        self: self,
        loop: loop,
        args: args
    };
    return (obj.id = s6.interval.call(s6, s6._handleTimeInterval, null, obj));
};
s6._handleTimeInterval = function(obj) {
    obj.count -= s6.intervalTime;
    if (obj.count <= 0) {
        obj.callback.apply(obj.self, obj.args);
        obj.count = obj.time;
        if (!obj.loop) {
            s6.exterval(obj.id);
        }
    }
};

// ���֥�������̾: Page ���󥹥ȥ饯��
// new ���뤳�Ȥˤ�ä� Page ���֥������Ȥ���������
s6.Page = function(options) {

    // �Ѿ��ѤΥץ�ȥ����פ���������
    if (options && options.forPrototype) {
        return;
    }

    this.options = options = s6.opts(options, {
        doc: document,
        transition: s6.transitions.sinoidal,
        pageEffect: s6.pageEffects.fade,
        pageEffectDelay: 0.4,
        element: undefined,
        noIndex: false,
        styleBase: 'default'
    });

    this.noIndex = options.noIndex;

    // action �ط��Υץ�ѥƥ�
    this.actionIndex = 0;
    this.busy = false;
    this.actionStateCache = {
        interval: [],
        element: []
    };

    var doc = this.document = options.doc;
    var elm = this.element = options.element || doc.createElement('div');
    elm.__s6Page__ = this;
    var style = this.style = elm.style;
    this.transition = options.transition;
    if (elm.__s6Effect__) {
        var effectInfo = elm.__s6Effect__;
        this.pageEffect = s6.pageEffects[effectInfo[0]];
        var delay = effectInfo[1];
    }
    else {
        this.pageEffect = options.pageEffect;
        var delay = options.pageEffectDelay;
    }
    this.gain = 1 / (delay / (s6.intervalTime / 1000));

    style.display = 'none';
    this.display = false;

    s6.addClass(elm, 'page');

    var styleBase = elm.__s6StyleBase__;
    if (styleBase) {
        s6.addClass(elm, styleBase);
    }
    else {
        s6.addClass(elm, options.styleBase);
    }

    this.actions = [];
    if (elm.__s6Actions__) {
        var actions = elm.__s6Actions__;
        for (var i = 0, l = actions.length; i < l; i ++) {
            this.appendAction(actions[i]);
        }
    }

    if (s6.uai.ie && s6.uai.ie < 7) {
        var childs = elm.childNodes;
        for (var i = 0, l = childs.length; i < l; i ++) {
            var child = childs[i];
            if (child.nodeType == 1 && child.nodeName.toLowerCase() != 'script') {
                s6.addClass(child, 'element');
            }
        }
    }

/*
    // s6.mixinCommands �򤹤����ɬ��
    if (this.createCommands) {
        this.createCommands();
    }
*/
};

// ���֥�������̾: Page �ץ�ȥ�����
// Page ���֥������ȤΥץ�ȥ����ס�
s6.Page.prototype = {

    // ���󥿡��Х����
    interval: function() {
        var id = s6.interval.apply(s6, arguments)
        this.actionStateCache.interval.push(id);
        return id;
    },

    // ���󥿡��Х���
    exterval: function(id) {
        var cache = this.actionStateCache.interval;
        for (var i = 0, l = cache.length; i < l; i ++) {
            if (cache[i] == id) {
                cache.splice(i, 1);
                s6.exterval(id);
                return;
            }
        }
    },

    // ���󥿡��Х������
    extervalAll: function() {
        var cache = this.actionStateCache.interval;
        for (var i = 0, l = cache.length; i < l; i ++) {
            var id = cache.push();
            s6.exterval(id);
        }
    },

    // �ڡ����Υ롼�����Ǥ� style.display �� true|false �ǻ��ꤹ�롣
    // �����Ȥ����Ȥˤ�ä��ͤ򥭥�å��夷�Ƥ���롣
    // display ���ѹ�������Ͼ�ˤ��δؿ���Ȥ��٤�
    setDisplay: function(display) {
        if (this.display == display) {
            return;
        }
        if (display) {
            this.style.display = '';
        }
        else {
            this.style.display = 'none';
        }
        this.display = display;
    },

    // �ץ쥼��ơ�����󳫻�����
    // ��ʬ�Υڡ�����ɽ�����֤򹹿����롣
    prepare: function(pagePosition) {
        if (pagePosition == 0) {
            this.setDisplay(true);
        }
        else {
            this.setDisplay(false);
        }
    },

    // ���Υڡ����Υ롼������
    cloneElement: function() {
        var element = this.element.cloneNode(true);
        if (!this.display) {
            element.style.display = '';
        }
        return element;
    },

    // �ץ쥼��ơ������˳�����Ƥ�줿�Ȥ���
    // Presentation ���֥������Ȥ���ƤӽФ���롣
    setPresentation: function(presentation) {
        this.presentation = presentation;
    },

    // �ץ쥼��ơ��������ڤ�Υ���줿�Ȥ���
    // Presentation ���֥������Ȥ���ƤӽФ���롣
    deletePresentation: function(presentation) {
        if (this.presentation == presentation) {
            this.presentation = null;
        }
    },

    // �ڡ����˥����������ɲä��롣
    // [[1, 2], 'fade opacity', 
    appendAction: function(action) {
        this.actions.push(action);
        action.setPage(this);
    },

    // �ڡ����Υ���������¹Ԥ���
    action: function() {
        this.busy = true;
        var action = this.actions[this.actionIndex];
        action.action();
        return true;
    },

    // Action ����λ�����
    // ���Υ᥽�åɤ��ƤФ��
    finishAction: function() {
        this.actionIndex ++;
        this.busy = false;
        return true;
    },

    // �ޤ��¹Ԥ��Ƥ��ʤ����������¸�ߤ����
    // true ���֤��� !! �� bool ��
    hasAction: function() {
        return !!this.actions[this.actionIndex];
    },

    // �ڡ������ܤ��Ƹ����ʤ��ʤä����˸ƤӽФ���롣
    // ����ʳ��ǸƤӽФ���뤳�ȤϤʤ���
    // ���٤ƤΥ�����������������
    // ���Ȥ��� busy �Ǥ�������������Ǥ��롣
    reset: function() {
        var actions = this.actions;

        for (var i = 0, l = actions.length; i < l; i ++) {
            actions[i].reset();
        }

        this.actionIndex = 0;
        this.extervalAll();
        this.busy = false;
        return true;
    }
};

/*
s6.mixinCommands(s6.Page, 
    'reset', 'action', 'finishAction');
*/

// ���֥�������̾: IndexPage ���󥹥ȥ饯��
// Page ���󥹥ȥ饯�����ĥ�������
// Presentation �����ڡ����Υꥹ�Ȥ��뤳�Ȥ��Ǥ��롣
s6.IndexPage = function(options) {
    options = s6.opts(options, {
        styleBase: 'index',
        thema: 'dark'
    });

    s6.Page.apply(this, arguments);
    this.options = options = s6.opts(this.options, {
        rowCount: 5,
        presentation: undefined
    });

    this.pageElements = [];
    this.wrapperElements = [];

    if (options.presentation) {
        this.setPresentation(options.presentation);
    }

    this.rowCount = options.rowCount;
    this.innerPresentation = new s6.Presentation({
        noIndexPage: true, 
        additionalClassName: 'inner', 
        basePresentation: this.presentation,
        thema: options.thema
    });
    this.element.appendChild(this.innerPresentation.element);

/*
    // s6.mixinCommands �򤹤����ɬ��
    if (this.createCommands) {
        this.createCommands();
    }
*/
};

// ���֥�������̾: IndexPage �ץ�ȥ�����
// Page �ץ�ȥ����פ�Ѿ����Ƥ��롣
// IndexPage ���֥������ȤΥץ�ȥ����פȤʤ륪�֥������ȡ�
s6.IndexPage.prototype = new s6.Page({ forPrototype: true });
s6.IndexPage.prototype.prepare = function() {
    this.createIndex();
    this.innerPresentation.start();
};
s6.IndexPage.prototype.next = function() {
    return this.innerPresentation.next();
};
s6.IndexPage.prototype.prev = function() {
    return this.innerPresentation.prev();
};
s6.IndexPage.prototype.select = function(index) {
    if ('selectedIndex' in this) {
        s6.delClass(this.wrapperElements[this.selectedIndex], 'selected');
    }
    s6.addClass(this.wrapperElements[index], 'selected');
    this.selectedIndex = index;
    return true;
};
s6.IndexPage.prototype.unselect = function() {
    if ('selectedIndex' in this) {
        s6.delClass(this.wrapperElements[this.selectedIndex], 'selected');
    }
    delete this.selectedIndex;
    return true;
};
s6.IndexPage.prototype.go = function(index) {
    if ('selectedIndex' in this) {
        this.presentation.go(index);
    }
    return true;
};
s6.IndexPage.prototype.attachPage = function(event, callback) {
    s6.attach(this.element, event, this._attachPage, 0, this, this.element, callback);
};
s6.IndexPage.prototype._attachPage = function(e, parent, callback) {
    var element = e.target;
    do {
        if (element == parent) {
            return false;
        }
        else if (typeof element.__s6PageIndex__ == 'number') {
            break;
        }
    } while(element = element.parentNode);
    callback(element.__s6PageIndex__, element, element.parentNode);
    return false;
};
s6.IndexPage.prototype.createIndex = function() {
    var pages = this.presentation.pages;
    var innerPresentation = this.innerPresentation;
    var innerPage, innerElement;
    var pageMaxCount = this.rowCount * this.rowCount;
    var pageElements = this.pageElements;
    var wrapperElements = this.wrapperElements;
    var pageCount = 0;
    for (var i = 0, l = pages.length; i < l; i ++) {
        var page = pages[i];
        if (!page.noIndex) {
            if (pageCount % pageMaxCount == 0) {
                innerPage = new s6.Page({
                    styleBase: 'index',
                    pageEffect: s6.pageEffects.slide
                });
                innerPresentation.append(innerPage)
                innerElement = innerPage.element;
            }
            var pageElement = page.cloneElement()
            var wrapperElement = document.createElement('div');
            s6.addClass(wrapperElement, 'wrapper');
            wrapperElement.appendChild(pageElement);
            innerElement.appendChild(wrapperElement);
            pageElements.push(pageElement);
            wrapperElements.push(wrapperElement);
            pageElement.__s6PageIndex__ = i;
            pageCount ++;
        }
    }
};
s6.IndexPage.prototype.destroyIndex = function() {
    var innerPresentation = this.innerPresentation;
    innerPresentation.removeAll();
};

/*
s6.mixinCommands(s6.IndexPage,
    'go', 'next', 'prev', 'select', 'unselect');
*/


// ���֥�������̾: Action ���󥹥ȥ饯��
// new ���뤳�Ȥˤ�äƥ����������������
s6.Action = function(set, elements, actionEffect, transition, args) {
    this.elements = elements;
    this.actionEffectUpdate = actionEffect.update;
    this.actionEffectSnapshot = actionEffect.snapshot;
    this.actionEffectReset = actionEffect.reset;
    this.transition = transition;
    this.args = args;
    this.gain = 1 / (args[0] / (s6.intervalTime / 1000));
};

// ���֥�������̾: Action �ץ�ȥ�����
// Action ���֥������ȤΥ��󥹥ȥ饯����
s6.Action.prototype = {
    setActionSet: function(set) {
        this.set = set;
        this.page = set.page;
    },
    action: function() {
        if (this.busy) {
            return;
        }
        this.busy = true;

        var position = new s6.IncrementalObject(this.gain);

        var page = this.page; 
        var transition = this.transition;
        var actionEffectUpdate = this.actionEffectUpdate;
        var args = this.args;
        var data = {};
        var elements = this.elements;
        var styles = this.styles = [];
        var length = elements.length;
        for (var i = 0; i < length; i ++) {
            styles.push(elements[i].style);
        }

        this.cache = {};
        this.actionEffectSnapshot.call(this, this.cache, elements, styles, length);

        this.effectId = page.interval(this.handleActionEffect, this,
            actionEffectUpdate, transition, position, data, args, elements, styles, length);

        this.handleActionEffect(
            actionEffectUpdate, transition, position, data, args, elements, styles, length);
    },
    handleActionEffect: function(actionEffectUpdate, transition, position, data, args, elements, styles, length) {
        var pos = +position;

        var x = transition(pos);
        actionEffectUpdate.call(this, actionEffectUpdate, x, data, args, elements, styles, length);
        if (pos >= 0.99) {
            this.set.finish(this);
            this.busy = false;
            if (this.effectId) {
                this.page.exterval(this.effectId);
            }
            this.effectId = null;
        }
    },
    reset: function() {
        if (this.cache) {
            this.actionEffectReset.call(this, this.cache, this.elements, this.styles, this.elements.length);
        }
    }
}

// ���֥�������̾: ActionSet ���󥹥ȥ饯��
// new ���뤳�Ȥˤ�äƥڡ�����Υ���������Ԥ�����Υ��֥������Ȥ��롣
s6.ActionSet = function(actionInfos) {
    var actions = this.actions = [];
    for (var i = 0, l = actionInfos.length; i < l; i ++) {
        var actionInfo = actionInfos[i];

        var elements = actionInfo.shift();
        var effectInfos = actionInfo.shift().split(/\s+/);
        var actionEffect = s6.actionEffects[effectInfos.shift()];
        var args = actionInfo;
        var transition;

        for (var j = 0, l0 = effectInfos.length; j < l0; j ++) {
            var effectInfo = effectInfos.shift();
            var argsChanger;

            // transition ������� transition �����
            if (s6.transitions[effectInfo]) {
                transition = s6.transitions[effectInfo];
            }
            // transition ����ʤ����� actionEffect �� changeArgs_xxxx �Ȥ����ؿ�������м¹�
            // args ���䴰������Ū
            else if (argsChanger = actionEffect['changeArgs_' + effectInfo]) {
                args = argsChanger(args);
            }
        }

        // transition �Υǥե�����ͤϺ��ΤȤ������Ǥ�
        transition = transition || s6.transitions.sinoidal;

        actions.push(new s6.Action(this, elements, actionEffect, transition.asc, args));
    }
};


// ���֥�������̾: ActionSet ���󥹥ȥ饯��
// new ���뤳�Ȥˤ�äƥڡ�����Υ���������Ԥ�����Υ��֥������Ȥ��롣
s6.ActionSet = function(actionInfos) {
    var actions = this.actions = [];
    for (var i = 0, l = actionInfos.length; i < l; i ++) {
        var actionInfo = actionInfos[i];

        var elements = actionInfo.shift();
        var effectInfos = actionInfo.shift().split(/\s+/);
        var actionEffect = s6.actionEffects[effectInfos.shift()];
        var args = actionInfo;
        var transition;

        for (var j = 0, l0 = effectInfos.length; j < l0; j ++) {
            var effectInfo = effectInfos.shift();
            var argsChanger;

            // transition ������� transition �����
            if (s6.transitions[effectInfo]) {
                transition = s6.transitions[effectInfo];
            }
            // transition ����ʤ����� actionEffect �� changeArgs_xxxx �Ȥ����ؿ�������м¹�
            // args ���䴰������Ū
            else if (argsChanger = actionEffect['changeArgs_' + effectInfo]) {
                args = argsChanger(args);
            }
        }

        // transition �Υǥե�����ͤϺ��ΤȤ������Ǥ�
        transition = transition || s6.transitions.sinoidal;

        actions.push(new s6.Action(this, elements, actionEffect, transition.asc, args));
    }
};

// ���֥�������̾: ActionSet �ץ�ȥ�����
// ActionSet ���֥������ȤΥ��󥹥ȥ饯����
s6.ActionSet.prototype = {
    setPage: function(page) {
        this.page = page;
        var actions = this.actions;
        for (var i = 0, l = actions.length; i < l; i ++) {
            actions[i].setActionSet(this);
        }
    },
    action: function() {
        if (this.busy) {
            return;
        }
        this.count = 0;
        this.countEnd = this.actions.length;
        this.busy = true;
        var actions = this.actions;
        for (var i = 0, l = actions.length; i < l; i ++) {
            actions[i].action();
        }
    },
    finish: function(action) {
        if (this.busy) {
            this.count ++;
            if (this.count >= this.countEnd) {
                this.page.finishAction();
                this.count = null;
                this.countEnd = null;
                this.busy = false;
            }
        }
    },
    reset: function() {
        var actions = this.actions;
        for (var i = 0, l = actions.length; i < l; i ++) {
            var action = actions[i];
            action.reset();
        }
    }
};


// ���֥�������̾: Presentation ���󥹥ȥ饯��
// new ���뤳�Ȥˤ�ä� Presentation ���֥������Ȥ���
s6.Presentation = function(options) {
    options = s6.opts(options, {
        doc: document,
        thema: 'dark',
        ratio: 0.75,                    // �ץ쥼��ơ������νĲ���
        width: undefined,               // ��������ά����ʤ��ä���� height ���������
        height: undefined,              // ���������ꤵ��Ƥ� width �����ꤵ�줿����̵�뤵��롣ξ�����ꤵ��ʤ��ä����� width �� 400 �Ȥʤ�
        fontSize: 0.1,                  // height �ˤ����ͤ�ݤ����ͤ��١����Υե���ȥ������Ȥʤ�
        startIndex: 0,
        noIndexPage: false,             // ���Υ��ץ���� true �ξ�硢 index �ڡ����Ϻ���ޤ���
        additionalClassName: undefined, // �ɲä���륯�饹̾�Ǥ���
        basePresentation: undefined,    // �����˥ץ쥼�����ꤵ��Ƥ�����ϡ����Υץ쥼�󤫤� ratio, width, height, fontSize ��Ѿ�
        element: undefined              // ���Υ��ץ��������Ǥ����ꤵ�줿�������Ǥ��������ޤ���
    });
    if (!options.width && !options.height) {
        options.width = 1000;
    }

    this.index = options.startIndex || 0;
    this.pages = [];
    this.funcPages = {};
    this.backQueue = [];

    // DOM ��Ϣ������
    var doc = this.document = options.doc;
    var elm = this.element = options.element || doc.createElement('div');

    // options.element ��Ϳ����줿���Ǥ� body ���ä����
    // ���餿�ˡ����Ǥ�����
    if (options.element && elm.nodeName.toLowerCase() == 'body') {
        var bodyElm = elm;
        this.element = elm = document.createElement('div');
        bodyElm.appendChild(elm);
    }

    elm.__s6Presentation__ = this;
    var style = this.style = elm.style;
    var body = this.body = doc.body;

    s6.addClass(elm, 's6');
    s6.addClass(elm, options.thema);
    if (s6.uai.mac) {
        s6.addClass(elm, 'mac');
    }
    else {
        s6.addClass(elm, 'win');
    }
    if (options.additionalClassName) {
        s6.addClass(elm, options.additionalClassName);
    }

    if (options.basePresentation) {
        var basePresentation = options.basePresentation;
        this.width = basePresentation.width;
        this.height = basePresentation.height;
        this.fontSize = basePresentation.fontSize;
        s6.css(style, {
            WIDTH: '100%',
            height: '100%',
            fontSize: '100%'
        });
    }
    else {
        // page ����礭��(%, em)�δ��Ȥʤ���(width, height, fontSize)������
        if (options.width) {
            var width = this.width = options.width;
            var height = this.height = width * options.ratio;
        }
        else {
            var height = this.height = options.height;
            var width = this.width = options.height / options.ratio;
        }
        var fontSize = this.fontSize = height * options.fontSize;
        s6.css(style, {
            width: width + 'px',
            height: height + 'px',
            fontSize: fontSize + 'px'
        });
    }

    // ���ץ��������Ǥ����ꤵ�줿���
    // ľ���ξ����Ǥ��ɤ��
    // page ���ɲä���
    if (options.element) {
        var node = options.element.firstChild;

        var pages = [];
        if (node) {
            // ���٤ƤλҥΡ��ɤ�����
            do {
                // ���Ǥ��ä���
                if (node.nodeType == 1 && node.nodeName.toLowerCase() != 'script' && !s6.hasClass(node, 's6')) {
                    pages.push(new s6.Page({ element: node , noIndex: node.__s6Separator__ }));
                }
            } while(node = node.nextSibling);
        }
        for (var i = 0, l = pages.length; i < l; i ++) {
            this.append(pages[i]);
        }
    }
    else {
        body.appendChild(elm);
    }

    // ��ǽ�ڡ���
    if (!options.noIndexPage) {
        var indexPage = this.funcPages.index = new s6.IndexPage({
            pageEffect: s6.pageEffects.fadeScaleFromUp,
            transition: s6.transitions.lenear,
            thema: options.thema,
            presentation: this
        });
        this.element.appendChild(indexPage.element);
    }

/*
    // s6.mixinCommands �򤹤����ɬ��
    if (this.createCommands) {
        this.createCommands();
    }
*/
};


// ���֥�������̾: Presentation �ץ�ȥ�����
// Presentation ���֥������ȤΥץ�ȥ�����
s6.Presentation.prototype = {
    // ���ߤΥڡ����Υ���������ò�����
    // �⤷�����ߤΥڡ����Υ��������̵����Хڡ��������ܤ����롣
    step: function() {
        var page = this.getPage(this.index);

        // Action ����ä����
        if (page.busy) {
            return true;
        }

        if (page.hasAction()) {
            page.action();
        }
        else {
            return this.next();
        }
        return true;
    },

    // ���Υڡ����˰�ư����ȥꥬ���Ȥʤ�ؿ�
    // ���ߤ���ǽ�ڡ����ξ��ϵ�ǽ�ڡ����� next ��ƤӽФ�
    next: function() {
        if (typeof this.index == 'number') {
            return this.go(this.index + 1);
        }
        else {
            this.getPage(this.index).next();
        }
        return true;
    },

    // ���Υڡ����˰�ư����ȥꥬ���Ȥʤ�ؿ�
    // ���ߤ���ǽ�ڡ����ξ��ϵ�ǽ�ڡ����� prev ��ƤӽФ�
    prev: function() {
        if (typeof this.index == 'number') {
            return this.go(this.index - 1);
        }
        else {
            this.getPage(this.index).prev();
        }
        return true;
    },

    // ������˳����Ƥ����ڡ��������
    // �֥饦�������ܥ���ߤ����ʤ��
    // ��ǽ�ڡ��������ܤ�����������˻Ȥ�
    back: function() {
        var backQueue = this.backQueue;
        var result = true;
        if (backQueue.length) {
            result = this.go(this.backQueue.pop());
        }
        // push ���줿�ڡ����򥭥�󥻥�
        this.backQueue.pop();
        return result;
    },

    // ��ư��Υڡ����� index ����ꤹ�뤳�Ȥ�
    // �ڡ������ư���롣
    go: function(toIndex) {
        if (this.busy) {
            return true;
        }
        
        var fromIndex = this.index;
        var toPage = this.getPage(toIndex);

        if (!(toPage instanceof s6.Page)) {
            return true
        }

        var fromPage = this.getPage(fromIndex);

        if (fromIndex == toIndex) {
            return true;
        }

        // ����褦�ˤ��ޤΥڡ����򥭥�å��夵���Ƥ���
        this.backQueue.push(fromIndex);

        this.toIndex = toIndex;
        this.fromIndex = fromIndex;

        // ���ե������������̵���ˤ���
        // ���Ȥǻ����ѹ��Ϥ��뤫��
        this.busy = true;

        // Effect ����
        // 1 �ڡ����ܤ��� 2 �ڡ����ܤȤ����褦��
        // ����˥ڡ������ܤ��Ԥ�줿����������Υڡ�����
        // ���ե����Ȥ��Ȥ���
        // (�ڡ������ܤΥ��ե����Ȥϡ������ڡ������Ϥޤ�ڡ����Τ�Τ�����)
        // ���εդ� 2 �ڡ����ܤ��� 1 �ڡ����ܤΤ褦��
        // �߽�˥ڡ������ܤ��Ԥ�줿�������ܸ��Υڡ�����
        // ���ե����Ȥδ����ᤷ���Ȥ���
        // (���ФȤ��ƿ��դ�ư���Ƥ��ʤ����Ѥ�����)
        if (this.getDirection(fromIndex, toIndex)) {
            // ����˥ڡ������ܤ������
            this.startEffect(fromPage, toPage, toPage.pageEffect, toPage.transition.asc, toPage.gain);
        }
        else {
            // �ս�˥ڡ������ܤ������
            this.startEffect(toPage, fromPage, fromPage.pageEffect, fromPage.transition.desc, fromPage.gain);
        }
        return true;
    },

    // Effect �򳫻Ϥ��뤿��Υ��󥿡��Х����Ͽ��
    // �ǽ�ΰ쥿����饤���Ԥ���
    startEffect: function(fromPage, toPage, pageEffect, transition, gain) {
        var position = new s6.IncrementalObject(gain);

        // ���٥����˵����ä����ݤ���¸���뤿��Υ���å���
        var data = {};

        // ���Ǥȥ�������
        var toElement = toPage.element;
        var toStyle = toPage.style;
        var fromElement = fromPage.element;
        var fromStyle = fromPage.style;

        // ���󥿡��Х����Ͽ
        this.effectId = s6.interval(
            this.pageEffect, this,
            pageEffect, transition, position, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle);

        // �ǽ�ΰ쥿����饤���¹�
        this.pageEffect(
            pageEffect, transition, position, data,
            toPage, toElement, toStyle,
            fromPage, fromElement, fromStyle);
    },

    // �ڡ����ֹ�ޤ��ϵ�ǽ�� id ����ڡ�������Ф���
    getPage: function(i) {
        // �������Ѵ���ǽ�ʤ������˳�Ǽ
        if (!isNaN(+i)) {
            var page = this.pages[i];
        }
        else {
            var page = this.funcPages[i];
        }
        return page;
    },

    // �ڡ����οʤ����������
    // ���ե����Ȥ��������������������������
    // ���������ä��� true
    // ���������ä��� false ���֤�
    getDirection: function(from, to) {
        var fromType = typeof from;
        var toType = typeof to;

        if (fromType == 'number') {
            if (toType == 'number') {
                if (from - to < 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        else {
            if (toType == 'number') {
                return false;
            }
            else {
                return true;
            }
        }
    },

    pageEffect: function(
        pageEffect, transition, position, data,
        toPage, toElement, toStyle,
        fromPage, fromElement, fromStyle
    ) {
        var pos = +position;
        var x = transition(pos);

        if (x <= 0.01) {
            toPage.setDisplay(false);
            fromPage.setDisplay(true);
        }
        else if (x >= 0.99) {
            toPage.setDisplay(true);
            fromPage.setDisplay(false);
        }
        else {
            toPage.setDisplay(true);
            fromPage.setDisplay(true);
            pageEffect.update.call(
                this, pageEffect, x, data,
                toPage, toElement, toStyle,
                fromPage, fromElement, fromStyle
            );
        }

        if (pos <= 0.01) {
            pageEffect.setup.call(
                this, pageEffect, x, data,
                toPage, toElement, toStyle,
                fromPage, fromElement, fromStyle
            );
        }
        else if (pos >= 0.99) {
            pageEffect.teardown.call(
                this, pageEffect, x, data,
                toPage, toElement, toStyle,
                fromPage, fromElement, fromStyle
            );
            this.pageEffectEnd();
        }
    },

    // �ڡ������ե����Ȥ������ȸƤӽФ����
    pageEffectEnd: function() {
        if (this.effectId) {
            s6.exterval(this.effectId);
            this.effectId = null;
        }
        this.busy = false;
        this.index = this.toIndex;
        this.toIndex = null;
        this.getPage(this.fromIndex).reset();
        this.fromIndex = null;
    },

    // �ץ쥼��ơ������γ���
    start: function() {
        var index = this.index, pages = this.pages;
        for (var i = 0, l = pages.length; i < l; i ++) {
            pages[i].prepare(i - index);
        }
        for (var n in this.funcPages) {
            this.funcPages[n].prepare();
        }
    },

    // �ڡ������ɲ�
    append: function(page) {
        page.setPresentation(this);
        this.pages.push(page);
        var pageElement = page.element;

        // �⤦���˥ڡ��������Ǥ�
        // �ץ쥼������Ǥ�ľ���ˤ�����
        if (!(pageElement.parentNode == this.element)) {
            this.element.appendChild(page.element);
        }
    },

    // �ڡ���������
    insert: function(page, i) {
        if (typeof i == 'undefined' || i >= this.pages.length) {
            this.append(page);
        }
        else {
            page.setPresentation(this);
            var beforePage = this.pages[i];
            this.pages.splice(i, 0, page);
            this.element.insertBefore(page.element, beforePage.element);
        }
    },

    // �ڡ����κ��
    remove: function(page) {
        var pages = this.pages;
        for (var i = 0, l = pages.length; i < l; i ++) {
            if (pages[i] == page) {
                this._remove(page);
                pages.splice(i, 1);
                return;
            }
        }
    },

    // �ڡ��������������ؿ�
    _remove: function(page) {
        page.deletePresentation(this);
        this.element.removeChild(page.element);
    },

    // ���٤ƤΥڡ����κ��
    removeAll: function() {
        var pages = this.pages;
        for(var i = 0, l = pages.length; i < l; i ++) {
            this._remove(pages.shift());
        }
    },

    // �ץ쥼��ơ�������λ����
    // ���٤ƤΥ��٥�Ȥ�������
    // �ץ쥼��ơ���������Ǥ� body ����������
    end: function() {
        // TODO ���٥�Ȥ��ư�Ǻ��
        if (this.effectId) {
            s6.exterval(this.effectId);
            this.effectId = null;
        }
        this.removeAll();
        this.body.removeChild(this.element);
    }
};

/*
s6.mixinCommands(s6.Presentation,
    'go', 'step', 'next', 'prev', 'back');
*/


// ���֥�������̾: page.elementQuery
// FIXME �����ѡ�Ŭ���ʼ�����ʤ�Ȥ����롣
// div[1-3,6]/span[1]
s6.elementQuery = function(element, text) {
    return arguments.callee.step([element], text.split('/'));
};

// div[1-3,6]
s6.elementQuery.step = function(elements, texts) {
    var text = texts.shift();
    if (text) {
        var callee = arguments.callee;
        var results = [];
        var splited = text.split(/[\[\]]/);
        var tagName = splited[0];
        var condition = callee.condition(splited[1]);
        for (var i = 0, l0 = elements.length; i < l0; i ++) {
            var element = elements[i];
            var childs = element.childNodes;
            var count = 0;
            for (var j = 0, l1 = childs.length; j < l1; j ++) {
                var child = childs[j];
                if (child.nodeType == 1 && (tagName == '*' || tagName.toLowerCase() == child.tagName.toLowerCase())) {
                    if (!condition || condition[count]) {
                        results.push(child);
                    }
                    count ++;
                }
            }
        }
        return callee(results, texts);
    }
    return elements;
};
// [1-3,6]
s6.elementQuery.step.condition = function(text) {
    if (!text) return null;
    var results = {};
    var conditions = text.split(',');
    for (var i = 0, l = conditions.length; i < l; i ++) {
        var conditionss = conditions[i].split('-');
        if (conditionss.length == 1) {
            results[+conditionss[0]] = true;
        }
        else {
            for (var j = +conditionss[0], l0 = +conditionss[1]; j <= l0; j ++) {
                results[j] = true;
            }
        }
    }
    return results;
};


// ���֥�������̾: presentation �ؿ�
s6.presentation = function(json) {
};

// ���֥�������̾: page �ؿ�
// HTML ��������˥ץ쥼���ѤΥǡ�����������
s6.page = function(json) {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];

    var wrap = json.wrap;
    if (wrap) {
        var pElm = currentScript;
        var childs = [];
        while (pElm = pElm.previousSibling) {
            if (pElm.nodeType == 1 && pElm.nodeName.toLowerCase != 'script') {
                wrap --;
                childs.unshift(pElm);
                if (wrap == 0) {
                    break;
                }
            }
        }
        var elm = document.createElement('div');
        for (var i = 0, l = childs.length; i < l; i ++) {
            elm.appendChild(childs[i]);
        }
        currentScript.parentNode.insertBefore(elm, currentScript);
    }
    else {
        var elm = currentScript.parentNode;
    }

    var backgroundImage = json.backgroundImage;
    if (backgroundImage) {
        var imgElm = document.createElement('img');
        imgElm.src = backgroundImage;
        var imgStyle = imgElm.style;
        imgStyle.position = 'absolute';
        imgStyle.width = '100%';
        imgStyle.height = '100%';
        imgStyle.top = '0';
        imgStyle.left = '0';
        imgStyle.zIndex = '1';

        elm.appendChild(imgElm);
    }

    var backgroundWrapper = json.backgroundWrapper;
    if (typeof backgroundWrapper != 'undefined') {
        var wrpElm = document.createElement('div');
        var wrpStyle = wrpElm.style;
        wrpStyle.position = 'absolute';
        wrpStyle.background = 'black';
        wrpStyle.width = '100%';
        wrpStyle.height = '100%';
        wrpStyle.top = '0';
        wrpStyle.left = '0';
        wrpStyle.zIndex = '2';
        if (s6.uai.ie) {
            wrpStyle.filter = 'alpha(opacity=' + backgroundWrapper * 100 + ')';
        }
        else {
            wrpStyle.opacity = backgroundWrapper;
        }

        elm.appendChild(wrpElm);
    }

    var effect = json.effect;
    if (effect) {
        if (typeof effect == 'string') {
            effect = [effect, 0.4];
        }
        elm.__s6Effect__ = effect;
    }

    var separator = json.separator;
    if (separator) {
        var parent = elm.parentNode;
        var sepElm = document.createElement('div');
        sepElm.__s6Separator__ = true;
        parent.insertBefore(sepElm, elm);
        if (typeof separator == 'string') {
            separator = [separator, 0.4];
        }
        sepElm.__s6Effect__ = separator;
    }

    var styleBase = json.styleBase;
    if (styleBase) {
        elm.__s6StyleBase__ = styleBase;
    }

    var callee = arguments.callee;

    var styles = json.styles;
    if (styles) {
        for (var n in styles) {
            var elements = s6.elementQuery(elm, n);
            for (var i = 0, l = elements.length; i < l; i ++) {
                s6.css(elements[i].style, styles[n]);
            }
        }
    }

    var actions = json.actions;
    if (actions) {
        actions = arguments.callee.parseActions(elm, actions);
        elm.__s6Actions__ = actions;
    }
};

// ���֥�������̾: page.parseActions �ؿ�
s6.page.parseActions = function(element, actions) {
    var result = [];
    var callee = arguments.callee;
    for (var i = 0, l = actions.length; i < l; i ++) {
        var actionSet = actions[i];
        var asResult = [];
        if (actionSet.length < 2 || (actionSet[0] instanceof Array && actionSet[1] instanceof Array)) {
            for (var j = 0, l0 = actionSet.length; j < l0; j ++) {
                asResult.push(callee.action(element, actionSet[j]));
            }
        }
        else {
            asResult.push(callee.action(element, actionSet))
        }
        result.push(new s6.ActionSet(asResult));
    }
    return result;
};
s6.page.parseActions.action = function(element, action) {
    if (typeof action[0] == 'string') {
        action[0] = [action[0]];
    }
    var queries = action[0];
    var elements = [];
    for (var i = 0, l0 = queries.length; i < l0; i ++) {
        var queryResults = s6.elementQuery(element, queries[i]);
        for (var j = 0, l1 = queryResults.length; j < l1; j ++) {
            elements.push(queryResults[j]);
        }
    }
    action[0] = elements;
    return action;
};


(function(s6) {
    for (var selector in s6.defaultStyles) {
        s6.css(selector, s6.defaultStyles[selector]);
    }
})(s6)

