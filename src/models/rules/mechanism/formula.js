import Valuble from './base/valuble'
import Pattern from './base/pattern'

export default class Formula {
  constructor (pattern, type = undefined) {
    this.pattern = new Pattern(pattern)
    this.type = type
  }

  match (raw) {
    return this.pattern.match(raw)
  }

  getValue () {
    throw new Error('getValue should not be called on Formula class directly')
  }
}

Formula.PresetFormula = class PresetFormula extends Formula {
  constructor (pattern, type, getValue) {
    super(pattern, type)
    this.getValue = getValue
  }
}

Formula.ComplexFormula = class ComplexFormula extends Formula {
  constructor (pattern, formulaCall) {
    super(pattern)
    this.formulaCall = formulaCall
  }

  getValue (params, character, getValubleValue) {
    return this.formulaCall.getValue(character, getValubleValue)
  }
}

Formula.PRESETS = [
  new Formula.PresetFormula('<boolean:condition>\\?<number:onTrue>:<number:onFalse>', 'number', params => (params.condition ? params.onTrue : params.onFalse)),
  
  new Formula.PresetFormula('<number:A>\\+<number:B>', 'number', params => params.A + params.B),
  new Formula.PresetFormula('<number:A>-<number:B>', 'number', params => params.A - params.B),
  new Formula.PresetFormula('<number:A>\\*<number:B>', 'number', params => params.A * params.B),
  new Formula.PresetFormula('<number:A>/<number:B>', 'number', params => params.A / params.B),

  new Formula.PresetFormula('<number:A>=<number:B>', 'boolean', params => params.A === params.B),
  new Formula.PresetFormula('<number:A>><number:B>', 'boolean', params => params.A > params.B),
  new Formula.PresetFormula('<number:A><<number:B>', 'boolean', params => params.A < params.B),
  new Formula.PresetFormula('<number:A><=<number:B>', 'boolean', params => params.A <= params.B),
  new Formula.PresetFormula('<number:A>>=<number:B>', 'boolean', params => params.A >= params.B),
  new Formula.PresetFormula('<number:A>!=<number:B>', 'boolean', params => params.A !== params.B),

  new Formula.PresetFormula('<boolean:A>\\|<boolean:B>', 'boolean', params => params.A || params.B),
  new Formula.PresetFormula('<boolean:A>\\&<boolean:B>', 'boolean', params => params.A && params.B),
  new Formula.PresetFormula('!<boolean:A>', 'boolean', params => !params.A),

  new Formula.PresetFormula('<array:A> or <array:B>', 'array', params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFormula('<array:A> join <array:B>', 'array', params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFormula('<array:A> and <array:B>', 'array', params => [].concat(params.A).filter(x => !params.B.excludes(x))),
  new Formula.PresetFormula('<array:A> cross <array:B>', 'array', params => [].concat(params.A).filter(x => !params.B.excludes(x))),

  new Formula.PresetFormula('<numebr:amount>d<number:dice>', 'number', params =>
  	new Array(params.amount).fill(1).map(() => Math.ceil(Math.random() * params.dice)).reduce((sum, val) => sum + val, 0)),
]
