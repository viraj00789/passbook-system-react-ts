import ClientTable from "../components/clients/ClientTable";

const Clients = () => {
  return (
    <div className="p-2 xl:p-4 h-full max-h-[calc(100vh-75px)] 2xl:max-h-[calc(100vh-21px)] overflow-auto w-full">
      <ClientTable />
    </div>
  );
};

export default Clients;
