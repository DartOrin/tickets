import { FC } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { getNumWord } from '../../helpers/getNumWord';
import { IFilters } from './filters.model';

const CheckboxGroup = Checkbox.Group;

export const Filters: FC<IFilters> = ({ options, declination, checkedList, setCheckedList }) => {

  const checkAll = options.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list as number[]);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options : []);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} >
        Все
      </Checkbox>
      <CheckboxGroup onChange={onChange} value={checkedList}>
        {options.map(opt => (
          <Checkbox value={opt} key={opt}>
            {`${opt} ${getNumWord(opt, declination)}`}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  )
}