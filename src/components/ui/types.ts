export interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface DropdownItem {
  label: string;
  value: string;
  onClick: () => void;
  className?: string;
  icon?: React.ElementType<React.SVGProps<SVGSVGElement>>;
}

export interface DropdownProps {
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
}