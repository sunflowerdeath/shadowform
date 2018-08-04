import FieldStoreStory from './FieldStore.md'
import FormStoreStory from './FormStore.md'
import WithShowErrorStory from './withShowError.md'

export default {
	name: 'API',
	stories: {
		'field-store': { name: 'FieldStore', markdown: FieldStoreStory },
		'form-store': { name: 'FormStore', markdown: FormStoreStory },
		'with-show-error': { name: 'withShowError', markdown: WithShowErrorStory }
	}
}
