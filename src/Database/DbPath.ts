export const usersSchema = "users";
export const ticketsSchema = "tickets";

export function collectionPath(collectionName: string, index: number): string {
  return `${collectionName}[${index}]`;
}
