import { parse } from '@babel/parser';
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as types from '@babel/types'

const sourceCode = `console.log(1);`;
const ast = parse(sourceCode, {
  sourceType: 'unambiguous'
})

// function isConsoleFn(name: string): boolean {
//   return name === 'console'
// }

// function isConsoleProp(prop: string): boolean {
//   const props: string[] = ['log', 'info', 'error', 'debug', 'warn']
//   return  props.includes(prop)
// }

const consoleProps: string[] = ['log', 'info', 'error', 'debug', 'warn']

const targetCalleeName = consoleProps.map(item => {
  return `console.${item}`
})


traverse(ast, {
  CallExpression(path) {
    
    const calleeName = generate(path.node.callee).code
    if (
        targetCalleeName.includes(calleeName)
      ) {
        const { line, column } = path.node.loc.start;
        path.node.arguments.unshift(types.stringLiteral(`loc: (${line}, ${column})`))
      }
  }
})

const { code } = generate(ast)

console.info(code);