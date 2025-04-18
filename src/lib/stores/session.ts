import { readable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';
import type { Session as SessionType } from '@supabase/supabase-js';

export type Session = SessionType;

export const session = readable<Session | null>(null, (set) => {
	supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
		set(currentSession);
	});

	const {
		data: { subscription }
	} = supabase.auth.onAuthStateChange((_event, sessionData) => {
		set(sessionData);
	});

	return () => {
		subscription.unsubscribe();
	};
});
