import {
  Table,
  Card,
} from '@tremor/react';
import { pk } from '../interfaces';
import EntityTableBody from './entity-table-body';
import EntityTableHeader from './entity-table-header';

const EntityTable = <T extends pk, K extends keyof T>({ entities, titles, fields }: { entities: T[], titles: string[], fields: Exclude<K, 'id'>[] }) => (
  <Card className="mt-6">
    <Table>
      <EntityTableHeader titles={titles} />
      <EntityTableBody entities={entities} fields={fields} />
    </Table>
  </Card>
)

export default EntityTable
