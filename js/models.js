window.kilon = window.kilon || {};
window.kilon.org = kilon.org || {};
window.kilon.org.models = kilon.org.models || {};
(function(ns){
    var CommandFactory = {
        _commands: {},
        add: function(cmd){
            this._commands[cmd.name] = cmd;
        },
        get: function(key){
            var action = this._commands[key] || null;
            return null != action ? action.run.call(this) : ["-shell: " + key.split(/\s/)[0] + ": command not found"];
        },
    };
    
    function Command(name, help, run){
        this.name = name;
        this.help = help;
        this.run = run;
        this.events = {};
    }
    
    CommandFactory.add(new Command('date', 'show date', function(){
        return [(new Date().toString())];
    }));

    CommandFactory.add(new Command('label', null, function(){
        return ["$"];
    }));
    
    CommandFactory.add(new Command('who', "about me", function(){
        return [
            'Uzi Kilon',
            'Senior Software Engineer',
            'Currently working for Splunk as a Core UI enginner',
            '<a href="http://www.linkedin.com/in/uzikilon">http://www.linkedin.com/in/uzikilon</a>',
            '<a href="https://twitter.com/#!/uzikilon">https://twitter.com/#!/uzikilon</a>',
            '<a href="/Uzi.Kilon.pdf">Resume (pdf format)</a>'
        ];
    }));
    
    CommandFactory.add(new Command('what', "active project", function(){
        return [
            'Current Projects:',
            'UberTerminal (this site) - <a href="http://kilon.org/">http://kilon.org/</a> | <a href="https://github.com/uzikilon/UberTerminal">https://github.com/uzikilon/UberTerminal</a>',
        ];
    }));
    CommandFactory.add(new Command('welcome', "welcome message", function(){
        return [
            'UberTerminal 0.1 By Uzi Kilon &copy;2012',
            'Type "help" for available commands',
        ];
    }));
    
    CommandFactory.add(new Command('clear', 'clear window'));
    
    CommandFactory.add(new Command('exit', 'exit the terminal', function(){
        return ["logout", "", "[Process completed]"];
    }));
    
    CommandFactory.add(new Command('help', 'show this message', function(){
        var s = ["<u>available commands:</u>"];
        for (var name in this._commands) {
            var command = this._commands[name];
            if (command.help) {
                s.push(command.name + "\t\t" + command.help);
            }
        }
        return s;
    }));
    
    var CommandModel = Backbone.Model.extend({
        get: function(attribute) {
            var cmd = Backbone.Model.prototype.get.call(this, attribute);
            var value = CommandFactory.get(cmd); 
            if(cmd === "label") {
                value = [value[0] + " " + Backbone.Model.prototype.get.call(this, 'label')];
            }
            return value;
        }
    });
    
    ns.CommandModel = CommandModel;
}(kilon.org.models));