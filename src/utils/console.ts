import chalk from 'chalk'

interface IConsole {
  error: (message?: any) => void
  log: (message?: any) => void
  now: () => void
  table: (data: object) => void
  warn: (message?: any) => void
}

export const Console: IConsole = {
  error: message => {
    console.log(`${chalk.redBright('ERROR:')} ${chalk.red(message)}1`)
  },
  log: message => {
    console.log(`${chalk.whiteBright(message)}2`)
  },
  now: () => {
    console.log(`${chalk.blueBright(`${+new Date()}`)} 3`)
  },
  table: data => {
    console.table(data)
  },
  warn: message => {
    console.log(`${chalk.yellowBright('WARNING:')} ${chalk.yellow(message)} 4`)
  }
}
