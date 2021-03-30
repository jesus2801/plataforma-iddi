import Swal from 'sweetalert2';

export const handleLoading = (state: boolean): void => {
  if (state) {
    Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return;
  }

  Swal.close();
};
