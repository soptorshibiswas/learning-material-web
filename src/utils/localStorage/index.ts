export function getParsedLocalData(key: string): any | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }
}

export function setLocalData(key: string, data: any): void {
  if (typeof window !== "undefined") {
    if (!data) localStorage.setItem(key, "");
    localStorage.setItem(key, JSON.stringify(data));
  }
}
