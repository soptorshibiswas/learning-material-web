import {
  IToast,
  NotificationPlacement,
  showToast,
} from "../../../components/atoms/toast";

interface IErrorToast {
  message: string;
  description?: string;
  placement?: NotificationPlacement;
}

export function showToastAction(toast: IToast) {
  showToast({
    type: toast.type || "success",
    placement: toast.placement || "topRight",
    message: toast.message,
    description: toast.description,
  });
}

export function showErrorToastAction(errorToast: IErrorToast) {
  showToast({
    type: "error",
    placement: errorToast.placement || "topRight",
    message: errorToast.message,
    description: errorToast.description,
  });
}
