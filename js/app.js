(function(){
    var commands = new Backbone.Collection();
    var input = new Backbone.Model();
    input.bind('change', function() {
        var cmd = input.get('command');
        if( cmd == "clear") {
            commands.reset();
            return ;
        }
        if (cmd == "exit") {
            $("form").hide();
        }
        commands.add([new kilon.org.models.CommandModel({cmd: 'label', label: cmd}), new kilon.org.models.CommandModel({cmd: cmd})]);
    });
    
    var terminalView = new kilon.org.views.TerminalView({
        el: $("#terminal"),
        collection: commands
    });
    
    var inputView = new kilon.org.views.InputView({
        el: $("form"),
        model: input
    });
    

    // set some content
    input.set('command', 'welcome');
    
    // foxus the cursor
    inputView.focus();
    
    
}());