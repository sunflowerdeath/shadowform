import 'regenerator-runtime/runtime'
import ReactDOM from 'react-dom'
import React from 'react'
import raw from 'raw.macro'
import MiniBook from 'minibook'
// import { dark } from 'minibook/lib/themes'

import ApiSection from './api'
import GuidesSection from './guides'

const css = raw('./examples/styles.css')
const style = document.createElement('style')
style.type = 'text/css'
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)

const PRODUCTION = process.env.NODE_ENV === 'production'

const sections = {
	guides: GuidesSection,
	api: ApiSection,
}

ReactDOM.render(
	<MiniBook
		basename={PRODUCTION ? '/shadowform/' : ''}
		title="Shadowform"
		sections={sections}
	/>,
	document.querySelector('#root')
)
