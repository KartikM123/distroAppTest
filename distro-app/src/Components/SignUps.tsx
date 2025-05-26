export const SupportedDays = ['Monday', 'Tuesday', 'Wednesday']; // Example days

export type SignUps = {
    [key in typeof SupportedDays[number]]: { name: string; role: string; submitted: boolean }[];
  };