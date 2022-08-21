import generate from '@babel/generator'

const consoleProps: string[] = ['log', 'info', 'error', 'debug', 'warn']

const targetCalleeName = consoleProps.map(item => {
  return `console.${item}`
})


export default function babelInsertArguments({ types }) {
  return {
    name: 'babel-insert-arguments',
    visitor: {
      CallExpression(path) {
        const calleeName = generate(path.node.callee).code
        if (
            targetCalleeName.includes(calleeName)
          ) {
            const { line, column } = path.node.loc.start;
            path.node.arguments.unshift(types.stringLiteral(`loc: (${line}, ${column})`))
          }
      }
    }
  }
}
