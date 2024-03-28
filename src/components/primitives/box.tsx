import React, { ComponentPropsWithRef, ElementType, ForwardedRef } from "react";

type FixedForwardRef = <T, P>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = React.forwardRef as FixedForwardRef;

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

export const BoxComp = <T extends ElementType>(
  props: {
    as?: T;
  } & DistributiveOmit<
    ComponentPropsWithRef<ElementType extends T ? "span" : T>,
    "as"
  >,
  ref: ForwardedRef<unknown>
) => {
  const { as: Comp = "span", ...rest } = props;
  return <Comp {...rest} ref={ref} />;
};
const Box = fixedForwardRef(BoxComp);

export default Box;
