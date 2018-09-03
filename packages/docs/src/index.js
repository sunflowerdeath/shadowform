import '@babel/polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import MiniBook from 'minibook'
import 'minibook/lib/styles.css'

import ApiSection from './api'
import GuidesSection from './guides'

const PRODUCTION = process.env.NODE_ENV === 'production'

const sections = {
	guides: GuidesSection,
	api: ApiSection
}

ReactDOM.render(
	<MiniBook
		basename={PRODUCTION ? '/shadowform/' : ''}
		title="Shadowform"
		sections={sections}
	/>,
	document.querySelector('#root')
)
