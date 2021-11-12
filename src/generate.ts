import fs from 'fs-extra'
import chalk from 'chalk'

const log = console.log;

const genFile = (params: any, path: string, out: string, curPath: string, fileName: string) => {
    const keys = Object.keys(params)
    let txt = fs.readFileSync(`${path}/${curPath}/${fileName}`).toString()

    keys.forEach(key => {
        txt = txt.replace(new RegExp(`<{\\*${key}\\*}>`, 'gm'), params[key])
    })

    out && fs.pathExists(out, (err, _exists) => {
        fs.ensureDirSync(`${out}${curPath}`)

        fs.pathExists(`${out}${curPath}/${fileName}`, (err, __exists) => {
            if (!__exists) {
                fs.writeFileSync(`${out}${curPath}/${fileName}`.replace('.tpl', ''), txt)
            }
        })
    })
}

const generate = (params: any, out: string, type: string) => {
    const path = `./template/${type}`
    fs.pathExists(`./template/${type}`, (err, exists) => {
        if (exists) {
            const recursivePath = (curPath: string) => {
                const names = fs.readdirSync(`${path}${curPath}`)
                names.forEach((name) => {
                    if (fs.statSync(`${path}${curPath}/${name}`).isDirectory()) {
                        recursivePath(`${curPath.length > 0 ? `/${curPath}` : ''}/${name}`)
                        return
                    }
                    genFile(params, path, out, curPath, name)
                })
            }

            recursivePath('')
        }

        log(chalk.blue('generate done!🎉🎉🎉🎉🎉'))
    })
}

export default generate