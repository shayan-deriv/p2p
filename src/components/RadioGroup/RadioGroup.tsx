import { ChangeEvent, ComponentProps, HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Text } from '@deriv-com/ui';
import './RadioGroup.scss';

type TItem = HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean;
    hasError?: boolean;
    hidden?: boolean;
    id?: string;
    label: string;
    value: string;
};
type TItemWrapper = {
    shouldWrapItems?: boolean;
};
type TRadioGroup = TItemWrapper & {
    className?: string;
    name: string;
    onToggle: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    selected?: string;
    textSize?: ComponentProps<typeof Text>['size'];
};

const ItemWrapper = ({ children, shouldWrapItems }: PropsWithChildren<TItemWrapper>) => {
    if (shouldWrapItems) {
        return <div className='radio-group__item-wrapper'>{children}</div>;
    }

    return <>{children}</>;
};

const RadioGroup = ({
    children,
    className,
    name,
    onToggle,
    required,
    selected,
    shouldWrapItems,
    textSize = 'lg',
}: PropsWithChildren<TRadioGroup>) => {
    const [selectedOption, setSelectedOption] = useState(selected);

    useEffect(() => {
        setSelectedOption(selected);
    }, [selected]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
        onToggle(e);
    };

    return (
        <div className={clsx('radio-group', className)}>
            {Array.isArray(children) &&
                children
                    .filter(item => !item.props.hidden)
                    .map(item => (
                        <ItemWrapper key={item.props.value} shouldWrapItems={shouldWrapItems}>
                            <label
                                className={clsx('radio-group__item', className, {
                                    'radio-group__item--selected': selectedOption === item.props.value,
                                })}
                            >
                                <input
                                    checked={selectedOption === item.props.value}
                                    className='radio-group__input'
                                    disabled={item.props.disabled}
                                    id={item.props.id}
                                    name={name}
                                    onChange={onChange}
                                    required={required}
                                    type='radio'
                                    value={item.props.value}
                                />
                                <span
                                    className={clsx('radio-group__circle', {
                                        'radio-group__circle--selected': selectedOption === item.props.value,
                                        // eslint-disable-next-line sort-keys
                                        'radio-group__circle--disabled': item.props.disabled,
                                        'radio-group__circle--error': item.props.hasError,
                                    })}
                                />
                                <Text
                                    className={clsx('radio-group__label', {
                                        'radio-group__label--disabled': item.props.disabled,
                                        'radio-group__label--error': item.props.hasError,
                                    })}
                                    size={textSize}
                                >
                                    {item.props.label}
                                </Text>
                            </label>
                        </ItemWrapper>
                    ))}
        </div>
    );
};

const Item = ({ children, hidden = false, ...props }: PropsWithChildren<TItem>) => (
    <div hidden={hidden} {...props}>
        {children}
    </div>
);

RadioGroup.Item = Item;

export default RadioGroup;
