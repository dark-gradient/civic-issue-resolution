import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return `CIV-${Math.floor(10000 + Math.random() * 90000)}`;
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

export const filterIssuesBySearch = (issues: any[], search: string) => {
  if (!search) return issues;
  const q = search.toLowerCase();
  return issues.filter(i => 
    i.id.toLowerCase().includes(q) || 
    i.type.toLowerCase().includes(q) || 
    i.city.toLowerCase().includes(q) || 
    i.state.toLowerCase().includes(q) || 
    i.ward.toLowerCase().includes(q) || 
    i.authority.toLowerCase().includes(q) || 
    i.department.toLowerCase().includes(q) || 
    i.status.toLowerCase().includes(q) ||
    i.description.toLowerCase().includes(q)
  );
};
