import type { ParamMatcher } from '@sveltejs/kit'
import { supportedLanguages } from '$lib/info'

// only accept valid languages as a segment in the URL
export const match: ParamMatcher = (param) => {
	return supportedLanguages.includes(param)
}