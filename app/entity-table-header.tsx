import {
  TableHead,
  TableRow,
  TableHeaderCell,
} from '@tremor/react';

const EntityTableHeader = ({ titles }: { titles: string[] }) => (
  <TableHead>
    <TableRow className='border-b-2'>
      {titles.map((title, key) => <TableHeaderCell key={key}>{title}</TableHeaderCell>)}
      <TableHeaderCell>Ações</TableHeaderCell>
    </TableRow>
  </TableHead>
)

export default EntityTableHeader
