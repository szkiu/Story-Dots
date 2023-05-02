const minH1920 = "min-h-[71.4vh]";
const minH1280 = "min-h-[100vh]";

// export const checkScreenWidthAddingClasses = () => {
//   if (window !== undefined) {
//     if (window.matchMedia("(min-width: 1900px)").matches) {
//       document.body.classList.remove(minH1280);
//       document.body.classList.add(minH1920);
//     } else if (window.matchMedia("(min-width: 1700px)").matches) {
//       document.body.classList.remove(minH1280);
//       document.body.classList.add(minH1920);
//     } else if (window.matchMedia("(min-width: 1600px)").matches) {
//       document.body.classList.remove(minH1280);
//       document.body.classList.add(minH1920);
//     } else if (window.matchMedia("(min-width: 1400px)").matches) {
//       document.body.classList.remove(minH1920);
//       document.body.classList.add(minH1280);
//     } else {
//       document.body.classList.remove(minH1920);
//       document.body.classList.add(minH1280);
//     }
//   }
// };

export const checkScreenWidth = () => {
  if (window !== undefined) {
    if (window.matchMedia("(min-width: 1900px)").matches) {
      return minH1920;
    } else if (window.matchMedia("(min-width: 1700px)").matches) {
      return minH1920;
    } else if (window.matchMedia("(min-width: 1600px)").matches) {
      return minH1920;
    } else if (window.matchMedia("(min-width: 1400px)").matches) {
      return minH1280;
    } else {
      return minH1280;
    }
  }
};
