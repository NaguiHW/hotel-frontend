import moment from "moment";

export const generateLast15Days = (): string[] => {
  let days: string[] = [];
  
  for (let i = 15; i > 0; i--) {
    const date = moment().subtract(i, 'days').format('MMM-DD')
    days.push(date);
  }
  return days;
};

export const last15Days = (): string[] => {
  let days: string[] = [];
  
  for (let i = 15; i > 0; i--) {
    const date = moment().subtract(i, 'days').format('DD')
    days.push(date);
  }
  return days;
};
