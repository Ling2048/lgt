import { createCommand } from 'commander';
import generate from './generate';
import fs from 'fs-extra';

process.title = 'lgt';

const program = createCommand()

program
    .version(require('../package').version)
    .usage('<command> [options]')

/**
 * Usage.
 */
 program
    .command('generate')
    .alias('g')
    .description('generate file from a template (short-cut alias: "g")')
    .option('-t, --type <type>', '-t page')
    .option('-p, --params <params>', "--p '{\"type\": \"API.Dict\",\"find\": \"test\"}'")
    .option('-o, --out <out>', '-o ./Dict')
    .allowUnknownOption(true)
    .action(function (args: { params: string, out: string, type: string }) {
        const { params, out, type} = args
        try {
            let _params: any = {}, _out = '', _type = ''
            if (!params) {
                const { params, out, type } = fs.readJSONSync('./lgt.config.json')
                _params = params;
                _out = out;
                _type = type;
            }
            else {
                _params = JSON.parse(params);
                _out = out;
                _type = type
            }
            generate(_params, _out, _type)
        } catch (error) {
            console.log(error)
        }
    });

program.parse(process.argv)