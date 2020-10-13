import IntroductionStory from './Introduction.md'
import ConfiguringErrorDisplayStory from './ConfiguringErrorDisplay.md'
import ExternalValidationStory from './ExternalValidation.md'
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
		'external-validation': {
			name: 'External Validation',
			markdown: ExternalValidationStory
		},
		'value-normalization': {
			name: 'Values Normalization',
			markdown: NormalizationStory
		},
		'connected-fields': {
			name: 'Connected Fields',
			markdown: ConnectedFieldsStory
		}
	}
}
