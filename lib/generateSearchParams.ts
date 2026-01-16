import _ from "lodash";

export default function generateSearchParams(
  paramsObject: Record<string, unknown>,
) {
  const filtered = _.pickBy(paramsObject, _.identity);

  const stringified = _.mapValues(filtered, (val) => String(val));

  const searchParams = new URLSearchParams(stringified).toString();

  return [searchParams.toString(), searchParams];
}
