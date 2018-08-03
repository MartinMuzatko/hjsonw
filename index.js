#!/usr/bin/env node
const Config = require('hjson-config');
const meow = require('meow');

const cli = meow(`
    Usage
    $ hjsonw <value> -r <field> -w <file>

    Options
    --read, -r  read variable
    --write, -w  write to file

    Examples
    $ hjsonw newhostname -r .Host.Name -w serverconfig.hjson
`, {
    flags: {
        read: {
            type: 'string',
            alias: 'r'
        },
        write: {
            type: 'string',
            alias: 'w'
        }
    }
});

if (!cli.input.length || !cli.flags.read || !cli.flags.write) {
    // exits with code 2
    cli.showHelp();
}

const config = new Config(cli.flags.write);
(async ()=>{
    if (cli.flags.read.indexOf('.') == 0) {
        cli.flags.read = cli.flags.read.substring(1);
    }
    config.setProperty(cli.flags.read, cli.input[0]);
})()