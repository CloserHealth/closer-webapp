/* eslint-disable react-hooks/rules-of-hooks */

import { usePathname } from "next/navigation";
import { links } from "./data/data";

export const getSubPathName = () => {
  const pathname = usePathname();
  const subpath = pathname?.split("/")[2] ?? links[0].name;

  return subpath;
};