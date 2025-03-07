import React, { useState } from 'react'
import { useHistory } from 'react-router'

import '../../../css/pages/new.scss'

import { useRules } from '../../contexts/rules-context'
import { useCharacters } from '../../contexts/characters-context'
import OptionsChoice from './options-choice'
import Loader from '../../presentation/loader'
import { SUPPORTED_RULEBOOKS } from '../../../games'
import Choice from './choice'

export default function New () {
  const rules = useRules()
  const history = useHistory()
  const characters = useCharacters()

  const [loading, setLoading] = useState(false)
  const [builder, setBuilder] = useState()
  const [choice, setChoice] = useState()

  const initializeBuilder = async rulebook => {
    setBuilder((await rules.get([rulebook])).characters.builder)
  }

  const start = playbook => {
    builder.start(playbook)
    setChoice(builder.choice)
  }

  const update = value => {
    builder.choose(value)
    if (builder.choice) {
      setChoice(builder.choice)
    } else {
      setLoading(true)
      finish()
    }
  }

  const finish = async () => {
    await builder.finish()
    const id = await characters.create(Object.assign(builder.character.toJson(), { settings: 'manual' }))
    builder.clear()
    history.push(`/character/${id}`)
  }

  if (loading) {
    return <Loader className='new page' />
  }

  if (!builder) {
    return <Page className='choose game'>
      <OptionsChoice title='choose game' options={SUPPORTED_RULEBOOKS} onChoice={initializeBuilder} />
    </Page>
  }

  if (!choice) {
    return <Page className={`choose playbook rules ${builder.rulebook.rulebooks.join(' ')}`}>
      <OptionsChoice title='choose playbook' options={builder.playbookOptions()} onChoice={start} />
    </Page>
  }

  return <Page className={builder.rulebook.rulebooks.join(' ')}>
    <Choice choice={choice} builder={builder} onChoice={update} />
  </Page>
}

function Page ({ children, className='' }) { return <div className={`new page ${className}`}>{children}</div> }

