const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')
const { homedir } = require('os')
const { compile } = require('handlebars')
const open = require('open')
module.exports = async (name) => {
    const list = fs.readdirSync('./src/views').filter(v=> v !== 'Home.vue').map(v =>({
        name: v.replace('.vue', '').toLowerCase(),
        file: v
    }))
    // 生成路由定义
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')
    // 生产菜单
    compile({list}, './src/App.vue', './template/App.vue.hbs')
    
    // 启动项目
    open('http://localhost:8081')
    await spawn('npm', ['run', 'serve'])
    /** 编译模板⽂文件
     * @param  {} meta 数据定义
     * @param  {} filePath 目标文件路径
     * @param  {} templatePath 模版文件路径
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString();
            const result = handlebars.compile(content)(meta)
            fs.writeFileSync(filePath, result)
        }
        console.log(chalk.green(`🚀 ${filePath} 创建成功`))
    }
    async function spawn (...args) {
        const {spawn} = require('child_process')
        return new Promise(resolve => {
            console.log('args', args)
            const proc = spawn(...args)
            // 由子进程的日志流输出到process输出流
            proc.stdout.pipe(process.stdout)
            proc.stderr.pipe(process.stderr)
            proc.on('close', () => {
                resolve()
            })
        })
    } 
}