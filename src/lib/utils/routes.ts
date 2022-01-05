export function getParam(param: string | string[] | undefined): string {
  if (typeof param !== 'string') {
    return '';
  }

  return param;
}

export function getStringifiedParams(
  params?: Record<string, string | string[] | null | undefined>,
): Record<string, string> {
  if (!params) {
    return {};
  }

  const queryParams: Record<string, string> = {};

  Object.entries(params).map(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    queryParams[key] = getParam(value);
  });

  return queryParams;
}
