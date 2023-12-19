import { useEffect  } from "react";

export const useOutsideClickHandler = (ref, callback) => {
  const handleClick = (event) => {
    // Check if the clicked element is outside the specified ref
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    // Attach the event listener on mount
    document.addEventListener('click', handleClick);

    // Detach the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};