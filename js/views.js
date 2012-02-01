window.kilon = window.kilon || {};
window.kilon.org = kilon.org || {};
window.kilon.org.views = kilon.org.views || {};
(function(ns){
    var InputView = Backbone.View.extend({
        initialize: function(){
            var self = this
            this.input = this.$el.find("#q");
            
            // add a bunch of keyboard shortcuts
            this.input.bind('keydown', 'ctrl+l', function(){
                self.input.val('clear');
                self.submit();
            });
            this.input.bind('keydown', 'ctrl+d', function(){
                self.input.val('exit');
                self.submit();
            });
        },
        events: {
            'submit': 'submit'
        },
        submit: function(){
            var val = $.trim(this.input.val());
            if (val) {
                this.model.set({'command': val}, {silent: true});
                this.empty();
                this.model.change();
            }
            return false;
        },
        focus: function(){
            this.input.focus();
        },
        empty: function(){
            this.input.val('');
        }
    });
    
    
    var TerminalView = Backbone.View.extend({
        initialize: function(){
            this.collection.bind('add', this.render, this);
            this.collection.bind('reset', this.clear, this);
        },
        render: function(){
            if(this.collection.length) {
                var tempalte = _.template(this.template, {collection: this.collection});
                this.$el.html(tempalte);
            }
            else {
                this.clear();
            }
        },
        clear: function(){
            this.$el.empty();
        },
        template: '<%collection.each(function(model){ %><%=model.get("cmd").join("\n") + "\n" %><%})%>'
    });
    
    ns.InputView = InputView;
    ns.TerminalView = TerminalView;
    
}(kilon.org.views));