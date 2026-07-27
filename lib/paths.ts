export const BASE_PATH = "";

/** Prefixa caminhos de assets com o basePath do GitHub Pages */
export function img(path: string): string {
  return `${BASE_PATH}${path}`;
}
