import { ReactNode } from 'react';

export enum BadgeType {
  DANGER = 'danger',
  SUCCESS = 'success',
}
interface BadgeProps {
  children?: ReactNode;
  type: BadgeType;
}

function Badge({ type, children }: BadgeProps) {
  const color =
    type === BadgeType.SUCCESS
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  return (
    <span
      className={'text-xs font-semibold mr-2 px-2.5 py-0.5 rounde ' + color}
    >
      {children}
    </span>
  );
}

export default Badge;
