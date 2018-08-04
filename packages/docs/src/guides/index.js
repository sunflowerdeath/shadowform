import IntroductionStory from './Introduction.md'
import SubmitValidationStory from './SubmitValidation.md'
import AsyncValidationStory from './AsyncValidation.md'
import ConfiguringErrorDisplayStory from './ConfiguringErrorDisplay.md'

export default {
	name: 'Guides',
	stories: {
		introduction: {
			name: 'Introduction',
			markdown: IntroductionStory
		},
		'configuring-error-display': {
			name: 'Configuring error display',
			markdown: ConfiguringErrorDisplayStory
		},
		'async-validation': {
			name: 'Async Validation',
			markdown: AsyncValidationStory
		},
		'submit-validation': {
			name: 'Submit Validation',
			markdown: SubmitValidationStory
		},
		'value-normalization': {
			name: 'Values normalization',
			render: () => 'TODO'
		},
		'cross-validation': { name: 'Cross Validation', render: () => 'TODO' }
	}
}
