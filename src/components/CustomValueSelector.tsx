import {Popover, Select, Tooltip} from 'antd';
import type { ComponentPropsWithoutRef } from 'react';
import * as React from 'react';
import {VersatileSelectorProps} from 'react-querybuilder';
import { useValueSelector } from 'react-querybuilder';
import {useAppContext} from "../AppContent";

export type AntDValueSelectorProps = VersatileSelectorProps &
    Omit<ComponentPropsWithoutRef<typeof Select>, 'onChange' | 'defaultValue'>;

export const CustomValueSelector = ({
                                      className,
                                      handleOnChange,
                                      options,
                                      value,
                                      title,
                                      disabled,
                                      multiple,
                                      listsAsArrays,
                                      // Props that should not be in extraProps
                                      testID: _testID,
                                      rule: _rule,
                                      rules: _rules,
                                      level: _level,
                                      path: _path,
                                      context: _context,
                                      validation: _validation,
                                      operator: _operator,
                                      field: _field,
                                      fieldData: _fieldData,
                                      schema: _schema,
                                      ...extraProps
                                  }: AntDValueSelectorProps) => {
    const { onChange, val } = useValueSelector({ handleOnChange, listsAsArrays, multiple, value });

    const modeObj = multiple ? { mode: 'multiple' as const } : {};

    const {fields,
        setFields
    } = useAppContext();

    return (
        <span title={title} className={className}>
      <Select
          {...modeObj}
          popupMatchSelectWidth={false}
          disabled={disabled}
          showSearch={true}
          value={val}
          onChange={onChange}
          {...extraProps}>
        {fields.map((option) => (
            <Select.Option key={option.label} value={option.value} style={{ position: 'relative', zIndex: 999 }}>
                <Tooltip title={option.name} placement={"left"}>
                    {option.label}
                </Tooltip>
            </Select.Option>
        ))}
      </Select>
    </span>
    );
};

