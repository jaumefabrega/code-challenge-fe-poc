import { Currency } from "../../../../../../lib-common/types";

type Props = {
  amount: number;
  currency: Currency;
  className?: string;
};

const currencyFormatters = {
  EUR: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
  USD: new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }),
};

const PaymentAmount: React.FC<Props> = ({ amount, currency, className }) => {
  return (
    <div className={className}>
      {currencyFormatters[currency].format(amount)}
    </div>
  );
};

export default PaymentAmount;
