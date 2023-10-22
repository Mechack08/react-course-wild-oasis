import { useEffect, useRef } from "react";

export function useOutsideClick(handler, capturingFace = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log(e.target);
          handler();
        }
      }

      document.addEventListener("click", handleClick, capturingFace);

      return () =>
        document.removeEventListener("click", handleClick, capturingFace);
    },
    [handler, capturingFace]
  );

  return ref;
}
