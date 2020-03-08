import * as React from 'react';
import {
  TableRow,
  TableRowProps,
} from 'material-ui';
import SortableTableColumn from './SortableTableColumn';
import SortType from '../../../utils/sortTypes';

interface RowProps extends TableRowProps {
  handleSort: (order: SortType, column: number) => void;
  selectable?: boolean;
}

interface RowState {
  // The column no. on which sorting is currently applied.
  orderedBy: number;
  orderType: SortType;
}

export class SortableTableHeaderRow extends React.Component<
  RowProps,
  RowState
> {
  constructor(props: RowProps) {
    super(props);
    this.state = { orderedBy: -1, orderType: SortType.NONE };
  }

  handleSort = (orderType: SortType, orderedBy: number) => {
    this.props.handleSort(orderType, orderedBy);
    this.setState({
      orderType,
      orderedBy,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps: RowProps) {
    if (nextProps.selectable) {
      this.setState({ orderedBy: -1, orderType: SortType.NONE });
    }
  }

  setChildState = () => {
    // Set additional props for children (columns)
    // on which sorting could be applied.
    return React.Children.map(
      this.props.children,
      (child: any, index: number) => {
        if (!child) return null;
        if (child.type === SortableTableColumn)
          return React.cloneElement(child, {
            colIndex: index,
            handleSort: this.handleSort,
            order:
              index === this.state.orderedBy
                ? this.state.orderType
                : SortType.NONE,
          });
        else return child;
      }
    );
  };

  render() {
    const updatedChildren = this.setChildState();
    const { handleSort, ...rowProps } = this.props;
    return <TableRow {...rowProps}>{updatedChildren}</TableRow>;
  }
}
