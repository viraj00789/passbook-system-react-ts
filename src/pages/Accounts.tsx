import AccountTable from "../components/accounts/AccountTable";

const Accounts = () => {
  return (
    <div className="p-2 xl:p-4 h-full max-h-[calc(100vh)] overflow-auto">
      <AccountTable />
    </div>
  );
};

export default Accounts;
