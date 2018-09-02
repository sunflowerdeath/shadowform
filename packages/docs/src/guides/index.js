import IntroductionStory from './Introduction.md'
import ConfiguringErrorDisplayStory from './ConfiguringErrorDisplay.md'
import SubmitValidationStory from './SubmitValidation.md'
import AsyncValidationStory from './AsyncValidation.md'
import ConnectedFieldsStory from './ConnectedFields.md'
import NormalizationStory from './Normalization.md'

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
			markdown: NormalizationStory
		},
		'cross-validation': {
			name: 'Connected Fields',
			markdown: ConnectedFieldsStory
		}
	}
}
