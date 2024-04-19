import { Button } from "@nextui-org/react";
import {
  TableRow,
  TableBody,
  TableCell,
  Icon
} from '@tremor/react';
import pickObjectKeys from "../utils/pickKeys";
import { pk } from "../interfaces";
import { MinusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import useModal from "../hooks/useModal";

const EntityTableBody = <T extends pk, K extends keyof T> ({entities, fields}:{entities: T[], fields: Exclude<K, 'id'>[]}) => {
  const {onOpen, handleAction} = useModal()
  return (
    <TableBody>
      {entities.map(({id, ...entity}) => {
        const row = pickObjectKeys(entity, fields)
        return (
        <TableRow key={id}>
          {fields.map((field, key) => <TableCell key={key}><>{row[field]}</></TableCell>)}
          <TableCell>
            <Button isIconOnly onPress={() => {handleAction({id, operation: 'update'}); onOpen()}}><Icon icon={PencilSquareIcon} /></Button>
            <Button isIconOnly color="danger" onPress={() => {handleAction({id, operation: 'delete'}); onOpen()}}><Icon icon={MinusIcon} /></Button>
          </TableCell>
        </TableRow>
      )})}
    </TableBody>
  )
}

export default EntityTableBody