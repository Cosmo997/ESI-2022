export function userPath(userId: string): string {
  return `/user/${userId}`;
}

export function ticketPath(ticketId: string): string {
  return `/ticket/${ticketId}`;
}

export function tickets(): string {
  return `/tickets`;
}
