import ClientTable from "../components/clients/ClientTable";

const Clients = () => {
  return (
    <div className="p-2 xl:p-4 h-full max-h-[calc(100vh-90px)] 2xl:max-h-[calc(100vh-80px)] overflow-auto">
      <ClientTable />
    </div>
  );
};

export default Clients;
