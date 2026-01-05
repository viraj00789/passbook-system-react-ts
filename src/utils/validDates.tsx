export const isDueDateValid = (issueDate: string, dueDate: string): boolean => {
  if (!issueDate || !dueDate) return true; // handled elsewhere
  return new Date(dueDate) > new Date(issueDate);
};
