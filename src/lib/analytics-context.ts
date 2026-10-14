/** CMS editing and previews are operational traffic, not buyer visits. */
export function isInternalAnalyticsLocation(pathname: string, search: string): boolean {
  return /^\/(?:cms|admin)(?:\/|$)/i.test(pathname)
    || /(?:[?&])cms_(?:canvas|stage)=/i.test(search);
}
