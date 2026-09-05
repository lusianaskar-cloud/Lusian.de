/**
 * The name of the stored language preference.
 *
 * Its own module because both the proxy (which reads it on the edge) and the
 * switcher (which writes it in the browser) need it, and the proxy must not
 * pull in anything else.
 */
export const LOCALE_COOKIE = "lusian.locale";
