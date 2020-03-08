# Material-UI Table Wrappers

This project aims at adding:
- Sorting
- Pagination
- Expandable Rows
to Material-UI React Table component. This is for `material-ui` npm package i.e. < Material-UI v1, for `@core/material-ui` npm package you should use the provided Table components itself.

<hr>

## Sortable Table
This is a generic wrapper over the table header row and header columns which allows for sorting by column on column header click and also sets the corresponding ascending and descending icons on the column on which sort is applied.
### SortableTableHeaderRow
A wrapper for `<TableHeaderRow>`. This accepts a `handleSort` prop everything else will be passed on to the underlying `<TableHeaderRow>` component.

A wrapper for the entire row is required to maintain the sorting state across columns.

The `handleSort` callback allows for both server side and client side sorting. The method signature is:
```
/**
 * order: { ASC, DESC, NONE }
 * column: 0 based column number (index)
 */
handleSort: (order: SortType, column: number) => void;
```

### SortableTableColumn
A wrapper for `<TableHeaderColumn>`. This is required to maintain the sorting state on each column and accordingly show the sort icons and bind the click events to enable sorting on header click.

It doesn't accept any additional props. Any props given would be passed on to the underlying `<TableHeaderColumn>` component.

If for certain columns sorting is not required you can use the normal `<TableHeaderColumn>` directly alongside `<SortableTableHeaderRow>`. This distinction also helps in identifying which columns have sorting enabled which does not.

### Sample usage:
```
const handleSort = (order: SortType, column: number) => {
  /* Sorting logic goes here */
}

<Table selectable={false} fixedHeader={false}>
  <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
    <SortableTableHeader handleSort={this.handleSort}>
      <SortableTableHeaderColumn>Column 1</SortableTableHeaderColumn>
      <SortableTableHeaderColumn>Column 2</SortableTableHeaderColumn>
      <TableHeaderColumn>Column 3</TableHeaderColumn>
    </SortableTableHeader>
  </TableHeader>
</Table>
```

## PaginatedTable
`TBA`

## ExpandableTableRow
`TBA`
<hr>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).