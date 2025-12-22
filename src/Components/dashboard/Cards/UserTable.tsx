import { FiEdit2 } from "react-icons/fi";
import DataTable from "../../../Components/ui/Table";
import type { Column } from "../../../Components/ui/Table";
import { LuTrash2 } from "react-icons/lu";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function TableUsageExample() {
  const data: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@mail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
  ];

  const columns: Column<User>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <FiEdit2
            onClick={() => alert(`Edit ${row.name}`)}
            className="text-gray-500 dark:text-gray cursor-pointer"
            size={20}
          />
          <LuTrash2
            onClick={() => alert(`Delete ${row.name}`)}
            className="text-gray-500 dark:text-gray cursor-pointer"
            size={21.5}
          />
        </div>
      ),
    },
  ];

  return <DataTable title="Recent Transaction(s)" columns={columns} data={data} searchable />;
}
