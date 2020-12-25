const {promisify}  = require('util')
const figlet = promisify(require(
    'figlet'
))
const {clone} = require('./download.js')
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const open = require('open')
module.exports.init = async name => {
    log('🚀create project: ' + name)
    await clone('github.com:wangeastsea/vue-pages-template', name)
    log('安装依赖。。。。。。。')
    await spawn('npm', ['install'], {cwd: `./${name}`})
    log(chalk.green(
        `
        👌安装完成
        ==========
        cd ${name}
        yarn serve project-name
        `
    ))
    await spawn('yarn', ['serve', 'project-name'], {cwd: `./${name}`})
    open('http://localhost:8080')
}


const spawn = async (...args) => {
    const {spawn} = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        // 由子进程的日志流输出到process输出流
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
} 