import { TPayHistory } from "@/types";

export const orderHistoryByDate = ({
  type,
  history,
}: {
  type: "asc" | "desc";
  history: TPayHistory[];
}): TPayHistory[] => {
  return history.sort((a, b) => {
    const dateA = new Date(a.date_approved);
    const dateB = new Date(b.date_approved);
    if (type === "asc") {
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    } else {
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    }
  });
};
