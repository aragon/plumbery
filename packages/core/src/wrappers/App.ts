export interface AppData {
  name?: string
  address: string
}

export default class App implements AppData {
  name?: string
  address: string

  constructor(data: AppData) {
    this.name = data.name
    this.address = data.address
  }
}
