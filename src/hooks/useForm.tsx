import { ChangeEvent, FormEvent, useState } from 'react';
import Swal from 'sweetalert2';

const useForm = (initState: any, fn: () => string[], success: () => any) => {
  const [data, setData] = useState(initState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = fn();

    if (errors.length > 0) {
      Swal.fire('¡Error!', errors[0], 'error');
      return;
    }

    success();
  };

  return {
    data,
    handleChange,
    onSubmit,
  };
};

export default useForm;
