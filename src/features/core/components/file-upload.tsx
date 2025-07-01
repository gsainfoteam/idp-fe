import { ChangeEvent, PropsWithChildren, useRef } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

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
  disabled,
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

    Promise.all(
      files.map((file) => {
        return new Promise<string>((resolveFile, rejectFile) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            if (typeof e.target?.result === 'string') {
              resolveFile(e.target.result);
            } else {
              rejectFile(t('toast.failed_to_read'));
            }
          };
          reader.onerror = () => {
            rejectFile(t('toast.failed_to_read'));
          };
        });
      }),
    )
      .then((previewUrls) => onSave(files, previewUrls))
      .catch((error) => toast.error(error));
  };

  return (
    <div
      className={cn('relative', disabled && 'cursor-default')}
      ref={ref}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        accept={accept}
        disabled={disabled}
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
