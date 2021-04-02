import Swal from 'sweetalert2';

const minute = 60;
const hour = 60 * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

export const handleLoading = (state: boolean, title?: string): void => {
  if (state) {
    Swal.fire({
      title: title || 'Cargando',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return;
  }

  Swal.close();
};

export const convertToDate = (number: number) => {
  number /= 1000;
  const seconds = number >= 0 && number < minute;
  const minutes = number >= minute && number < hour;
  const hours = number >= hour && number < day;
  const days = number >= day && number < month;
  const months = number >= month && number < year;
  const years = number >= year;

  if (seconds) {
    return `${Math.floor(number)} segundo(s)`;
  } else if (minutes) {
    return `${Math.floor(number / minute)} minuto(s)`;
  } else if (hours) {
    return `${Math.floor(number / hour)} hora(s)`;
  } else if (days) {
    return `${Math.floor(number / day)} día(s)`;
  } else if (months) {
    return `${Math.floor(number / month)} mes(es)`;
  } else if (years) {
    return `${Math.floor(number / year)} año(s)`;
  }
};
