/**
* mobile console log
* author:memoryza(jincai.wang@foxmial.com)
* version:0.0.1
**/
;(function(w, doc) {
    function mConsole() {}
    mConsole.prototype = {
        init : function() {
            var that = this;
            var controller = doc.createElement('div');
            controller.setAttribute('id', 'console_debug');
            controller.style.height = '100px';
            controller.style.overflow = 'hidden';
            controller.style.position = 'fixed';
            controller.style.width = '100%';
            controller.style.bottom = '10px';
            controller.style.zIndex = 1000;
            controller.innerHTML = '<div style="float:left"><img src="images/icon.jpg" /></div><input id="console" style="border:0;border-bottom:1px solid black;text-align:left;"/><div id="result" style="height:80px;overflow:auto;"></div>';
            doc.body.appendChild(controller);
            document.querySelector('#console').style.width = (screen.width - 32) + 'px';
            eventUtil.addHandler(document.querySelector('#console'), 'keydown', function(e) {
                var event = eventUtil.getEvent(e);
                var code = eventUtil.getKeyCode(event);
                if(code == 13) {
                    try {
                        that.add(eval.call(null, this.value));
                    } catch(ex) {
                        var msg = ex.stack || ex.msg;
                        that.add(msg)
                    }
                    this.value = '';
                }
            })
        },
        add: function(msg) {
            var rs = document.querySelector('#result');
            var p = doc.createElement('p');
            p.innerHTML = msg;
            rs.insertBefore(p, rs.firstChild)
        },
        log: function(msg) {
            this.add(msg);
        }
    }
    var c = new mConsole();
    c.init();
    w.onerror =  function(msg, errfile, line) {
        c.add(msg + ':' + errfile + ':' + line)
    }
    w.console = c;
})(window, document);
