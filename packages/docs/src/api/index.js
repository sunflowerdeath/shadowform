import FieldStoreStory from './FieldStore.md'
import FormStoreStory from './FormStore.md'
import UseShowErrorStory from './useShowError.md'

export default {
	name: 'API',
	stories: {
		'field-store': { name: 'FieldStore', markdown: FieldStoreStory },
		'form-store': { name: 'FormStore', markdown: FormStoreStory },
		'use-show-error': { name: 'useShowError', markdown: UseShowErrorStory }
	}
}
