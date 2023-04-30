export default function getTime(time: string) {
  // @ts-ignore
  return ((new Date().getTime() - new Date(time).getTime()) / (1000 * 60)).toFixed(0) > 60
    ? // @ts-ignore
      ((new Date().getTime() - new Date(time).getTime()) / (1000 * 60 * 60)).toFixed(0) > 24
      ? `${((new Date().getTime() - new Date(time).getTime()) / (1000 * 60 * 60 * 24)).toFixed(
          0
        )} Days Ago`
      : `${((new Date().getTime() - new Date(time).getTime()) / (1000 * 60 * 60)).toFixed(
          0
        )} Hours Ago`
    : `${
        Number(((new Date().getTime() - new Date(time).getTime()) / (1000 * 60)).toFixed(0)) === 0
          ? 1
          : (
              (new Date().getTime() - new Date(time).getTime()) /
              (1000 * 60)
            ).toFixed(0)
      } Minutes Ago`;
}
