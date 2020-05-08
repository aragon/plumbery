import { ConnectorTheGraph } from "plumbery-core";

export default class ParseBase {
  #sourceType: string
  #targetType: string

  constructor(sourceType: string, targetType: string) {
    this.#sourceType = sourceType
    this.#targetType = targetType
  }

  parse(connector: ConnectorTheGraph, source: any, target: any): any {
    this.validateData(source, target)
    return this.parseImplementation(connector, target)
  }

  parseImplementation(connector: ConnectorTheGraph, target: any): any {
    // Override.
    return null
  }

  validateData(
    source: any,
    target: any,
  ): void | never {
    if (!target) {
      const sourceValue = source ? JSON.stringify(source, null, 2) : 'undefined'

      throw new Error(`Unable to obtain a ${this.#targetType} object from incoming ${this.#sourceType} object:\n${sourceValue}`)
    }
  }
}
