export const parsePayMethodMP = ({ value }: { value: string }) => {
  switch (value) {
    case "credit_card":
      return "Tarjeta de crédito";
    default:
      return "Tarjeta de débito";
  }
};
export const parseStatusMP = ({ value }: { value: string }) => {
  switch (value) {
    case "approved":
      return "Aprobado";
    default:
      return "Desconocido";
  }
};
