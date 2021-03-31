import Swal from 'sweetalert2';

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
