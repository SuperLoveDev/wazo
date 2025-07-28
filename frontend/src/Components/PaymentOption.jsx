import React from "react";

const PaymentOption = ({
  value,
  label,
  selected,
  onChange,
  icon,
  children,
}) => (
  <div
    onClick={() => onChange(value)}
    className="flex gap-5 p-3 items-center cursor-pointer"
  >
    <input
      type="radio"
      name="payment"
      checked={selected === value}
      onChange={() => onChange(value)}
    />
    <p>{label}</p>
    {icon}
    {children}
  </div>
);

export default PaymentOption;
