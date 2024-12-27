import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[95vw] max-w-md">
          <AlertDialog.Title className="text-xl font-bold mb-2">Error</AlertDialog.Title>
          <AlertDialog.Description className="mb-4 text-gray-600">
            {message}
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Retry
              </button>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
