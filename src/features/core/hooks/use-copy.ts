import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const useCopy = () => {
  const { t } = useTranslation();

  const copy = async (value: string, success?: string) => {
    try {
      await navigator.clipboard.writeText(value);
      if (success != null) toast.success(success);

      return true;
    } catch (err) {
      console.error(err);
      toast.error(t('common.errors.copy_failed'));

      return false;
    }
  };

  return copy;
};
