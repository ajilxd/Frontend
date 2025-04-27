// import { unstable_useBlocker as useBlocker } from "react-router-dom";

// export function useBlock(when) {
//   const blocker = useBlocker(when);

//   useEffect(() => {
//     if (blocker.state === "blocked") {
//       const confirmLeave = window.confirm(
//         "You have unsaved changes. Leave anyway?"
//       );
//       if (confirmLeave) {
//         blocker.proceed();
//       } else {
//         blocker.reset();
//       }
//     }
//   }, [blocker]);
// }
