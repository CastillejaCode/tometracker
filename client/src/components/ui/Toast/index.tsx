import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast, resetToast } from "src/slices/toastSlice";
import { RootState } from "src/store";

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.notification.at(0));

  useEffect(() => {
    const delay = 5000;
    const timeout = setTimeout(() => {
      dispatch(removeToast());
      if (!toast) clearTimeout(timeout);
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  const style = {
    notification: "bg-zinc-100 dark:bg-zinc-800",
    error: "bg-red-700 dark:bg-red-900 text-red-200",
  };

  const limit = 50;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          drag="x"
          dragConstraints={{ left: limit, right: limit }}
          whileDrag={{ opacity: 0.5 }}
          onDragEnd={(_event, info) =>
            Math.abs(info.offset.x) > limit && dispatch(resetToast())
          }
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          className={clsx(
            "toast-end toast m-4 flex w-fit -translate-x-1/2 flex-row rounded-lg pl-8 pr-10 shadow-xl ",
            style[toast.type ?? "notification"]
          )}
        >
          <p>{toast.message}</p>
          <button
            className="btn-ghost btn-sm btn-circle btn absolute right-0 top-0 "
            onClick={() => dispatch(removeToast())}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
