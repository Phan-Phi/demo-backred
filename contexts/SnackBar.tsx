import { useRef } from "react";
import { SnackbarProvider } from "notistack";
import { SnackbarError, SnackbarSuccess } from "@/components";

type SnackProps = {
  children: React.ReactNode;
};

const SnackBar = ({ children }: SnackProps) => {
  const notistackRef = useRef<SnackbarProvider | null>(null);

  return (
    <SnackbarProvider
      ref={(ref) => {
        notistackRef.current = ref;
      }}
      preventDuplicate={false}
      autoHideDuration={3000}
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      Components={{
        success: SnackbarSuccess,
        error: SnackbarError,
      }}
      hideIconVariant={true}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackBar;
