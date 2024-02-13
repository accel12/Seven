import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon";

const VincularTarea = () => {
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default VincularTarea;
