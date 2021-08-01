export default class Calculator {
  constructor (playbook) {
    this.playbook = playbook
    this.valubles = []
      .concat(this.playbook.rules.choices)
      .concat(this.playbook.rules.characterFields)
      .concat(this.playbook.rules.playbookFields)
      .concat(this.playbook.rules.globalFields)
      .concat(this.playbook.rules.formulas)
      .concat(this.playbook.rules.effects)
  }

  async calc (raw, character, type = undefined) {
    const valuble = this.valubles.find(valuble => valuble.match(raw))

    if (valuble)
      return await valuble.getValue(character, (rawValue, type) => this.calc(rawValue, this, type))

    return this.playbook.types.find(t => t.name === type)?.parseValue(raw) || raw
  }

  async execute (effectCall, character, executioner) { // an executioner has the ability to display an output and recieve an input
    if (Array.isArray(effectCall)) {
      for(let effect of effectCall) {
        await this.execute(effect, character, executioner)
      }
    }
    const action = this.calc(effectCall, character)
    return await action(executioner)
  }
}
