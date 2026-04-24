export function obtainTicketsPerPage(): number {
  const vw = window.innerWidth;

  if (vw < 768) return 8; // Phone
  if (vw > 1024) return 14; // Desktop
  return 12; // Tablet
}
