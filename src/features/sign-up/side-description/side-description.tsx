import '../index.scss';
import './side-description.scss';
import React, { CSSProperties } from 'react';

type BrandButtonConfig = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: JSX.Element | string;
};
type BrandButtonProps = BrandButtonConfig;

function BrandButton(props: BrandButtonProps): JSX.Element {
  const btnProps: BrandButtonConfig = { ...(props || {}) };
  const { className, children, ...otherBtnProps } = btnProps;
  const newClassName =
    className && className.length > 0 ? `brand-btn ${className}` : 'brand-btn';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button type="button" className={newClassName} {...otherBtnProps}>
      {props.children}
    </button>
  );
}

type SideDescriptionProps = {
  onSign(): void;
};

export function SideDescription(props: SideDescriptionProps): JSX.Element {
  return (
    <div className="sidebar-description">
      <div style={{ height: 100 }}>{/* icon placeholder */}</div>
      <h1>Here’s your deal.</h1>
      <p>To get started with PayTrim we will need some information from you.</p>
      <DescriptionItem
        outerStyle={{ marginBottom: 23 }}
        icon="E"
        label="PRICE:"
        value={'29 öre + 0.29%" Interchange fee'}
      />
      <DescriptionItem
        outerStyle={{ marginBottom: 23 }}
        icon="T"
        label="PERIOD OF NOTICE:"
        value="O days"
      />
      <BrandButton className="view-agreement-btn" onClick={props.onSign}>
        View agreement and sign
      </BrandButton>
    </div>
  );
}

type DescriptionItemProps = {
  icon: JSX.Element | string;
  label: JSX.Element | string;
  value: JSX.Element | string;
  outerStyle?: CSSProperties;
};

export function DescriptionItem(props: DescriptionItemProps): JSX.Element {
  return (
    <div className="description-item" style={props.outerStyle}>
      <div className="description-icon">{props.icon}</div>
      <div className="description-info">
        <div className="description-label">{props.label}</div>
        <div className="description-value">{props.value}</div>
      </div>
    </div>
  );
}
