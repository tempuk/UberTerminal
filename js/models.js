window.kilon = window.kilon || {};
window.kilon.org = kilon.org || {};
window.kilon.org.models = kilon.org.models || {};
(function(ns){
    var CommandFactory = {
        _commands: {},
        add: function(cmd){
            this._commands[cmd.name] = cmd;
        },
        run: function(key, callback){
            var action = this._commands[key] || null;
            if(action) {
                action.run.call(this, callback);
            }
            else {
                callback(["-shell: " + key.split(/\s/)[0] + ": command not found"]);
            }
        },
    };
    
    function Command(name, help, run){
        this.name = name;
        this.help = help;
        this.run = run;
        this.events = {};
    }
    
    CommandFactory.add(new Command('date', 'show date', function(callback){
        callback([(new Date().toString())]);
    }));
    
    CommandFactory.add(new Command('agent', 'show user agent', function(callback){
        $.getJSON('/rest/basic.php?action=host', function(data){
            callback([data['HTTP_USER_AGENT']]);
        });
    }));
    
    CommandFactory.add(new Command('ip', 'show ip address', function(callback){
        $.getJSON('/rest/basic.php?action=host', function(data){
            callback([data['REMOTE_ADDR']]);
        });
    }));

    CommandFactory.add(new Command('label', null, function(callback){
        callback(["$"]);
    }));
    
    CommandFactory.add(new Command('who', "about me", function(callback){
        callback([
            'Uzi Kilon',
            'Senior Software Engineer',
            'Currently working for Splunk as a Core UI enginner',
            '<a href="http://www.linkedin.com/in/uzikilon">http://www.linkedin.com/in/uzikilon</a>',
            '<a href="https://twitter.com/#!/uzikilon">https://twitter.com/#!/uzikilon</a>',
            '<a href="/Uzi.Kilon.pdf">Resume (pdf format)</a>'
        ]);
    }));
    
    CommandFactory.add(new Command('what', "active project", function(callback){
        callback([
            'Current Projects:',
            'UberTerminal (this site) - <a href="http://kilon.org/">http://kilon.org/</a> | <a href="https://github.com/uzikilon/UberTerminal">https://github.com/uzikilon/UberTerminal</a>',
        ]);
    }));
    CommandFactory.add(new Command('welcome', "welcome message", function(callback){
        callback([
            'UberTerminal 0.1 By Uzi Kilon &copy;2012',
            'Type "help" for available commands',
        ]);
    }));
    
    CommandFactory.add(new Command('clear', 'clear window'));
    
    CommandFactory.add(new Command('exit', 'exit the terminal', function(callback){
        callback(["logout", "", "[Process completed]"]);
    }));
    
    CommandFactory.add(new Command('help', 'show this message', function(callback){
        var data = ["<u>available commands:</u>"];
        for (var name in this._commands) {
            var command = this._commands[name];
            if (command.help) {
                data.push(command.name + "\t\t" + command.help);
            }
        }
        callback(data);
    }));
    
    var CommandModel = Backbone.Model.extend({
        get: function(attribute, callback) {
            var self = this,
                cmd = Backbone.Model.prototype.get.call(this, attribute);
            CommandFactory.run(cmd, function(value){
                if(cmd === "label") {
                    value = [value[0] + " " + Backbone.Model.prototype.get.call(self, 'label')];
                }
                callback(value);
            }); 
           
        }
    });
    
    ns.CommandModel = CommandModel;
}(kilon.org.models));