const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function createPathNameForBreadCrumb(pathname: string): Array<{
  title: string;
  key: string;
  show: boolean;
}> {
  const segments = pathname.split("/").filter((segment) => segment !== "");
  return segments.map((segment: string) => {
    switch (segment) {
      case "en":
      case "np":
        return {
          key: segment,
          title: capitalize(segment),
          show: false,
        };
      default:
        return {
          key: segment,
          title: capitalize(segment),
          show: true,
        };
    }
  });
}
