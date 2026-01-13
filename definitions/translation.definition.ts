export interface TranslationDefinition extends Record<string, unknown> {
  tKey: string;
  ns?: string;
  options?: { keyPrefix?: string };
}
