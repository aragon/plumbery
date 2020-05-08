export default class ParseBase {
  static validateData(source: any, target: any): void | never {
    if (!target) {
      const sourceValue = source ? JSON.stringify(source, null, 2) : 'undefined'

      throw new Error(`Parse error. Unable to find target data in incoming object => \n${sourceValue}`)
    }
  }
}
