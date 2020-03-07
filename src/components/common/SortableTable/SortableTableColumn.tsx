import * as React from 'react';
import {
  TableHeaderColumn,
  TableHeaderColumnProps,
} from 'material-ui';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import { isArray } from 'util';
import SortType from '../../../utils/sortTypes';

interface ColProps extends TableHeaderColumnProps {
  order?: SortType;
  handleSort?: (type: SortType, colIndex: number) => void;
  colIndex?: number;
}

export default class SortableTableColumn extends React.Component<ColProps> {
  handleOnClick = (event: any) => {
    if (event.target.textContent !== '') {
      let order;
      // Identify sort type
      switch (this.props.order) {
        case SortType.ASC:
          order = SortType.DSC;
          break;
        case SortType.DSC:
          order = SortType.ASC;
          break;
        case SortType.NONE:
        default:
          order = SortType.ASC;
          break;
      }
      // Match column index starting with 1 instead of zero.
      this.props.handleSort!(order, this.props.colIndex!);
    }
  };

  renderSortIcon = () =>
    this.props.order === SortType.ASC ? (
      <NavigationArrowUpward className="sort-icon" />
    ) : (
      <NavigationArrowDownward className="sort-icon" />
    );

  render() {
    const { handleSort, order, colIndex, ...colProps } = this.props;
    return (
      <TableHeaderColumn {...colProps} onClick={this.handleOnClick}>
        <span
          className="icon-wrapper sort"
          title={`Sort by ${isArray(this.props.children)
            ? this.props.children![0]
            : this.props.children!}`}
        >
          {this.props.children}
          {order !== SortType.NONE ? this.renderSortIcon() : null}
        </span>
      </TableHeaderColumn>
    );
  }
}