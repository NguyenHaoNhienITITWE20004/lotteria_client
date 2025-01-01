// format currency
export const formatCurrency = (amount) => {
  if (isNaN(amount)) return '';
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

//format date time
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
