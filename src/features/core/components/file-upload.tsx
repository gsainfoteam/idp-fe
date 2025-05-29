import { ChangeEvent, PropsWithChildren, useRef } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export type FileUploadProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'multiple' | 'onChange'
> & {
  ref?: React.Ref<HTMLDivElement>;
  accept: string;
  maxFiles?: number;
  maxSizeMb: number;
  onSave: (files: File[], previewUrls: string[]) => void;
};

export function FileUpload({
  ref,
  accept,
  maxFiles = 1,
  maxSizeMb,
  onSave,
  children,
  ...props
}: PropsWithChildren<FileUploadProps>) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    if (files.length > maxFiles) {
      toast.error(t('toast.file_too_many', { max_files: maxFiles }));
      return;
    }

    if (files.some((file) => file.size > maxSizeMb * 1024 * 1024)) {
      toast.error(t('toast.file_too_large', { max_size_mb: maxSizeMb }));
      return;
    }

    return new Promise<void>((resolve, reject) => {
      const previewUrls: string[] = [];
      const readFile = (index: number) => {
        if (index >= files.length) {
          onSave(files, previewUrls);
          resolve();
          return;
        }

        const file = files[index];
        if (!file) {
          reject(t('toast.failed_to_read'));
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            previewUrls.push(e.target.result);
            readFile(index + 1);
          } else {
            toast.error(t('toast.failed_to_read'));
            reject(t('toast.failed_to_read'));
            return;
          }
        };
        reader.onerror = () => {
          toast.error(t('toast.failed_to_read'));
          reject(t('toast.failed_to_read'));
        };
      };

      readFile(0);
    });
  };

  return (
    <div
      className="relative"
      ref={ref}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        accept={accept}
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        className="absolute h-0 w-0 appearance-none opacity-0"
        multiple={maxFiles > 1}
        {...props}
      />
      {children}
    </div>
  );
}
