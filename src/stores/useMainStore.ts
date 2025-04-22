import { useCookies } from '@vueuse/integrations/useCookies'

/**
 * App wide store, containing info used in multiple views and components
 */
export const useMainStore = defineStore('main', () => {
	/**
	 * Extract cookie from headers and JWT payload from it
	 */
	const cookies = useCookies(
		['ccat_user_token', 'ccat_agent_id', 'ccat_user_id'],
		{ doNotParse: true, autoUpdateDependencies: true }
	)
	const credential = computed({
		get: () => cookies.get<string | undefined>('ccat_user_token'),
		set: value => cookies.set('ccat_user_token', value),
	})
	const agentId = computed({
		get: () => cookies.get<string | undefined>('ccat_agent_id') ?? 'agent',
		set: value => cookies.set('ccat_agent_id', value),
	})
	const userId = computed({
		get: () => cookies.get<string | undefined>('ccat_user_id'),
		set: value => cookies.set('ccat_user_id', value),
	})

	return {
		credential,
		agentId,
		userId,
	}
})