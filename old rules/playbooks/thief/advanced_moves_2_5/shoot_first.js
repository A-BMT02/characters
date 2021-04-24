import Move from '../../../move'
import Procedure from '../../../move_procedure'

const shootFirst = new Move({
	title: 'Shoot First',
	text: 
`You’re never caught by surprise. When an enemy would get the drop on you, you get to act first instead.`,

	procedure: new Procedure('When an enemy would get the drop on you', You get to act first instead.)
})

export default shootFirst