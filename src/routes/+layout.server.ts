import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const locale = cookies.get('locale') || 'ru';
	const theme = cookies.get('theme') || 'light';
	return {
		locale,
		theme
	};
};
