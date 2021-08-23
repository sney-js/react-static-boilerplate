import { getContentType, getPageType } from '../app/utils/Resolver';
import RouteConfig from './RouteConfig';

export function handleContent(contentItem, handlers) {
  const contentType = getContentType(contentItem);
  if (contentType) {
    const handler = handlers[contentType];
    if (handler) {
      handler(contentItem);
      return;
    }
  }
  defaultHandler(contentItem);
}

export function defaultHandler(node) {
  delete node.sys;
  return node;
}

export type CleanupConfig = {
  handlers: Object;
  ignoreProps: Array<string>;
  ignoreTypes: Array<string>;
};

function cleanupEntryLink(object) {
  const type = getContentType(object);
  if (type) {
    if (Array.isArray(object)) {
      return object.filter((element) => cleanupEntryLink(element));
    }
  }
  return object;
}

export function cleanupData(data, locale?: string, withHandler?: boolean) {
  const config = RouteConfig.cleanupConfig;

  const stack: any[] = [];
  const processed: any[] = [];
  const localContentData = Object.assign({}, data);
  stack.push(localContentData);

  while (stack.length > 0) {
    const item: any = stack.pop();
    if (item && processed.indexOf(item) !== -1) {
      continue;
    }

    processed.push(item);

    // --------------------------------------------------
    const contentType = getContentType(item);

    // embeds contentType inside item as sys is removed from data in frontend
    if (contentType) {
      item.type = contentType;
    }

    // embeds locale inside item info to be used by resolve methods on frontend
    if (contentType && getPageType(contentType) && locale) {
      item.locale = locale;
      if (typeof item.sys === 'object') {
        item.sys.locale = locale;
      }
    }

    for (const prop in item) {
      // for each key in item. (e.g, [sys, fields, title, name]

      if (item.hasOwnProperty(prop) && !config.ignoreProps.includes(prop)) {
        // if is a valid key

        if (prop == null || prop === 'locale') continue;

        if (typeof item[prop] === 'object') {
          // if is a bigger object (e.g. [fields, link]

          item[prop] = cleanupEntryLink(item[prop]);

          const overwriteField = item[prop]?.overwrite;
          if (overwriteField) {
            item[overwriteField] = item[prop].value;
          }

          if (typeof item[prop] === 'object') stack.push(item[prop]);
        }
      }
    }

    if (
      withHandler &&
      contentType &&
      !config.ignoreTypes.includes(contentType)
    ) {
      handleContent(item, config.handlers);
    }
  }

  if (!withHandler) {
    cleanupData(localContentData, locale, true);
  }

  // finally clean bigger objected like link
  Object.assign(data, localContentData);
}
